@objc(RNGAngularGradientViewManager)
class RNGAngularGradientViewManager: RCTViewManager {
    override func view() -> RCTView? {
        #if os(OSX)
            return RNGAngularGradientView(frame: CGRect(origin: .zero, size: CGSize(width: 0, height: 0)))
        #else
            return RNGAngularGradientView()
        #endif
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
