import { Tabs } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { I18n } from "i18n-js";
import transalations from "../../transalations";
import { Provider, useSelector } from "react-redux";
import { store } from "../../store";

export default function Layout() {
  const i18n = useSelector((state) => state.transalation.i18n);
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: i18n?.t("tabFirst"),
          tabBarLabelStyle: { color: "#333" },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="black" />
            ) : (
              <AntDesign name="home" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="network"
        options={{
          tabBarLabel: i18n?.t("tabSecond"),
          tabBarLabelStyle: { color: "#333" },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="people" size={24} color="black" />
            ) : (
              <Ionicons name="people-outline" size={24} color="black" />
            ),
        }}
        backBehavior="history"
      />
      <Tabs.Screen
        name="post"
        options={{
          tabBarLabel: i18n?.t("tabThird"),
          tabBarLabelStyle: { color: "#333" },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <AntDesign name="plussquare" size={24} color="black" />
            ) : (
              <AntDesign name="plussquareo" size={24} color="black" />
            ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarLabel: i18n?.t("tabFourth"),
          tabBarLabelStyle: { color: "#333" },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="notifications-sharp" size={24} color="black" />
            ) : (
              <Ionicons name="notifications-outline" size={24} color="black" />
            ),
        }}
        backBehavior="history"
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: i18n?.t("tabFifth"),
          tabBarLabelStyle: { color: "#333" },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="people" size={24} color="black" />
            ) : (
              <Ionicons name="people-outline" size={24} color="black" />
            ),
        }}
        backBehavior="history"
      />
    </Tabs>
  );
}
