import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import {
  AngularGradientView,
  BlurType,
  BlurView,
  CanvasView,
  LinearGradientView,
  MaskedView,
  RadialGradientView,
} from 'react-native-graphics';

const SHOULD_SHOW_BLUR_VIEW = Platform.OS === 'ios' || Platform.OS === 'macos' || Platform.OS === 'web' || Platform.OS === 'android' && Number(Platform.Version) >= 31;
const SHOULD_SHOW_MASK_VIEW = Platform.OS === 'ios' || Platform.OS === 'macos';

export default function App() {
  const [ shouldBlurOverlay, setShouldBlurOverlay ] = useState(false);
  const [ shouldMaskWithRect, setShouldMaskWithRect ] = useState(true);
  const blurImageAnimatedValue = useRef(new Animated.Value(0));

  useEffect(() => {
    if (!SHOULD_SHOW_BLUR_VIEW) {
      return;
    }

    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(blurImageAnimatedValue.current, {
          duration: 800,
          toValue: -100,
          useNativeDriver: true,
        }),
        Animated.timing(blurImageAnimatedValue.current, {
          duration: 800,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]),
    );

    anim.start();
    return () => {
      anim.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.row}>
          <CanvasView
            paths={[
              {
                d: 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z',
                fill: 'rgba(255, 40, 40, 0.7)',
              },
            ]}
            style={styles.canvas}
            viewBox="0 0 100 100"
          />
          <CanvasView
            paths={[
              {
                d: 'M 5 55 q 37 -66 66 0',
                stroke: 'yellow',
                strokeCap: 'butt',
                strokeJoin: 'round',
                strokeWidth: 5,
              },
              {
                d: 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z',
                stroke: '#FF00FF',
                strokeWidth: 3,
              },
              {
                d: 'M 25 75 q 37 -66 66 0',
                stroke: 'blue',
                strokeCap: 'round',
                strokeJoin: 'miter',
                strokeWidth: 8,
              },
            ]}
            style={[ styles.canvas, styles.green ]}
            viewBox="0 0 100 100"
          />
          <CanvasView
            paths={[
              {
                d: 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z',
                fill: 'rgba(255, 40, 40, 0.7)',
              },
            ]}
            style={styles.canvas}
            viewBox="50 -50 100 100"
          />
        </View>
        <View style={styles.row}>
          <CanvasView
            paths={[
              {
                d: 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z',
                fill: 'rgba(255, 40, 40, 0.7)',
              },
            ]}
            style={styles.canvas}
            viewBox="0 0 100 100"
          />
          <CanvasView
            paths={[
              {
                d: 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z',
                fill: 'rgba(255, 40, 40, 0.7)',
              },
            ]}
            style={styles.canvas}
            viewBox="-50 50 100 100"
          />
          <View>
            <CanvasView
              paths={[
                {
                  d: 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z',
                  fill: '#65FF65',
                },
              ]}
              style={[ styles.canvas, styles.absolute ]}
              viewBox="50 -50 100 100"
            />
            <CanvasView
              paths={[
                {
                  d: 'M 60,-20 A 20,20 0,0,1 100,-20 A 20,20 0,0,1 140,-20 Q 140,10 100,40 Q 60,10 60,-20 Z',
                  fill: '#FF00FF',
                },
              ]}
              style={styles.canvas}
              viewBox="50 -50 100 100"
            />
          </View>
        </View>
        <View style={styles.row}>
          <CanvasView
            paths={[
              {
                d: 'M 25,75 Q 50,150 75,100 T 150,150',
                stroke: 'rgba(255, 40, 40, 0.7)',
              },
            ]}
            style={styles.canvas}
            viewBox="0 0 100 100"
          />
          <CanvasView
            paths={[
              {
                d: 'M 10,30 A 20,20 0,0,1 50,30 A 20,20 0,0,1 90,30 Q 90,60 50,90 Q 10,60 10,30 Z',
                fill: 'rgba(255, 40, 40, 0.7)',
              },
            ]}
            style={styles.canvas}
            viewBox="0 0 100 100"
          />
          <CanvasView
            paths={[
              {
                d: [
                  'M 25,100',
                  'C 25,150 75,150 75,100',
                  'S 100,25 150,75',
                ].join(' '),
                stroke: 'rgba(255, 40, 40, 0.7)',
              },
            ]}
            style={styles.canvas}
            viewBox="0 0 100 100"
          />
        </View>
        <View style={styles.row}>
          <CanvasView
            paths={[
              {
                d: 'M50 0 L15 100 L85 100 Z',
              },
              {
                d: `
                M 38.459,1.66
                A 0.884,0.884,0,0,1,39,2.5
                a 0.7,0.7,0,0,1-.3.575
                L 23.235,16.092,27.58,26.1
                a1.4,1.4,0,0,1,.148.3,1.3,1.3,0,0,1,0,.377,1.266,1.266,0,0,1-2.078.991
                L15.526,20.6l-7.58,4.35
                a1.255,1.255,0,0,1-.485,0,1.267,1.267,0,0,1-1.277-1.258
                q0-.01,0-0.02
                a1.429,1.429,0,0,1,0-.446
                C7.243,20.253,8.6,16.369,8.6,16.29
                L3.433,13.545
                A0.743,0.743,0,0,1,2.9,12.822
                a0.822,0.822,0,0,1,.623-0.773
                l8.164-2.972,3.018-8.5
                A0.822,0.822,0,0,1,15.427,0
                a0.752,0.752,0,0,1,.752.555
                l2.563,6.936S37.65,1.727,37.792,1.685
                A1.15,1.15,0,0,1,38.459,1.66
                Z
                `,
                fill: 'red',
              },
              {
                d: 'M6.5 1C7.9 1 9 2.1 9 3.5c0 .8-.4 1.6-1.1 2.1-.4.2-.9.4-1.4.4s-1-.2-1.4-.4C4.4 5.1 4 4.3 4 3.5 4 2.1       5.1 1 6.5 1m0-1C4.6 0 3 1.6 3 3.5c0 1.2.6 2.2 1.5 2.9.6.4 1.3.6 2 .6s1.4-.2 2-.6c.9-.7 1.5-1.7 1.5-2.9C10 1.6 8.4 0 6.5 0zm3.6 8.9c.6.8.9 1.7.9 2.6v.5H2v-.5c0-1 .3-1.9.9-2.6 1 .7 2.3 1.1 3.6 1.1s2.6-.4 3.6-1.1m.2-1.4C9.3 8.4 8 9 6.5 9s-2.8-.6-3.8-1.5c-1.1 1-1.7 2.4-1.7 4 0 .5.1 1.5.2 1.5h10.6c.1 0 .2-1 .2-1.5 0-1.6-.7-3-1.7-4z',
                fill: 'blue',
              },
            ]}
            style={styles.canvas}
            viewBox="0 0 25 25"
          />
        </View>
        {SHOULD_SHOW_BLUR_VIEW && <View style={styles.box}>
          <View style={[ styles.blurContentContainer, styles.blurLeftLogo ]}>
            <Image
              style={styles.logo}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
          </View>
          <BlurView
            blurIntensity={1}
            blurType={BlurType.light}
            fallbackColor={'#FFAA77'}
            shouldOverlay={shouldBlurOverlay}
            style={styles.blurContainer}>
            <View style={[ styles.blurContentContainer, styles.blurRightLogo ]}>
              <Animated.Image
                style={[ styles.logo, { transform: [{ translateX: blurImageAnimatedValue.current }]}]}
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              />
            </View>
          </BlurView>
        </View>}
        {[ 'ios', 'macos' ].includes(Platform.OS) && <View style={styles.switchContainer}>
          <Text style={styles.text}>Should blur overlay?</Text>
          <Switch
            onValueChange={setShouldBlurOverlay}
            value={shouldBlurOverlay}
          />
        </View>}
        <LinearGradientView
          colors={[ 'rgba(100,200,250,0.3)', '#7889CC', '#4556BA' ]}
          locations={[ 0.1, 0.7, 0.9 ]}
          startPoint={{ x: 0.1, y: 0.3 }}
          endPoint={{ x: 0.8, y: 0.9 }}
          style={styles.box}
        >
          <Text>ABCD</Text>
        </LinearGradientView>
        <LinearGradientView
          colors={[ 'rgba(50,200,150,0.3)', '#65FF65', '#98EF78' ]}
          locations={[ 0.1, 0.6, 0.9 ]}
          angle={60}
          style={styles.roundedBox}
        >
          <View style={styles.childBox} />
        </LinearGradientView>
        <RadialGradientView
          colors={[ 'rgba(100,200,250,0.3)', '#7889CC', '#4556BA' ]}
          locations={[ 0.1, 0.5, 0.9 ]}
          radius={0.3}
          centerPoint={{ x: 0.3, y: 0.4 }}
          style={styles.roundedBox}
        />
        <AngularGradientView
          colors={[
            'rgba(250,30,30,0.8)',
            'rgba(240,100,50,0.6)',
            'rgba(230,240,50,0.6)',
            '#66FF66',
            'rgba(100,200,250,0.6)',
            '#7889CC',
            '#4556BA',
          ]}
          locations={[ 0, 0.15, 0.3, 0.5, 0.7, 0.85, 1 ]}
          centerPoint={{ x: 0.3, y: 0.4 }}
          style={styles.roundedBox}
        />
        {SHOULD_SHOW_MASK_VIEW && <>
          <MaskedView
            mask={!shouldMaskWithRect
              ? <Image
                style={styles.mask}
                source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
              />
              : <Image
              style={styles.mask}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />}
          >
            <AngularGradientView
              colors={[
                'rgba(250,30,30,0.8)',
                'rgba(240,100,50,0.6)',
                'rgba(230,240,50,0.6)',
                '#66FF66',
                'rgba(100,200,250,0.6)',
                '#7889CC',
                '#4556BA',
              ]}
              locations={[ 0, 0.15, 0.3, 0.5, 0.7, 0.85, 1 ]}
              centerPoint={{ x: 0.3, y: 0.4 }}
              style={styles.roundedBox}
            />
          </MaskedView>
          <View style={styles.switchContainer}>
            <Text style={styles.text}>Should mask with rectangle?</Text>
            <Switch
              onValueChange={setShouldMaskWithRect}
              value={shouldMaskWithRect}
            />
          </View>
        </>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  blurContentContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blurLeftLogo: {
    flexDirection: 'row',
  },
  blurRightLogo: {
    flexDirection: 'row-reverse',
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  text: {
    fontSize: 14,
    margin: 10,
  },
  box: {
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 1,
    height: 200,
    justifyContent: 'center',
    marginVertical: 20,
    width: 200,
  },
  canvas: {
    height: 100,
    width: 100,
  },
  childBox: {
    backgroundColor: 'rgba(250,120,0,0.4)',
    height: 60,
    width: 60,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  green: {
    backgroundColor: 'green',
  },
  logo: {
    height: 100,
    width: 100,
  },
  mask: {
    // backgroundColor: 'yellow',
    height: 80,
    margin: 40,
    width: 80,
  },
  roundedBox: {
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 2,
    height: 200,
    justifyContent: 'center',
    marginVertical: 20,
    width: 200,
  },
  row: {
    flexDirection: 'row',
  },
  scroll: {
    alignSelf: 'stretch',
  },
  scrollContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexGrow: 1,
    padding: 10,
    paddingTop: 50,
  },
});
