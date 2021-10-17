import React from 'react';
import { View } from 'react-native';

import type { MaskedViewProps } from './types';

export const MaskedView: React.FC<MaskedViewProps> = (props) => {
  const { style, ...rest } = props;

  return <View
    {...rest}
    style={style}
  />;
};