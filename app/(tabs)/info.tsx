import { TextStyle, View, ViewStyle } from "react-native";
import React from "react";
import { Text, Screen } from "../../components";
import { colors, spacing } from "../../constants/theme";
import * as Application from "expo-application";
import { i18n } from "../../constants/i18n";

const info = () => {
  const appVersionDisplay = `${i18n.translate(
    "infoScreen.footer.appVersion"
  )} ${Application.nativeApplicationVersion}`;

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={$root}
      style={$rootContainer}
    >
      <View style={$container}>
        <Text preset="h1" tx="infoScreen.header" />
        <View style={$infoContainer}>
          <Text tx="infoScreen.lineOne" />
          <Text tx="infoScreen.lineTwo" />
        </View>
      </View>
      <View style={$footer}>
        <Text preset="xs" tx="infoScreen.footer.copyright" />
        <Text preset="xxs" style={$appVersionTxt} text={appVersionDisplay} />
      </View>
    </Screen>
  );
};

export default info;

const $root: ViewStyle = {
  flex: 1,
  paddingTop: spacing.lg,
  paddingBottom: spacing.sm,
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

const $infoContainer: ViewStyle = {
  backgroundColor: colors.contentBox,
  paddingHorizontal: spacing.lg,
  paddingVertical: spacing.md,
  gap: spacing.sm,
};

const $footer: ViewStyle = {
  justifyContent: "flex-end",
  alignItems: "center",
  paddingHorizontal: spacing.sm,
};
const $appVersionTxt: TextStyle = {
  fontWeight: "bold",
};
