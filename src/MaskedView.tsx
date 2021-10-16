import React from 'react';
import { Platform, StyleSheet, View, requireNativeComponent } from 'react-native';

import type { MaskedViewProps } from './types';

const NativeMaskedView = requireNativeComponent<Omit<MaskedViewProps, 'mask'>>('RNGMaskedView');

export const MaskedView: React.FC<MaskedViewProps> = (props) => {
  const { children, mask, style } = props;

  if (!React.isValidElement(mask) || ![ 'ios', 'macos' ].includes(Platform.OS)) {
    return <View style={style}>{children}</View>;
  }

  return <NativeMaskedView
    style={style}
  >
    <View pointerEvents="none" style={[ StyleSheet.absoluteFillObject ]}>
      {mask}
    </View>
    {children}
  </NativeMaskedView>;
};
