import { Dimensions, ImageStyle, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { Screen, TarotCard, Text } from "../components";
import { spacing } from "../constants/theme";
import { useLocalSearchParams } from "expo-router";

const TPPScreen = () => {
  const { user } = useLocalSearchParams();
  const userData = user ? JSON.parse(user as string) : null;

  const [lifeCard, setLifeCard] = useState<number | null>(null);

  useEffect(() => {
    if (userData?.details?.birthdate) {
      const birthdate = userData.details.birthdate; // Format: DD.MM.YYYY
      console.log("Birthdate:", birthdate);

      // Split the birthdate into digits
      const digits = birthdate.replace(/\D/g, "").split("").map(Number);
      console.log("Digits from birthdate:", digits);

      // Sum the digits
      let sum = digits.reduce((acc, num) => acc + num, 0);
      console.log("Sum of digits:", sum);

      // Reduce sum to 22 or below
      while (sum > 22) {
        sum -= 22;
        console.log("After subtracting 22:", sum);
      }

      console.log("Final result:", sum);
      setLifeCard(sum); // Store the result in state
    }
  }, [userData]);

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$root}
    >
      <View style={$container}>
        <View style={$lifeCardContainer}>
          <Text preset="h2" text={userData?.name} />
          <Text preset="h2regular" text={userData?.details.birthdate} />
          <TarotCard cardName="revers" />
        </View>
        <View style={$lifeGridContainer}>
          <View style={$lifeGridUp}>
            <TarotCard cardName="revers" imageStyle={$gridCard} />
            <TarotCard cardName="revers" imageStyle={$gridCard} />
          </View>
          <View style={$lifeGrid1}>
            <TarotCard cardName="revers" imageStyle={$gridCard} />
            <TarotCard cardName="revers" imageStyle={$gridCard} />
            <TarotCard cardName="revers" imageStyle={$gridCard} />
          </View>
          <View style={$lifeGrid2}>
            <TarotCard cardName="revers" imageStyle={$gridCard} />
            <TarotCard cardName="revers" imageStyle={$gridCard} />
          </View>
          <View style={$lifeGrid3}>
            <TarotCard cardName="revers" imageStyle={$gridCard} />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default TPPScreen;

const width = Dimensions.get("window").width;

const $root: ViewStyle = {
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.md,
};

const $container: ViewStyle = { gap: spacing.sm };
const $lifeCardContainer: ViewStyle = {
  gap: spacing.xxs,
  alignItems: "center",
  marginBottom: spacing.xxl,
};

const $lifeGridContainer: ViewStyle = { gap: spacing.md };
const $gridCard: ImageStyle = { height: 100, width: 100 };

const $lifeGridUp: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
};
const $lifeGrid1: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
};
const $lifeGrid2: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
};
const $lifeGrid3: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
};
