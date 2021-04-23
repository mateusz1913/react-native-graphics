import type { ColorValue, StyleProp, ViewStyle } from 'react-native';

export interface AngularGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  centerPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

export enum BlurType {
  dark = 'dark',
  light = 'light',
  prominent = 'prominent',
  regular = 'regular',
  xlight = 'xlight',
  /** iOS 13+ */
  chromeMaterial = 'chromeMaterial',
  /** iOS 13+ */
  chromeMaterialDark = 'chromeMaterialDark',
  /** iOS 13+ */
  chromeMaterialLight = 'chromeMaterialLight',
  /** iOS 13+ */
  material = 'material',
  /** iOS 13+ */
  materialDark = 'materialDark',
  /** iOS 13+ */
  materialLight = 'materialLight',
  /** iOS 13+ */
  thickMaterial = 'thickMaterial',
  /** iOS 13+ */
  thickMaterialDark = 'thickMaterialDark',
  /** iOS 13+ */
  thickMaterialLight = 'thickMaterialLight',
  /** iOS 13+ */
  thinMaterial = 'thinMaterial',
  /** iOS 13+ */
  thinMaterialDark = 'thinMaterialDark',
  /** iOS 13+ */
  thinMaterialLight = 'thinMaterialLight',
  /** iOS 13+ */
  ultraThinMaterial = 'ultraThinMaterial',
  /** iOS 13+ */
  ultraThinMaterialDark = 'ultraThinMaterialDark',
  /** iOS 13+ */
  ultraThinMaterialLight = 'ultraThinMaterialLight',
  /** macOS */
  contentBackground = 'contentBackground',
  /** macOS */
  fullScreenUI = 'fullScreenUI',
  /** macOS */
  headerView = 'headerView',
  /** macOS */
  hudWindow = 'hudWindow',
  /** macOS */
  menu = 'menu',
  /** macOS */
  popover = 'popover',
  /** macOS */
  selection = 'selection',
  /** macOS */
  sheet = 'sheet',
  /** macOS */
  sidebar = 'sidebar',
  /** macOS */
  titleBar = 'titleBar',
  /** macOS */
  tooltip = 'tooltip',
  /** macOS */
  underPageBackground = 'underPageBackground',
  /** macOS */
  underWindowBackground = 'underWindowBackground',
  /** macOS */
  windowBackground = 'windowBackground',
}

export interface BlurProps {
  /** @default "dark" */
  blurType?: BlurType;
  /** @platform iOS */
  fallbackColor?: number | ColorValue;
  /** @default false */
  shouldOverlay?: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface LinearGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  angle?: number;
  angleCenter?: { x: number; y: number };
  endPoint?: { x: number; y: number };
  startPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}

export interface RadialGradientProps {
  colors: (number | ColorValue | undefined)[];
  locations: number[];
  radius: number;
  centerPoint?: { x: number; y: number };
  style?: StyleProp<ViewStyle>;
}
