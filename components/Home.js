import React, { useState } from 'react';
import { View, Button, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

const Home = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const addProfilePicture = () => {
    // Logic to add a profile picture (could use an image picker)
    // For demonstration purposes, we're just using a placeholder image
    setProfilePicture('https://via.placeholder.com/200');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello!</Text>
      {profilePicture ? (
        <Image source={{ uri: profilePicture }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>No Profile Picture</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={addProfilePicture}>
        <Text style={styles.buttonText}>Add Profile Picture</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light background
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Circular image
    marginBottom: 20,
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#d9d9d9', // Placeholder color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    color: '#888', // Text color for placeholder
  },
  button: {
    backgroundColor: '#007AFF', // Blue button
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;
