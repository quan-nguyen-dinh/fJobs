import { Pressable, Text } from "react-native";
import { items } from "./reactions";
import CustomButton from "./reactions/CustomButton";

export default MostReaction = ({ item }) => {
    if (!item?.likes.length) {
      return <></>;
    }
    const reaction = item?.likes?.reduce(
      (reaction, current) => {
        const { reactionType } = current;
        return {
          ...reaction,
          [reactionType]: reaction[reactionType] + 1,
        };
      },
      {
        like: 0,
        haha: 0,
        love: 0,
        care: 0,
        wow: 0,
        sad: 0,
        angry: 0,
      }
    );
    const sortedData = Array.from(Object.entries(reaction)).sort(
      (a, b) => b[1] - a[1]
    );
    const goodRange = sortedData.slice(0, 3).filter(item=>item[1] > 0);
   let mustRenderReaction = [];
   let countRection = 0;
   goodRange?.forEach(_mustChoice=>{
    items?.forEach((_item) => {
      if(_item.title === _mustChoice[0]) {
        mustRenderReaction = [...mustRenderReaction, _item];
      }
    })
   })

    return (
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
        }}
      >
       {
        mustRenderReaction.map((item)=>  (<CustomButton
          color={item.color}
          emoji={item?.emoji}
        />))
       }<Text style={{ color: "black" }}>{item?.likes?.length}</Text>
      </Pressable>
    );
  };