import React, { useEffect, useState }from 'react';
import { StatusBar } from 'expo-status-bar';
import styles from './components/Styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//import { ref, push, onValue } from "firebase/database";
import { FIREBASE_AUTH } from './components/firebaseConfig';
import Login from './components/Login';
import HomePage from './components/Home';
import SearchPage from './components/Search';
import Profile from './components/Profile';
import GenreLibrary from './components/GenreLibrary';
import BookDetails from './components/BookDetails';
import { onAuthStateChanged } from 'firebase/auth';
import { Provider } from 'react-redux';
import { userStore } from './components/AccountReducer';
import BookshelfDetail from './components/BookshelfDetail';
import BookshelfScreen from './components/Bookshelf';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const HomeTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'rgb(243, 114, 68)',     
        tabBarInactiveTintColor: 'rgb(25, 65, 114)',
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
    <Provider store={userStore}>
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
                  title: `Explore ${route.params.genre} Reads`,
                  headerBackTitle: 'Back',
                  headerTitleStyle: styles.genreHeader
                })}
              />
              <Stack.Screen 
                name="BookDetails" 
                component={BookDetails} 
                options={{
                  headerBackTitle: 'Back',
                  headerTitle: 'Book Details', 
                  headerTitleStyle: styles.bookHeader
                }}
              />
              <Stack.Screen 
                  name="Bookshelf" 
                  component={BookshelfScreen} 
                  options={({ route }) => ({ 
                    headerBackTitle: 'Back',
                    headerTitle: 'Your Bookshelves',
                    headerTitleStyle: styles.bookHeader 
                  })}
              />
              <Stack.Screen
                name="BookshelfDetail"
                component={BookshelfDetail}
                options={({ route }) => ({
                  title: route.params.shelfName ? route.params.shelfName.replace(/([A-Z])/g, ' $1').toUpperCase() : 'Bookshelf',
                  headerBackTitle: 'Back',
                  headerTitleStyle: styles.bookHeader 
                })}
              />
            </>
      
          ) : ( 
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{ headerShown: false }} 
            />

          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

