class RNGCanvasView: RCTView {
    private var parser = RNGCanvasPathParser()

    var shapeLayer: CAShapeLayer {
        return layer as! CAShapeLayer
    }

    #if !os(OSX)
    override open class var layerClass: AnyClass {
        return CAShapeLayer.classForCoder()
    }
    #else
    override func makeBackingLayer() -> CALayer {
        return CAShapeLayer()
    }
    #endif

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
        shapeLayer.needsDisplayOnBoundsChange = true
        shapeLayer.masksToBounds = false
        shapeLayer.frame = frame
    }

    @objc var paths: NSArray = [] {
        didSet {
            setupPaths()
        }
    }

    private var align = "xMidYMid"
    private var meetOrSlice = "meet"
    @objc var preserveAspectRatio = "xMidYMid meet" {
        didSet {
            // https://svgwg.org/svg2-draft/coords.html#ComputingAViewportsTransform
            let matches = preserveAspectRatio.trimmingCharacters(in: [" "]).split(separator: " ")
            align = String(matches[matches.index(0, offsetBy: 0)])
            meetOrSlice = String(matches[matches.index(0, offsetBy: 0)])
            setupPaths()
            setNeedsLayout()
        }
    }

    private var minX: CGFloat = 0.0
    private var minY: CGFloat = 0.0
    private var vbWidth: CGFloat = 100.0
    private var vbHeight: CGFloat = 100.0
    @objc var viewBox = "0 0 100 100" {
        didSet {
            // https://svgwg.org/svg2-draft/coords.html#ComputingAViewportsTransform
            let matches = viewBox.trimmingCharacters(in: [" "]).split(separator: " ").map { viewBoxValue -> CGFloat? in
                guard let viewBoxFloat = Float(viewBoxValue) else {
                    return nil
                }
                return CGFloat(viewBoxFloat)
            }
            if let minX = matches[0] {
                self.minX = minX
            }
            if let minY = matches[1] {
                self.minY = minY
            }
            if let vbWidth = matches[2] {
                self.vbWidth = vbWidth
            }
            if let vbHeight = matches[3] {
                self.vbHeight = vbHeight
            }
            setupPaths()
            setNeedsLayout()
        }
    }

    func setupPaths() {
        self.shapeLayer.sublayers?.forEach({ sublayer in
            sublayer.removeFromSuperlayer()
        })
        parser.canvasPaths.removeAll()
        for p in paths {
            let pathObject = p as! NSDictionary
            let canvasPath = RNGCanvasPath(details: pathObject)
            parser.canvasPaths.append(canvasPath)
        }
        parser.parse()
        for canvasPath in parser.canvasPaths {
            let shapeLayer = CAShapeLayer()
            shapeLayer.path = canvasPath.path.cgPath
            shapeLayer.fillColor = canvasPath.fill?.cgColor
            shapeLayer.fillRule = canvasPath.fillRule
            shapeLayer.lineCap = canvasPath.strokeCap
            shapeLayer.lineJoin = canvasPath.strokeJoin
            shapeLayer.lineWidth = CGFloat(canvasPath.strokeWidth)
            shapeLayer.miterLimit = CGFloat(canvasPath.strokeMiterLimit)
            shapeLayer.strokeColor = canvasPath.stroke?.cgColor
            setMatrix(shapeLayer, with: self.bounds)
            self.shapeLayer.addSublayer(shapeLayer)
        }
    }

    func setMatrix(_ shapeLayer: CAShapeLayer, with bounds: CGRect) {
        let eX: CGFloat = bounds.minX
        let eY: CGFloat = bounds.minY
        let eWidth: CGFloat = bounds.width
        let eHeight: CGFloat = bounds.height

        var scaleX = eWidth / vbWidth
        var scaleY = eHeight / vbHeight

        var translateX = eX - (minX * scaleX)
        var translateY = eY - (minY * scaleY)

        if align != "none" {
            if meetOrSlice == "meet" {
                let minScale = min(scaleX, scaleY)
                scaleX = minScale
                scaleY = minScale
            } else {
                let maxScale = max(scaleX, scaleY)
                scaleX = maxScale
                scaleY = maxScale
            }
        }

        if align.contains("xMid") {
            translateX += (eWidth - vbWidth * scaleX) / 2.0
        }

        if align.contains("xMax") {
            translateX += (eWidth - vbWidth * scaleX)
        }

        if align.contains("YMid") {
            translateY += (eHeight - vbHeight * scaleY) / 2.0
        }

        if align.contains("YMax") {
            translateY += eHeight - vbHeight * scaleY
        }

        print("SCALE", scaleX, scaleY, translateX, translateY)

        let translate = CATransform3DMakeTranslation(translateX, translateY, 0.0)
//        let scale = CATransform3DMakeScale(scaleX, scaleY, 1.0)
        let scale = CATransform3DScale(translate, scaleX, scaleY, 1.0)

//        let transform = CATransform3DConcat(translate, scale)
        
//        shapeLayer.transform = transform
        shapeLayer.transform = scale
    }

    override func reactSetFrame(_ frame: CGRect) {
        super.reactSetFrame(frame)
        setupPaths()
        setNeedsLayout()
    }
}
