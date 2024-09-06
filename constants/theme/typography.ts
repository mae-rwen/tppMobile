import { Platform } from "react-native";

const fonts = {
  system: {
    light: "System",
    normal: "System",
    medium: "System",
    semiBold: "System",
    bold: "System",
  },

  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
};

export const typography = {
  fonts,
  primary: fonts.system,
  secondary: Platform.select({
    ios: fonts.helveticaNeue,
    android: fonts.sansSerif,
  }),
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
};
