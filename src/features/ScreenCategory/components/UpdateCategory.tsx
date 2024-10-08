import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const UpdateCategory = ({date,Categoryname,onCandel,onChangeText,onUpdateHanderl}) => {

    const [validateName, setvalidateName] = useState(false);
    function  updateCategory(){
        if(Categoryname.trim() === ''){
            setvalidateName(true);
            return false;
        }
        onUpdateHanderl();
    }
  return (
    <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <Text style={styles.modalTile}>Chỉnh sửa danh mục</Text>
                    <Text style={styles.labelInput}>Tên danh mục</Text>
                    <TextInput
                        value={Categoryname}
                        placeholder='Nhập tên danh mục'
                        onChangeText={text=>onChangeText(text)}
                        style={styles.inputContainer}/>
                        <Text style={{color:'red',fontSize:12,marginStart:24,marginTop:validateName?4:0}}>{validateName?'Vui lòng nhập tên danh mục':''}</Text>
                     <Text style={{marginStart:24,marginTop:12,fontSize:16}}>Ngày tạo : {date.slice(0,10)}</Text>
                    <View style={styles.actionContainer}>
                        <TouchableOpacity
                            onPress={() =>onCandel()}>
                            <Image
                            style={styles.actionButton}
                            source={{uri:'https://i.imgur.com/K147jQY.png'}}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() =>updateCategory()}>
                            <Image
                            style={styles.actionButton}
                            source={{uri:'https://i.imgur.com/JIrCx2a.png'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
  )
}

export default UpdateCategory

const styles = StyleSheet.create({
    modalContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    modalContent:{
        height: 300,
        backgroundColor: 'white',
        paddingHorizontal:32,
        marginHorizontal: 30,
        borderRadius: 12,
        elevation: 5,
        shadowOffset:{width: 0, height:4},
        shadowOpacity:0.4,
    },
    modalTile:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginTop: 24,
    },
    labelInput:{
        fontSize: 18,
        fontWeight: 'condensed',
        color: 'black',
        marginStart: 20,
        marginTop: 24,
        marginBottom: 4,
    },
    inputContainer:{
        borderWidth: 1,
        borderColor: '#73A2FF',
        marginHorizontal: 20,
        borderRadius: 8,
        paddingStart: 16,
    },
    actionContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:24
    },
    actionButton:{
        height: 62,
        width: 125,
    }
})