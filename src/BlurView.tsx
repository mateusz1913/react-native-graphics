import React from 'react';
import type { ProcessedColorValue } from 'react-native';
import { Platform } from 'react-native';
import { processColor, requireNativeComponent } from 'react-native';

import type { BlurProps } from './types';

interface NativeBlurProps extends Omit<BlurProps, 'fallbackColor'> {
  fallbackColor?: ProcessedColorValue | null
}

const NativeBlurView = requireNativeComponent<NativeBlurProps>('RNGBlurView');

export const BlurView: React.FC<BlurProps> = (props) => {
  const { fallbackColor, ...rest } = props;

  if (Platform.OS !== 'ios') {
    return null;
  }

  return <NativeBlurView
    {...rest}
    fallbackColor={processColor(fallbackColor)}
  />;
};
