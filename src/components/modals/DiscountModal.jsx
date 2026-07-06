
import { useState } from 'react'
import Modal from './Modal'

const DiscountModal = ({ onClose }) => {
  const [sent, setSent] = useState(false)
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
            <h2 className="text-2xl font-bold mb-2">Спасибо!</h2>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-3">Скидка 20% на первый товар</h2>
            <p className="text-sm text-gray-600 mb-4">
              Оставьте ваши данные и мы свяжемся с вами. Мы не занимаемся рассылкой рекламных сообщений, а так же не передаем контактные данные третьим лицам
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input required placeholder="Ваше имя" className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-brand-green focus:outline-none" />
              <input required type="tel" placeholder="Телефон" className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-brand-green focus:outline-none" />
              <p className="text-xs text-gray-500">Нажимая на кнопку, вы соглашаетесь на обработку <span className="text-brand-green">персональных данных</span></p>
              <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded-full">Получить скидку</button>
            </form>
          </>
        )}
      </div>
    </Modal>
  )
}

export default DiscountModal
