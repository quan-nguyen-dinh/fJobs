import { Stack, router } from "expo-router";
import { Text } from "react-native";

export default function Layout() {
  return (
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{headerTitle:"Chat"}}/>
        <Stack.Screen name="[slug]" options={{
            headerTitle: "Detail Chat",
            headerLeft: () => (<Text onPress={()=> router.back()}>H</Text>)
        }}/>
      </Stack>
  );
}
