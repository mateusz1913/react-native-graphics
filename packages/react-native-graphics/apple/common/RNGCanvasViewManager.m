#import <React/RCTConvert.h>
#import <React/RCTView.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(RNGCanvasViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(paths, NSArray)
RCT_EXPORT_VIEW_PROPERTY(preserveAspectRatio, NSString)
RCT_EXPORT_VIEW_PROPERTY(viewBox, NSString)

@end
