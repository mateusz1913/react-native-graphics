import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import {
  AngularGradientView,
  BlurType,
  BlurView,
  LinearGradientView,
  MaskedView,
  RadialGradientView,
} from 'react-native-graphics';

export default function App() {
  const [ shouldBlurOverlay, setShouldBlurOverlay ] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
      >
        <View style={styles.box}>
          <View style={[ styles.blurContentContainer, styles.blurLeftLogo ]}>
            <Image
              style={styles.logo}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
            />
          </View>
          <BlurView
            blurIntensity={1}
            blurType={BlurType.sidebar}
            fallbackColor={'#FFAA77'}
            shouldOverlay={shouldBlurOverlay}
            style={styles.blurContainer}>
            <View style={[ styles.blurContentContainer, styles.blurRightLogo ]}>
              <Image
                style={styles.logo}
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              />
            </View>
          </BlurView>
        </View>
        <View style={styles.blurSwitchContainer}>
          <Text style={styles.blurText}>Should blur overlay?</Text>
          <Switch
            onValueChange={setShouldBlurOverlay}
            value={shouldBlurOverlay}
          />
        </View>
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
        <MaskedView
          mask={<Image
            style={styles.mask}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
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
  blurSwitchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  blurText: {
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
    backgroundColor: 'yellow',
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
