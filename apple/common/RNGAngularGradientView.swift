class RNGAngularGradientView: RNGGradientView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func setup() {
        #if os(OSX)
        wantsLayer = true
        #endif
        clipsToBounds = true
        if #available(iOS 12.0, macOS 10.14, *) {
            gradientLayer.type = .conic
        }
        gradientLayer.needsDisplayOnBoundsChange = true
        gradientLayer.masksToBounds = true
    }
    
    @objc var centerPoint: CGPoint = CGPoint(x: 0.5, y: 0.5) {
        didSet {
            gradientLayer.startPoint = centerPoint
            gradientLayer.endPoint = CGPoint(x: 1, y: centerPoint.y)
        }
    }
}
