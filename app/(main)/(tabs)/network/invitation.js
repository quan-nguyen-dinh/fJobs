import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
import { REACT_APP_DEV_MODE } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useRouter } from "expo-router";
import ConnectionRequest from "../../../../components/ConnectionRequest";

const invitation = () => {
  const [connectionRequests, setConnectionRequests] = useState([]);

  const [userId, setUserId] = useState("");
  const router = useRouter();
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
      fetchFriendRequests();
    }
  }, [userId]);
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_DEV_MODE}/connection/request/${userId}`
      );
      if (response.status === 200) {
        const connectionRequestsData = response.data?.map((friendRequest) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.profileImage,
        }));
        console.log("connection: ", connectionRequestsData);
        setConnectionRequests(connectionRequestsData);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View>
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
          {connectionRequests?.length} Connections
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
          data={connectionRequests}
          keyExtractor={(item) => item._id}
          renderItem={({ item, key }) => (
            <ConnectionRequest
              item={item}
              key={item._id}
              connectionRequests={connectionRequests}
              setConnectionRequests={setConnectionRequests}
              userId={userId}
            />
          )}
        />
      </View>
    </View>
  );
};

export default invitation;

const styles = StyleSheet.create({});
