@objc(AngularGradientViewManager)
class AngularGradientViewManager: RCTViewManager {
    override func view() -> AngularGradientView? {
        return AngularGradientView()
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
