@objc(RadialGradientViewManager)
class RadialGradientViewManager: RCTViewManager {
    override func view() -> RadialGradientView? {
        return RadialGradientView()
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
