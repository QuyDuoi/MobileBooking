import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import InvoiceItem from './InvoiceItem';
import SearchInvoice from './SearchInvoice';
import { getListInvoice } from './apiInvoice';

interface Invoice {
  _id: string;
  customerName: string;
  phoneNumber: string;
  paymentStatus: string;
}

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    getListInvoice().then((data) => {
      setInvoices(data);
      setFilteredInvoices(data);
    });
  }, []);

  const handleSearch = (query: string) => {
    const result = invoices.filter((invoice) =>
      invoice.customerName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInvoices(result);
  };

  return (
    <View style={styles.container}>
      <SearchInvoice onSearch={handleSearch} />
      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <InvoiceItem invoice={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default InvoiceList;
