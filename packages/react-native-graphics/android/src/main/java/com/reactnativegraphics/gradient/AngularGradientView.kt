package com.reactnativegraphics.gradient

import android.content.Context
import android.graphics.*
import com.facebook.react.bridge.ReadableMap

class AngularGradientView(context: Context?) : GradientView(context) {
  private var mCenterPosX = 0.5f
  private var mCenterPosY = 0.5f

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

  override fun prepareGradient() {
    val colorsSize = mColors.size
    val locationsSize = mLocations.size
    if (colorsSize != locationsSize) {
      return
    }

    mPaint.shader = SweepGradient(
      mCenterPosX * mSize[0],
      mCenterPosY * mSize[1],
      mColors.toIntArray(),
      mLocations.toFloatArray()
    )
    invalidate()
  }
}
