import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

function ListNhanVien({
  tenNhanVien,
  moModalLuaChon,
  capNhat,
}): React.JSX.Element {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetchNhanViens();
  }, [capNhat]);

  useEffect(() => {
    if (tenNhanVien === '') {
      fetchNhanViens();
    } else {
    }
  }, [tenNhanVien]);

  const fetchNhanViens = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.19:3000/api/getListEmployee',
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Có lỗi khi lấy dữ liệu nhân viên:', error);
    }
  };

  const renderNhanVienItem = ({item}) => {
    return (
      <View style={styles.khungItem}>
        <View style={styles.box1}>
          <View style={{width: '85%'}}>
            <Text numberOfLines={1} style={styles.text}>
              Tên nhân viên: {item.tenNhanVien}
            </Text>
            <View style={styles.box}>
              <Icon name="phone" size={20} color={'black'} />
              <Text style={{marginLeft: 5, fontSize: 15, color: 'black'}}>
                Số điện thoại: {item.soDienThoai}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              moModalLuaChon(item);
            }}>
            <Icon
              style={{marginRight: 10}}
              name="list-ul"
              size={20}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={employees}
        renderItem={renderNhanVienItem}
        keyExtractor={item => item._id}
        extraData={employees}
      />
    </SafeAreaView>
  );
}

export default ListNhanVien;

const styles = StyleSheet.create({
  khungItem: {
    backgroundColor: '#E8E8E8',
    height: 70,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  text: {
    width: '100%',
    color: 'black',
    fontSize: 15,
  },
  box: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
  },
  box1: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});
