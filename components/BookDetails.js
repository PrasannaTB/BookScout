import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import styles from './Styles';
import { ref, remove, set, onValue } from 'firebase/database';
import { REALTIME_DB } from './firebaseConfig';

const BookDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { link } = route.params;

  const user = useSelector((state) => state.userInfo);
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedShelf, setSelectedShelf] = useState('');
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`${link}?key=AIzaSyAALkmVbjolFbHPR73GbA6GC0mPqEf1x14`);
        if (!res.ok) throw new Error('Fetch error');
        const data = await res.json();
        setBookDetails(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [link]);

  useEffect(() => {
    if (user?.uid && bookDetails?.id && !initialCheckDone) {
      const bookshelvesRef = ref(REALTIME_DB, `users/${user.uid}/bookshelves`);
      onValue(bookshelvesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          for (let shelf of Object.keys(data)) {
            const books = Object.values(data[shelf] || {});
            if (books.find(b => b.id === bookDetails.id)) {
              setSelectedShelf(shelf);
              break;
            }
          }
        }
        setInitialCheckDone(true);
      });
    }
  }, [user, bookDetails, initialCheckDone]);

  const handleShelfChange = async (newShelf) => {
    if (!user?.uid || !bookDetails) return;
  
    const bookData = {
      id: bookDetails.id,
      volumeInfo: bookDetails.volumeInfo,
    };
  
    const shelves = ['alreadyRead', 'currentlyReading', 'wantToRead'];
  
    try {
      // Remove from all shelves first
      await Promise.all(
        shelves.map((shelf) =>
          remove(ref(REALTIME_DB, `users/${user.uid}/bookshelves/${shelf}/${bookData.id}`))
        )
      );
  
      // Then add to the selected shelf
      await set(
        ref(REALTIME_DB, `users/${user.uid}/bookshelves/${newShelf}/${bookData.id}`),
        bookData
      );
  
      setSelectedShelf(newShelf);
      Alert.alert('Success', `Book moved to ${newShelf}`);
    } catch (err) {
      console.error('Firebase update error:', err);
      Alert.alert('Error', 'Failed to update bookshelf.');
    }
  };

  if (loading) {
    return <View style={styles.container}><ActivityIndicator size="large" /></View>;
  }

  if (!bookDetails) {
    return <View style={styles.container}><Text>❌ Failed to load book details.</Text></View>;
  }

  const { volumeInfo } = bookDetails;

  return (
    <View style={styles.scrollViewContent}>
      <ScrollView>
        <Image
          source={
            volumeInfo.imageLinks?.thumbnail
              ? { uri: volumeInfo.imageLinks.thumbnail }
              : require('../assets/noImage.png')
          }
          style={styles.bookImageDetail}
          resizeMode="cover"
        />
        <Text style={styles.detailsTitle}>{volumeInfo.title}</Text>
        <Text style={styles.detailsAuthor}>
          by {volumeInfo.authors?.join(', ') || 'Unknown'}
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedShelf}
            onValueChange={(value) => {
              setSelectedShelf(value);
              handleShelfChange(value);
            }}
            style={styles.picker}
          >
            <Picker.Item label="Already Read" value="alreadyRead" />
            <Picker.Item label="Currently Reading" value="currentlyReading" />
            <Picker.Item label="Want to Read" value="wantToRead" />
          </Picker>
        </View>

        <Text style={styles.descriptionHeader}>Book Description</Text>
        <Text style={styles.description}>
          {volumeInfo.description?.replace(/<[^>]*>/g, '') || 'No description available.'}
        </Text>
        <Text style={styles.info}>Publisher: {volumeInfo.publisher || 'Unknown'}</Text>
        <Text style={styles.info}>Published Date: {volumeInfo.publishedDate || 'Unknown'}</Text>
      </ScrollView>
    </View>
  );
};

export default BookDetails;
