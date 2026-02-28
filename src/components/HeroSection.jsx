import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

const headlines = [
  "Optimize Your Resume with",
  "Land More Interviews with",
  "Supercharge Your Career with",
]

export default function HeroSection({ isDark }) {
  const [headlineIndex, setHeadlineIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const canvasRef = useRef(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cardRef = useRef(null)

  // Rotate typewriter text
  useEffect(() => {
    const text = headlines[headlineIndex]
    let i = 0
    setDisplayText('')
    setIsTyping(true)

    const typeTimer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, ++i))
      } else {
        clearInterval(typeTimer)
        setIsTyping(false)
        setTimeout(() => {
          setHeadlineIndex(prev => (prev + 1) % headlines.length)
        }, 2500)
      }
    }, 45)

    return () => clearInterval(typeTimer)
  }, [headlineIndex])

  // Three.js globe / orb in background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100)
    camera.position.z = 4

    // Torus knot geometry
    const geo = new THREE.TorusKnotGeometry(1.2, 0.35, 256, 32)
    const mat = new THREE.MeshPhongMaterial({
      color: 0x6c5ce7,
      emissive: 0x2d1b69,
      specular: 0xa855f7,
      shininess: 100,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    })
    const wireMesh = new THREE.Mesh(geo, wireMat)
    scene.add(wireMesh)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x6c5ce7, 3, 10)
    pointLight1.position.set(3, 3, 3)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x00d2ff, 2, 10)
    pointLight2.position.set(-3, -2, 2)
    scene.add(pointLight2)

    const pointLight3 = new THREE.PointLight(0xa855f7, 2, 10)
    pointLight3.position.set(0, -3, -2)
    scene.add(pointLight3)

    // Particle field
    const particleCount = 300
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 12
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0x6c5ce7,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    let mouseXVal = 0, mouseYVal = 0
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseXVal = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseYVal = -((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    let frame = 0
    const animate = () => {
      frame++
      mesh.rotation.x += 0.003 + mouseYVal * 0.001
      mesh.rotation.y += 0.005 + mouseXVal * 0.001
      wireMesh.rotation.copy(mesh.rotation)
      particles.rotation.y += 0.0005
      pointLight1.position.x = Math.sin(frame * 0.02) * 5
      pointLight2.position.x = Math.cos(frame * 0.015) * 5
      renderer.render(scene, camera)
      return requestAnimationFrame(animate)
    }
    const animId = animate()

    const handleResize = () => {
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight)
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      renderer.dispose()
    }
  }, [])

  // 3D card tilt
  const handleCardMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 })

  const stats = [
    { value: '94%', label: 'ATS Pass Rate' },
    { value: '3x', label: 'More Interviews' },
    { value: '<30s', label: 'Generation Time' },
  ]

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden" id="hero">
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: isDark ? 0.35 : 0.15 }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary-500/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-purple/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-accent-cyan/5 blur-[80px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
              <span className={`text-xs font-medium ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                AI-Powered Resume Optimization
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-500/20 text-primary-300 text-[10px] font-semibold">NEW</span>
            </motion.div>

            {/* Headline */}
            <div className="mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className={`font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                <span className="block min-h-[1.15em]">
                  {displayText}
                  <motion.span
                    animate={{ opacity: isTyping ? [1, 0, 1] : 0 }}
                    transition={{ duration: 0.7, repeat: isTyping ? Infinity : 0 }}
                    className="inline-block w-1 h-14 ml-2 bg-primary-500 rounded-sm align-middle"
                  />
                </span>
                <span className="block gradient-text">AI Intelligence</span>
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-lg leading-relaxed mb-10 max-w-lg ${isDark ? 'text-white/55' : 'text-gray-500'}`}
            >
              Transform any resume into an ATS-optimized powerhouse. Our AI extracts smart keywords from job descriptions
              and rewrites your resume to beat applicant tracking systems every time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <motion.a
                href="#workflow"
                className="btn-primary text-base px-8 py-4 rounded-2xl flex items-center gap-3"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="relative z-10">Optimize My Resume</span>
              </motion.a>

              <motion.a
                href="#features"
                className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-medium glass border transition-all ${
                  isDark ? 'border-white/10 text-white/70 hover:text-white hover:border-white/20' : 'border-black/10 text-gray-700 hover:border-black/20'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <div className={`font-display text-3xl font-bold gradient-text`}>{stat.value}</div>
                  <div className={`text-xs mt-0.5 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Resume Card */}
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: -20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.4, duration: 0.9, type: 'spring' }}
            className="flex justify-center relative"
            style={{ perspective: 1200 }}
            onMouseMove={handleCardMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0) }}
          >
            {/* Glow blob behind card */}
            <div className="absolute inset-0 m-auto w-4/5 h-4/5 bg-gradient-to-br from-primary-500/20 to-accent-purple/20 rounded-full blur-[60px] pointer-events-none" />

            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative w-full max-w-sm"
            >
              {/* Shadow card */}
              <div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-600/30 to-accent-purple/20 blur-2xl"
                style={{ transform: 'translateZ(-40px) scale(0.95)', transformStyle: 'preserve-3d' }}
              />

              {/* Main resume card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative glass rounded-3xl p-6 border border-white/10 overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
                />

                {/* Scan line overlay */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div className="scan-line" />
                </div>

                {/* Resume content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-accent-purple flex items-center justify-center text-white font-bold text-lg shadow-glow-sm">
                      PT
                    </div>
                    <div>
                      <div className={`font-display font-bold text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>Prince Thakur</div>
                      <div className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Senior Software Engineer</div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-emerald-400 text-xs">ATS Score: 94%</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <a href="https://github.com/princethakur931" target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary-300 hover:text-primary-200 underline">GitHub</a>
                        <a href="https://www.linkedin.com/in/prince-thakur-578919272/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary-300 hover:text-primary-200 underline">LinkedIn</a>
                      </div>
                    </div>
                    <motion.div
                      className="ml-auto px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                      animate={{ boxShadow: ['0 0 0 rgba(16,185,129,0)', '0 0 12px rgba(16,185,129,0.3)', '0 0 0 rgba(16,185,129,0)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-emerald-400 text-xs font-semibold">Optimized</span>
                    </motion.div>
                  </div>

                  {/* Lines */}
                  <ResumeLines isDark={isDark} />

                  {/* Skills chips */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'Python'].map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 + i * 0.1, type: 'spring' }}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary-500/15 text-primary-300 border border-primary-500/20"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-5, 5, -5], x: [2, -2, 2] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass rounded-2xl px-3 py-2 border border-white/10 shadow-glow-sm"
                style={{ transform: 'translateZ(30px)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">✨</span>
                  <div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Enhanced</div>
                    <div className={`text-[10px] ${isDark ? 'text-white/40' : 'text-gray-500'}`}>12 keywords added</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5], x: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-3 py-2 border border-white/10"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🎯</span>
                  <div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>ATS Ready</div>
                    <div className={`text-[10px] ${isDark ? 'text-white/40' : 'text-gray-500'}`}>Passes all scans</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-primary-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ResumeLines({ isDark }) {
  const lines = [
    { w: '85%', bright: true },
    { w: '70%', bright: false },
    { w: '90%', bright: false },
    { w: '60%', bright: false },
    { w: '78%', bright: true },
    { w: '55%', bright: false },
    { w: '88%', bright: false },
  ]
  return (
    <div className="space-y-2.5">
      {lines.slice(0, 2).map((line, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
          style={{ width: line.w, transformOrigin: 'left' }}
          className={`h-2 rounded-full ${line.bright
            ? 'bg-gradient-to-r from-primary-500/60 to-accent-purple/40'
            : isDark ? 'bg-white/10' : 'bg-gray-200'
          }`}
        />
      ))}
      <div className={`text-xs font-semibold pt-1 pb-1 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Experience</div>
      {lines.slice(2).map((line, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1 + i * 0.06, duration: 0.4 }}
          style={{ width: line.w, transformOrigin: 'left' }}
          className={`h-1.5 rounded-full ${line.bright
            ? 'bg-gradient-to-r from-accent-cyan/50 to-primary-500/40'
            : isDark ? 'bg-white/8' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}
