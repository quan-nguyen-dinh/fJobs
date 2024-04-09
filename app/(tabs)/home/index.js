import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useTransition } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Ionicons, Entypo,EvilIcons, Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useRouter } from "expo-router";
import {REACT_APP_DEV_MODE} from '@env';
import { I18n } from 'i18n-js';
import transalations from "../../../transalations";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../../store/couterSlice";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";


const i18n = new I18n(transalations);
// i18n.enableFallback = true;
// i18n.locale = 'en';


const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const a = useTransition();
  console.log('a: ', a);
  console.log('i18n local: ', i18n.locale);
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
      fetchUserProfile();
    }
  }, [userId]);
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_DEV_MODE}/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await axios.get(`${REACT_APP_DEV_MODE}/all`);
        console.log("posts: ", response.data.posts);
        setPosts(response.data.posts);
      } catch (error) {
        console.log("error fetching posts", error);
      }
    };
    fetchAllPosts();
  }, []);

  const MAX_LINES = 2;
  const [showfullText, setShowfullText] = useState(false);
  const toggleShowFullText = () => {
    setShowfullText(!showfullText);
  };
  const [isLiked, setIsLiked] = useState(false);
  const handleLikePost = async (postId) => {
    try {
      const response = await axios.post(
        `${REACT_APP_DEV_MODE}/like/${postId}/${userId}`
      );
      if (response.status === 200) {
        const updatedPost = response.data.post;
        setIsLiked(updatedPost.likes.some((like) => like.user === userId));
      }
    } catch (error) {
      console.log("Error liking/unliking the post", error);
    }
  };
  const router = useRouter();
  const handleComment = async (postId) => {
    console.log('postId: ', postId);
    router.push(`/post/${postId}`);
  };
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();
  return (
    <SafeAreaView style ={{backgroundColor: 'white'}}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          borderBottomWidth: 0.5,
          borderBottomColor:'gray'
        }}
      >
        <View 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}
        >
          
          <Pressable onPress={() => router.push("/home/profile")}>
            <Image
              style={{ width: 35, height: 35, borderRadius: 15 }}
              source={{ uri: user?.profileImage || null }}
            />
          </Pressable>
          <Text 
            style={{
              paddingLeft: 5, 
              fontSize: 18, 
              fontWeight: 800, 
              color: '#1877F2'}}
          >QQ Talk</Text>
        </View>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 50,
            height: 30,
            flex: 1,
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

        <Ionicons name="chatbox-ellipses-outline" size={24} color="#1877F2" />
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }, index) => (
          <View key={item._id} style={{backgroundColor:'white'}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingTop:3 }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 30 }}
                  source={{ uri: item?.user?.profileImage || null }}
                />

                <View style={{ flexDirection: "column", gap: 2 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {item?.user?.name}
                  </Text>
                  <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        color: "gray",
                        fontSize: 15,
                        fontWeight: "400",
                      }}
                    >
                      Dev
                    </Text>
                    <Entypo name="dot-single" size={12} color="gray" />
                    <Text style={{ color: "gray",fontSize: 14 }}>
                      {moment(item.createdAt).format("MMMM Do YYYY")}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Feather name="more-horizontal" size={24} color="black" />
                <Ionicons name="close" size={24} color="black" />
              </View>
            </View>

            <View
              style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 12}}
            >
              <Text
                style={{ fontSize: 15 }}
                numberOfLines={showfullText ? undefined : MAX_LINES}
              >
                {item?.description}
              </Text>
              {!showfullText && (
                <Pressable onPress={toggleShowFullText}>
                  <Text style={{color:'#1877F2'}}>See more</Text>
                </Pressable>
              )}
            </View>

            {item?.imageUrl && (
              <Image
                style={{ width: "100%", height: 240 }}
                source={{ uri: item?.imageUrl }}
              />
            )}

            {item?.likes?.length > 0 && (
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <SimpleLineIcons name="like" size={16} color="#0072b1" />
                <Text style={{ color: "black" }}>{item?.likes?.length}</Text>
              </View>
            )}

            {/* <View
              style={{
                height: 2,
                borderColor: "black",
                borderWidth: 2,
              }}
            /> */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 10,
                paddingTop: 10,
                borderTopWidth:0.2,
                borderTopColor: 'gray'
              }}
            >
              <Pressable style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={() => handleLikePost(item?._id)}>
                <AntDesign
                  style={{ textAlign: "center" }}
                  name="like2"
                  size={24}
                  color={isLiked ? "#0072b1" : "gray"}
                />
                <Text> </Text>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: isLiked ? "#0072b1" : "gray",
                    marginTop: 2,
                  }}
                >
                  Like
                </Text>
              </Pressable>
              <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => handleComment(item?._id)}>
                <FontAwesome
                  name="comment-o"
                  size={20}
                  color="gray"
                  style={{ textAlign: "center" }}
                />
                <Text> </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 2,
                    fontSize: 12,
                    color: "gray",
                  }}
                >
                  Comment
                </Text>
              </Pressable>
              <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="link" size={22} color="gray" />                  
                <Text> </Text>
                <Text
                  style={{
                    marginTop: 2,
                    fontSize: 12,
                    textAlign: "center",
                    color: "gray",
                  }}
                >
                  Copy
                </Text>
              </Pressable>
              <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
                <AntDesign name="sharealt" size={23} color="gray" />
                <Text> </Text>
                <Text style={{ marginTop: 2, fontSize: 12, color: "gray" }}>
                  Share
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                height: 2,
                borderColor: "#D2D7D3",
                borderWidth: 2,
              }}
            />
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
