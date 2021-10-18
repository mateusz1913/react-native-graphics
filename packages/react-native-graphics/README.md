# `react-native-graphics`

Native components exposing platform graphics classes & functionalities. Library supports Android, iOS, macOS, tvOS & Web

## Table of contents

1. [Requirements & Installation](#Installation)
2. [Usage](#Usage)

- [Gradients](#Gradients)
- [BlurView](#BlurView)
- [MaskedView](#MaskedView)

3. [Contributing](#Contributing)
4. [Licence](#Licence)

## Requirements & Installation <a name="Installation"></a>

Android minSdkVersion >= 21, targetSdkVersion >= 31
iOS >= 11.0
macOS >= 10.14
tvOS >= 11.0

```sh
yarn add react-native-graphics
```

On iOS run additionally

```sh
npx pod-install
```

> :warning: Library on iOS/macOS/tvOS uses Swift. Make sure that your project has bridging header configured (the easiest way is to create empty `.swift` file in XCode, which will offer to create bridging header)

## Usage

### Gradients

Library exposes 3 gradient components which are usual `View` components with custom gradient background:

#### `AngularGradientView`

Angular gradient, known also as a [conic gradient](<#https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient()>), is background with color transitions rotated around specified center point

Example:

```ts
<AngularGradientView
  colors={["red", "blue", "black"]}
  locations={[0, 0.4, 1]}
  centerPoint={{ x: 0.2, y: 0.6 }}
  style={{ height: 200, width: 200 }}
>
  {/** Child views */}
</AngularGradientView>
```

Types:

| Prop        | Type                      | Required |
| ----------- | ------------------------- | -------- |
| colors      | Array<ColorValue>         | true     |
| locations   | Array<number>             | true     |
| centerPoint | { x: number; y: number; } | false    |
| style       | StyleProp<ViewStyle>      | false    |

Supported platforms:

| Platform | Support status                       | Exposed native class                                                                                      |
| -------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| Android  | :white_check_mark:                   | [SweepGradient](#https://developer.android.com/reference/android/graphics/SweepGradient)                  |
| iOS      | :white_check_mark: (from iOS >= 12)  | [CAGradientLayer with .conic type](#https://developer.apple.com/documentation/quartzcore/cagradientlayer) |
| macOS    | :white_check_mark:                   | same as above                                                                                             |
| tvOS     | :white_check_mark: (from tvOS >= 12) | same as above                                                                                             |
| Web      | :white_check_mark:                   | [conic-gradient](<#https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient()>)           |

#### `LinearGradientView`

[Linear gradient](<#https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient()>) is background with color transitions displayed along a straight line

Example:

```ts
<LinearGradientView
  colors={["rgba(50,200,150,0.3)", "#65FF65", "#98EF78"]}
  locations={[0.1, 0.7, 0.9]}
  angle={60}
  angleCenter={{ x: 0.4, y: 0.5 }}
  startPoint={{ x: 0.1, y: 0.3 }}
  endPoint={{ x: 0.8, y: 0.9 }}
  style={{ height: 200, width: 200 }}
>
  {/** Child views */}
</LinearGradientView>
```

Types:

| Prop        | Type                      | Required | Supported platforms |
| ----------- | ------------------------- | -------- | ------------------- |
| colors      | Array<ColorValue>         | true     | all                 |
| locations   | Array<number>             | true     | all                 |
| angle       | number                    | false    | all                 |
| angleCenter | { x: number; y: number; } | false    | all, but Web        |
| endPoint    | { x: number; y: number; } | false    | all, but Web        |
| startPoint  | { x: number; y: number; } | false    | all, but Web        |
| style       | StyleProp<ViewStyle>      | false    | all                 |

Supported platforms:

| Platform | Support status     | Exposed native class                                                                                      |
| -------- | ------------------ | --------------------------------------------------------------------------------------------------------- |
| Android  | :white_check_mark: | [LinearGradient](#https://developer.android.com/reference/android/graphics/LinearGradient)                |
| iOS      | :white_check_mark: | [CAGradientLayer with .axial type](#https://developer.apple.com/documentation/quartzcore/cagradientlayer) |
| macOS    | :white_check_mark: | same as above                                                                                             |
| tvOS     | :white_check_mark: | same as above                                                                                             |
| Web      | :white_check_mark: | [linear-gradient](<#https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient()>)         |

#### `RadialGradientView`

[Radial gradient](<#https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient()>) is background with color transitions radiating from specified center point

Example:

```ts
<RadialGradientView
  colors={["rgba(123,234,250,0.4)", "#6789AB", "#4556BA"]}
  locations={[0.2, 0.6, 0.8]}
  radius={0.4}
  centerPoint={{ x: 0.6, y: 0.5 }}
  style={{ height: 200, width: 200 }}
>
  {/** Child views */}
</RadialGradientView>
```

Types:

| Prop        | Type                      | Required |
| ----------- | ------------------------- | -------- |
| colors      | Array<ColorValue>         | true     |
| locations   | Array<number>             | true     |
| radius      | number                    | true     |
| centerPoint | { x: number; y: number; } | false    |
| style       | StyleProp<ViewStyle>      | false    |

Supported platforms:

| Platform | Support status     | Exposed native class                                                                                       |
| -------- | ------------------ | ---------------------------------------------------------------------------------------------------------- |
| Android  | :white_check_mark: | [RadialGradient](#https://developer.android.com/reference/android/graphics/RadialGradient)                 |
| iOS      | :white_check_mark: | [CAGradientLayer with .radial type](#https://developer.apple.com/documentation/quartzcore/cagradientlayer) |
| macOS    | :white_check_mark: | same as above                                                                                              |
| tvOS     | :white_check_mark: | same as above                                                                                              |
| Web      | :white_check_mark: | [radial-gradient](<#https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient()>)          |

### BlurView

Library exposes native components which are usual `View` components with additional blur behavior

Depending on platform, blur behavior can be different. To achieve consistent behavior on all platforms, set `shouldOverlay` prop to `true` and place all blurred content as child views.

Example:

```ts
<BlurView
  blurIntensity={1}
  blurType={BlurType.light}
  fallbackColor={"#FFAA77"}
  shouldOverlay={true}
  style={{ height: 200, width: 200 }}
>
  {/** Child views */}
</BlurView>
```

Types:

| Prop          | Type                 | Required | Supported platforms |
| ------------- | -------------------- | -------- | ------------------- |
| blurIntensity | number (from 0 to 1) | false    | all                 |
| blurType      | BlurType             | false    | all, but Android    |
| fallbackColor | ColorValue           | false    | all, but Android    |
| shouldOverlay | boolean              | false    | all, but Android    |
| style         | StyleProp<ViewStyle> | false    | all                 |

Supported platforms:

| Platform | Support status                                     | Exposed native class                                                                                                                                                           |
| -------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Android  | :white_check_mark: (from Android API >= Android S) | [RenderEffect.createBlurEffect](<#https://developer.android.com/reference/android/graphics/RenderEffect#createBlurEffect(float,%20float,%20android.graphics.Shader.TileMode)>) |
| iOS      | :white_check_mark:                                 | [UIVisualEffectView effect property](#https://developer.apple.com/documentation/uikit/uivisualeffectview)                                                                      |
| macOS    | :white_check_mark:                                 | [NSVisualEffectView material property](#https://developer.apple.com/documentation/appkit/nsvisualeffectview)                                                                   |
| tvOS     | :white_check_mark:                                 | [UIVisualEffectView effect property](#https://developer.apple.com/documentation/uikit/uivisualeffectview)                                                                      |
| Web      | :white_check_mark:                                 | [backdrop-filter](#https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)                                                                                           |

### MaskedView

Library exposes native components which are usual `View` components that can be masked with custom views

Example:

```ts
<MaskedView mask={/** Mask element */} style={{ height: 200, width: 200 }}>
  {/** Child views */}
</MaskedView>
```

Types:

| Prop  | Type                 | Required | Supported platforms |
| ----- | -------------------- | -------- | ------------------- |
| mask  | React.ReactElement   | true     | iOS, tvOS           |
| style | StyleProp<ViewStyle> | false    | iOS, tvOS           |

Supported platforms:

| Platform | Support status     | Exposed native class                                                                    |
| -------- | ------------------ | --------------------------------------------------------------------------------------- |
| Android  | :x:                |                                                                                         |
| iOS      | :white_check_mark: | [CALayer mask property](#https://developer.apple.com/documentation/quartzcore/calayer/) |
| macOS    | :x:                |                                                                                         |
| tvOS     | :white_check_mark: | [CALayer mask property](#https://developer.apple.com/documentation/quartzcore/calayer/) |
| Web      | :x:                |                                                                                         |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
