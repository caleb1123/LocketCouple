import React from 'react';
import { StyleSheet, View } from 'react-native';
import Login from './components/Login'; // Đường dẫn đến file Login.js

export default function App() {
  return (
    <View style={styles.container}>
      <Login />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
