import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    hinhTron: {
      backgroundColor: '#FFF4CC',
      position: 'absolute',
      width: 550,
      height: 450,
      top: -250,
      left: -50,
    },
    box1: {
      flexDirection: 'row',
      marginLeft: 20,
      alignItems: 'center',
      position: 'absolute',
      top: 20,
    },
    box2: {
      position: 'absolute',
      top: 250,
      left: 0,
      right: 0,
    },
    textDangNhap: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
    },
    imgUser: {
      width: 25,
      height: 25,
      marginLeft: 10,
    },
    textWc: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
      marginLeft: 20,
      position: 'absolute',
      top: 60,
    },
    tenCty: {
      color: 'black',
      fontWeight: '900',
      fontSize: 64,
      marginBottom: 20,
    },
    toMau: {
      color: '#FFC600',
    },
    textInputTk: {
      borderRadius: 10,
      borderWidth: 1,
      color: 'black',
      borderColor: 'gray',
      marginHorizontal: 20,
      paddingLeft: 15,
      marginTop: 10,
    },
    textInputMk: {
      borderRadius: 10,
      borderWidth: 1,
      color: 'black',
      borderColor: 'gray',
      marginHorizontal: 20,
      marginTop: 10,
    },
    btnDangNhap: {
      backgroundColor: '#FFC600',
      height: 54,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      borderRadius: 10,
      marginVertical: 30,
    },
    error: {
      marginLeft: 35,
      marginTop: 10,
      color: 'red',
      fontSize: 15,
    },
    box3: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      marginHorizontal: 10,
      color: 'black',
      fontSize: 16
    },
    box4: {
      width: 80, height: 60,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20,
      borderRadius: 10,
      elevation: 2
    },
    box5: {
      width: 40, height: 40
    },
    eyeIcon: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
    eyeIconImage: {
      width: 30,
      height: 30,
    },
    loginButton: {
      padding: 10,
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
    }
  });
  