import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import { ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal'; // Import the Modal component
import { Config } from '../config';
import Icon from 'react-native-vector-icons/FontAwesome';





const Register = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);



  const url = `${Config.BaseUrl}/register`

  const handlePasswordVisible = () =>{
    setIsPasswordVisible(!isPasswordVisible)
  }



  const handleRegister = () => {
    setIsLoading(true);
    axios.post(url,{
      name:fullName,
      email:email,
      password:password
    })
    .then((res)=>{
      console.log(res.data)
      if(res.data){
        setFullName('')
        setEmail('')
        setPassword('')
        setRegistrationSuccess(true);
        // navigation.navigate('Login');

      }
    })
    .catch((error)=>{
      console.log(error)
    })
    .finally(()=>{
      setIsLoading(false)
    })

  };
  const closeModal = () => {
    setRegistrationSuccess(false); 
    navigation.navigate('Login');

  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Image           source={require('./TechMate-f-logo.png')}
 style={styles.logo} />
      </View>

      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        {/* <View style={styles.welcomeText}>
          <Text style={styles.welcome}>Register your Account with </Text>

        </View> */}
        <View style={styles.welcomeTechMate}>
            <Text style={styles.welcomeTo}>Register in Tech Mate</Text>
        </View>
        <View style={styles.passwordContainer}>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setFullName(text)}
          value={fullName}
        />
        </View>
        <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        </View>
        <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!isPasswordVisible}
          
          />
          <TouchableOpacity onPress={handlePasswordVisible}>
        <Icon
          name={isPasswordVisible ? 'eye' : 'eye-slash'}
          size={20}
          style={styles.eyeIcon}
        />
      </TouchableOpacity>
      </View>
          
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        {isLoading && (
        <View style={styles.loaderContainer}>
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}
      <Modal isVisible={registrationSuccess}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Registration Successful!</Text>
          <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {!isLoading && (
        <TouchableOpacity style={styles.loginLink}
                onPress={() => navigation.navigate('Login')} // Replace with your chat screen name

        >
          <Text style={styles.loginLinkText}>
            Already have an account? 
          </Text>
          <Text style={styles.loginLinktoText}>
             Login
          </Text>
        </TouchableOpacity>
         )}
      </KeyboardAvoidingView >
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2db9dd',
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 20,
  },
  logo: {
    width: 600, // Set the width of your logo
    height: 300,
    marginBottom:-170
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#0f110f',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  passwordContainer: {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 8,
      height: 42,
      marginBottom: 10,
      paddingLeft: 10,
      fontSize: 16,
      margin: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    fontSize: 16,
    color:'#ffff'

  },
  registerButton: {
    marginTop:20,
    margin: 8,
    backgroundColor: '#2db9dd',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginLinkText: {
    marginLeft: 4,
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeText: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  welcome: {
    marginLeft: 4,
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  welcomeTechMate:{
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 12,
  },
  welcomeTo: {
    marginLeft: 4,
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginLinktoText:{
    color: '#0bc3c8',
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    padding: 60, // Increase the padding for an "extra large" appearance
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'gray'
  },
  modalButton: {
    backgroundColor: '#0bc3c8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eyeIcon: {
    flex:1,
    padding: 10,
    color:'#ffff'
  },
 
});

export default Register;
