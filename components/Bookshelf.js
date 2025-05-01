import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableNativeFeedback, View, Alert } from 'react-native';
import styles from './Styles';
import { ref, get, set } from 'firebase/database';
import { REALTIME_DB } from './firebaseConfig';
import { useSelector } from 'react-redux';

const BookshelfScreen = ({ navigation }) => {
  const user = useSelector((state) => state.userInfo);
  console.log('User Info:', user);

  const [bookshelves, setBookshelves] = useState({
    alreadyRead: [],
    currentlyReading: [],
    wantToRead: [],
  });

  useEffect(() => {
    if (user) {
      const bookshelfRef = ref(REALTIME_DB, `users/${user.uid}/bookshelves`);

      // Initialize the bookshelves in Firebase if they don't exist
      const initializeBookshelves = () => {
        const defaultBookshelves = {
          alreadyRead: [],
          currentlyReading: [],
          wantToRead: [],
        };

        console.log('Initializing bookshelves in Firebase...');
        set(bookshelfRef, defaultBookshelves)
          .then(() => {
            console.log('Bookshelves initialized in Firebase');
            setBookshelves(defaultBookshelves); // Set state to empty shelves
          })
          .catch((err) => {
            console.error('Error initializing bookshelves:', err);
            Alert.alert('Error', 'Failed to initialize bookshelves');
          });
      };

      // Check if bookshelves exist, if not, initialize them
      get(bookshelfRef)
        .then((snapshot) => {
          if (!snapshot.exists()) {
            console.log('Bookshelves do not exist, initializing...');
            initializeBookshelves();
          } else {
            const data = snapshot.val();
            console.log('Bookshelves data fetched from Firebase:', data);

            // Ensure all three shelves are in the data (even if empty)
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
          Alert.alert('Error', 'Failed to fetch bookshelves');
        });
    }
  }, [user]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.shelvesTitle}>Your Bookshelves</Text>

        {Object.keys(bookshelves).map((shelf) => (
          <View style={styles.bookshelfContainer} key={shelf}>
            <TouchableNativeFeedback onPress={() => navigation.navigate("BookshelfDetail", { books: bookshelves[shelf], shelfName: shelf })}>
              <View style={styles.textButton}>
                <Text style={styles.shelfTitle}>
                  {shelf.replace(/([A-Z])/g, ' $1').toUpperCase()}
                </Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default BookshelfScreen;
