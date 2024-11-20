import * as React from "react";
import { ComponentType } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { colors } from "../constants/theme";
import * as IconsSolid from "react-native-heroicons/solid";
import * as IconsOutline from "react-native-heroicons/outline";

export type IconTypes = keyof typeof iconRegistry;

interface IconProps extends TouchableOpacityProps {
  icon: IconTypes;
  color?: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: TouchableOpacityProps["onPress"];
}

export function Icon(props: IconProps) {
  const {
    icon,
    color = colors.primary,
    size = 24,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props;

  const isPressable = !!WrapperProps.onPress;
  const Wrapper = (
    WrapperProps?.onPress ? TouchableOpacity : View
  ) as ComponentType<TouchableOpacityProps | ViewProps>;

  const IconComponent = iconRegistry[icon];

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <IconComponent color={color} size={size} />
    </Wrapper>
  );
}

export const iconRegistry = {
  sparkleSolid: IconsSolid.SparklesIcon,
  sparkleOutline: IconsOutline.SparklesIcon,
  infoSolid: IconsSolid.InformationCircleIcon,
  infoOutline: IconsOutline.InformationCircleIcon,
};
