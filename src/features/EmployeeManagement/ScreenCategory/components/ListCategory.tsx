import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemCategory from './ItemCategory'

const ListCategory = ({data,onDeleteHandler,onUpdate,onClickItem}) => {
  return (
     <FlatList 
        style={styles.container}
        data={data} 
        renderItem={(item)=><ItemCategory onclick={onClickItem} onUpdateHandler={onUpdate} onDelete={onDeleteHandler} item={item}/>}
        keyExtractor={(item, index) => index.toString()}
     />
  )
}

export default ListCategory

const styles = StyleSheet.create({
    container:{
        marginTop:95,
        marginBottom:100
    }
})