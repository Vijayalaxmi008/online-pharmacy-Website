import { useState } from 'react'
import Modal from './Modal'
import { CreditCard, Smartphone, ShieldCheck, Loader2 } from 'lucide-react'

const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  return digits.replace(/(.{4})/g, '$1 ').trim()
}

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

const BANKS = ['Sber Bank', 'Tinkoff', 'Vtb', 'Alfa Bank', 'Rayffayzen', 'Mts Bank']

const PaymentModal = ({ method, amount, onClose, onSuccess }) => {
  const [card, setCard] = useState({ number: '', holder: '', expiry: '', cvv: '' })
  const [sbp, setSbp] = useState({ bank: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [processing, setProcessing] = useState(false)

  const validateCard = () => {
    const errs = {}
    const digits = card.number.replace(/\D/g, '')
    if (!digits) errs.number = 'Enter number karty'
    else if (digits.length !== 16) errs.number = 'number karty dolzhen soderzhat 16 tsifr'

    if (!card.holder.trim()) errs.holder = 'Enter name vladeltsa karty'
    else if (!/^[a-zA-Za-yaA-Zee\s]+$/.test(card.holder.trim())) errs.holder = 'only bukvy'

    if (!card.expiry) errs.expiry = 'Enter shelf life deystviya'
    else {
      const m = card.expiry.match(/^(\d{2})\/(\d{2})$/)
      if (!m) errs.expiry = 'Format Mm/Gg'
      else if (parseInt(m[1], 10) < 1 || parseInt(m[1], 10) > 12) errs.expiry = 'Nevernyy month'
    }

    if (!card.cvv) errs.cvv = 'Enter CVV'
    else if (!/^\d{3}$/.test(card.cvv)) errs.cvv = 'CVV dolzhen soderzhat 3 tsifry'

    return errs
  }

  const validateSbp = () => {
    const errs = {}
    if (!sbp.bank) errs.bank = 'Vyberite bank'
    const digits = sbp.phone.replace(/\D/g, '')
    if (!digits) errs.phone = 'Enter number phone'
    else if (digits.length < 10) errs.phone = 'Enter korrektnyy number phone'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = method === 'card' ? validateCard() : validateSbp()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onSuccess()
    }, 900)
  }

  return (
    <Modal onClose={onClose} maxWidth="max-w-md">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-1">
          {method === 'card' ? <CreditCard size={20} className="text-primary-500" /> : <Smartphone size={20} className="text-primary-500" />}
          <h2 className="text-lg font-bold">{method === 'card' ? 'Payment bankovskoy kartoy' : 'Payment cherez Fast Payment System'}</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          K oplate: <span className="font-bold text-gray-700">{amount.toLocaleString('en-US')} RUB</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-3" noValidate>
          {method === 'card' ? (
            <>
              <div>
                <input
                  value={card.number}
                  onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                  placeholder="number karty" inputMode="numeric"
                  className={`w-full px-4 py-2.5 border-2 rounded-full text-sm focus:outline-none ${errors.number ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                />
                {errors.number && <p className="text-red-500 text-xs mt-1 ml-3">{errors.number}</p>}
              </div>

              <div>
                <input
                  value={card.holder}
                  onChange={(e) => setCard({ ...card, holder: e.target.value })}
                  placeholder="Name vladeltsa karty"
                  className={`w-full px-4 py-2.5 border-2 rounded-full text-sm focus:outline-none ${errors.holder ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                />
                {errors.holder && <p className="text-red-500 text-xs mt-1 ml-3">{errors.holder}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    value={card.expiry}
                    onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                    placeholder="Mm/Gg" inputMode="numeric"
                    className={`w-full px-4 py-2.5 border-2 rounded-full text-sm focus:outline-none ${errors.expiry ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                  />
                  {errors.expiry && <p className="text-red-500 text-xs mt-1 ml-3">{errors.expiry}</p>}
                </div>
                <div>
                  <input
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                    placeholder="CVV" inputMode="numeric" type="password"
                    className={`w-full px-4 py-2.5 border-2 rounded-full text-sm focus:outline-none ${errors.cvv ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1 ml-3">{errors.cvv}</p>}
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <select
                  value={sbp.bank}
                  onChange={(e) => setSbp({ ...sbp, bank: e.target.value })}
                  className={`w-full px-4 py-2.5 border-2 rounded-full text-sm focus:outline-none bg-white ${errors.bank ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                >
                  <option value="">Vyberite bank</option>
                  {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.bank && <p className="text-red-500 text-xs mt-1 ml-3">{errors.bank}</p>}
              </div>
              <div>
                <input
                  value={sbp.phone}
                  onChange={(e) => setSbp({ ...sbp, phone: e.target.value })}
                  placeholder="number phone, privyazannyy k Fast Payment System" inputMode="tel"
                  className={`w-full px-4 py-2.5 border-2 rounded-full text-sm focus:outline-none ${errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-primary-500'}`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 ml-3">{errors.phone}</p>}
              </div>
            </>
          )}

          <button type="submit" disabled={processing} className="w-full bg-primary-500 disabled:opacity-60 text-white font-bold py-3 rounded-full mt-2 text-sm flex items-center justify-center gap-2">
            {processing && <Loader2 size={16} className="animate-spin" />}
            {processing ? 'Obrabotka platezha...' : 'Oplatit'}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 text-center">
            <ShieldCheck size={13} className="text-primary-500 shrink-0" />
            data transferred on zashchishchennomu soedineniyu
          </p>
        </form>
      </div>
    </Modal>
  )
}

export default PaymentModal
