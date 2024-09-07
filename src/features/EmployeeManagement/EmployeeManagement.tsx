import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListNhanVien from './ListEmployee';
import {styles} from '../../styles/styleEmployee';
import CustomModalChoise from '../../customcomponent/CustomModalChoise';
import CustomModalInfo from '../../customcomponent/CustomModalInfo';
import CustomModalAddEmployee from '../../customcomponent/CustomModalAddEmployee';
import {useDispatch, useSelector} from 'react-redux';
import {addNewEmployee} from '../../store/employeeSlice';
import type {AppDispatch} from '../../store/store';

function EmployeeManagement(): React.JSX.Element {
  const [modalLuaChon, setModalLuaChon] = useState(false);
  const [modalChiTiet, setModalChiTiet] = useState(false);
  const [infoEmployee, setInfoEmployee] = useState(''); // Thông tin nhân viên hiện tại
  const [choise, setChoise] = useState(''); // Lựa chọn cửa hàng
  const [modalThemNv, setModalThemNv] = useState(false);
  const [modalCapNhat, setModalCapNhat] = useState(false);
  const [fullName, setFullName] = useState('');
  const [catNhapDuLieu, setCapNhatDuLieu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddEmployee = (employee) => {
    dispatch(addNewEmployee(employee));
  };

  useEffect(() => {
    if (choise === 'modalDetail') {
      setModalChiTiet(true);
    }
  }, [choise]);

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
        <TextInput
          style={styles.timKiem}
          placeholder="Tìm kiếm nhân viên"
          onChangeText={text => {
            setFullName(text);
          }}
        />
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

      <CustomModalChoise
        visible={modalLuaChon}
        onClose={() => setModalLuaChon(false)}
        onShow={setChoise}
      />

      <CustomModalInfo
        visible={modalChiTiet}
        onClose={() => {
          setModalChiTiet(false);
          setChoise('');
        }}
        infoEmployee={infoEmployee}
      />

      <CustomModalAddEmployee
        visible={modalThemNv}
        onClose={() => {
          setModalThemNv(false)
        }}
        onSubmit={handleAddEmployee}
      />

    </View>
  );
}

export default EmployeeManagement;
