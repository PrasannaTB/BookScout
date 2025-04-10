import React from 'react';
import { View, Text, Button } from 'react-native';
import { FIREBASE_AUTH } from './firebaseConfig';
import styles from './Styles';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>
    </View>
  );
};

export default Profile;
