import { useEffect, useRef, useLayoutEffect, useState } from "react"
import {
  motion,
  useTransform,
  useSpring,
  useMotionValue,
  animate
} from "framer-motion"

import "./portfolio.css"

const Portfolio = () => {
  const scrollRef = useRef(null)
  const dx = useMotionValue(0)
  const springDx = useSpring(dx, { stiffness: 80, damping: 20 })
  const [maxScroll, setMaxScroll] = useState(0)

  useLayoutEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current
      const containerWidth = container.offsetWidth

      setMaxScroll(containerWidth - 100)
    }
  }, [])

  const x = useTransform(springDx, [0, maxScroll], [0, -maxScroll])

  useEffect(() => {
    const slider = scrollRef.current

    let mousedown = false
    let startX = 0
    
    // Handle horizontal scrolling with wheel
    const handleWheel = (e) => {
      dx.set(Math.min(Math.max(dx.get() + e.deltaX * 1, 0), maxScroll))
    }

    // Handle horizontal scrolling with mouse
    const handlePointerDown = (e) => {
      console.log("Mouse down")
      mousedown = true
      startX = e.clientX
      slider.setPointerCapture(e.pointerId)
    }

    const handleMouseMove = (e) => {
      if (mousedown) {
        let deltaX = e.clientX - startX
        startX = e.clientX
        dx.set(Math.min(Math.max(dx.get() - deltaX, 0), maxScroll))
      }
    }

    const handlePointerUp = (e) => {
      console.log("Mouse up")
      mousedown = false
      slider.releasePointerCapture(e.pointerId)

      const current = dx.get();
      const clamped = Math.min(Math.max(current, 0), maxScroll);

      if (current !== clamped) {
        animate(dx, clamped, {
          type: "spring",
          stiffness: 80,
          damping: 15,
        });
      }
    }

    const handlePointerCancel = () => {
      mousedown = false
    } 

    slider.addEventListener("wheel", handleWheel, { passive: true })
    slider.addEventListener("pointerdown", handlePointerDown, { passive: true })
    slider.addEventListener("mousemove", handleMouseMove, { passive: true })
    slider.addEventListener("pointerup", handlePointerUp, { passive: true })
    slider.addEventListener("pointercancel", handlePointerCancel)
    slider.addEventListener("pointerleave", handlePointerCancel)

    return () => {
      slider.removeEventListener("wheel", handleWheel)
      slider.removeEventListener("pointerdown", handlePointerDown)
      slider.removeEventListener("mousemove", handleMouseMove)
      slider.removeEventListener("pointerup", handlePointerUp)
      slider.removeEventListener("pointercancel", handlePointerCancel)
      slider.removeEventListener("pointerleave", handlePointerCancel)
    }
  }, [dx, maxScroll])
  

  return (
    <div className="portfolio">
      <div className="text">
        <p>
          LOREM IPSUM&nbsp;
          <span className="fade">
            Tempor reprehenderit culpa incididunt esse excepteur nisi dolor
            cillum fugiat.
          </span>
        </p>
      </div>
      <header>Portfolio</header>
      <motion.div className="slider" ref={scrollRef} style={{ x }}>
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
        <div className="panel" />
      </motion.div>
    </div>
  )
}

export default Portfolio
