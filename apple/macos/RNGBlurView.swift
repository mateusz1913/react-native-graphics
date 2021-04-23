@objc(RNGBlurView)
class RNGBlurView: RCTView {
    var blurEffectView = NSVisualEffectView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        autoresizesSubviews = true
        clipsToBounds = true
        blurEffectView.frame = frame
        blurEffectView.state = .active
        blurEffectView.blendingMode = .withinWindow
        blurEffectView.autoresizingMask = [.width, .height]
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    @objc var blurType: NSVisualEffectView.Material = NSVisualEffectView.Material.fullScreenUI {
        didSet {
            setNeedsLayout()
        }
    }
    
    @objc var shouldOverlay: Bool = false {
        didSet {
            setNeedsLayout()
        }
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        
        if subviews.contains(blurEffectView) {
            removeReactSubview(blurEffectView)
        }
        blurEffectView.frame = bounds
        blurEffectView.material = blurType
        if subviews.count > 0 {
            if shouldOverlay {
                addSubview(blurEffectView, positioned: .above, relativeTo: subviews[subviews.count - 1])
            } else {
                addSubview(blurEffectView, positioned: .below, relativeTo: subviews[0])
            }
        } else {
            addSubview(blurEffectView)
        }
    }
}
