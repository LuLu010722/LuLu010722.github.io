import { Button } from "antd"
import React, { useState, useEffect, useRef } from "react"
import styles from "../css/DrawableCanvas.module.css"

export default function DrawableCanvas() {
  const canvasRef = useRef(null)
  const rootRef = useRef(null)

  const [pos, setPos] = useState({
    x: 0,
    y: 0
  })
  const [lastPos, setLastPos] = useState({
    x: 0,
    y: 0
  })
  const [isDrawing, setIsDrawing] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isMouseMove, setIsMouseMove] = useState(false)

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d")
    if (isDrawing) {
      ctx.beginPath()
      ctx.strokeStyle = "black"
      ctx.lineWidth = 2
      ctx.moveTo(lastPos.x, lastPos.y)
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      ctx.closePath()
    }
    setLastPos({
      x: pos.x,
      y: pos.y
    })
  }, [isMouseDown, isDrawing, pos])

  const handleMouseDown = (e) => {
    const rect = rootRef.current.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setIsDrawing(true)
    setIsMouseDown(true)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    setIsMouseDown(false)
  }

  const handleMouseMove = (e) => {
    const rect = rootRef.current.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
    setIsMouseMove(true)
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  return (
    <div className={styles["root"]} ref={rootRef}>
      <canvas
        className={styles["canvas"]}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      <Button type="primary" onClick={handleClear}>
        清除
      </Button>
    </div>
  )
}
