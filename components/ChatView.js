import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import {
  Channel,
  Chat,
  DefaultStreamChatGenerics,
  MessageInput,
  MessageList,
} from 'stream-chat-expo';
import { Channel as ChannelType } from 'stream-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

const ChatView = ({ channelId }) => {
  const chatClient = StreamChat.getInstance('r5cn8582jdzk');
  const [channel, setChannel] = useState(
    undefined
  );

  // Connect to the channel with the same ID as the video call
  useEffect(() => {
    const connectToChannel = async () => {
        const token = await AsyncStorage.getItem("authToken");
        const tokenStream = await AsyncStorage.getItem("tokenStream");
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;
        const user = {id: userId};
      await chatClient.connectUser(user, tokenStream);
      const channel = chatClient.channel('messaging', channelId);

      setChannel(channel);
      await channel.watch();
    };

    connectToChannel();

    // Cleanup
    return () => {
      channel?.stopWatching();
      chatClient.disconnectUser();
    };
  }, []);

  return (
    <>
      {chatClient && channel ? (
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <MessageList />
            <MessageInput />
          </Channel>
        </Chat>
      ) : (
        <View>
          <Text>Loading Chat...</Text>
        </View>
      )}
    </>
  );
};

export default ChatView;


