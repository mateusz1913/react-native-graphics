@objc(LinearGradientViewManager)
class LinearGradientViewManager: RCTViewManager {
    override func view() -> RCTView? {
        #if os(OSX)
            return LinearGradientView(frame: CGRect(origin: .zero, size: CGSize(width: 0, height: 0)))
        #else
            return LinearGradientView()
        #endif
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
