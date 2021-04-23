import React from 'react';
import { StyleSheet, View } from 'react-native';

import { BlurType } from './types';
import type { BlurProps } from './types';

function mapBlurTypeBackgroundColor(blurType: BlurType = BlurType.dark) {
  if (blurType === BlurType.xlight) {
    return 'rgba(247, 247, 247, 0.8)';
  }

  if ([
    BlurType.chromeMaterialLight,
    BlurType.light,
    BlurType.materialLight,
    BlurType.thickMaterialLight,
    BlurType.thinMaterialLight,
    BlurType.ultraThinMaterialLight,
  ].includes(blurType)) {
    return 'rgba(255, 255, 255, 0.3)';
  }

  return 'rgba(28, 28, 28, 0.73)';
}

export const BlurView: React.FC<BlurProps> = (props) => {
  const {
    blurType,
    shouldOverlay,
    ...rest
  } = props;

  const style = StyleSheet.flatten(props.style);
  const containerStyle = StyleSheet.flatten([
    styles.container,
    {
      alignItems: style.alignItems,
      backgroundColor: mapBlurTypeBackgroundColor(blurType),
      justifyContent: style.justifyContent,
    },
    shouldOverlay
      ? {
        backdropFilter: 'blur(0px)',
        filter: 'saturate(180%) blur(20px)',
      }
      : { backdropFilter: 'saturate(180%) blur(20px)' },
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
