


import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet } from 'react-native';
import Modal from 'react-native-modal';


const Error = ({message}) => {
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

    useEffect(()=>{
        setIsErrorModalVisible(true)

    },[message])

  return (
    <Modal isVisible={isErrorModalVisible}>
      <View style={styles.card}>
        <Text style={styles.errorMessage}>{message}</Text>
        <TouchableOpacity onPress={() => setIsErrorModalVisible(false)}>
          <Text style={styles.dismissButton}>Dismiss</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
    card: {
        justifyContent:'center',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: 300, // Adjust the width as needed
    },
    errorMessage: {

     textAlign:'center',
      color: 'red',
      fontSize: 16,
      marginBottom: 20, 
      margin:8
    },
    dismissButton: {
       borderRadius:10,
        backgroundColor:'black',
        textAlign:'center',
        padding:10,
       color: '#ffff',
       fontSize: 16,
    },
  });




export default Error



