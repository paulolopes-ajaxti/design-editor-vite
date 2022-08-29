import React, { useRef } from "react"
import { CanvasInstance } from "../editor/canvas"

const useCanvasRef = () => {
  const canvasRef = useRef<CanvasInstance>(null)
  return canvasRef
}

export { useCanvasRef }