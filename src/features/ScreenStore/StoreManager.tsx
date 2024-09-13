import React, { useEffect, useState } from 'react'
import { Alert, Button, Image, ImageBackground, KeyboardAvoidingView, Linking, Modal, PermissionsAndroid, Platform, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { addStore, deleteStore, getListStore, UpdateStore } from './util/store';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { styles } from './styles/styleStore';
let idService = '';
function StoreManager() {
    const [Data, setData] = useState(null)
    const [modalChiTiet, setModleChiTiet] = useState(false)
    const [modalAdd, setModleAdd] = useState(false)
    const [modalUpdate, setModleUpdate] = useState(false)

    const [stt, setSTT] = useState("")
    const [names, setNames] = useState([])

    const [idUpdataStore, setUpdataIdStore] = useState("")
    const [tenUpdataStore, setUpdataTenStore] = useState("")
    const [UpdatadAddRess, setUpdataAddRess] = useState("")
    const [UpdataLocation, setUpdataLocation] = useState("")
    const [UpdataNumberPhone, setUpdataNumberPhone] = useState('')
    const [UpdatatImg, setUpdataImg] = useState(null)
    const [UpdatangayTao, setUpdataNgayTao] = useState("")
    const [UpdatangayUpdate, setUpdataNgayUpdate] = useState("")

    const [name, setName] = useState('')
    const [addRess, setAddRess] = useState('')
    const [location, setLocation] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [image, setImage] = useState(null)

    const [validteTen, setValidteTen] = useState("")
    const [validteAddress, setValiAddRess] = useState("")
    const [validteLocation, setValiLocation] = useState("")
    const [validtePhoneNumber, setValiPhoneNumber] = useState("")
    const [validteImage, setValiImage] = useState("")


    const employeeImage = UpdatatImg
        ? UpdatatImg.replace('localhost', '192.168.2.10')
        : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';


    //Chon anh
    const requestCameraPermission = async () => {
        const options: any = {
            mediaType: 'photo', // Có thể là 'photo', 'video', hoặc 'mixed' tùy vào yêu cầu của bạn
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                const imageUri: any = response.assets[0].uri; // Lấy link ảnh
                // console.log('Link ảnh: ', imageUri);
                setImage(imageUri); // Chỉ truyền chuỗi `imageUri`
                setUpdataImg(imageUri)
            } else {
                console.log('No assets found in response');
            }
        });
    };

    useEffect(() => {
        getData();
    }, []);
    // hàm lấy dữ liệu store
    async function getData() {
        const data = await getListStore();
        setData(data.reverse());
        const reversedData = data.reverse();
        const mapTen = reversedData.map(item => item.name);
        setNames(mapTen)
    }

    // chuwcs nang xoa
    function deleteStoreHandler(id: any) {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc muốn xóa cửa hàng này?',
            [
                {
                    text: 'Có',
                    onPress: async () => {
                        const isDelete = await deleteStore(id);
                        if (isDelete) {
                            ToastAndroid.show('Xóa cửa hàng thành công', ToastAndroid.SHORT);
                            getData();
                        } else {
                            Alert.alert('Lỗi khi xóa cửa hàng vui lòng thử lại sau ');
                        }
                    },
                },
                {
                    text: 'Không',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }
    // click vào vị trí
    const handleAddress = (vitri: any) => {
        // Mở URL khi nhấn vào link
        Linking.openURL(vitri);
    };
    const kTraAdd = () => {
        let check = true
        if (name === "") {
            setValidteTen("Vui lòng nhập tên cửa hàng")
            check = false
        } else if (name.length < 2) {
            setValidteTen("Độ dài phải hơn 2 ký tự")
            check = false
        } else if (names.includes(name)) {
            setValidteTen("Tên cửa hàng đã tồn tại")
            check = false
        } else {
            setValidteTen("")

        }

        if (addRess === "") {
            setValiAddRess("Vui lòng nhập vị trí cửa hàng")
            check = false
        } else if (addRess.length < 10) {
            setValiAddRess("Độ dài phải hơn 10 ký tự")
            check = false
        } else {
            setValiAddRess("")
        }

        if (location === "") {
            setValiLocation("Vui lòng nhập địa chỉ cửa hàng")
            check = false
        } else {
            setValiLocation("")

        }

        if (phoneNumber === "") {
            setValiPhoneNumber("Vui lòng nhập số điện thoại")
            check = false
        } else if (isNaN(Number(phoneNumber))) {
            setValiPhoneNumber("Phải phải số")
            check = false
        } else if (phoneNumber.length < 9) {
            setValiPhoneNumber("Độ dài phải hơn 9 ký tự")
            check = false
        } else {
            setValiPhoneNumber("")
        }

        if (image === null) {
            setValiImage('Vui lòng chọn ảnh')
            check = false
        } else {
            setValiImage('')
        }
        return check
    }
    // chuc namg them
    async function addStoreHandler() {
        if (kTraAdd()) {
            const formData = new FormData();
            // Thêm từng trường dữ liệu
            formData.append('name', name); // 'name' là tên của trường gửi lên server, `name` là giá trị
            formData.append('address', addRess);
            formData.append('location', location);
            formData.append('phoneNumber', phoneNumber);
            formData.append('image', {
                uri: image, // Đường dẫn URI tới file ảnh
                type: 'image/jpeg', // Đảm bảo định dạng file được chỉ định
                name: 'photo.jpg', // Đặt tên cho file ảnh
            });


            const isAdd = await addStore(formData)


            if (isAdd) {
                ToastAndroid.show('Thêm dịch vụ mới thành công', ToastAndroid.SHORT)
                setModleAdd(false)
                TrangDL()
                getData();

            } else {
                Alert.alert('Lỗi khi thêm dịch vụ mới vui lòng thử lại sau ')
            }
        }
    }

    const kTraUpdate = () => {
        let check = true
       
        if (tenUpdataStore === "") {
            setValidteTen("Vui lòng nhập tên cửa hàng")
            check = false
        } else if (tenUpdataStore.length < 2) {
            setValidteTen("Độ dài phải hơn 2 ký tự")
            check = false
        }else {
            setValidteTen("")
        }

        if (UpdatadAddRess === "") {
            setValiAddRess("Vui lòng nhập vị trí cửa hàng")
            check = false
        } else if (UpdatadAddRess.length < 10) {
            setValiAddRess("Độ dài phải hơn 10 ký tự")
            check = false
        } else {
            setValiAddRess("")
        }

        if (UpdataLocation === "") {
            setValiLocation("Vui lòng nhập địa chỉ cửa hàng")
            check = false
        } else {
            setValiLocation("")

        }

        if (UpdataNumberPhone === "") {
            setValiPhoneNumber("Vui lòng nhập số điện thoại")
            check = false
        } else if (isNaN(Number(UpdataNumberPhone))) {
            setValiPhoneNumber("Phải phải số")
            check = false
        } else if (UpdataNumberPhone.length < 9) {
            setValiPhoneNumber("Độ dài phải hơn 9 ký tự")
            check = false
        } else {
            setValiPhoneNumber("")
        }

        if (UpdatatImg === null) {
            setValiImage('Vui lòng chọn ảnh')
            check = false
        } else {
            setValiImage('')
        }

        
        return check
    }
    // chuc nang sua
    async function updateStoreHandler() {
        if (kTraUpdate()) {
            const formData = new FormData();
            // Thêm từng trường dữ liệu
            formData.append('name', tenUpdataStore); // 'name' là tên của trường gửi lên server, `name` là giá trị
            formData.append('address', UpdatadAddRess);
            formData.append('location', UpdataLocation);
            formData.append('phoneNumber', UpdataNumberPhone);
            formData.append('image', {
                uri: UpdatatImg, // Đường dẫn URI tới file ảnh
                type: 'image/jpeg', // Đảm bảo định dạng file được chỉ định
                name: 'photo.jpg', // Đặt tên cho file ảnh
            });
            const isAdd = await UpdateStore(idUpdataStore, formData)
            if (isAdd) {
                ToastAndroid.show('Sửa thông tin cửa hàng thành công', ToastAndroid.SHORT)
                setModleUpdate(false)
                TrangDL()
                getData();

            } else {
                Alert.alert('Lỗi khi Sửa cưar hàng vui lòng thử lại sau ')
            }
        }
    }
    const TrangDL = () => {
        setName('')
        setAddRess('')
        setLocation('')
        setPhoneNumber('')
        setImage(null)

        setValiAddRess('')
        setValiImage('')
        setValiLocation('')
        setValiPhoneNumber('')
        setValidteTen('')
    }

    const renderItem = ({ item, index }: any) => (
        <TouchableOpacity
            onPress={() => { setModleChiTiet(true), setSTT(index + 1), setUpdataTenStore(item.name), setUpdataAddRess(item.address), setUpdataLocation(item.location), setUpdataNumberPhone(item.phoneNumber), setUpdataImg(item.image), setUpdataNgayTao(item.createdAt), setUpdataNgayUpdate(item.updatedAt) }}
            style={styles.item}
        >
            <View style={{ justifyContent: 'center' }}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{index + 1}</Text>
            </View>
            <View style={{ justifyContent: 'center', marginLeft: 20 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
                    <Image style={{ width: 20, height: 20, }} source={require('./icon/store.png')} />
                    <Text style={styles.text}>{item.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
                    <Image style={{ width: 20, height: 20, }} source={require('./icon/location.png')} />
                    <Text style={styles.text}>{item.location} </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
                    <Image style={{ width: 20, height: 20, }} source={require('./icon/telephone.png')} />
                    <Text style={styles.text}>{item.phoneNumber} </Text>
                </View>

            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => {
                    deleteStoreHandler(idService = item._id)
                }}>
                    <Image style={{ width: 20, height: 20, }} source={require('./icon/bin.png')} />
                </TouchableOpacity>
                <View style={{ height: 30 }}></View>
                <TouchableOpacity onPress={() => { setModleUpdate(true), setUpdataIdStore(item._id), setUpdataTenStore(item.name), setUpdataAddRess(item.address), setUpdataLocation(item.location), setUpdataNumberPhone(item.phoneNumber), setUpdataImg(item.image), setUpdataNgayTao(item.createdAt), setUpdataNgayUpdate(item.updatedAt) }}>
                    <Image style={{ width: 20, height: 20, }} source={require('./icon/refresh.png')} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
    return (
        <View style={styles.boby}>
            <ImageBackground source={require('./anh/image.png')} style={styles.top}>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.inputSearch}>
                        <TextInput
                            style={{ width: 300 }}
                            placeholder="Tìm kiếm cửa hàng"
                            placeholderTextColor={'#8391A1'}
                        />

                        <View style={{ justifyContent: 'center' }}>
                            <Image
                                style={{ width: 20, height: 20 }}
                                source={require('./icon/search.png')}
                            />
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
                        <Text style={styles.title}>
                            Danh sách cửa hàng
                        </Text>
                    </View>

                    <FlatList
                        style={{ height: "170%", marginTop: 20 }}
                        data={Data}
                        renderItem={renderItem}
                    // keyExtractor={(item, index) => index.toString()}
                    />

                    {/* Modal Chi tiết */}
                    <Modal
                        animationType='slide'
                        visible={modalChiTiet}
                        transparent={true}
                    >
                        <View style={styles.box1}>
                            <View style={styles.box2}>
                                <Text style={styles.title}>Chi tiết cửa hàng</Text>
                                <View style={{ width: '100%', alignItems: 'center', }}>
                                    <Image style={styles.img_CT} source={{ uri: employeeImage }} />
                                </View>

                                <View style={{ marginLeft: 30, height: '45%', marginTop: 10 }}>
                                    <Text style={styles.text1}>STT: {stt}</Text>
                                    <Text style={styles.text1}>Tên cửa hàng: {tenUpdataStore}</Text>
                                    <TouchableOpacity onPress={() => { handleAddress(UpdatadAddRess) }}>
                                        <Text style={styles.text1}>Vị trí: {UpdatadAddRess}</Text>
                                    </TouchableOpacity>

                                    <Text style={styles.text1}>Địa chỉ: {UpdataLocation}</Text>
                                    <Text style={styles.text1}>Số điện thoại: {UpdataNumberPhone} </Text>
                                    <Text style={styles.text1}>Ngày tạo: {UpdatangayTao.slice(0, 10)}</Text>
                                    <Text style={styles.text1}>Cập nhật gần nhất: {UpdatangayUpdate.slice(0, 10)}</Text>
                                </View>

                                <View style={{ alignItems: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.btn_chucnang}
                                        onPress={() => {
                                            setModleChiTiet(false)
                                        }}>
                                        <Text
                                            style={{
                                                color: '#FFFFFF',
                                                fontSize: 14,
                                                fontWeight: 'bold',
                                            }}>
                                            Đóng
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {/* Modal sua */}
                    <Modal animationType="slide" visible={modalUpdate} transparent={true}>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={{ flex: 1, alignItems: 'center' }}
                        >
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                <View style={styles.box3}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            margin: 10,
                                        }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModleUpdate(false);
                                            }}
                                            style={styles.btn_back}>
                                            <Image
                                                style={{ width: 15, height: 15 }}
                                                source={require('./icon/back.png')}
                                            />
                                        </TouchableOpacity>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={styles.title2}>Sửa thông tin cửa hàng</Text>
                                        </View>
                                        <View style={{ width: 30, height: 30 }}></View>
                                    </View>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={styles.inputAdd}>
                                            <TextInput
                                                style={{ width: 300, color: 'black' }}
                                                defaultValue={tenUpdataStore}
                                                placeholder="Nhập tên store"
                                                placeholderTextColor={'#8391A1'}
                                                onChangeText={text => {
                                                    setUpdataTenStore(text);
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.textVali}>{validteTen}</Text>
                                        <View style={styles.inputAdd}>
                                            <TextInput
                                                style={{ width: 300, color: 'black' }}
                                                defaultValue={UpdatadAddRess}
                                                placeholder="Nhập vị trí"
                                                placeholderTextColor={'#8391A1'}
                                                onChangeText={text => {
                                                    setUpdataAddRess(text);
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.textVali}>{validteAddress}</Text>
                                        <View style={styles.inputAdd}>
                                            <TextInput
                                                style={{ width: 300, color: 'black' }}
                                                defaultValue={UpdataLocation}
                                                placeholder="Nhập địa chỉ"
                                                placeholderTextColor={'#8391A1'}
                                                onChangeText={text => {
                                                    setUpdataLocation(text);
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.textVali}>{validteLocation}</Text>
                                        <View style={styles.inputAdd}>
                                            <TextInput
                                                style={{ width: 300, color: 'black' }}
                                                defaultValue={UpdataNumberPhone}
                                                placeholder="Nhập số điện thoại"
                                                placeholderTextColor={'#8391A1'}
                                                onChangeText={text => {
                                                    setUpdataNumberPhone(text);
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.textVali}>{validtePhoneNumber}</Text>

                                        <View style={styles.view1}>
                                            <TouchableOpacity
                                                style={styles.view2}
                                                onPress={() => {
                                                    requestCameraPermission();
                                                }}>
                                                <Text style={{ textAlign: 'center' }}>Chọn ảnh</Text>
                                            </TouchableOpacity>

                                            {
                                                UpdatatImg && (
                                                    <Image
                                                        source={{ uri: UpdatatImg }}
                                                        style={{ height: 100, width: 100, borderRadius: 5 }}
                                                    />
                                                )}

                                        </View>
                                        <Text style={styles.textVali}>{validteImage}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                updateStoreHandler();
                                            }}
                                            style={{
                                                width: 330,
                                                height: 40,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#80B3FE',
                                                borderRadius: 10,
                                                marginTop: 140,
                                            }}>
                                            <Text style={{ color: '#FFFFFF' }}>Hoàn tất</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>

                    </Modal>
                </View>
                <TouchableOpacity
                    style={styles.btn_add}
                    onPress={() => {
                        setModleAdd(true);
                    }}>
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={require('./icon/add-blue.png')}
                    />
                </TouchableOpacity>
            </ImageBackground>

            {/* Modal Thêm mới */}
            <Modal animationType="slide" visible={modalAdd} transparent={true}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, alignItems: 'center' }}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.box3}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    margin: 10,
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setModleAdd(false);
                                    }}
                                    style={styles.btn_back}>
                                    <Image
                                        style={{ width: 15, height: 15 }}
                                        source={require('./icon/back.png')}
                                    />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.title2}>Thêm cửa hàng mới</Text>
                                </View>
                                <View style={{ width: 30, height: 30 }}></View>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        value={name}
                                        placeholder="Nhập tên store"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setName(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteTen}</Text>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        value={addRess}
                                        placeholder="Nhập vị trí"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setAddRess(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteAddress}</Text>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        value={location}
                                        placeholder="Nhập địa chỉ"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setLocation(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteLocation}</Text>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        value={phoneNumber}
                                        placeholder="Nhập số điện thoại"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setPhoneNumber(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validtePhoneNumber}</Text>

                                <View style={styles.view1}>
                                    <TouchableOpacity
                                        style={styles.view2}
                                        onPress={() => {
                                            requestCameraPermission();
                                        }}>
                                        <Text style={{ textAlign: 'center' }}>Chọn ảnh</Text>
                                    </TouchableOpacity>

                                    {image && (
                                        <Image
                                            source={{ uri: image }}
                                            style={{ height: 100, width: 100, borderRadius: 5 }}
                                        />
                                    )}

                                </View>
                                <Text style={styles.textVali}>{validteImage}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        addStoreHandler();
                                    }}
                                    style={{
                                        width: 330,
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#80B3FE',
                                        borderRadius: 10,
                                        marginTop: 140,
                                    }}>
                                    <Text style={{ color: '#FFFFFF' }}>Hoàn tất</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

            </Modal>
        </View>
    );
}

export default StoreManager;
