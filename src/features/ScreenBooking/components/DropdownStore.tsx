import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { getListStore } from '../util/api';

const DropdownStore = ({onChange,isSelect}) => {
    const [listStore, setListStore] = useState([]);
    const [isFocus, setIsFocus] = useState(false);

    useEffect(() => {
        const getdataStore = async () => {
          const list = await getListStore();
          console.log('Danh sách ', list);
          setListStore(list);
        };
        getdataStore();
    }, []);

    const renderItem = (item) => {
        return (
          <TouchableOpacity
            onPress={() => {
              onChange(item);
              setIsFocus(false);
            }}>
            <View style={styles.item}>
              <Text style={styles.textItem}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
    };

    return (
        <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={listStore}
            search
            maxHeight={300}
            labelField="name"
            valueField="_id"
            placeholder={!isFocus ? (isSelect ? isSelect.name : 'Chọn cửa hàng tìm kiếm') : '...'}
            searchPlaceholder="Tìm kiếm..."
            value={isSelect._id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              onChange(item);
              setIsFocus(false);
            }}
            renderItem={renderItem}
        />
    )
}

export default DropdownStore

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        minWidth: '40%',
        borderRadius: 10,
        padding: 13,
        marginVertical: 14,
        marginHorizontal: 14,
        backgroundColor: '#F7F8F9',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
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
    iconStyle: {
        width: 20,
        height: 20,
    },
})