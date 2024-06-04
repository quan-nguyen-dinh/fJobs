import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomButton = ({ emoji, text, color, ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={styles.root} activeOpacity={0.7}>
      <View style={styles.container}>
        {emoji}
        <View style={{ paddingHorizontal: 2 }} />
        <Text style={[styles.text, { color: color }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
const styles = StyleSheet.create({
  root: {
    // backgroundColor: "rgba(0, 0, 0, 0.14)",
    // padding: 8,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    textTransform: "capitalize",
    fontSize: 12,
  },
});
