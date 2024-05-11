import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {REACT_APP_DEV_MODE} from '@env';
import { io } from "socket.io-client";
import { useEffect } from 'react';

export const socket = io("http://10.10.20.47:3001");

export default function App() {
  console.log('API: ', REACT_APP_DEV_MODE);
  useEffect(()=> {
    console.warn('socket: ', socket);
    socket.emit("chat" , 'EVENT AFTER EMIT')
  }, [])
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
