import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Notification",
          headerBackTitle: "back",
          headerBackButtonMenuEnabled: true,
        }}
      />
    </Stack>
  );
}
