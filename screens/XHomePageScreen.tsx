import {
  Modal,
  ImageStyle,
  View,
  ViewStyle,
  Pressable,
  Alert,
  TextStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Screen, TarotCard, Button } from "../components";
import { colors, spacing } from "../constants/theme";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DatePicker from "../components/DatePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomePageScreen = () => {
  const [date, setDate] = useState<Date | null>(null); // State to store the selected date
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
  const [modalVisible, setModalVisible] = useState(false);

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
      setUserCount(users.length); // Set userCount to the number of saved users
    } catch (error) {
      console.error("Error retrieving stored data:", error);
    }
  };

  useEffect(() => {
    loadSavedUsers(); // Load users on component mount
  }, []);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false); // Close the date picker
    if (selectedDate && event.type === "set") {
      setDate(selectedDate); // Update the selected date
      const { formatted, dd, mm, yyyy } = formatDate(selectedDate); // Format the date
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
      setModalVisible(!modalVisible);
    }
  };

  const showDatepicker = () => {
    setShow(true); // Open the date picker
  };

  const showData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const filteredKeys = allKeys.filter((key) => key.startsWith("user")); // Assuming user data is stored with keys starting with 'user'

      if (filteredKeys.length === 0) {
        console.log("No user birthdate data found.");
        return;
      }

      const allData = await AsyncStorage.multiGet(filteredKeys); // Get all data for filtered keys
      allData.forEach(([key, value]) => {
        console.log(key, JSON.parse(value || "{}")); // Parse and log the data
      });
    } catch (error) {
      console.error("Error logging birthdate data:", error);
    }
  };

  const deleteData = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const filteredKeys = allKeys.filter((key) => key.startsWith("user")); // Assuming user data is stored with keys starting with 'user'
      await AsyncStorage.multiRemove(filteredKeys); // Remove all user-related data
      console.log("All user birthdate data has been removed");
      // Triggering a re-fetch of users or reloading the component
      setSavedUsers([]); // Clear the state (or reload the saved users if necessary)
      setUserCount(0); // Reset the user count
    } catch (error) {
      console.error("Error clearing birthdate data:", error);
    }
  };

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
          <View style={$newBDbtnContainer}>
            <Button
              preset="default"
              tx="birthdata.newBirthdate"
              onPress={showDatepicker} // Show date picker on button press
            />
          </View>
          <View style={$savedBDbtnContainer}>
            {savedUsers.length > 0
              ? savedUsers.map((user) => (
                  <Button key={user.id} preset="filled" text={user.id} />
                ))
              : null}
          </View>
          <View style={$reloadBTNContainer}>
            <Button
              preset="default"
              tx="birthdata.showData"
              onPress={showData}
            />
            <Button
              preset="default"
              tx="birthdata.deleteData"
              onPress={deleteData}
            />
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={$modalContainer}>
          <View style={$modalView}>
            <Text preset="copy" tx="birthdata.personName" style={$modalText} />
            <Button
              text="Hide modal"
              preset="reversed"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
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
const $newBDbtnContainer: ViewStyle = {
  marginVertical: spacing.xl,
};
const $savedBDbtnContainer: ViewStyle = {
  flexDirection: "row",
  gap: spacing.sm,
  flexWrap: "wrap",
  justifyContent: "center",
};
const $reloadBTNContainer: ViewStyle = {
  marginVertical: spacing.xl,
  flexDirection: "row",
  gap: spacing.sm,
};
const $modalContainer: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};
const $modalView: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: 4,
  padding: spacing.xl,
  alignItems: "center",
  shadowColor: colors.accent,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 10,
};

const $modalText: TextStyle = {
  marginBottom: spacing.md,
  textAlign: "center",
};
