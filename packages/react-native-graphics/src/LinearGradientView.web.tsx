import React from 'react';
import { View } from 'react-native';

import type { LinearGradientProps } from './types';

export const LinearGradientView: React.FC<LinearGradientProps> = (props) => {
  const {
    angle,
    colors,
    locations,
    style,
    ...rest
  } = props;

  return <View
    {...rest}
    style={[
      style,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        background: `
          linear-gradient(
            ${angle ? `${angle}deg,` : ''}
            ${colors.map((color, i) => `${String(color)} ${locations[i] * 100}% ${locations[i] * 100}%`).join(',')}
          )
        `,
      },
    ]}
  />;
};