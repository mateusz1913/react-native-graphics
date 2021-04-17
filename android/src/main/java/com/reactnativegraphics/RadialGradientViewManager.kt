package com.reactnativegraphics

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class RadialGradientViewManager: GradientViewManager<RadialGradientView>() {
  override fun createViewInstance(reactContext: ThemedReactContext): RadialGradientView {
    return RadialGradientView(reactContext)
  }

  @ReactProp(name = "centerPoint")
  fun setCenterPosition(view: RadialGradientView, centerPosition: ReadableMap?) {
    view.setCenterPosition(centerPosition)
  }

  @ReactProp(name = "radius")
  fun setRadius(view: RadialGradientView, radius: Float) {
    view.setRadius(radius)
  }

  override fun getName(): String { return NAME }

  companion object {
    const val NAME = "RadialGradientView"
  }
}
