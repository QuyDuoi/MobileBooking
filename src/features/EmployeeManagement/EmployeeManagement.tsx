import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListNhanVien from './ListEmployee/ListNhanVien';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownComponent from '../../customcomponent/DropdownComponent';
import Radio from './RadioBoxEmployee/RadioNhanVien';
import CustomThongBao from '../../customcomponent/CustomThongBao';

function EmployeeManagement(): React.JSX.Element {
  const [modalLuaChon, setModalLuaChon] = useState(false);
  const [modalChiTiet, setModalChiTiet] = useState(false);
  const [infoEmployee, setInfoEmployee] = useState('');
  const [modalThemNv, setModalThemNv] = useState(false);
  const [modalCapNhat, setModalCapNhat] = useState(false);
  const [idEmployee, setIdEmployee] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [idTrangThai, setIdTrangThai] = useState('1');
  const [trangThai, setTrangThai] = useState(0);
  const [tenCongViec, setTenCongViec] = useState('');
  const [moTaCongViec, setMoTaCongViec] = useState('');
  const [ngayBatDau, setNgayBatDau] = useState('');
  const [ngayKetThuc, setNgayKetThuc] = useState('');
  const [maKhachHang, setMaKhachHang] = useState('');
  const [trangThaiCv, setTrangThaiCv] = useState(0);
  const [error1, setError1] = useState('');
  const [error2, setError2] = useState('');
  const [error3, setError3] = useState('');
  const [error4, setError4] = useState('');
  const [error5, setError5] = useState('');
  const [error6, setError6] = useState('');
  const [trangThaiThem, setTrangThaiThem] = useState(false);
  const [catNhapDuLieu, setCapNhatDuLieu] = useState(false);
  const [modalThongBao, setModalThongBao] = useState(false);

  return (
    <View style={styles.container}>
      <Image
        style={styles.trangTri}
        source={require('../../images/trangTri.png')}
      />
      <View
        style={{
          marginHorizontal: 30,
          marginVertical: 20,
        }}>
        <TextInput style={styles.timKiem} placeholder="Tìm kiếm nhân viên" />
        <TouchableOpacity style={styles.searchTen}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../../images/search.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.box1}>
        <Text style={styles.title}>Danh sách nhân viên</Text>
        <ListNhanVien
          moModalLuaChon={item => {
            setModalLuaChon(true), setInfoEmployee(item);
          }}
          capNhat={catNhapDuLieu}
          tenNhanVien={fullName}
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
              setModalThemNv(true);
            }}>
            <Text style={{fontSize: 35, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalLuaChon}>
        <View style={styles.modalLuaChon}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              setModalLuaChon(false);
            }}>
            <Icon name="chevron-left" size={18} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.text}>Chọn chức năng</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalCapNhat(true);
              setTrangThaiThem(false);
            }}>
            <Text style={styles.text1}>Cập nhật thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalChiTiet(true);
            }}>
            <Text style={styles.text1}>Xem chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text1}>Khôi phục mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.text1}>Giao nhiệm vụ</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalChiTiet}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalChiTiet(false);
        }}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Image
            style={styles.trangTri}
            source={require('../../images/trangTri.png')}
          />
          <View style={styles.modalChiTiet}>
            <Text style={styles.text2}>Thông tin nhân viên</Text>
            <View style={styles.box2}>
              <Text numberOfLines={2} style={styles.text3}>
                Tên nhân viên:
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Email:
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Số điện thoại:
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Tài khoản:
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Vai trò:{' '}
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Trạng thái hoạt động:{' '}
              </Text>
              <View style={{width: '100%', position: 'absolute', bottom: 10}}>
                <TouchableOpacity
                  style={styles.btnQuayLai}
                  onPress={() => {
                    setModalChiTiet(false);
                  }}>
                  <Text style={styles.text1}>Quay lại</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalThemNv}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalThemNv(false);
        }}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Image
            style={styles.trangTri}
            source={require('../../images/trangTri.png')}
          />
          <View style={styles.modalChiTiet}>
            <TouchableOpacity
              style={styles.backH}
              onPress={() => {
                setModalThemNv(false);
              }}>
              <Icon name="angle-left" size={18} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.text2}>Thêm nhân viên mới</Text>
            {!trangThaiThem ? (
              <View style={styles.viewThem}>
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Tên nhân viên"
                    onChangeText={text => {
                      setFullName(text);
                    }}
                  />
                </View>
                {error1 && <Text style={styles.errorText}>{error1}</Text>}
                <View style={styles.viewInput}>
                  <View style={styles.dropdown}>
                    {/* <DropdownComponent
                      onSelectVaiTro={value => {
                        setAddress(value);
                      }}
                      selectValue={null}
                    /> */}
                  </View>
                </View>
                {error3 && <Text style={styles.errorText}>{error3}</Text>}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                  />
                </View>
                {error4 && <Text style={styles.errorText}>{error4}</Text>}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChangeText={text => {
                      setPhoneNumber(text);
                    }}
                  />
                </View>
                {error2 && <Text style={styles.errorText}>{error2}</Text>}
                <View style={{width: '100%'}}>
                  <TouchableOpacity style={styles.btnQuayLai}>
                    <Text style={styles.text1}>Tiếp tục</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {trangThaiThem ? (
              <View style={styles.viewThem}>
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Tài khoản"
                    onChangeText={text => {
                      setEmail(text);
                    }}
                  />
                </View>
                {error5 && <Text style={styles.errorText}>{error5}</Text>}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Mật khẩu"
                    onChangeText={text => {
                      setMatKhau(text);
                    }}
                  />
                </View>
                {error6 && <Text style={styles.errorText}>{error6}</Text>}
                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginTop: 10,
                      marginLeft: 20,
                    }}>
                    Trạng thái hoạt động
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <Radio
                    chonTrangThai={item => setIdTrangThai(item)}
                    trangThai={null}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={styles.btnXacNhan}
                    onPress={() => {
                      setTrangThaiThem(false);
                    }}>
                    <Text style={styles.text1}>Quay lại</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnXacNhan}>
                    <Text style={styles.text1}>Lưu thông tin</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalCapNhat}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalChiTiet(false);
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Image
              style={styles.trangTri}
              source={require('../../images/trangTri.png')}
            />
            <View style={styles.modalChiTiet}>
              <TouchableOpacity
                style={styles.backH}
                onPress={() => {
                  setModalCapNhat(false);
                }}>
                <Icon name="angle-left" size={18} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.text2}>Cập nhật thông tin</Text>
              <View style={styles.viewThem}>
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Tên nhân viên"
                    value={fullName}
                    onChangeText={text => {
                      setFullName(text);
                    }}
                  />
                </View>
                {error1 && <Text style={styles.errorText}>{error1}</Text>}
                <View style={styles.viewInput}>
                  <View style={styles.dropdown}>
                    {/* <DropdownComponent
                      onSelectVaiTro={value => {
                        setAddress(value);
                      }}
                      selectValue={infoEmployee.vaiTro}
                    /> */}
                  </View>
                </View>
                {error3 && <Text style={styles.errorText}>{error3}</Text>}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                  />
                </View>
                {error4 && <Text style={styles.errorText}>{error4}</Text>}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChangeText={text => {
                      setPhoneNumber(text);
                    }}
                  />
                </View>
                {error2 && <Text style={styles.errorText}>{error2}</Text>}
              </View>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginLeft: 20,
                  }}>
                  Trạng thái hoạt động
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <Radio
                  chonTrangThai={item => setIdTrangThai(item)}
                  trangThai={infoEmployee.trangThai}
                />
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity style={styles.btnQuayLai} onPress={() => {}}>
                  <Text style={styles.text1}>Lưu thông tin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export default EmployeeManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timKiem: {
    borderRadius: 8,
    paddingLeft: 20,
    backgroundColor: 'white',
    color: 'black',
    paddingRight: 55,
  },
  trangTri: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  box1: {
    backgroundColor: 'white',
    height: '85%',
    marginHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  modalLuaChon: {
    width: 380,
    height: 582,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 20,
  },
  image: {
    width: 204,
    height: 200,
  },
  text: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    marginVertical: 10,
  },
  text1: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 12,
  },
  back: {
    width: 25,
    height: 25,
    borderRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
  },
  btnThem: {
    width: 50,
    height: 50,
    backgroundColor: '#FBD141',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modalChiTiet: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingVertical: 20,
    height: '92%',
  },
  text2: {
    margin: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  box2: {
    width: '90%',
    margin: 10,
    borderRadius: 20,
    height: '70%',
    backgroundColor: '#F7F8F9',
  },
  text3: {
    marginLeft: 12,
    marginTop: 14,
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  btnQuayLai: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  backH: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
    borderWidth: 1,
  },
  edittext: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 10,
    borderColor: '#E8ECF4',
    marginTop: 15,
    paddingLeft: 15,
  },
  dropdown: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 10,
    borderColor: '#E8ECF4',
    marginTop: 15,
  },
  viewThem: {
    width: '100%',
  },
  viewInput: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    marginLeft: '7%',
    marginTop: 5,
    color: 'red',
  },
  btnXacNhan: {
    width: '45%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  modalThanhCong: {
    width: 320,
    height: 60,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    borderRadius: 10,
    borderWidth: 1,
  },
  tenNhanVien: {
    color: 'black',
    marginLeft: 20,
    marginVertical: 10,
    fontSize: 16,
  },
  searchTen: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
