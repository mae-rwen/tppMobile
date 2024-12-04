import {
  TextInput,
  Modal,
  ImageStyle,
  View,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Screen, TarotCard, Button } from "../components";
import { colors, spacing } from "../constants/theme";
import * as i18n from "../constants/i18n";
import DatePicker from "../components/DatePicker";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for TPP data
type TPPDetails = {
  birthdate: string;
  day: string;
  month: string;
  year: string;
};

type TPPData = Record<string, TPPDetails>;

const HomePageScreen = () => {
  const [inputTxt, setInputTxt] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [savedTPPData, setSavedTPPData] = useState<
    { name: string; details: TPPDetails }[]
  >([]);

  const modalPlaceholder = i18n.translate("newTPP.modalPlaceholder");

  // Fetch existing TPP data
  const fetchTPPData = async () => {
    try {
      const existingTPPData = await AsyncStorage.getItem("tppData");
      if (existingTPPData) {
        const parsedData: TPPData = JSON.parse(existingTPPData);

        // Map data into a format suitable for rendering
        const formattedData = Object.entries(parsedData).map(
          ([name, details]) => ({
            name,
            details,
          })
        );
        setSavedTPPData(formattedData);
      } else {
        console.log("No existing TPP data found.");
      }
    } catch (error) {
      console.error("Error fetching TPP data:", error);
    }
  };

  useEffect(() => {
    fetchTPPData();
  }, []);

  const proceedWithName = () => {
    setModalVisible(!modalVisible);
    // console.log(`Proceed with name of ${inputTxt}`);
    setDatePickerVisible(true);
  };
  const proceedWithoutName = () => {
    setInputTxt("");
    setModalVisible(!modalVisible);
    console.log(`Proceed without name`);
    setDatePickerVisible(true);
  };

  const formatDate = (
    date: Date
  ): { formatted: string; dd: string; mm: string; yyyy: string } => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const yyyy = String(date.getFullYear());
    return { formatted: `${dd}.${mm}.${yyyy}`, dd, mm, yyyy };
  };

  const saveNewTPP = async (
    name: string,
    birthdateData: { formatted: string; dd: string; mm: string; yyyy: string }
  ): Promise<{ name: string; details: TPPDetails } | null> => {
    try {
      const existingTPPData = await AsyncStorage.getItem("tppData");
      const parsedData = existingTPPData ? JSON.parse(existingTPPData) : {};

      // Add new user data
      parsedData[name] = {
        birthdate: birthdateData.formatted,
        day: birthdateData.dd,
        month: birthdateData.mm,
        year: birthdateData.yyyy,
      };

      // Save updated data back to AsyncStorage
      await AsyncStorage.setItem("tppData", JSON.stringify(parsedData));

      // Return only the new TPP data
      return {
        name,
        details: parsedData[name],
      };
    } catch (error) {
      console.error("Error saving TPP data:", error);
      return null;
    }
  };

  const onDateChange = async (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate && event.type === "set") {
      setDate(selectedDate);
      const formattedDate = formatDate(selectedDate);

      // Save the new TPP and retrieve the newest data
      const newestTPP = await saveNewTPP(inputTxt, formattedDate);

      if (newestTPP) {
        console.log("Newest saved TPP data:", newestTPP);

        // Add the newest data to the existing savedTPPData state
        setSavedTPPData((prevData) => [...prevData, newestTPP]);
      }

      setInputTxt("");
      setDate(new Date());
    }
    setDatePickerVisible(!datePickerVisible);
  };

  const showData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("tppData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        //  console.log("All TPP data:", parsedData);
        Object.entries(parsedData).forEach(([name, details]) => {
          console.log(`Name: ${name}, Details:`, details);
        });
      } else {
        console.log("No TPP data found.");
      }
    } catch (error) {
      console.error("Error showing TPP data:", error);
    }
  };

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem("tppData"); // Remove the stored TPP data
      console.log("All TPP data has been removed.");
      setSavedTPPData([]); // Clear the state
    } catch (error) {
      console.error("Error deleting TPP data:", error);
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
          <View style={$btnContainer}>
            <Button
              preset="default"
              tx="newTPP.setNewPortrait"
              onPress={() => setModalVisible(true)}
            />
          </View>
          <View style={$savedDataBtnContainer}>
            {savedTPPData.length > 0
              ? savedTPPData.map((data, index) => (
                  <Button
                    key={index}
                    preset="filled"
                    text={`${data.name} - ${data.details.birthdate}`}
                    onPress={() =>
                      console.log(`Details for ${data.name}:`, data.details)
                    }
                  />
                ))
              : null}
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

      {/* Modal for TPP name input */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={$modalContainer}>
          <View style={$modalView}>
            <Text preset="copy" tx="newTPP.modalText" style={$modalText} />
            <TextInput
              style={$txtInput}
              onChangeText={setInputTxt}
              value={inputTxt}
              textAlign="center"
              placeholder={modalPlaceholder}
              placeholderTextColor={colors.palette.accent300}
            />
            <View style={$modalBtns}>
              <Button
                tx="newTPP.proceedWithSaving"
                preset="filled"
                onPress={proceedWithName}
                style={{ width: 100 }}
              />
              <Button
                tx="newTPP.proceedWitouthSaving"
                preset="default"
                onPress={proceedWithoutName}
                style={{ width: 100 }}
                disabled
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* DatePicker Modal */}

      {datePickerVisible && (
        <DatePicker value={date} onChange={onDateChange} mode="date" />
      )}
    </Screen>
  );
};

export default HomePageScreen;

const width = Dimensions.get("window").width;

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

const $btnContainer: ViewStyle = {
  marginVertical: spacing.xl,
};

const $savedDataBtnContainer: ViewStyle = {
  flexDirection: "row",
  gap: spacing.sm,
  flexWrap: "wrap",
  justifyContent: "center",
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
  gap: spacing.xl,
  width: width * 0.8,
};
const $modalText: TextStyle = {
  //  marginVertical: spacing.xl,
  textAlign: "center",
};
const $modalBtns: ViewStyle = {
  flexDirection: "row",
  //  / gap: spacing.lg,
  width: "100%",
  justifyContent: "space-evenly",
};
const $txtInput: ViewStyle = {
  height: 56,
  width: "100%",
  padding: spacing.sm,
  borderWidth: 1,
  borderColor: colors.palette.accent300,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
  //  marginBottom: spacing.xl,
};
