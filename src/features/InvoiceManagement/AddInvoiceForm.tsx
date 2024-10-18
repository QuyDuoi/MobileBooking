import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface AddInvoiceFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  customerName: string;
  phoneNumber: string;
  products: any[];
  services: any[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  id_store: string;
}

const AddInvoiceForm: React.FC<AddInvoiceFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    phoneNumber: '',
    products: [],
    services: [],
    totalAmount: 0,
    paymentMethod: 'cash',
    paymentStatus: 'unpaid',
    id_store: '',
  });

  const handleChange = (name: keyof FormData, value: string | number) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Tên khách hàng"
        value={formData.customerName}
        onChangeText={(value) => handleChange('customerName', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={formData.phoneNumber}
        onChangeText={(value) => handleChange('phoneNumber', value)}
      />
      {/* Các trường khác */}
      <Button title="Thêm mới" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddInvoiceForm;