@objc(RNGBlurViewManager)
class RNGBlurViewManager: RCTViewManager {
    override func view() -> RCTView? {
        return RNGBlurView(frame: CGRect(origin: .zero, size: CGSize(width: 0, height: 0)))
    }
}
