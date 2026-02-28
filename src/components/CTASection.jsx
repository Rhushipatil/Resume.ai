import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function CTASection({ isDark }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary-500/8 blur-[100px]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-purple/6 blur-[80px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`glass rounded-[2rem] p-12 md:p-16 border ${isDark ? 'border-white/8' : 'border-black/8'} text-center relative overflow-hidden`}
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              background: 'none',
              boxShadow: 'inset 0 0 60px rgba(108,92,231,0.06), 0 0 60px rgba(108,92,231,0.08)',
            }}
          />

          {/* Corner decorations */}
          {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-16 h-16 pointer-events-none`}>
              <div className={`absolute ${pos.includes('right') ? 'right-4' : 'left-4'} ${pos.includes('bottom') ? 'bottom-4' : 'top-4'} w-8 h-0.5 bg-gradient-to-r from-primary-500/30 to-accent-cyan/30`} />
              <div className={`absolute ${pos.includes('right') ? 'right-4' : 'left-4'} ${pos.includes('bottom') ? 'bottom-4' : 'top-4'} w-0.5 h-8 bg-gradient-to-b from-primary-500/30 to-accent-cyan/30`} />
            </div>
          ))}

          {/* Floating orbs */}
          {[
            { size: 'w-3 h-3', pos: 'top-8 left-1/4', color: 'bg-primary-400' },
            { size: 'w-2 h-2', pos: 'bottom-12 right-1/3', color: 'bg-accent-cyan' },
            { size: 'w-4 h-4', pos: 'top-1/3 right-12', color: 'bg-accent-purple' },
          ].map((orb, i) => (
            <motion.div
              key={i}
              className={`absolute ${orb.pos} ${orb.size} ${orb.color} rounded-full opacity-40`}
              animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.7 }}
            />
          ))}

          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center mx-auto mb-8 shadow-glow-lg"
            >
              <span className="text-3xl">🚀</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className={`font-display text-5xl md:text-6xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              Ready to Land Your{' '}
              <span className="gradient-text">Dream Job?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className={`text-lg max-w-2xl mx-auto mb-10 ${isDark ? 'text-white/55' : 'text-gray-500'}`}
            >
              Join 50,000+ professionals already using ResumeAI to create targeted, ATS-optimized resumes
              that get noticed. Start free, no credit card required.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-10"
            >
              <motion.a
                href="#workflow"
                className="btn-primary text-lg px-10 py-5 rounded-2xl flex items-center gap-3"
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.96 }}
                data-hover
              >
                <span className="relative z-10 text-2xl">⚡</span>
                <span className="relative z-10">Start Optimizing — It's Free</span>
              </motion.a>
              <motion.a
                href="#features"
                className={`text-lg px-10 py-5 rounded-2xl font-semibold glass border transition-all ${
                  isDark ? 'border-white/10 text-white/70 hover:text-white hover:border-white/20' : 'border-black/10 text-gray-700 hover:border-black/20'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                Learn More
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className={`flex flex-wrap items-center justify-center gap-6 text-sm ${isDark ? 'text-white/35' : 'text-gray-400'}`}
            >
              {['✓ No credit card required', '✓ Free forever plan', '✓ 50,000+ happy users', '✓ Cancel anytime'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
