package com.reactnativegraphics

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.*
import com.facebook.react.uimanager.annotations.ReactProp

class LinearGradientViewManager: GradientViewManager<LinearGradientView>() {
  override fun createViewInstance(reactContext: ThemedReactContext): LinearGradientView {
    return LinearGradientView(reactContext)
  }

  @ReactProp(name = "startPoint")
  fun setStartPosition(view: LinearGradientView, startPosition: ReadableMap?) {
    view.setStartPosition(startPosition)
  }

  @ReactProp(name = "endPoint")
  fun setEndPosition(view: LinearGradientView, endPosition: ReadableMap?) {
    view.setEndPosition(endPosition)
  }

  @ReactProp(name = "angle")
  fun setAngle(view: LinearGradientView, angle: Float) {
    view.setAngle(angle)
  }

  @ReactProp(name = "angleCenter")
  fun setAngleCenter(view: LinearGradientView, angleCenter: ReadableMap?) {
    view.setAngleCenter(angleCenter)
  }

  override fun getName(): String { return NAME }

  companion object {
    const val NAME = "RNGLinearGradientView"
  }
}
