package com.reactnativegraphics.path

import android.annotation.SuppressLint
import android.graphics.*
import android.graphics.drawable.ColorDrawable
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.views.view.ReactViewGroup

@SuppressLint("ViewConstructor")
class CanvasView(mContext: ThemedReactContext): ReactViewGroup(mContext) {
  private var mCanvasPathParser: CanvasPathParser = CanvasPathParser(mutableListOf(), START_POSITION, DEFAULT_SCALE)
  private var mMinX: Float = 0f
  private var mMinY: Float = 0f
  private var mVbWidth: Float = 100f
  private var mVbHeight: Float = 100f
  private var mAlign = "xMidYMid"
  private var mMeetOrSlice = "meet"
  private var mScale = DEFAULT_SCALE

  private var mViewBoxRect = RectF(mMinX * mScale, mMinY * mScale, (mMinX + mVbWidth) * mScale, (mMinY + mVbHeight) * mScale)
  private var mElementRect = RectF()
  private var mMatrix = Matrix()

  init {
    /**
     * When style prop has transparent backgroundColor set,
     * ReactViewGroup does not set background drawable and therefore canvas is not visible
     */
    setTranslucentBackgroundDrawable(ColorDrawable(Color.TRANSPARENT))
  }

  fun setPaths(pathsArray: ReadableArray) {
    val size = pathsArray.size()
    var i = 0
    val canvasPaths = mutableListOf<CanvasPath>()
    while (i < size) {
      val pathConfig = pathsArray.getMap(i)
      if (pathConfig.hasKey("d") && !pathConfig.isNull("d")) {
        val definition = pathConfig.getString("d")!!
        val fill = if (pathConfig.hasKey("fill") && !pathConfig.isNull("fill")) {
          pathConfig.getInt("fill")
        } else {
          null
        }
        val fillRule = if (pathConfig.hasKey("fillRule") && !pathConfig.isNull("fillRule")) {
          pathConfig.getString("fillRule")!!
        } else {
          ""
        }
        val stroke = if (pathConfig.hasKey("stroke") && !pathConfig.isNull("stroke")) {
          pathConfig.getInt("stroke")
        } else {
          null
        }
        val strokeCap = if (pathConfig.hasKey("strokeCap") && !pathConfig.isNull("strokeCap")) {
          pathConfig.getString("strokeCap")!!
        } else {
          "butt"
        }
        val strokeJoin = if (pathConfig.hasKey("strokeJoin") && !pathConfig.isNull("strokeJoin")) {
          pathConfig.getString("strokeJoin")!!
        } else {
          "miter"
        }
        val strokeMiterLimit = if (pathConfig.hasKey("strokeMiterLimit") && !pathConfig.isNull("strokeMiterLimit")) {
          PixelUtil.toPixelFromDIP(pathConfig.getDouble("strokeMiterLimit").toFloat())
        } else {
          2f
        }
        val strokeWidth = if (pathConfig.hasKey("strokeWidth") && !pathConfig.isNull("strokeWidth")) {
          PixelUtil.toPixelFromDIP(pathConfig.getDouble("strokeWidth").toFloat())
        } else {
          1f
        }
        val canvasPath = CanvasPath()
        canvasPath.setDefinition(definition)
        canvasPath.setFill(fill)
        canvasPath.setFillRule(fillRule)
        canvasPath.setScale(mScale)
        canvasPath.setStroke(stroke)
        canvasPath.setStrokeCap(strokeCap)
        canvasPath.setStrokeJoin(strokeJoin)
        canvasPath.setStrokeMiter(strokeMiterLimit)
        canvasPath.setStrokeWidth(strokeWidth)
        canvasPaths.add(i, canvasPath)
      }
      i++
    }
    mCanvasPathParser.setCanvasPaths(canvasPaths)
    mCanvasPathParser.parse()
    invalidate()
  }

  fun setPreserveAspectRatio(preserveAspectRatio: String?) {
    // https://svgwg.org/svg2-draft/coords.html#ComputingAViewportsTransform
    if (preserveAspectRatio == null) {
      return
    }

    val preserveAspectRatioParams = preserveAspectRatio.trim().split(Regex("\\s+"))

    mAlign = preserveAspectRatioParams[0]
    mMeetOrSlice = preserveAspectRatioParams[1]

    invalidate()
  }

  fun setViewBox(viewBox: String?) {
    // https://svgwg.org/svg2-draft/coords.html#ComputingAViewportsTransform
    if (viewBox == null) {
      return
    }

    val viewBoxParams = viewBox.trim().split(Regex("\\s+")).map { it.toFloat() }

    if (viewBoxParams.count() != 4) {
      return
    }

    mMinX = viewBoxParams[0]
    mMinY = viewBoxParams[1]
    mVbWidth = viewBoxParams[2]
    mVbHeight = viewBoxParams[3]

    mViewBoxRect = RectF(mMinX * mScale, mMinY * mScale, (mMinX + mVbWidth) * mScale, (mMinY + mVbHeight) * mScale)

    invalidate()
  }

  override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
    super.onMeasure(widthMeasureSpec, heightMeasureSpec)

    invalidate()
  }

  override fun onDraw(canvas: Canvas?) {
    super.onDraw(canvas)

    if (canvas == null) {
      return
    }

    mCanvasPathParser.setCurrPosition(START_POSITION)
    mCanvasPathParser.setScale(DEFAULT_SCALE)

    mCanvasPathParser.paths.forEach { canvasPath ->
      mElementRect.left = 0f
      mElementRect.top = 0f
      mElementRect.right = width.toFloat()
      mElementRect.bottom = height.toFloat()
      setMatrix(mViewBoxRect, mElementRect, mAlign, mMeetOrSlice)
      canvas.concat(mMatrix)
      canvas.drawPath(canvasPath.path, canvasPath.paint)
    }
  }

  override fun setBackgroundColor(color: Int) {
    super.setBackgroundColor(color)

    /**
     * When style prop has transparent backgroundColor set,
     * ReactViewGroup does not set background drawable and therefore canvas is not visible
     */
    if (color == Color.TRANSPARENT) {
      setTranslucentBackgroundDrawable(ColorDrawable(color))
    }
  }

  // https://svgwg.org/svg2-draft/coords.html#ComputingAViewportsTransform
  private fun setMatrix(vbRectF: RectF, eRectF: RectF, align: String, meetOrSlice: String) {
    val vbX = PixelUtil.toPixelFromDIP(vbRectF.left)
    val vbY = PixelUtil.toPixelFromDIP(vbRectF.top)
    val vbWidth = PixelUtil.toPixelFromDIP(vbRectF.width())
    val vbHeight = PixelUtil.toPixelFromDIP(vbRectF.height())

    val eX = eRectF.left
    val eY = eRectF.top
    val eWidth = eRectF.width()
    val eHeight = eRectF.height()

    var scaleX = eWidth / vbWidth
    var scaleY = eHeight / vbHeight

    var translateX = eX - (vbX * scaleX)
    var translateY = eY - (vbY * scaleY)

    if (align != "none") {
      if (meetOrSlice == "meet") {
        val min = scaleX.coerceAtMost(scaleY)
        scaleX = min
        scaleY = min
      } else {
        val max = scaleX.coerceAtLeast(scaleY)
        scaleX = max
        scaleY = max
      }
    }

    if (align.contains("xMid")) {
      translateX += (eWidth - vbWidth * scaleX) / 2.0f
    }

    if (align.contains("xMax")) {
      translateX += (eWidth - vbWidth * scaleX)
    }

    if (align.contains("YMid")) {
      translateY += (eHeight - vbHeight * scaleY) / 2.0f
    }

    if (align.contains("YMax")) {
      translateY += eHeight - vbHeight * scaleY
    }

    mMatrix.reset()
    mMatrix.postTranslate(translateX, translateY)
    mMatrix.preScale(scaleX, scaleY)
  }

  companion object {
    const val DEFAULT_SCALE = 1.0f
    val START_POSITION = PointF(0.0f, 0.0f)
  }
}
