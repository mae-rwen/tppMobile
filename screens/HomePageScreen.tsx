import { ImageStyle, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import { Text, Screen, TarotCard, Button } from "../components";
import { spacing } from "../constants/theme";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DatePicker from "../components/DatePicker";

const HomePageScreen = () => {
  const [date, setDate] = useState<Date | null>(null); // State to store the selected date
  const [birthDate, setBirthDate] = useState<string | null>(null); // Formatted birth date (dd.mm.yyyy)
  const [day, setDay] = useState<string | null>(null); // Day (dd)
  const [month, setMonth] = useState<string | null>(null); // Month (mm)
  const [year, setYear] = useState<string | null>(null); // Year (yyyy)
  const [show, setShow] = useState(false); // State to toggle the date picker visibility

  const formatDate = (
    date: Date
  ): { formatted: string; dd: string; mm: string; yyyy: string } => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const yyyy = String(date.getFullYear());
    return { formatted: `${dd}.${mm}.${yyyy}`, dd, mm, yyyy };
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false); // Close the date picker
    if (selectedDate) {
      setDate(selectedDate); // Update the selected date
      const { formatted, dd, mm, yyyy } = formatDate(selectedDate); // Format the date
      setBirthDate(formatted); // Update the formatted birth date
      setDay(dd); // Set the day
      setMonth(mm); // Set the month
      setYear(yyyy); // Set the year
      console.log("Selected date:", formatted); // Log the formatted date
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
        <DatePicker
          value={date || new Date()} // Pass the current date (default to today if none is selected)
          onChange={onChange} // Handle date selection
          mode="date" // Set mode to "date" only
          is24Hour={true} // 24-hour format
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
