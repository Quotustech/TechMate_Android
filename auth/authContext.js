import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false);
  const [resultData,setResultData] = useState(null)
  const [drawerContent,SetDrawerContent] = useState(null)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  const updateUser = async () => {
    const item = await AsyncStorage.getItem('token');
    console.log("token get from storage",item)

    setUser(item);
  };

  useEffect(()=>{
    updateUser()
  },[])

  const updateResponceData = (response) =>{
    // console.log("data inside the updateResponsedata",response)
    setResultData(response)
  }

  const handleDrawerContent = (content) =>{
    console.log("the content",content)
    if(content){
      SetDrawerContent(content)
    }
  }


  

  return (
    <AuthContext.Provider value={{ user,resultData,isModalVisible,drawerContent,toggleModal,updateUser,setUserToken,setUser,setIsLoading,setModalVisible,updateResponceData,handleDrawerContent }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
