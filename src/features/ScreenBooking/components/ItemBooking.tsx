import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { updateBooking } from '../util/api'

const ItemBooking = ({item, onEdit, onDelete, onConfirm,updateBooking}) => {

  function handleConfirm(){
    item.status = true
    updateBooking(item._id, item)
  }

  return (
    <View style={styles.bookingItem}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{fontSize:22, fontWeight:'bold',color:'#007AFF',textAlign:'center',marginVertical:12}}>Đơn dịch vụ</Text>
        <Text style={{fontSize:22, fontWeight:'bold',color:'orange',marginVertical:12}}>{item.price} VND</Text>
      </View>
         <Text style={{fontSize:18, fontWeight:'bold',marginVertical:4}}> Thông tin khách hàng </Text>
         <View style={{flexDirection:'row',alignItems:'center'}}>

            <View style={{flex:1,flexDirection:'row',alignItems:'center',marginStart:12}}>
              <Image source={require('./icons/image.png')} style={{width:24,height:24,marginRight:12}}/>
              <Text style={styles.customerName}>{item.customerName}</Text>
            </View>

            <View style={{flex:1,flexDirection:'row',marginStart:24}}>
              <Image source={require('./icons/phone.png')} style={{width:24,height:24,marginRight:6}}/>
              <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
            </View>
         </View>

         <Text style={{fontSize:18, fontWeight:'bold',marginVertical:12}}> Cửa hàng </Text>
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
             <View style={{flex:1}}>
                  <View style={{flexDirection:'row',alignItems:'center',marginBottom:12,marginStart:12}}>
                    <Image source={require('./icons/store.png')} style={{width:24,height:24,marginRight:6}}/>
                    <Text style={styles.customerName}>{item.id_store?.name}</Text>
                  </View>
                  <View style={{flexDirection:'row',marginStart:12,marginTop:8}}>
                    <Image source={require('./icons/address.png')} style={{width:24,height:24,marginStart:4}}/>
                    <Text style={styles.phoneNumber}>{item.id_store?.address}</Text>
                  </View>
           
             </View>

                  <View style={{flex:1,flexDirection:'row',marginStart:24}}>
                    <Image source={require('./icons/phone.png')} style={{width:24,height:24,marginStart:12}}/>
                    <Text style={styles.phoneNumber}> {item.id_store?.phoneNumber}</Text>
                  </View>
           
            
         </View>

         <View style={{flexDirection:'row',padding:4,borderWidth:1,borderColor:'#ccc',borderRadius:8,marginTop:8}}>
           <View style={{flex:1.3}}>
                <Text style={{fontSize:18, fontWeight:'bold',marginVertical:12}}> Dịch vụ</Text>
              <View style={{marginStart:12}}>
                  {item.services?.map((service,index)=>{
                    return(
                    <View key={index} style={{flexDirection:'row',alignItems:'center',height:30,marginBottom:12,marginStart:12}}>
                    <Image source={require('./icons/service.png')} style={{width:24,height:24,marginRight:8}}/>
                    <Text style={styles.customerName}>{service.nameService}</Text>
                  </View>)
                  })}
              </View>
           </View>
           <View style={{flex:1}}>
                <Text style={{fontSize:18, fontWeight:'bold',marginVertical:12}}> Nhân viên</Text>
                  <View  style={{flexDirection:'row',alignItems:'center',height:30,marginBottom:12,marginStart:12}}>
                      <Image source={require('./icons/nv.png')} style={{width:24,height:24,marginRight:8}}/>
                      <Text style={styles.customerName}>{item.id_employee?.fullName}</Text>
                    </View>
           </View>
         </View>
         
         <Text style={[styles.status, item.status ? styles.statusConfirmed : styles.statusPending]}>
          {item.status ? 'Đã xác nhận' : 'Chưa xác nhận'}
        </Text>

        <Text style={styles.note}>Ghi chú: {item.note}</Text>

      <View style={styles.bookingActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() =>updateBooking(item)}>
          <Image
            source={require('../../ScreenCategory/components/src/img/edit-04.png')}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onDelete(item._id)}>
          <Image
            source={require('../../ScreenCategory/components/src/img/trash-02.png')}
            style={styles.actionIcon}
          />
        </TouchableOpacity>
        {!item.status && (
          <TouchableOpacity style={styles.confirmButton} onPress={() => handleConfirm()}>
            <Text style={styles.confirmButtonText}>Xác nhận</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default ItemBooking

const styles = StyleSheet.create({
  bookingItem: {
    flexDirection: 'column',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    margin: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingInfo: {
    margin:12
  },
  bookingId: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  customerName: {
    fontSize: 18,
    color:'black'
  },
  phoneNumber: {
    fontSize: 18,
    color: 'black',
  },
  bookingDate: {
    fontSize: 14,
    color: '#666',
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
  },
  employeeName: {
    fontSize: 14,
    color: '#666',
  },
  services: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statusConfirmed: {
    color: 'green',
  },
  statusPending: {
    color: 'orange',
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
  actionButton: {
    padding: 5,
    marginLeft: 10,
  },
  actionIcon: {
    width: 24,
    height: 24,
  },
  confirmButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})