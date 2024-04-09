import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios"
import {REACT_APP_DEV_MODE} from '@env';
import { SafeAreaView } from "react-native-safe-area-context";

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const handleRegister = () => {
    const user = {
      name:name,
      email:email,
      password:password,
      profileImage:image
    }
    console.log("hello: ", user);

      axios.post(`${REACT_APP_DEV_MODE}/register`,user).then((response) => {
          console.log(response);
          Alert.alert("Registration successful","You have been registered successfully");
          setName("");
          setEmail("");
          setPassword("");
          setImage("");
      }).catch((error) => {
        console.log("registration failed",error)
          Alert.alert("Registration failed","An error occurred while registering"+error);
      });
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={require('../../assets/logo.jpg')}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Register to your Account
          </Text>
        </View>

        <View style={{ marginTop: 50 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "white",
              paddingVertical: 5,
              borderRadius: 25,
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#D2D7D3'
            }}
          >
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: name ? 18 : 18,
                marginLeft: 20
              }}
              placeholder="enter your name"
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "white",
              paddingVertical: 5,
              borderRadius: 25,
              marginTop: 30,
              borderWidth: 1,
              borderColor: '#D2D7D3'
            }}
          >
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
                marginLeft: 20
              }}
              placeholder="enter your Email"
            />
          </View>


            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "white",
                paddingVertical: 5,
                borderRadius: 25,
                marginTop: 30,
                borderWidth: 1,
                borderColor: '#D2D7D3'
              }}
            >
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 18 : 18,
                  marginLeft: 20
                }}
                placeholder="enter your Password"
              />
            </View>

          <View
           style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "white",
            paddingVertical: 5,
            borderRadius: 25,
            marginTop: 30,
            borderWidth: 1,
            borderColor: '#D2D7D3'
          }}
          >
            <TextInput
              value={image}
              onChangeText={(text) => setImage(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: image ? 18 : 18,
                marginLeft: 20
              }}
              placeholder="enter your image url"
            />
          </View>



          <Pressable
         onPress={handleRegister}
          style={{
            backgroundColor: "#1877F2",
            borderRadius: 50,
            padding: 15,
            marginTop: 35,
            
          }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/login")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Already have an account? 
              <Text style={{color:'#1877F2'}}> Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
