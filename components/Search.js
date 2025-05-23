import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native';

const SearchPage = () => {
  const navigation = useNavigation();

  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setHasSearched(true);
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=40&key=AIzaSyAALkmVbjolFbHPR73GbA6GC0mPqEf1x14`
    )
      .then((response) => {
        if (!response.ok) throw new Error('Error: ' + response.statusText);
        return response.json();
      })
      .then((data) => {
        setBooks(data.items || []);
        setInput('');
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetails', { link: item.selfLink })}
    >
      <View style={styles.bookContainer}>
        <Image
          source={
            item.volumeInfo.imageLinks === undefined
              ? require('../assets/noImage.png')
              : { uri: item.volumeInfo.imageLinks.thumbnail }
          }
          resizeMode="cover"
          style={styles.bookImage}
          defaultSource={require('../assets/noImage.png')}
        />
        <Text style={styles.title}>{item.volumeInfo.title}</Text>
        <Text style={styles.author}>
          by{' '}
          {item.volumeInfo.authors === undefined
            ? 'Unknown'
            : item.volumeInfo.authors.join(' & ')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderNoResults = () =>
    hasSearched && books.length === 0 ? (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>No matches found for your search.</Text>
        <Text style={{ fontSize: 15 }}>Try searching with different keywords!</Text>
        <View>
          <Image
            source={require('../assets/searchLogo.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </View>
    ) : null;

  const separator = () => <View style={styles.separator} />;

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <View style={styles.searchRow}>
        <Searchbar
          placeholder="Type here..."
          onChangeText={(text) => setInput(text)}
          value={input}
          icon={() => null}
          style={styles.searchBar}
          right={() => (
            <IconButton
              icon="magnify"
              onPress={handleSearch}
              iconColor="rgb(243, 114, 68)"
              style={styles.searchIcon}
            />
          )}
        />
      </View>

      <View style={styles.container}>
        <FlatList
          data={books}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={separator}
          ListEmptyComponent={renderNoResults}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default SearchPage;
