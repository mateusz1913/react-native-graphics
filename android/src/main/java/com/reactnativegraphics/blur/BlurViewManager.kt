package com.reactnativegraphics.blur

import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.reactnativegraphics.GraphicsViewManager

class BlurViewManager: GraphicsViewManager<BlurView>() {
  @ReactProp(name = "blurIntensity")
  fun setBlurIntensity(view: BlurView, radius: Float) {
    view.setBlurIntensity(radius)
  }

  override fun getName() = NAME

  override fun createViewInstance(reactContext: ThemedReactContext): BlurView {
    return BlurView(reactContext)
  }

  companion object {
    const val NAME = "RNGBlurView"
  }
}
