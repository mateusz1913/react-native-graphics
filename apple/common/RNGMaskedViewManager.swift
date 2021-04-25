@objc(RNGMaskedViewManager)
class RNGMaskedViewManager: RCTViewManager {
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    override func view() -> RCTView? {
        #if os(OSX)
            return RNGMaskedView(frame: CGRect(origin: .zero, size: CGSize(width: 0, height: 0)))
        #else
            return RNGMaskedView()
        #endif
    }
}
