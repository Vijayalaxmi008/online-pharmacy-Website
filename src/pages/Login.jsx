import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AuthModal from '../components/modals/AuthModal'

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

const Login = () => {
  const navigate = useNavigate()
  const { setUser, users } = useApp()
  const [showPassword, setShowPassword] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [form, setForm] = useState({ phone: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!validatePhone(form.phone)) {
      setError('Enter a valid phone number (10–11 digits)')
      return
    }
    if (!form.password || form.password.length < 6) {
      setError('The password must contain at least 6 characters.')
      return
    }

    const phone = normalizePhone(form.phone)
    const existingUser = users?.find(u => normalizePhone(u.phone || '') === phone)

    if (existingUser) {
      if (existingUser.password !== form.password) {
        setError('Incorrect password')
        return
      }
      setUser(existingUser)
    } else {
      // No account yet with this phone — create one on the fly, same as before
      setUser({ phone, name: phone, password: form.password })
    }
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
        <Link to="/" className="absolute top-6 left-6 text-gray-400 hover:text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <button onClick={() => navigate(-1)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-xl">
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-2">Log in</h2>
        <button onClick={() => setRegisterOpen(true)} className="text-green-600 text-sm mb-4 hover:underline">
          Registration
        </button>

        <p className="text-sm text-gray-600 mb-6">
          Leave your contact details, and we will get in touch with you. We do not send promotional messages, and we do not share your contact information with third parties.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="tel"
              placeholder="Your phone number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-full focus:border-green-600 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-full focus:border-green-600 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-green-600" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-green-600 hover:underline">Forgot your password?</a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-green-600 text-white font-bold px-8 py-3 rounded-full hover:bg-green-700 transition w-full sm:w-auto"
            >
              LOG IN
            </button>
            <p className="text-xs text-gray-500 flex-1">
              By clicking the button, you agree to the processing{' '}
              <span className="text-green-600"></span>
            </p>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-sm text-gray-500 mb-3">Or sign in via</p>
          <div className="flex justify-center gap-3">
            <button className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold">VK</button>
            <button className="w-12 h-12 rounded-full bg-red-500 text-white font-bold">G</button>
            <button className="w-12 h-12 rounded-full bg-blue-400 text-white font-bold">TG</button>
          </div>
        </div>
      </div>

      {registerOpen && (
        <AuthModal
          onClose={() => setRegisterOpen(false)}
          mode="register"
        />
      )}
    </div>
  )
}

export default Login