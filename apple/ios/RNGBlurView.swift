@objc(RNGBlurView)
class RNGBlurView: RCTView {
    var blurEffectView = UIVisualEffectView()
    var fallbackView = UIView()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        blurEffectView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        blurEffectView.frame = frame
        fallbackView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        fallbackView.frame = frame
        clipsToBounds = true
        NotificationCenter.default.addObserver(self, selector: #selector(setNeedsLayout), name: UIAccessibility.reduceTransparencyStatusDidChangeNotification, object: nil)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self)
    }
    
    @objc var blurType: UIBlurEffect.Style = UIBlurEffect.Style.dark {
        didSet {
            setNeedsLayout()
        }
    }
    
    @objc var fallbackColor: UIColor? {
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
        
        if subviews.contains(fallbackView) {
            removeReactSubview(fallbackView)
        }
        if subviews.contains(blurEffectView) {
            removeReactSubview(blurEffectView)
        }
        if UIAccessibility.isReduceTransparencyEnabled {
            fallbackView.backgroundColor = fallbackColor
            fallbackView.frame = bounds
            insertSubview(fallbackView, at: shouldOverlay ? subviews.count : 0)
        } else {
            let effect = UIBlurEffect(style: blurType)
            blurEffectView.effect = effect
            blurEffectView.frame = bounds
            insertSubview(blurEffectView, at: shouldOverlay ? subviews.count : 0)
        }
    }
}
