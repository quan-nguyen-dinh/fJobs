import axios from "axios";
import { useLocalSearchParams, useNavigation } from "expo-router";
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
import React, { useState, useEffect, useLayoutEffect } from "react";
import moment from "moment";
import { Ionicons, Entypo, Feather, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { socket } from "../../../../App";
import { ActivityIndicator } from "react-native-web";

const MAX_LINES = 2;

const DetailPost = () => {
  console.log("-------------RE-RENDER-------------");
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState();
  const [userId, setUserId] = useState("");
  const [comment, onChangeComment] = React.useState("");
  const [showfullText, setShowfullText] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
<<<<<<< Updated upstream:app/(main)/(tabs)/post/[slug].js
  const navigation = useNavigation();
=======

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(`http://192.168.212.104:3001/posts/${slug}`);
      console.log('reqq')
      setPost(response.data);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  }, []);
>>>>>>> Stashed changes:app/(tabs)/post/[slug].js

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${REACT_APP_DEV_MODE}/posts/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.log("error fetching user profile", error);
      }
    };
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
      console.log(`http://192.168.212.104:3001/posts/like/${postId}/${userId}`)
      const response = await axios.post(
        `http://192.168.212.104:3001/posts/like/${postId}/${userId}`
      );
      if (response.status === 200) {
        const updatedPost = response.data.post;
        console.log(updatedPost, ' updatePost: ');
        if (updatedPost) {
          console.log(updatedPost.id, 'LIKE: ', updatedPost.likes?.length);
        }
        console.log('posts', posts);
        setPosts(prevPosts => {
          const newPosts = [...prevPosts];
          newPosts.forEach(post => {
            if (post._id === updatedPost._id) {
              console.log('LIKE: ', post.likes?.length, 'UPDATE POST: ', updatedPost.likes?.length);
              post.likes = updatedPost.likes;
              //post = updatePost not update likes properties of the post
              console.log(post._id, ' LIKE: ', post.likes?.length,);
            }
          });
          newPosts.forEach(post => {
            console.log('POST: ', post._id, post.likes?.length);
          })
          return newPosts;
        })
        // setIsLiked(updatedPost.likes.some((like) => like.user === userId));
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
      // const response = await axios.post(
      //   `192.168.1.15:3001/posts/comment/${slug}`,{
      //     ...newComment
      //   }
      // );
      // socket.emit('push-comment', newComment);
      socket.emit('send-message', newComment);
      const response = await axios.post(
<<<<<<< Updated upstream:app/(main)/(tabs)/post/[slug].js
        `${REACT_APP_DEV_MODE}/posts/comment/${slug}`,{
          ...newComment
        }
=======
        `http://192.168.212.104:3001/posts/comment/${slug}`, {
        ...newComment
      }
>>>>>>> Stashed changes:app/(tabs)/post/[slug].js
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

  useLayoutEffect(()=>{
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
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Bài viết của {post?.user?.name}</Text>
        </View>
      )
    })
  }, [])

  return (
<<<<<<< Updated upstream:app/(main)/(tabs)/post/[slug].js
    <SafeAreaView>
      <View key={post?._id}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginLeft:10 }}>
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
            
=======
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
    {/* <ScrollView> */}
      <View key={post?._id} style={{ backgroundColor: 'white', margin: 5, borderRadius: 10, padding: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={{ uri: post?.user?.profileImage || 'https://via.placeholder.com/50' }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{post?.user?.name}</Text>
            <Text style={{ color: "gray", fontSize: 14 }}>{moment(post?.createdAt).fromNow()}</Text>
>>>>>>> Stashed changes:app/(tabs)/post/[slug].js
          </View>
          <Pressable style={{ marginRight: 10 }}>
            <Entypo name="dots-three-horizontal" size={20} color="gray" />
          </Pressable>
        </View>

        <Text style={{ fontSize: 16, lineHeight: 24, marginTop: 10 }}>
          {post?.description}
        </Text>
        {post?.imageUrl && (
          <Image
<<<<<<< Updated upstream:app/(main)/(tabs)/post/[slug].js
            style={{ width: "100%", height: 240 }}
            source={{ uri: post?.imageUrl || null}}
=======
            style={{ width: "100%", height: 200, borderRadius: 10, marginTop: 10 }}
            source={{ uri: post?.imageUrl }}
>>>>>>> Stashed changes:app/(tabs)/post/[slug].js
          />
        )}

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <Text style={{ color: "gray" }}>{post?.likes?.length} Likes</Text>
          <Text style={{ color: "gray" }}>{post?.comments?.length} Comments</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 10 }}>
<<<<<<< Updated upstream:app/(main)/(tabs)/post/[slug].js
          <Pressable 
            onPress={() => handleLikePost(post?._id)}
            style={{flexDirection: 'row', alignItems: 'center'}}
          >
            <AntDesign
              style={{ textAlign: "center" }}
              name="like2"
              size={24}
              color={isLiked ? "#0072b1" : "gray"}
            />
            <Text style={{ marginLeft: 4, fontSize: 14, color: isLiked ? "#2078F4" : "gray" }}>Like</Text>
          </Pressable>
          <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => handleComment(post?._id)}>
            <FontAwesome
              name="comment-o"
              size={20}
              style={{ textAlign: "center", color: "gray" }}
            />
            <Text style={{ marginLeft: 4, fontSize: 14, color:'gray' }}>Comment</Text>
          </Pressable>
          <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="sharealt" size={23} color="gray" />
            <Text style={{ marginLeft: 4, fontSize: 14, color: "gray" }}>Share</Text>
          </Pressable>
        </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems:'center',              
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
                source={{ uri: item?.user?.profileImage || null}}
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
          ListFooterComponent={() => (
            <View
              style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE",
              }}
            >
            </View>
          )}
        />
    </SafeAreaView>
=======
          <Pressable onPress={() => handleLikePost(item?._id)} style={{ alignItems: 'center' }}>
            <AntDesign name="like2" size={24} color={isLiked ? "#2078F4" : "#616771"} />
            <Text style={{ fontSize: 14, color: isLiked ? "#2078F4" : "#616771" }}>Like</Text>
          </Pressable>
          <Pressable onPress={() => handleComment(post?._id)} style={{ alignItems: 'center' }}>
            <FontAwesome name="comment-o" size={20} color="#616771" />
            <Text style={{ fontSize: 14, color: '#616771' }}>Comment</Text>
          </Pressable>
          <Pressable style={{ alignItems: 'center' }}>
            <AntDesign name="sharealt" size={23} color="#616771" />
            <Text style={{ fontSize: 14, color: "#616771" }}>Share</Text>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderColor: '#E0E0E0', paddingVertical: 10 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20, marginLeft: 5 }}
            source={{ uri: 'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg' }}
          />
          <TextInput
            value={comment}
            onChangeText={onChangeComment}
            placeholder="Write a comment..."
            style={{ flex: 1, marginLeft: 10, marginRight: 10, padding: 10, backgroundColor: '#f0f2f5', borderRadius: 20 }}
          />
          <Pressable onPress={handleComment}>
            <FontAwesome name="send" size={20} color="#2078F4" />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={post?.comments}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", padding: 10, alignItems: "center", backgroundColor: 'white', margin: 5, borderRadius: 10 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{ uri: item?.user?.profileImage || 'https://via.placeholder.com/40' }}
            />
            <View style={{ marginLeft: 10, padding: 10, backgroundColor: '#f0f2f5', borderRadius: 15, flex: 1 }}>
              <Text style={{ fontWeight: "bold" }}>{item?.user?.name}</Text>
              <Text>{item?.text}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
      />
    {/* </ScrollView> */}
  </SafeAreaView>
>>>>>>> Stashed changes:app/(tabs)/post/[slug].js
  );
};
export default DetailPost;
