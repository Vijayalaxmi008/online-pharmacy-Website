import { Link } from 'react-router-dom'
import { Heart, Star, ShoppingCart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product, showNumber = false, number = 0, onSelect = null }) => {
  const { favorites, toggleFavorite } = useApp()
  const { addToCart } = useCart()
  const isFav = favorites.includes(product.id)

  // When an onSelect handler is passed in, clicking the product opens it
  // in-page instead of navigating to the standalone /product/:id route.
   
    const handleOpen = (e) => {
    if (onSelect) {
      e.preventDefault()
      onSelect(product)
    }
  }

  return (
    <div className="group bg-white border border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col relative">
      {showNumber && (
        <div className="absolute -top-3 -left-3 z-10 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center font-bold text-gray-400">{number}</div>
      )}
      <div className="relative p-6 flex justify-center items-center bg-white">
        {product.isProductOfDay && (
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">Deal of the Day</span>
        )}
        <button onClick={() => toggleFavorite(product.id)} className="absolute top-4 right-4 w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all z-10">
          <Heart size={14} className={isFav ? 'fill-primary-500 text-primary-500' : 'text-gray-400'} />
        </button>
        <Link to={`/product/${product.id}`} onClick={handleOpen}>
          <img src={product.image} alt={product.name} className="w-44 h-44 object-contain mx-auto transition-transform duration-300 group-hover:scale-105"/>
        </Link>
      </div>
      <div className="px-5 pb-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`${product.inStock ? 'text-primary-500' : 'text-red-500'} text-[11px] font-medium`}>
            {product.inStock ? 'In stock' : 'Out of stock'}
          </span>
          <div className="flex">
            {[1,2,3,4,5].map(i => (
              <Star key={i} size={10} className={i <= 4 ? 'fill-gold-500 text-gold-500' : 'text-gray-300'} />
            ))}
          </div>
        </div>
        <Link to={`/product/${product.id}`} onClick={handleOpen} className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 hover:text-primary-500 transition min-h-[42px]">
          {product.name}
        </Link>
        <ul className="text-[10px] text-gray-500 space-y-0.5 mb-2">
          <li>· Brand: <span className="text-primary-500">{product.brand}</span></li>
          <li>· Qty per pack: {product.packQty || 10} pcs</li>
          <li>· Item code: {product.code}</li>
        </ul>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-primary-600">{product.price.toLocaleString('en-US')} RUB</span>
            <button className="ml-auto w-10 h-10 rounded-full border border-primary-500 bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600 transition">
              <ShoppingCart size={14} />
            </button>
          </div>
          {product.oldPrice && <div className="text-sm text-gray-400 line-through mb-3">{product.oldPrice.toLocaleString('en-US')} RUB</div>}
          {product.inStock ? (
            <button onClick={() => addToCart(product)} className="w-full rounded-lg border border-primary-500 bg-primary-500 text-white py-3 font-semibold hover:bg-primary-600 transition">Buy in one click</button>
          ) : (
            <button className="w-full bg-gray-300 text-gray-600 font-bold py-2.5 rounded-xl text-xs">Notify when available</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard