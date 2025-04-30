import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableNativeFeedback, View, Button, FlatList, Image, Alert } from 'react-native';
import styles from './Styles';  
import { REALTIME_DB } from './firebaseConfig';
import { useSelector } from 'react-redux';

const BookshelfScreen = ({ navigation }) => {
  const user = useSelector((state) => state.userInfo);

  const [bookshelves, setBookshelves] = useState({
    alreadyRead: [],
    currentlyReading: [],
    wantToRead: [],
  });

  useEffect(() => {
    if (user) {
      const bookshelfRef = REALTIME_DB.ref(`users/${user.uid}/bookshelves`);
      
      bookshelfRef.once('value')
        .then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setBookshelves(data);
          }
        })
        .catch(err => console.error('Error fetching bookshelf:', err));
    }
  }, [user]);

  /*
  const shelfImages = {
    alreadyRead: require('../assets/alreadyRead.png'),
    currentlyReading: require('../assets/currentlyReading.png'),
    wantToRead: require('../assets/wantToRead.png'),
  };
  */
  

  return (
    <ScrollView>
      <View style = {styles.container}>
        <Text style = {styles.shelvesTitle}>Your Bookshelves</Text>

        {Object.keys(bookshelves).map((shelf) => (
          <View style={styles.bookshelfContainer} key={shelf}>
            <TouchableNativeFeedback onPress={() => navigation.navigate("BookshelfDetail", { books: bookshelves[shelf], shelfName: shelf })}>

              <View style={styles.textButton}>
                <Text style={styles.shelfTitle}>{shelf.replace(/([A-Z])/g, ' $1').toUpperCase()}</Text>
              </View>
            </TouchableNativeFeedback>

          </View>
        ))}
      </View>
    </ScrollView>
  )
};

export default BookshelfScreen;