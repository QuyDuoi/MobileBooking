import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import ListBooking from './components/ListBooking';
import AddBooking from './components/AddBooking';
import UpdateBooking from './components/UpdateBooking';
// import MultiSelectComponent from './components/MultiSelectComponent';
import { deleteBooking, getListBooking } from './util/api';
import { ScrollView } from 'react-native-gesture-handler';
import DropdownStore from './components/DropdownStore';

const BookingManagement = ({navigation}) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  const [bookings, setBookings] = useState([]);
  const listStatus = [ 'Chưa xác nhận ', 'Đã xác nhận ','all'];

  const [searchQuery, setSearchQuery] = useState('');

  const [filterStore, setFilterStore] = useState('');

  const [filterStatus, setFilterStatus] = useState(false);
  const [filterStatusValue, setFilterStatusValue] = useState('');
  
  const [showAddBooking, setShowAddBooking] = useState(false);

  const [showUpdateBooking, setShowUpdateBooking] = useState(false);
  const [bookingUpdate, setBookingUpdate] = useState(null);
  
  
  function serachBooking(){
     const listSearch = bookings.filter(item => {
       return item?.customerName?.toLowerCase().includes(searchQuery.toLowerCase());
     });
    setBookings(listSearch)
  }
 function onChange(item){
   setFilterStore(item)
   console.log("store",item)
 }
  useEffect(() => {
    if(searchQuery === ''){
      fetchBookings()
    } else {
      serachBooking()
    }
  }, [searchQuery]);

  function clickUpdateBooking(item){
    setBookingUpdate(item)
    setShowUpdateBooking(true)
  }
  function closeUpdateBooking(){
    setShowUpdateBooking(false)
  }
  const fetchBookings = async () => {
    const bookings = await getListBooking({userId:'66e2994f7265add6ee481b7e'});
    console.log("danh sách booking ",bookings)
    await setBookings(bookings);
  };
  useEffect(() => {
    fetchBookings();
  }, [navigation,showAddBooking,showUpdateBooking]);

  async function filterBookingByStore(){
    const bookingss = await getListBooking({userId:'66e2994f7265add6ee481b7e'});
    const listFilter = bookingss.filter(item=>{
      return item.id_store?._id == filterStore._id
    })
    setBookings(listFilter)
  }
  useEffect(() => {
    if(filterStore){
      filterBookingByStore()
    }
  }, [filterStore])

  const handleDeleteBooking = id => {
      Alert.alert('Xóa lịch hẹn', 'Bạn có chắc chắn muốn xóa lịch hẹn này không?', [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: () => {
            deleteBooking(id).then(data=>{
              if(data){
                fetchBookings();
              }else{
                Alert.alert('Lỗi','Vui lòng thử lại sau');
              }
            })

          },
        },
      ]);
  };

  function closeAddBooking(){
    setShowAddBooking(false)
  }

  const headerFlatlist=()=>{
    return(
      <ImageBackground
        source={require('../ScreenService/anh/image.png')}
        style={{width: '100%',
          height: filterStatus ?240: 130,}}>
        <Text style={styles.title}>List Booking</Text>
         <View style={{flexDirection:'row',marginStart:12,justifyContent:'space-between'}}>
            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>

            
                       <Image
                        style={{width: 28, height: 28,marginRight:2}}
                        source={require('./components/icons/store.png')}
                        />
                      <DropdownStore isSelect={filterStore} onChange={onChange} />
                </View>
          
         </View>
          
        
      </ImageBackground>
    )
  }
  return (
    <View style={styles.body}>
         <View style={{backgroundColor:'#80B3FE'}}>
              <View style={[styles.inputSearch,{marginVertical:12}]}>
                <TextInput
                  style={{width: 300}}
                  placeholder="Nhập tên khách hàng"
                  placeholderTextColor={'#8391A1'}
                  value={searchQuery}
                  onChangeText={text => {
                    setSearchQuery(text);
                  }}
                />
                <View style={{justifyContent: 'center'}}>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../ScreenService/icon/search.png')}
                  />
                </View>
              </View>
         </View>
                
         <TouchableOpacity style={styles.iconContainer} onPress={()=>{setShowAddBooking(true)}}>
          <Image
            style={styles.iconadd}
            source={require('../ScreenCategory/components/src/img/add-square-02.png')}
          />
        </TouchableOpacity>
         <ListBooking clickUpdateBooking={clickUpdateBooking}  handleDeleteBooking={handleDeleteBooking} headerFlatlist={headerFlatlist} listBooking={bookings}/>
             {/* Xử lý về các phần modal thêm xửa xóa  */}
             <Modal
             visible={showAddBooking}
             animationType='slide'
             transparent={true}
             onRequestClose={()=>{setShowAddBooking(false)}}
             >
              {/* <MultiSelectComponent/> */}
                <AddBooking onClose={closeAddBooking}/>
             </Modal>

             <Modal
             visible={showUpdateBooking}
             animationType='slide'
             transparent={true}
             onRequestClose={()=>{setShowUpdateBooking(false)}}
             >
              {/* <MultiSelectComponent/> */}
                <UpdateBooking updateBooking={bookingUpdate} onClose={closeUpdateBooking}/>
             </Modal>
    </View>
  );
};

export default BookingManagement;

const styles = StyleSheet.create({
   body: {
        flex:1,
        backgroundColor: '#F5F5F5',
    },
  container: {
    width: '100%',
    height: 185,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 60,
    zIndex: 1,
  },
  iconadd: {
    height: 55,
    width: 55,
  },
  headerContainer: {
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputSearch: {
    height: 45,
    marginHorizontal:32,
    backgroundColor: '#F7F8F9',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  filterButtonText: {
    color: 'white',
    textAlign: 'center',
  }
});
