import { Link } from 'react-router-dom'
const NotFound = () => (
  <div className="container mx-auto px-4 py-20 text-center">
    <div className="text-7xl font-bold text-primary-200">404</div>
    <h1 className="text-2xl font-bold mt-3 mb-3">Article not naydena</h1>
    <Link to="/" className="bg-primary-500 text-white px-5 py-2.5 rounded-full">to glavnuyu</Link>
  </div>
)
export default NotFound
