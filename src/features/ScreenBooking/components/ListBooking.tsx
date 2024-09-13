import { FlatList, StyleSheet, Text, View} from 'react-native'
import ItemBooking from './ItemBooking'

const ListBooking = ({listBooking,headerFlatlist,handleDeleteBooking,clickUpdateBooking}) => {
  return <FlatList ListEmptyComponent={<Text style={{textAlign:'center',fontSize:16,fontWeight:'bold',color:'#8391A1',marginTop:100}}>Không có dữ liệu</Text>} ListHeaderComponent={headerFlatlist} data={listBooking} renderItem={({item}) => <ItemBooking updateBooking={clickUpdateBooking} item={item} onDelete={handleDeleteBooking}/>}/>
}

export default ListBooking

const styles = StyleSheet.create({})