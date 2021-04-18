@objc(AngularGradientViewManager)
class AngularGradientViewManager: RCTViewManager {
    override func view() -> RCTView? {
        #if os(OSX)
            return AngularGradientView(frame: CGRect(origin: .zero, size: CGSize(width: 0, height: 0)))
        #else
            return AngularGradientView()
        #endif
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
