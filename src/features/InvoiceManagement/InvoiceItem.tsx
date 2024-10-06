import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface InvoiceItemProps {
  invoice: {
    _id: string;
    customerName: string;
    phoneNumber: string;
    paymentStatus: string;
  };
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ invoice }) => {
  const { customerName, phoneNumber, paymentStatus } = invoice;

  const handleLongPress = () => {
    // Code xử lý khi giữ lâu để edit
  };

  return (
    <TouchableOpacity onLongPress={handleLongPress} style={styles.item}>
      <Text>Khách hàng: {customerName}</Text>
      <Text>Số điện thoại: {phoneNumber}</Text>
      <Text>Trạng thái thanh toán: {paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default InvoiceItem;
