import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useEffect, useTransition, useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import {
  Ionicons,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  Octicons,
} from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";
import { useRouter } from "expo-router";
import { REACT_APP_DEV_MODE } from "@env";
import { I18n } from "i18n-js";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { socket } from "../../../../App";
import { SearchBar } from "react-native-screens";
import transalations from "../../../../transalations";
import { LIKE_POST } from "../../../../constants/event";
import ReactionBox from "../../../../components/reactions";

const i18n = new I18n(transalations);
// i18n.enableFallback = true;
// i18n.locale = 'en';

const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const [reactionType, setReactionType] = useState("like");
  const a = useTransition();
  useEffect(() => {
    socket.emit("HOME", 'WE"RE AT HOME');
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
        const response = await axios.get(`${REACT_APP_DEV_MODE}/posts/all`);
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
  const handleLikePost = async (postId, _reactionType = "like") => {
    try {
      console.log(`${REACT_APP_DEV_MODE}/posts/like/${postId}/${userId}`);
      const response = await axios.post(
        `${REACT_APP_DEV_MODE}/posts/like/${postId}/${userId}`,
        {
          reactionType: _reactionType,
        }
      );
      socket.emit(LIKE_POST, {
        postId,
        userId,
      });
      if (response.status === 200) {
        const updatedPost = response.data.post;
        console.log(updatedPost, " updatePost: ");
        if (updatedPost) {
          console.log(updatedPost.id, "LIKE: ", updatedPost.likes?.length);
        }
        console.log("posts", posts);
        setPosts((prevPosts) => {
          const newPosts = [...prevPosts];
          newPosts.forEach((post) => {
            if (post._id === updatedPost._id) {
              console.log(
                "LIKE: ",
                post.likes?.length,
                "UPDATE POST: ",
                updatedPost.likes?.length
              );
              post.likes = updatedPost.likes;
              //post = updatePost not update likes properties of the post
              console.log(post._id, " LIKE: ", post.likes?.length);
            }
          });
          newPosts.forEach((post) => {
            console.log("POST: ", post._id, post.likes?.length);
          });
          return newPosts;
        });
        // setIsLiked(updatedPost.likes.some((like) => like.user === userId));
      }
    } catch (error) {
      console.log("Error liking/unliking the post", error);
    }
  };
  const router = useRouter();
  const handleComment = async (postId) => {
    console.log("postId: ", postId);
    router.push(`/post/${postId}`);
  };
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const RenderMostReaction = ({ item }) => {
    if (!item?.likes.length) {
      return <></>;
    }
    console.log("item 1: ", item.likes);
    const reaction = item?.likes?.reduce(
      (reaction, current) => {
        const { reactionType } = current;
        console.log("[current?.reactionType]: ", reactionType);
        return {
          ...reaction,
          [reactionType]: reaction[reactionType] + 1,
        };
      },
      {
        like: 0,
        haha: 0,
        love: 0,
        care: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      }
    );
    const sortedData = Array.from(Object.entries(reaction)).sort(
      (a, b) => b[1] - a[1]
    );

    // Bước 3: Chuyển đổi mảng đã sắp xếp trở lại thành một object
    const sortedReaction = Object.fromEntries(sortedData);
    // const threeMostReaction = sor
    console.log(sortedReaction);

    // const sortedReaction = reaction?.sort();
    console.log("reaction: ", reaction);
    // console.log('aftersort: ', objectSorter(reaction))

    return (
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
    );
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const postId = useRef();
  const handleOpenModal = useCallback((_postId) => {
    console.log('postId: ', _postId);
    postId.current = _postId;
    setIsModalVisible(true);
  }, [isModalVisible]);
  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, [isModalVisible]);
  const handleIgnorePost = useCallback(async ()=>{
    const token = await AsyncStorage.getItem("authToken");
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    console.log(userId, '-------------------------------------------POST ID: ', postId.current);
    try {
      console.log(`${REACT_APP_DEV_MODE}/posts/ignore/${postId.current}/${userId}`);
      const response = await axios.post(`${REACT_APP_DEV_MODE}/posts/ignore/${postId.current}/${userId}`);
      if (response.status === 200) {
        const updatedPost = response.data.post;
        console.log(updatedPost, " updatePost: ");
        if (updatedPost) {
          console.log(updatedPost.id, "LIKE: ", updatedPost.ignorances?.length);
        }
        console.log("posts", posts);
        setPosts((prevPosts) => {
          const newPosts = [...prevPosts];
          console.log('NEWPOST --------------------: ',newPosts.length);
          const filterPost = newPosts.filter(post=>
          {
            if(post.ignorances.length === 0) return post;
            else {
              if(!post.ignorances.includes(userId)) {
                return post;
              }
              return false;
            }
          }
          );
          console.log('newPostLen: ', filterPost.length);
          return filterPost;
        })
      }
    }catch(err) {
      console.log('ERR: ', err);
    };
  }, [])
  return (
    <SafeAreaView style={[{ backgroundColor: "white" }]}>
      <View
        style={[{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          borderBottomWidth: 0.5,
          borderBottomColor: "gray",
        }, isModalVisible && { backgroundColor: 'rgba(0,0,0,0.7)'}]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => router.push("/home/profile")}>
            <Image
              style={{ width: 35, height: 35, borderRadius: 15 }}
              source={{ uri: user?.profileImage }}
            />
          </Pressable>
          <Text
            style={{
              paddingLeft: 5,
              fontSize: 18,
              fontWeight: 800,
              color: "#1877F2",
            }}
          >
            QQ Talk
          </Text>
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
            borderColor: "gray",
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
        renderItem={({ item }) => (
          <View key={item._id} style={{ backgroundColor: "white" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  paddingTop: 3,
                }}
              >
                <Image
                  style={{ width: 50, height: 50, borderRadius: 30 }}
                  source={{ uri: item?.user?.profileImage }}
                />

                <View style={{ flexDirection: "column", gap: 2 }}>
                  <Text style={{ fontSize: 15, fontWeight: "600" }}>
                    {item?.user?.name}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    <Text style={{ color: "gray", fontSize: 14 }}>
                      {moment(item.createdAt).format("MMMM Do YYYY")}
                    </Text>
                  </View>
                </View>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Pressable onPress={()=>handleOpenModal(item._id)}>
                  <Feather name="more-horizontal" size={24} color="black" />
                  <Ionicons name="close" size={24} color="black" />
                </Pressable>
              </View>
            </View>

            <View
              style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 12 }}
            >
              <Text
                style={{ fontSize: 15 }}
                numberOfLines={showfullText ? undefined : MAX_LINES}
              >
                {item?.description}
              </Text>
              {!showfullText && (
                <Pressable onPress={toggleShowFullText}>
                  <Text style={{ color: "#1877F2" }}>See more</Text>
                </Pressable>
              )}
            </View>

            {item?.imageUrl && (
              <Image
                style={{ width: "100%", height: 240 }}
                source={{ uri: item?.imageUrl }}
              />
            )}
            <RenderMostReaction item={item} />
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

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginVertical: 10,
                paddingTop: 10,
                borderTopWidth: 0.2,
                borderTopColor: "gray",
              }}
            >
              <ReactionBox
                reactionType={
                  item?.likes?.find((item) => item?.user === userId)
                    ?.reactionType
                }
                pressLike={(_reactionType) =>
                  handleLikePost(item?._id, _reactionType)
                }
              />
              <Pressable
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => handleComment(item?._id)}
              >
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
              <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
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
              <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="sharealt" size={23} color="gray" />
                <Text> </Text>
                <Text style={{ marginTop: 2, fontSize: 12, color: "gray" }}>
                  Share
                </Text>
              </Pressable>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 2,
              borderColor: "#D2D7D3",
              borderWidth: 2,
            }}
          />
        )}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={() => (
          <SearchBar placeholder="Type Here..." lightTheme round />
        )}
        ListFooterComponent={() => (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE",
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        )}
      />
      <Modal
        style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        animationType="slide"
        backdropColor={'green'}
        backdropOpacity= {1}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
        overlayColor={'black'}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Do you want hide that post?</Text>
            <View style={styles.wrapperBtn}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleCloseModal}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonOk]}
                onPress={handleIgnorePost}
              >
                <Text style={styles.titleSubmit}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: 150,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  wrapperBtn: {
    flexDirection: "row",
    gap: 10,
  },
  buttonClose: {
    backgroundColor: "#fff",
    color: "#333",
  },
  buttonOk: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#333",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleSubmit: {
    color: '#fff'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
