import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { CheckCircle2, Wallet, CreditCard, Smartphone, AlertCircle } from 'lucide-react'
import mapImage from '../assets/images/map/image.png'
import PaymentModal from '../components/modals/PaymentModal'

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Nalichnymi with poluchenii', icon: Wallet },
  { id: 'card', label: 'Bankovskoy kartoy online', icon: CreditCard },
  { id: 'sbp', label: 'Payment cherez Fast Payment System', icon: Smartphone },
]

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [done, setDone] = useState(false)
  const [orderType, setOrderType] = useState('delivery')

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', agree: false })
  const [paymentMethod, setPaymentMethod] = useState('')
  const [errors, setErrors] = useState({})
  const [activePaymentModal, setActivePaymentModal] = useState(null) // 'card' | 'sbp' | null

  const contactRef = useRef(null)
  const addressRef = useRef(null)
  const paymentRef = useRef(null)

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Pozhaluysta, ukazhite vashe name'

    if (!form.phone.trim()) errs.phone = 'Pozhaluysta, ukazhite number phone'
    else if (form.phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter korrektnyy number phone'

    if (orderType === 'delivery' && !form.address.trim()) errs.address = 'Pozhaluysta, ukazhite address delivery'

    if (!paymentMethod) errs.paymentMethod = 'Pozhaluysta, vyberite sposob oplaty'

    return errs
  }

  const finalizeOrder = () => {
    setDone(true)
    clearCart()
  }

  const handleConfirmOrder = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      if (errs.name || errs.phone) contactRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      else if (errs.address) addressRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      else if (errs.paymentMethod) paymentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})
    if (paymentMethod === 'cod') finalizeOrder()
    else setActivePaymentModal(paymentMethod)
  }

  if (done) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <CheckCircle2 size={64} className="mx-auto text-primary-500 mb-3" />
        <h1 className="text-2xl font-bold mb-2">Order placed!</h1>
        <p className="text-gray-500">We will contact you shortly.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Oformlenie order</h1>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">

          <div ref={contactRef} className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm mb-3">Contact details</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <input
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Your name *"
                  className={`w-full px-3 py-2.5 border-2 rounded-full text-sm focus:outline-none ${errors.name ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                />
                {errors.name && <p className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-3"><AlertCircle size={12} />{errors.name}</p>}
              </div>
              <div>
                <input
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="Your phone *"
                  className={`w-full px-3 py-2.5 border-2 rounded-full text-sm focus:outline-none ${errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                />
                {errors.phone && <p className="flex items-center gap-1 text-red-500 text-xs mt-1 ml-3"><AlertCircle size={12} />{errors.phone}</p>}
              </div>
            </div>
            <label className="flex items-center gap-2 mt-3 text-xs">
              <input type="checkbox" checked={form.agree} onChange={(e) => updateField('agree', e.target.checked)} className="accent-primary-500" />
              <span>Send Sms coated izmenenii statusa order</span>
            </label>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm mb-3">Your order</h3>
            <div className="space-y-2 text-xs">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-2">
                  <img src={item.image} className="w-10 h-10 object-contain rounded bg-gray-50" />
                  <div className="flex-1 truncate">{item.name}</div>
                  <div className="text-primary-500 font-bold">{item.price.toLocaleString('en-US')} RUB</div>
                </div>
              ))}
            </div>
          </div>

          <div ref={addressRef} className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm mb-3">Delivery</h3>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button onClick={() => setOrderType('delivery')} className={`py-2 rounded-full text-sm font-bold ${orderType === 'delivery' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}>Dostavka</button>
              <button onClick={() => setOrderType('pickup')} className={`py-2 rounded-full text-sm font-bold ${orderType === 'pickup' ? 'bg-primary-500 text-white' : 'bg-gray-100'}`}>Samovyvoz</button>
            </div>
            {orderType === 'delivery' && (
              <>
                <input
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Enter address *"
                  className={`w-full px-3 py-2 border-2 rounded-lg text-sm mb-1 focus:outline-none ${errors.address ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                />
                {errors.address && <p className="flex items-center gap-1 text-red-500 text-xs mb-2 ml-1"><AlertCircle size={12} />{errors.address}</p>}
                <div className="flex flex-wrap gap-2 mt-2">
                  {['building', 'Ofis', 'Poliklinika', 'Other'].map(t => (
                    <button key={t} className="px-3 py-1.5 border-2 border-gray-200 rounded-full text-xs hover:border-primary-500">{t}</button>
                  ))}
                </div>
                <a href="#" className="text-primary-500 text-xs mt-2 inline-block">Zapomnit moy address</a>
              </>
            )}
          </div>

          {orderType === 'pickup' && (
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-sm mb-3">Pickup</h3>
              <div className="grid grid-cols-4 gap-2 text-xs mb-3">
                {['Moscow', 'Saint Petersburg', 'Balashikha', 'Vladimir'].map(c => (
                  <button key={c} className="text-primary-500 text-left">{c}</button>
                ))}
              </div>
              <img src={mapImage} alt="Karta punktov samovyvoza" className="w-full h-40 object-cover rounded-xl mb-3" />
            </div>
          )}

          <div ref={paymentRef} className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm mb-3">Payment method</h3>
            <div className="space-y-2">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <label key={id} className={`flex items-center gap-3 px-3 py-2.5 border-2 rounded-xl text-sm cursor-pointer transition ${paymentMethod === id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input
                    type="radio" name="paymentMethod" value={id} checked={paymentMethod === id}
                    onChange={() => { setPaymentMethod(id); if (errors.paymentMethod) setErrors(prev => ({ ...prev, paymentMethod: undefined })) }}
                    className="accent-primary-500"
                  />
                  <Icon size={16} className="text-primary-500" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {errors.paymentMethod && <p className="flex items-center gap-1 text-red-500 text-xs mt-2 ml-1"><AlertCircle size={12} />{errors.paymentMethod}</p>}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm mb-3">Confirm your order</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-base pt-2 border-t mt-2"><span>Total:</span><span>{totalPrice.toLocaleString('en-US')} RUB</span></div>
            </div>
            <button onClick={handleConfirmOrder} className="w-full bg-primary-500 text-white font-bold py-2.5 rounded-full mt-4 text-sm">CONFIRM ORDER</button>
          </div>
        </div>
      </div>

      {activePaymentModal && (
        <PaymentModal
          method={activePaymentModal}
          amount={totalPrice}
          onClose={() => setActivePaymentModal(null)}
          onSuccess={() => { setActivePaymentModal(null); finalizeOrder() }}
        />
      )}
    </div>
  )
}

export default Checkout
