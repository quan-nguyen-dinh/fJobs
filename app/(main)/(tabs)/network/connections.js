import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
import { REACT_APP_DEV_MODE } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation, useRouter } from "expo-router";

const connections = () => {
  const [connections, setConnections] = useState([]);

  const [userId, setUserId] = useState("");
  const router = useRouter();
  const navigation = useNavigation();
  const handleMessage = () => {
    // router.push("")
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchConnections();
    }
  }, [userId]);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_DEV_MODE}/connection/all/${userId}`
      );
      setConnections(response.data.connections);
    } catch (error) {
      console.log(error);
    }
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="black"
          />
          <Text style={{ fontSize: 20, fontWeight: "500" }}>
            {" "}
            {connections?.length} Connections
          </Text>
        </View>
      ),
    });
  }, [connections]);
  console.log("connections: ", connections);
  return (
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <FlatList
          data={connections}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginVertical: 10,
              }}
            >
              <Image
                style={{ width: 48, height: 48, borderRadius: 24 }}
                source={{ uri: item?.profileImage }}
              />

              <View style={{ flexDirection: "column", gap: 2, flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  {item?.name}
                </Text>

                <Text style={{ color: "gray" }}>
                  B.Tech | Computer Science Technology
                </Text>

                <Text style={{ color: "gray" }}>
                  connected on {moment(item?.createdAt).format("MMMM Do YYYY")}
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Entypo name="dots-three-vertical" size={20} color="black" />
                <Feather
                  name="send"
                  size={20}
                  color="black"
                  onPress={handleMessage}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
  );
};

export default connections;

const styles = StyleSheet.create({});
