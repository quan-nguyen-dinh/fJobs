import React, { useCallback, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons,Feather } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { socket } from '../../../../App';
// import { socket } from '../../../App';

const index = () => {
    // const [isNotify, setIsNotify] = useState(false);
    // const [commentNotify, setCommentNotify] = useState();
    const onLikePost = useCallback((data)=>{
      console.log('SOME ONE LIKE YOU POST', data);
    }, [socket]);

    useEffect(()=>{
        socket.on("comment", (data)=>{
            setIsNotify(true);
            console.log('data: ', data);
            setCommentNotify(data);
        });
        socket.on('liked-post', onLikePost);

        return () => {
          socket.off('comment', ()=>{});
          socket.off('liked-post', onLikePost);
        }
    }, [])
    const navigation = useNavigation();

    const handleSearch = () => {
      navigation.navigate('SearchScreen'); //can them 1 screen de search moi giong fb duoc quan oi
    };
    return (
        <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Notification</Text>
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#031c40" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={Array(10).fill(null)}
          renderItem={({ item, index }) => (
            <View style={styles.notificationContainer}>
              <Image source={{ uri: 'https://i.pinimg.com/236x/c7/12/cb/c712cba6d251a67b9ef78f7d7c422b45.jpg' }} style={styles.avatar} />
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationText}>
                  <Text style={{fontWeight: "bold"}}>Username</Text>
                  <Text> commented on your post</Text>  
                </Text>
                <Text style={styles.notificationTime}>2 hours ago</Text>
              </View>
              <Feather name="more-horizontal" size={24} color="#031c40" />
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
          backgroundColor: '#E9EBEE',
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          backgroundColor: '#FFF',
        },
        headerText: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#031c40',
        },
        notificationContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFF',
          padding: 10,
        },
        avatar: {
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 10,
        },
        notificationInfo: {
          flex: 1,
          justifyContent: 'center',
        },
        notificationText: {
          fontSize: 16,
        },
        notificationTime: {
          fontSize: 14,
          color: '#888',
        },
      });
export default index;