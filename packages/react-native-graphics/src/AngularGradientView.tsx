import React from 'react';
import type { ProcessedColorValue } from 'react-native';
import { processColor, requireNativeComponent } from 'react-native';

import type { AngularGradientProps } from './types';

interface NativeProps extends Omit<AngularGradientProps, 'colors'> {
  colors: (ProcessedColorValue | null | undefined)[];
}

const NativeAngularGradientView = requireNativeComponent<NativeProps>('RNGAngularGradientView');

export const AngularGradientView: React.FC<AngularGradientProps> = (props) => {
  const { colors, ...rest } = props;

  return <NativeAngularGradientView
    {...rest}
    colors={colors.map((color) => processColor(color))}
  />;
};
