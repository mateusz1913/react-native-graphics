package com.reactnativegraphics

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class AngularGradientViewManager: GradientViewManager<AngularGradientView>() {
  override fun createViewInstance(reactContext: ThemedReactContext): AngularGradientView {
    return AngularGradientView(reactContext)
  }

  @ReactProp(name = "centerPoint")
  fun setCenterPosition(view: AngularGradientView, centerPosition: ReadableMap?) {
    view.setCenterPosition(centerPosition)
  }

  override fun getName(): String { return NAME }

  companion object {
    const val NAME = "RNGAngularGradientView"
  }
}
