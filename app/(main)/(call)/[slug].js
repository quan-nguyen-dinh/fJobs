import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Entypo, FontAwesome,Feather, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

function Room() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.leftHeader}>
                <TouchableOpacity style={styles.backButton}>
                    <FontAwesome name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.callerName}>Ho Sy Thao</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome name="user-plus" size={24} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialIcons name="more-vert" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.callerInfo}>
                <Image
                source={require('../../../assets/logo.jpg')}
                style={styles.avatar}
                /> 
            </View>
            <Text style={styles.callerName}>Ho Sy Thao</Text>
            <Text style={styles.callStatus}>Calling...</Text>
    
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button}>
                    <Feather name="video" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name="microphone" size={24} color="#fff" />            
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <MaterialCommunityIcons name="movie-open-play" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome name="volume-down" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.endCallButton]}>
                    <MaterialIcons name="call-end" size={24} color="#fff" />
                </TouchableOpacity>
                
            </View>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'gray',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        position: 'absolute',
        top:0 
    },
    leftHeader:{
      flexDirection:'row'
    },
    backButton: {
      marginRight: 10,
    },
    callerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    },
    headerIcons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 10,
    },
    callerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginRight: 10,
    },
    callerName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff'
    },
    callStatus: {
      fontSize: 16,
      marginBottom: 20,
      color: '#fff'
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '85%',
      height: 60,
      backgroundColor: '#696969',
      borderRadius: 50,
      position: 'absolute',
      bottom: 20,
    },
    button: {
      
      borderRadius: 50,
      marginBottom: 10,
      marginTop: 10,
    },
    endCallButton: {
      backgroundColor: 'red',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });
export default Room;