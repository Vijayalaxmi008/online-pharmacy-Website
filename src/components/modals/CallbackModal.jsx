import { useState } from 'react'
import Modal from './Modal'

const CallbackModal = ({ onClose, title = 'We vam perezvonim' }) => {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '' })

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => onClose(), 2000)
  }

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Thank you for zayavku!</h2>
            <p className="text-gray-500">We skoro svyazhemsya with vami</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-3">{title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              Ostavte vashi data and we svyazhemsya with vami
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input required type="text" placeholder="YEnter Your name" value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-green-600 focus:outline-none" />
              <input required type="tel" placeholder="Phone" value={form.phone}
                onChange={e => setForm({...form, phone: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-green-600 focus:outline-none" />
              <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-full hover:bg-green-700">
                Perezvonite Mne
              </button>
            </form>
          </>
        )}
      </div>
    </Modal>
  )
}

export default CallbackModal
