import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const AddCategory = ({onCanler,onAdd}) => {
  const [nameCategory, setnameCategory] = useState('')
  const [validate, setvalidate] = useState(false)
  function addCategory(){
    const newCategory = {
        nameCategory: nameCategory,
        id_store:'66e2462d7265add6ee481b7b'
    }
    if(nameCategory.trim() === ''){
      setvalidate(true)
      return false
    }
    onAdd(newCategory)
  }
  return (
    <View style={styles.container}>
  
      <View
        style={{
          height: 280,
          backgroundColor: 'white',
          marginHorizontal: 30,
          borderRadius: 12,
          paddingHorizontal:32,

}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            marginTop: 34,
          }}>
          Thêm Danh mục mới
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'condensed',
            color: 'black',
            marginStart: 20,
            marginTop: 24,
            marginBottom: 8,
          }}>
          Tên danh mục
        </Text>
        <TextInput
          value={nameCategory}
          onChangeText={text=>{setnameCategory(text)}}
          placeholder='Nhập tên danh mục'
          style={{
            borderWidth: 1,
            borderColor: '#73A2FF',
            marginHorizontal: 20,
            borderRadius: 8,
            paddingStart: 16,
          }}
        />
        <Text style={{color:'red',fontSize:12,marginStart:24,marginTop:4}}>{validate?'Vui lòng nhập tên danh mục':''}</Text>
        <View style={{ flexDirection:'row',justifyContent:'space-around',marginTop:32}}>
          <TouchableOpacity
            onPress={() =>onCanler()}>
            <Image
              style={{
                height: 62,
                width: 125,
              }}
              source={{uri:'https://i.imgur.com/K147jQY.png'}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => addCategory()}>
            <Image
              style={{
                height: 62,
                width: 125,
              }}
              source={{uri:'https://i.imgur.com/JIrCx2a.png'}}
            />
          </TouchableOpacity>
        </View>
      </View>
  </View>
  )
}

export default AddCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
      },
      imgHeader: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
})