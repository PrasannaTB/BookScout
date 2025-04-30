import React from 'react';
import { Avatar } from 'react-native-paper';


// Local images
const images = {
  fiction: require('../assets/fiction.png'),
  romance: require('../assets/romance.png'),
  thriller: require('../assets/thriller.png'),
  fantasy: require('../assets/fantasy.png'),
  selfhelp: require('../assets/selfhelp.png'),
  biography: require('../assets/biography.png'),
  sciencefiction: require('../assets/sciencefiction.png'),
  horror: require('../assets/horror.png'),
  poetry: require('../assets/poetry.png'),
  adventure: require('../assets/adventure.png'),
  history: require('../assets/history.png'),
};

const avatars = {};

Object.entries(images).forEach(([genre, source]) => {
  avatars[genre] = (props) => (
    <Avatar.Image
      size={props?.size || 60}
      source={source}
      style={props?.style}
    />
  );
});

export default avatars;
