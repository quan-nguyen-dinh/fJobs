import React from "react";
import { Dimensions, Pressable } from "react-native";

const Backdrop = ({ ...rest }) => {
  return (
    <Pressable
      {...rest}
      style={{
        position: "absolute",
        // backgroundColor: "green",
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
      }}
    />
  );
};

export default Backdrop;
