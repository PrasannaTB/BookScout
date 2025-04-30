import React from 'react';
import { View, Text, Button } from 'react-native';
import Logout from './Logout';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';
import BookshelfScreen from './Bookshelf';


const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 50 }}>Welcome to your Profile!</Text>

      <Button
        title="Go to Your Bookshelves"
        onPress={() => navigation.navigate('Bookshelf')}
      />

      <Logout />
    </View>
  );
};


export default Profile;
