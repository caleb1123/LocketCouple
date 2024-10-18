import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = 'https://locketcouplebe-production.up.railway.app/auth/login';

  const handleLogin = async () => {
    // Prepare the payload
    const payload = {
      userName: username,
      password: password,
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json(); // Parse the JSON response

      if (data.code === 200 && data.data?.authenticated) {
        setMessage('Login successful!');

        // Save the token to AsyncStorage
        await AsyncStorage.setItem('token', data.data.token);

        // Reset the navigation stack and navigate to Home
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        );
      } else if (data.code === 101) {
        // Handle user not active case
        setMessage(data.message); // Set the API message
        Alert.alert('Error', data.message); // Show the API message
      } else if (data.code === 401) {
        // Invalid username/password
        setMessage(data.message || 'Invalid username or password');
        Alert.alert('Error', data.message || 'Invalid username or password');
      } else {
        // Fallback for other errors
        setMessage(data.message || 'An error occurred');
        Alert.alert('Error', data.message || 'An error occurred');
      }
    } catch (error) {
      // Handle any network or server errors
      setMessage(error.message);
      Alert.alert('Error', error.message); // Display an alert with the error
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});
