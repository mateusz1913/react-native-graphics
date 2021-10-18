class RNGCanvasPathParser {
    var canvasPaths: [RNGCanvasPath] = []

    private var currPosition = CGPoint(x: 0.0, y: 0.0)
    private var currPivotPosition = CGPoint(x: 0.0, y: 0.0)

    func parse() {
        canvasPaths.forEach { canvasPath in
            canvasPath.path.removeAllPoints()
            canvasPath.commands.forEach { pathCommand in
                switch (pathCommand.command) {
                    case "M":
                        let x = CGFloat(pathCommand.values[0])
                        let y = CGFloat(pathCommand.values[1])
                        moveTo(path: canvasPath.path, x: x, y: y)
                        break
                    case "m":
                        let x = currPosition.x + CGFloat(pathCommand.values[0])
                        let y = currPosition.y + CGFloat(pathCommand.values[1])
                        moveTo(path: canvasPath.path, x: x, y: y)
                        break
                    case "L":
                        let x = CGFloat(pathCommand.values[0])
                        let y = CGFloat(pathCommand.values[1])
                        lineTo(path: canvasPath.path, x: x, y: y)
                        break
                    case "l":
                        let x = currPosition.x + CGFloat(pathCommand.values[0])
                        let y = currPosition.y + CGFloat(pathCommand.values[1])
                        lineTo(path: canvasPath.path, x: x, y: y)
                        break
                    case "H":
                        let x = CGFloat(pathCommand.values[0])
                        lineTo(path: canvasPath.path, x: x, y: currPosition.y)
                        break
                    case "h":
                        let x = currPosition.x + CGFloat(pathCommand.values[0])
                        lineTo(path: canvasPath.path, x: x, y: currPosition.y)
                        break
                    case "V":
                        let y = CGFloat(pathCommand.values[0])
                        lineTo(path: canvasPath.path, x: currPosition.x, y: y)
                        break
                    case "v":
                        let y = currPosition.y + CGFloat(pathCommand.values[0])
                        lineTo(path: canvasPath.path, x: currPosition.x, y: y)
                        break
                    case "Q":
                        let cx = CGFloat(pathCommand.values[0])
                        let cy = CGFloat(pathCommand.values[1])
                        let toX = CGFloat(pathCommand.values[2])
                        let toY = CGFloat(pathCommand.values[3])
                        quadTo(path: canvasPath.path, toX: toX, toY: toY, cx: cx, cy: cy)
                        break
                    case "q":
                        let cx = currPivotPosition.x + CGFloat(pathCommand.values[0])
                        let cy = currPivotPosition.y + CGFloat(pathCommand.values[1])
                        let toX = currPosition.x + CGFloat(pathCommand.values[2])
                        let toY = currPosition.y + CGFloat(pathCommand.values[3])
                        quadTo(path: canvasPath.path, toX: toX, toY: toY, cx: cx, cy: cy)
                        break
                    case "T":
                        let toX = CGFloat(pathCommand.values[0])
                        let toY = CGFloat(pathCommand.values[1])
                        smoothQuadTo(path: canvasPath.path, toX: toX, toY: toY, isRelative: false)
                        break
                    case "t":
                        let toX = currPosition.x + CGFloat(pathCommand.values[0])
                        let toY = currPosition.y + CGFloat(pathCommand.values[1])
                        smoothQuadTo(path: canvasPath.path, toX: toX, toY: toY, isRelative: true)
                        break
                    case "C":
                        let cx1 = CGFloat(pathCommand.values[0])
                        let cy1 = CGFloat(pathCommand.values[1])
                        let cx2 = CGFloat(pathCommand.values[2])
                        let cy2 = CGFloat(pathCommand.values[3])
                        let toX = CGFloat(pathCommand.values[4])
                        let toY = CGFloat(pathCommand.values[5])
                        curveTo(path: canvasPath.path, toX: toX, toY: toY, cx1: cx1, cy1: cy1, cx2: cx2, cy2: cy2)
                        break
                    case "c":
                        let cx1 = CGFloat(pathCommand.values[0])
                        let cy1 = CGFloat(pathCommand.values[1])
                        let cx2 = currPivotPosition.x + CGFloat(pathCommand.values[2])
                        let cy2 = currPivotPosition.y + CGFloat(pathCommand.values[3])
                        let toX = currPosition.x + CGFloat(pathCommand.values[4])
                        let toY = currPosition.y + CGFloat(pathCommand.values[5])
                        curveTo(path: canvasPath.path, toX: toX, toY: toY, cx1: cx1, cy1: cy1, cx2: cx2, cy2: cy2)
                    case "S":
                        let ex = CGFloat(pathCommand.values[0])
                        let ey = CGFloat(pathCommand.values[1])
                        let toX = CGFloat(pathCommand.values[2])
                        let toY = CGFloat(pathCommand.values[3])
                        smoothCurveTo(path: canvasPath.path, toX: toX, toY: toY, ex: ex, ey: ey)
                        break
                    case "s":
                        let ex = CGFloat(pathCommand.values[0]) - currPosition.x
                        let ey = CGFloat(pathCommand.values[1]) - currPosition.y
                        let toX = currPosition.x + CGFloat(pathCommand.values[2])
                        let toY = currPosition.y + CGFloat(pathCommand.values[3])
                        smoothCurveTo(path: canvasPath.path, toX: toX, toY: toY, ex: ex, ey: ey)
                        break
                    case "A":
                        let rx = CGFloat(pathCommand.values[0])
                        let ry = CGFloat(pathCommand.values[1])
                        let angleInDegrees = CGFloat(pathCommand.values[2])
                        let largeArcFlag = pathCommand.values[3] == 1.0
                        let sweepFlag = pathCommand.values[4] == 1.0
                        let x = CGFloat(pathCommand.values[5])
                        let y = CGFloat(pathCommand.values[6])
                        arcTo(path: canvasPath.path, rx: rx, ry: ry, angleInDegrees: angleInDegrees, largeArcFlag: largeArcFlag, sweepFlag: sweepFlag, x: x, y: y)
                        break
                    case "a":
                    if pathCommand.values.count != 7 {
                        print(pathCommand.values)
                    }
                        let rx = CGFloat(pathCommand.values[0])
                        let ry = CGFloat(pathCommand.values[1])
                        let angleInDegrees = CGFloat(pathCommand.values[2])
                        let largeArcFlag = pathCommand.values[3] == 1.0
                        let sweepFlag = pathCommand.values[4] == 1.0
                        let x = currPosition.x + CGFloat(pathCommand.values[5])
                        let y = currPosition.y + CGFloat(pathCommand.values[6])
                        arcTo(path: canvasPath.path, rx: rx, ry: ry, angleInDegrees: angleInDegrees, largeArcFlag: largeArcFlag, sweepFlag: sweepFlag, x: x, y: y)
                        break
                    case "Z":
                        close(path: canvasPath.path)
                        break
                    case "z":
                        close(path: canvasPath.path)
                        break
                    default:
                        break
                }
            }
        }
    }

    func moveTo(path: UIBezierPath, x: CGFloat, y: CGFloat) {
        path.move(to: CGPoint(x: x, y: y))
        currPosition.x = x
        currPosition.y = y
        currPivotPosition.x = x
        currPivotPosition.y = y
    }

    func lineTo(path: UIBezierPath, x: CGFloat, y: CGFloat) {
        path.addLine(to: CGPoint(x: x, y: y))
        currPosition.x = x
        currPosition.y = y
        currPivotPosition.x = x
        currPivotPosition.y = y
    }

    func quadTo(path: UIBezierPath, toX: CGFloat, toY: CGFloat, cx: CGFloat, cy: CGFloat) {
        path.addQuadCurve(to: CGPoint(x: toX, y: toY), controlPoint: CGPoint(x: cx, y: cy))
        currPivotPosition.x = cx
        currPivotPosition.y = cy
        currPosition.x = toX
        currPosition.y = toY
    }

    func smoothQuadTo(path: UIBezierPath, toX: CGFloat, toY: CGFloat, isRelative: Bool) {
        let cx = currPosition.x * (isRelative ? 1 : 2) - currPivotPosition.x
        let cy = currPosition.y * (isRelative ? 1 : 2) - currPivotPosition.y
        path.addQuadCurve(to: CGPoint(x: toX, y: toY), controlPoint: CGPoint(x: cx, y: cy))
        currPivotPosition.x = cx
        currPivotPosition.y = cy
        currPosition.x = toX
        currPosition.y = toY
    }

    func curveTo(path: UIBezierPath, toX: CGFloat, toY: CGFloat, cx1: CGFloat, cy1: CGFloat, cx2: CGFloat, cy2: CGFloat) {
        path.addCurve(to: CGPoint(x: toX, y: toY), controlPoint1: CGPoint(x: cx1, y: cy1), controlPoint2: CGPoint(x: cx2, y: cy2))
        currPivotPosition.x = cx2
        currPivotPosition.y = cy2
        currPosition.x = toX
        currPosition.y = toY
    }

    func smoothCurveTo(path: UIBezierPath, toX: CGFloat, toY: CGFloat, ex: CGFloat, ey: CGFloat) {
        let cx = currPosition.x * 2 - currPivotPosition.x
        let cy = currPosition.y * 2 - currPivotPosition.y
        path.addCurve(to: CGPoint(x: toX, y: toY), controlPoint1: CGPoint(x: cx, y: cy), controlPoint2: CGPoint(x: ex, y: ey))
        currPivotPosition.x = ex
        currPivotPosition.y = ey
        currPosition.x = toX
        currPosition.y = toY
    }

    func arcTo(path: UIBezierPath, rx: CGFloat, ry: CGFloat, angleInDegrees: CGFloat, largeArcFlag: Bool, sweepFlag: Bool, x: CGFloat, y: CGFloat) {
        var radiusX = abs(rx != 0 ? rx : ry != 0 ? ry : x - currPosition.x)
        var radiusY = abs(ry != 0 ? ry : y - currPosition.y)

        if radiusX == 0 || radiusY == 0 {
            return lineTo(path: path, x: x, y: y)
        }

        if currPosition.x == x && currPosition.y == y {
            return
        }

        var xx = x - currPosition.x
        var yy = y - currPosition.y

        let angle = angleInDegrees * .pi / 180.0
        var center = CGPoint(x: cos(angle) * xx / 2, y: sin(angle) * yy / 2)

        let rxry = radiusX * radiusY * radiusY * radiusY
        let rycx = radiusY * radiusY * center.x * center.x
        let rxcy = radiusX * radiusX * center.y * center.y
        var a = rxry - rxcy - rycx

        if (a < 0) {
            a = sqrt(1 - a / rxry)
            radiusX *= a
            radiusY *= a
            center.x = xx / 2
            center.y = yy / 2
        } else {
            a = sqrt(a / (rxcy + rycx))
            if (largeArcFlag == sweepFlag) {
                a = -a
            }
            let cxd = -a * center.y * radiusX / radiusY
            let cyd = a * center.x * radiusY / radiusX
            center.x = cos(angle) * cxd - sin(angle) * cyd + xx / 2
            center.y = sin(angle) * cxd + cos(angle) * cyd + yy / 2
        }

        var startAngle = atan2((-sin(angle) / radiusY) * -center.x + (cos(angle) / radiusY) * -center.y, (cos(angle) / radiusX) * -center.x + (sin(angle) / radiusX) * -center.y)
        let endAngle = atan2((-sin(angle) / ry) * (xx - center.x) + (cos(angle) / ry) * (yy - center.y), (cos(angle) / rx) * (xx - center.x) + (sin(angle) / rx) * (yy - center.y))

        center.x += currPosition.x
        center.y += currPosition.y
        xx = currPosition.x + xx
        yy = currPosition.y + yy

        currPosition.x = xx
        currPosition.y = yy
        currPivotPosition.x = xx
        currPivotPosition.y = yy

        if radiusX != radiusY || angle != 0.0 {
            var arc = endAngle - startAngle
            if (arc < 0 && sweepFlag) {
                arc += (.pi * 2.0)
            } else if (arc > 0 && !sweepFlag) {
                arc -= (.pi * 2.0)
            }

            let n = Int(ceil(abs(round(arc / (.pi / 2)))))
            print(arc, n, startAngle, endAngle)
            if n == 0 {
                return
            }
            let step = Int(arc) / n
            let k = (4.0 / 3.0 * tan(Double(step) / 4.0))

            var i = 0
            while (i < n) {
                let cp1x = cos(startAngle) - CGFloat(k) * sin(startAngle)
                let cp1y = y + CGFloat(k) * cos(startAngle)

                startAngle += CGFloat(step)

                let cp2x = cos(startAngle) + CGFloat(k) * y
                let cp2y = y - CGFloat(k) * cos(startAngle)

                let c1x = center.x + (cos(angle) * radiusX) * cp1x + (-sin(angle) * radiusY) * cp1y
                let c1y = center.y + (sin(angle) * radiusX) * cp1x + (cos(angle) * radiusY) * cp1y
                let c2x = center.x + (cos(angle) * radiusX) * cp2x + (-sin(angle) * radiusY) * cp2y
                let c2y = center.y + (sin(angle) * radiusX) * cp2x + (cos(angle) * radiusY) * cp2y
                let ex = center.x + (cos(angle) * radiusX) * cos(startAngle) + (-sin(angle) * radiusY) * sin(startAngle)
                let ey = center.y + (sin(angle) * radiusX) * cos(startAngle) + (cos(angle) * radiusY) * sin(startAngle)

                path.addCurve(to: CGPoint(x: c1x, y: c1y), controlPoint1: CGPoint(x: c2x, y: c2y), controlPoint2: CGPoint(x: ex, y: ey))
                i += 1
            }
        } else {
            path.addArc(withCenter: center, radius: (rx + ry) / 2, startAngle: startAngle, endAngle: endAngle, clockwise: sweepFlag)
        }
    }

    func close(path: UIBezierPath) {
        path.close()
    }
}
