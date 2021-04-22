@objc(RNGBlurViewManager)
class RNGBlurViewManager: RCTViewManager {
    override func view() -> RCTView? {
        return RNGBlurView()
    }
}
