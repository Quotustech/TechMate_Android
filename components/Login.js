import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Animated,
  Easing,
  FlatList,
  Keyboard,
  SafeAreaView,
  ScrollView
} from 'react-native';

import { useAuth } from '../auth/authContext'
import Modal from 'react-native-modal';
import {Login} from '../api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import Loader from './Loader';
import Icon from 'react-native-vector-icons/FontAwesome';




const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);



  const [errors,setErrors] = useState({
    emilError:null,
    passwordError:null,
    error:null
  })

  const handlePasswordVisible = () =>{
    setIsPasswordVisible(!isPasswordVisible)
  }

  // console.log("error state ",errors.passwordError)


  const animatedValue = new Animated.Value(0);

  // const { login } = useAuth();
  const { setUserToken ,updateUser,setIsLoading } = useAuth();


  const startAnimation = () => {
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const toggleModal = () =>{
    setModalVisible(!isModalVisible)
  }

  const handleSubmit = () => {
    setLoading(true)
    // startAnimation()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: 'Please enter a valid email',
      }));
      toggleModal();
      setIsLoading(false);
      return;
    }
  
    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passwordError: 'Password length must be 8 characters',
      }));
      toggleModal();
      setIsLoading(false);
      return;
    }
  
    Login(email, password)
      .then(async (res) => {
        if (res) {
          // Assuming res.data contains user information and token
          setUserToken(res.token);
  
          // Store user info and token in AsyncStorage
          await AsyncStorage.setItem('userInfo', JSON.stringify(res.token));
          await AsyncStorage.setItem('token', res.token);
          setLoading(false)
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'root'}],
            }),
          );
        } else {
          // Handle the case where the response doesn't contain user data
          setErrors((prevErrors) => ({
            ...prevErrors,
            axiosError: 'Invalid response data',
          }));
          toggleModal();
          setLoading(false)

        }
        setIsLoading(false); // Move setIsLoading(false) inside the .then block
      })
      .catch((error) => {
        console.log("the error is", error); // Log the specific error
        setErrors((prevErrors) => ({
          ...prevErrors,
          axiosError: 'Invalid Credential',
        }));
        toggleModal();
        setLoading(false)

        setIsLoading(false); // Move setIsLoading(false) inside the .catch block
        // set error to error function
      });
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Animated.Image
          source={require('./TechMate-f-logo.png')}
          style={[
            styles.logo,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.welcomeText}>

          <Text style={styles.welcome}>Login to Tech Mate</Text>

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
        value={password}
        onChangeText={(text) => setPassword(text)}
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
          style={styles.loginButton}
          onPress={() => {
            handleSubmit(email, password);
            startAnimation();
          }}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? <Loader color={'#fff'} size={"small"}/> : 'Login'}
          </Text>
        </TouchableOpacity>
        <Modal
          isVisible={isModalVisible}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropOpacity={0.5} // Control the transparency of the background
          backdropColor="black" // Customize the background color
          style={styles.modal}
          onBackdropPress={toggleModal}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Opps !</Text>
            {
              errors.emilError ? (
                <Text style={styles.modalText}>{errors.emilError}</Text>
              ) : errors.passwordError ? (
                <Text style={styles.modalText}>{errors.passwordError}</Text>
              ) : errors.axiosError ? (
                <Text style={styles.modalText}>{errors.axiosError}</Text>
              ) : (
                <Text style={styles.modalText}>
                  {errors.error}
                </Text>
              )
            }
           
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signupButton}
          onPress={() => navigation.navigate('Register')} // Replace with your chat screen name

        >
          <Text style={styles.signupButtonText}>Don't have an account?</Text>
          <Text style={[styles.signupButtonText, styles.signupButtonHighlight]}>Sign Up</Text>

        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#99cbed',
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 28,

  },
  // input: {
  //   marginTop: 10,
  //   height: 40,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   borderRadius: 16,
  //   marginBottom: 10,
  //   paddingLeft: 10,
  //   fontSize: 16,
  //   margin: 8,
  //   color: 'gray'

  // },
  loginButton: {
    marginTop:20,
    margin: 8,
    backgroundColor: '#99cbed',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#131717',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 10,
  },
  forgotPasswordButtonText: {
    color: '#8a0003',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  signupButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupButtonText: {
    marginLeft: 4,
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  signupButtonHighlight: {
    fontWeight: 'bold', // Make the "Sign Up" text bold
    marginLeft: 5,
    color: '#3498db'
  },
  welcomeText: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16
  },
  welcome: {
    marginLeft: 4,
    color: '#131717',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width:300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    color: '#8f1d18',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',

  },
  closeButton: {
    backgroundColor: '#0bc3c8',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    //   height: 40,
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

    
  },
  eyeIcon: {
    padding: 10,
  },


});

export default LoginScreen;
