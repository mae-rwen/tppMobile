import React from "react";
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native";
import { cardRegistry } from "../assets/tarotCards/cardRegistry";
import { Text } from "./Text";
import { spacing } from "../constants/theme";

interface TarotCardComponentProps {
  cardName: keyof typeof cardRegistry;
  imageStyle?: StyleProp<ImageStyle>;
  hideLabel?: boolean;
}

export const TarotCard: React.FC<TarotCardComponentProps> = ({
  cardName,
  imageStyle,
  hideLabel = false,
}) => {
  const cardSource = cardRegistry[cardName];

  return (
    <View style={$container}>
      <Image
        source={cardSource}
        style={imageStyle ? imageStyle : $imageStyle}
        resizeMode="contain"
      />
      {!hideLabel && <Text preset="xs" text={cardName} />}
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
