import { Dimensions, ImageStyle, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { Screen, TarotCard, Text } from "../components";
import { spacing } from "../constants/theme";
import { useLocalSearchParams } from "expo-router";
import { cardRegistry } from "../assets/tarotCards/cardRegistry";

type CardName = keyof typeof cardRegistry;

const calculateTarotCards = (day: string, month: string, year: string) => {
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

  // Life Card
  const allDigits = `${day}${month}${year}`.split("").map(Number);
  const lifeSum = adjustCardNumber(
    allDigits.reduce((acc, num) => acc + num, 0)
  );
  const lifeCard = cardMap[lifeSum - 1];

  const dayNumber = Number(day);
  const monthNumber = Number(month);
  const yearDigits = year.split("").map(Number);

  // Card numbers for day, month, and year
  const card1Number = adjustCardNumber(dayNumber);
  const card2Number = adjustCardNumber(monthNumber);
  const card3Number = adjustCardNumber(
    yearDigits.reduce((acc, num) => acc + num, 0)
  );

  // Card numbers for the rest of the cards
  const card4Number = adjustCardNumber(card1Number + card2Number);
  const card5Number = adjustCardNumber(card2Number + card3Number);
  const card6Number = adjustCardNumber(card5Number + card4Number);
  const card7Number = adjustCardNumber(card1Number + card5Number);
  const card8Number = adjustCardNumber(card2Number + card6Number);
  const card12Number = adjustCardNumber(card7Number + card8Number);
  const card13Number = adjustCardNumber(
    card1Number + card4Number + card6Number
  );
  const card14Number = adjustCardNumber(
    card3Number + card5Number + card6Number
  );

  // Map card numbers to names
  const card1 = cardMap[card1Number - 1];
  const card2 = cardMap[card2Number - 1];
  const card3 = cardMap[card3Number - 1];
  const card4 = cardMap[card4Number - 1];
  const card5 = cardMap[card5Number - 1];
  const card6 = cardMap[card6Number - 1];
  const card7 = cardMap[card7Number - 1];
  const card8 = cardMap[card8Number - 1];
  const card12 = cardMap[card12Number - 1];
  const card13 = cardMap[card13Number - 1];
  const card14 = cardMap[card14Number - 1];

  return {
    lifeCard,
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card12,
    card13,
    card14,
  };
};

const TPPScreen = () => {
  const { user } = useLocalSearchParams();
  const userData = user ? JSON.parse(user as string) : null;

  const [lifeCard, setLifeCard] = useState<CardName>("revers");
  const [card1, setCard1] = useState<CardName>("revers");
  const [card2, setCard2] = useState<CardName>("revers");
  const [card3, setCard3] = useState<CardName>("revers");
  const [card4, setCard4] = useState<CardName>("revers");
  const [card5, setCard5] = useState<CardName>("revers");
  const [card6, setCard6] = useState<CardName>("revers");
  const [card7, setCard7] = useState<CardName>("revers");
  const [card8, setCard8] = useState<CardName>("revers");
  const [card13, setCard13] = useState<CardName>("revers");
  const [card12, setCard12] = useState<CardName>("revers");
  const [card14, setCard14] = useState<CardName>("revers");

  useEffect(() => {
    if (userData?.details) {
      const { day, month, year } = userData.details;
      const {
        lifeCard,
        card1,
        card2,
        card3,
        card4,
        card5,
        card6,
        card7,
        card8,
        card12,
        card13,
        card14,
      } = calculateTarotCards(day, month, year);

      setLifeCard(lifeCard);
      setCard1(card1);
      setCard2(card2);
      setCard3(card3);
      setCard4(card4);
      setCard5(card5);
      setCard6(card6);
      setCard7(card7);
      setCard8(card8);
      setCard12(card12);
      setCard13(card13);
      setCard14(card14);
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
          <View style={$cardView}>
            <TarotCard cardName={lifeCard} imageStyle={$lifeCard} />
            <Text preset="xs" text="Life Card" />
          </View>
        </View>
        <View style={$gridContainer}>
          <View style={$mainGridContainer}>
            <View style={$gridRowUp}>
              <View style={$cardView}>
                <TarotCard cardName={card13} imageStyle={$gridCard} />
                <Text preset="xs" text="p13" />
              </View>
              <View style={$cardView}>
                <TarotCard cardName={card14} imageStyle={$gridCard} />
                <Text preset="xs" text="p14" />
              </View>
            </View>
            <View style={$gridRow1}>
              <View style={$cardView}>
                <TarotCard cardName={card1} imageStyle={$gridCard} />
                <Text preset="xs" text="p1" />
              </View>
              <View style={$cardView}>
                <TarotCard cardName={card2} imageStyle={$gridCard} />
                <Text preset="xs" text="p2" />
              </View>
              <View style={$cardView}>
                <TarotCard cardName={card3} imageStyle={$gridCard} />
                <Text preset="xs" text="p3" />
              </View>
            </View>
            <View style={$gridRow2}>
              <View style={$cardView}>
                <TarotCard cardName={card4} imageStyle={$gridCard} />
                <Text preset="xs" text="p4" />
              </View>
              <View style={$cardView}>
                <TarotCard cardName={card5} imageStyle={$gridCard} />
                <Text preset="xs" text="p5" />
              </View>
            </View>
            <View style={$gridRow3}>
              <View style={$cardView}>
                <TarotCard cardName={card6} imageStyle={$gridCard} />
                <Text preset="xs" text="p6" />
              </View>
            </View>
            <View style={$gridRow4}>
              <View style={$cardView}>
                <TarotCard cardName={card8} imageStyle={$gridCard} />
                <Text preset="xs" text="p8" />
              </View>
            </View>
          </View>
          <View style={$secondGridContainer}>
            <View style={$cardView}>
              <TarotCard cardName={card7} imageStyle={$gridCard} />
              <Text preset="xs" text="p7" />
            </View>
            <View style={$cardView}>
              <TarotCard cardName={card12} imageStyle={$gridCard} />
              <Text preset="xs" text="p12" />
            </View>
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
const $cardView: ViewStyle = { alignItems: "center" };

const $lifeCardContainer: ViewStyle = {
  gap: spacing.xxs,
  alignItems: "center",
  marginBottom: spacing.xl,
};
const $lifeCard: ImageStyle = { height: 200, width: 200 };

const $gridContainer: ViewStyle = { flexDirection: "row" };
const $mainGridContainer: ViewStyle = { gap: spacing.md };
const $gridCard: ImageStyle = { height: 100, width: 100 };

const $gridRowUp: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
};
const $gridRow1: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
};
const $gridRow2: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
};

const $gridRow3: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
};
const $gridRow4: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
};

const $secondGridContainer: ViewStyle = {
  paddingTop: spacing.xxxl,
  gap: spacing.md,
  justifyContent: "space-evenly",
};
