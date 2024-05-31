import { Stack, router } from "expo-router";
import { Text } from "react-native";

function Layout() {
  return (
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{headerTitle:"Chat"}}/>
      </Stack>
  );
}

export default Layout;
