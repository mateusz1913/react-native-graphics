import React from 'react';
import type { ProcessedColorValue } from 'react-native';
import { processColor, requireNativeComponent } from 'react-native';

import type { RadialGradientProps } from './types';

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
