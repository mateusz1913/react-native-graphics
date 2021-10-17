import React from 'react';
import type { ColorValue } from 'react-native';
import { StyleSheet, View } from 'react-native';

import { BlurType } from './types';
import type { BlurProps } from './types';

function isReducedTransparencyEnabled() {
  if (typeof window.matchMedia !== 'function') {
    return null;
  }

  const mediaQueryList = window.matchMedia('(prefers-reduced-transparency)');

  return mediaQueryList.matches;
}

function mapBlurTypeBackgroundColor(
  blurIntensity = 1,
  blurType: BlurType = BlurType.dark,
  fallbackColor?: ColorValue,
): ColorValue {
  if (isReducedTransparencyEnabled() && fallbackColor) {
    return fallbackColor;
  }

  if (blurType === BlurType.xlight) {
    return `rgba(247, 247, 247, ${blurIntensity * 0.8})`;
  }

  if ([
    BlurType.chromeMaterialLight,
    BlurType.light,
    BlurType.materialLight,
    BlurType.thickMaterialLight,
    BlurType.thinMaterialLight,
    BlurType.ultraThinMaterialLight,
  ].includes(blurType)) {
    return `rgba(255, 255, 255, ${blurIntensity * 0.3})`;
  }

  return `rgba(28, 28, 28, ${blurIntensity * 0.73})`;
}

export const BlurView: React.FC<BlurProps> = (props) => {
  const {
    blurIntensity = 1,
    blurType,
    fallbackColor,
    shouldOverlay,
    ...rest
  } = props;

  const style = StyleSheet.flatten(props.style);
  const containerStyle = StyleSheet.flatten([
    styles.container,
    {
      alignItems: style.alignItems,
      backgroundColor: mapBlurTypeBackgroundColor(blurIntensity, blurType, fallbackColor) as ColorValue,
      justifyContent: style.justifyContent,
    },
    isReducedTransparencyEnabled() && fallbackColor
      ? undefined
      : shouldOverlay
        ? {
          backdropFilter: 'blur(0px)',
          filter: `saturate(180%) blur(${blurIntensity * 20}px)`,
        }
        : { backdropFilter: `saturate(180%) blur(${blurIntensity * 20}px)` },
  ]);

  return <View style={[
    style,
    styles.wrapper,
  ]}>
    <View
      {...rest}
      style={containerStyle}
    />
  </View>;
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
  },
  wrapper: {
    overflow: 'hidden',
  },
});
