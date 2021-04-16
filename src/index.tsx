import { requireNativeComponent, ViewStyle } from 'react-native';

type GraphicsProps = {
  color: string;
  style: ViewStyle;
};

export const GraphicsViewManager = requireNativeComponent<GraphicsProps>(
'GraphicsView'
);

export default GraphicsViewManager;
