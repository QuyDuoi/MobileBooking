import React, { useState } from 'react'
import { Alert, FlatList, Image, ImageBackground, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Data = [
    {
        id: 1, tenDichVu: "abc", danhMuc: "abc", moTa: "abc", gia: 123, thoiLuong: "1h30p", ngayTao: "23/8/2024"
    },
    {
        id: 2, tenDichVu: "abc", danhMuc: "abc", moTa: "abc", gia: 123, thoiLuong: "1h30p", ngayTao: "23/8/2024"
    },
    {
        id: 3, tenDichVu: "abc", danhMuc: "abc", moTa: "abc", gia: 123, thoiLuong: "1h30p", ngayTao: "23/8/2024"
    },
    {
        id: 4, tenDichVu: "abc", danhMuc: "abc", moTa: "abc", gia: 123, thoiLuong: "1h30p", ngayTao: "23/8/2024"
    },
    {
        id: 5, tenDichVu: "abc", danhMuc: "abc", moTa: "abc", gia: 123, thoiLuong: "1h30p", ngayTao: "23/8/2024"
    },
    {
        id: 6, tenDichVu: "abc", danhMuc: "abc", moTa: "abc", gia: 123, thoiLuong: "1h30p", ngayTao: "23/8/2024"
    },
    {
        id: 7, tenDichVu: "abc", danhMuc: "abc", moTa: "abc", gia: 123, thoiLuong: "1h30p", ngayTao: "23/8/2024"
    }

]


const ServiceManagement = () => {
    const [modalAdd, setModleAdd] = useState(false)
    const [modalDelete, setModleDelete] = useState(false)
    const [modalUpdate, setModleUpdate] = useState(false)
    const [modalChiTiet, setModleChiTiet] = useState(false)
    const [modal, setModle] = useState(false)

    const [idDV, setIdDV] = useState("")
    const [tenDV, setTenDV] = useState("")
    const [danhMuc, setDanhMuc] = useState("")
    const [moTa, setMoTa] = useState("")
    const [gia, setGia] = useState("")
    const [thoiLuong, setThoiLuong] = useState("")
    const [ngayTao, setNgayTao] = useState("")

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => { setModleChiTiet(true), setIdDV(item.id), setTenDV(item.tenDichVu), setDanhMuc(item.danhMuc), setMoTa(item.moTa), setGia(item.gia), setThoiLuong(item.thoiLuong), setNgayTao(item.ngayTao) }}
            style={style.item}>
            <View>
                <Text style={style.text}>STT: {item.id}</Text>
                <Text style={style.text}>Tên dịch vụ: {item.tenDichVu}</Text>
                <Text style={style.text}>Danh mục: {item.danhMuc}</Text>
                <Text style={style.text}>Gia: {item.gia}</Text>
                {/* <Text style={style.text}>Thời Lượng: {item.thoiLuong}</Text>
                <Text style={style.text}>Ngày tạo: {item.ngayTao}</Text> */}
            </View>
            <TouchableOpacity onPress={() => { setModle(true) }}>
                <Image style={{ width: 20, height: 20, }} source={require('./icon/equal-mathematical-sign.png')} />
            </TouchableOpacity>
        </TouchableOpacity>
    )

    return (

        <View style={style.boby}>

            <ImageBackground source={require("./anh/image.png")} style={style.top}>
                <View style={{ alignItems: 'center' }}>

                    <View style={style.inputSearch}>

                        <TextInput style={{ width: 300 }} placeholder='Tìm kiếm dịch vụ' placeholderTextColor={"#8391A1"} />

                        <View style={{ justifyContent: 'center' }}>
                            <Image style={{ width: 20, height: 20, }} source={require('./icon/search.png')} />
                        </View>

                    </View>

                </View>

                <View style={{ alignItems: 'center', marginTop: 40 }}>
                    <Text style={{ color: "black", fontSize: 18, fontWeight: 'bold' }}>Danh sách dịch vụ</Text>
                </View>

                <View>
                    <FlatList
                        style={{ height: "190%", marginTop: 20 }}
                        data={Data}
                        renderItem={renderItem}

                    />
                    {/* Modal Chi tiết */}
                    <Modal
                        animationType='slide'
                        visible={modalChiTiet
                        }
                        transparent={true}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                            <View style={{ width: 350, height: 300, backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 10 }}>Chi tiết dịch vụ</Text>
                                <View style={{marginLeft:30}}>
                                    <Text style={style.text}>STT: {idDV}</Text>
                                    <Text style={style.text}>Tên dịch vụ: {tenDV}</Text>
                                    <Text style={style.text}>Danh mục: {danhMuc}</Text>
                                    <Text style={style.text}>Mô tả: {moTa}</Text>
                                    <Text style={style.text}>Gia: {gia}</Text>
                                    <Text style={style.text}>Thời Lượng: {thoiLuong}</Text>
                                    <Text style={style.text}>Ngày tạo: {ngayTao}</Text>
                                </View>

                                <View style={{alignItems:'center',marginTop:40}}>
                                    <TouchableOpacity style={style.btn_chucnang} onPress={() => { setModleChiTiet(false) }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 'bold' }}>Đóng</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    </Modal>

                    {/* Modal Chọn chức năng */}
                    <Modal
                        animationType='slide'
                        visible={modal}
                        transparent={true}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                            <View style={{ width: 350, height: 120, backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 10 }}>Chọn chức năng</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TouchableOpacity style={style.btn_chucnang} onPress={() => { setModle(false) }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 'bold' }}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.btn_chucnang} onPress={() => { setModleDelete(true) }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 'bold' }}>Xóa</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.btn_chucnang} onPress={() => { setModleUpdate(true) }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 'bold' }}>Sửa</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    {/* Modal Xóa */}
                    <Modal
                        animationType='slide'
                        visible={modalDelete}
                        transparent={true}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                            <View style={{ width: 350, height: 120, backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}>
                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10 }}>Bạn xác nhận xóa không?</Text>
                                <Text style={{ color: '#54595E', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>Are you sure you want to accept this?</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <TouchableOpacity style={style.btn_chucnang} onPress={() => { setModleDelete(false) }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 'bold' }}>Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.btn_chucnang} onPress={() => { setModleDelete(false) }}>
                                        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: 'bold' }}>Xác nhận</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </Modal>

                    {/* Modal Sửa */}
                    <Modal
                        animationType='slide'
                        visible={modalUpdate}
                        transparent={true}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>

                            <KeyboardAwareScrollView >
                                <View style={{ width: 350, height: 700, backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                        <TouchableOpacity
                                            onPress={() => { setModleUpdate(false) }}
                                            style={style.btn_back}>
                                            <Image style={{ width: 15, height: 15 }} source={require('./icon/back.png')} />
                                        </TouchableOpacity>
                                        <View style={{ justifyContent: 'center' }}>
                                            <Text style={style.text}>Sửa dịch vụ</Text>
                                        </View>
                                        <View style={{ width: 30, height: 30 }} ></View>
                                    </View>

                                    <View style={{ alignItems: 'center' }}>
                                        <View style={style.inputAdd}>
                                            <TextInput style={{ width: 300 }} placeholder='Tên dịch vụ' placeholderTextColor={"#8391A1"} />
                                        </View>
                                        <View style={style.inputAdd}>
                                            <TextInput style={{ width: 300 }} placeholder='Danh mục' placeholderTextColor={"#8391A1"} />
                                        </View>
                                        <View style={style.inputAdd}>
                                            <TextInput style={{ width: 300 }} placeholder='Mô tả' placeholderTextColor={"#8391A1"} />
                                        </View>
                                        <View style={style.inputAdd}>
                                            <TextInput style={{ width: 300 }} placeholder='Giá' placeholderTextColor={"#8391A1"} />
                                        </View>
                                        <View style={style.inputAdd}>
                                            <TextInput style={{ width: 300 }} placeholder='Thời lượng' placeholderTextColor={"#8391A1"} />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => { setModleUpdate(false) }}
                                            style={{ width: 330, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E232C', borderRadius: 10, marginTop: 230 }}>
                                            <Text style={{ color: '#FFFFFF' }}>Hoàn tất</Text>
                                        </TouchableOpacity>
                                    </View>



                                </View>
                            </KeyboardAwareScrollView>
                        </View>

                    </Modal>
                </View>

                <TouchableOpacity style={style.btn_add} onPress={() => { setModleAdd(true) }}>
                    <Image style={{ width: 50, height: 50, }} source={require('./icon/add-blue.png')} />
                </TouchableOpacity>

            </ImageBackground>

            {/* Modal Thêm mới */}
            <Modal
                animationType='slide'
                visible={modalAdd}
                transparent={true}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>

                    <KeyboardAwareScrollView >
                        <View style={{ width: 350, height: 700, backgroundColor: 'white', borderWidth: 1, borderRadius: 10 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                                <TouchableOpacity
                                    onPress={() => { setModleAdd(false) }}
                                    style={style.btn_back}>
                                    <Image style={{ width: 15, height: 15 }} source={require('./icon/back.png')} />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text style={style.text}>Thêm dịch vụ</Text>
                                </View>
                                <View style={{ width: 30, height: 30 }} ></View>
                            </View>

                            <View style={{ alignItems: 'center' }}>
                                <View style={style.inputAdd}>
                                    <TextInput style={{ width: 300 }} placeholder='Tên dịch vụ' placeholderTextColor={"#8391A1"} />
                                </View>
                                <View style={style.inputAdd}>
                                    <TextInput style={{ width: 300 }} placeholder='Danh mục' placeholderTextColor={"#8391A1"} />
                                </View>
                                <View style={style.inputAdd}>
                                    <TextInput style={{ width: 300 }} placeholder='Mô tả' placeholderTextColor={"#8391A1"} />
                                </View>
                                <View style={style.inputAdd}>
                                    <TextInput style={{ width: 300 }} placeholder='Giá' placeholderTextColor={"#8391A1"} />
                                </View>
                                <View style={style.inputAdd}>
                                    <TextInput style={{ width: 300 }} placeholder='Thời lượng' placeholderTextColor={"#8391A1"} />
                                </View>
                                <TouchableOpacity
                                    onPress={() => { setModleAdd(false) }}
                                    style={{ width: 330, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1E232C', borderRadius: 10, marginTop: 230 }}>
                                    <Text style={{ color: '#FFFFFF' }}>Hoàn tất</Text>
                                </TouchableOpacity>
                            </View>



                        </View>
                    </KeyboardAwareScrollView>
                </View>

            </Modal>

        </View>
    );
}
const style = StyleSheet.create({
    boby: {
        width: "100%",
        height: "100%",
        backgroundColor: '#F5F5F5'
    },
    top: {
        width: "100%",
        height: 258,
    },
    inputSearch: {
        width: 350,
        height: 45,
        backgroundColor: '#F7F8F9',
        borderRadius: 10,
        marginTop: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15
    },
    inputAdd: {
        width: 330,
        height: 45,
        backgroundColor: '#F7F8F9',
        borderRadius: 10,
        marginTop: 28,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 15
    },
    item: {
        backgroundColor: '#E8E8E8',
        margin: 10,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
    btn_add: {
        alignItems: 'flex-end',
        marginTop: "3%",
        marginEnd: "5%",
    },
    btn_back: {
        width: 30,
        height: 30,
        backgroundColor: "#E8ECF4",
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_chucnang: {
        width: 100,
        height: 40,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E232C'
    }
})

export default ServiceManagement;
