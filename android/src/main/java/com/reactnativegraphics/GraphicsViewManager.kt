package com.reactnativegraphics

import android.annotation.TargetApi
import android.graphics.Rect
import android.os.Build
import android.view.View
import androidx.annotation.NonNull
import androidx.annotation.Nullable
import com.facebook.react.bridge.JSApplicationIllegalArgumentException
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.PixelUtil
import com.facebook.react.uimanager.Spacing
import com.facebook.react.uimanager.ViewProps
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.annotations.ReactPropGroup
import com.facebook.react.views.view.ReactClippingViewManager
import com.facebook.react.views.view.ReactDrawableHelper
import com.facebook.react.views.view.ReactViewGroup
import com.facebook.yoga.YogaConstants

abstract class GraphicsViewManager<T: ReactViewGroup>: ReactClippingViewManager<T>() {
  @ReactProp(name = "accessible")
  fun setAccessible(view: ReactViewGroup, accessible: Boolean) {
    view.isFocusable = accessible
  }

  @ReactProp(name = "hasTVPreferredFocus")
  fun setTVPreferredFocus(view: ReactViewGroup, hasTVPreferredFocus: Boolean) {
    if (hasTVPreferredFocus) {
      view.isFocusable = true
      view.isFocusableInTouchMode = true
      view.requestFocus()
    }
  }

  @ReactProp(name = "nextFocusDown", defaultInt = View.NO_ID)
  fun nextFocusDown(view: ReactViewGroup, viewId: Int) {
    view.nextFocusDownId = viewId
  }

  @ReactProp(name = "nextFocusForward", defaultInt = View.NO_ID)
  fun nextFocusForward(view: ReactViewGroup, viewId: Int) {
    view.nextFocusForwardId = viewId
  }

  @ReactProp(name = "nextFocusLeft", defaultInt = View.NO_ID)
  fun nextFocusLeft(view: ReactViewGroup, viewId: Int) {
    view.nextFocusLeftId = viewId
  }

  @ReactProp(name = "nextFocusRight", defaultInt = View.NO_ID)
  fun nextFocusRight(view: ReactViewGroup, viewId: Int) {
    view.nextFocusRightId = viewId
  }

  @ReactProp(name = "nextFocusUp", defaultInt = View.NO_ID)
  fun nextFocusUp(view: ReactViewGroup, viewId: Int) {
    view.nextFocusUpId = viewId
  }

  @ReactPropGroup(names = [ViewProps.BORDER_RADIUS, ViewProps.BORDER_TOP_LEFT_RADIUS, ViewProps.BORDER_TOP_RIGHT_RADIUS, ViewProps.BORDER_BOTTOM_RIGHT_RADIUS, ViewProps.BORDER_BOTTOM_LEFT_RADIUS, ViewProps.BORDER_TOP_START_RADIUS, ViewProps.BORDER_TOP_END_RADIUS, ViewProps.BORDER_BOTTOM_START_RADIUS, ViewProps.BORDER_BOTTOM_END_RADIUS])
  fun setBorderRadius(view: ReactViewGroup, index: Int, borderRadiusValue: Float) {
    var borderRadius = borderRadiusValue
    if (!YogaConstants.isUndefined(borderRadius) && borderRadius < 0) {
      borderRadius = YogaConstants.UNDEFINED
    }
    if (!YogaConstants.isUndefined(borderRadius)) {
      borderRadius = PixelUtil.toPixelFromDIP(borderRadius)
    }
    if (index == 0) {
      view.setBorderRadius(borderRadius)
    } else {
      view.setBorderRadius(borderRadius, index - 1)
    }
  }

  @ReactProp(name = "borderStyle")
  fun setBorderStyle(view: ReactViewGroup, borderStyle: String?) {
    view.setBorderStyle(borderStyle)
  }

  @ReactProp(name = "hitSlop")
  fun setHitSlop(view: ReactViewGroup, hitSlop: ReadableMap?) {
    if (hitSlop == null) {
      view.hitSlopRect = null
    } else {
      view.hitSlopRect = Rect(
        if (hitSlop.hasKey("left")) PixelUtil.toPixelFromDIP(hitSlop.getDouble("left")).toInt() else 0,
        if (hitSlop.hasKey("top")) PixelUtil.toPixelFromDIP(hitSlop.getDouble("top")).toInt() else 0,
        if (hitSlop.hasKey("right")) PixelUtil.toPixelFromDIP(hitSlop.getDouble("right")).toInt() else 0,
        if (hitSlop.hasKey("bottom")) PixelUtil.toPixelFromDIP(hitSlop.getDouble("bottom")).toInt() else 0)
    }
  }

  @ReactProp(name = "nativeBackgroundAndroid")
  fun setNativeBackground(view: ReactViewGroup, bg: ReadableMap?) {
    view.setTranslucentBackgroundDrawable(
      if (bg == null) null else ReactDrawableHelper.createDrawableFromJSDescription(view.context, bg))
  }

  @TargetApi(Build.VERSION_CODES.M)
  @ReactProp(name = "nativeForegroundAndroid")
  fun setNativeForeground(view: ReactViewGroup, fg: ReadableMap?) {
    view.foreground = if (fg == null) null else ReactDrawableHelper.createDrawableFromJSDescription(view.context, fg)
  }

  @ReactProp(name = ViewProps.NEEDS_OFFSCREEN_ALPHA_COMPOSITING)
  fun setNeedsOffscreenAlphaCompositing(
    view: ReactViewGroup, needsOffscreenAlphaCompositing: Boolean) {
    view.setNeedsOffscreenAlphaCompositing(needsOffscreenAlphaCompositing)
  }

  @ReactPropGroup(names = [ViewProps.BORDER_WIDTH, ViewProps.BORDER_LEFT_WIDTH, ViewProps.BORDER_RIGHT_WIDTH, ViewProps.BORDER_TOP_WIDTH, ViewProps.BORDER_BOTTOM_WIDTH, ViewProps.BORDER_START_WIDTH, ViewProps.BORDER_END_WIDTH])
  fun setBorderWidth(view: ReactViewGroup, index: Int, widthValue: Float) {
    var width = widthValue
    if (!YogaConstants.isUndefined(width) && width < 0) {
      width = YogaConstants.UNDEFINED
    }
    if (!YogaConstants.isUndefined(width)) {
      width = PixelUtil.toPixelFromDIP(width)
    }
    view.setBorderWidth(SPACING_TYPES[index], width)
  }

  @ReactPropGroup(names = [ViewProps.BORDER_COLOR, ViewProps.BORDER_LEFT_COLOR, ViewProps.BORDER_RIGHT_COLOR, ViewProps.BORDER_TOP_COLOR, ViewProps.BORDER_BOTTOM_COLOR, ViewProps.BORDER_START_COLOR, ViewProps.BORDER_END_COLOR], customType = "Color")
  fun setBorderColor(view: ReactViewGroup, index: Int, color: Int?) {
    val rgbComponent = if (color == null) YogaConstants.UNDEFINED else (color and 0x00FFFFFF).toFloat()
    val alphaComponent = if (color == null) YogaConstants.UNDEFINED else (color ushr 24).toFloat()
    view.setBorderColor(SPACING_TYPES[index], rgbComponent, alphaComponent)
  }

  @ReactProp(name = ViewProps.OVERFLOW)
  fun setOverflow(view: ReactViewGroup, overflow: String?) {
    view.overflow = overflow
  }

  @ReactProp(name = "backfaceVisibility")
  fun setBackfaceVisibility(view: ReactViewGroup, backfaceVisibility: String?) {
    view.setBackfaceVisibility(backfaceVisibility)
  }

  override fun setOpacity(@NonNull view: T, opacity: Float) {
    view.setOpacityIfPossible(opacity)
  }

  override fun setTransform(@NonNull view: T, matrix: ReadableArray?) {
    super.setTransform(view, matrix)
    view.setBackfaceVisibilityDependantOpacity()
  }

  override fun getCommandsMap(): Map<String, Int>? {
    return MapBuilder.of(HOTSPOT_UPDATE_KEY, CMD_HOTSPOT_UPDATE, "setPressed", CMD_SET_PRESSED)
  }

  override fun receiveCommand(root: T, commandId: Int, @Nullable args: ReadableArray?) {
    when (commandId) {
      CMD_HOTSPOT_UPDATE -> {
        handleHotspotUpdate(root, args)
      }
      CMD_SET_PRESSED -> {
        handleSetPressed(root, args)
      }
    }
  }

  override fun receiveCommand(root: T, commandId: String?, @Nullable args: ReadableArray?) {
    when (commandId) {
      HOTSPOT_UPDATE_KEY -> {
        handleHotspotUpdate(root, args)
      }
      "setPressed" -> {
        handleSetPressed(root, args)
      }
    }
  }

  private fun handleSetPressed(root: ReactViewGroup, @Nullable args: ReadableArray?) {
    if (args == null || args.size() != 1) {
      throw JSApplicationIllegalArgumentException(
        "Illegal number of arguments for 'setPressed' command")
    }
    root.isPressed = args.getBoolean(0)
  }

  private fun handleHotspotUpdate(root: ReactViewGroup, @Nullable args: ReadableArray?) {
    if (args == null || args.size() != 2) {
      throw JSApplicationIllegalArgumentException(
        "Illegal number of arguments for 'updateHotspot' command")
    }
    val x = PixelUtil.toPixelFromDIP(args.getDouble(0))
    val y = PixelUtil.toPixelFromDIP(args.getDouble(1))
    root.drawableHotspotChanged(x, y)
  }

  companion object {
    const val CMD_HOTSPOT_UPDATE = 1
    const val CMD_SET_PRESSED = 2
    const val HOTSPOT_UPDATE_KEY = "hotspotUpdate"
    val SPACING_TYPES = listOf(
      Spacing.ALL,
      Spacing.LEFT,
      Spacing.RIGHT,
      Spacing.TOP,
      Spacing.BOTTOM,
      Spacing.START,
      Spacing.END
    )
  }
}
