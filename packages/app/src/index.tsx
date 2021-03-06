import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import {
  AngularGradientView,
  BlurType,
  BlurView,
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
  scroll: {
    alignSelf: 'stretch',
  },
  scrollContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexGrow: 1,
    padding: 10,
  },
});
