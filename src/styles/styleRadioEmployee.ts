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
  });