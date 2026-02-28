import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: '🎯',
    title: 'Smart ATS Scoring',
    description: 'Real-time compatibility score that tells you exactly how likely your resume is to pass applicant tracking systems.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    border: 'border-violet-500/20',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  {
    icon: '🔍',
    title: 'Keyword Intelligence',
    description: 'Advanced NLP extracts every critical keyword and phrase from job descriptions, ensuring perfect alignment.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20',
    glow: 'rgba(6, 182, 212, 0.15)',
  },
  {
    icon: '✍️',
    title: 'AI Rewriting Engine',
    description: 'GPT-powered rewriting transforms generic bullet points into compelling, quantified achievements.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/20',
    glow: 'rgba(236, 72, 153, 0.15)',
  },
  {
    icon: '📊',
    title: 'Instant Analytics',
    description: 'Deep analysis of your resume strength, readability, and industry alignment with actionable improvement tips.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/20',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
  {
    icon: '🚀',
    title: 'One-Click Export',
    description: 'Download in ATS-optimized PDF or DOCX format. Clean layouts that render perfectly in any system.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/20',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  {
    icon: '🔄',
    title: 'Version Control',
    description: 'Keep multiple tailored versions of your resume for different roles. Track every optimization over time.',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    border: 'border-indigo-500/20',
    glow: 'rgba(99, 102, 241, 0.15)',
  },
]

export default function FeaturesSection({ isDark }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" ref={ref} className="relative py-32 overflow-hidden">
      {/* Section rule */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 mb-6">
            <span className="text-primary-400 text-xs font-semibold tracking-widest uppercase">Features</span>
          </div>
          <h2 className={`font-display text-5xl md:text-6xl font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Everything You Need to{' '}
            <span className="gradient-text">Land the Role</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            A full suite of AI-powered tools designed to give your resume an unfair advantage.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`card-glow p-7 group`}
              style={{ '--glow-color': feature.glow }}
            >
              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} border ${feature.border} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  style={{ boxShadow: `0 0 20px ${feature.glow}` }}
                />
              </div>

              <h3 className={`font-display font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div className={`mt-5 h-px bg-gradient-to-r from-transparent ${feature.border.replace('border-', 'via-')} to-transparent`} />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <a href="#workflow" className="btn-primary inline-flex items-center gap-3 text-base px-8 py-4 rounded-2xl" data-hover>
            <span className="relative z-10">Start Optimizing for Free</span>
            <svg className="w-5 h-5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
