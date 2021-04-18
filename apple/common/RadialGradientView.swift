class RadialGradientView: GradientView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setup()
    }

    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setup()
    }
    
    func setup() {
        #if os(OSX)
        wantsLayer = true
        #endif
        clipsToBounds = true
        gradientLayer.type = .radial
        gradientLayer.needsDisplayOnBoundsChange = true
        gradientLayer.masksToBounds = true
    }
    
    @objc var radius: NSNumber = 0.5 {
        didSet {
            let x = centerPoint.x + CGFloat(radius.floatValue)
            let y = centerPoint.y + CGFloat(radius.floatValue)
            gradientLayer.endPoint = CGPoint(x: x, y: y)
        }
    }
    
    @objc var centerPoint: CGPoint = CGPoint(x: 0.5, y: 0.5) {
        didSet {
            gradientLayer.startPoint = centerPoint
            let x = centerPoint.x + CGFloat(radius.floatValue)
            let y = centerPoint.y + CGFloat(radius.floatValue)
            gradientLayer.endPoint = CGPoint(x: x, y: y)
        }
    }
}
