import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Radio from '../features/EmployeeManagement/RadioNhanVien';
import DropdownStore from './DropdownStore';
import Employee from '../services/models/EmployeeModel';
import { styles } from '../styles/styleRadioEmployee';

interface CustomModalUpdateEmployeeProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (updatedEmployee: Employee) => void;
  employeeOld: Employee; // Nhận thông tin nhân viên cũ
}

const CustomModalUpdateEmployee: React.FC<CustomModalUpdateEmployeeProps> = ({
  visible,
  onClose,
  onUpdate,
  employeeOld,
}) => {
  const [employee, setEmployee] = useState<Employee>(employeeOld);
  const [errors, setErrors] = useState<Partial<Record<keyof Employee, string>>>({});

  useEffect(() => {
    setEmployee(employeeOld);
  }, [employeeOld]);

  const handleInputChange = (field: keyof Employee, value: string) => {
    setEmployee(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleStoreSelect = (idStore: string) => {
    setEmployee(prevState => ({
      ...prevState,
      id_store: idStore,
    }));
  };

  const handleRoleSelect = (role: string) => {
    setEmployee(prevState => ({
      ...prevState,
      userRole: role,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Employee, string>> = {};

    if (!employee.fullName) newErrors.fullName = 'Tên nhân viên không được bỏ trống';
    if (!employee.phoneNumber) newErrors.phoneNumber = 'Số điện thoại không được bỏ trống';
    if (!employee.email) newErrors.email = 'Email không được bỏ trống';
    if (!employee.id_store) newErrors.id_store = 'Cửa hàng không được bỏ trống';
    if (!employee.password) newErrors.password = 'Mật khẩu không được bỏ trống';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateEmployee = () => {
    if (validateForm()) {
      onUpdate(employee);
      onClose(); // Đóng modal sau khi cập nhật
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" size={20} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Cập nhật thông tin nhân viên</Text>

            <TextInput
              style={styles.input}
              placeholder="Tên nhân viên"
              value={employee.fullName}
              onChangeText={text => handleInputChange('fullName', text)}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            <DropdownStore onSelectStore={handleStoreSelect} selectValue={employee.id_store} />
            {errors.id_store && (
              <Text style={styles.errorText}>{errors.id_store}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={employee.email}
              onChangeText={text => handleInputChange('email', text)}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry={true}
              value={employee.password}
              onChangeText={text => handleInputChange('password', text)}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={employee.phoneNumber}
              onChangeText={text => handleInputChange('phoneNumber', text)}
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Địa chỉ"
              value={employee.address}
              onChangeText={text => handleInputChange('address', text)}
            />
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}

            <Text style={styles.label}>Phân quyền người dùng</Text>
            <Radio choiseRole={handleRoleSelect} userRole={employee.userRole || ''} />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleUpdateEmployee}>
              <Text style={styles.submitButtonText}>Cập nhật</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModalUpdateEmployee;
