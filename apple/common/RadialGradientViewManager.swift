@objc(RadialGradientViewManager)
class RadialGradientViewManager: RCTViewManager {
    override func view() -> RCTView? {
        #if os(OSX)
            return RadialGradientView(frame: CGRect(origin: .zero, size: CGSize(width: 0, height: 0)))
        #else
            return RadialGradientView()
        #endif
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
