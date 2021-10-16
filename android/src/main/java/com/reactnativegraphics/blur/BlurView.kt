package com.reactnativegraphics.blur

import android.content.Context
import android.graphics.*
import android.os.Build
import android.view.View
import androidx.annotation.RequiresApi
import com.facebook.react.views.view.ReactViewGroup
import com.reactnativegraphics.interpolateBlurRadius

class BlurView(private val reactContext: Context): ReactViewGroup(reactContext) {
  private var blurIntensity: Float = 1F

  fun setBlurIntensity(intensity: Float) {
    blurIntensity = intensity
    postDelayed({
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        setupRenderEffectBlur()
        requestLayout()
      }
    }, 400)
  }

  override fun onDescendantInvalidated(child: View, target: View) {
    super.onDescendantInvalidated(child, target)

    postDelayed({
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        setupRenderEffectBlur()
      }
    }, 400)
  }

  @RequiresApi(Build.VERSION_CODES.S)
  private fun setupRenderEffectBlur() {
    setRenderEffect(
      RenderEffect.createBlurEffect(
        interpolateBlurRadius(blurIntensity),
        interpolateBlurRadius(blurIntensity),
        Shader.TileMode.DECAL
      )
    )
  }
}
