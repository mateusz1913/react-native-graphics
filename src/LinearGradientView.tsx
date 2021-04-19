import React from 'react';
import type { ProcessedColorValue } from 'react-native';
import { processColor, requireNativeComponent } from 'react-native';

import type { LinearGradientProps } from './types';

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
