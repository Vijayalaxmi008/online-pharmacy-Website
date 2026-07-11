import { Link } from 'react-router-dom'
const NotFound = () => (
  <div className="container mx-auto px-4 py-20 text-center">
    <div className="text-7xl font-bold text-primary-200">404</div>
    <h1 className="text-2xl font-bold mt-3 mb-3">Page not found</h1>
    <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
      The page you are looking for doesn't exist or may have been moved. Please check the address or return to the homepage.
    </p>
    <Link to="/" className="inline-block bg-primary-500 text-white px-5 py-2.5 rounded-full font-bold hover:bg-primary-600 transition">Back to homepage</Link>
  </div>
)
export default NotFound