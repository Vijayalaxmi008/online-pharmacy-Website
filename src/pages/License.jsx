import { Link } from 'react-router-dom'
import licenceImg from '../assets/images/license/licence.png'

const License = () => (
  <div className="container mx-auto px-4 py-6">
    <p className="text-xs text-gray-500 mb-2">
      <Link to="/" className="hover:text-primary-500">Home</Link> / Our license
    </p>
    <h1 className="text-2xl font-bold mb-4">Our license</h1>

    <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed mb-6">
      The <b>Pharmacy.online</b> network of social pharmacies is part of a pharmacy holding company.
      The first pharmacy in Moscow opened in 2000. By partnering directly with manufacturers and distributors, 
      we are able to offer medications at affordable prices while ensuring that every product is genuine. 
      All medications available in our pharmacies are approved by the Russian Ministry of Health, 
      providing customers with trusted and reliable healthcare products.
    </div>

    <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
      <img
        src={licenceImg}
        alt="License to osushchestvlenie farmatsevticheskoy activity"
        className="w-full h-auto rounded-xl"
      />
    </div>

    <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 text-sm text-gray-600">
     Copies of certificates and licenses are available upon prior request. 
     If you require additional information or documentation, our team will be happy to assist you. 
     Please contact us by phone, and we will provide the necessary details.
 <span className="font-bold text-primary-600"> 8-800-777-22-33</span>.
    </div>
  </div>
)

export default License
