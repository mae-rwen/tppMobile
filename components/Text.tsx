import i18n from "i18n-js";
import React from "react";
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
} from "react-native";
import { isRTL, translate, TxKeyPath } from "../constants/i18n";
import { colors } from "../constants/theme";

type Sizes = keyof typeof $sizeStyles;
type Weights = keyof typeof $fontWeightStyles;
type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
  tx?: TxKeyPath;
  text?: string;
  txOptions?: i18n.TranslateOptions;
  style?: StyleProp<TextStyle>;
  preset?: Presets;
  weight?: Weights;
  size?: Sizes;
  children?: React.ReactNode;
}

export function Text(props: TextProps) {
  const {
    weight,
    size,
    tx,
    txOptions,
    text,
    children,
    style: $styleOverride,
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const preset: Presets = props.preset ?? "default";
  const $styles: StyleProp<TextStyle> = [
    $rtlStyle,
    $presets[preset],
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    $styleOverride,
  ];

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  );
}

const $sizeStyles = {
  xxl: { fontSize: 28, lineHeight: 34 } satisfies TextStyle,
  xl: { fontSize: 22, lineHeight: 26 } satisfies TextStyle,
  lg: { fontSize: 20, lineHeight: 24 } satisfies TextStyle,
  md: { fontSize: 18, lineHeight: 21 } satisfies TextStyle,
  sm: { fontSize: 16, lineHeight: 19 } satisfies TextStyle,
  xs: { fontSize: 14, lineHeight: 16 } satisfies TextStyle,
  xxs: { fontSize: 12, lineHeight: 14 } satisfies TextStyle,
};

const $fontWeightStyles = {
  light: { fontWeight: "300" } satisfies TextStyle,
  normal: { fontWeight: "400" } satisfies TextStyle,
  medium: { fontWeight: "500" } satisfies TextStyle,
  semiBold: { fontWeight: "600" } satisfies TextStyle,
  bold: { fontWeight: "700" } satisfies TextStyle,
};

const $fontColorsStyles = {
  standard: { color: colors.text } satisfies TextStyle,
  disabled: { color: colors.textDim } satisfies TextStyle,
  false: { color: colors.error } satisfies TextStyle,
  true: { color: colors.success } satisfies TextStyle,
  white: { color: colors.white } satisfies TextStyle,
};

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  $fontColorsStyles.standard,
];

const $presets = {
  default: $baseStyle,

  h1: [
    $baseStyle,
    $sizeStyles.xxl,
    $fontWeightStyles.semiBold,
  ] as StyleProp<TextStyle>,

  h2: [
    $baseStyle,
    $sizeStyles.xl,
    $fontWeightStyles.semiBold,
  ] as StyleProp<TextStyle>,
  h2regular: [$baseStyle, $sizeStyles.xl] as StyleProp<TextStyle>,

  h3: [
    $baseStyle,
    $sizeStyles.lg,
    $fontWeightStyles.semiBold,
  ] as StyleProp<TextStyle>,
  h3regular: [$baseStyle, $sizeStyles.lg] as StyleProp<TextStyle>,

  h4: [
    $baseStyle,
    $sizeStyles.md,
    $fontWeightStyles.semiBold,
  ] as StyleProp<TextStyle>,
  h4regular: [$baseStyle, $sizeStyles.md] as StyleProp<TextStyle>,

  copy: $baseStyle,
  copyLined: [
    $baseStyle,
    { textDecorationLine: "underline" },
  ] as StyleProp<TextStyle>,
  copyBold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  xs: [$baseStyle, $sizeStyles.xs] as StyleProp<TextStyle>,

  xxs: [
    $baseStyle,
    $sizeStyles.xxs,
    $fontWeightStyles.semiBold,
  ] as StyleProp<TextStyle>,
};

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {};
