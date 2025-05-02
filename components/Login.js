import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import { FIREBASE_AUTH } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserInfo } from './AccountReducer'; // adjust path if necessary
import styles from './Styles';
import { ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';


const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", response.user.email);

      // ✅ Dispatch user info to Redux
      dispatch(setUserInfo({
        uid: response.user.uid,
        email: response.user.email,
      }));

      alert('Signed in successfully!');
      // navigation.replace('HomeTabNavigator'); 
    } catch (error) {
      console.error(error);
      alert('Sign in failed: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", response.user.email);
      alert('Account created successfully!');
    } catch (error) {
      console.error(error);
      alert('Sign up failed: ' + (error.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground 
          source={require('../assets/background1.png')}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <View style={styles.loginPage}>
            <Text style={styles.welcome}>Welcome to</Text>
            <Text style={styles.appName}>BOOK SCOUT</Text>
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={setEmail}
            />

            <TextInput
              value={password}
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={setPassword}
            />

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <>
                <TouchableOpacity
                style={styles.button}
                onPress={signIn}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style={{ height: 10 }} />

                <TouchableOpacity
                  onPress={signUp}
                >
                  <Text style={styles.buttonText}>Create account</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
