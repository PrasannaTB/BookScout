import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator  } from 'react-native';   
import styles from './Styles';

import { useNavigation, useRoute  } from '@react-navigation/native';

const GenreLibrary = () => {
  const navigation = useNavigation(); 

  const route = useRoute();
  const { genre } = route.params;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=newest&maxResults=40&key=AIzaSyAALkmVbjolFbHPR73GbA6GC0mPqEf1x14`)
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
  }, [genre]);

  const renderBookItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { link: item.selfLink })}>
      <View style = {styles.bookContainer}>
         
        <Image
          source={item.volumeInfo.imageLinks === undefined ? require('../assets/noImage.png') : { uri: item.volumeInfo.imageLinks.thumbnail }}
          resizeMode='cover'
          style={styles.bookImage}
          defaultSource={require('../assets/noImage.png')}
        />
        <Text style={styles.title}>{item.volumeInfo.title}</Text>
        <Text style={styles.author}>
          by {item.volumeInfo.authors === undefined ? 'Unknown' : item.volumeInfo.authors.join(' & ')}
        </Text>
              
        
      </View>
    </TouchableOpacity>
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
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </>
    );
  }
};
    
    export default GenreLibrary