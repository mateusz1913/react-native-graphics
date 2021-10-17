import React, { useState } from 'react';
import type { LayoutRectangle } from 'react-native';
import { View } from 'react-native';

import type { RadialGradientProps } from './types';

export const RadialGradientView: React.FC<RadialGradientProps> = (props) => {
  const { centerPoint, colors, locations, radius, style, ...rest } = props;
  const [ layout, setLayout ] = useState<LayoutRectangle>({ height: 0, width: 0, x: 0, y: 0 });

  return <View
    {...rest}
    onLayout={(e) => {
      setLayout(e.nativeEvent.layout);
    }}
    style={[
      style,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        background: `
          radial-gradient(
            ${radius * ((layout.height + layout.width) / 2)}px circle at ${(centerPoint?.x ?? 0.5) * 100}% ${(centerPoint?.y ?? 0.5) * 100}%,
            ${colors.map((color, i) => `${String(color)} ${locations[i] * 100}%`).join(',')}
          )
        `,
      },
    ]}
  />;
};
