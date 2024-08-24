import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const AddCategory = ({onCanler,onAdd}) => {
  const [nameCategory, setnameCategory] = useState('')
  function addCategory(){
    const newCategory = {
        nameCategory: nameCategory
    }
    onAdd(newCategory)
  }
  return (
    <View style={styles.container}>
    <ImageBackground
      style={[styles.imgHeader, {justifyContent: 'center'}]}
      source={require('./src/img/backgrour.png')}>
      <View
        style={{
          height: 280,
          backgroundColor: 'white',
          marginHorizontal: 30,
          borderRadius: 12,
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center',
            marginTop: 24,
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
            marginBottom: 4,
          }}>
          Name
        </Text>
        <TextInput
          value={nameCategory}
          onChangeText={text=>{setnameCategory(text)}}
          placeholder="Tên danh mục mới"
          style={{
            borderWidth: 1,
            borderColor: '#73A2FF',
            marginHorizontal: 20,
            borderRadius: 8,
            paddingStart: 16,
          }}
        />
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
    </ImageBackground>
  </View>
  )
}

export default AddCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      imgHeader: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
})