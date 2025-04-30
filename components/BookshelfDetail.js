import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import styles from './Styles';
import { REALTIME_DB } from './firebaseConfig';
import { useSelector } from 'react-redux';

const BookshelfDetail = ({ route, navigation }) => {
  const { books, shelfName } = route.params; // Expect shelfName to be passed too
  const user = useSelector((state) => state.userInfo);

  const [bookList, setBookList] = useState(books);

  const removeBookFromShelf = (bookToRemove) => {
    if (!user || !shelfName) return;

    const updatedBooks = bookList.filter((b) => b.id !== bookToRemove.id);

    setBookList(updatedBooks);

    const bookshelfRef = REALTIME_DB.ref(`users/${user.uid}/bookshelves`);

    // Update the specific bookshelf by shelfName
    bookshelfRef.update({
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
    <View style={styles.bookItem}>
      <Image
        source={item.imageLinks ? { uri: item.imageLinks.thumbnail } : require('../assets/noImage.png')}
        style={styles.bookImage}
      />
      <Text style={styles.bookTitle}>{item.title}</Text>
      <Text style={styles.bookAuthor}>{item.authors?.join(', ') || 'Unknown Author'}</Text>

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
        />
      ) : (
        <Text>No books in this shelf.</Text>
      )}
    </View>
  );
};

export default BookshelfDetail;
