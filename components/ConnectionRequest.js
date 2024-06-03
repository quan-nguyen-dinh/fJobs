import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {REACT_APP_DEV_MODE} from '@env';

const ConnectionRequest = ({
  item,
  connectionRequests,
  setConnectionRequests,
  userId,
}) => {
  console.log('item: ', item);
  const acceptConnection = async (requestId) => {
    try {
      const response = await fetch(
<<<<<<< Updated upstream
        `${REACT_APP_DEV_MODE}/connection/request/accept`,
=======
        `http://192.168.212.104:3001/connection-request/accept`,
>>>>>>> Stashed changes
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: requestId,
            recepientId: userId,
          }),
        }
      );

      if (response.ok) {
        setConnectionRequests(
          connectionRequests.filter((request) => request._id !== requestId)
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={{ marginHorizontal: 15, marginVertical: 5 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: item?.image || null }}
        />

        <Text style={{ width: 200 }}>
          {item?.name} is inviting you to connect.
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Feather name="x" size={22} color="black" />
          </View>

          <Pressable
            onPress={() => acceptConnection(item._id)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="ios-checkmark-outline" size={22} color="#0072b1" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ConnectionRequest;

const styles = StyleSheet.create({});
