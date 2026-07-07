import { useState } from 'react'
import Modal from './Modal'
import { products } from '../../data/products'

const OneClickOrderModal = ({ onClose }) => {
  const product = products[0]
  const [qty, setQty] = useState(1)
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => onClose(), 2000)
  }

  return (
    <Modal onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-6">
        {sent ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">Order prinyat!</h2>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-3">Order in 1 klik</h2>
            <p className="text-sm text-gray-600 mb-4">
              Ostavte vashi data and we svyazhemsya with vami. We not zanimaemsya rassylkoy reklamnykh soobshcheniy, a tak zhe not peredaem kontaktnye data third parties
            </p>
            <div className="flex gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="relative shrink-0">
                <span className="absolute top-0 left-0 bg-brand-green text-white text-xs px-2 py-0.5 rounded">Product of the day</span>
                <img src={product.image} alt={product.name} className="w-32 h-24 object-cover rounded" />
              </div>
              <div className="flex-1">
                <span className="text-brand-green text-sm">In stock</span>
                <div className="flex mt-1">★★★★☆</div>
                <h3 className="text-sm font-medium mt-1">{product.name}</h3>
                <div className="text-2xl font-bold mt-2">{product.price.toLocaleString('en-US')} RUB</div>
                {product.oldPrice && <div className="text-sm text-red-500 line-through">{product.oldPrice.toLocaleString('en-US')} RUB</div>}
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center font-bold">−</button>
                  <span className="font-bold w-8 text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-full bg-brand-green text-white flex items-center justify-center font-bold">+</button>
                </div>
              </div>
            </div>
            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Your name" className="px-4 py-3 border-2 border-gray-200 rounded-full focus:border-brand-green focus:outline-none" />
                <input required type="tel" placeholder="Phone" className="px-4 py-3 border-2 border-gray-200 rounded-full focus:border-brand-green focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded-full">Sdelat Zakaz</button>
              <p className="text-xs text-gray-500 text-center">
                By clicking the button, you agree to the processing of <span className="text-brand-green">personal data</span>
              </p>
            </form>
          </>
        )}
      </div>
    </Modal>
  )
}

export default OneClickOrderModal
