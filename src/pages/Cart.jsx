import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { Trash2, Minus, Plus, X, ShoppingBag } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart()
  const navigate = useNavigate()
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-500 mb-4">Your cart is empty</p>
        <Link to="/catalog" className="bg-primary-500 text-white px-5 py-2.5 rounded-full">Go to catalog</Link>
      </div>
    )
  }
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">Cart</h1>
      <p className="text-xs text-gray-500 mb-4">{totalItems} Your cart is empty</p>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-2">
          <div className="flex justify-between items-center bg-white rounded-2xl p-3 shadow-sm text-sm">
            <button onClick={clearCart} className="text-red-500 flex items-center gap-1 text-xs"><X size={14} />Clear cart</button>
          </div>
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-3 flex gap-3 shadow-sm">
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded-lg bg-gray-50" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.id}`} className="text-sm font-medium hover:text-primary-500 line-clamp-2">{item.name}</Link>
                <div className="text-[10px] text-primary-500 mt-0.5">In stock</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-50 text-red-500"><Minus size={12} /></button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-50 text-primary-500"><Plus size={12} /></button>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-primary-500">{(item.price * item.quantity).toLocaleString('en-US')} RUB</div>
                    {item.oldPrice && <div className="text-[10px] text-red-500 line-through">{(item.oldPrice * item.quantity).toLocaleString('en-US')} RUB</div>}
                  </div>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 self-start"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-sm sticky top-32">
            <h3 className="font-bold text-base mb-3">Your order</h3>
            <div className="space-y-2 text-xs mb-3 pb-3 border-b">
              <div className="flex justify-between"><span>Discount</span><span>-32 RUB</span></div>
              <div className="flex justify-between"><span>Total without delivery</span><span>{totalPrice.toLocaleString('en-US')} RUB</span></div>
            </div>
            <button onClick={() => navigate('/checkout')} className="w-full bg-primary-500 text-white font-bold py-2.5 rounded-full mb-2 text-sm hover:bg-primary-600 transition">CHECKOUT</button>
            <div className="mt-3">
              <h4 className="text-sm font-bold mb-2">Promo code</h4>
              <div className="relative">
                <input type="text" placeholder="Enter promo code" className="w-full px-3 py-2 pr-8 border-2 border-gray-200 rounded-lg text-xs focus:border-primary-500 focus:outline-none" />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center"><Plus size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">Always useful</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {products.slice(0, 5).map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  )
}

export default Cart