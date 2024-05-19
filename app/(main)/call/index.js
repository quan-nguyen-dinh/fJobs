import {
    CallContent,
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-native-sdk';
  import { useEffect, useState } from 'react';  
  import { EXPO_PUBLIC_STREAM_API_KEY } from '@env';
  const apiKey = EXPO_PUBLIC_STREAM_API_KEY;
  const userId = '660fbfedf1c4f8e6464698aa';
  const token = 'ejnr5rcxdx9757reg35qr3wtrpkvbzhedw7qe25uz79p6gwysusqmne57q2nmya4';
  const callId = 'default_7f451de5-2178-4f7a-96c9-9941437331db';
  const user = { id: userId };
  
  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call('default', callId);
  call.join({ create: true });
  
  export default function Call() {
    return (
      <StreamVideo client={client}>
        <StreamCall call={call}>
            <CallContent/>
        </StreamCall>
      </StreamVideo>
    );
  }