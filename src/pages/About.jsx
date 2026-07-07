import { Link } from 'react-router-dom'
import { ShoppingBag, Truck, ShieldCheck, PiggyBank, Users, Building2 } from 'lucide-react'
import { features } from '../data/categories'

const ICONS = { 1: ShoppingBag, 2: Truck, 3: ShieldCheck, 4: PiggyBank }

const historyPeriods = [
  { years: '2005-2008', text: 'Our diverse and extensive experience, combined with our daily efforts to strengthen our position, supports the development and implementation of a comprehensive employee training system that meets current industry needs. At the same time, our structured approach to staff training provides broad opportunities for professional growth, continuous learning, and the development of the skills required to maintain high standards of service and operational excellence.' },
  { years: '2008-2012', text: 'Our diverse and extensive experience, combined with our daily efforts to strengthen our position, supports the development and implementation of a comprehensive employee training system that meets current industry needs. At the same time, our structured approach to staff training provides broad opportunities for professional growth, continuous learning, and the development of the skills required to maintain high standards of service and operational excellence.' }, 
  { years: '2012-2016', text: 'Our diverse and extensive experience, combined with our daily efforts to strengthen our position, supports the development and implementation of a comprehensive employee training system that meets current industry needs. At the same time, our structured approach to staff training provides broad opportunities for professional growth, continuous learning, and the development of the skills required to maintain high standards of service and operational excellence.' },
  { years: '2016-2018', text: 'Our diverse and extensive experience, combined with our daily efforts to strengthen our position, supports the development and implementation of a comprehensive employee training system that meets current industry needs. At the same time, our structured approach to staff training provides broad opportunities for professional growth, continuous learning, and the development of the skills required to maintain high standards of service and operational excellence.' },
  { years: '2018-2020', text: 'Our diverse and extensive experience, combined with our daily efforts to strengthen our position, supports the development and implementation of a comprehensive employee training system that meets current industry needs. At the same time, our structured approach to staff training provides broad opportunities for professional growth, continuous learning, and the development of the skills required to maintain high standards of service and operational excellence.' },
  { years: '2020-2021', text: 'Our diverse and extensive experience, combined with our daily efforts to strengthen our position, supports the development and implementation of a comprehensive employee training system that meets current industry needs. At the same time, our structured approach to staff training provides broad opportunities for professional growth, continuous learning, and the development of the skills required to maintain high standards of service and operational excellence.' }

]

const stats = [
  { icon: Users, value: '5000', label: 'sotrudnikov. Nastoyashchaya bolshaya semya!' },
  { icon: Building2, value: '750', label: 'pharmacies in 80 gorodakh Tsentralnogo and Severo-zapadnogo okrugov Russian Federation' },
  { icon: Users, value: '5000', label: 'sotrudnikov. Nastoyashchaya bolshaya semya!' },
  { icon: Building2, value: '750', label: 'pharmacies in 80 gorodakh Tsentralnogo and Severo-zapadnogo okrugov Russian Federation' },
]

const About = () => (
  <div className="container mx-auto px-4 py-6">
    <p className="text-xs text-gray-500 mb-2">
      <Link to="/" className="hover:text-primary-500">Home</Link> / About Company
    </p>
    <h1 className="text-2xl font-bold mb-4">About Company</h1>

    <div className="bg-white rounded-2xl p-5 shadow-sm text-sm text-gray-600 leading-relaxed space-y-3 mb-6">
      <p>
       <b>Stolichki</b> is a chain of social pharmacies and is part of the <b>Neofarm Pharmacy Holding</b>. The first pharmacy in Moscow was opened in 2000. Our mission from the very first day has been simple: to make medicines affordable. We have shortened the path of medicines from the manufacturer to the customer as much as possible. By working directly with manufacturers and distributors, we not only offer medicines at low prices but also guarantee the authenticity of our products.
        In addition to low prices, we continuously work to expand our product range so that finding medicines is easy for you.
        In addition to our pharmacy stores, the Stolichki website offers a wide range of products, including medicines, medical equipment, therapeutic cosmetics, sports nutrition, products for mothers and babies, and more.
        In addition to this, only medicines approved by the Russian Ministry of Health are permitted for sale in our pharmacies.

      </p>
      <p>
        In addition to low prices, we continuously work to expand our product range to make finding medicines easy for you. 
        In our pharmacy stores and on the Stolichki website, you will find a wide selection of medicines, medical equipment, therapeutic cosmetics, sports nutrition, products for mothers and babies, and much more. 
        In our pharmacies, only medicines approved by the Russian Ministry of Health are permitted for sale.

      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {features.map(f => {
        const Icon = ICONS[f.id]
        return (
          <div key={f.id} className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary-100 flex items-center justify-center text-primary-500 mb-3">
              <Icon size={22} />
            </div>
            <h3 className="font-bold mb-1 text-sm">{f.title}</h3>
            <p className="text-xs text-gray-500">{f.desc}</p>
          </div>
        )
      })}
    </div>

    <h2 className="text-xl font-bold mb-3">Our History</h2>
    <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed mb-10">
      The history of the Neofarm Group began in 2000 as a small family-owned business with the opening of several pharmacy kiosks in the Krasnogorsk district of the Moscow region. 
      The company was led by pharmacist Evgeniy Nifantev, a graduate of the I.M. Sechenov First Moscow Medical Institute.
      In 2013, the first pharmacy operating under the <b>Stolichki</b> brand was opened on Tolbukhina Street. 
      The pharmacy quickly became popular, attracting not only local residents but also customers from nearby neighborhoods and even from the town of Odintsovo in the Moscow region.
      This strong customer response showed that the social pharmacy concept was in high demand among the public. 
      As a result, new Stolichki pharmacies began opening one after another, rapidly expanding the chain's presence across different locations and reaching a growing number of customers.
</div>

    <div className="bg-gray-50 rounded-2xl p-6 mb-10">
      <h2 className="text-xl font-bold mb-5">History of Our Development</h2>
      <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
        {historyPeriods.map(p => (
          <div key={p.years}>
            <h3 className="font-bold text-primary-500 mb-2">{p.years}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </div>

    <h2 className="text-xl font-bold mb-1">Today "Pharmacy"</h2>
    <p className="text-sm text-gray-500 mb-5">…This is -</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {stats.map((s, i) => {
        const Icon = s.icon
        return (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-3">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500">
              <Icon size={18} />
            </div>
            <p className="text-xs text-gray-500">
             More than<span className="font-bold text-gray-900">{s.value}</span> {s.label}
            </p>
          </div>
        )
      })}
    </div>

    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold mb-1">Our license</h2>
        <p className="text-sm text-gray-500">Copies of our certificates and licenses for pharmaceutical activities are available upon request. 
          These documents confirm that our company is fully licensed and authorized to carry out pharmaceutical operations in accordance with applicable regulations. 
          They also demonstrate our commitment to maintaining the required quality, safety, and compliance standards in all of our pharmaceutical services.
</p>
      </div>
      <Link
        to="/license"
        className="shrink-0 px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition"
      >
        View License
      </Link>
    </div>
  </div>
)

export default About
