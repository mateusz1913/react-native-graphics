import React from 'react';
import type { ProcessedColorValue } from 'react-native';
import { Platform, processColor, requireNativeComponent } from 'react-native';

import type { BlurProps } from './types';
import { BlurType } from './types';

interface NativeBlurProps extends Omit<BlurProps, 'fallbackColor'> {
  fallbackColor?: ProcessedColorValue | null
}

const macosBlurTypes = [
  BlurType.contentBackground,
  BlurType.fullScreenUI,
  BlurType.headerView,
  BlurType.hudWindow,
  BlurType.menu,
  BlurType.popover,
  BlurType.selection,
  BlurType.sheet,
  BlurType.sidebar,
  BlurType.titleBar,
  BlurType.tooltip,
  BlurType.underPageBackground,
  BlurType.underWindowBackground,
  BlurType.windowBackground,
];

const NativeBlurView = requireNativeComponent<NativeBlurProps>('RNGBlurView');

export const BlurView: React.FC<BlurProps> = (props) => {
  const { blurIntensity = 1, fallbackColor, ...rest } = props;

  if (![ 'ios', 'macos', 'android' ].includes(Platform.OS)) {
    return null;
  }

  let blurType = props.blurType;

  if (blurType && Platform.OS === 'macos' && !macosBlurTypes.includes(blurType)) {
    blurType = BlurType.fullScreenUI;
  } else if (blurType && Platform.OS === 'ios' && macosBlurTypes.includes(blurType)) {
    blurType = BlurType.dark;
  }

  return <NativeBlurView
    {...rest}
    blurIntensity={Math.min(Math.max(0, blurIntensity), 1)}
    blurType={blurType}
    fallbackColor={processColor(fallbackColor)}
  />;
};
