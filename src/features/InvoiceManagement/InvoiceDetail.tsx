import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Product {
  productId: {
    _id: string;
    name: string;
  };
  quantity: number;
}

interface Service {
  serviceId: {
    _id: string;
    nameService: string;
  };
}

interface InvoiceDetailProps {
  invoice: {
    customerName: string;
    phoneNumber: string;
    products: Product[];
    services: Service[];
    totalAmount: number;
    paymentMethod: string;
  };
}

const InvoiceDetail: React.FC<InvoiceDetailProps> = ({invoice}) => {
  const {
    customerName,
    phoneNumber,
    products,
    services,
    totalAmount,
    paymentMethod,
  } = invoice;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết hóa đơn</Text>
      <Text>Tên khách hàng: {customerName}</Text>
      <Text>Số điện thoại: {phoneNumber}</Text>
      <Text>Tổng tiền: {totalAmount}</Text>
      <Text>Hình thức thanh toán: {paymentMethod}</Text>
      <Text>Sản phẩm:</Text>
      {products.map(product => (
        <Text key={product.productId._id}>
          {product.productId.name} - {product.quantity}
        </Text>
      ))}
      <Text>Dịch vụ:</Text>
      {services.map(service => (
        <Text key={service.serviceId._id}>{service.serviceId.nameService}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default InvoiceDetail;
