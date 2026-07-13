import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { Heart, Trash2 } from 'lucide-react'

const Favorites = () => {
  const { favorites, clearFavorites } = useApp()
  const favProducts = products.filter(p => favorites.includes(p.id))
  const recommended = products.filter(p => !favorites.includes(p.id)).slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Home</Link> / Favorites
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">Favorites</h1>
        {favProducts.length > 0 && (
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={clearFavorites}
              className="flex items-center gap-1.5 text-gray-500 hover:text-primary-500 transition"
            >
              <Trash2 size={14} /> ochistit everything
            </button>
            <Link
              to="/cart"
              className="bg-primary-500 text-white font-bold px-4 py-2 rounded-full hover:bg-primary-600 transition"
            >
              Dobavit Vse ADD TO CART
            </Link>
          </div>
        )}
      </div>

      {favProducts.length === 0 ? (
        <div className="text-center py-12 mb-10">
          <Heart size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Net favorite products</p>
          <Link to="/catalog" className="inline-block mt-4 text-primary-500 font-semibold hover:underline">
            Go to catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {favProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Pay Attention</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {recommended.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

export default Favorites
