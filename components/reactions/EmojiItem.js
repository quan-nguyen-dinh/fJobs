import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { View as MotiView, AnimatePresence, useAnimationState } from "moti";

export default function EmojiItem({ data, index, scaled, ...rest }) {
  const animatedState = useAnimationState({
    scaleIn: {
      scale: 1.4,
    },
    scaleOut: {
      scale: 1,
    },
  });

  useEffect(() => {
    animatedState.transitionTo(scaled ? "scaleIn" : "scaleOut");
  }, [scaled]);

  return (
    <Pressable {...rest} style={styles.root}>
      <AnimatePresence exitBeforeEnter>
        {scaled && (
          <MotiView
            style={styles.titleBox}
            from={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Text style={styles.title}>{data.title}</Text>
          </MotiView>
        )}
      </AnimatePresence>
      <MotiView
        from={{ transform: [{ translateY: 40 }, { scale: 1 }] }}
        animate={{ transform: [{ translateY: 0 }, { scale: 1 }] }}
        exit={{
          transform: [{ translateY: 40 }, { scale: ((1 / 6) * index) / 10 }],
        }}
        transition={{ delay: (index + 1) * 50 }}
      >
        <MotiView state={animatedState}>{data.emoji}</MotiView>
      </MotiView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  titleBox: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.24)",
    top: -50,
    width: 60,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  title: {
    textTransform: "capitalize",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
