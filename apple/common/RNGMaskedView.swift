class RNGMaskedView: RCTView {
    var maskLayer: CALayer?
    
    #if os(OSX)
    override func makeBackingLayer() -> CALayer {
        return CALayer()
    }
    #endif
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        #if os(OSX)
        wantsLayer = true
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
