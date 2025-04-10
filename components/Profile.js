import React from 'react';
import { View, Text, Button } from 'react-native';
import Logout from './Logout';
import styles from './Styles';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style = {{marginTop: 50}}>Welcome to your Profile!</Text>
      <Logout />
    </View>
  );
};

export default Profile;
