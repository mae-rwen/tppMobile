const palette = {
  // Main Colors
  main100: "#F7F4FB",
  main200: "#E1D9F2",
  main300: "#C9BEE9",
  main400: "#A993D9",
  main500: "#61447E", // Main color
  main600: "#523C6A",
  main700: "#3D2E52",
  main800: "#291F3B",
  main900: "#160F21",

  // Secondary Colors
  secondary100: "#FFFFFF",
  secondary200: "#F7F4FB", // Secondary color
  secondary300: "#EDEAF5",
  secondary400: "#E3DFEF",
  secondary500: "#D9D3E8",
  secondary600: "#C5B9DB",
  secondary700: "#B09ECD",
  secondary800: "#9A84BF",
  secondary900: "#8369B0",

  // Accent Colors
  accent100: "#D5D6E6",
  accent200: "#AEB0CD",
  accent300: "#898BA6",
  accent400: "#656880",
  accent500: "#363963", // Accent color
  accent600: "#2F3256",
  accent700: "#272A46",
  accent800: "#1E2235",
  accent900: "#151824",

  // Overlay Colors
  overlay20: "rgba(54, 57, 99, 0.2)",
  overlay50: "rgba(54, 57, 99, 0.5)",

  // Success (Green) Palette
  success100: "#E3F9E5",
  success200: "#C1F2C7",
  success300: "#91E697",
  success400: "#51CA58",
  success500: "#31B237", // Main success color
  success600: "#28A228",
  success700: "#1F8F1F",
  success800: "#176D17",
  success900: "#0E4A0E",

  // Angry/Error Colors
  angry100: "#F2D6CD",
  angry500: "#C03403",
} as const;

export const colors = {
  palette,
  primary: palette.main500,
  secondary: palette.secondary200,
  accent: palette.accent500,
  text: palette.main500,
  textDim: palette.main400,
  background: palette.secondary200,
  border: palette.accent300,
  tint: palette.main500,
  separator: palette.accent200,
  error: palette.angry500,
  errorBackground: palette.angry100,
  success: palette.success500,
  successBackground: palette.success100,
  successBorder: palette.success300,
  white: palette.secondary100,
  contentBox: palette.secondary400,
};
