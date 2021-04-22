import React from 'react';
import { View } from 'react-native';

import type { BlurProps } from './types';

export const BlurView: React.FC<BlurProps> = (props) => {
  const {
    style,
    ...rest
  } = props;

  return <View
    {...rest}
    style={[ style ]}
  />;
};