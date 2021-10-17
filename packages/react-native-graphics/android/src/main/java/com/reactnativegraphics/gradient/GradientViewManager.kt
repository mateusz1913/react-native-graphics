package com.reactnativegraphics.gradient

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.annotations.ReactProp
import com.reactnativegraphics.GraphicsViewManager

abstract class GradientViewManager<T: GradientView>: GraphicsViewManager<T>() {
  @ReactProp(name = "colors")
  fun setColors(view: T, colors: ReadableArray?) {
    view.setColors(colors)
  }

  @ReactProp(name = "locations")
  fun setLocations(view: T, positions: ReadableArray?) {
    view.setLocations(positions)
  }
}
