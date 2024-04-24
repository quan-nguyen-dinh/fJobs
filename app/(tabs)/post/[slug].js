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
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Ionicons, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const DetailPost = () => {
  console.log("-------------RE-RENDER-------------");
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState();
  const [userId, setUserId] = useState("");
  const fetchPost = async () => {
    try {
      const response = await axios.get(`${REACT_APP_DEV_MODE}/posts/${slug}`);
      console.log('reqq')
      setPost(response.data);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [slug]);
  const [comment, onChangeComment] = React.useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
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
  const handleComment = async () => {
    try {
      const newComment = {
        content: comment,
        userId: userId,
      }
      console.log(newComment, 'date: ', Date.now);
      const response = await axios.post(
        `${REACT_APP_DEV_MODE}/posts/comment/${slug}`,{
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
  };
  return (
    <SafeAreaView>
      <View key={post?._id}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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

          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Entypo name="dots-three-vertical" size={20} color="black" />
            <Feather name="x" size={20} color="black" />
          </View>
        </View>

        <View style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 12 }}>
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
        </View>

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
            height: 2,
            borderColor: "#E0E0E0",
            borderWidth: 2,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginVertical: 10,
          }}
        >
          <Pressable onPress={() => handleLikePost(post?._id)}>
            <AntDesign
              style={{ textAlign: "center" }}
              name="like2"
              size={24}
              color={isLiked ? "#0072b1" : "gray"}
            />
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
          <Pressable onPress={() => handleComment(post?._id)}>
            <FontAwesome
              name="comment-o"
              size={20}
              color="gray"
              style={{ textAlign: "center" }}
            />
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
          <Pressable>
            <Ionicons
              name="md-share-outline"
              size={20}
              color="gray"
              style={{ textAlign: "center" }}
            />
            <Text
              style={{
                marginTop: 2,
                fontSize: 12,
                textAlign: "center",
                color: "gray",
              }}
            >
              repost
            </Text>
          </Pressable>
          <Pressable>
            <Feather name="send" size={20} color="gray" />
            <Text style={{ marginTop: 2, fontSize: 12, color: "gray" }}>
              Send
            </Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeComment}
          value={comment}
        />
        <Button
          onPress={handleComment}
          title="Send"
          color="#841584"
        />
          <FlatList
            data={post?.comments}
            renderItem={( {item} , index) => (
              <View
                key={item?._id}
                style={{ backgroundColor: "#fff", borderColor: "1px yellow" }}
              >
                {console.log(item?.user)}
                {/* {item?.user?.profileImage && ( */}
                  <Image
                    style={{ width: "100%", height: 100 }}
                    source={{ uri: item?.user?.profileImage }}
                  />
                {/* )} */}
                <Text style={{ color: "#333" }}>{item?.user?.name}</Text>
                <Text style={{ color: "brown" }}>{item?.text}</Text>
                <Text style={{ color: "red" }}>
                  {moment(item?.createdAt).format("HH:mm DD/MM/YYYY")}
                </Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default DetailPost;
