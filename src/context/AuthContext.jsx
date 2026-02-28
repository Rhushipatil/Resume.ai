import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const API_URL = 'http://localhost:5000/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('resumeai_token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchMe()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchMe = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/auth/me`)
      setUser(data.user)
    } catch {
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/login`, { email, password })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('resumeai_token', data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    return data
  }

  const register = async (name, email, password) => {
    const { data } = await axios.post(`${API_URL}/auth/register`, { name, email, password })
    setToken(data.token)
    setUser(data.user)
    localStorage.setItem('resumeai_token', data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    return data
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('resumeai_token')
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
