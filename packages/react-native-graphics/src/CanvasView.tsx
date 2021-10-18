import React from 'react';
import type { ProcessedColorValue } from 'react-native';
import { processColor, requireNativeComponent } from 'react-native';

import type { CanvasViewProps, PathConfig } from './types';

type ProcessedPath = Omit<PathConfig, 'fill' | 'stroke'> & {
  fill?: (ProcessedColorValue | null | undefined)
  stroke?: (ProcessedColorValue | null | undefined)
}

interface NativeProps extends Omit<CanvasViewProps, 'paths' | 'preserveAspectRatio'> {
  paths: ProcessedPath[];
  /** PreserveAspectRatio */
  align: string;
  meetOrSlice: string;
}

function processPaths(paths: PathConfig[]): ProcessedPath[] {
  return paths.map((path) => ({
    ...path,
    fill: processColor(path.fill),
    stroke: processColor(path.stroke),
  }));
}

const PRESERVE_ASPECT_RATIO = [
  'xMinYMin',
  'xMidYMin',
  'xMaxYMin',
  'xMinYMid',
  'xMidYMid',
  'xMaxYMid',
  'xMinYMax',
  'xMidYMax',
  'xMaxYMax',
  'none',
];

function processPreserveAspectRatio(preserveAspectRatio?: string): { align: string; meetOrSlice: string } {
  if (!preserveAspectRatio) {
    return {
      align: 'xMidYMid',
      meetOrSlice: 'meet',
    };
  }

  const preserveAspectRatioParams = preserveAspectRatio.trim().split(/\s+/);
  const align = !PRESERVE_ASPECT_RATIO.includes(preserveAspectRatioParams[0])
    ? 'xMidYMid'
    : preserveAspectRatioParams[0];
  const meetOrSlice = ![ 'meet', 'slice' ].includes(preserveAspectRatioParams[1])
    ? 'meet'
    : preserveAspectRatioParams[1];

  return { align, meetOrSlice };
}

const NativeCanvasView = requireNativeComponent<NativeProps>('RNGCanvasView');

export const CanvasView: React.FC<CanvasViewProps> = (props) => {
  const { paths, preserveAspectRatio, ...rest } = props;
  const processedPaths = processPaths(paths);

  return <NativeCanvasView
    {...rest}
    paths={processedPaths}
    {...processPreserveAspectRatio(preserveAspectRatio)}
  />;
};
