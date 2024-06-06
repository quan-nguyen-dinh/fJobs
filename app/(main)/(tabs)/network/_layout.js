import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{headerShown: true}}>
      <Stack.Screen name="index" options={{ headerTitle: 'Network'}} />
      <Stack.Screen name="connections" />
    </Stack>
  );
}
