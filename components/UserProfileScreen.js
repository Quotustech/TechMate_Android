import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage or any other storage library you are using
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../auth/authContext';
import jwt_decode from 'jwt-decode';



const UserProfileScreen = ({navigation}) => {
  const {user} = useAuth()

  const [loginUser,setLoginUser] = useState({
    userName:'',
    email:''
  })

  const backToHome = () =>{
    navigation.navigate("home")

  };

  useEffect(()=>{
    const decodedToken = jwt_decode(user);
    setLoginUser({...loginUser,email:decodedToken.email})

  },[user])

  const handleLogout = async () => {
    try {

      // Clear user session data
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('token');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Login'}],
        }),
      );
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.topSection}>
      <Image source={require('./male-user-profile.jpg')} style={styles.profilePicture} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.username}>{loginUser.email}</Text>
    </View>
    
    <View style={styles.bottomSection}>
      <TouchableOpacity style={styles.editProfileButton} onPress={backToHome}>
        <Text style={styles.editProfileButtonText}>Back to home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute items evenly along the vertical axis
    padding: 20,
  },
  topSection: {
    alignItems: 'center',
  },
  bottomSection: {
    width: '100%',
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#99cbed',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  editProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#131717',
    padding: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserProfileScreen;
