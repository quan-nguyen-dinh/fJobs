import { Stack, router } from "expo-router";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

function Layout() {
  return (
    
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{headerTitle:"Chat"}}/>
      </Stack>
  );
}

export default Layout;
