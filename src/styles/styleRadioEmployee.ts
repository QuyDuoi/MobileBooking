import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 10,
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: 'black'
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 15,
      padding: 10,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    submitButton: {
      backgroundColor: '#3498db',
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 20,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
    },
    imageContainer: {
      width: 160,
      height: 160,
      borderColor: '#ccc',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    boxImage: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    placeholderText: {
      color: '#aaa',
    },
    iconButton: {
      position: 'absolute',
      bottom: 5,
      right: 5,
      backgroundColor: '#007AFF',
      borderRadius: 50,
      padding: 8,
      elevation: 5,
    },
    modalContainerChoice: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentChoice: {
      backgroundColor: 'white',
      padding: 10,
    },
    modalButton: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    modalButtonText: {
      fontSize: 18,
      textAlign: 'center',
    },
  });