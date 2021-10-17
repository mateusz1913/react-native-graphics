#import <React/RCTView.h>

@interface RNGBlurView: RCTView

@property (nonatomic, assign) CGFloat blurIntensity;
@property (nonatomic, assign) NSVisualEffectMaterial blurType;
@property (nonatomic, assign) NSColor* fallbackColor;
@property (nonatomic, assign) BOOL shouldOverlay;

@end
