import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  TextInput,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { REACT_APP_DEV_MODE } from "@env";
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { Ionicons, Entypo, Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { socket } from "../../../App";

const MAX_LINES = 2;

const DetailPost = () => {
  console.log("-------------RE-RENDER-------------");
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState();
  const [userId, setUserId] = useState("");
  const [comment, onChangeComment] = React.useState("");
  const [showfullText, setShowfullText] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(`${REACT_APP_DEV_MODE}/posts/${slug}`);
      console.log('reqq')
      setPost(response.data);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  }, []);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  const toggleShowFullText = () => {
    setShowfullText(!showfullText);
  };

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

  const handleComment = useCallback(async () => {
    try {
      const newComment = {
        content: comment,
        userId: userId,
      }
      console.log(newComment, 'date: ', Date.now);
      // const response = await axios.post(
      //   `192.168.1.15:3001/posts/comment/${slug}`,{
      //     ...newComment
      //   }
      // );
      socket.emit('push-comment', newComment);
      const response = await axios.post(
        `${REACT_APP_DEV_MODE}/posts/comment/${slug}`, {
        ...newComment
      }
      );
      if (response.status === 200) {
        console.log('sucessful')
        fetchPost();
        // setPost(prevPost=>{
        //   const post = {...prevPost};
        //   post.comments = [...post.comments, newComment];
        //   return post;
        // })
      }
    } catch (error) {
      console.log("Error comment the post", error);
    }
  });
  return (
    <SafeAreaView>
      <View key={post?._id}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 20, marginLeft: 10 }}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 30 }}
              source={{ uri: post?.user?.profileImage || null }}
            />

            <View style={{ flexDirection: "column", gap: 2 }}>
              <Text style={{ fontSize: 15, fontWeight: "600" }}>
                {post?.user?.name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  width: 230,
                  color: "gray",
                  fontSize: 15,
                  fontWeight: "400",
                }}
              >
                Engineer Graduate | LinkedIn Member
              </Text>
              <Text style={{ color: "gray" }}>
                {moment(post?.createdAt).format("MMMM Do YYYY")}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>{post?.user?.name}</Text>
              <Text style={{ color: "gray", fontSize: 14 }}>
                {moment(post?.createdAt).format("MMMM Do, YYYY")}
              </Text>
            </View>
            <Pressable
              style={{
                marginRight: 10
              }}
            >
              <Entypo name="dots-three-vertical" size={20} color="black" />
            </Pressable>

          </View>
        </View>

        <View style={{ marginHorizontal: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 16, lineHeight: 24 }}>
            {post?.description}
          </Text>
          {showfullText ? (
            <Pressable onPress={toggleShowFullText}>
              <Text style={{ color: "blue" }}>See Less</Text>
            </Pressable>
          ) : (
            <Pressable onPress={toggleShowFullText}>
              <Text style={{ color: "blue" }}>See More</Text>
            </Pressable>
          )}
        </View>

        {/* <View style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 12 }}>
          <Text
            style={{ fontSize: 15 }}
            numberOfLines={showfullText ? undefined : MAX_LINES}
          >
            {post?.description}
          </Text>
          {!showfullText && (
            <Pressable onPress={toggleShowFullText}>
              <Text>See more</Text>
            </Pressable>
          )}
        </View> */}

        {post?.imageUrl && (
          <Image
            style={{ width: "100%", height: 240 }}
            source={{ uri: post?.imageUrl }}
          />
        )}

        {post?.likes?.length > 0 && (
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}
          >
            <SimpleLineIcons name="like" size={16} color="#0072b1" />
            <Text style={{ color: "gray" }}>{post?.likes?.length}</Text>
          </View>
        )}

        <View
          style={{
            height: 0.5,
            borderColor: "#E0E0E0",
            borderWidth: 0.5,
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
          <Pressable
            onPress={() => handleLikePost(post?._id)}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <AntDesign
              style={{ textAlign: "center" }}
              name="like2"
              size={24}
              color={isLiked ? "#0072b1" : "gray"}
            />
            <Text style={{ marginLeft: 4, fontSize: 14, color: isLiked ? "#2078F4" : "gray" }}>Like</Text>
          </Pressable>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleComment(post?._id)}>
            <FontAwesome
              name="comment-o"
              size={20}
              style={{ textAlign: "center", color: "gray" }}
            />
            <Text style={{ marginLeft: 4, fontSize: 14, color: 'gray' }}>Comment</Text>
          </Pressable>
          <Pressable style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="sharealt" size={23} color="gray" />
            <Text style={{ marginLeft: 4, fontSize: 14, color: "gray" }}>Share</Text>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            gap: 5,
            backgroundColor: "white",
            paddingVertical: 5,
            borderRadius: 25,
            marginTop: 10,
            borderWidth: 1,
            borderColor: '#D2D7D3',
            marginHorizontal: 5,
          }}
        >
          <TextInput
            value={comment}
            onChangeText={onChangeComment}
            style={{
              color: "gray",
              marginLeft: 20,
              marginVertical: 10,
              width: 310,
            }}
            placeholder="Comment"

          />
          <Pressable
            onPress={handleComment}
            style={{
              marginRight: 20
            }}
          >
            <FontAwesome name="send" size={20} color="blue" />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={post?.comments}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              padding: 10,
              alignItems: "center",
            }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: item?.user?.profileImage }}
            />
            <View
              style={{
                marginLeft: 10,
                padding: 10,
                backgroundColor: '#E0E0E0',
                borderRadius: 10,
                marginBottom: 5,

              }}>
              <Text style={{ fontWeight: "bold" }}>{item?.user?.name}</Text>
              <Text>{item?.text}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};
export default DetailPost;
