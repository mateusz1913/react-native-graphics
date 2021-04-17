import React from 'react';
import type { ColorValue, ProcessedColorValue, StyleProp, ViewStyle } from 'react-native';
import { processColor, requireNativeComponent } from 'react-native';

export interface AngularGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  centerPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

interface NativeProps extends Omit<AngularGradientProps, 'colors'> {
  colors: (ProcessedColorValue | null | undefined)[];
}

const NativeAngularGradientView = requireNativeComponent<NativeProps>('AngularGradientView');

export const AngularGradientView: React.FC<AngularGradientProps> = (props) => {
  const { colors, ...rest } = props;

  return <NativeAngularGradientView
    {...rest}
    colors={colors.map((color) => processColor(color))}
  />;
};
