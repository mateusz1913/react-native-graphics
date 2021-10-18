package com.reactnativegraphics.path

import android.graphics.Paint
import android.graphics.Path

class CanvasPath {
  /**
   * path definition (e.g. "M 0 0 H 50 V 50 H 0 V 0 Z")
   */
  private var mDefinition: String = ""

  /**
   * extracted commands from definition
   */
  private var mCommands: MutableList<PathCommand> = mutableListOf()

  private var mFill: Int? = null
  private var mFillRule: Path.FillType = Path.FillType.WINDING

  private var mStroke: Int? = null
  private var mStrokeCap: Paint.Cap = Paint.Cap.BUTT
  private var mStrokeJoin: Paint.Join = Paint.Join.MITER
  private var mStrokeMiterLimit: Float = 4f
  private var mStrokeWidth: Float = 1f

  private var mPath: Path = Path()
  private var mPaint: Paint = Paint(Paint.ANTI_ALIAS_FLAG)

  private var mScale: Float = 1f

  val commands: List<PathCommand>
    get() = mCommands

  val path: Path
    get() = mPath

  val paint: Paint
    get() = mPaint

  fun setDefinition(definition: String) {
    mDefinition = definition
    setup()
  }

  fun setFill(fill: Int?) {
    mFill = fill
    if (fill != null) {
      mPaint.style = Paint.Style.FILL
      mPaint.color = fill
    }
  }

  fun setFillRule(fillRule: String) {
    mFillRule = mapFillRule(fillRule)
    mPath.fillType = mFillRule
  }

  fun setScale(scale: Float) {
    mScale = scale
  }

  fun setStroke(stroke: Int?) {
    mStroke = stroke
    if (stroke != null) {
      mPaint.style = Paint.Style.STROKE
      mPaint.color = stroke
    }
  }

  fun setStrokeCap(strokeCap: String) {
    mStrokeCap = mapStrokeCap(strokeCap)
    mPaint.strokeCap = mStrokeCap
  }

  fun setStrokeJoin(strokeJoin: String) {
    mStrokeJoin = mapStrokeJoin(strokeJoin)
    mPaint.strokeJoin = mStrokeJoin
  }

  fun setStrokeMiter(strokeMiterLimit: Float) {
    mStrokeMiterLimit = strokeMiterLimit
    mPaint.strokeMiter = mStrokeMiterLimit * mScale
  }

  fun setStrokeWidth(strokeWidth: Float) {
    mStrokeWidth = strokeWidth
    mPaint.strokeWidth = mStrokeWidth
  }

  private fun setup() {
    mCommands.clear()
    val markersPositions = mCommandRegex.findAll(mDefinition)
    markersPositions.forEach { f ->
      val values = mValuesRegex.findAll(f.value)
      mCommands.add(PathCommand(f.value[0], values.map { it.value.toFloat() }.toList()))
    }
  }

  private fun mapFillRule(fillRule: String): Path.FillType {
    return when (fillRule) {
      "evenodd" -> Path.FillType.EVEN_ODD
      else -> Path.FillType.WINDING
    }
  }
  private fun mapStrokeCap(strokeCap: String): Paint.Cap {
    return when (strokeCap) {
      "butt" -> Paint.Cap.BUTT
      "round" -> Paint.Cap.ROUND
      "square" -> Paint.Cap.SQUARE
      else -> Paint.Cap.BUTT
    }
  }

  private fun mapStrokeJoin(strokeJoin: String): Paint.Join {
    return when (strokeJoin) {
      "bevel" -> Paint.Join.BEVEL
      "miter" -> Paint.Join.MITER
      "round" -> Paint.Join.ROUND
      else -> Paint.Join.MITER
    }
  }

  companion object {
    val mCommandRegex = Regex("[MmLlSsQqHhVvCcTtAaZz](\\s*-?\\d*\\.?\\,?-?\\.?\\d+)*")
    val mValuesRegex = Regex("[-+]?[0-9]*\\.?[0-9]+(?:[eE][-+]?[0-9]+)?")
  }
}
