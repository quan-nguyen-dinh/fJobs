import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import { REACT_APP_DEV_MODE } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const i18n = useSelector(state => state.transalation.i18n);

  const handleRegister = useCallback(async () => {
    const uploadedUrl = await uploadFile();
    const user = {
      name: name,
      email: email,
      password: password,
      profileImage: uploadedUrl,
    };
    console.log("hello: ", user);

    axios
      .post(`${REACT_APP_DEV_MODE}/register`, user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setImage("");
        router.back();
      })
      .catch((error) => {
        console.log("registration failed", error);
        Alert.alert(
          "Registration failed",
          "An error occurred while registering" + error
        );
      });
  }, [name, email, password, image]);

  const pickImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("result", result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }, [image]);

  const uploadFile = useCallback(async () => {
    try {
      // Ensure that 'image' contains a valid file URI
      console.log("Image URI:", image);

      const { uri } = await FileSystem.getInfoAsync(image);

      if (!uri) {
        throw new Error("Invalid file URI");
      }

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf("/") + 1);

      const ref = firebase.storage().ref().child(filename);
      await ref.put(blob);

      const downloadURL = await ref.getDownloadURL();
      // setUrl(downloadURL);
      return downloadURL;
      // Alert.alert("Photo uploaded");
    } catch (error) {
      console.log("Error:", error);
      // Handle the error or display a user-friendly message
    }
  }, [image]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={require("../../assets/logo.jpg")}
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
              borderColor: "#D2D7D3",
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
                marginLeft: 20,
              }}
              placeholder={i18n.t('plName')}
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
              borderColor: "#D2D7D3",
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
                marginLeft: 20,
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
              borderColor: "#D2D7D3",
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
                marginLeft: 20,
              }}
              placeholder="Enter your password"
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
              borderColor: "#D2D7D3",
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
                marginLeft: 20,
              }}
              placeholder="enter your image url"
            />
          </View>

          <Pressable
            style={{
              flexDirection: "coloumn",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          >
            <Pressable
              onPress={pickImage}
              style={{
                widt: 40,
                height: 40,
                marginTop: 15,
                backgroundColor: "#E0E0E0",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="perm-media" size={24} color="black" />
            </Pressable>

            <Text>Media</Text>
          </Pressable>

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
              <Text style={{ color: "#1877F2" }}> Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
