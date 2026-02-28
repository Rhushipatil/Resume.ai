import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Senior Product Manager',
    company: 'Google',
    avatar: 'SC',
    color: 'from-violet-500 to-purple-600',
    rating: 5,
    text: 'ResumeAI literally transformed my job search. My ATS score jumped from 38% to 96% and I started getting callbacks from companies I thought were out of reach. Got my Google offer 3 weeks later!',
    result: '3 offers in 2 weeks',
  },
  {
    name: 'Marcus Johnson',
    role: 'Full Stack Engineer',
    company: 'Meta',
    avatar: 'MJ',
    color: 'from-blue-500 to-cyan-600',
    rating: 5,
    text: 'I was submitting applications for 4 months with zero responses. After optimizing with ResumeAI, I got 8 interview requests in the first week. The keyword matching is insanely accurate.',
    result: '8 interviews in 7 days',
  },
  {
    name: 'Priya Sharma',
    role: 'Data Scientist',
    company: 'Stripe',
    avatar: 'PS',
    color: 'from-pink-500 to-rose-600',
    rating: 5,
    text: 'The side-by-side comparison feature showed me exactly what was missing. The AI rewrites are genuinely impressive — they sound like me but much more compelling and ATS-friendly.',
    result: '40% salary increase',
  },
  {
    name: 'Alex Rodriguez',
    role: 'UX Designer',
    company: 'Airbnb',
    avatar: 'AR',
    color: 'from-amber-500 to-orange-600',
    rating: 5,
    text: 'Worth every penny. The AI understood my creative background and translated it into ATS-friendly language without losing my voice. Landed my dream job at Airbnb.',
    result: 'Dream job in 3 weeks',
  },
  {
    name: 'Emily Zhang',
    role: 'Marketing Director',
    company: 'HubSpot',
    avatar: 'EZ',
    color: 'from-emerald-500 to-teal-600',
    rating: 5,
    text: 'Changed my job search completely. Instead of spray-and-pray applications, I now tailor every resume perfectly to each role in under 30 seconds. It\'s like having a personal recruiter.',
    result: 'First round at 9/10 apps',
  },
]

export default function TestimonialsSection({ isDark }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" ref={ref} className="relative py-32 overflow-hidden">
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
            <span className="text-primary-400 text-xs font-semibold tracking-widest uppercase">Success Stories</span>
          </div>
          <h2 className={`font-display text-5xl md:text-6xl font-bold mb-5 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Real People,{' '}
            <span className="gradient-text">Real Results</span>
          </h2>
          <p className={`text-lg max-w-xl mx-auto ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
            Join 50,000+ professionals who've transformed their careers with ResumeAI.
          </p>
        </motion.div>

        {/* Featured testimonial */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className={`glass rounded-3xl p-8 md:p-12 border ${isDark ? 'border-white/8' : 'border-black/8'} relative overflow-hidden`}
            >
              {/* Quote mark */}
              <div className={`absolute top-6 right-8 font-serif text-[120px] leading-none ${isDark ? 'text-white/4' : 'text-black/4'} select-none pointer-events-none`}>"</div>

              {/* Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonials[active].color.replace('from-', 'from-').replace('to-', 'to-')} opacity-5 pointer-events-none`} />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: i * 0.06 }}
                      className="text-amber-400 text-lg"
                    >★</motion.span>
                  ))}
                </div>

                <blockquote className={`text-xl md:text-2xl leading-relaxed font-medium mb-8 ${isDark ? 'text-white/85' : 'text-gray-800'}`}>
                  "{testimonials[active].text}"
                </blockquote>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${testimonials[active].color} flex items-center justify-center text-white font-bold text-sm shadow-glow-sm`}>
                      {testimonials[active].avatar}
                    </div>
                    <div>
                      <div className={`font-display font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{testimonials[active].name}</div>
                      <div className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                        {testimonials[active].role} at {testimonials[active].company}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-emerald-400 text-sm font-semibold">✓ {testimonials[active].result}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-8 h-2 bg-gradient-to-r from-primary-500 to-accent-purple'
                    : `w-2 h-2 ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-black/20 hover:bg-black/40'}`
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                data-hover
              />
            ))}
          </div>
        </div>

        {/* Small cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.name}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.06 }}
              className={`glass rounded-2xl p-4 border text-left transition-all duration-300 ${
                i === active
                  ? `border-primary-500/40 shadow-glow-sm`
                  : isDark ? 'border-white/5 hover:border-white/15' : 'border-black/5 hover:border-black/15'
              }`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              data-hover
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold mb-2`}>
                {t.avatar}
              </div>
              <div className={`text-xs font-semibold ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{t.name}</div>
              <div className={`text-[10px] ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{t.company}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
