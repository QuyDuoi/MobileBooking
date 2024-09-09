import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ItemCategory = ({item,onDelete,onUpdateHandler,onclick}) => {
  return (
    <TouchableOpacity onPress={()=>onclick(item.item)}>
        <View style={styles.ItemContainer}>
        <View
        style={styles.ItemBody}>
        <Text>{item.index + 1}</Text>
        <View style={styles.content}>
            <Text style={styles.textName}>
            {item.item?.nameCategory}
            </Text>
            <Text>{item.item?.createdAt.slice(0,10)}</Text>
        </View>
        <View style={styles.actionBody}>
            <TouchableOpacity onPress={()=> {onUpdateHandler(item.item)}}>
            <Image
                style={styles.actionIcon}
                source={require('./src/img/edit-04.png')}
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {onDelete(item.item._id)}}>
            <Image
                style={styles.actionIcon}
                source={require('./src/img/trash-02.png')}
            />
            </TouchableOpacity>
        </View>
        </View>
    </View>
  </TouchableOpacity>
  )
}

export default ItemCategory

const styles = StyleSheet.create({
    ItemContainer:{
        backgroundColor: 'white',
        margin: 10,
        borderRadius: 10,
        height: 80,
    },
    ItemBody:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%'
    },
    content:{
        justifyContent: 'space-evenly',
        height: '80%'
    },
    textName:{
        fontWeight: 'bold',
        fontSize: 18
    },
    actionBody:{
        height: '100%',
        justifyContent: 'space-around'
    },
    actionIcon:{
        height: 24,
        width: 24
    }

})