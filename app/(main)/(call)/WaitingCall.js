import {
  useCalls,
  CallingState,
  IncomingCall,
  OutgoingCall,
  RingingCallContent,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  HangUpCallButton,
  useCallStateHooks,
  useConnectedUser,
} from "@stream-io/video-react-native-sdk";
import { StyleSheet, View } from "react-native";

export const OutgoingCallControls = ({ onHangupCallHandler }) => {
  return (
    <View style={[styles.buttonGroup]}>
      <View style={[styles.deviceControlButtons]}>
        <ToggleAudioPreviewButton />
        <ToggleVideoPreviewButton />
        <HangUpCallButton onPressHandler={onHangupCallHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    alignItems: "center",
  },
  deviceControlButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export const WaitingCall = () => {
  const calls = useCalls();
  console.log("calls: ", calls);
  // calls.forEach(item=>{
  //     console.log('ITEMS: ---------------------------------: ', item);
  // })
  // handle incoming ring calls
  const connectedUser = useConnectedUser();
  const { useCallMembers } = useCallStateHooks();
  const members = useCallMembers();
  const membersToShow = (members || [])
    .filter((user) => user.user_id !== connectedUser?.id )
    .slice(0, 3)
    .map(({ user }) => user);
  console.log('MEMBERS: ', membersToShow);
  const incomingCalls = calls.filter(
    (call) =>
      call.isCreatedByMe === false &&
      call.state.callingState === CallingState.RINGING
  );

  const [incomingCall] = incomingCalls;
  if (incomingCall) {
    console.log("ICONCOMING CALL ");
    console.log("COMMING CALL 2");
    // render the incoming call UI
    return <IncomingCall call={incomingCall} />;
  }

  // handle outgoing ring calls
  const outgoingCalls = calls.filter(
    (call) =>
      call.isCreatedByMe === true &&
      call.state.callingState === CallingState.RINGING
  );

  const [outgoingCall] = outgoingCalls;
  if (outgoingCall) {
    console.log("0UT GOING CALL");
    // render the outgoing call UI
    return (
      <>
        <OutgoingCall
          call={outgoingCall}
          OutgoingCallControls={OutgoingCallControls}
        />
      </>
    );
  }

  return null;
};
