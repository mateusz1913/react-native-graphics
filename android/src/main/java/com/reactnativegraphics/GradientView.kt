package com.reactnativegraphics

import android.content.Context
import android.graphics.*
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.views.view.ReactViewGroup

abstract class GradientView(context: Context?) : ReactViewGroup(context) {
  protected val mPaint = Paint(Paint.ANTI_ALIAS_FLAG)
  protected var mPath: Path = Path()
  protected var mRect: RectF = RectF()

  protected var mColors: MutableList<Int> = mutableListOf(Color.TRANSPARENT, Color.TRANSPARENT)
  protected var mLocations: MutableList<Float> = mutableListOf(0.0f, 1.0f)

  protected var mSize = listOf(0, 0)
  protected var mBorderRadii = mutableListOf(0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f, 0.0f)
  protected var mBorderWidthList = mutableListOf(0.0f, 0.0f, 0.0f, 0.0f)

  fun setColors(colors: ReadableArray?) {
    if (colors == null) {
      return
    }
    mColors.clear()
    val size = colors.size()
    var i = 0
    while (i < size) {
      mColors.add(i, colors.getInt(i))
      i++
    }
    if (mColors.size < 2) {
      mColors = mutableListOf(Color.TRANSPARENT, Color.TRANSPARENT)
    }
    prepareGradient()
  }

  fun setLocations(locations: ReadableArray?) {
    if (locations == null) {
      return
    }
    mLocations.clear()
    val size = locations.size()
    var i = 0
    while (i < size) {
      mLocations.add(i, locations.getDouble(i).toFloat())
      i++
    }
    if (mLocations.size < 2) {
      mLocations = mutableListOf(0.0f, 1.0f)
    }
    prepareGradient()
  }

  override fun setBorderRadius(borderRadius: Float) {
    super.setBorderRadius(borderRadius)
    mBorderRadii = mutableListOf(
      borderRadius,
      borderRadius,
      borderRadius,
      borderRadius,
      borderRadius,
      borderRadius,
      borderRadius,
      borderRadius
    )
    preparePath()
    prepareGradient()
  }

  override fun setBorderRadius(borderRadius: Float, position: Int) {
    super.setBorderRadius(borderRadius, position)
    mBorderRadii[position] = borderRadius
    preparePath()
    prepareGradient()
  }

  override fun setBorderWidth(position: Int, width: Float) {
    super.setBorderWidth(position, width)
    if (position < 0 || position >= 4) {
      return
    }
    mBorderWidthList[position] = width
    preparePath()
    prepareGradient()
  }

  private fun preparePath() {
    mPath.reset()
    mRect.set(
      mBorderWidthList[0],
      mBorderWidthList[1],
      mSize[0].toFloat() - mBorderWidthList[2],
      mSize[1].toFloat() - mBorderWidthList[3]
    )
    mPath.addRoundRect(mRect, mBorderRadii.toFloatArray(), Path.Direction.CW)
  }

  protected abstract fun prepareGradient()

  override fun onSizeChanged(w: Int, h: Int, oldw: Int, oldh: Int) {
    super.onSizeChanged(w, h, oldw, oldh)
    mSize = listOf(w, h)
    preparePath()
    prepareGradient()
  }

  override fun onDraw(canvas: Canvas?) {
    super.onDraw(canvas)
    canvas?.drawPath(mPath, mPaint)
  }
}
