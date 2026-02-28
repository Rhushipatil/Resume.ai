import { useEffect, useRef } from 'react'

export default function ParticleBackground({ isDark }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef([])
  const animRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouse)

    // Create particles
    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.baseX = this.x
        this.baseY = this.y
        this.density = Math.random() * 20 + 5
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.opacity = Math.random() * 0.5 + 0.1
        this.color = this.getColor()
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.02 + 0.005
      }
      getColor() {
        const colors = [
          `rgba(108, 92, 231, `,
          `rgba(168, 85, 247, `,
          `rgba(0, 210, 255, `,
          `rgba(59, 130, 246, `,
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }
      update(mouse) {
        this.pulse += this.pulseSpeed
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const forceDir = { x: dx / dist, y: dy / dist }
        const maxDist = 120
        const force = (maxDist - dist) / maxDist

        if (dist < maxDist) {
          this.x -= forceDir.x * force * this.density * 0.5
          this.y -= forceDir.y * force * this.density * 0.5
        } else {
          if (this.x !== this.baseX) {
            const dx2 = this.x - this.baseX
            this.x -= dx2 / 12
          }
          if (this.y !== this.baseY) {
            const dy2 = this.y - this.baseY
            this.y -= dy2 / 12
          }
        }

        this.baseX += this.vx
        this.baseY += this.vy

        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1
      }
      draw(ctx) {
        const currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse))
        ctx.fillStyle = `${this.color}${currentOpacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const count = Math.min(120, Math.floor((canvas.width * canvas.height) / 12000))
    particlesRef.current = Array.from({ length: count }, () => new Particle())

    const drawConnections = () => {
      const particles = particlesRef.current
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            const opacity = (1 - dist / 100) * 0.12
            ctx.strokeStyle = `rgba(108, 92, 231, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach(p => {
        p.update(mouseRef.current)
        p.draw(ctx)
      })
      drawConnections()
      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: isDark ? 1 : 0.4 }}
    />
  )
}
