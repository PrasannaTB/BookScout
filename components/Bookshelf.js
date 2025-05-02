import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableNativeFeedback, View, Alert } from 'react-native';
import styles from './Styles';
import { ref, get, set } from 'firebase/database';
import { REALTIME_DB } from './firebaseConfig';
import { useSelector } from 'react-redux';

const BookshelfScreen = ({ navigation }) => {
  const user = useSelector((state) => state.userInfo);

  const [bookshelves, setBookshelves] = useState({
    alreadyRead: [],
    currentlyReading: [],
    wantToRead: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      const bookshelfRef = ref(REALTIME_DB, `users/${user.uid}/bookshelves`);

      const initializeBookshelves = () => {
        const defaultBookshelves = {
          alreadyRead: [],
          currentlyReading: [],
          wantToRead: [],
        };
        set(bookshelfRef, defaultBookshelves)
          .then(() => setBookshelves(defaultBookshelves))
          .catch((err) => {
            console.error('Error initializing bookshelves:', err);
            Alert.alert('Error', 'Failed to initialize bookshelves');
          });
      };

      get(bookshelfRef)
        .then((snapshot) => {
          setLoading(false);
          if (!snapshot.exists()) {
            initializeBookshelves();
          } else {
            const data = snapshot.val();
            const shelves = {
              alreadyRead: data.alreadyRead || [],
              currentlyReading: data.currentlyReading || [],
              wantToRead: data.wantToRead || [],
            };
            setBookshelves(shelves);
          }
        })
        .catch((err) => {
          console.error('Error fetching bookshelf:', err);
          setLoading(false);
          Alert.alert('Error', 'Failed to fetch bookshelves');
        });
    } else {
      setLoading(false);
      Alert.alert('Error', 'User not authenticated');
    }
  }, [user]);

  return (
    <ScrollView>
      <View style={styles.bookshelfScreenContainer}>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          Object.keys(bookshelves).map((shelf) => (
            <View style={styles.bookshelfCard} key={shelf}>
              <TouchableNativeFeedback
                onPress={() =>
                  navigation.navigate('BookshelfDetail', {
                    books: bookshelves[shelf],
                    shelfName: shelf,
                  })
                }
              >
                <View style={styles.textButton}>
                  <Text style={styles.shelfTitle}>
                    {shelf.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default BookshelfScreen;
