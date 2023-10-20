import React, { useState } from 'react'
import { Touchable, TouchableOpacity } from 'react-native';
import { View, Text, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage or any other storage library you are using
import { useAuth } from '../auth/authContext';



const Logout = ({navigation}) => {
    const logout = async () => {
        try {
    
          // Clear user session data
          await AsyncStorage.removeItem('userInfo');
          await AsyncStorage.removeItem('token');
    
         
    
          navigation.navigate('Login');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };
  return (
    <View style={styles.container}>
    <View style={styles.card}>
     
      <View style={styles.cardContent}>
        <Text style={styles.cardText}>
          Are you sure you want to log out from your account? 
        </Text>
        <Button
          title="Logout"
          onPress={logout}
          color="#ff5733" // Customize the button color
          style={styles.logoutButton}
        />
      </View>
    </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    elevation: 3,
  },
  
  
  cardContent: {
    alignItems: 'center',
    marginTop: 16,
  },
  cardText: {
    color:'#252528',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight:'bold'
  },
  logoutButton: {
    borderRadius: 10,
    padding: 10,
  },
});

export default Logout


