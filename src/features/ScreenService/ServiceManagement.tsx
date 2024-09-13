import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  addService,
  deleteSevice,
  getListServices,
  Updatesevice,
} from './util/service';
import { getListCategorys } from '../ScreenCategory/util/category';
import DropDownPicker from 'react-native-dropdown-picker';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import currency from 'currency.js';
import { styles } from './styles/styleService';

let idService = '';
const ServiceManagement = () => {
  const [Data, setData] = useState(null)
  const [modalAdd, setModleAdd] = useState(false)
  const [modalUpdate, setModleUpdate] = useState(false)
  const [modalChiTiet, setModleChiTiet] = useState(false)

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [stt, setSTT] = useState("")
  const [tenDV, setTenDV] = useState("")
  const [danhMuc, setDanhMuc] = useState("")
  const [moTa, setMoTa] = useState("")
  const [gia, setGia] = useState('')
  const [thoiLuong, setThoiLuong] = useState("")

  const [idUpdataDV, setUpdataIdDV] = useState("")
  const [tenUpdataDV, setUpdataTenDV] = useState("")
  const [UpdatadanhMuc, setUpdataDanhMuc] = useState("")
  const [UpdatamoTa, setUpdataMoTa] = useState("")
  const [Updatagia, setUpdataGia] = useState('')
  const [UpdatathoiLuong, setUpdataThoiLuong] = useState("")
  const [UpdatangayTao, setUpdataNgayTao] = useState("")
  const [UpdatangayUpdate, setUpdataNgayUpdate] = useState("")


  const [validteTen, setValidteTen] = useState("")
  const [validteDanhMuc, setValiDanhMuc] = useState("")
  const [validteMoTa, setValiMoTa] = useState("")
  const [validteGia, setValiGia] = useState("")
  const [validteThoiLuong, setValiThoiLuong] = useState("")



  //Ngày thực
  const date = new Date
  const ngayTao = date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  useEffect(() => {
    getData();
  }, []);
  // hàm lấy dữ liệu dịch vụ
  async function getData() {
    const data = await getListServices();
    setData(data.reverse());
  }

  // láy dữ liệu add vào Drop dịch vụ
  useEffect(() => {
    async function fetchData() {
      const data = await getListCategorys();

      // Chuyển đổi dữ liệu từ API thành định dạng mà DropDownPicker cần
      const formattedItems = data.map(item => ({
        label: item.nameCategory, // giả sử item có thuộc tính 'name'
        value: item._id, // giả sử item có thuộc tính 'id'
        key: item._id,
      }));

      setItems(formattedItems);
    }

    fetchData();
  }, []);

  // Trắng dữ liệu khi thêm tc
  const TrangDL = () => {
    setTenDV('');
    setDanhMuc('');
    setMoTa('');
    setGia('');
    setThoiLuong('');
    setValue(null);

    setValidteTen('');
    setValiDanhMuc('');
    setValiMoTa('');
    setValiGia('');
    setValiThoiLuong('');
  };

  //Kiểm tra dữ liệu add
  const kTraAdd = () => {
    let isValid = true;

    // Kiểm tra trường "Tên Dịch Vụ"
    if (tenDV.trim() === '') {
      setValidteTen('Không được để trống tên');
      isValid = false;
    } else if (tenDV.length < 5) {
      setValidteTen('Độ dài phải hơn 5 ký tự');
      isValid = false;
    } else {
      setValidteTen(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    // Kiểm tra trường "Danh Mục"
    if (value === null) {
      setValiDanhMuc('Vui lòng chọn danh mục');
      isValid = false;
    } else {
      setValiDanhMuc(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    // Kiểm tra trường "Mô Tả"
    if (moTa.trim() === '') {
      setValiMoTa('Không được để trống mô tả');
      isValid = false;
    } else if (moTa.length < 10) {
      setValiMoTa('Độ dài phải hơn 10 ký tự');
      isValid = false;
    } else {
      setValiMoTa(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    // Kiểm tra trường "Giá"
    if (gia.trim() === '') {
      setValiGia('Không được để trống giá');
      isValid = false;
    } else if (isNaN(Number(gia))) {
      setValiGia('Giá phải là số');
      isValid = false;
    } else if (Number(gia) <= 0) {
      setValiGia('Giá phải lớn hơn 0');
      isValid = false;
    } else {
      setValiGia(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    // Kiểm tra trường "Thời Lượng"
    if (thoiLuong.trim() === '') {
      setValiThoiLuong('Không được để trống thời lượng');
      isValid = false;
    } else if (isNaN(Number(thoiLuong))) {
      setValiThoiLuong('Thời lượng phải là số');
      isValid = false;
    } else if (Number(thoiLuong) <= 0) {
      setValiThoiLuong('Thời lượng phải lớn hơn 0');
      isValid = false;
    } else {
      setValiThoiLuong(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    return isValid;
  };

  //Them moi
  async function addServiceHandler() {
    if (kTraAdd()) {
      const service = { nameService: tenDV, descreption: moTa, price: gia, duration: thoiLuong, id_category: danhMuc }
      const isAdd = await addService(service)
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

  // chuwcs nang xoa
  function deleteSeviceHandler(id: any) {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa danh mục này?',
      [
        {
          text: 'Có',
          onPress: async () => {
            const isDelete = await deleteSevice(id);
            if (isDelete) {
              ToastAndroid.show('Xóa dịch vụ thành công', ToastAndroid.SHORT);
              getData();
            } else {
              Alert.alert('Lỗi khi xóa dịch vụ vui lòng thử lại sau ');
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

  //Kiểm tra dữ liệu update
  const kTraUpdata = () => {
    if (tenUpdataDV.trim() === '') {
      setValidteTen('Không được để trống tên');
      return false;
    } else if (tenUpdataDV.length < 5) {
      setValidteTen('Độ dài phải hơn 5 ký tự');
      return false;
    } else {
      setValidteTen(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    if (UpdatamoTa.trim() === '') {
      setValiMoTa('Không được để trống mô tả');
      return false;
    } else if (UpdatamoTa.length < 10) {
      setValiMoTa('Độ dài phải hơn 10 ký tự');
      return false;
    } else {
      setValiMoTa(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    if (Updatagia === '') {
      setValiGia('Không được để trống giá');
      return false;
    } else if (isNaN(Number(Updatagia))) {
      setValiGia('Giá phải là số');
      return false;
    } else if (Number(Updatagia) <= 0) {
      setValiGia('Giá phải lớn hơn 0');
      return false;
    } else {
      setValiGia(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    if (UpdatathoiLuong.trim() === '') {
      setValiThoiLuong('Không được để trống thời lượng');
      return false;
    } else if (isNaN(Number(UpdatathoiLuong))) {
      setValiThoiLuong('Thời lượng phải là số');
      return false;
    } else if (Number(UpdatathoiLuong) <= 0) {
      setValiThoiLuong('Thời lượng phải lớn hơn 0');
      return false;
    } else {
      setValiThoiLuong(''); // Xóa thông báo lỗi nếu không có lỗi
    }

    return true;
  };

  //Chuc nang sua
  async function updateServiceHandler() {
    if (kTraUpdata()) {
      const service = { nameService: tenUpdataDV, descreption: UpdatamoTa, price: Updatagia, duration: UpdatathoiLuong, id_category: UpdatadanhMuc }
      const isAdd = await Updatesevice(idUpdataDV, service)
      if (isAdd) {
        ToastAndroid.show('Sửa dịch vụ mới thành công', ToastAndroid.SHORT)
        setModleUpdate(false)
        TrangDL()
        getData();
      } else {
        Alert.alert('Lỗi khi Sửa dịch vụ  vui lòng thử lại sau ')
      }
    } else {
      console.log('Looix');

    }

  }

  // const formattedPrice = currency(gia, { symbol: 'VND ', separator: ',', decimal: '.' }).format();

  // item flatlis
  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      onPress={() => { setModleChiTiet(true), setSTT(index + 1), setUpdataIdDV(item._id), setUpdataTenDV(item.nameService), setUpdataDanhMuc(item.id_category), setUpdataMoTa(item.descreption), setUpdataGia(item.price), setUpdataThoiLuong(item.duration), setUpdataNgayTao(item.createdAt), setUpdataNgayUpdate(item.updatedAt) }}
      style={styles.item}
    >
      <View style={{ justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>{index + 1}</Text>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <Text style={styles.text}>Tên dịch vụ: {item.nameService}</Text>
        <Text style={styles.text}>Giá: {currency(item.price, { symbol: ' ', separator: ',', precision: 0 }).format()} VND</Text>
        {/* <Text style={style.text}>Thời Lượng: {item.thoiLuong}</Text>
                <Text style={style.text}>Ngày tạo: {item.ngayTao}</Text> */}
      </View>
      <View style={{ height: 70, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => {
          deleteSeviceHandler(idService = item._id)
        }}>
          <Image style={{ width: 20, height: 20, }} source={require('./icon/bin.png')} />
        </TouchableOpacity>
        <View style={{ height: 30 }}></View>
        <TouchableOpacity onPress={() => { setModleUpdate(true), setSTT(index + 1), setUpdataIdDV(item._id), setUpdataTenDV(item.nameService), setValue(item.id_category), setUpdataMoTa(item.descreption), setUpdataGia(item.price), setUpdataThoiLuong(item.duration) }}>
          <Image style={{ width: 20, height: 20, }} source={require('./icon/refresh.png')} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.boby}>
      <ImageBackground source={require('./anh/image.png')} style={styles.top}>
        <View style={{ alignItems: 'center' }}>
          {/* Tìm kiếm */}
          <View style={styles.inputSearch}>
            <TextInput
              style={{ width: 300 }}
              placeholder="Tìm kiếm dịch vụ"
              placeholderTextColor={'#8391A1'}
            />

            <View style={{ justifyContent: 'center' }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require('./icon/search.png')}
              />
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <Text style={styles.title}>
            Danh sách dịch vụ
          </Text>
        </View>

        <View>
          <FlatList
            style={{ height: "170%", marginTop: 20 }}
            data={Data}
            renderItem={renderItem}
          // keyExtractor={(item, index) => index.toString()}
          />
          {/* Modal Chi tiết */}
          <Modal
            animationType='slide'
            visible={modalChiTiet
            }
            transparent={true}>
            <View style={styles.box1}>
              <View style={styles.box2}>
                <Text style={styles.title}>Chi tiết dịch vụ</Text>
                <View style={{ marginLeft: 30, height: '70%' }}>
                  <Text style={styles.text}>STT: {stt}</Text>
                  <Text style={styles.text}>Tên dịch vụ: {tenUpdataDV}</Text>
                  <Text style={styles.text}>Danh mục: {UpdatadanhMuc}</Text>
                  <Text style={styles.text}>Mô tả: {UpdatamoTa}</Text>
                  <Text style={styles.text}>Giá: {currency(Updatagia, { symbol: ' ', separator: ',', precision: 0 }).format()} VND</Text>
                  <Text style={styles.text}>Thời Lượng: {UpdatathoiLuong} phút</Text>
                  <Text style={styles.text}>Ngày tạo: {UpdatangayTao.slice(0, 10)}</Text>
                  <Text style={styles.text}>Cập nhật gần nhất: {UpdatangayUpdate.slice(0, 10)}</Text>
                </View>

                <View style={{ alignItems: 'center', marginTop: 40 }}>
                  <TouchableOpacity
                    style={styles.btn_chucnang}
                    onPress={() => {
                      setModleChiTiet(false), TrangDL();
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

          {/* Modal Sửa */}
          <Modal animationType="slide" visible={modalUpdate} transparent={true}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View
                  style={{
                    width: 350,
                    height: 700,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      margin: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setModleUpdate(false), TrangDL();
                      }}
                      style={styles.btn_back}>
                      <Image
                        style={{ width: 15, height: 15 }}
                        source={require('./icon/back.png')}
                      />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center' }}>
                      <Text style={styles.title2}>Sửa dịch vụ</Text>
                    </View>
                    <View style={{ width: 30, height: 30 }}></View>
                  </View>

                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.inputAdd}>
                      <TextInput
                        style={{ width: 300, color: 'black' }}
                        defaultValue={tenUpdataDV}
                        placeholder="Nhập tên danh mục"
                        placeholderTextColor={'#8391A1'}
                        onChangeText={text => {
                          setUpdataTenDV(text);
                        }}
                      />
                    </View>
                    <Text style={styles.textVali}>{validteTen}</Text>

                    <View
                      style={{
                        position: 'relative',
                        width: 330,
                        height: 45,
                        marginTop: 25,
                        marginBottom: 5,
                      }}>
                      <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Vui lòng chọn danh mục"
                        onChangeValue={(text: any) => {
                          setUpdataDanhMuc(text);
                          console.log(text);
                        }}
                        style={{
                          backgroundColor: '#F7F8F9',
                          borderColor: '#F7F8F9',
                        }}
                        placeholderStyle={{ color: '#8391A1' }}
                      />
                    </View>
                    <Text style={styles.textVali}>{validteDanhMuc}</Text>
                    <View style={styles.inputAdd}>
                      <TextInput
                        style={{ width: 300, color: 'black' }}
                        defaultValue={UpdatamoTa}
                        placeholder="Nhập mô tả"
                        placeholderTextColor={'#8391A1'}
                        onChangeText={text => {
                          setUpdataMoTa(text);
                        }}
                      />
                    </View>
                    <Text style={styles.textVali}>{validteMoTa}</Text>
                    <View style={styles.inputAdd}>
                      <TextInput
                        style={{ width: 300, color: 'black' }}
                        defaultValue={String(Updatagia)}
                        placeholder="Nhập giá"
                        placeholderTextColor={'#8391A1'}
                        onChangeText={text => {
                          setUpdataGia(text);
                        }}
                      />
                    </View>
                    <Text style={styles.textVali}>{validteGia}</Text>
                    <View style={styles.inputAdd}>
                      <TextInput
                        style={{ width: 300, color: 'black' }}
                        defaultValue={UpdatathoiLuong}
                        placeholder="Nhập thời lượng ( Phút )"
                        placeholderTextColor={'#8391A1'}
                        onChangeText={text => {
                          setUpdataThoiLuong(text);
                        }}
                      />
                    </View>
                    <Text style={styles.textVali}>{validteThoiLuong}</Text>

                    <TouchableOpacity
                      onPress={() => {
                        updateServiceHandler();
                      }}
                      style={{
                        width: 330,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#80B3FE',
                        borderRadius: 10,
                        marginTop: 150,
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
                    setModleAdd(false), TrangDL();
                  }}
                  style={styles.btn_back}>
                  <Image
                    style={{ width: 15, height: 15 }}
                    source={require('./icon/back.png')}
                  />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.title2}>Thêm dịch vụ</Text>
                </View>
                <View style={{ width: 30, height: 30 }}></View>
              </View>

              <View style={{ alignItems: 'center' }}>
                <View style={styles.inputAdd}>
                  <TextInput
                    style={{ width: 300, color: 'black' }}
                    value={tenDV}
                    placeholder="Nhập tên dịch vụ"
                    placeholderTextColor={'#8391A1'}
                    onChangeText={text => {
                      setTenDV(text);
                    }}
                  />
                </View>
                <Text style={styles.textVali}>{validteTen}</Text>
                <View
                  style={{
                    position: 'relative',
                    width: 330,
                    height: 45,
                    marginTop: 25,
                    marginBottom: 5,
                  }}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Chọn danh mục"
                    onChangeValue={(text: any) => {
                      setDanhMuc(text);
                    }}
                    style={{ backgroundColor: '#F7F8F9', borderColor: '#F7F8F9' }}
                    placeholderStyle={{ color: '#8391A1' }}
                  />
                </View>
                <Text style={styles.textVali}>{validteDanhMuc}</Text>
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
                <Text style={styles.textVali}>{validteMoTa}</Text>
                <View style={styles.inputAdd}>
                  <TextInput
                    style={{ width: 300, color: 'black' }}
                    value={gia}
                    placeholder="Nhập giá"
                    placeholderTextColor={'#8391A1'}
                    onChangeText={text => {
                      setGia(text);
                    }}
                  />
                </View>
                <Text style={styles.textVali}>{validteGia}</Text>
                <View style={styles.inputAdd}>
                  <TextInput
                    style={{ width: 300, color: 'black' }}
                    value={thoiLuong}
                    placeholder="Nhập thời lượng ( Phút )"
                    placeholderTextColor={'#8391A1'}
                    onChangeText={text => {
                      setThoiLuong(text);
                    }}
                  />
                </View>
                <Text style={styles.textVali}>{validteThoiLuong}</Text>
                <TouchableOpacity
                  onPress={() => {
                    addServiceHandler();
                  }}
                  style={{
                    width: 330,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#80B3FE',
                    borderRadius: 10,
                    marginTop: 150,
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
};
export default ServiceManagement;
