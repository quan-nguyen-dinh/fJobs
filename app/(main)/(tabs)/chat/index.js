import { router } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";
import React, {useEffect, useState} from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image, Pressable } from 'react-native';
import axios from 'axios';
import {REACT_APP_DEV_MODE} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import MessageItem from '../../../../components/MessageItem';
import {
  CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { useRouter } from "expo-router";


function index() {
  const [friends, setFriends] = useState([]);
  console.log('chat')
  const getFriends = async () => {
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    console.log('userId: ', userId);
    try {
      const res = await axios.get(`${REACT_APP_DEV_MODE}/connection/all/${userId}`);
      console.log('data: ', res.data);
      setFriends(res.data?.connections);
    }catch(err) {
      console.log('ERROR FETCH : ', err);
    }
  };

  useEffect(()=>{
    getFriends();
  }, []);
  
  const handleMessage = async (messageId) => {
    console.log('messageId ', messageId);
    router.push(`/message/${messageId}`);
  };
  return (
    <View style={styles.container}>
      <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "white",
            borderRadius: 50,
            height: 45,
            borderWidth: 1,
            borderColor:'gray'
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput placeholder="Search" />
        </Pressable>
      <FlatList
        data={friends}
        renderItem={({item}) => (
          <MessageItem item={item}/>
        )}
        keyExtractor={(item, index) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  conversationContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  conversationMessage: {
    color: '#888',
  },
});


export default index