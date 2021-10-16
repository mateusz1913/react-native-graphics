class RNGMaskedView: RCTView {
    var maskLayer: CALayer?
    
    #if os(OSX)
    override func makeBackingLayer() -> CALayer {
        return CALayer()
    }
    
    override var wantsUpdateLayer: Bool {
        get {
            return true
        }
    }
    #endif
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        #if os(OSX)
        wantsLayer = true
        layer?.delegate = self
        #endif
        clipsToBounds = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    override func didUpdateReactSubviews() {
        guard var subviewsList = reactSubviews() else {
            super.didUpdateReactSubviews()
            return
        }
        let maskView = subviewsList.removeFirst()
        maskView.wantsLayer = true
        maskLayer = maskView.layer
        #if os(OSX)
        // TODO: potential macOS implementation
        #else
        layer.mask = maskLayer
        #endif
        
        for subview in subviewsList {
            addSubview(subview)
        }
    }
    
    #if os(OSX)
    // TODO: potential macOS implementation
    #else
    override func display(_ layer: CALayer) {
        super.display(layer)
        layer.mask = maskLayer
    }
    #endif
}

#if os(OSX)
extension RNGMaskedView: CALayerDelegate {
    func display(_ layer: CALayer) {
        // TODO: potential macOS implementation
        if let maskLayer = maskLayer {
            // It is not working
//            layer.mask = maskLayer
//            layer.frame = bounds
            let mLayer = CAShapeLayer()
            let ovalPath = NSBezierPath(ovalIn: bounds)
            mLayer.path = ovalPath.cgPath
            mLayer.autoresizingMask = [.layerWidthSizable, .layerHeightSizable]
            mLayer.frame = bounds
            mLayer.backgroundColor = NSColor.black.withAlphaComponent(0.2).cgColor
            layer.mask = mLayer
        }
    }
}
#endif

extension NSBezierPath {
    
    /// A `CGPath` object representing the current `NSBezierPath`.
    var cgPath: CGPath {
        let path = CGMutablePath()
        let points = UnsafeMutablePointer<NSPoint>.allocate(capacity: 3)

        if elementCount > 0 {
            var didClosePath = true

            for index in 0..<elementCount {
                let pathType = element(at: index, associatedPoints: points)

                switch pathType {
                case .moveTo:
                    path.move(to: points[0])
                case .lineTo:
                    path.addLine(to: points[0])
                    didClosePath = false
                case .curveTo:
                    path.addCurve(to: points[2], control1: points[0], control2: points[1])
                    didClosePath = false
                case .closePath:
                    path.closeSubpath()
                    didClosePath = true
                @unknown default:
                    break
                }
            }

            if !didClosePath { path.closeSubpath() }
        }

        points.deallocate()
        return path
    }
}

