import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  AngularGradientView,
  LinearGradientView,
  RadialGradientView,
} from 'react-native-graphics';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  childBox: {
    backgroundColor: 'rgba(250,120,0,0.4)',
    height: 60,
    width: 60,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
  roundedBox: {
    alignItems: 'center',
    borderRadius: 40,
    borderWidth: 2,
    height: 200,
    justifyContent: 'center',
    marginVertical: 20,
    width: 200,
  },
  scrollContainer: {
    padding: 10,
  },
});
