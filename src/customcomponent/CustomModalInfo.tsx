import React from 'react';
import {Modal, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../styles/styleEmployee';
import {IPV4} from '../services/api';

function CustomModalInfo({visible, onClose, infoEmployee}) {
  if (!infoEmployee) {
    return null;
  }

  const employeeImage = infoEmployee.image
    ? infoEmployee.image.replace('localhost', IPV4)
    : 'https://media.istockphoto.com/id/1499402594/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=05AjriPMBaa0dfVu7JY-SGGkxAHcR0yzIYyxNpW4RIY=';

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          style={styles.trangTri}
          source={require('../images/trangTri.png')}
        />
        <View style={styles.modalChiTiet}>
          <Text style={styles.text2}>Thông tin nhân viên</Text>
          <Image
            style={styles.employeeImage}
            source={{
              uri: employeeImage,
            }}
          />
          <View style={styles.box2}>
            <Text numberOfLines={2} style={styles.text3}>
              Tên nhân viên: {infoEmployee.fullName}
            </Text>
            <Text numberOfLines={2} style={styles.text3}>
              Email: {infoEmployee.email}
            </Text>
            <Text numberOfLines={2} style={styles.text3}>
              Số điện thoại: {infoEmployee.phoneNumber}
            </Text>
            <Text numberOfLines={2} style={styles.text3}>
              Địa chỉ: {infoEmployee.address}
            </Text>
            <Text numberOfLines={2} style={styles.text3}>
              Cửa hàng:{' '}
              {infoEmployee.id_store
                ? `${infoEmployee.id_store.name}, ${infoEmployee.id_store.address}`
                : 'Chưa có thông tin'}
            </Text>

            <Text numberOfLines={2} style={styles.text3}>
              Vai trò:{' '}
              {infoEmployee.userRole === 'admin'
                ? 'Quản trị viên'
                : infoEmployee.userRole === 'storeManagement'
                ? 'Quản lý cửa hàng'
                : 'Nhân viên cửa hàng'}
            </Text>
            <View style={{width: '100%', position: 'absolute', bottom: 10}}>
              <TouchableOpacity style={styles.btnQuayLai} onPress={onClose}>
                <Text style={styles.text1}>Quay lại</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModalInfo;
