import React from "react";
import { Tabs } from "expo-router";
import * as IconsSolid from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";
import { colors } from "../../constants/theme";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.secondary,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerTitle: "Home",
          title: "Home",
          headerShown: false,

          tabBarIcon: ({ focused }) => {
            const IconComponent = focused
              ? IconsSolid.SparklesIcon
              : IconsOutline.SparklesIcon;
            return <IconComponent color={colors.primary} />;
          },
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          headerTitle: "Info",
          title: "Info",
          headerShown: false,

          tabBarIcon: ({ focused }) => {
            const IconComponent = focused
              ? IconsSolid.InformationCircleIcon
              : IconsOutline.InformationCircleIcon;
            return <IconComponent color={colors.primary} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
