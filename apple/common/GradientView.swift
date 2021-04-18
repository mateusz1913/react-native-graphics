class GradientView: RCTView {
    var gradientLayer: CAGradientLayer {
        return layer as! CAGradientLayer
    }
    
    #if !os(OSX)
    override open class var layerClass: AnyClass {
        return CAGradientLayer.classForCoder()
    }
    #else
    override func makeBackingLayer() -> CALayer {
        return CAGradientLayer()
    }
    #endif

    #if os(OSX)
    @objc var colors: [CGColor] = [NSColor.clear.cgColor, NSColor.clear.cgColor] {
        didSet {
            if colors.count < 2 {
                gradientLayer.colors = [NSColor.clear.cgColor, NSColor.clear.cgColor]
            } else {
                gradientLayer.colors = colors
            }
        }
    }
    #else
    @objc var colors: [CGColor] = [UIColor.clear.cgColor, UIColor.clear.cgColor]
    {
        didSet {
            if colors.count < 2 {
                gradientLayer.colors = [UIColor.clear.cgColor, UIColor.clear.cgColor]
            } else {
                gradientLayer.colors = colors
            }
        }
    }
    #endif
    
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
