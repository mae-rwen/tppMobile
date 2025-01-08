import React from "react";
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import { cardRegistry } from "../assets/tarotCards/cardRegistry";
import { spacing } from "../constants/theme";

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
    <View style={$container}>
      <Image
        source={cardSource}
        style={imageStyle ? imageStyle : $imageStyle}
        resizeMode="contain"
      />
    </View>
  );
};

const $container: ViewStyle = {
  alignItems: "center",
  gap: spacing.xxs,
};
const $imageStyle: ImageStyle = {
  width: 200,
  height: 300,
};
