#import <React/RCTView.h>
#import <React/RCTViewManager.h>

#import "GradientView.h"

@interface RCT_EXTERN_MODULE(LinearGradientViewManager, RCTViewManager)

RCT_CUSTOM_VIEW_PROPERTY(colors, NSArray*, GradientView) {
    NSMutableArray *colors = [NSMutableArray arrayWithCapacity:((NSArray*)json).count];
    for (NSObject *colorString in (NSArray*)json)
    {
        UIColor *color = [colorString isKindOfClass:UIColor.class] ? (UIColor *)colorString : [RCTConvert UIColor:colorString];
        [colors addObject:(id)color.CGColor];
    }
    [view setColors:colors];
}
RCT_EXPORT_VIEW_PROPERTY(locations, NSArray)
RCT_EXPORT_VIEW_PROPERTY(startPoint, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(endPoint, CGPoint)
RCT_EXPORT_VIEW_PROPERTY(angle, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(angleCenter, CGPoint)

@end
