import { motion } from 'framer-motion'

export default function ThemeToggle({ isDark, setIsDark }) {
  return (
    <motion.button
      onClick={() => setIsDark(!isDark)}
      className={`relative w-14 h-7 rounded-full transition-colors duration-500 overflow-hidden ${
        isDark ? 'bg-primary-600/30 border border-primary-500/30' : 'bg-amber-100 border border-amber-300/50'
      }`}
      whileTap={{ scale: 0.9 }}
      data-hover
    >
      {/* Track particles */}
      {isDark && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white/40 rounded-full"
              style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 2) * 40}%` }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5 + i * 0.3, repeat: Infinity }}
            />
          ))}
        </>
      )}

      {/* Thumb */}
      <motion.div
        className={`absolute top-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
          isDark
            ? 'bg-gradient-to-br from-primary-400 to-accent-purple'
            : 'bg-gradient-to-br from-amber-400 to-orange-400'
        }`}
        animate={{ x: isDark ? 1 : 29 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        <motion.span
          className="text-[10px]"
          animate={{ rotate: isDark ? 0 : 360 }}
          transition={{ duration: 0.5 }}
        >
          {isDark ? '🌙' : '☀️'}
        </motion.span>
      </motion.div>
    </motion.button>
  )
}
