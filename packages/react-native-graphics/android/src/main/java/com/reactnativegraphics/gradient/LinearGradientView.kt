package com.reactnativegraphics.gradient

import android.content.Context
import android.graphics.*
import com.facebook.react.bridge.ReadableMap
import kotlin.math.cos
import kotlin.math.sin
import kotlin.math.sqrt

class LinearGradientView(context: Context?) : GradientView(context) {
  private var mStartPosX = 0.0f
  private var mStartPosY = 0.0f
  private var mEndPosX = 0.0f
  private var mEndPosY = 1.0f
  private var mAngleCenterX = 0.5f
  private var mAngleCenterY = 0.5f
  private var mAngle: Float? = null

  fun setStartPosition(startPos: ReadableMap?) {
    if (startPos == null) {
      return
    }
    mStartPosX = if (startPos.hasKey("x") && !startPos.isNull("x")) {
      startPos.getDouble("x").toFloat()
    } else {
      0.0f
    }
    mStartPosY = if (startPos.hasKey("y") && !startPos.isNull("y")) {
      startPos.getDouble("y").toFloat()
    } else {
      0.0f
    }
    prepareGradient()
  }

  fun setEndPosition(endPos: ReadableMap?) {
    if (endPos == null) {
      return
    }
    mEndPosX = if (endPos.hasKey("x") && !endPos.isNull("x")) {
      endPos.getDouble("x").toFloat()
    } else {
      0.0f
    }
    mEndPosY = if (endPos.hasKey("y") && !endPos.isNull("y")) {
      endPos.getDouble("y").toFloat()
    } else {
      1.0f
    }
    prepareGradient()
  }

  fun setAngle(angle: Float?) {
    mAngle = angle
    prepareGradient()
  }

  fun setAngleCenter(angleCenter: ReadableMap?) {
    if (angleCenter == null) {
      return
    }
    mAngleCenterX = if (angleCenter.hasKey("x") && !angleCenter.isNull("x")) {
      angleCenter.getDouble("x").toFloat()
    } else {
      0.5f
    }
    mAngleCenterY = if (angleCenter.hasKey("y") && !angleCenter.isNull("y")) {
      angleCenter.getDouble("y").toFloat()
    } else {
      0.5f
    }
    prepareGradient()
  }

  private fun computeAngleTranslation(angle: Float): List<Float> {
    val angleRad = (angle - 90.0f) * (Math.PI.toFloat() / 180.0f)
    val length = sqrt(2.0f)

    return listOf(cos(angleRad) * length, sin(angleRad) * length)
  }

  override fun prepareGradient() {
    val colorsSize = mColors.size
    val locationsSize = mLocations.size
    if (colorsSize != locationsSize) {
      return
    }

    var startPos: List<Float> = listOf(mStartPosX, mStartPosY)
    var endPos: List<Float> = listOf(mEndPosX, mEndPosY)
    val angleCenter: List<Float> = listOf(mAngleCenterX, mAngleCenterY)
    val angle = mAngle

    if (angle != null) {
      val angleSize = computeAngleTranslation(angle)
      startPos = listOf(
        angleCenter[0] - angleSize[0] / 2.0f,
        angleCenter[1] - angleSize[1] / 2.0f
      )
      endPos = listOf(
        angleCenter[0] + angleSize[0] / 2.0f,
        angleCenter[1] + angleSize[1] / 2.0f
      )
    }

    mPaint.shader = LinearGradient(
      startPos[0] * mSize[0],
      startPos[1] * mSize[1],
      endPos[0] * mSize[0],
      endPos[1] * mSize[1],
      mColors.toIntArray(),
      mLocations.toFloatArray(),
      Shader.TileMode.CLAMP)
    invalidate()
  }
}
