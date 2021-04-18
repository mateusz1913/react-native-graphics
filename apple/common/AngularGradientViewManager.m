#import <React/RCTConvert.h>
#import <React/RCTView.h>
#import <React/RCTViewManager.h>

#import "GradientView.h"

@interface RCT_EXTERN_MODULE(AngularGradientViewManager, RCTViewManager)

RCT_CUSTOM_VIEW_PROPERTY(colors, NSArray*, GradientView) {
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
RCT_EXPORT_VIEW_PROPERTY(positions, NSArray)
RCT_EXPORT_VIEW_PROPERTY(centerPoint, CGPoint)

@end
