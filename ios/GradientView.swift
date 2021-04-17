class GradientView: RCTView {
    var gradientLayer: CAGradientLayer {
        return layer as! CAGradientLayer
    }
    
    override open class var layerClass: AnyClass {
        return CAGradientLayer.classForCoder()
    }
    
    @objc var colors: [CGColor] = [UIColor.clear.cgColor, UIColor.clear.cgColor] {
        didSet {
            if colors.count < 2 {
                gradientLayer.colors = [UIColor.clear.cgColor, UIColor.clear.cgColor]
            } else {
                gradientLayer.colors = colors
            }
        }
    }
    
    @objc var locations: [NSNumber] = [0.0, 1.0] {
        didSet {
            if locations.count < 2 {
                gradientLayer.locations = [0.0, 1.0]
            } else {
                gradientLayer.locations = locations
            }
        }
    }
}
