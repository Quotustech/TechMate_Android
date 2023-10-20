import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,SafeAreaView ,Keyboard} from 'react-native';
import { Chat } from '../api/auth';
import { useAuth } from '../auth/authContext';
import jwt_decode from 'jwt-decode';

import Response from './Response';
import WelcomeScreen from './WelcomeScreen';
import ChatView from './ChatView';
import Loader from './Loader';
import Error from './Error';



const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [error,setError] = useState ('')
  const {user,updateResponceData,resultData} = useAuth()
  const [responseData,setResponseData] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const [inputError, setInputError] = useState(false);
  const [catchError,setCatchError] = useState('')


  // console.log("message",messages)
  // console.log("inputtext",inputText)
  // console.log("user token",user)


  const handleSend = () => {
    Keyboard.dismiss();
    setIsLoading(true)

    if(!inputText){
      setInputError(true);
      setError("Please enter your query")
      setCatchError("Input type not be empty")

    }

    if(!user){
      setCatchError("token not found")
      setInputError(true)
    }

    const decodedToken = jwt_decode(user);
    // console.log("the token",decodedToken)

      if (!decodedToken || !decodedToken.userId) {
        setCatchError("Invalid or missing userId in the token.");
        setInputError(true)

        return;
      }


      const userId = decodedToken.userId;

    Chat(userId,inputText,user)
    .then((res)=>{
      if(res){
        setResponseData(res)
        updateResponceData(res)
        setInputText('')
        setIsLoading(false)
      }
    })
    .catch((error)=>{
      setIsLoading(false)
      setCatchError("something went wrong")
    })


  };


  return (
    <SafeAreaView style={styles.container}>
      {
        resultData ? <Response data={resultData}/> :

      <WelcomeScreen/>
      }
      <View style={styles.inputContainer}>
        <TextInput
        style={[
          styles.input,
          inputError ? { borderColor: 'red' } : null
        ]}
        
          placeholder={inputError ? error : "Type Your Query..."}
          placeholderTextColor={inputError ? 'red' : '#000'}
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          {
            isLoading ? <Loader/> : <Text style={styles.sendButtonText}>Send</Text>

          }
        </TouchableOpacity>
      </View>
      {
        inputError ? <Error message={catchError}/> : null
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:1,
    // borderRadius: 24,
    backgroundColor:'#ffff'
    

  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0bc3c8',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    maxWidth: '90%',

  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    maxWidth: '70%',

  },
  messageText: {
    color: '#131717',
    fontSize: 16,

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginBottom:5,
    height:50,
    padding:5
    
    
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#131717',
    borderRadius: 24,
    color:'#131717',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft:5
 },
  sendButton: {
    marginLeft: 12,
    backgroundColor: '#131717',
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  
});

export default ChatScreen;
