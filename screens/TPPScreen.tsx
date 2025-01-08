import { Dimensions, ImageStyle, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { Screen, TarotCard, Text } from "../components";
import { spacing } from "../constants/theme";
import { useLocalSearchParams } from "expo-router";
import { cardRegistry } from "../assets/tarotCards/cardRegistry";

type CardName = keyof typeof cardRegistry;

const calculateTarotCards = (day: number, month: number, year: number) => {
  const cardMap: CardName[] = [
    "magician",
    "priestess",
    "empress",
    "emperor",
    "hierophant",
    "lovers",
    "chariot",
    "justice",
    "hermit",
    "fortune",
    "strenght",
    "hanged",
    "death",
    "temperance",
    "devil",
    "tower",
    "star",
    "moon",
    "sun",
    "judgement",
    "world",
    "fool",
  ];

  const adjustCardNumber = (num: number) => {
    while (num > 22) num -= 22;
    return num;
  };

  // 1. Card for Day
  const dayCardNumber = adjustCardNumber(day);
  const card1 = cardMap[dayCardNumber - 1];

  // 2. Card for Month
  const monthCardNumber = adjustCardNumber(month);
  const card2 = cardMap[monthCardNumber - 1];

  // 3. Card for Year
  const yearDigits = year.toString().split("").map(Number);
  const yearSum = adjustCardNumber(
    yearDigits.reduce((acc, num) => acc + num, 0)
  );
  const card3 = cardMap[yearSum - 1];

  // Life Card
  const allDigits = `${day}${month}${year}`.split("").map(Number);
  const lifeSum = adjustCardNumber(
    allDigits.reduce((acc, num) => acc + num, 0)
  );
  const lifeCard = cardMap[lifeSum - 1];

  return { card1, card2, card3, lifeCard };
};

const TPPScreen = () => {
  const { user } = useLocalSearchParams();
  const userData = user ? JSON.parse(user as string) : null;

  const [lifeCard, setLifeCard] = useState<CardName>("revers");
  const [card1, setCard1] = useState<CardName>("revers");
  const [card2, setCard2] = useState<CardName>("revers");
  const [card3, setCard3] = useState<CardName>("revers");

  useEffect(() => {
    if (userData?.details) {
      const { day, month, year } = userData.details;
      const { card1, card2, card3, lifeCard } = calculateTarotCards(
        day,
        month,
        year
      );

      setCard1(card1);
      setCard2(card2);
      setCard3(card3);
      setLifeCard(lifeCard);

      console.log(
        "Card 1:",
        card1,
        "Card 2:",
        card2,
        "Card 3:",
        card3,
        "Life Card:",
        lifeCard
      );
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
          <TarotCard cardName={lifeCard} />
        </View>
        <View style={$lifeGridContainer}>
          <View style={$lifeGridUp}>
            <TarotCard cardName="revers" imageStyle={$gridCard} />
            <TarotCard cardName="revers" imageStyle={$gridCard} />
          </View>
          <View style={$lifeGrid1}>
            <TarotCard cardName={card1} imageStyle={$gridCard} />
            <TarotCard cardName={card2} imageStyle={$gridCard} />
            <TarotCard cardName={card3} imageStyle={$gridCard} />
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
