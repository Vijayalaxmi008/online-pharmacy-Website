import { Link } from 'react-router-dom'
import { Heart, Star, ShoppingCart } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product, showNumber = false, number = 0 }) => {
  const { favorites, toggleFavorite } = useApp()
  const { addToCart } = useCart()
  const isFav = favorites.includes(product.id)

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col relative">
      {showNumber && (
        <div className="absolute -top-3 -left-3 z-10 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center font-bold text-gray-400">{number}</div>
      )}
      <div className="relative p-3">
        {product.isProductOfDay && (
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">Product of the day</span>
        )}
        <button onClick={() => toggleFavorite(product.id)} className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 z-10">
          <Heart size={14} className={isFav ? 'fill-primary-500 text-primary-500' : 'text-gray-400'} />
        </button>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full aspect-square object-contain rounded-lg bg-white" />
        </Link>
      </div>
      <div className="p-4 flex-1 flex flex-col">
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
        <Link to={`/product/${product.id}`} className="text-xs font-medium mb-2 line-clamp-2 hover:text-primary-500 min-h-[32px]">
          {product.name}
        </Link>
        <ul className="text-[10px] text-gray-500 space-y-0.5 mb-2">
          <li>· Brand: <span className="text-primary-500">{product.brand}</span></li>
          <li>· Package quantity: 10 en</li>
          <li>· Product code: {product.code}</li>
        </ul>
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-bold">{product.price.toLocaleString('en-US')} RUB</span>
            <button className="ml-auto w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600">
              <ShoppingCart size={14} />
            </button>
          </div>
          {product.oldPrice && <div className="text-xs text-red-500 line-through mb-2">{product.oldPrice.toLocaleString('en-US')} RUB</div>}
          {product.inStock ? (
            <button onClick={() => addToCart(product)} className="w-full bg-primary-500 text-white font-bold py-2.5 rounded-xl text-xs hover:bg-primary-600">Buy in one click</button>
          ) : (
            <button className="w-full bg-gray-300 text-gray-600 font-bold py-2.5 rounded-xl text-xs">Notify when available</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
