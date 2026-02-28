import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const followPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const onEnter = (e) => {
      if (e.target.matches('button, a, input, textarea, [data-hover]')) {
        setIsHovering(true)
      }
    }

    const onLeave = (e) => {
      if (e.target.matches('button, a, input, textarea, [data-hover]')) {
        setIsHovering(false)
      }
    }

    const animate = () => {
      if (cursorRef.current && followerRef.current) {
        if (cursorRef.current) {
          cursorRef.current.style.left = pos.current.x - 6 + 'px'
          cursorRef.current.style.top = pos.current.y - 6 + 'px'
        }

        followPos.current.x += (pos.current.x - followPos.current.x) * 0.12
        followPos.current.y += (pos.current.y - followPos.current.y) * 0.12

        if (followerRef.current) {
          const size = isHovering ? 30 : 20
          followerRef.current.style.left = followPos.current.x - size + 'px'
          followerRef.current.style.top = followPos.current.y - size + 'px'
        }
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isHovering, isVisible])

  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={followerRef}
        className={`cursor-follower ${isHovering ? 'hovering' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  )
}
