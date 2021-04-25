@objc(RNGBlurViewManager)
class RNGBlurViewManager: RCTViewManager {
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    override func view() -> RCTView? {
        return RNGBlurView()
    }
}
