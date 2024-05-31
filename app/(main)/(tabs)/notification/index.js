import React, { useCallback, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
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
          <FlatList
            data={Array(20).fill(null)}
            renderItem={() => (
              <View style={styles.notificationContainer}>
                <Image source={{uri: ''}} style={styles.avatar} />
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationText}>User Name commented on your post</Text>
                  <Text style={styles.notificationTime}>2h</Text>
                </View>
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
          backgroundColor: '#fff',
          padding: 10,
        },
        header: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        },
        headerText: {
          fontSize: 20,
          fontWeight: 'bold',
        },
        notificationContainer: {
          flexDirection: 'row',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        },
        avatar: {
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: 10,
        },
        notificationInfo: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        notificationText: {
          fontSize: 16,
        },
        notificationTime: {
          color: '#888',
        },
      });
export default index;