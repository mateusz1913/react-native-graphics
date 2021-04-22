@objc(RNGRadialGradientViewManager)
class RNGRadialGradientViewManager: RCTViewManager {
    override func view() -> RCTView? {
        #if os(OSX)
            return RNGRadialGradientView(frame: CGRect(origin: .zero, size: CGSize(width: 0, height: 0)))
        #else
            return RNGRadialGradientView()
        #endif
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
