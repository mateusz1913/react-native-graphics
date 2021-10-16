#import <React/RCTView.h>
#import <React/RCTViewManager.h>

#import "RNGBlurView.h"

@interface RCTConvert (NSVisualEffectView)

+ (NSVisualEffectMaterial)NSVisualEffectMaterial:(id)json;

@end

@implementation RCTConvert (NSVisualEffectView)

RCT_ENUM_CONVERTER(NSVisualEffectMaterial, (@{
    @"contentBackground": @(NSVisualEffectMaterialContentBackground),
    @"fullScreenUI": @(NSVisualEffectMaterialFullScreenUI),
    @"headerView": @(NSVisualEffectMaterialHeaderView),
    @"hudWindow": @(NSVisualEffectMaterialHUDWindow),
    @"menu": @(NSVisualEffectMaterialMenu),
    @"popover": @(NSVisualEffectMaterialPopover),
    @"selection": @(NSVisualEffectMaterialSelection),
    @"sheet": @(NSVisualEffectMaterialSheet),
    @"sidebar": @(NSVisualEffectMaterialSidebar),
    @"titleBar": @(NSVisualEffectMaterialTitlebar),
    @"tooltip": @(NSVisualEffectMaterialToolTip),
    @"underPageBackground": @(NSVisualEffectMaterialUnderPageBackground),
    @"underWindowBackground": @(NSVisualEffectMaterialUnderWindowBackground),
    @"windowBackground": @(NSVisualEffectMaterialWindowBackground),
}), NSVisualEffectMaterialFullScreenUI, integerValue)

@end

@interface RCT_EXTERN_MODULE(RNGBlurViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(blurIntensity, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(blurType, NSVisualEffectMaterial)
RCT_CUSTOM_VIEW_PROPERTY(fallbackColor, NSColor, RNGBlurView)
{
    [view setFallbackColor:[RCTConvert NSColor:json]];
}
RCT_EXPORT_VIEW_PROPERTY(shouldOverlay, BOOL)

@end
