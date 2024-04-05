import {Stack} from "expo-router";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    FlatList,
    Pressable,
    Image,
    TextInput,
  } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Layout(){
    const insets = useSafeAreaInsets();
    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="login" options={{headerShown:false}}/>
            <Stack.Screen name="register" options={{headerShown:false}}/>
        </Stack>
    )
}