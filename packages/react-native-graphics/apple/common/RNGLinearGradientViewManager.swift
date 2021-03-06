@objc(RNGLinearGradientViewManager)
class RNGLinearGradientViewManager: RCTViewManager {
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }
    override func view() -> RCTView? {
        #if os(OSX)
            return RNGLinearGradientView(frame: CGRect(origin: .zero, size: CGSize(width: 0, height: 0)))
        #else
            return RNGLinearGradientView()
        #endif
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
