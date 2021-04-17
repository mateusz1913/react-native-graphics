@objc(LinearGradientViewManager)
class LinearGradientViewManager: RCTViewManager {
    override func view() -> LinearGradientView? {
        return LinearGradientView()
    }
    
    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
