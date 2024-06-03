import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
import {REACT_APP_DEV_MODE} from '@env';
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";

const connections = () => {
  const [connections, setConnections] = useState([]);

  const [userId, setUserId] = useState("");
  const router = useRouter();
  const handleMessage = () => {
    // router.push("")
  }
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

  console.log('connections: ',connections);
  return (
    <SafeAreaView>
     
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 12,
            marginTop: 10,
          }}
        >
          <Text style={{ fontWeight: "500" }} onPress={() => router.back()}>
            {connections?.length} Connections
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <AntDesign name="search1" size={22} color="black" />
            <Octicons name="three-bars" size={22} color="black" />
          </View>
        </View>

        <View
          style={{
            height: 2,
            borderColor: "#E0E0E0",
            borderWidth: 2,
            marginTop: 12,
          }}
        />
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
                source={{ uri: item?.profileImage || null}}
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
                <Feather name="send" size={20} color="black" onPress={handleMessage}/>
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        </View>
    </SafeAreaView>
  );
};

export default connections;

const styles = StyleSheet.create({});
