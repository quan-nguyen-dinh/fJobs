import { router } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";
import React, {useEffect, useState} from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image, Pressable } from 'react-native';
import axios from 'axios';
import {REACT_APP_DEV_MODE} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import MessageItem from '../../../components/MessageItem';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'

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
    // <View style={styles.container}>
    //   <Pressable
    //       style={{
    //         flexDirection: "row",
    //         alignItems: "center",
    //         gap: 10,
    //         backgroundColor: "white",
    //         borderRadius: 50,
    //         height: 45,
    //         borderWidth: 1,
    //         borderColor:'gray'
    //       }}
    //     >
    //       <AntDesign
    //         style={{ marginLeft: 10 }}
    //         name="search1"
    //         size={20}
    //         color="black"
    //       />
    //       <TextInput placeholder="Search" />
    //     </Pressable>
    //   <FlatList
    //     data={friends}
    //     renderItem={({item}) => (
    //       <MessageItem item={item}/>
    //     )}
    //     keyExtractor={(item, index) => item._id}
    //   />
    // </View>
    <View>
         <ZegoUIKitPrebuiltCall
                appID={1937296802}
                appSign={'5c4f3eeba1413c68105d3da1d407f540ad7727bcb5bc01de4fb2df4a49f789ee'}
                userID={'121312'} // userID can be something like a phone number or the user id on your own user system. 
                userName={'quan2121'}
                callID={'group-room123'} // callID can be any unique string. 

                config={{
                    // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                    onOnlySelfInRoom: () => { props.navigation.navigate('HomePage') },
                    onHangUp: () => { props.navigation.navigate('HomePage') },
                }}
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