import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screen } from "react-native-screens";
import { Slot, router } from "expo-router";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import { OverlayContext, OverlayProvider } from "stream-chat-expo";
import { socket } from "../App";
import { INCOMMING_CALL } from "../constants/event";

export default function RootLayoutNav() {
  useEffect(() => {
    const run = async () => {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
          'android.permission.POST_NOTIFICATIONS',
          'android.permission.BLUETOOTH_CONNECT',
        ]);
      }
    };
    run();

    const handleIncomingCall = async (data) => {
      if(data.userId) {
        router.replace(`/(main)/(call)/${data?.callId}`);
      }
    }
    socket.on(INCOMMING_CALL, handleIncomingCall);
    return () => {
      socket.off(INCOMMING_CALL, handleIncomingCall)
    }
  }, []);
  
  return (
    <Provider store={store}>
      <OverlayProvider>
        <ThemeProvider value={DefaultTheme}>
          <SafeAreaProvider>
            <Slot />
          </SafeAreaProvider>
        </ThemeProvider>
      </OverlayProvider>
    </Provider>
  );
}
