import {
  CallContent,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";
import { EXPO_PUBLIC_STREAM_API_KEY } from "@env";
import { Slot, useRouter, useSegments } from "expo-router";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomCallControls, { reactions } from "../../../components/CustomCallControl";
import CustomTopView from "../../../components/CustomTopView";
import ChatView from "../../../components/ChatView";
import CustomBottomSheet from "../../../components/CustomBottomSheet";
// import { OverlayProvider } from 'stream-chat-expo';
// const apiKey = EXPO_PUBLIC_STREAM_API_KEY;
// const userId = '660fbfedf1c4f8e6464698aa';
// const token = 'ejnr5rcxdx9757reg35qr3wtrpkvbzhedw7qe25uz79p6gwysusqmne57q2nmya4';
// const callId = 'default_7f451de5-2178-4f7a-96c9-9941437331db';
// const user = { id: userId };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call('default', callId);
// call.join({ create: true });
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function index() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const segments = useSegments();
  const router = useRouter();

  // Navigate the user to the correct page based on their authentication state
  // useEffect(() => {
  //   if (!initialized) return;

  //   // Check if the path/url is in the (inside) group
  //   const inAuthGroup = segments[0] === '(inside)';

  //   if (authState?.authenticated && !inAuthGroup) {
  //     // Redirect authenticated users to the list page
  //     router.replace('/(room)');
  //   } else if (!authState?.authenticated) {
  //     // Redirect unauthenticated users to the login page
  //     client?.disconnectUser();
  //     router.replace('/');
  //   }
  // }, []);
  console.log("CALL RE-RENDER");
  // Initialize the StreamVideoClient when the user is authenticated
  useEffect(() => {
    const fetch = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const tokenStream = await AsyncStorage.getItem("tokenStream");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      console.log(
        EXPO_PUBLIC_STREAM_API_KEY,
        "TOKEN: ",
        tokenStream,
        " USER: ",
        userId
      );
      const user = { id: userId };
      try {
        const client = new StreamVideoClient({
          apiKey: "r5cn8582jdzk",
          user,
          token: tokenStream,
        });
        const call = client.call(
          "default",
          "default_098a1214-56c8-4c33-b842-8ec1864ec932"
        );
        await call.join({ create: true });
        setCall(call);
        setClient(client);
      } catch (e) {
        console.log("Error creating client: ", e);
      }
    };
    fetch();
  }, []);

  useEffect(()=> {
    if(client) {
      const unsubscribe = client?.on('all', (event) => {
        console.log(event);
  
        if (event.type === 'call.reaction_new') {
          console.log(`New reaction: ${event.reaction}`);
        }
  
        if (event.type === 'call.session_participant_joined') {
          console.log(`New user joined the call: ${event.participant}`);
          const user = event.participant.user.name;
          Toast.show({
            text1: 'User joined',
            text2: `Say hello to ${user} 👋`,
          });
        }
  
        if (event.type === 'call.session_participant_left') {
          console.log(`Someone left the call: ${event.participant}`);
          const user = event.participant.user.name;
          Toast.show({
            text1: 'User left',
            text2: `Say goodbye to ${user} 👋`,
          });
        }
      });
  
      // Stop the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    }
  }, [client])
  // Conditionally render the correct layout
  const goToHomeScreen = async () => {
    router.back();
  };

  // Share the meeting link
  const shareMeeting = async () => {
    Share.share({
      message: `Join my meeting: myapp://(inside)/(room)/${id}`,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {!client && (
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "red",
          }}
        >
          <Text>Hello World</Text>
        </View>
      )}
      {client && (
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <View style={styles.container}>
              <CallContent
                onHangupCallHandler={goToHomeScreen}
                CallControls={CustomCallControls}
                CallTopView={CustomTopView}
                supportedReactions={reactions}
                layout="grid"
              />

              {WIDTH > HEIGHT ? (
                <View style={styles.videoContainer}>
                  <ChatView channelId={"default_098a1214-56c8-4c33-b842-8ec1864ec932"} />
                </View>
              ) : (
                <CustomBottomSheet channelId={"default_098a1214-56c8-4c33-b842-8ec1864ec932"} />
              )}
            </View>
          </StreamCall>
        </StreamVideo>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: WIDTH > HEIGHT ? "row" : "column",
  },
  videoContainer: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#fff",
  },

  topView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
