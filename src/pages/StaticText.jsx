import { Link } from 'react-router-dom'

const StaticText = ({ title = 'Information' }) => (
  <div className="container mx-auto px-4 py-6">
    <p className="text-xs text-gray-500 mb-2">
      <Link to="/" className="hover:text-primary-500">Home</Link> / {title}
    </p>
    <h1 className="text-2xl font-bold mb-4">{title}</h1>

    <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed space-y-3">
      <p>
       This document governs the processing and use of users' personal data on the Pharmacy.online website. 
       By continuing to use the website, you agree to the terms set out below.
      </p>
      <p>
       We collect only the information necessary to process and deliver your order, including your name, phone number, email address, and delivery address. 
       This information is not shared with third parties except as required by the laws of the Russian Federation.
      </p>
      <p>
       Users have the right to request the deletion of their personal data at any time by contacting our support team by phone at 8-800-777-22-33 or by email at [info@restoll.ru](mailto:info@restoll.ru).
      </p>
      <p>
        This website uses cookies to improve our services and personalize content. By continuing to use the website, you consent to the use of cookies.
      </p>
    </div>
  </div>
)

export default StaticText
