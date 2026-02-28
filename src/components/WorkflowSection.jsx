import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useDropzone } from 'react-dropzone'

const KEYWORDS = ['React', 'TypeScript', 'Node.js', 'RESTful APIs', 'Agile', 'CI/CD', 'Docker', 'AWS', 'GraphQL', 'Problem-solving', 'Leadership', 'Microservices']

const MATRIX_CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ0123456789ABCDEF'

const originalResume = `John Doe
Software Developer

EXPERIENCE
Software Engineer at Tech Corp (2021-2024)
• Built web applications using various technologies
• Worked with backend services
• Collaborated with team members

SKILLS
JavaScript, HTML, CSS, Some frameworks

EDUCATION
B.S. Computer Science, State University`

const optimizedResume = `John Doe
Senior Full-Stack Engineer | React & Node.js Expert

EXPERIENCE
Senior Software Engineer at Tech Corp (2021-2024)
• Architected and delivered React/TypeScript applications serving 500K+ users
• Designed RESTful APIs and GraphQL endpoints with Node.js & Express
• Implemented CI/CD pipelines using Docker & AWS, reducing deploy time by 60%
• Led Agile sprint planning for 8-person cross-functional team

SKILLS
React, TypeScript, Node.js, GraphQL, Docker, AWS, CI/CD, Microservices, RESTful APIs, Agile/Scrum, Leadership

EDUCATION  
B.S. Computer Science, State University — GPA 3.8/4.0`

export default function WorkflowSection({ isDark }) {
  const [activeStep, setActiveStep] = useState(0)
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [processing, setProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [showComparison, setShowComparison] = useState(false)
  const [highlighted, setHighlighted] = useState([])
  const [matrixChars, setMatrixChars] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc', '.docx'] },
    maxFiles: 1,
    onDrop: (accepted) => {
      if (accepted.length) {
        setFile(accepted[0])
        setTimeout(() => setActiveStep(1), 600)
      }
    }
  })

  // Keyword highlighter
  useEffect(() => {
    if (activeStep !== 1) return
    const words = jobDesc.split(' ')
    const matches = words.filter(w => KEYWORDS.some(k => k.toLowerCase().includes(w.toLowerCase()) && w.length > 3))
    const unique = [...new Set(matches)]
    setHighlighted(unique)
  }, [jobDesc, activeStep])

  const handleJobDescInput = (e) => {
    setJobDesc(e.target.value)
    if (e.target.value.length > 30 && activeStep === 1) {
      // allow user to advance
    }
  }

  // Generate matrix chars
  useEffect(() => {
    if (activeStep !== 2 || !processing) return
    const chars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
      duration: 1 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setMatrixChars(chars)
  }, [activeStep, processing])

  const startProcessing = () => {
    setActiveStep(2)
    setProcessing(true)
    setProgress(0)
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 8
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          setProcessing(false)
          setActiveStep(3)
          setTimeout(() => {
            setActiveStep(4)
            setShowComparison(true)
            setDone(true)
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
          }, 2000)
        }, 800)
      }
      setProgress(p)
    }, 200)
  }

  const reset = () => {
    setActiveStep(0); setFile(null); setJobDesc(''); setProcessing(false)
    setProgress(0); setDone(false); setShowComparison(false); setHighlighted([])
  }

  const renderHiglightedText = (text) => {
    const words = text.split(/(\s+)/)
    return words.map((word, i) => {
      const isKw = KEYWORDS.some(k => k.toLowerCase() === word.toLowerCase().replace(/[^a-z0-9+#.]/g, ''))
      return isKw ? (
        <motion.span
          key={i}
          initial={{ backgroundColor: 'transparent' }}
          animate={{ backgroundColor: 'rgba(0,210,255,0.12)', color: '#00d2ff' }}
          transition={{ duration: 0.3 }}
          className="keyword-highlight rounded px-0.5"
        >
          {word}
        </motion.span>
      ) : <span key={i}>{word}</span>
    })
  }

  const steps = [
    { num: '01', label: 'Upload Resume', icon: '📄' },
    { num: '02', label: 'Add Job Description', icon: '📋' },
    { num: '03', label: 'AI Processing', icon: '🧠' },
    { num: '04', label: 'Transformation', icon: '⚡' },
    { num: '05', label: 'Review & Download', icon: '✅' },
  ]

  return (
    <section id="workflow" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-6">
            <span className="text-primary-400 text-xs font-semibold tracking-widest uppercase">How It Works</span>
          </div>
          <h2 className={`font-display text-5xl md:text-6xl font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            From Upload to{' '}
            <span className="gradient-text">ATS Champion</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            Five intelligent steps powered by advanced NLP to transform your resume into a job-winning document.
          </p>
        </motion.div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-0 mb-16 overflow-x-auto pb-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center">
              <motion.button
                onClick={() => i <= activeStep && setActiveStep(i)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  i === activeStep ? 'opacity-100' : i < activeStep ? 'opacity-70 cursor-pointer' : 'opacity-30 cursor-default'
                }`}
                data-hover
              >
                <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300 ${
                  i === activeStep
                    ? 'bg-gradient-to-br from-primary-500 to-accent-purple shadow-glow'
                    : i < activeStep
                    ? 'bg-emerald-500/20 border border-emerald-500/30'
                    : isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'
                }`}>
                  {i < activeStep ? '✓' : step.icon}
                  {i === activeStep && (
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-primary-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap hidden sm:block ${
                  i === activeStep ? (isDark ? 'text-white' : 'text-gray-900') : isDark ? 'text-white/40' : 'text-gray-400'
                }`}>{step.label}</span>
              </motion.button>
              {i < steps.length - 1 && (
                <div className="w-8 md:w-16 h-px relative mx-1">
                  <div className={`absolute inset-0 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-purple origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: i < activeStep ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 0: Upload */}
            {activeStep === 0 && (
              <StepWrapper key="step0">
                <div
                  {...getRootProps()}
                  className={`relative rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 overflow-hidden ${
                    isDragActive
                      ? 'border-2 border-primary-400 bg-primary-500/10 shadow-glow'
                      : 'border-2 border-dashed animated-border'
                  } ${isDark ? 'bg-white/2' : 'bg-black/2'}`}
                  data-hover
                >
                  <input {...getInputProps()} />

                  {/* Animated corner accents */}
                  {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${pos} w-6 h-6`}
                      animate={{ opacity: isDragActive ? [0.5, 1, 0.5] : 0.3 }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    >
                      <div className={`absolute ${pos.includes('right') ? 'right-0' : 'left-0'} ${pos.includes('bottom') ? 'bottom-0' : 'top-0'} w-5 h-0.5 bg-primary-400`} />
                      <div className={`absolute ${pos.includes('right') ? 'right-0' : 'left-0'} ${pos.includes('bottom') ? 'bottom-0' : 'top-0'} w-0.5 h-5 bg-primary-400`} />
                    </motion.div>
                  ))}

                  <motion.div
                    animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                    className="relative z-10"
                  >
                    <motion.div
                      animate={{ y: isDragActive ? -10 : [0, -6, 0] }}
                      transition={isDragActive ? { duration: 0.2 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-6xl mb-6 inline-block"
                    >
                      {isDragActive ? '📂' : '📄'}
                    </motion.div>
                    <h3 className={`font-display text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {isDragActive ? 'Drop it here!' : 'Drag & Drop Your Resume'}
                    </h3>
                    <p className={`mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                      Support for PDF, DOC, DOCX files up to 10MB
                    </p>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Browse Files
                    </div>
                  </motion.div>
                </div>
              </StepWrapper>
            )}

            {/* Step 1: Job Description */}
            {activeStep === 1 && (
              <StepWrapper key="step1">
                <div className={`glass rounded-3xl p-8 border ${isDark ? 'border-white/8' : 'border-black/8'}`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan/20 to-primary-500/20 border border-accent-cyan/30 flex items-center justify-center">
                      <span className="text-lg">📋</span>
                    </div>
                    <div>
                      <h3 className={`font-display font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Paste Job Description</h3>
                      <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>AI will extract and match keywords automatically</p>
                    </div>
                    {file && (
                      <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-emerald-400 text-xs">{file.name.slice(0, 20)}...</span>
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      className={`w-full h-52 p-5 rounded-2xl font-mono text-sm resize-none outline-none transition-all duration-300 ${
                        isDark
                          ? 'bg-white/3 text-white/80 border border-white/8 focus:border-primary-500/50 placeholder-white/20'
                          : 'bg-black/3 text-gray-700 border border-black/10 focus:border-primary-500/50 placeholder-gray-400'
                      }`}
                      placeholder="Paste the job description here...

e.g: We are looking for a Senior Software Engineer with expertise in React, TypeScript, Node.js, and AWS. The ideal candidate has experience with CI/CD pipelines, Docker, microservices architecture, GraphQL APIs, and Agile methodologies..."
                      value={jobDesc}
                      onChange={handleJobDescInput}
                    />

                    {/* Live keyword chips */}
                    {highlighted.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4"
                      >
                        <p className={`text-xs mb-2 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                          🎯 Detected Keywords ({highlighted.length})
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {highlighted.map((kw, i) => (
                            <motion.span
                              key={kw}
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: i * 0.05, type: 'spring' }}
                              className="px-2.5 py-1 rounded-lg text-xs bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan font-medium"
                            >
                              {kw}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <motion.button
                    onClick={startProcessing}
                    disabled={!jobDesc.trim()}
                    className={`mt-6 w-full btn-primary py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-3 ${
                      !jobDesc.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    whileHover={jobDesc.trim() ? { scale: 1.02 } : {}}
                    whileTap={jobDesc.trim() ? { scale: 0.98 } : {}}
                    data-hover
                  >
                    <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="relative z-10">Optimize with AI</span>
                  </motion.button>
                </div>
              </StepWrapper>
            )}

            {/* Step 2: AI Processing */}
            {activeStep === 2 && (
              <StepWrapper key="step2">
                <div className={`glass rounded-3xl p-10 border ${isDark ? 'border-white/8' : 'border-black/8'} relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center`}>
                  {/* Matrix rain */}
                  <div className="absolute inset-0 overflow-hidden">
                    {matrixChars.map(item => (
                      <motion.div
                        key={item.id}
                        className="absolute font-mono text-xs text-cyan-400/40"
                        style={{ left: `${item.x}%` }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: '100vh', opacity: [0, 0.6, 0.4, 0] }}
                        transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'linear' }}
                      >
                        {item.char}
                      </motion.div>
                    ))}
                  </div>

                  {/* Scan line */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="scan-line" />
                  </div>

                  <div className="relative z-10 text-center">
                    {/* AI brain animation */}
                    <div className="relative w-24 h-24 mx-auto mb-8">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary-500/50"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-2 rounded-full border-2 border-accent-cyan/50"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0.2, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center shadow-glow"
                        >
                          <span className="text-xl">🧠</span>
                        </motion.div>
                      </div>
                    </div>

                    <motion.h3
                      className={`font-display text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      AI Analyzing Resume...
                    </motion.h3>

                    {/* Processing steps */}
                    <div className="mt-6 space-y-2 text-left max-w-xs mx-auto">
                      {[
                        { label: 'Parsing resume structure', done: progress > 20 },
                        { label: 'Extracting job keywords', done: progress > 45 },
                        { label: 'Semantic matching', done: progress > 65 },
                        { label: 'Generating optimized content', done: progress > 85 },
                        { label: 'ATS compliance check', done: progress >= 100 },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: item.done || progress > i * 20 ? 1 : 0.3, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                            item.done ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                          }`}>
                            {item.done && <span className="text-[8px] text-white">✓</span>}
                          </div>
                          <span className={`text-sm ${item.done ? (isDark ? 'text-white/80' : 'text-gray-700') : isDark ? 'text-white/30' : 'text-gray-400'}`}>
                            {item.label}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-8 w-72 mx-auto">
                      <div className={`h-1.5 rounded-full ${isDark ? 'bg-white/8' : 'bg-black/8'} overflow-hidden`}>
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary-500 via-accent-purple to-accent-cyan rounded-full"
                          initial={{ width: '0%' }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Processing</span>
                        <span className={`text-xs font-mono ${isDark ? 'text-white/50' : 'text-gray-500'}`}>{Math.round(progress)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </StepWrapper>
            )}

            {/* Step 3: Transformation */}
            {activeStep === 3 && (
              <StepWrapper key="step3">
                <div className={`glass rounded-3xl p-8 border ${isDark ? 'border-white/8' : 'border-black/8'} min-h-[300px] flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-xs font-mono text-primary-400"
                        style={{ left: `${Math.random() * 80 + 10}%`, top: `${Math.random() * 80 + 10}%` }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          x: [-50, 50],
                          y: [-30, 30],
                        }}
                        transition={{ duration: 1.5, delay: i * 0.08, repeat: 0 }}
                      >
                        {KEYWORDS[i % KEYWORDS.length]}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="relative z-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center shadow-glow-lg mx-auto mb-6">
                      <span className="text-3xl">⚡</span>
                    </div>
                    <h3 className={`font-display text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Transforming Resume!</h3>
                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Keywords are flying from job description into your resume...</p>
                  </motion.div>
                </div>
              </StepWrapper>
            )}

            {/* Step 4: Comparison */}
            {activeStep === 4 && showComparison && (
              <StepWrapper key="step4">
                <div className="space-y-6">
                  {showSuccess && <SuccessOverlay isDark={isDark} />}

                  <div className="text-center">
                    <h3 className={`font-display text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Your Resume is Optimized! 🎉
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>Compare original vs AI-optimized version</p>
                  </div>

                  {/* Comparison grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <ResumePanel title="Original" score={42} content={originalResume} color="red" isDark={isDark} />
                    <ResumePanel title="AI Optimized" score={94} content={optimizedResume} color="green" isDark={isDark} highlighted />
                  </div>

                  {/* Download button */}
                  <div className="flex gap-4 justify-center flex-wrap">
                    <DownloadButton isDark={isDark} />
                    <motion.button
                      onClick={reset}
                      className={`px-6 py-3.5 rounded-2xl text-sm font-medium glass border transition-all ${isDark ? 'border-white/10 text-white/60 hover:text-white' : 'border-black/10 text-gray-600 hover:text-gray-900'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      data-hover
                    >
                      ↺ Optimize New Resume
                    </motion.button>
                  </div>
                </div>
              </StepWrapper>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function StepWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function ResumePanel({ title, score, content, color, isDark, highlighted }) {
  const isGreen = color === 'green'
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: highlighted ? 0.2 : 0 }}
      className={`glass rounded-2xl p-4 border ${
        isGreen
          ? 'border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
          : isDark ? 'border-red-500/20' : 'border-red-200'
      } relative overflow-hidden`}
    >
      {isGreen && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0, 0.03, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)' }}
        />
      )}

      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-semibold ${isGreen ? 'text-emerald-400' : 'text-red-400'}`}>{title}</span>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
          isGreen ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          ATS: {score}%
        </div>
      </div>
      <pre className={`text-[10px] leading-relaxed whitespace-pre-wrap font-mono overflow-auto max-h-64 ${
        isDark ? 'text-white/60' : 'text-gray-600'
      }`}>
        {content}
      </pre>
    </motion.div>
  )
}

function DownloadButton({ isDark }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      className="relative btn-primary px-8 py-3.5 rounded-2xl text-sm font-semibold flex items-center gap-3 overflow-hidden"
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96, rotateX: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ transformStyle: 'preserve-3d', perspective: 400 }}
      data-hover
    >
      <motion.span
        className="relative z-10 text-lg"
        animate={hovered ? { y: -2, rotate: -10 } : { y: 0, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        ⬇️
      </motion.span>
      <span className="relative z-10">Download Optimized Resume</span>

      {/* Shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
        animate={hovered ? { x: ['−100%', '200%'] } : { x: '-100%' }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
    </motion.button>
  )
}

function SuccessOverlay({ isDark }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      className="relative text-center py-6"
    >
      <div className="relative inline-block">
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-500/20"
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{ duration: 1, repeat: 2 }}
        />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.6)]">
          <motion.svg
            className="w-8 h-8 text-white"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </motion.svg>
        </div>
      </div>
    </motion.div>
  )
}
