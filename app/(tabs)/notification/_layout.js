import { Stack } from "expo-router";
import { Text } from "react-native";
import { router } from 'expo-router';

export default function Layout() {
  return (
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{headerTitle:"Notification",
          headerBackTitle: 'back',
          headerBackButtonMenuEnabled: true,
          headerLeft: () => (<Text onPress={()=> router.back()}>H</Text>)
        }}/>
      </Stack>
  );
}
