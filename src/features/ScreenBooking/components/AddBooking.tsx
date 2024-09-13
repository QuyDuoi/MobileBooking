import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputTextComponents from './InputTextComponents';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {addBooking, getListEmplayee, getListService, getListStore} from '../util/api';
import { isPhoneNumber, isValidDate } from '../util/validate';
import { Booking } from '../models/booking';

const AddBooking = ({onClose}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [FocusAdd, setFocusAdd] = useState(false)

  const [Id_Store, setId_Store] = useState<string | null>(null);
  const [listStore, setlistStore] = useState<Array<{_id: string; name: string}>>([]);

  const [Id_Employee, setId_Employee] = useState(null);
  const [listEmployee, setListEmployee] = useState([]);
  const [isFocusEmployee, setIsFocusEmployee] = useState(false);

  const [listServices, setListServices] = useState([]);
  const [isFocusService, setIsFocusService] = useState(false);
  const [Id_Service, setId_Service] = useState(null);

  const [selectedServices, setSelectedServices] = useState([]);
  const [pricetongge, setpricetongge] = useState(0)

  useEffect(()=>{
    function getPrice(){
      let totalPrice = 0;
      listServices.filter((service)=>{
        selectedServices.forEach(item=>{
          if(service._id == item){
            totalPrice += service.price
          }
        })
      })
      setpricetongge(totalPrice)
    }
     getPrice()
    console.log("selectedServices",selectedServices)
  },[selectedServices])

  useEffect(() => {
    const getdataStore = async () => {
      const list = await getListStore();
      console.log('Danh sách ', list);
      setlistStore(list);
    };
    const getdataService = async () => {
      const list = await getListService();
      console.log('Danh sách ', list);
      setListServices(list);
    };
    getdataStore();
    getdataService();
  }, []);

  useEffect(() => {
    const getdataEmployee = async () => {
      if (Id_Store) {
        const list = await getListEmplayee();
        console.log('Danh sách nhân viên:', list);
        console.log('ID cửa hàng đã chọn:', Id_Store);
        const filteredEmployees = await list.filter(
          (employee: any) => employee.id_store._id == Id_Store,
        );
        setListEmployee(filteredEmployees);
      } else {
        setListEmployee([]);
      }
    };
    getdataEmployee();
  }, [Id_Store]);

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setId_Store(item._id);
          setIsFocus(false);
          console.log('Đã chọn cửa hàng:', item.name, 'với ID:', item._id);
        }}>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemEmployee = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setId_Employee(item._id);
          setIsFocusEmployee(false);
          console.log('Đã chọn nhân viên:', item.fullName, 'với ID:', item._id);
        }}>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.fullName}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemService = (item: any) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.nameService}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  const handleSelectedItemsChange = (items) => {
    setSelectedServices(items);
  };

  const handleAddBooking = async() => {
     const errors = [];
     if (name === '') {
       errors.push('Tên khách hàng không được để trống');
     }
     if (!isPhoneNumber(phone)) {
       errors.push('Số điện thoại không đúng định dạng');
     }
     if (!isValidDate(date)) {
       errors.push('Ngày không đúng định dạng');
     }
     if (Id_Store === null) {
       errors.push('Cửa hàng không được để trống');
     }
     if (Id_Employee === null) {
       errors.push('Nhân viên không được để trống');
     }
     if (selectedServices.length == 0) {
       errors.push('Dịch vụ không được để trống');
     }
     if (errors.length > 0) {
       errors.forEach(error => console.log(error));
     } else {
        const booking ={
        customerName: name,
        phoneNumber: phone,
        dateBooking: date,
        id_employee: Id_Employee,
        id_store: Id_Store,
        services: selectedServices,
        status: false,
        price: pricetongge.toString(),
        note: note
        }
        console.log("booking",booking)
        const isSuccess = await addBooking(booking) 
        if(isSuccess){
          console.log('Thêm thành công !')
           onClose()
        } else {
         console.log('Thêm thất bại !')
           onClose()
        }
     }
     setFocusAdd(true)
    }

    const renderItemtt = item => {
        return (
          <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.nameService}</Text>
            {/* <AntDesign style={styles.icon} color="black" name="Safety" size={20} /> */}
          </View>
        );
      };

      
  return (
    <View style={styles.body}>
      <Text style={styles.title}>Thêm Booking</Text>

      <InputTextComponents
        icon="user"
        value={name}
        placeholder="Nhập tên khách hàng"
        onChangeText={(text) => setName(text)}
      />
      {FocusAdd && name == '' && <Text style={{color:'red',marginStart:8}}>Nhập tên khách hàng !</Text>}
      <View style={{flexDirection: 'row'}}>
        <InputTextComponents
          icon="phone"
          value={phone}
          placeholder="Nhập số điện thoại"
          onChangeText={(text) => setPhone(text)}
          keyboardType="number-pad"
        />
        <InputTextComponents
          style={{marginLeft: 24}}
          icon="date"
          value={date}
          placeholder="dd/mm/yyyy"
          onChangeText={(text) => setDate(text)}
          keyboardType="default"
        />
      </View>
      <View style={{flexDirection: 'row'}}>
         <Text style={{color:'red',marginStart:8,flex:1}}>{FocusAdd && !isPhoneNumber(phone) ? 'Số điện thoại không hợp lệ !':''}</Text>
         <Text style={{color:'red',marginStart:8,flex:1}}>{FocusAdd && !isValidDate(date)? 'Ngày không hợp lệ !': ''}</Text>
              
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={listStore} // Kiểm tra xem dữ liệu này có đúng định dạng không
        search
        maxHeight={300}
        labelField="name" // Phải đảm bảo rằng mỗi item trong listStore có trường "name"
        valueField="_id" // Phải đảm bảo rằng mỗi item trong listStore có trường "_id"
        placeholder={!isFocus ? 'Chọn cửa hàng' : '...'}
        searchPlaceholder="Tìm kiếm..."
        value={Id_Store} // Giá trị được chọn hiện tại
        onFocus={() => setIsFocus(true)} // Khi bắt đầu focus
        onBlur={() => setIsFocus(false)} // Khi mất focus
        onChange={item => {
          setId_Store(item._id); // Cập nhật giá trị được chọn
          setIsFocus(false); // Tắt focus để ẩn danh sách
        }}
        renderItem={renderItem} // Hàm render từng mục
      />
      {FocusAdd && Id_Store == null && <Text style={{color:'red',marginStart:24}}>Vui lòng chọn cửa hàng !</Text>}
      <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listServices}
          labelField="nameService"
          valueField="_id"
          placeholder="Chọn dịch vụ"
          value={selectedServices}
          search
          searchPlaceholder="Search..."
          onChange={item => {
             setSelectedServices(item)
          }}
        //   renderLeftIcon={() => (
            
        //   )}
          renderItem={renderItemtt}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.nameService}</Text>
                <Image source={require('./icons/delete.png')} style={{width:22,height:22,marginStart:4}}/>
              </View>
            </TouchableOpacity>
          )}
        />
        {FocusAdd &&  selectedServices.length == 0 && <Text style={{color:'red',marginStart:24,marginTop:12}}>Vui lòng chọn dịch vụ !</Text>}
        <Dropdown
          style={[styles.dropdown, isFocusEmployee && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={listEmployee}
          search
          maxHeight={300}
          labelField="fullName"
          valueField="_id"
          placeholder={!isFocusEmployee ? 'Chọn nhân viên' : '...'}
          searchPlaceholder="Tìm kiếm..."
          value={Id_Employee}
          onFocus={() => setIsFocusEmployee(true)}
          onBlur={() => setIsFocusEmployee(false)}
          onChange={item => {
            setId_Employee(item._id);
            setIsFocusEmployee(false);
            console.log(
              'Đã chọn nhân viên:',
              item.fullName,
              'với ID:',
              item._id,
            );
          }}
          renderItem={renderItemEmployee}
        />
    {FocusAdd && Id_Employee == null && <Text style={{color:'red',marginStart:24,marginTop:12}}>Vui lòng chọn Nhân viên !</Text>}
      
      
      <View style={styles.inputNote}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholder="Ghi chú"
          value={note}
          onChangeText={(text) => setNote(text)}
        />
      </View>
      
      <Text style={{marginStart:24,marginVertical:12 ,color:'orange',fontWeight:'bold',fontSize:18}}>Tổng cộng: {pricetongge} VNĐ</Text>

      <View style={styles.actionContainer}>
        <TouchableOpacity onPress={() =>onClose()}>
          <Image
            style={styles.actionButton}
            source={{uri: 'https://i.imgur.com/K147jQY.png'}}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {handleAddBooking()}}>
          <Image
            style={styles.actionButton}
            source={{uri: 'https://i.imgur.com/JIrCx2a.png'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddBooking;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
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
  title: {
    marginTop: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
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
  inputNote: {
    height: 100,
    borderRadius: 10,
    padding: 13,
    marginVertical: 8,
    marginHorizontal: 24,
    backgroundColor: '#F7F8F9',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  actionButton: {
    height: 62,
    width: 125,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
