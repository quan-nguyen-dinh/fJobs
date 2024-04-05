import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Screen } from "react-native-screens";
import { Slot } from "expo-router";
import { Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store";
export default function RootLayoutNav() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </Provider>
  );
}
