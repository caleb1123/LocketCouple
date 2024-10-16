import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { CommonActions } from '@react-navigation/native'; // Import CommonActions for resetting navigation

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const API_URL = 'https://locketcouplebe-production.up.railway.app/auth/login'; // Ensure /login is included

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

      if (!response.ok) {
        // If response is not ok, throw an error
        throw new Error('Invalid username or password');
      }

      const data = await response.json();

      // Check if login was successful based on the response from your API
      if (data.code === 200 && data.data.authenticated) {
        setMessage('Login successful!');

        // Save the token to AsyncStorage
        await AsyncStorage.setItem('token', data.data.token);

        // Reset the navigation stack and navigate to Home
        navigation.dispatch(
          CommonActions.reset({
            index: 0, // Set the index to 0 to go to the Home screen
            routes: [{ name: 'Home' }], // Define the Home route as the only route in the stack
          })
        );
      } else {
        setMessage('Invalid username or password');
      }
    } catch (error) {
      // Handle errors
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
