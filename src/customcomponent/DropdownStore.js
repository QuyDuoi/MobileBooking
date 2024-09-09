import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStores } from '../store/storeSlice'; // Gọi từ storeSlice

const DropdownStore = ({ onSelectStore, selectValue }) => {
  const dispatch = useDispatch();

  // Lấy danh sách stores và trạng thái từ Redux store
  const stores = useSelector((state) => state.stores.stores);
  const storeStatus = useSelector((state) => state.stores.status);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  // Khi component mount, gọi fetchStores để lấy danh sách cửa hàng
  useEffect(() => {
    if (storeStatus === 'idle') {
      dispatch(fetchStores());
    }
  }, [storeStatus, dispatch]);

  // Nếu có giá trị selectValue truyền vào, cập nhật giá trị dropdown
  useEffect(() => {
    if (selectValue == null) {
      setValue(null);
    } else {
      setValue('' + selectValue);
    }
  }, [selectValue]);

  // Xử lý khi người dùng chọn một item
  const handleSelectItem = (item) => {
    setValue(item.value === value ? null : item.value);
    onSelectStore(item.value); // Gửi giá trị đã chọn ra ngoài thông qua callback
  };

  // Hiển thị mỗi item trong dropdown
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectItem(item)}
        style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  // Chuyển đổi stores thành dữ liệu cho dropdown
  const dropdownData = stores.map((store) => ({
    label: store.name, // Hiển thị tên cửa hàng
    value: store._id, // Lưu trữ id cửa hàng
  }));

  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      data={dropdownData}
      search
      searchPlaceholder='Tìm kiếm cửa hàng'
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Cửa hàng"
      value={value}
      onChange={(item) => {
        setValue(item.value);
        onSelectStore(item.value); // Gửi giá trị đã chọn ra ngoài thông qua callback
        setIsFocus(false);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownStore;

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
