import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Switch,
} from "react-native";
import React, { useState,useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {REACT_APP_DEV_MODE} from '@env'
import { getLocales } from 'expo-localization';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import transalations from "../../transalations";
import { useSelector, useDispatch } from 'react-redux';
import { selectCount } from "../../store/couterSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { changeLocale } from "../../store/i18n";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  console.log('API_URL: ', REACT_APP_DEV_MODE);
  const deviceLanguage = getLocales()[0].languageCode;
  console.log('deivceLnage: ', deviceLanguage);
  useEffect(() => {
    const checkLoginStatus = async () => {
        try{
            const token = await AsyncStorage.getItem("authToken");
            if(token){
                router.replace("/(tabs)/home")
            }
        } catch(error){
            console.log(error);
        }
    }

    checkLoginStatus();
  },[])
  const handleLogin = () => {

      const user = {
          email: email,
          password: password
      }
      console.log('user: ', user);
      axios.post(`${REACT_APP_DEV_MODE}/login`, user).then((response) => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem("authToken",token);
          router.replace("/(tabs)/home")
      }).catch(error=>{
          console.log('login error: ', error);
      })
  }
  const i18n = useSelector(state => state.transalation.i18n);
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    const selectedLanguage = isEnabled ? 'en' : 'vn';
    console.log('selectedLanauge: ', selectedLanguage);
    dispatch(changeLocale(selectedLanguage));
  };
  // const count = useSelector((state) => state.counter.value)

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041E42",
            }}
          >
            Log in to your Account
          </Text>
        </View>
        <View style={styles.container}>
          {/* {{count}} */}
      <Text style={styles.text}>
        {i18n?.t('welcome')} {i18n?.t('name')}
      </Text>
      <Text>Current locale: {i18n?.locale}</Text>
      <Text>Device locale: {Localization.getLocales()[0].languageCode}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>

        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#E0E0E0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="email"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: email ? 18 : 18,
              }}
              placeholder={i18n?.t('plEmail')}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "#E0E0E0",
                paddingVertical: 5,
                borderRadius: 5,
                marginTop: 30,
              }}
            >
              <AntDesign
                style={{ marginLeft: 8 }}
                name="lock1"
                size={24}
                color="gray"
              />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{
                  color: "gray",
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 18 : 18,
                }}
                placeholder={i18n?.t('plPassword')}
              />
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Keep me logged in</Text>

            <Text style={{ color: "#007FFF", fontWeight: "500" }}>
            {i18n?.t('btnFortgotPass')}
            </Text>
          </View>

          <View style={{ marginTop: 80 }} />

          <Pressable
          onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#0072b1",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
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
              {i18n?.t('btnLogin')}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/register")}
            style={{ marginTop: 15 }}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
