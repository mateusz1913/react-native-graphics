@objc(RNGCanvasViewManager)
class RNGCanvasViewManager: RCTViewManager {
    @objc override static func requiresMainQueueSetup() -> Bool {
        return false
    }

    override func view() -> RCTView? {
        return RNGCanvasView()
    }

    @objc
    override var methodQueue: DispatchQueue {
        get {
            return DispatchQueue.main
        }
    }
}
