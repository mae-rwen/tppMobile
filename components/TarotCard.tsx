import React from "react";
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import { cardRegistry } from "../assets/tarotCards/cardRegistry";

interface TarotCardComponentProps {
  cardName: keyof typeof cardRegistry;

  imageStyle?: StyleProp<ImageStyle>;
}

export const TarotCard: React.FC<TarotCardComponentProps> = ({
  cardName,

  imageStyle,
}) => {
  const cardSource = cardRegistry[cardName];

  return (
    <Image
      source={cardSource}
      style={imageStyle ? imageStyle : $imageStyle}
      resizeMode="contain"
    />
  );
};

const $imageStyle: ImageStyle = {
  width: 200,
  height: 300,
};
