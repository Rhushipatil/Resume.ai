import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, UserPlus, AlertCircle, CheckCircle2, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const passwordRules = [
  { label: 'At least 6 characters', test: (p) => p.length >= 6 },
  { label: 'Contains a number', test: (p) => /\d/.test(p) },
  { label: 'Contains a letter', test: (p) => /[a-zA-Z]/.test(p) },
]

export default function SignUp({ isDark }) {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      return setError('Passwords do not match')
    }
    setLoading(true)
    setError('')
    try {
      await register(form.name, form.email, form.password)
      setSuccess('Account created! Please sign in to continue.')
      setTimeout(() => navigate('/signin'), 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${isDark ? 'bg-[#050510]' : 'bg-[#f0f0ff]'} py-10`}>
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent-purple/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-primary-500/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-cyan/5 blur-[150px]" />
      </div>

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#6c5ce7 1px, transparent 1px), linear-gradient(90deg, #6c5ce7 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center shadow-glow-sm">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 5h14M4 9h10M4 13h12M4 17h7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="17" cy="16" r="5" fill="rgba(0,210,255,0.15)" stroke="#00d2ff" strokeWidth="1.2"/>
              <path d="M15 16l1.5 1.5 3-3" stroke="#00d2ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={`font-display font-bold text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Resume<span className="gradient-text">AI</span>
          </span>
        </div>

        {/* Card */}
        <div className={`rounded-2xl border p-8 shadow-2xl ${isDark ? 'bg-white/[0.04] border-white/10 backdrop-blur-xl' : 'bg-white border-black/8 backdrop-blur-xl'}`}>
          <h1 className={`font-display text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Create your account
          </h1>
          <p className={`text-sm mb-6 ${isDark ? 'text-white/45' : 'text-gray-500'}`}>
            Start optimizing your resume for free
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Free forever', 'No credit card', 'ATS ready'].map((b) => (
              <span key={b} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                <Check className="w-3 h-3" /> {b}
              </span>
            ))}
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 mb-5"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Success */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="text-sm text-emerald-400">{success}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                Full Name
              </label>
              <div className="relative">
                <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Prince Thakur"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-primary-500 focus:bg-white/8'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-primary-500 focus:bg-white/8'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white'
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-primary-500 focus:bg-white/8'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-white/30 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength */}
              {form.password && (
                <div className="flex gap-2 mt-2">
                  {passwordRules.map((rule) => (
                    <span key={rule.label} className={`flex items-center gap-1 text-[10px] ${rule.test(form.password) ? 'text-emerald-400' : isDark ? 'text-white/25' : 'text-gray-400'}`}>
                      <Check className="w-2.5 h-2.5" /> {rule.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-white/30' : 'text-gray-400'}`} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all border ${
                    form.confirm && form.confirm !== form.password
                      ? 'border-red-500/50 bg-red-500/5'
                      : form.confirm && form.confirm === form.password
                      ? isDark ? 'border-emerald-500/50 bg-white/5' : 'border-emerald-500/50 bg-white'
                      : isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder:text-white/25 focus:border-primary-500 focus:bg-white/8'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:bg-white'
                  } ${isDark ? 'text-white' : 'text-gray-900'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-white/30 hover:text-white/60' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-purple text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-glow-sm disabled:opacity-60 disabled:cursor-not-allowed mt-2 transition-opacity"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          <p className={`mt-4 text-[11px] text-center ${isDark ? 'text-white/25' : 'text-gray-400'}`}>
            By signing up, you agree to our{' '}
            <a href="#" className="text-primary-400 hover:underline">Terms</a> &{' '}
            <a href="#" className="text-primary-400 hover:underline">Privacy Policy</a>
          </p>

          <div className={`mt-6 pt-6 border-t text-center text-sm ${isDark ? 'border-white/8 text-white/40' : 'border-gray-100 text-gray-500'}`}>
            Already have an account?{' '}
            <Link to="/signin" className="text-primary-400 font-medium hover:text-primary-300 transition-colors">
              Sign in
            </Link>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-5">
          <Link to="/" className={`text-xs transition-colors ${isDark ? 'text-white/25 hover:text-white/50' : 'text-gray-400 hover:text-gray-600'}`}>
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
