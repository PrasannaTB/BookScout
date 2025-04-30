import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity   } from 'react-native';

import styles from './Styles';
import { useNavigation } from '@react-navigation/native'; 
import avatars from './ImageContainer';

const HomePage = () => {

  const navigation = useNavigation();

  const genreList = [
    { genre: 'Adventure' },
    { genre: 'Biography' },
    { genre: 'Fantasy' },
    { genre: 'Fiction' },
    { genre: 'History'},
    { genre: 'Horror' },
    { genre: 'Poetry' },
    { genre: 'Romance' },
    { genre: 'Science Fiction' },
    { genre: 'Self Help' },
    { genre: 'Thriller' },
    
  ];

  const renderItem = ({ item }) => {
    const key = item.genre.toLowerCase().replace(/\s+/g, '');
    const Avatar = avatars[key];

    return (
      <TouchableOpacity 
        style={styles.itemContainer}
        onPress={() => navigation.navigate('GenreLibrary', { genre: item.genre })}
      >
        <View>
          {Avatar ? <Avatar size={100} /> : <View style={styles.placeholder} />}
          <Text style={styles.label}>{item.genre}</Text>
        </View>
      </TouchableOpacity >
    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Browse by Genre and Discover Your Next Favorite Book</Text>
      <FlatList
        data={genreList}
        keyExtractor={(item) => item.genre}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
export default HomePage;



