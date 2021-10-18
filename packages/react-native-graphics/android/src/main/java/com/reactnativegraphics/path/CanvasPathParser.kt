package com.reactnativegraphics.path

import android.graphics.Path
import android.graphics.PointF
import android.graphics.RectF
import com.facebook.react.uimanager.PixelUtil
import kotlin.math.*

class CanvasPathParser {
  private var mCurrPosition = PointF(0.0f, 0.0f)
  private var mCurrDrawPosition = PointF(0.0f, 0.0f)
  private var mCurrPivotPosition = PointF(0.0f, 0.0f)
  private var mCanvasPaths: MutableList<CanvasPath> = mutableListOf()
  private var mScale = 1.0f
  private var mIsDrawing = false

  val paths: MutableList<CanvasPath>
    get() = mCanvasPaths

  constructor(canvasPaths: MutableList<CanvasPath>, currPosition: PointF, scale: Float) {
    mCanvasPaths = canvasPaths
    mCurrPosition = currPosition
    mCurrDrawPosition = currPosition
    mCurrPivotPosition = currPosition
    mScale = scale
  }

  fun setCanvasPaths(canvasPaths: MutableList<CanvasPath>) {
    mCanvasPaths = canvasPaths
  }

  fun setCurrPosition(currPosition: PointF) {
    mCurrPosition = currPosition
    mCurrDrawPosition = currPosition
    mCurrPivotPosition = currPosition
  }

  fun setScale(scale: Float) {
    mScale = scale
  }

  fun parse() {
    mCanvasPaths.forEach { canvasPath ->
      canvasPath.commands.forEach {
        when (it.command) {
          'M' -> moveTo(canvasPath.path, it.values[0], it.values[1], false)
          'm' -> moveTo(canvasPath.path, it.values[0], it.values[1], true)
          'L' -> lineTo(canvasPath.path, it.values[0], it.values[1], false)
          'l' -> lineTo(canvasPath.path, it.values[0], it.values[1], true)
          'H' -> lineTo(canvasPath.path, it.values[0], mCurrPosition.y, false)
          'h' -> lineTo(canvasPath.path, it.values[0], 0.0f, true)
          'V' -> lineTo(canvasPath.path, mCurrPosition.x, it.values[0], false)
          'v' -> lineTo(canvasPath.path, 0.0f, it.values[0], true)
          'Q' -> quadTo(canvasPath.path, it.values[0], it.values[1], it.values[2], it.values[3], false)
          'q' -> quadTo(canvasPath.path, it.values[0], it.values[1], it.values[2], it.values[3], true)
          'T' -> smoothQuadTo(canvasPath.path, it.values[0], it.values[1], false)
          't' -> smoothQuadTo(canvasPath.path, it.values[0], it.values[1], true)
          'C' -> curveTo(canvasPath.path, it.values[0], it.values[1], it.values[2], it.values[3], it.values[4], it.values[5], false)
          'c' -> curveTo(canvasPath.path, it.values[0], it.values[1], it.values[2], it.values[3], it.values[4], it.values[5], true)
          'S' -> smoothCurveTo(canvasPath.path, it.values[0], it.values[1], it.values[2], it.values[3], false)
          's' -> smoothCurveTo(canvasPath.path, it.values[0], it.values[1], it.values[2], it.values[3], true)
          'A' -> arcTo(
            canvasPath.path,
            it.values[0],
            it.values[1],
            it.values[2],
            it.values[3].toInt() == 1,
            it.values[4].toInt() == 1,
            it.values[5],
            it.values[6]
          )
          'a' -> arcTo(
            canvasPath.path,
            it.values[0],
            it.values[1],
            it.values[2],
            it.values[3].toInt() == 1,
            it.values[4].toInt() == 1,
            mCurrPosition.x + it.values[5],
            mCurrPosition.y + it.values[6]
          )
          'Z' -> close(canvasPath.path)
          'z' -> close(canvasPath.path)
        }
      }
    }
  }

  private fun moveTo(path: Path, x: Float, y: Float, relative: Boolean) {
    if (relative) {
      mCurrPosition.x += x
      mCurrPosition.y += y
      path.rMoveTo(
        PixelUtil.toPixelFromDIP(x) * mScale,
        PixelUtil.toPixelFromDIP(y) * mScale
      )
    } else {
      mCurrPosition.x = x
      mCurrPosition.y = y
      path.moveTo(
        PixelUtil.toPixelFromDIP(x) * mScale,
        PixelUtil.toPixelFromDIP(y) * mScale
      )
    }
    mCurrPivotPosition.x = mCurrPosition.x
    mCurrPivotPosition.y = mCurrPosition.y
  }

  private fun lineTo(path: Path, x: Float, y: Float, relative: Boolean) {
    startDrawIfNeeded()
    if (relative) {
      mCurrPosition.x += x
      mCurrPosition.y += y
      path.rLineTo(
        PixelUtil.toPixelFromDIP(x) * mScale,
        PixelUtil.toPixelFromDIP(y) * mScale
      )
    } else {
      mCurrPosition.x = x
      mCurrPosition.y = y
      path.lineTo(
        PixelUtil.toPixelFromDIP(x) * mScale,
        PixelUtil.toPixelFromDIP(y) * mScale
      )
    }
    mCurrPivotPosition.x = mCurrPosition.x
    mCurrPivotPosition.y = mCurrPosition.y
  }

  private fun quadTo(path: Path, x1: Float, y1: Float, x2: Float, y2: Float, relative: Boolean) {
    startDrawIfNeeded()
    if (relative) {
      path.rQuadTo(
        PixelUtil.toPixelFromDIP(x1) * mScale,
        PixelUtil.toPixelFromDIP(y1) * mScale,
        PixelUtil.toPixelFromDIP(x2) * mScale,
        PixelUtil.toPixelFromDIP(y2) * mScale
      )
      mCurrPivotPosition.x += x1
      mCurrPivotPosition.y += y1
      mCurrPosition.x += x2
      mCurrPosition.y += y2
    } else {
      path.quadTo(
        PixelUtil.toPixelFromDIP(x1) * mScale,
        PixelUtil.toPixelFromDIP(y1) * mScale,
        PixelUtil.toPixelFromDIP(x2) * mScale,
        PixelUtil.toPixelFromDIP(y2) * mScale
      )
      mCurrPivotPosition.x = x1
      mCurrPivotPosition.y = y1
      mCurrPosition.x = x2
      mCurrPosition.y = y2
    }
  }

  private fun smoothQuadTo(path: Path, x: Float, y: Float, relative: Boolean) {
    val x1 = mCurrPosition.x * 2 - mCurrPivotPosition.x
    val y1 = mCurrPosition.y * 2 - mCurrPivotPosition.y
    if (relative) {
      quadTo(path,x1 - mCurrPosition.x, y1 - mCurrPosition.y, x, y, relative)
    } else {
      quadTo(path, x1, y1, x, y, relative)
    }
  }

  private fun curveTo(path: Path, x1: Float, y1: Float, x2: Float, y2: Float,x3: Float, y3: Float, relative: Boolean) {
    startDrawIfNeeded()
    if (relative) {
      path.rCubicTo(
        PixelUtil.toPixelFromDIP(x1) * mScale,
        PixelUtil.toPixelFromDIP(y1) * mScale,
        PixelUtil.toPixelFromDIP(x2) * mScale,
        PixelUtil.toPixelFromDIP(y2) * mScale,
        PixelUtil.toPixelFromDIP(x3) * mScale,
        PixelUtil.toPixelFromDIP(y3) * mScale
      )
      mCurrPivotPosition.x += x2
      mCurrPivotPosition.y += y2
      mCurrPosition.x += x3
      mCurrPosition.y += y3
    } else {
      path.cubicTo(
        PixelUtil.toPixelFromDIP(x1) * mScale,
        PixelUtil.toPixelFromDIP(y1) * mScale,
        PixelUtil.toPixelFromDIP(x2) * mScale,
        PixelUtil.toPixelFromDIP(y2) * mScale,
        PixelUtil.toPixelFromDIP(x3) * mScale,
        PixelUtil.toPixelFromDIP(y3) * mScale
      )
      mCurrPivotPosition.x = x2
      mCurrPivotPosition.y = y2
      mCurrPosition.x = x3
      mCurrPosition.y = y3
    }
  }

  private fun smoothCurveTo(path: Path, x: Float, y: Float, ex: Float, ey: Float, relative: Boolean) {
    val x1 = mCurrPosition.x * 2 - mCurrPivotPosition.x
    val y1 = mCurrPosition.y * 2 - mCurrPivotPosition.y
    mCurrPivotPosition.x = x
    mCurrPivotPosition.y = y
    if (relative) {
      curveTo(path, x1 - mCurrPosition.x, y1 - mCurrPosition.y, x, y, ex, ey, relative)
    } else {
      curveTo(path, x1, y1, x, y, ex, ey, relative)
    }
  }

  private fun arcTo(path: Path, rx: Float, ry: Float, angleInDegrees: Float, largeArcFlag: Boolean, sweepFlag: Boolean, x: Float, y: Float) {
    var radiusX = abs(when {
      rx != 0f -> rx
      ry != 0f -> ry
      else -> x - mCurrPosition.x
    })
    var radiusY = abs(when {
      ry != 0f -> ry
      else -> y - mCurrPosition.y
    })

    if (radiusX == 0f || radiusY == 0f) {
      return lineTo(path, x, y, false)
    }

    if (mCurrPosition.x == x && mCurrPosition.y == y) {
      return
    }

    var xx = x - mCurrPosition.x
    var yy = y - mCurrPosition.y

    val angle = angleInDegrees * (Math.PI.toFloat() / 180.0f)
    val center = PointF(cos(angle) * xx / 2, sin(angle) * yy / 2)

    val rxry = radiusX * radiusY * radiusY * radiusY
    val rycx = radiusY * radiusY * center.x * center.x
    val rxcy = radiusX * radiusX * center.y * center.y
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
      val cxd = -a * center.y * radiusX / radiusY
      val cyd = a * center.x * radiusY / radiusX
      center.x = cos(angle) * cxd - sin(angle) * cyd + xx / 2
      center.y = sin(angle) * cxd + cos(angle) * cyd + yy / 2
    }

    var startAngle = atan2(
      (-sin(angle) / radiusY) * -center.x + (cos(angle) / radiusY) * -center.y,
      (cos(angle) / radiusX) * -center.x + (sin(angle) / radiusX) * -center.y
    )
    val endAngle = atan2(
      (-sin(angle) / radiusY) * (xx - center.x) + (cos(angle) / radiusY) * (yy - center.y),
      (cos(angle) / radiusX) * (xx - center.x) + (sin(angle) / radiusX) * (yy - center.y)
    )

    center.x += mCurrPosition.x
    center.y += mCurrPosition.y
    xx += mCurrPosition.x
    yy += mCurrPosition.y

    startDrawIfNeeded()

    mCurrPosition.x = xx
    mCurrPosition.y = yy
    mCurrPivotPosition.x = xx
    mCurrPivotPosition.y = yy

    if (radiusX != radiusY || angle != 0f) {
      var arc = endAngle - startAngle
      if (arc < 0 && sweepFlag) {
        arc += (Math.PI * 2).toFloat()
      } else if (arc > 0 && !sweepFlag) {
        arc -= (Math.PI * 2).toFloat()
      }

      val n = ceil(abs(round(arc / (Math.PI / 2)))).toInt()
      val step = arc / n
      val k = (4.0f / 3.0f * tan((step / 4.0f)))

      var i = 0
      while (i < n) {
        val cp1x = cos(startAngle) - k * sin(startAngle)
        val cp1y = y + k * cos(startAngle)

        startAngle += step

        val cp2x = cos(startAngle) + k * y
        val cp2y = y - k * cos(startAngle)

        val c1x = center.x + (cos(angle) * radiusX) * cp1x + (-sin(angle) * radiusY) * cp1y
        val c1y = center.y + (sin(angle) * radiusX) * cp1x + (cos(angle) * radiusY) * cp1y
        val c2x = center.x + (cos(angle) * radiusX) * cp2x + (-sin(angle) * radiusY) * cp2y
        val c2y = center.y + (sin(angle) * radiusX) * cp2x + (cos(angle) * radiusY) * cp2y
        val ex = center.x + (cos(angle) * radiusX) * cos(startAngle) + (-sin(angle) * radiusY) * sin(startAngle)
        val ey = center.y + (sin(angle) * radiusX) * cos(startAngle) + (cos(angle) * radiusY) * sin(startAngle)

        path.cubicTo(
          PixelUtil.toPixelFromDIP(c1x) * mScale,
          PixelUtil.toPixelFromDIP(c1y) * mScale,
          PixelUtil.toPixelFromDIP(c2x) * mScale,
          PixelUtil.toPixelFromDIP(c2y) * mScale,
          PixelUtil.toPixelFromDIP(ex) * mScale,
          PixelUtil.toPixelFromDIP(ey) * mScale)
        i++
      }
    } else {
      val startAngleInDegrees = startAngle * 180.0f / Math.PI.toFloat()
      val endAngleInDegrees = endAngle * 180.0f / Math.PI.toFloat()
      var sweep = abs((startAngleInDegrees - endAngleInDegrees) % 360)

      if ((largeArcFlag && sweep < 180f) || (!largeArcFlag && sweep > 180f)) {
        sweep = 360 - sweep
      }

      if (!sweepFlag) {
        sweep = -sweep
      }

      val oval = RectF(
        PixelUtil.toPixelFromDIP(center.x - radiusX) * mScale,
        PixelUtil.toPixelFromDIP(center.y - radiusX) * mScale,
        PixelUtil.toPixelFromDIP(center.x + radiusX) * mScale,
        PixelUtil.toPixelFromDIP(center.y + radiusX) * mScale
      )

      path.arcTo(oval, startAngleInDegrees, sweep)
    }
  }

  private fun close(path: Path) {
    if (!mIsDrawing) {
      return
    }

    mCurrPosition.x = mCurrDrawPosition.x
    mCurrPosition.y = mCurrDrawPosition.y
    mIsDrawing = false
    path.close()
  }

  private fun startDrawIfNeeded() {
    if (mIsDrawing) {
      return
    }

    mCurrDrawPosition.x = mCurrPosition.x
    mCurrDrawPosition.y = mCurrPosition.y
    mIsDrawing = true
  }
}
