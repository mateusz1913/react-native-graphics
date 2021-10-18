class RNGCanvasPath {
    let commandPattern = #"[MmLlSsQqHhVvCcTtAaZz](\s*-?\d*\.?\,?-?\.?\d+)*"#
    let valuesPattern = #"[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?"#

    var commands: [RNGPathCommand] = []

    var d: String
    var fill: UIColor?
    var fillRule: CAShapeLayerFillRule
    var stroke: UIColor?
    var strokeCap: CAShapeLayerLineCap
    var strokeJoin: CAShapeLayerLineJoin
    var strokeMiterLimit: Float
    var strokeWidth: Float

    var path = UIBezierPath()

    init(details: NSDictionary) {
        path.usesEvenOddFillRule = false

        if let d = details["d"] {
            self.d = d as! String
        } else {
            self.d = ""
        }

        if let fillValue = RCTConvert.uiColor(details["fill"]) {
            fill = fillValue
        } else {
            fill = nil
        }

        if let fillRuleValue = details["fillRule"] {
            fillRule = RCTConvert.fillRule(fillRuleValue)
        } else {
            fillRule = .nonZero
        }

        if let strokeValue = RCTConvert.uiColor(details["stroke"]) {
            stroke = strokeValue
        } else {
            stroke = nil
        }

        if let strokeCapValue = details["strokeCap"] {
            strokeCap = RCTConvert.strokeCap(strokeCapValue)
        } else {
            strokeCap = .butt
        }

        if let strokeJoinValue = details["strokeJoin"] {
            strokeJoin = RCTConvert.strokeJoin(strokeJoinValue)
        } else {
            strokeJoin = .miter
        }

        if let strokeMiterLimitValue = details["strokeMiterLimit"] {
            strokeMiterLimit = strokeMiterLimitValue as! Float
        } else {
            strokeMiterLimit = 2.0
        }

        if let strokeWidthValue = details["strokeWidth"] {
            strokeWidth = strokeWidthValue as! Float
        } else {
            strokeWidth = 1.0
        }

        setup()
    }

    func setup() {
        commands.removeAll()
        let commandRegex = try! NSRegularExpression(pattern: commandPattern, options: [])
        let valuesRegex = try! NSRegularExpression(pattern: valuesPattern, options: [])
        let definition = self.d as NSString
        let definitionRange = NSRange(
            self.d.startIndex..<self.d.endIndex,
            in: self.d
        )
        let markersPositions = commandRegex.matches(in: self.d, options: [], range: definitionRange)
        markersPositions.forEach { position in
            let positionString = definition.substring(with: position.range)
            let positionRange = NSRange(
                positionString.startIndex..<positionString.endIndex,
                in: positionString
            )
            let values = valuesRegex.matches(in: positionString, options: [], range: positionRange)
            let valuesArray = values.map { valueResult -> Float in
                let valueString = (positionString as NSString).substring(with: valueResult.range)
                let valueFloat = Float.init(valueString)
                return valueFloat!
            }
            let pathCommand = RNGPathCommand(command: positionString[positionString.index(positionString.startIndex, offsetBy: 0)], values: valuesArray)
            
            if pathCommand.command == "a" && pathCommand.values.count != 7 {
                print("ABCD", pathCommand.values, values)
            }
            self.commands.append(pathCommand)
        }
    }
}

@objc extension RCTConvert {
    @objc(fillRule:)
    class func fillRule(_ json: Any) -> CAShapeLayerFillRule {
        let fillRuleValue = RCTConvert.nsString(json)
        if fillRuleValue == "evenodd" {
            return .evenOdd
        }
        return .nonZero
    }

    @objc(strokeCap:)
    class func strokeCap(_ json: Any) -> CAShapeLayerLineCap {
        let strokeCapValue = RCTConvert.nsString(json)
        if strokeCapValue == "butt" {
            return .butt
        }
        if strokeCapValue == "round" {
            return .round
        }
        if strokeCapValue == "square" {
            return .square
        }
        return .butt
    }

    @objc(strokeJoin:)
    class func strokeJoin(_ json: Any) -> CAShapeLayerLineJoin {
        let strokeJoinValue = RCTConvert.nsString(json)
        if strokeJoinValue == "bevel" {
            return .bevel
        }
        if strokeJoinValue == "miter" {
            return .miter
        }
        if strokeJoinValue == "round" {
            return .round
        }
        return .miter
    }
}
