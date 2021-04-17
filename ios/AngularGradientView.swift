class AngularGradientView: GradientView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    func setup() {
        if #available(iOS 12.0, *) {
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
