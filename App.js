import React from 'react';
import 'react-native-gesture-handler'; // Đảm bảo import trước khi sử dụng NavigationContainer
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'; // Đường dẫn đến file Login.js
import Home from './components/Home'; // Đường dẫn đến file Home.js

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }} // Ẩn header cho trang Login
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }} // Ẩn header cho trang Home
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
