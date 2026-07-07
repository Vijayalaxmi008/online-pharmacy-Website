import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Truck, ShieldCheck, PiggyBank, Building2, Handshake } from 'lucide-react'

const BENEFITS = [
  { icon: ShieldCheck, title: 'Izvestnyy brend', desc: 'Bolee 750 pharmacies in 80 gorodakh and uznavaemost seti «Pharmacy.online».' },
  { icon: Truck, title: 'Gotovaya logistika', desc: 'Otlazhennye postavki from proizvoditeley and distribyutorov napryamuyu.' },
  { icon: PiggyBank, title: 'Nizkiy porog vkhoda', desc: 'Gibkie usloviya otkrytiya tochki and podderzhka to vsekh etapakh zapuska.' },
  { icon: ShoppingBag, title: 'Shirokiy assortiment', desc: 'Lekarstva, medtekhnika, kosmetika and tovary for mam and malyshey.' },
]

const STEPS = [
  { step: 1, title: 'Zayavka', desc: 'Ostavlyaete kontakty in forme below' },
  { step: 2, title: 'consultation', desc: 'Menedzher obsuzhdaet usloviya and lokatsiyu' },
  { step: 3, title: 'Dogovor', desc: 'Podpisyvaem franchayzingovoe soglashenie' },
  { step: 4, title: 'Zapusk', desc: 'Pomogaem otkryt and zapustit apteku' },
]

const Franchise = () => {
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Home</Link> / Franchise
      </p>
      <h1 className="text-2xl font-bold mb-4">Franchise «Pharmacy.online»</h1>

      <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed mb-8">
        Set sotsialnykh pharmacies «Pharmacy.online» yavlyaetsya chastyu krupnogo aptechnogo kholdinga. We priglashaem
        predprinimateley k sotrudnichestvu and predlagaem otkryt apteku pod nashim brendom: with gotovoy biznes-modelyu,
        podderzhkoy postavok and nizkimi tsenami for pokupateley.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {BENEFITS.map((b, i) => {
          const Icon = b.icon
          return (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary-100 flex items-center justify-center text-primary-500 mb-3">
                <Icon size={22} />
              </div>
              <h3 className="font-bold mb-1 text-sm">{b.title}</h3>
              <p className="text-xs text-gray-500">{b.desc}</p>
            </div>
          )
        })}
      </div>

      <h2 className="text-xl font-bold mb-4">How nachat</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STEPS.map(s => (
          <div key={s.step} className="bg-white rounded-2xl shadow-sm p-4 flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500 font-bold text-sm">
              {s.step}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900 mb-0.5">{s.title}</div>
              <p className="text-xs text-gray-500 leading-snug">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="flex items-center gap-3">
          <Building2 size={22} className="text-primary-500 shrink-0" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Bolee 750 pharmacies in 80 gorodakh Tsentralnogo and Severo-Zapadnogo okrugov Russian Federation uzhe rabotayut pod nashim brendom.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Handshake size={22} className="text-primary-500 shrink-0" />
          <p className="text-sm text-gray-600 leading-relaxed">
            We soprovozhdaem partnerov to kazhdom etape — from vybora pomeshcheniya up to obucheniya personala.
          </p>
        </div>
      </div>

      <div className="bg-primary-50 rounded-2xl p-5 max-w-xl">
        <h3 className="font-bold text-sm mb-1">Ostavit zayavku to franshizu</h3>
        {sent ? (
          <p className="text-sm text-primary-700 mt-3">Thank you! We will contact you shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-3">
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone"
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary-500"
            />
            <button type="submit" className="px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition whitespace-nowrap">
              LEAVE Zayavku
            </button>
          </form>
        )}
        <p className="text-[11px] text-gray-400 mt-2">
          By clicking the button, you agree to the processing of{' '}
          <Link to="/privacy" className="text-primary-500 hover:underline">personal data</Link>
        </p>
      </div>
    </div>
  )
}

export default Franchise
