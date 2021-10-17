@objc(RNGBlurView)
class RNGBlurView: RCTView {
    private var blurEffectView = NSVisualEffectView()
    private var fallbackView = NSView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        autoresizesSubviews = true
        clipsToBounds = true
        blurEffectView.frame = frame
        blurEffectView.wantsLayer = true
        blurEffectView.state = .active
        blurEffectView.blendingMode = .withinWindow
        blurEffectView.autoresizingMask = [.width, .height]
        fallbackView.autoresizingMask = [.width, .height]
        fallbackView.frame = frame
        fallbackView.wantsLayer = true
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc var blurIntensity: CGFloat = 1 {
        didSet {
            setNeedsLayout()
        }
    }
    
    @objc var blurType: NSVisualEffectView.Material = NSVisualEffectView.Material.fullScreenUI {
        didSet {
            setNeedsLayout()
        }
    }
    
    @objc var fallbackColor: NSColor? {
        didSet {
            setNeedsLayout()
        }
    }
    
    @objc var shouldOverlay: Bool = false {
        didSet {
            setNeedsLayout()
        }
    }
    
    func isReduceTransparencyEnabled() -> Bool {
        return NSWorkspace.shared.accessibilityDisplayShouldReduceTransparency
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        if subviews.contains(blurEffectView) {
            removeReactSubview(blurEffectView)
        }
        if subviews.contains(fallbackView) {
            removeReactSubview(fallbackView)
        }
        
        var addedView: NSView
        
        if isReduceTransparencyEnabled() {
            fallbackView.frame = bounds
            fallbackView.layer?.backgroundColor = fallbackColor?.cgColor
            addedView = fallbackView
        } else {
            blurEffectView.frame = bounds
            blurEffectView.material = blurType
            blurEffectView.alphaValue = blurIntensity
            addedView = blurEffectView
        }
        if subviews.count == 0 {
            addSubview(addedView)
        } else {
            addSubview(addedView, positioned: shouldOverlay ? .above : .below, relativeTo: subviews[shouldOverlay ? subviews.count - 1 : 0])
        }
    }
}
