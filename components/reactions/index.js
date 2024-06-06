import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { View as MotiView, AnimatePresence } from "moti";
import CustomButton from "./CustomButton";
import EmojiLike from "../svg-emoji/EmojiLike";
import EmojiLove from "../svg-emoji/EmojiLove";
import EmojiCare from "../svg-emoji/EmojiCare";
import EmojiAngry from "../svg-emoji/EmojiAngry";
import EmojiHaha from "../svg-emoji/EmojiHaha";
import EmojiWow from "../svg-emoji/EmojiWow";
import EmojiSad from "../svg-emoji/EmojiSad";
import Backdrop from "./Backdrop";
import EmojiItem from "./EmojiItem";
import Hint from "./Hint";
import { PanGestureHandler } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Text } from "react-native";

export const items = [
  { emoji: <EmojiLike />, title: "like", color: "rgb(32, 120, 244)" },
  { emoji: <EmojiLove />, title: "love", color: "rgb(243, 62, 88)" },
  { emoji: <EmojiCare />, title: "care", color: "rgb(247, 177, 37)" },
  { emoji: <EmojiHaha />, title: "haha", color: "rgb(247, 177, 37)" },
  { emoji: <EmojiWow />, title: "wow", color: "rgb(247, 177, 37)" },
  { emoji: <EmojiSad />, title: "sad", color: "rgb(247, 177, 37)" },
  { emoji: <EmojiAngry />, title: "angry", color: "rgb(233, 113, 15)" },
];

const ReactionBox = ({ reactionType, pressLike }) => {
  const [current, setCurrent] = useState(null);
  const [show, setShow] = useState(false);
  const [showHint, setShowHint] = useState(false);
  console.log("reactionType: ", reactionType);

  useEffect(() => {
    console.log("reactionTpe: ", reactionType);
    if (reactionType) {
      const index = items.findIndex((item) => item.title === reactionType);
      console.log("ITEM: ", index);
      setCurrent(index);
    }
  }, [reactionType]);

  const onGesture = (event) => {
    // when gesture gone outside the container
    if (
      event.nativeEvent.absoluteY >= 310 &&
      event.nativeEvent.absoluteY <= 490 &&
      event.nativeEvent.absoluteX >= 16 &&
      event.nativeEvent.absoluteX <= 367
    ) {
      setShowHint(false);
      // when move finger beside any of emoji should select
      const currentItem = Math.floor(event.nativeEvent.x / 50);
      if (currentItem >= 0 && currentItem < items.length) {
        setCurrent(currentItem);
      } else {
        setCurrent(null);
      }
    } else {
      setCurrent(null);
      setShowHint(true);
    }
  };

  const gestureEnded = () => {
    // When gesture ended
    setShow(false);
    setShowHint(false);
  };

  const btnPressHandler = () => {
    setCurrent(null);
    setShow(true);
    setShowHint(false);
  };

  const onClose = () => {
    setShow(false);
    setShowHint(false);
    setCurrent(null);
  };

  const emojiPressHandler = (index) => {
    setShow(false);
    setShowHint(false);
    setCurrent(index);
    console.log("emojiPressHanel: ", index);
    handleLike(index);
  };

  const handleLike = (index) => {
    pressLike(items[index]?.title);
  };

  if (current) {
    console.log("current: ", current);
  }

  return (
    <View style={styles.root}>
      <AnimatePresence>
        {show && (
          <PanGestureHandler onGestureEvent={onGesture} onEnded={gestureEnded}>
            <MotiView
              style={styles.container}
              from={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <MotiView
                style={styles.floatBox}
                from={{ translateY: 40, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: 40, opacity: 0 }}
                transition={{ duration: 800 }}
              >
                <View style={styles.emojiBox}>
                  {items.map((item, index) => (
                    <EmojiItem
                      onPress={() => emojiPressHandler(index)}
                      key={item.title}
                      data={item}
                      index={index}
                      scaled={current === index}
                    />
                  ))}
                </View>
              </MotiView>
            </MotiView>
          </PanGestureHandler>
        )}
      </AnimatePresence>
      {/* {show && <Hint hint={showHint} />} */}
      {show && <Backdrop onPress={onClose} />}
      {current ? (
        <CustomButton
          onPress={(index) => handleLike(index)}
          onLongPress={btnPressHandler}
          color={current === null ? "#000" : items[current]?.color}
          emoji={items[current === null ? 0 : current]?.emoji}
          text={items[current === null ? 0 : current]?.title}
        />
      ) : (
        <Pressable
          style={styles.wrapperLikeIcon}
          onPress={(index) => handleLike(index)}
          onLongPress={btnPressHandler}
        >
          <AntDesign
            name="like2"
            size={24}
            color='gray'
          />
          <Text
            style={styles.likeIcon}
          >
            Like
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ReactionBox;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    // borderBottomWidth: 1,
    // borderTopWidth: 1,
    zIndex: 99999,
  },
  container: {
    position: "absolute",
    bottom: 20,
    left: -10,
    height: 60,
    backgroundColor: "red",
    justifyContent: "center",
    zIndex: 10,
  },
  floatBox: {
    alignItems: "center",
  },
  emojiBox: {
    flexDirection: "row",
    borderRadius: 33,
    backgroundColor: "yellow",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 1,
  },
  wrapperLikeIcon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  likeIcon: {
    paddingLeft: 2,
    textAlign: "center",
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  }
});
