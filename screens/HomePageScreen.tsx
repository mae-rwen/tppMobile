import { FlatList, ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Screen, TarotCard, Button } from "../components";
import { spacing } from "../constants/theme";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DatePicker from "../components/DatePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePageScreen = () => {
  const [date, setDate] = useState<Date | null>(null); // State to store the selected date
  const [birthDate, setBirthDate] = useState<string | null>(null); // Formatted birth date (dd.mm.yyyy)
  const [day, setDay] = useState<string | null>(null); // Day (dd)
  const [month, setMonth] = useState<string | null>(null); // Month (mm)
  const [year, setYear] = useState<string | null>(null); // Year (yyyy)
  const [show, setShow] = useState(false); // State to toggle the date picker visibility
  const [userCount, setUserCount] = useState(0); // Counter for unique user IDs
  const [savedUsers, setSavedUsers] = useState<
    {
      id: string;
      birthdate: string;
      day: string;
      month: string;
      year: string;
    }[]
  >([]); // State to store the list of saved users

  const formatDate = (
    date: Date
  ): { formatted: string; dd: string; mm: string; yyyy: string } => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const yyyy = String(date.getFullYear());
    return { formatted: `${dd}.${mm}.${yyyy}`, dd, mm, yyyy };
  };

  const saveUserBirthdate = async (userId: string, birthdateData: object) => {
    try {
      await AsyncStorage.setItem(userId, JSON.stringify(birthdateData));
      console.log(`Saved ${userId}:`, birthdateData);
    } catch (error) {
      console.error("Error saving birthdate:", error);
    }
  };

  const loadSavedUsers = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const allData = await AsyncStorage.multiGet(allKeys);
      const users = allData.map(([key, value]) => ({
        id: key,
        ...(value ? JSON.parse(value) : {}),
      }));
      setSavedUsers(users);
    } catch (error) {
      console.error("Error retrieving stored data:", error);
    }
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

      const newUserId = `user${userCount + 1}`; // Generate unique user ID
      const birthdateData = {
        birthdate: formatted,
        day: dd,
        month: mm,
        year: yyyy,
      };
      saveUserBirthdate(newUserId, birthdateData); // Save to AsyncStorage
      setUserCount(userCount + 1); // Increment the user counter
      loadSavedUsers(); // Reload the list of saved users
    }
  };

  const showDatepicker = () => {
    setShow(true); // Open the date picker
  };

  useEffect(() => {
    loadSavedUsers(); // Load users on component mount
  }, []);

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$root}
    >
      <View style={$container}>
        <Text preset="h1" tx="common.header" />
        <View style={$contentContainer}>
          <View style={$cardContainer}>
            <TarotCard cardName="revers" imageStyle={$welcomeCard} />
          </View>
          <View style={$buttonContainer}>
            <Button
              preset="default"
              tx="common.newBirthdate"
              onPress={showDatepicker} // Show date picker on button press
            />
          </View>
          <View>
            {savedUsers.length > 0 ? (
              savedUsers.map((user) => (
                <View key={user.id} style={$userItem}>
                  <Text style={$userText}>
                    {user.id}: {user.birthdate} (Day: {user.day}, Month:{" "}
                    {user.month}, Year: {user.year})
                  </Text>
                </View>
              ))
            ) : (
              <Text style={$userText}>No users saved yet.</Text>
            )}
          </View>
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
  paddingTop: spacing.lg,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.md,
};
const $container: ViewStyle = {
  alignItems: "center",
  gap: spacing.sm,
};
const $contentContainer: ViewStyle = {
  flexGrow: 1,
  alignItems: "center",
};
const $cardContainer: ViewStyle = {
  alignItems: "center",
};
const $welcomeCard: ImageStyle = {
  height: 500,
};
const $buttonContainer: ViewStyle = {
  marginVertical: spacing.md,
};
const $userItem: ViewStyle = {
  padding: spacing.sm,
  borderBottomWidth: 1,
  borderBottomColor: "#ccc",
};
const $userText: TextStyle = {
  fontSize: 16,
};
