#import <React/RCTView.h>

@interface RNGBlurView : RCTView

@property (nonatomic, assign) CGFloat blurIntensity;
@property (nonatomic, assign) UIBlurEffectStyle blurType;
@property (nonatomic, assign) UIColor* fallbackColor;
@property (nonatomic, assign) BOOL shouldOverlay;

@end
