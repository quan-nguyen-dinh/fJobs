import {Stack} from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerTitle:"Post"}}/>
            {/* <Stack.Screen name="[slug]" */}
        </Stack>
    )
}