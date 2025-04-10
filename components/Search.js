import React, {useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native'; 

const SearchPage = () => {

  const navigation = useNavigation(); 
  
  const [input, setInput] = useState('');
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); 

  const handleSearch = async () => {
    //e.preventDefault();
    if (!input.trim())
      return;

    setLoading(true);
    setHasSearched(true);
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=40&key=AIzaSyAALkmVbjolFbHPR73GbA6GC0mPqEf1x14`)
    .then(response => {
      if(!response.ok)
        throw new Error("Error: " + response.statusText);

        return response.json();
    })
    .then(data => {
      setBooks(data.items || []);
      setInput('');
      setLoading(false)
    })
    .catch(err => console.error(err))
  };

  const renderBookItem = ({ item }) => (
    <TouchableHighlight onPress={() => navigation.navigate('BookDetails', { link: item.selfLink })}>
      <View style = {styles.bookContainer}>
        <View>  
          <Image
            //source = {{ uri: item.volumeInfo.imageLinks.thumbnail }}
            source={item.volumeInfo.imageLinks === undefined ? require('../assets/noImage.jpg') : { uri: item.volumeInfo.imageLinks.thumbnail }}
            resizeMode='cover'
            style={styles.bookImage}
            defaultSource={require('../assets/noImage.jpg')}
          />
          <Text style={styles.title}>{item.volumeInfo.title}</Text>
          <Text style={styles.author}>
            by {item.volumeInfo.authors === undefined ? 'Unknown' : item.volumeInfo.authors.join(' & ')}
          </Text>
          
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderNoResults = () => (
    hasSearched && books.length === 0 ? (
      <View style={styles.container}>
        <Text style={{fontSize: 20}}>No matches found for your search.</Text>
        <Text style={{fontSize: 15}}>Try searching with different keywords!</Text>
        <View>
          <Image
            source={require('../assets/searchLogo.jpg')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </View>
    ) : null
  );

  const separator = () => (
    <View style={styles.separator} />
  );

  if (loading) {
    return(
      <View style = {styles.container}>
        <ActivityIndicator size = "large" />
      </View>
    );
  }
  else {
    return (
      <>
        <View style={styles.searchRow}>
          <Searchbar
            icon={() => null}
            placeholder="Type here..."
            onChangeText={input => setInput(input)}
            value={input}
            style={styles.searchBar}
          />
          <Button 
            icon="magnify" 
            mode="contained" 
            onPress={handleSearch}
            style={styles.searchButton}>
          </Button>
        </View>
        <View>
          <FlatList
            data = {books}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={separator}
            ListEmptyComponent={renderNoResults}
          />
        </View>
      </>
    );
  }
};

export default SearchPage;


