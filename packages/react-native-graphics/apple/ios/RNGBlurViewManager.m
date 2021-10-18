#import <React/RCTConvert.h>
#import <React/RCTView.h>
#import <React/RCTViewManager.h>
#import <UIKit/UIKit.h>

#import "RNGBlurView.h"

@interface RCTConvert (UIBlurEffect)

+ (UIBlurEffectStyle)UIBlurEffectStyle:(id)json;

@end

@implementation RCTConvert (UIBlurEffect)

RCT_ENUM_CONVERTER(UIBlurEffectStyle, (@{
    @"dark": @(UIBlurEffectStyleDark),
    @"light": @(UIBlurEffectStyleLight),
    @"prominent": @(UIBlurEffectStyleProminent),
    @"regular": @(UIBlurEffectStyleRegular),
    @"xlight": @(UIBlurEffectStyleExtraLight),
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000 || __TV_OS_VERSION_MAX_ALLOWED >= 130000
    @"chromeMaterial": @(UIBlurEffectStyleSystemChromeMaterial),
    @"chromeMaterialDark": @(UIBlurEffectStyleSystemChromeMaterialDark),
    @"chromeMaterialLight": @(UIBlurEffectStyleSystemChromeMaterialLight),
    @"material": @(UIBlurEffectStyleSystemMaterial),
    @"materialDark": @(UIBlurEffectStyleSystemMaterialDark),
    @"materialLight": @(UIBlurEffectStyleSystemMaterialLight),
    @"thickMaterial": @(UIBlurEffectStyleSystemThickMaterial),
    @"thickMaterialDark": @(UIBlurEffectStyleSystemThickMaterialDark),
    @"thickMaterialLight": @(UIBlurEffectStyleSystemThickMaterialLight),
    @"thinMaterial": @(UIBlurEffectStyleSystemThinMaterial),
    @"thinMaterialDark": @(UIBlurEffectStyleSystemThinMaterialDark),
    @"thinMaterialLight": @(UIBlurEffectStyleSystemThinMaterialLight),
    @"ultraThinMaterial": @(UIBlurEffectStyleSystemUltraThinMaterial),
    @"ultraThinMaterialDark": @(UIBlurEffectStyleSystemUltraThinMaterialDark),
    @"ultraThinMaterialLight": @(UIBlurEffectStyleSystemUltraThinMaterialLight),
#endif
}), UIBlurEffectStyleDark, integerValue)

@end

@interface RCT_EXTERN_MODULE(RNGBlurViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(blurIntensity, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(blurType, UIBlurEffectStyle)
RCT_CUSTOM_VIEW_PROPERTY(fallbackColor, UIColor, RNGBlurView) {
    [view setFallbackColor:[RCTConvert UIColor:json]];
}
RCT_EXPORT_VIEW_PROPERTY(shouldOverlay, BOOL)

@end
