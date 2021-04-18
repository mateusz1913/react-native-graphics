class LinearGradientView: GradientView {
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
        gradientLayer.type = .axial
        gradientLayer.needsDisplayOnBoundsChange = true
        gradientLayer.masksToBounds = true
    }
    
    @objc var startPoint: CGPoint = CGPoint(x: 0.0, y: 0.0) {
        didSet {
            updateStartPoint()
        }
    }

    @objc var endPoint: CGPoint = CGPoint(x: 0.0, y: 1.0) {
        didSet {
            updateEndPoint()
        }
    }
    
    @objc var angle: NSNumber? = nil {
        didSet {
            updateStartPoint()
            updateEndPoint()
        }
    }
    
    @objc var angleCenter: CGPoint = CGPoint(x: 0.5, y: 0.5) {
        didSet {
            updateStartPoint()
            updateEndPoint()
        }
    }
    
    func updateStartPoint() {
        if let angle = angle {
            let size = computeAngleTranslation(CGFloat(truncating: angle))
            gradientLayer.startPoint = CGPoint(x: angleCenter.x - size.width / 2, y: angleCenter.y - size.height / 2)
        } else {
            gradientLayer.startPoint = startPoint
        }
    }
    
    func updateEndPoint() {
        if let angle = angle {
            let size = computeAngleTranslation(CGFloat(truncating: angle))
            gradientLayer.endPoint = CGPoint(x: angleCenter.x + size.width / 2, y: angleCenter.y + size.height / 2)
        } else {
            gradientLayer.endPoint = endPoint
        }
    }
    
    func computeAngleTranslation(_ angle: CGFloat) -> CGSize {
        let angleRad = (CGFloat)(angle - 90) * (CGFloat)(Double.pi / 180)
        let length = CGFloat(sqrt(2))
        return CGSize(width: cos(angleRad) * length, height: sin(angleRad) * length)
    }
}
