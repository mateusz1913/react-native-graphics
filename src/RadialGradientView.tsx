import React from 'react';
import type { ColorValue, ProcessedColorValue, StyleProp, ViewStyle } from 'react-native';
import { processColor, requireNativeComponent } from 'react-native';

export interface RadialGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  radius: number;
  centerPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

interface NativeProps extends Omit<RadialGradientProps, 'colors'> {
  colors: (ProcessedColorValue | null | undefined)[];
}

const NativeRadialGradientView = requireNativeComponent<NativeProps>('RadialGradientView');

export const RadialGradientView: React.FC<RadialGradientProps> = (props) => {
  const { colors, ...rest } = props;

  return <NativeRadialGradientView
    {...rest}
    colors={colors.map((color) => processColor(color))}
  />;
};
