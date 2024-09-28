import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchInvoiceProps {
  onSearch: (query: string) => void;
}

const SearchInvoice: React.FC<SearchInvoiceProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm theo tên khách hàng"
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SearchInvoice;
