import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import AuthModal from '../components/modals/AuthModal'

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const [showPassword, setShowPassword] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.email && form.password.length >= 6) {
      setUser({ email: form.email, name: form.email.split('@')[0] })
      navigate('/')
    } else {
      setError('Please enter valid email and password (min 6 characters)')
    }
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

        <h2 className="text-2xl font-bold mb-2">Войти</h2>
        <button onClick={() => setRegisterOpen(true)} className="text-green-600 text-sm mb-4 hover:underline">
          Регистрация
        </button>

        <p className="text-sm text-gray-600 mb-6">
          Оставьте ваши данные и мы свяжемся с вами. Мы не занимаемся рассылкой рекламных сообщений, а так же не передаем контактные данные третьим лицам
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type="email"
              placeholder="Ваш email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-full focus:border-green-600 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              required
              type={showPassword ? 'text' : 'password'}
              placeholder="Пароль"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
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
              <span className="text-gray-600">Запомнить меня</span>
            </label>
            <a href="#" className="text-green-600 hover:underline">Забыли пароль?</a>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-green-600 text-white font-bold px-8 py-3 rounded-full hover:bg-green-700 transition w-full sm:w-auto"
            >
              ВОЙТИ
            </button>
            <p className="text-xs text-gray-500 flex-1">
              Нажимая на кнопку, вы соглашаетесь на обработку{' '}
              <span className="text-green-600">персональных данных</span>
            </p>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-center text-sm text-gray-500 mb-3">Или войдите через</p>
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
