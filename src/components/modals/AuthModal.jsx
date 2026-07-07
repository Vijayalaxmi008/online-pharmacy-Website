import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { useApp } from '../../context/AppContext'
import { Mail, Lock, Phone } from 'lucide-react'

// --- Validation helpers -----------------------------------------------

// Accepts +7XXXXXXXXXX, 8XXXXXXXXXX, or plain 10/11-digit numbers,
// optionally formatted with spaces, dashes, dots or parentheses.
const validatePhone = (phone) => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))) return true
  if (digits.length === 10) return true
  return false
}

const normalizePhone = (phone) => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) return `+7${digits.slice(1)}`
  if (digits.length === 10) return `+7${digits}`
  return phone
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

const AuthModal = ({ onClose, mode: initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode)
  const { setUser, users } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [fieldError, setFieldError] = useState('')

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
    setFieldError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setFieldError('')

    if (mode === 'login') {
      // Sign in with phone number
      if (!validatePhone(form.phone)) {
        setFieldError('Please enter a valid phone number (10-11 digits)')
        return
      }
      const phone = normalizePhone(form.phone)
      const user = users.find(u => normalizePhone(u.phone || '') === phone)
      if (!user) { setError('User not found'); return }
      if (user.password !== form.password) { setError('Invalid password'); return }
      setUser(user)
    } else {
      // Register with email
      if (!validateEmail(form.email)) {
        setFieldError('Please enter a valid email address')
        return
      }
      if (!form.password || form.password.length < 6) {
        setFieldError('Password must be at least 6 characters')
        return
      }
      const emailExists = users.some(u => u.email?.toLowerCase() === form.email.trim().toLowerCase())
      if (emailExists) { setError('This email is already registered'); return }

      const newUser = {
        name: form.email.split('@')[0],
        email: form.email.trim(),
        phone: '',
        password: form.password,
      }
      setUser(newUser)
    }
    onClose()
    navigate('/account')
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-lg font-bold">{mode === 'login' ? 'Sign In' : 'Register'}</h2>
          <button onClick={switchMode} className="text-primary-500 text-sm hover:underline">
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-4">
          {mode === 'login'
            ? 'Sign in with the phone number you registered with.'
            : 'Create an account using your email address.'}
        </p>

        {fieldError && <div className="mb-3 p-2.5 bg-amber-50 text-amber-700 text-xs rounded-lg">{fieldError}</div>}
        {error && <div className="mb-3 p-2.5 bg-red-50 text-red-600 text-xs rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'login' ? (
            <>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="tel"
                  placeholder="Your phone number"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm"
                />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm"
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  required
                  type="password"
                  placeholder="Password (min. 6 characters)"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm"
                />
              </div>
            </>
          )}
          <div className="flex items-center gap-3 pt-1">
            <button type="submit" className="bg-primary-500 text-white font-bold px-6 py-2.5 rounded-full hover:bg-primary-600 text-xs">
              {mode === 'login' ? 'SIGN IN' : 'REGISTER'}
            </button>
            <p className="text-[10px] text-gray-500 flex-1">
              By clicking the button, you agree to the processing of <span className="text-primary-500">personal data</span>
            </p>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default AuthModal