import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

export interface AngularGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  centerPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

export interface LinearGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  angle?: number;
  angleCenter?: { x: number; y: number };
  endPoint?: { x: number; y: number };
  startPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

export interface RadialGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  radius: number;
  centerPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}
