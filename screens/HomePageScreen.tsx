import { ImageStyle, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import { Text, Screen, TarotCard, Button } from "../components";
import { spacing } from "../constants/theme";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

const HomePageScreen = () => {
  const [date, setDate] = useState<Date | null>(null); // State to store the selected date
  const [show, setShow] = useState(false); // State to toggle the date picker visibility

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false); // Close the date picker
    if (selectedDate) {
      setDate(selectedDate); // Update the selected date
      console.log("Selected date:", selectedDate); // Log the chosen date
    }
  };

  const showDatepicker = () => {
    setShow(true); // Open the date picker
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={$root}
      style={$rootContainer}
    >
      <View style={$container}>
        <Text preset="h1" tx="common.header" />
        <View style={$contentContainer}>
          <TarotCard
            cardName="revers"
            viewStyle={$cardContainer}
            imageStyle={$welcomeCard}
          />
        </View>
        <View style={$buttonContainer}>
          <Button
            preset="default"
            tx="common.setTheBirthdate"
            onPress={showDatepicker} // Show date picker on button press
          />
        </View>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()} // Default to today's date if no date is selected
          mode="date" // Set mode to "date" only
          is24Hour={true} // 24-hour format
          onChange={onChange} // Handle date selection
        />
      )}
    </Screen>
  );
};

export default HomePageScreen;

const $root: ViewStyle = {
  flex: 1,
  paddingTop: spacing.lg,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.md,
};
const $rootContainer: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
};
const $container: ViewStyle = {
  flexGrow: 1,
  alignItems: "center",
  gap: spacing.sm,
};

const $contentContainer: ViewStyle = {
  flex: 1,
};
const $cardContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
};
const $welcomeCard: ImageStyle = {
  width: 300,
};
const $buttonContainer: ViewStyle = {};
