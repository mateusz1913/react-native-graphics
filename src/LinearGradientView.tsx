import React from 'react';
import type { ColorValue, ProcessedColorValue, StyleProp, ViewStyle } from 'react-native';
import { processColor, requireNativeComponent } from 'react-native';

export interface LinearGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  angle?: number;
  angleCenter?: { x: number; y: number };
  endPoint?: { x: number; y: number };
  startPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

interface NativeProps extends Omit<LinearGradientProps, 'colors'> {
  colors: (ProcessedColorValue | null | undefined)[];
}

const NativeLinearGradientView = requireNativeComponent<NativeProps>('LinearGradientView');

export const LinearGradientView: React.FC<LinearGradientProps> = (props) => {
  const { colors, ...rest } = props;

  return <NativeLinearGradientView
    {...rest}
    colors={colors.map((color) => processColor(color))}
  />;
};
