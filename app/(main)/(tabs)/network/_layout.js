import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" screenOptions={{ headerTitle: "Network" }} />
      <Stack.Screen name="connections" />
    </Stack>
  );
}
