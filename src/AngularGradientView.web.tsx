import React from 'react';
import { View } from 'react-native';

import type { AngularGradientProps } from './types';

export const AngularGradientView: React.FC<AngularGradientProps> = (props) => {
  const { centerPoint, colors, locations, style, ...rest } = props;

  return <View
    {...rest}
    style={[
      style,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        background: `
          conic-gradient(
            from 90deg at ${(centerPoint?.x ?? 0.5) * 100}% ${(centerPoint?.y ?? 0.5) * 100}%,
            ${colors.map((color, i) => `${String(color)} ${locations[i] * 100}%`).join(',')}
          )
        `,
      },
    ]}
  />;
};
