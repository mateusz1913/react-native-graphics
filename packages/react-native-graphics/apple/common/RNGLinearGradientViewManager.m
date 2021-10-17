#import <React/RCTConvert.h>
#import <React/RCTView.h>
#import <React/RCTViewManager.h>

#import "RNGGradientView.h"

@interface RCT_EXTERN_MODULE(RNGLinearGradientViewManager, RCTViewManager)

RCT_CUSTOM_VIEW_PROPERTY(colors, NSArray*, RNGGradientView) {
    NSMutableArray *colors = [NSMutableArray arrayWithCapacity:((NSArray*)json).count];
    for (NSObject *colorString in (NSArray*)json)
    {
        #if TARGET_OS_OSX
            NSColor *color = [colorString isKindOfClass:NSColor.class] ? (NSColor *)colorString : [RCTConvert NSColor:colorString];
            [colors addObject:(id)color.CGColor];
        #else
            UIColor *color = [colorString isKindOfClass:UIColor.class] ? (UIColor *)colorString : [RCTConvert UIColor:colorString];
            [colors addObject:(id)color.CGColor];
        #endif
    }
    [view setColors:colors];
}
RCT_EXPORT_VIEW_PROPERTY(locations, NSArray)
RCT_EXPORT_VIEW_PROPERTY(startPoint, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(endPoint, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(angle, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(angleCenter, CGPoint)

@end
