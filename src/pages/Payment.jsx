import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Store, ClipboardList, PackageCheck, Wallet, CreditCard, ShieldCheck, Building2 } from 'lucide-react'
import { howItWorks } from '../data/categories'

const STEP_ICONS = { 1: Search, 2: Store, 3: ClipboardList, 4: PackageCheck }

const CARDS = [
  { name: 'Vbrr', color: '#c9a227' },
  { name: 'Uralsib Bank', color: '#0072ce' },
  { name: 'Sber Bank', color: '#21a038' },
  { name: 'Rayffayzen Bank', color: '#fce300' },
  { name: 'Vtb', color: '#0a2896' },
  { name: 'Pochta Bank', color: '#c8102e' },
  { name: 'Mts Bank', color: '#e30611' },
  { name: 'Gazprombank', color: '#0033a0' },
  { name: 'Citibank', color: '#003b70' },
  { name: 'Alfa Bank', color: '#ef3124' },
]

const Payment = () => {
  const [phone, setPhone] = useState('')

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Home</Link> / Payment
      </p>
      <h1 className="text-2xl font-bold mb-4">Payment</h1>

      <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed mb-8">
       The Stolichki Social Pharmacy Network is part of the Neopharm Pharmacy Holding. 
       The first Stolichki pharmacy opened in Moscow in 2000. Since its establishment, the company's mission has been to make medicines affordable.
       By minimizing the supply chain between manufacturers and customers, Stolichki ensures competitive pricing and reliable availability. 
       Through direct partnerships with manufacturers and distributors, the company not only offers medicines at affordable prices but also guarantees the authenticity of every product.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {howItWorks.map(s => {
          const Icon = STEP_ICONS[s.step]
          return (
            <div key={s.step} className="bg-white rounded-2xl shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500">
                <Icon size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-primary-500 mb-0.5">{s.step} {s.title}</div>
                <p className="text-xs text-gray-500 leading-snug">{s.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      <h2 className="text-xl font-bold mb-4">Installment options</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="text-sm text-gray-600 leading-relaxed space-y-3">
          <p>
            ur extensive experience and well-established organizational structure support the continuous improvement and refinement of our development model,
             ensuring sustainable growth and operational excellence.
          </p>
          <p>
            The organization's objectives, particularly the new model of organizational operations, require clear definition.
          </p>
          <p>
            The guiding principles and the continued development of various areas of activity require the definition and refinement of future development directions.
          </p>
        </div>
        <div className="bg-primary-50 rounded-2xl p-5">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
           Our extensive experience and well-established organizational structure require the continuous improvement and refinement of our development model. 
           The organization's objectives, particularly the new model of organizational operations, require clear definition and ongoing development. 
           Strategic planning and forward-thinking initiatives help define and refine the direction of our future growth.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone"
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition"
            >
              Registration
            </button>
          </form>
          <p className="text-[11px] text-gray-400 mt-2">
            By clicking the button, you agree to the processing of personal data
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={20} className="text-primary-500" />
            <h2 className="text-lg font-bold">Cash payment</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <h3 className="font-bold text-sm mb-1.5">Where to pay</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Cash payment is available for courier delivery and at pickup locations. Payment is made directly to the courier or the cashier at the pharmacy when you receive your order. 
                You will also receive all the necessary documents and a receipt with your purchase.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1.5">or a receipt</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Copies of certificates and licenses are available upon request. 
                To pay for your order in cash upon delivery or pickup, select <b>"Cash"</b> as the payment method during checkout and click <b>"Place Order."</b>
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={20} className="text-primary-500" />
            <h2 className="text-lg font-bold">Payment by bank card</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <h3 className="font-bold text-sm mb-2">What payment methods are accepted?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CARDS.map(c => (
                  <div key={c.name} className="border border-gray-200 rounded-xl px-2 py-2.5 text-center flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-[11px] font-bold text-gray-700">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
              <ShieldCheck size={16} className="text-primary-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-sm mb-1">How is the security of personal data ensured?</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Our extensive experience and well-established organizational structure require the continuous improvement and refinement of our development model. 
                  The organization's objectives, particularly the new model of organizational operations, require clear definition and ongoing development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Building2 size={20} className="text-primary-500" />
          <h2 className="text-lg font-bold">Cashless payment for legal entities or individual entrepreneurs</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed space-y-3">
          <p>
            Our extensive experience and well-established organizational structure require the continuous improvement and refinement of our development model. 
            The organization's objectives, particularly the new model of organizational operations, require the definition and refinement of progressive development strategies. 
            Strategic planning and the continued development of various areas of activity help define and strengthen the direction of future growth.
          </p>
          <p>
            Our diverse and rich experience with constant information and propaganda support allows us to evaluate the importance of model development. 
            Comrades! Starting daily work on this... position-forming approach represents an interesting experiment in testing mass participation systems.
          </p>
        </div>
      </div>

              {/* Teal contact info banner */}
        <section className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl p-8 mb-8 text-center text-white">
          <p className="text-sm leading-relaxed max-w-3xl mx-auto">
            If you have any questions, please call our toll-free number.{' '}
            <a href="tel:88007772233" className="font-bold underline">8-800-777-22-33</a>, Please write down the email address.{' '}
            <a href="mailto:info@restoll.ru" className="font-bold underline">info@restoll.ru</a>. We to svyazi on
            We are available on weekdays from 9:00 to 18:00, and on weekends from 12:00 to 16:00.
          </p>
        </section>
    </div>
  )
}

export default Payment
