import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { FIREBASE_AUTH } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';


const Login = () => {
    const navigation = useNavigation();

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
      alert('Signed in successfully!');
      //navigation.replace('HomeTabNavigator'); 
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
      //alert('Check your emails!')
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
        <View style={styles.container}>
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
              <Button title="Login" onPress={signIn} />
              <View style={{ height: 10 }} />
              <Button title="Create account" onPress={signUp} />
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

