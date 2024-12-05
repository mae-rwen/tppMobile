import { View, ViewStyle } from "react-native";
import React from "react";
import { Screen, Text } from "../components";
import { spacing } from "../constants/theme";

const TPPScreen = () => {
  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={$root}
    >
      <View style={$container}></View>
      <View style={$contentContainer}>
        <Text tx="tpp.header" />
      </View>
    </Screen>
  );
};

export default TPPScreen;

const $root: ViewStyle = {
  // paddingTop: spacing.lg,
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
