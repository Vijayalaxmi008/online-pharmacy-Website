import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, Phone, Mail, User, Eye, EyeOff, X, AlertCircle, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'

const Register = () => {
  const navigate = useNavigate()
  const { setUser } = useApp()
  const [step, setStep] = useState(1)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', password: '', confirmPassword: '', agree: false })

  const handleNext = (e) => {
    e.preventDefault()
    const phoneClean = form.phone.replace(/\D/g, '')
    if (phoneClean.length !== 11) { setError('Enter phone in format +7XXXXXXXXXX'); return }
    if (form.password.length < 6) { setError('Password minimum 6 characters'); return }
    setError('')
    setStep(2)
  }

  const submit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) { setError('Passwords not match'); return }
    if (!form.agree) { setError('Required consent'); return }
    setUser({ name: form.name || form.phone, phone: form.phone, email: form.email || `${form.phone}@phone.local`, password: form.password })
    navigate('/account')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <Link to="/" className="absolute top-3 right-3 text-gray-400"><X size={20} /></Link>
        <h2 className="text-xl font-bold mb-2">Register</h2>
        <Link to="/login" className="text-primary-500 text-sm mb-3 inline-block">Sign In</Link>
        <div className="flex items-center gap-2 mb-3 text-xs">
          <div className={`flex items-center gap-1 ${step >= 1 ? 'text-primary-500' : 'text-gray-400'}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}>{step > 1 ? <Check size={10} /> : '1'}</div>
            <span>Phone</span>
          </div>
          <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-primary-500' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center gap-1 ${step >= 2 ? 'text-primary-500' : 'text-gray-400'}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}>2</div>
            <span>Profile</span>
          </div>
        </div>
        {error && <div className="mb-3 p-2.5 bg-red-50 text-red-600 text-xs rounded-lg flex items-start gap-2"><AlertCircle size={14} className="shrink-0 mt-0.5" /><span>{error}</span></div>}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-3">
            <div className="relative">
              <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input required type="tel" placeholder="+7 (999) 123-45-67" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input required type={show ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
                className="w-full pl-9 pr-9 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            <button type="submit" className="w-full bg-primary-500 text-white font-bold py-2.5 rounded-full text-sm">NEXT</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={submit} className="space-y-3">
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div className="relative">
              <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input required type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})}
                className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none" />
            </div>
            <label className="flex items-start gap-2 text-xs cursor-pointer">
              <input type="checkbox" checked={form.agree} onChange={e => setForm({...form, agree: e.target.checked})} className="accent-primary-500 mt-1" />
              <span>I agree to processing personal data</span>
            </label>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-primary-500 text-white font-bold py-2.5 rounded-full text-sm">Registratsiya</button>
              <button type="button" onClick={() => setStep(1)} className="text-gray-500 text-sm px-3">Back</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Register
