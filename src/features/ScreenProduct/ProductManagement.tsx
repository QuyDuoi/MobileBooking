import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, KeyboardAvoidingView, Modal, Platform, Pressable, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { styles } from './styles/styleProduct';
import { ScrollView } from 'react-native-gesture-handler';
import { addProduct, deleteProduct, getListProduct, UpdateProduct } from './util/product';
import { launchImageLibrary } from 'react-native-image-picker';




//Hình ảnh, tên sản phẩm, số lượng hiện có, mô tả, giá. (Quản lý sản phẩm)
function ProducManagement() {

    const [modalAdd, setModleAdd] = useState(false)
    const [modalUpdate, setModleUpdate] = useState(false)
    const [modalChiTiet, setModleChiTiet] = useState(false)

    const [Data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [names, setNames] = useState([])
    const [searchName, setSearchName] = useState('')

    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [price, setPrice] = useState("")
    const [soLuong, setSoLuong] = useState("")
    const [moTa, setMoTa] = useState("")
    const id_Store = "66f4ed8f30557ca7844dd807"

    const [id_Sp, setId_Sp] = useState("")
    const [updateName, setUpdateName] = useState("")
    const [updateImage, setUpdateImage] = useState(null)
    const [updatePrice, setUpdatePrice] = useState("")
    const [updateSoLuong, setUpdateSoLuong] = useState("")
    const [updateMoTa, setUpdateMoTa] = useState("")
    const [updatangayTao, setUpdataNgayTao] = useState("")
    const [updatangayUpdate, setUpdataNgayUpdate] = useState("")


    const [validteName, setValidteName] = useState("")
    const [validteGia, setValiGia] = useState("")
    const [validteSoLuong, setValiSoLuong] = useState("")
    const [validteMota, setValiMoTa] = useState("")
    const [validteImage, setValiImage] = useState("")



    const employeeImage = updateImage
        ? updateImage.replace('localhost', '192.168.2.10')
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
                setImage(imageUri);
                setUpdateImage(imageUri)
                // Chỉ truyền chuỗi `imageUri`
            } else {
                console.log('No assets found in response');
            }
        });
    };


    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const data = await getListProduct();
        if (data) {
            setData(data.reverse());
            setFilteredData(data.reverse());
            const reversedData = data.reverse();
            const mapTen = reversedData.map(item => item.name);
            setNames(mapTen)
        } else {
            console.error('Không có dữ liệu sản phẩm');
        }
    }
    //Xóa kí tự, loại bỏ dấu 
    const removeDiacritics = (text: string) => {
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    const handleSearch = (text: string) => {
        setSearchName(text);

        if (text) {
            // Lọc dữ liệu theo tên
            const filtered = Data.filter(item =>
                removeDiacritics(item.name).toLowerCase().includes(removeDiacritics(text).toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            // Nếu input rỗng, hiển thị lại toàn bộ dữ liệu
            setFilteredData(Data);
        }
    };
    const TrangDL = () => {
        setName('')
        setPrice('')
        setSoLuong('')
        setMoTa('')
        setImage(null)

        setValidteName('')
        setValiImage('')
        setValiSoLuong('')
        setValiGia('')
        setValiMoTa('')
    }
    const kTraAdd = () => {
        let check = true
        if (name === "") {
            setValidteName("Vui lòng nhập tên sản phẩm")
            check = false
        } else if (name.length < 2) {
            setValidteName("Độ dài phải hơn 2 ký tự")
            check = false
        } else {
            setValidteName("")

        }
        if (moTa === "") {
            setValiMoTa("Vui lòng nhập mô tả")
            check = false
        } else if (name.length < 2) {
            setValiMoTa("Độ dài phải hơn 2 ký tự")
            check = false
        } else {
            setValiMoTa("")

        }

        if (soLuong === "") {
            setValiSoLuong("Vui lòng nhập số lượng")
            check = false
        } else if (isNaN(Number(soLuong))) {
            setValiSoLuong("Phải phải số")
            check = false
        } else if (soLuong.length < 0) {
            setValiSoLuong("Số lượng phải lớn hơn 0")
            check = false
        } else {
            setValiSoLuong("")
        }

        if (price === "") {
            setValiGia("Vui lòng nhập giá")
            check = false
        } else if (isNaN(Number(price))) {
            setValiGia("Phải phải số")
            check = false
        } else if (price.length < 0) {
            setValiGia("Giá phải lớn hơn 0")
            check = false
        } else {
            setValiGia("")
        }

        if (image === null) {
            setValiImage('Vui lòng chọn ảnh')
            check = false
        } else {
            setValiImage('')
        }
        return check
    }
    // Chuc nang add
    async function addProductHandler() {
        if (kTraAdd()) {
            const formData = new FormData();
            // Thêm từng trường dữ liệu
            formData.append('name', name);
            formData.append('price', price);
            formData.append('quantity', soLuong);
            formData.append('description', moTa);
            formData.append('id_store', id_Store);
            formData.append('image', {
                uri: image, // Đường dẫn URI tới file ảnh
                type: 'image/jpeg', // Đảm bảo định dạng file được chỉ định
                name: 'photo.jpg', // Đặt tên cho file ảnh
            });
            const isAdd = await addProduct(formData)


            if (isAdd) {
                Alert.alert('Thêm sản phẩm mới thành công')
                setModleAdd(false)
                TrangDL()
                getData();

            } else {
                Alert.alert('Lỗi khi thêm sản phẩm mới vui lòng thử lại sau ')
            }
        }
    }
    const kTraUpdate = () => {
        let check = true
        if (updateName === "") {
            setValidteName("Vui lòng nhập tên sản phẩm")
            check = false
        } else if (updateName.length < 2) {
            setValidteName("Độ dài phải hơn 2 ký tự")
            check = false
        } else {
            setValidteName("")

        }
        if (updateMoTa === "") {
            setValiMoTa("Vui lòng nhập mô tả")
            check = false
        } else if (updateMoTa.length < 2) {
            setValiMoTa("Độ dài phải hơn 2 ký tự")
            check = false
        } else {
            setValiMoTa("")

        }

        if (updateSoLuong === "") {
            setValiSoLuong("Vui lòng nhập số lượng")
            check = false
        } else if (isNaN(Number(updateSoLuong))) {
            setValiSoLuong("Phải phải số")
            check = false
        } else if (updateSoLuong.length < 0) {
            setValiSoLuong("Số lượng phải lớn hơn 0")
            check = false
        } else {
            setValiSoLuong("")
        }

        if (updatePrice === "") {
            setValiGia("Vui lòng nhập giá")
            check = false
        } else if (isNaN(Number(updatePrice))) {
            setValiGia("Phải phải số")
            check = false
        } else if (updatePrice.length < 0) {
            setValiGia("Giá phải lớn hơn 0")
            check = false
        } else {
            setValiGia("")
        }

        if (updateImage === null) {
            setValiImage('Vui lòng chọn ảnh')
            check = false
        } else {
            setValiImage('')
        }
        return check
    }
    async function updateProductHandler() {
        if (kTraUpdate()) {
            const formData = new FormData();
            // Thêm từng trường dữ liệu
            formData.append('name', updateName);
            formData.append('price', updatePrice);
            formData.append('quantity', updateSoLuong);
            formData.append('description', updateMoTa);
            formData.append('id_store', id_Store);
            formData.append('image', {
                uri: updateImage, // Đường dẫn URI tới file ảnh
                type: 'image/jpeg', // Đảm bảo định dạng file được chỉ định
                name: 'photo.jpg', // Đặt tên cho file ảnh
            });
            const isAdd = await UpdateProduct(id_Sp, formData)


            if (isAdd) {
                Alert.alert('Sửa sản phẩm thành công')
                setModleUpdate(false)
                TrangDL()
                getData();

            } else {
                Alert.alert('Lỗi khi sửa sản phẩm vui lòng thử lại sau ')
            }
        }
    }

    //Chuc nang xoa
    function deleteSeviceHandler(id: any) {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc muốn xóa sản phẩm này?',
            [
                {
                    text: 'Có',
                    onPress: async () => {
                        const isDelete = await deleteProduct(id);
                        if (isDelete) {
                            ToastAndroid.show('Xóa sản phẩm thành công', ToastAndroid.SHORT);
                            getData();
                        } else {
                            Alert.alert('Lỗi khi xóa sản phẩm vui lòng thử lại sau ');
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

    const renderItem = ({ item, index }: any) => (
        <Pressable
            onLongPress={() => { setModleChiTiet(true), setUpdateName(item.name), setUpdateImage(item.image), setUpdatePrice(item.price), setUpdateSoLuong(item.quantity), setUpdateMoTa(item.description), setUpdataNgayTao(item.createdAt), setUpdataNgayUpdate(item.updatedAt) }} style={styles.item}
        >
            <View style={{ flexDirection: 'row' }}>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.text1}>{index + 1}</Text>
                </View>

                <View style={{ justifyContent: 'center' }}>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
                        <Text style={styles.text}>Tên sản phẩm: {item.name} </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
                        <Text style={styles.text}>Giá: {item.price} VND</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 5 }}>
                        <Text style={styles.text}>Số lượng tồn: {item.quantity} </Text>
                    </View>

                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => {
                    deleteSeviceHandler(item._id)
                }}>
                    <Image style={{ width: 20, height: 20, }} source={require('./icon/bin.png')} />
                </TouchableOpacity>
                <View style={{ height: 30 }}></View>
                <TouchableOpacity onPress={() => {
                    setModleUpdate(true), setId_Sp(item._id), setUpdateName(item.name), setUpdateImage(item.image), setUpdatePrice(item.price), setUpdateSoLuong(item.quantity), setUpdateMoTa(item.description)
                }}>
                    <Image style={{ width: 20, height: 20, }} source={require('./icon/refresh.png')} />
                </TouchableOpacity>
            </View>
        </Pressable >
    );

    return (
        <View style={styles.boby}>
            <Image source={require('./anh/image.png')} style={styles.trangTri} />
            <View style={{
                marginHorizontal: 30,
                marginVertical: 15,
            }}>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Tìm kiếm tên sản phẩm"
                    placeholderTextColor={'#8391A1'}
                    onChangeText={text => handleSearch(text)}
                />

                <View style={styles.searchTen}>
                    <Image
                        style={{ width: 20, height: 20 }}
                        source={require('./icon/search.png')}
                    />
                </View>
            </View>

            <View style={styles.box4}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>
                        Danh sách sản phẩm
                    </Text>
                </View>
                <FlatList
                    data={filteredData}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={styles.title2}>Không có kết quả</Text>}
                // keyExtractor={(item, index) => index.toString()}
                />
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                        style={styles.btnThem}
                        onPress={() => {
                            setModleAdd(true);
                        }}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={require('./icon/add-blue.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Modal Chi tiết */}
            <Modal
                animationType='slide'
                visible={modalChiTiet
                }
                transparent={true}>
                <View style={styles.box1}>
                    <View style={styles.box2}>
                        <Text style={styles.title}>Chi tiết sản phẩm</Text>
                        <View style={{ width: '100%', alignItems: 'center', }}>
                            <Image style={styles.img_CT} source={{ uri: employeeImage }} />
                        </View>

                        <View style={{ margin: 20 }}>
                            <Text style={styles.text1}>Tên sản phẩm: {updateName}</Text>
                            <Text style={styles.text1}>Giá: {updatePrice}</Text>
                            <Text style={styles.text1}>Số lượng tồn: {updateSoLuong}</Text>
                            <Text style={styles.text1}>Mô tả: {updateMoTa} </Text>
                            <Text style={styles.text1}>Cửa hàng: {updateMoTa} </Text>
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
            {/* Modal suaw */}
            <Modal animationType="slide" visible={modalUpdate} transparent={true}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, alignItems: 'center' }}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <View
                            style={styles.box3}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    margin: 10,
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        TrangDL(),
                                            setModleUpdate(false);
                                    }}
                                    style={styles.btn_back}>
                                    <Image
                                        style={{ width: 15, height: 15 }}
                                        source={require('./icon/back.png')}
                                    />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.title2}>Sửa thông tin sản phẩm</Text>
                                </View>
                                <View style={{ width: 30, height: 30 }}></View>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        defaultValue={updateName}
                                        placeholder="Nhập tên sản phẩm"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setUpdateName(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteName}</Text>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        defaultValue={updatePrice.toString()}
                                        placeholder="Nhập giá"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setUpdatePrice(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteGia}</Text>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        defaultValue={updateSoLuong.toString()}
                                        placeholder="Nhập số lượng"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setUpdateSoLuong(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteSoLuong}</Text>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        defaultValue={updateMoTa}
                                        placeholder="Nhập số điện thoại"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setUpdateMoTa(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteMota}</Text>

                                <View style={styles.view1}>
                                    <TouchableOpacity
                                        style={styles.view2}
                                        onPress={() => {
                                            requestCameraPermission();
                                        }}>
                                        <Text style={{ textAlign: 'center' }}>Chọn ảnh</Text>
                                    </TouchableOpacity>

                                    {
                                        updateImage && (
                                            <Image
                                                source={{ uri: updateImage }}
                                                style={{ height: 100, width: 100, borderRadius: 5 }}
                                            />
                                        )}

                                </View>
                                <Text style={styles.textVali}>{validteImage}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        updateProductHandler()
                                    }}
                                    style={{
                                        width: 330,
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#80B3FE',
                                        borderRadius: 10,
                                        marginTop: 40,
                                    }}>
                                    <Text style={{ color: '#FFFFFF' }}>Hoàn tất</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
            {/* Modal Thêm mới */}
            <Modal animationType="slide" visible={modalAdd} transparent={true}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1, alignItems: 'center' }}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        <View
                            style={styles.box3}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    margin: 10,
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        TrangDL()
                                        setModleAdd(false)
                                    }}
                                    style={styles.btn_back}>
                                    <Image
                                        style={{ width: 15, height: 15 }}
                                        source={require('./icon/back.png')}
                                    />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={styles.title2}>Thêm sản phẩm mới</Text>
                                </View>
                                <View style={{ width: 30, height: 30 }}></View>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        value={name}
                                        placeholder="Nhập tên sản phẩm"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setName(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteName}</Text>

                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        value={price}
                                        placeholder="Nhập giá"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setPrice(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteGia}</Text>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        value={soLuong}
                                        placeholder="Nhập số lượng"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setSoLuong(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteSoLuong}</Text>
                                <View style={styles.inputAdd}>
                                    <TextInput
                                        style={{ width: 300, color: 'black' }}
                                        value={moTa}
                                        placeholder="Nhập mô tả"
                                        placeholderTextColor={'#8391A1'}
                                        onChangeText={text => {
                                            setMoTa(text);
                                        }}
                                    />
                                </View>
                                <Text style={styles.textVali}>{validteMota}</Text>
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
                                        addProductHandler()
                                    }}
                                    style={{
                                        width: 330,
                                        height: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#80B3FE',
                                        borderRadius: 10,
                                        marginTop: 40,
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

export default ProducManagement;

function getData() {
    throw new Error('Function not implemented.');
}
