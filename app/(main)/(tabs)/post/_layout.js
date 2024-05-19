import {Stack} from "expo-router";
import { Text } from "react-native";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerTitle:"Post"}}/>
            <Stack.Screen name="[slug]" ptions={{
            headerTitle: "Detail Chat",
            headerLeft: () => (<Text onPress={()=> router.back()}>H</Text>)
        }}/>
        </Stack>
    )
}