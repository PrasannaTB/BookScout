import React, { useEffect, useState }from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ref, push, onValue } from "firebase/database";
import { FIREBASE_AUTH } from './components/firebaseConfig';
import Login from './components/Login';
import HomePage from './components/Home';
import SearchPage from './components/Search';
import Profile from './components/Profile';
import GenreLibrary from './components/GenreLibrary';
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'rgb(116, 144, 147)', 
        headerShown: false, 
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user ? user.email : 'No user');
      setUser(user); 
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <>
            <Stack.Screen 
              name="HomeTabNavigator" 
              component={HomeTabNavigator} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="GenreLibrary" 
              component={GenreLibrary} 
              options={({ route }) => ({ 
                title: `Explore ${route.params.genre} reads`,
                headerBackTitle: 'Back',
              })}
           />
          </>
    
        ) : ( 
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

