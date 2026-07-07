
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
            <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-3">Discount 20% to pervyy product</h2>
            <p className="text-sm text-gray-600 mb-4">
              Ostavte vashi data and we svyazhemsya with vami. We not zanimaemsya rassylkoy reklamnykh soobshcheniy, a tak zhe not peredaem kontaktnye data third parties
            </p>
            <form onSubmit={submit} className="space-y-3">
              <input required placeholder="Your name" className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-brand-green focus:outline-none" />
              <input required type="tel" placeholder="Phone" className="w-full px-4 py-3 border-2 border-gray-200 rounded-full focus:border-brand-green focus:outline-none" />
              <p className="text-xs text-gray-500">By clicking the button, you agree to the processing of <span className="text-brand-green">personal data</span></p>
              <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded-full">Poluchit skidku</button>
            </form>
          </>
        )}
      </div>
    </Modal>
  )
}

export default DiscountModal
