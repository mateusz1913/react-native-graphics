package com.reactnativegraphics

import kotlin.math.abs

fun interpolate(x: Float, inputStart: Float, inputEnd: Float, outputStart: Float, outputEnd: Float): Float {
  return outputStart + abs((outputEnd - outputStart) / (inputEnd - inputStart) * (x - inputStart))
}

fun interpolateBlurRadius(blurRadius: Float): Float {
  return interpolate(blurRadius, 0F, 1F, 1F, 25F)
}
