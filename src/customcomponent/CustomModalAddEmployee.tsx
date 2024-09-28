import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Radio from '../features/EmployeeManagement/RadioNhanVien';
import DropdownStore from './DropdownStore';
import Employee from '../services/models/EmployeeModel';
import {styles} from '../styles/styleRadioEmployee';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface CustomModalAddEmployeeProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (employee: Employee) => void;
}

const CustomModalAddEmployee: React.FC<CustomModalAddEmployeeProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [employee, setEmployee] = useState<Employee>(new Employee('', '', ''));
  const [errors, setErrors] = useState<Partial<Record<keyof Employee, string>>>(
    {},
  );
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleCloseModal = () => {
    setEmployee(new Employee('', '', '', '', '', '', '')); // Reset employee
    onClose(); // Gọi hàm onClose đã truyền vào props
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof Employee, string>> = {};

    if (!employee.fullName)
      newErrors.fullName = 'Tên nhân viên không được bỏ trống';
    if (!employee.phoneNumber)
      newErrors.phoneNumber = 'Số điện thoại không được bỏ trống';
    if (!employee.email) newErrors.email = 'Email không được bỏ trống';
    if (!employee.id_store) newErrors.id_store = 'Cửa hàng không được bỏ trống';
    if (!employee.password) newErrors.password = 'Mật khẩu không được bỏ trống';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddEmployee = () => {
    if (validateForm()) {
      console.log(employee);
      if (!employee.userRole) {
        setEmployee(prevState => ({
          ...prevState,
          userRole: 'admin', // Gán giá trị mặc định nếu userRole trống
        }));
      }
      onSubmit(employee);
      setEmployee(new Employee('', '', '', '', '', '', ''));
      onClose(); // Close modal after submitting
    }
  };

  const openCamera = async () => {
    await launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      response => {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          console.log('Ảnh được chụp: ', uri);
          setEmployee(prevState => ({
            ...prevState,
            image: uri || undefined,
          }));
        } else {
          setEmployee(prevState => ({
            ...prevState,
            image: undefined,
          }));
        }
        setModalVisible(false);
      },
    );
  };

  const openImageLibrary = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        console.log('Ảnh được chọn: ', uri);
        setEmployee(prevState => ({
          ...prevState,
          image: uri || undefined,
        }));
      } else {
        setEmployee(prevState => ({
          ...prevState,
          image: undefined,
        }));
      }
      setModalVisible(false);
    });
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
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Icon name="close" size={20} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Thêm nhân viên mới</Text>

            {/* Image Selection */}
            <View style={styles.boxImage}>
              <View style={styles.imageContainer}>
                {employee.image ? (
                  <Image source={{uri: employee.image}} style={styles.image} />
                ) : (
                  <Text style={styles.placeholderText}>No image selected</Text>
                )}
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => setModalVisible(true)}>
                  <Icon name="camera" size={15} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Tên nhân viên"
              value={employee.fullName}
              onChangeText={text => handleInputChange('fullName', text)}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            <DropdownStore
              onSelectStore={handleStoreSelect}
              selectValue={employee.id_store}
            />
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
            <Radio
              choiseRole={handleRoleSelect}
              userRole={employee.userRole || ''}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddEmployee}>
              <Text style={styles.submitButtonText}>Thêm nhân viên</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      {/* Modal for Image Options */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalContainerChoice}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalContentChoice}>
            <TouchableOpacity style={styles.modalButton} onPress={openCamera}>
              <Text style={styles.modalButtonText}>Chụp ảnh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={openImageLibrary}>
              <Text style={styles.modalButtonText}>Chọn ảnh từ thư viện</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </Modal>
  );
};

export default CustomModalAddEmployee;
