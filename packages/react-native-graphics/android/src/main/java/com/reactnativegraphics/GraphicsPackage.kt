package com.reactnativegraphics

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.reactnativegraphics.blur.BlurViewManager
import com.reactnativegraphics.gradient.AngularGradientViewManager
import com.reactnativegraphics.gradient.LinearGradientViewManager
import com.reactnativegraphics.gradient.RadialGradientViewManager
import com.reactnativegraphics.path.CanvasViewManager

class GraphicsPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return emptyList()
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
          AngularGradientViewManager(),
          LinearGradientViewManager(),
          RadialGradientViewManager(),
          BlurViewManager(),
          CanvasViewManager()
        )
    }
}
