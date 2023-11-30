
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useAuth } from './authContext';
import ChatView from '../components/ChatView';
import ChatScreen from '../components/ChatScreen';
import LoginScreen from '../components/Login';
import Register from '../components/Register';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Logout from '../components/Logout';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Button } from 'react-native';
import QuestionScreen from '../components/QuestionScreen';
import { Image } from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserProfileScreen from '../components/UserProfileScreen';
import { DrawerActions } from '@react-navigation/native';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const AppNav = () => {
  const { user } = useAuth()

  console.log("token inside the nav",user)

  const home = "ChatScreen"
  const profile = "profile"
  const logOut = "logout"



  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'root' : 'Login'}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="root" component={ToggleDraweer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer >
  )

}



export default AppNav


function ToggleDraweer (){
  const { drawerContent } = useAuth()

  if(!drawerContent){
    return  <DrawerNavigator/>
  }

  if(drawerContent === "QuestionScreen"){
    return  <DrawerNavigator/>
  }
  if(drawerContent === "ProfileScreen"){
    return  <DrawerNavigatorProfile/>
  }

};
function DrawerNavigatorProfile() {
  const navigation = useNavigation();
  const { drawerContent } = useAuth()
  console.log("drawer value in side the drawer",drawerContent)


  return (
    <Drawer.Navigator 
    drawerContent={UserProfileScreen} 
    screenOptions={{
      drawerPosition: 'right',
    }}>
    
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          title: '',
          header: () => (
            <TopAppBar title="topbar"/>
          ),

        }}
      />
      <Drawer.Screen
        name="UserProfile"
        component={UesrTAb}
        options={{
          title: '',
          header: () => (
            <TopAppBar title="topbar"/>
          ),        }}
      />
    </Drawer.Navigator>
  )
};
 

function TabNavigator() {
  const { handleDrawerContent } = useAuth()

  const [content,SetContent] = useState(null)
  const chatStack = "ChatStack"
  const profile = "profile"
  const logOut = "logout"
  const drawer = 'drawer'
  const navigation = useNavigation();

  const handelContent = () => {
      handleDrawerContent('QuestionScreen')
  
    navigation.openDrawer()
  }


  const handleDismissDrawer = () => {
    SetContent(null); // Reset contentScreen to null
    handleDrawerContent(null)
    navigation.closeDrawer(); // Close the drawer
  }

  return (
    <TouchableOpacity
    style={{ flex: 1 }}
    activeOpacity={1} // To prevent click-through
    onPress={handleDismissDrawer} // Clicking outside closes the drawer and resets contentScreen
  >
    <Tab.Navigator
      initialRouteName={chatStack}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#99cbed',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === chatStack) {
            iconName = focused ? 'home' : 'home';
          } else if (routeName === profile) {
            iconName = focused ? 'bars' : 'bars';
          } else if (routeName === logOut) {
            iconName = focused ? 'sign-out' : 'sign-out';
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={drawer}
        component={ChatScreen} // Empty component for the drawer icon
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TouchableOpacity style={styles.bar}
              onPress={handelContent} // Open the drawer
            >
              <Icon  name="bars" size={20} color={color} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name={chatStack} component={ChatStackTab} />

    </Tab.Navigator>
    </TouchableOpacity>
  );
}

function DrawerNavigator() {
  const navigation = useNavigation();
  const { drawerContent } = useAuth()
  console.log("drawer value in side the drawer",drawerContent)


  return (
    <Drawer.Navigator drawerContent={QuestionScreen}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          title: '',
          header: () => (
            <TopAppBar title="topbar"/>
          ),

        }}
      />
      <Drawer.Screen
        name="UserProfile"
        component={UesrTAb}
        options={{
          title: '',
          header: () => (
            <TopAppBar title="topbar"/>
          ),        }}
      />
    </Drawer.Navigator>
  )
};

// function UserDrawerNavigator() {
//   return (
//     <Drawer.Navigator drawerContent={UserProfileScreen}>
//       <Drawer.Screen
//         name='user'
//         component={UserProfileScreen}
//         options={{
//           tabBarIcon: ({ focused, color, size }) => (
//             <Icon name="bars" size={20} color={'#131717'} />
//           ),
//         }}
//       />
//     </Drawer.Navigator>
//   );
// }


function ChatStackTab() {
  const logOut = "logout"

  return (
    <Stack.Navigator initialRouteName='home'>
      <Stack.Screen name="home" component={ChatScreen} options={{ headerShown: false }} />


    </Stack.Navigator>
  )
}


function UesrTAb() {
  return (
    <Stack.Navigator initialRouteName='UserProfile'>
      <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
    
  )
}


function TopAppBar({ title }) {
  const navigation = useNavigation();
  const { handleDrawerContent } = useAuth()


  const handelContentSubmit = () => {
    handleDrawerContent('ProfileScreen')
    // if(contentScreen){
    //   handleDrawerContent(contentScreen)
    // }
    navigation.openDrawer()
  }


  return (
    <>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../components/TechMate-m-logo.png')} 
            style={styles.logo}
          />
        </View>

        <TouchableOpacity
            onPress={handelContentSubmit}
            style={styles.icon}
        >
          <Icon name="user-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}



const styles = StyleSheet.create(
  {
    container: {
      flexDirection: "row",
      backgroundColor: '#99cbed',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 60,
    },
    icon: {
      paddingRight: 15, // Adjust the spacing as needed
    },
    logoContainer: {
      height: '100%',
      paddingLeft: 10


    },
    logo: {
      width: 100,
      height: 60,
      resizeMode: 'contain'
    },
    bar:{
      padding:8
    }

  }

)





