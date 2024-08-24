import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  {label: 'Cửa hàng nhỏ 1', value: '1'},
  {label: 'Cửa hàng nhỏ 2', value: '2'},
  {label: 'Cửa hàng nhỏ 3', value: '3'},
  {label: 'Cửa hàng nhỏ 4', value: '4'},
];

const DropdownComponent = ({onSelectVaiTro, selectValue}) => {
  const [value, setValue] = useState(null);
  const handleSelectItem = item => {
    setValue(item.value === value ? null : item.value);
    onSelectVaiTro(item.value);
  };
  useEffect(() => {
    if (selectValue == null) {
    } else {
      setValue('' + selectValue);
    }
  }, [selectValue]);
  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectItem(item)}
        style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Vai trò"
      value={value}
      onChange={item => {
        setValue(item.value);
        onSelectVaiTro(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 10,
    padding: 13,
    backgroundColor: '#F7F8F9',
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },
});
