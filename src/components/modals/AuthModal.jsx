import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from './Modal'
import { useApp } from '../../context/AppContext'
import { Mail, Lock, Phone } from 'lucide-react'

const AuthModal = ({ onClose, mode: initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode)
  const { setUser, users } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', phone: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (mode === 'login') {
      const user = users.find(u => u.email === form.email)
      if (!user) { setError('Пользователь не найден'); return }
      if (user.password !== form.password) { setError('Неверный пароль'); return }
      setUser(user)
    } else {
      const newUser = { name: form.phone, phone: form.phone, email: form.email || `${form.phone}@phone.local`, password: form.password }
      setUser(newUser)
    }
    onClose()
    navigate('/account')
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <h2 className="text-lg font-bold">{mode === 'login' ? 'Войти' : 'Регистрация'}</h2>
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-primary-500 text-sm hover:underline">
            {mode === 'login' ? 'Регистрация' : 'Войти'}
          </button>
        </div>
        <p className="text-xs text-gray-600 mb-4">Оставьте ваши данные и мы свяжемся с вами.</p>
        {error && <div className="mb-3 p-2.5 bg-red-50 text-red-600 text-xs rounded-lg">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'login' ? (
            <>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required type="email" placeholder="Ваш email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm" />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required type="password" placeholder="Пароль" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm" />
              </div>
            </>
          ) : (
            <>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required type="tel" placeholder="Ваш телефон" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm" />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input required type="password" placeholder="Пароль" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                  className="w-full pl-10 pr-3 py-2.5 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none text-sm" />
              </div>
            </>
          )}
          <div className="flex items-center gap-3 pt-1">
            <button type="submit" className="bg-primary-500 text-white font-bold px-6 py-2.5 rounded-full hover:bg-primary-600 text-xs">{mode === 'login' ? 'ВОЙТИ' : 'РЕГИСТРАЦИЯ'}</button>
            <p className="text-[10px] text-gray-500 flex-1">Нажимая на кнопку, вы соглашаетесь на обработку <span className="text-primary-500">персональных данных</span></p>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default AuthModal
