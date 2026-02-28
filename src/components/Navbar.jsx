import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#workflow' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar({ isDark, setIsDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/')
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? `${isDark ? 'glass' : 'glass-light'} border-b ${isDark ? 'border-white/5' : 'border-black/5'} shadow-glass`
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 5h14M4 9h10M4 13h12M4 17h7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="17" cy="16" r="5" fill="rgba(0,210,255,0.15)" stroke="#00d2ff" strokeWidth="1.2"/>
              <path d="M15 16l1.5 1.5 3-3" stroke="#00d2ff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className={`font-display font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Resume<span className="gradient-text">AI</span>
          </span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isDark
                  ? 'text-white/60 hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ y: 0 }}
              data-hover
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />

          {user ? (
            /* ---- Profile Avatar + Dropdown ---- */
            <div className="relative hidden md:block" ref={profileRef}>
              <motion.button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isDark ? 'border-white/10 glass hover:border-white/20' : 'border-black/10 bg-white/60 hover:border-black/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white text-xs font-bold shadow-glow-sm">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span className={`text-sm font-medium max-w-[90px] truncate ${ isDark ? 'text-white/80' : 'text-gray-700' }`}>
                  {user.name?.split(' ')[0]}
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${ profileOpen ? 'rotate-180' : '' } ${ isDark ? 'text-white/40' : 'text-gray-400' }`}>
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-0 top-full mt-2 w-52 rounded-2xl border shadow-2xl overflow-hidden z-50 ${
                      isDark ? 'bg-[#0d0d25] border-white/10' : 'bg-white border-black/8'
                    }`}
                  >
                    {/* User info */}
                    <div className={`px-4 py-3 border-b ${ isDark ? 'border-white/8' : 'border-black/6' }`}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white text-sm font-bold shadow-glow-sm">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold truncate ${ isDark ? 'text-white' : 'text-gray-900' }`}>{user.name}</p>
                          <p className={`text-xs truncate ${ isDark ? 'text-white/40' : 'text-gray-400' }`}>{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-1.5">
                      <button
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                          isDark ? 'text-white/70 hover:text-white hover:bg-white/8' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1.5A2.5 2.5 0 1 1 7.5 6.5 2.5 2.5 0 0 1 7.5 1.5ZM2.5 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                        My Profile
                      </button>
                      <button
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 ${
                          isDark ? 'text-white/70 hover:text-white hover:bg-white/8' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1.5" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 3.5V2.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1" stroke="currentColor" strokeWidth="1.3"/></svg>
                        My Resumes
                      </button>
                    </div>

                    {/* Logout */}
                    <div className={`p-1.5 border-t ${ isDark ? 'border-white/8' : 'border-black/6' }`}>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-150"
                      >
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 7.5h8m0 0-2.5-2.5M13 7.5 10.5 10M9.5 3.5H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ---- Guest buttons ---- */
            <>
              <Link to="/signin">
              <motion.span
                className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isDark ? 'text-white/70 hover:text-white border border-white/10 hover:border-white/20 glass' : 'text-gray-700 border border-black/10 hover:border-black/20 bg-white/50'
                }`}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                data-hover
              >
                Sign In
              </motion.span>
              </Link>

              <Link to="/signup">
              <motion.span
                className="btn-primary text-sm px-5 py-2.5 rounded-xl hidden md:block relative overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                data-hover
              >
                <span className="relative z-10">Try for Free</span>
              </motion.span>
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 rounded-xl ${isDark ? 'text-white/70 glass' : 'text-gray-700 bg-black/5'}`}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <motion.line
                x1="2" y1="5" x2="18" y2="5"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 5 : 0 }}
                style={{ transformOrigin: '10px 5px' }}
              />
              <motion.line
                x1="2" y1="10" x2="18" y2="10"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                animate={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <motion.line
                x1="2" y1="15" x2="18" y2="15"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -5 : 0 }}
                style={{ transformOrigin: '10px 15px' }}
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden ${isDark ? 'glass border-t border-white/5' : 'bg-white/90 border-t border-black/5'}`}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium ${
                    isDark ? 'text-white/70 hover:text-white hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              {user ? (
                <>
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl mt-1 ${ isDark ? 'bg-white/5 border border-white/8' : 'bg-black/4 border border-black/6' }`}>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center text-white text-sm font-bold shadow-glow-sm shrink-0">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-semibold truncate ${ isDark ? 'text-white' : 'text-gray-900' }`}>{user.name}</p>
                      <p className={`text-xs truncate ${ isDark ? 'text-white/40' : 'text-gray-400' }`}>{user.email}</p>
                    </div>
                  </div>
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    onClick={() => { handleLogout(); setMobileOpen(false) }}
                    className="w-full flex items-center gap-2 px-5 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all duration-150 mt-1"
                  >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 7.5h8m0 0-2.5-2.5M13 7.5 10.5 10M9.5 3.5H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Log out
                  </motion.button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setMobileOpen(false)}>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                    className={`text-sm px-5 py-3 rounded-xl text-center mt-2 block border cursor-pointer ${ isDark ? 'text-white/70 border-white/10 glass' : 'text-gray-700 border-black/10 bg-white/50' }`}
                  >
                    Sign In
                  </motion.span>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (navLinks.length + 1) * 0.05 }}
                    className="btn-primary text-sm px-5 py-3 rounded-xl text-center mt-2 block cursor-pointer"
                  >
                    Try for Free
                  </motion.span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
