import React from 'react';
import { View, Button } from 'react-native';
import { FIREBASE_AUTH } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native'; 
import styles from './Styles';

const Logout = () => {
  const navigation = useNavigation(); 

  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut(); 
      navigation.navigate('Login'); 
    } catch (error) {
      console.error("Error signing out:", error); 
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleLogout} title="Logout" />
    </View>
  );
};

export default Logout;
