import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const InputTextComponents = ({icon,...props}) => {
    const renderIcon = () => {
        switch(icon){
            case 'user':
                return <Image source={require('./icons/acount.png')} style={styles.icon}  />
            case 'phone':
                return <Image source={require('./icons/phone.png')} style={styles.icon} />
            case 'date':
                return <Image source={require('./icons/date.png')} style={styles.icon} />
            default:
                return null
        }
    }
  return (
    <View style={[styles.inputSearch, props.style]}>
        {renderIcon()}
        <TextInput
            {...props}
            value={props.value}
            onChangeText={props.onChangeText}
            placeholder={props.placeholder}
            placeholderTextColor={'#8391A1'}
        />
    </View>
  )
}

export default InputTextComponents

const styles = StyleSheet.create({
      inputSearch: {
        height: 55,
        marginVertical: 10,
        backgroundColor: '#F7F8F9',
        borderRadius: 10,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 15,
        shadowColor: "#000",
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      icon:{
        width: 20,
        height: 20,
        marginEnd: 8,
      }
})