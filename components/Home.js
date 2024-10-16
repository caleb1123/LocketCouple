import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

export default function Home({ navigation }) {
  const handleLogout = async () => {
    // Xóa token khỏi AsyncStorage
    await AsyncStorage.removeItem('token');
    // Chuyển hướng về trang đăng nhập
    navigation.navigate('Login');
    Alert.alert('Logged out', 'You have been logged out successfully.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
