import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.profilePage}>
      <View style={styles.profileHeader}>
        <Text style={styles.profile}>Welcome to your Profile!</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Bookshelf')}>
        <Text style={styles.linkText}>Your Bookshelves</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Logout</Text>
      </TouchableOpacity>    
      
    </View>
  );
};

export default Profile;
