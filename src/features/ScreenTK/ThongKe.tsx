import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import BieuDo from './components/BieuDo';
import { getTKDate, getTKMonths, getTKWeek } from './utils/api';
import CalendarPicker from "react-native-calendar-picker";
import { Modal } from 'react-native';
const heightScreen = Dimensions.get('window').height;

const ThongKe = () => {
  const [tabbar, settabbar] = useState(1);
  const [ngay, setngay] = useState('')
  const [thang, setthang] = useState('')
  const [nam, setnam] = useState('')
  const [selectDate, setselectDate] = useState(false)
  const [data, setdata] = useState({
    labels: ['Today'],
    datasets: [{data: [20]}],
  });
useEffect(() => {
  function getdate(){
    const dateday= new Date()
    setngay( dateday.getUTCDate());
    setthang(dateday.getUTCMonth() + 1);
    setnam(dateday.getUTCFullYear());
  }
  
  getdate()
  
}, [])


  useEffect(() => {

    const getDataMonth=async()=>{
      const datamonth = await getTKMonths()
      if(!datamonth){
        setdata({
          labels: [''],
        datasets: [{data: [0]}],
        })
      }else{
        setdata({
          labels: datamonth.map(item => item.month),
          datasets: [{data: datamonth.map(item => item.totalRevenue)}]
        })
      }
    }
    
    const getDataDay= async()=>{
       const dataday= await  getTKDate(nam,thang,ngay)
       setdata(dataday)
    }
    const getWeek = async ()=>{
      const dataWeek = await getTKWeek();
      dataWeek ? setdata({
        labels: dataWeek.map(item => item.week),
        datasets: [{data: dataWeek.map(item => item.totalRevenue)}]
      }) : setdata({
        labels: [''],
      datasets: [{data: [0]}],
      })
    }

    if (tabbar === 1) {
      getDataDay()
    } else if (tabbar === 2) {
      getWeek()
    } else {
       getDataMonth()
    }
  }, [tabbar,ngay]);

  
  const dichVuData = [
    {tenDichVu: 'Dịch vụ 1', soLuongKhach: 100, tongDoanhThu: 1000000},
    {tenDichVu: 'Dịch vụ 2', soLuongKhach: 50, tongDoanhThu: 500000},
    {tenDichVu: 'Dịch vụ 3', soLuongKhach: 200, tongDoanhThu: 2000000},
  ];
  const storeData = [
    {store: 'store 1', tongDoanhThu: 1000000},
    {store: 'store 2', tongDoanhThu: 500000},
    {store: 'store 3', tongDoanhThu: 2000000},
  ];

  const DichVuItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 3,
        marginStart: 8,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={{flex: 2, fontSize: 16, fontWeight: 'bold'}}>
        {item.tenDichVu}
      </Text>
      <Text style={{flex: 1, fontSize: 16, color: 'gray'}}>
        {' '}
        {item.soLuongKhach}
      </Text>
      <Text style={{flex: 2, fontSize: 16, color: '#80B3FE', marginStart: 12}}>
        {item.tongDoanhThu}
      </Text>
    </View>
  );
 
  const  StoreItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 3,
        marginStart: 8,
        height: 40,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text style={{flex: 2, fontSize: 16, fontWeight: 'bold'}}>
        {item.store}
      </Text>
      <Text style={{flex: 2, fontSize: 16, color: '#80B3FE', marginStart: 12}}>
        {item.tongDoanhThu}
      </Text>
    </View>
  );

  return (
    <ImageBackground style={{flex: 1}} source={require('./img/backgrour.png')}>
      <View style={styles.containerTab}>
        <TouchableOpacity
          onPress={() => {
            settabbar(1);
          }}>
          <View style={styles.tab}>
            <Text
              style={tabbar === 1 ? styles.selectTitleTab : styles.titleTab}>
              Ngày
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            settabbar(2);
          }}>
          <View style={styles.tab}>
            <Text
              style={tabbar === 2 ? styles.selectTitleTab : styles.titleTab}>
              {' '}
              Tuần{' '}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            settabbar(3);
          }}>
          <View style={styles.tab}>
            <Text
              style={tabbar === 3 ? styles.selectTitleTab : styles.titleTab}>
              {' '}
              Tháng{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {tabbar ===1 &&<View style={{marginTop:12,marginStart:24,flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={()=>setselectDate(true)}>
          <Image source={require('./img/image.png')} style={{width:30,height:30}}/>
        </TouchableOpacity>
        <Text style={{marginStart:8,color:'black',fontSize:16}}>{`${ngay}-${thang}-${nam}`}</Text>
        </View> }
        
      <View>
        <BieuDo getData={data} />
      </View>
      <View style={{margin:12,backgroundColor:'white',borderRadius:4}}>
      <Text
            style={{
              margin: 12,
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Dịch vụ{' '}
          </Text>
      <FlatList
            data={dichVuData}
            renderItem={item => <DichVuItem item={item.item} />}
          />
          <Text
            style={{
              margin: 12,
              color: 'black',
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            Cửa hàng{' '}
          </Text>
          <FlatList
            data={storeData}
            renderItem={item => <StoreItem item={item.item} />}
          />
      </View>

     
      <Modal 
             animationType='slide'
             transparent={true}
             visible={selectDate}
      >
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{backgroundColor: 'white',shadowColor:'gray',shadowOffset:{width:1,height:2},elevation: 4}}>
          <Text style={{ textAlign: 'center',color:'blue',fontSize:24,margin:12,fontWeight:'bold' }}>Chọn ngày </Text>
          <CalendarPicker onDateChange={(date)=>{
            setngay( date.getUTCDate());
            setthang(date.getUTCMonth() + 1);
            setnam(date.getUTCFullYear());
            setselectDate(false)
          }} />
        </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default ThongKe;

const styles = StyleSheet.create({
  containerTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    backgroundColor: 'white',
    marginHorizontal: 12,
  },
  tab: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleTab: {
    fontSize: 16,
  },
  selectTitleTab: {
    fontSize: 18,
    color: '#80B3FE',
    fontWeight: 'bold',
  },
});
