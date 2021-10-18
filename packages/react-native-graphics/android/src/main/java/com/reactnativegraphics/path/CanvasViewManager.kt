package com.reactnativegraphics.path

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.reactnativegraphics.GraphicsViewManager

class CanvasViewManager: GraphicsViewManager<CanvasView>() {
  override fun getName(): String { return NAME }

  override fun createViewInstance(reactContext: ThemedReactContext): CanvasView {
    return CanvasView(reactContext)
  }

  @ReactProp(name = "paths")
  fun setPathDefinition(view: CanvasView, paths: ReadableArray) {
    view.setPaths(paths)
  }

  @ReactProp(name = "preserveAspectRatio")
  fun setPreserveAspectRatio(view: CanvasView, preserveAspectRatio: String?) {
    view.setPreserveAspectRatio(preserveAspectRatio)
  }

  @ReactProp(name = "viewBox")
  fun setViewBox(view: CanvasView, viewBox: String?) {
    view.setViewBox(viewBox)
  }

  companion object {
    const val NAME = "RNGCanvasView"
  }
}
