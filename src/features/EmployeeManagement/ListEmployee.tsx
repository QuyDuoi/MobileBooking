import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {fetchEmployees} from '../../store/employeeSlice';
import {RootState} from '../../store/store';
import removeAccents from 'remove-accents';
import type {AppDispatch} from '../../store/store';

function ListEmployee({
  tenNhanVien,
  moModalLuaChon,
  capNhat,
}): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(
    (state: RootState) => state.employees.employees,
  );
  const status = useSelector((state: RootState) => state.employees.status);

  useEffect(() => {
    if (status === 'idle' || capNhat) {
      dispatch(fetchEmployees());
    }
  }, [dispatch, capNhat, status]);

  // Ép kiểu tên nhân viên
  const normalizeString = (str: string) => {
    return removeAccents(str).toLowerCase();
  };

  const filteredEmployees = tenNhanVien
    ? employees.filter(employee =>
        normalizeString(employee.fullName).includes(
          normalizeString(tenNhanVien),
        ),
      )
    : employees;

  const renderNhanVienItem = ({item}) => {
    return (
      <View style={styles.khungItem}>
        <View style={styles.box1}>
          <View style={{width: '85%'}}>
            <Text numberOfLines={1} style={styles.text}>
              Tên nhân viên: {item.fullName}
            </Text>
            <View style={styles.box}>
              <Icon name="phone" size={20} color={'black'} />
              <Text style={{marginLeft: 5, fontSize: 15, color: 'black'}}>
                Số điện thoại: {item.phoneNumber}
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
        data={filteredEmployees}
        renderItem={renderNhanVienItem}
        keyExtractor={item => item.email}
        extraData={filteredEmployees}
      />
    </SafeAreaView>
  );
}

export default ListEmployee;

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
