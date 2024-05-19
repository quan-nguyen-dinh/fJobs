import { Redirect, Stack } from "expo-router";
import { View, Text } from "react-native"


const MainLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name="call" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default MainLayout;