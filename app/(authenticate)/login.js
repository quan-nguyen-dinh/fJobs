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
  console.log('API_URL: ', {REACT_APP_DEV_MODE});
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
          const tokenStream = response.data.tokenStream;
          AsyncStorage.setItem("authToken",token);
          AsyncStorage.setItem("tokenStream", tokenStream);
          router.replace("/(main)/(tabs)/home");
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
          style={{ width: 130, height: 80, resizeMode: "contain", marginTop: 100 }}
          source={require('../../assets/logo.jpg')}
        />
      </View>

      <KeyboardAvoidingView>
        
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

        <View style={{ marginTop: 30 }}>
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
              placeholder={i18n?.t('plEmail')}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "white",
                paddingVertical: 5,
                borderRadius: 25,
                marginTop: 10,
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
                  marginLeft: 20,
                  marginVertical: 10,
                  width: 300,
                  fontSize: password ? 18 : 18,
                  
                }}
                placeholder={i18n?.t('plPassword')}
              />
            </View>
          </View>

          <Pressable
          onPress={handleLogin}
            style={{
              backgroundColor: "#1877F2",
              borderRadius: 50,
              padding: 15,
              marginTop: 25
              
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

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "gray", fontWeight: "600", fontSize:16, marginTop: 5 }}>
            {i18n?.t('btnFortgotPass')}
            </Text>
          </View>

          <View style={{ marginTop: 80 }} />

          

          <Pressable
            onPress={() => router.replace("/register")}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              marginTop: 25,
              height: 40,
              borderWidth: 1,
              borderColor: '#1877F2',
              
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#1877F2",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {i18n?.t('btnRegister')}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
