import {Image, Text, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListNhanVien from './ListEmployee';

import CustomModalChoise from '../../customcomponent/CustomModalChoise';
import CustomModalInfo from '../../customcomponent/CustomModalInfo';
import CustomModalAddEmployee from '../../customcomponent/CustomModalAddEmployee';
import {useDispatch, useSelector} from 'react-redux';
import {addNewEmployee, Employee, updateEmployeeThunk} from '../../store/employeeSlice';
import type {AppDispatch} from '../../store/store';
import CustomModalUpdateEmployee from '../../customcomponent/CustomModalUpdateEmployee';
import { styles } from '../../styles/styleEmployee';

function EmployeeManagement(): React.JSX.Element {
  const [modalLuaChon, setModalLuaChon] = useState(false);
  const [modalChiTiet, setModalChiTiet] = useState(false);
  const [infoEmployee, setInfoEmployee] = useState<Employee | null>(null); // Thông tin nhân viên hiện tại
  const [choise, setChoise] = useState(''); // Lựa chọn cửa hàng
  const [modalThemNv, setModalThemNv] = useState(false);
  const [modalCapNhat, setModalCapNhat] = useState(false);
  const [fullName, setFullName] = useState('');
  const [catNhapDuLieu, setCapNhatDuLieu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const createEmployeeFormData = (employee: Employee) => {
    const formData = new FormData();

    // Thêm các trường thông tin của nhân viên
    formData.append('fullName', employee.fullName);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('phoneNumber', employee.phoneNumber || '');
    formData.append('address', employee.address || '');
    formData.append('userRole', employee.userRole || '');
    formData.append('id_store', employee.id_store || '');

    // Kiểm tra xem có ảnh được chọn không
    if (employee.image) {
      const imageUri = employee.image;
      const fileName = imageUri.split('/').pop(); // Lấy tên file từ đường dẫn
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg', // Định dạng ảnh
        name: fileName,
      });
    }

console.log(formData);


    return formData;
};


  const handleAddEmployee = (employee: Employee) => {
    const formData = createEmployeeFormData(employee);
    
    // Dispatch action thêm nhân viên
    dispatch(addNewEmployee(formData)); // Gửi formData lên Redux action
  };

  const handleUpdateEmployee = (employee: Employee) => {
    const formData = createEmployeeFormData(employee);
    console.log(employee);
    dispatch(updateEmployeeThunk({ id:employee._id, formData}));
  };

  useEffect(() => {
    if (choise === 'modalDetail') {
      setModalChiTiet(true);
    } else if (choise === 'modalUpdate') {
      setModalCapNhat(true);
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
          setModalThemNv(false);
        }}
        onSubmit={handleAddEmployee}
      />

      {infoEmployee && (
        <CustomModalUpdateEmployee
          visible={modalCapNhat}
          onClose={() => {
            setModalCapNhat(false);
            setChoise('')
          }}
          onUpdate={handleUpdateEmployee}
          employeeOld={infoEmployee}
        />
      )}
    </View>
  );
}

export default EmployeeManagement;
