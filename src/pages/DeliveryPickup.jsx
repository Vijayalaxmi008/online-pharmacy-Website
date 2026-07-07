import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, MapPin, Clock, ShieldCheck, Pill, FileText, Search, ChevronDown } from 'lucide-react'

const PICKUP_POINTS = [
  { name: 'Stolichki', addr: 'Moscow region, Likino-Dulevo , Kalinina St., building No. 2A', hours: 'Mon-Sat: 08:00-21:00', phone: '8 800 775 03 33' },
  { name: 'E-PHARMACY', addr: 'Moscow region, Egorevsk , Parizhskoy Kommuny St., building No. 1B', hours: 'Mon-Sat: 08:00-21:00', phone: '8 495 730 53 00' },
  { name: 'Stolichki', addr: 'Moscow region, Likino-Dulevo , Kalinina St., building No. 2A', hours: 'Mon-Sat: 08:00-21:00', phone: '8 800 775 03 33' },
  { name: 'E-PHARMACY', addr: 'Moscow region, Egorevsk , Parizhskoy Kommuny St., building No. 1B', hours: 'Mon-Sat: 08:00-21:00', phone: '8 495 730 53 00' },
]

// Same city list shown in the PDF mockup's "Vybor goroda" block
const CITIES = [
  'Moscow', 'Saint Petersburg', 'Nizhny Novgorod', 'Rostov-on-Don', 'Samara', 'Kazan',
  'Yekaterinburg', 'Tolyatti', 'Omsk', 'Volgograd', 'Stavropol', 'Krasnodar',
  'Voronezh', 'Ufa', 'Yaroslavl', 'Saratov', 'Izhevsk', 'Chelyabinsk',
]

const DeliveryPickup = () => {
  const [city, setCity] = useState('Moscow')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)

  const filteredCities = CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase()))
  const visibleCities = expanded ? filteredCities : filteredCities.slice(0, 12)

  return (
  <div className="bg-gray-100">
  <div className="container mx-auto px-4 py-6">
    <p className="text-xs text-gray-500 mb-2">
      <Link to="/" className="hover:text-primary-500">Home</Link> / Delivery and Pickup
    </p>
    <h1 className="text-2xl font-bold mb-6">Delivery and Pickup</h1>

    {/* Vybor goroda */}
    <section className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
      <h2 className="text-lg font-bold mb-3">Select City</h2>
      <div className="relative max-w-md mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Naydite svoy gorod..."
          className="w-full pl-4 pr-10 py-2.5 rounded border border-gray-200 focus:border-primary-500 focus:outline-none text-sm"
        />
        <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-3 gap-y-2 text-sm">
        {visibleCities.map(c => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className={`text-left truncate ${c === city ? 'text-primary-500 font-bold' : 'text-gray-600 hover:text-primary-500'}`}
          >
            {c}
          </button>
        ))}
      </div>
      {filteredCities.length > 12 && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1 text-primary-500 text-xs font-bold mt-4 hover:underline"
        >
          {expanded ? 'Svernut' : 'Pokazat again'}
          <ChevronDown size={14} className={expanded ? 'rotate-180 transition' : 'transition'} />
        </button>
      )}
    </section>

    <div className="bg-white rounded-lg shadow-sm p-5 mb-10 flex items-center gap-4 border-l-4 border-primary-500">
      <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
        <Truck size={24} className="text-primary-500" />
      </div>
      <div>
        <h3 className="font-bold text-sm mb-1">Stay Home! Order Delivery!</h3>
        <p className="text-xs text-gray-500">
          To ensure your safety and peace of mind, we conduct daily health checks for all our couriers. 
          Before the start of each shift, every courier is provided with new medical masks, gloves, and hand sanitizers to maintain the highest standards of hygiene and safety throughout the delivery process.
        </p>
      </div>
    </div>

    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">Delivery</h2>
      <p className="text-sm text-gray-500 mb-4">Delivery and Pickup in {city} and oblasti</p>
      <h3 className="text-sm font-bold text-gray-500 mb-3">Delivery zakazov in within city ring road</h3>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-[#0b1f66] text-xs text-white">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Delivery Method</th>
              <th className="text-left px-4 py-3 font-medium">Delivery Time</th>
              <th className="text-left px-4 py-3 font-medium">Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr><td className="px-4 py-3">Courier Delivery</td><td className="px-4 py-3 text-gray-500">1-2 Hours</td><td className="px-4 py-3 text-primary-500 font-bold">150 RUB</td></tr>
            <tr><td className="px-4 py-3">Courier Delivery (Express)</td><td className="px-4 py-3 text-gray-500">30-60 min</td><td className="px-4 py-3 text-primary-500 font-bold">from 300 RUB</td></tr>
            <tr><td className="px-4 py-3">For Orders of 500 RUB or More</td><td className="px-4 py-3 text-gray-500">1-2 Hours</td><td className="px-4 py-3 text-primary-500 font-bold">Free</td></tr>
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Clock, t: 'SMS with the courier\'s phone number', d: 'before the delivery day' },
          { icon: ShieldCheck, t: 'Careful transportation', d: 'under proper conditions' },
          { icon: Truck, t: 'Tracking', d: 'Before delivery' },
          { icon: MapPin, t: 'Time slot', d: 'Convenient delivery' },
        ].map(f => (
          <div key={f.t} className="bg-white rounded-lg shadow-sm p-4 text-center border border-gray-100">
            <f.icon size={20} className="text-primary-500 mx-auto mb-2" />
            <h4 className="font-bold text-xs mb-1">{f.t}</h4>
            <p className="text-[11px] text-gray-500">{f.d}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Pill size={18} className="text-primary-500" />
            <h3 className="font-bold text-sm">Delivery of Non-Prescription Medicines</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            In accordance with Presidential Decree No. 187 dated March 17, 2020, on the remote sale of non-prescription medicines, we provide home delivery 
            of non-prescription medicines, dietary supplements, medical devices, home and beauty products, household chemicals, and related products.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={18} className="text-primary-500" />
            <h3 className="font-bold text-sm">Delivery of Prescription Medicines</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Prescription medicines are delivered to the nearest pharmacy upon presentation of a valid prescription issued by a licensed physician.
             Customers may collect their order in person by presenting the original prescription along with a valid government-issued identification document to verify their identity.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">Return and Exchange Procedure</h2>
      <div className="bg-white rounded-lg shadow-sm p-5 text-sm text-gray-600 space-y-2 border border-gray-100">
        <p>You may refuse the delivered order and decline payment in the following cases:</p>
        <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
          <li>The delivered product does not match the product that was ordered.</li>
          <li>The product has been damaged due to compromised or damaged packaging.</li>
          <li>The product has been damaged due to packaging that was unsuitable for the nature of the contents and the shipping conditions
             (with the exception of temperature control requirements).</li>
        </ul>
        <p className="text-xs text-gray-400 pt-1">The product may be returned only at the time of delivery.</p>
        <p className="text-xs text-primary-500 pt-1">
        In accordance with Resolution No. 2463 of the Government of the Russian Federation, dated December 31, 2020, goods of proper quality are not eligible
         for exchange or return. These include medicines, personal hygiene products (such as toothbrushes and other similar items), and perfumes and cosmetic products.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Pickup</h2>
      <div className="space-y-3 mb-6">
        {PICKUP_POINTS.map((p, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm border border-gray-100">
            <span className="font-bold text-primary-500 w-24 shrink-0">{p.name}</span>
            <div className="flex items-start gap-2 flex-1">
              <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
              <span className="text-gray-600">{p.addr}</span>
            </div>
            <span className="text-gray-500 text-xs shrink-0">{p.hours}</span>
            <span className="text-gray-700 font-medium text-xs shrink-0">{p.phone}</span>
            <button className="text-primary-500 text-xs font-bold hover:underline shrink-0">to see</button>
          </div>
        ))}
      </div>

      <div className="bg-primary-50 rounded-lg p-5 border border-primary-100">
        <h3 className="font-bold text-sm mb-2">Self-pickup terms</h3>
        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
          <li>Self-pickup cost — free</li>
          <li>Pickup at partner pharmacies for orders of 500 RUB or more.</li>
          <li>Your order will be stored for 5 days from the time it is delivered to the pickup point.</li>
        </ul>
      </div>
    </section>
  </div>
  </div>
  )
}

export default DeliveryPickup
