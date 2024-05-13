import { router } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";
import React, {useState} from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Image, Pressable } from 'react-native';

function index() {
  const [user, setUser] = useState();
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
        data={Array(10).fill(null)}
        renderItem={() => (
          <View >
            <Pressable style={styles.conversationContainer} onPress={() => handleMessage()}>
              <Image source={{uri: user?.profileImage || null}} style={styles.avatar} />
              <View style={styles.conversationInfo}>
                <Text style={styles.conversationName}>User Name</Text>
                <Text style={styles.conversationMessage}>This is a message</Text>
              </View>
            </Pressable>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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