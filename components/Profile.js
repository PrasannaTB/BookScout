import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './AccountReducer'; 
import { FIREBASE_AUTH } from './firebaseConfig';

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      
      // Reset user state in Redux after logging out
      dispatch(setUserInfo({}));

      // to navigate to Login screen
      navigation.replace('Login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.profilePage}>
      <View style={styles.profileHeader}>
        <Text style={styles.profile}>Welcome to your Profile!</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Bookshelf')}>
        <Text style={styles.linkText}>Your Bookshelves</Text>
      </TouchableOpacity>
      
      {/* Call the handleLogout function directly */}
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
