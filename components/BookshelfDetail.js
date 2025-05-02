import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './Styles';
import { REALTIME_DB } from './firebaseConfig';
import { ref, update } from 'firebase/database';
import { useSelector } from 'react-redux';

const BookshelfDetail = ({ route, navigation }) => {
  const { books, shelfName } = route.params || {};
  const user = useSelector((state) => state.userInfo);

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    if (books && typeof books === 'object') {
      const booksArray = Object.values(books);
      setBookList(booksArray);
    } else {
      console.warn('BookshelfDetail: Invalid or missing books:', books);
      setBookList([]);
    }
  }, [books]);

  const removeBookFromShelf = (bookToRemove) => {
    if (!user || !shelfName) return;

    const updatedBooks = bookList.filter((b) => b.id !== bookToRemove.id);
    setBookList(updatedBooks);

    const bookshelfRef = ref(REALTIME_DB, `users/${user.uid}/bookshelves`);

    update(bookshelfRef, {
      [shelfName]: updatedBooks,
    })
      .then(() => {
        console.log('Book removed successfully');
      })
      .catch((err) => {
        console.error('Error removing book:', err);
        Alert.alert('Error', 'Failed to remove the book.');
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.bookContainer}>
      <Image
        source={item.volumeInfo.imageLinks
          ? { uri: item.volumeInfo.imageLinks.thumbnail }
          : require('../assets/noImage.png')}
        style={styles.bookImage}
      />
      <Text style={styles.title}>{item.volumeInfo.title}</Text>
      <Text style={styles.author}>
        {item.volumeInfo.authors?.join(', ') || 'Unknown Author'}
      </Text>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeBookFromShelf(item)}
      >
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
    
  );

  return (
    <View style={styles.container}>
      {bookList.length > 0 && (
        <Text style={styles.shelfTitle}>Books in this Shelf</Text>
      )}
      {bookList.length > 0 ? (
        <FlatList
          data={bookList}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text>No books in this shelf.</Text>
      )}
    </View>
  );
};

export default BookshelfDetail;