import React from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from '../styles/styleEmployee';

function CustomModalChoise({visible, onClose, onShow}) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalLuaChon}>
        <TouchableOpacity style={styles.back} onPress={onClose}>
          <Icon name="chevron-left" size={18} color={'black'} />
        </TouchableOpacity>
        <Text style={styles.text}>Chọn chức năng</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text1}>Cập nhật thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onShow('modalDetail')}>
          <Text style={styles.text1}>Xem chi tiết</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text1}>Khôi phục mật khẩu</Text>
        </TouchableOpacity>
        {/* Các nút chức năng khác */}
      </View>
    </Modal>
  );
}

export default CustomModalChoise;
