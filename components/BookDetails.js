import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, ScrollView } from 'react-native';   
import styles from './Styles';

import { useNavigation, useRoute  } from '@react-navigation/native';

const BookDetails = () => {
  const navigation = useNavigation(); 

  const route = useRoute();
  const { link } = route.params;

  const [bookDetails, setBookDetails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`${link}?key=AIzaSyAALkmVbjolFbHPR73GbA6GC0mPqEf1x14`)
      .then(response => {
      if(!response.ok)
      throw new Error("Error: " + response.statusText);
        
        return response.json();
      })
      .then(data => {
        setBookDetails(data);
        setLoading(false)
      })
        .catch(err => console.error(err))
  }, [link]);
  
  useEffect(() => {
    if (bookDetails && bookDetails.volumeInfo) {
      navigation.setOptions({
        title: bookDetails.volumeInfo.title || 'Book Details',
      });
    }
  }, [bookDetails]);
    
  if (loading) {
    return(
      <View style = {styles.container}>
        <ActivityIndicator size = "large" />
      </View>
    );
  }
  
  if (!bookDetails) {
    return (
      <View style={styles.container}>
        <Text>Failed to load book details.</Text>
      </View>
    );
  }

  const { volumeInfo } = bookDetails;

  return (
    <View style={styles.scrollViewContent}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={
            volumeInfo && volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail
              ? { uri: volumeInfo.imageLinks.thumbnail }
              : require('../assets/noImage.png')
          }
          style={styles.bookImageDetail}
          resizeMode="cover"
        />

        <Text style={styles.detailsTitle}>{volumeInfo.title}</Text>
        <Text style={styles.detailsAuthor}>by {volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown'}</Text>
        <Text style={styles.descriptionHeader}>Book Description</Text>
        <Text style={styles.description}>{volumeInfo.description ? volumeInfo.description.replace(/<[^>]*>/g, '') : '' || 'No description available.'}</Text>
        <Text style={styles.info}>Publisher: {volumeInfo.publisher || 'Unknown'}</Text>
        <Text style={styles.info}>Published Date: {volumeInfo.publishedDate || 'Unknown'}</Text>
      </ScrollView>
    </View>
  );
};
    
    export default BookDetails;
    
    