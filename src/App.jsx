import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import WorkflowSection from './components/WorkflowSection'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signin" element={<SignIn isDark={isDark} />} />
          <Route path="/signup" element={<SignUp isDark={isDark} />} />
          <Route path="/*" element={
    <div className={`relative min-h-screen ${isDark ? 'bg-mesh' : 'bg-mesh-light'} transition-colors duration-700 noise-bg`}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050510]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      <ParticleBackground isDark={isDark} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <main>
          <HeroSection isDark={isDark} />
          <WorkflowSection isDark={isDark} />
          <FeaturesSection isDark={isDark} />
          <TestimonialsSection isDark={isDark} />
          <CTASection isDark={isDark} />
        </main>
        <Footer isDark={isDark} />
      </motion.div>
    </div>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100 }
        return prev + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="relative"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center shadow-glow-lg">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M8 10h24M8 16h16M8 22h20M8 28h12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="32" cy="28" r="8" fill="rgba(0,210,255,0.2)" stroke="#00d2ff" strokeWidth="1.5"/>
            <path d="M29 28l2 2 4-4" stroke="#00d2ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ boxShadow: ['0 0 20px rgba(108,92,231,0.5)', '0 0 60px rgba(168,85,247,0.8)', '0 0 20px rgba(108,92,231,0.5)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="font-display text-2xl font-bold gradient-text mb-2">ResumeAI</h1>
        <p className="text-white/40 text-sm">Initializing AI Engine...</p>
      </motion.div>

      <div className="w-64">
        <div className="h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 via-accent-purple to-accent-cyan rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-white/30 text-xs">Loading</span>
          <span className="text-white/50 text-xs font-mono">{Math.min(Math.round(progress), 100)}%</span>
        </div>
      </div>

      {/* Decorative matrix chars */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-[10px] text-cyan-400/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96))}
        </motion.div>
      ))}
    </div>
  )
}
