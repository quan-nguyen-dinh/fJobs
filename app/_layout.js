import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screen } from "react-native-screens";
import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

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
  }, []);
  
  return (
    <Provider store={store}>
      <ThemeProvider value={DefaultTheme}>
        <SafeAreaProvider>
          <Slot />
        </SafeAreaProvider>
      </ThemeProvider>
    </Provider>
  );
}
