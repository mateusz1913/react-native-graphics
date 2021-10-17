package com.reactnativegraphics.gradient

import android.content.Context
import android.graphics.*
import com.facebook.react.bridge.ReadableMap

class RadialGradientView(context: Context?) : GradientView(context) {
  private var mCenterPosX = 0.5f
  private var mCenterPosY = 0.5f
  private var mRadius = 1.0f

  fun setCenterPosition(center: ReadableMap?) {
    if (center == null) {
      return
    }
    mCenterPosX = if (center.hasKey("x") && !center.isNull("x")) {
      center.getDouble("x").toFloat()
    } else {
      0.5f
    }
    mCenterPosY = if (center.hasKey("y") && !center.isNull("y")) {
      center.getDouble("y").toFloat()
    } else {
      0.5f
    }
    prepareGradient()
  }

  fun setRadius(radius: Float?) {
    mRadius = radius ?: 1.0f
    prepareGradient()
  }

  override fun prepareGradient() {
    val colorsSize = mColors.size
    val locationsSize = mLocations.size
    if (colorsSize != locationsSize) {
      return
    }

    val radius = if (mRadius * ((mSize[0] + mSize[1]) / 2) <= 0) {
      1.0f
    } else {
      mRadius * ((mSize[0] + mSize[1]) / 2)
    }
    mPaint.shader = RadialGradient(
      mCenterPosX * mSize[0],
      mCenterPosY * mSize[1],
      radius,
      mColors.toIntArray(),
      mLocations.toFloatArray(),
      Shader.TileMode.CLAMP
    )
    invalidate()
  }
}
