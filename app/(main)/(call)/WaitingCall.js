import { useCalls, CallingState , IncomingCall, OutgoingCall } from '@stream-io/video-react-native-sdk';

export const WaitingCall = () => {
  const calls = useCalls();
    console.log('calls: ', calls);
    // calls.forEach(item=>{
    //     console.log('ITEMS: ---------------------------------: ', item);
    // })
  // handle incoming ring calls
  const incomingCalls = calls.filter(
    (call) =>
      call.isCreatedByMe === false &&
      call.state.callingState === CallingState.RINGING,
  );

  const [incomingCall] = incomingCalls;
  if (incomingCall) {
    console.log('ICONCOMING CALL ');
    console.log('COMMING CALL 2')
    // render the incoming call UI
    return <IncomingCall call={incomingCall} />;
  }

  // handle outgoing ring calls
  const outgoingCalls = calls.filter(
    (call) =>
      call.isCreatedByMe === true &&
      call.state.callingState === CallingState.RINGING,
  );

  const [outgoingCall] = outgoingCalls;
  if (outgoingCall) {
    console.log('0UT GOING CALL')
    // render the outgoing call UI
    return (
        <>
        <OutgoingCall call={outgoingCall} />
        <RingingCallContent/>
        </>
    );
  }

  return null;
};