import React from "react";
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import { cardRegistry } from "../assets/tarotCards/cardRegistry";

interface TarotCardComponentProps {
  cardName: keyof typeof cardRegistry;
  viewStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

export const TarotCard: React.FC<TarotCardComponentProps> = ({
  cardName,
  viewStyle,
  imageStyle,
}) => {
  const cardSource = cardRegistry[cardName];

  return (
    <View style={viewStyle}>
      <Image
        source={cardSource}
        style={[$imageStyle, imageStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const $imageStyle: ImageStyle = {
  width: 200,
  // height: 300,
};
