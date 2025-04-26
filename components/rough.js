import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import styles from './Styles';
import { useNavigation } from '@react-navigation/native'; 

const RoughPage = () => {

  const navigation = useNavigation(); 
  
  const [books, setBooks] = useState([]); 
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {

    setLoading(true);
    
    fetch(`https://www.googleapis.com/books/v1/volumes?q=bestseller&orderBy=relevance&maxResults=10&key=AIzaSyAALkmVbjolFbHPR73GbA6GC0mPqEf1x14`)
    .then(response => {
      if(!response.ok)
        throw new Error("Error: " + response.statusText);

        return response.json();
    })
    .then(data => {
      setBooks(data.items || []);
      setLoading(false)
    })
    .catch(err => console.error(err))
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
        <View style={styles.container}>
          <FlatList
            data = {books}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={separator}
          />
        </View>
      </>
    );
  }
};

export default RoughPage;


