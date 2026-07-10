import { useState } from 'react'
import { Heart, Minus, Plus, Truck, ShieldCheck, X, ChevronLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import ProductCard from './ProductCard'

const TABS = ['Overview', 'Instructions', 'Reviews']

const INSTRUCTION_TOPICS = ['Manufacturer', 'Product summary', 'Indications', 'Storage conditions', 'Shelf life']

const INSTRUCTION_CONTENT = {
  'Manufacturer': 'See product packaging for full manufacturer details.',
  'Product summary': 'This product is intended for use as described on the packaging and product insert.',
  'Indications': 'Refer to the product insert for full indications and directions for use.',
  'Storage conditions': 'Store below 25°C in tightly closed packaging and keep out of reach of children.',
  'Shelf life': 'See the expiration date printed on the packaging.',
}

const REVIEWS = [
  { name: 'Elena', date: '17 January 2026', rating: 5, text: 'Good product, arrived quickly and works exactly as described.' },
  { name: 'Vladimir', date: '10 January 2026', rating: 4, text: 'We have been using it for a while now, no issues so far. Good value for the price.' },
]

const ProductDetailPanel = ({ product, relatedProducts = [], onClose, onSelectProduct }) => {
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useApp()
  const [activeTab, setActiveTab] = useState('Overview')
  const [activeTopic, setActiveTopic] = useState(INSTRUCTION_TOPICS[0])
  const [qty, setQty] = useState(1)

  if (!product) return null

  const isFav = favorites.includes(product.id)

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
      <button
        onClick={onClose}
        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-primary-500 mb-4"
      >
        <ChevronLeft size={14} /> Back to list
      </button>

      <div className="flex items-start justify-between gap-3 mb-4">
        <h2 className="text-lg font-bold pr-4">{product.name}</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 shrink-0 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400"
          aria-label="Close product details"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex gap-1 mb-6 text-xs border-b overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 px-3 py-2 border-b-2 transition ${
              activeTab === tab
                ? 'border-primary-500 text-primary-500 font-semibold'
                : 'border-transparent text-gray-600 hover:text-primary-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-2xl p-4 relative">
            {product.isProductOfDay && (
              <span className="absolute top-6 left-6 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                Product of the day
              </span>
            )}
            <img src={product.image} alt={product.name} className="w-full aspect-square object-contain" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${product.inStock ? 'text-primary-500' : 'text-red-500'}`}>
                {product.inStock ? 'In stock' : 'Out of stock'}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex text-gold-500 text-sm">★★★★★</div>
                <span className="text-xs text-gray-500">6 reviews</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-600 space-y-1">
              <div className="font-bold text-gray-900 mb-1">Characteristics</div>
              <div>Manufacturer: <span className="text-primary-500">{product.brand}</span></div>
              <div>SKU: {product.code}</div>
              {product.description && <div>{product.description}</div>}
            </div>

            <div className="flex items-end gap-3 mb-4">
              <div className="text-2xl font-bold text-primary-500">{product.price.toLocaleString('en-US')} RUB</div>
              {product.oldPrice && (
                <div className="text-base text-gray-400 line-through mb-0.5">{product.oldPrice.toLocaleString('en-US')} RUB</div>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border-2 border-gray-200 rounded-full">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 text-gray-500 hover:text-primary-500">
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-2 text-gray-500 hover:text-primary-500">
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => addToCart(product, qty)}
                className="flex-1 bg-primary-500 text-white font-bold py-2.5 rounded-full hover:bg-primary-600 transition text-sm"
              >
                Add to cart
              </button>
              <button
                onClick={() => toggleFavorite(product.id)}
                className="w-11 h-11 shrink-0 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 transition"
              >
                <Heart size={18} className={isFav ? 'fill-primary-500 text-primary-500' : 'text-gray-400'} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-primary-50 rounded-xl p-3 flex items-start gap-2">
                <Truck size={16} className="text-primary-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Delivery today, free from 500 RUB</span>
              </div>
              <div className="bg-primary-50 rounded-xl p-3 flex items-start gap-2">
                <ShieldCheck size={16} className="text-primary-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Store below 25°C, in closed package</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Instructions' && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4 text-xs border-b pb-3">
            {INSTRUCTION_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-3 py-1.5 rounded-full transition ${
                  activeTopic === topic
                    ? 'bg-primary-500 text-white font-semibold'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
          <h3 className="font-bold text-sm mb-2">{activeTopic}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{INSTRUCTION_CONTENT[activeTopic]}</p>
        </div>
      )}

      {activeTab === 'Reviews' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm">Customer reviews</h3>
            <button className="bg-primary-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-primary-600 transition">
              Leave a review
            </button>
          </div>
          <div className="space-y-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-xs font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-[10px] text-gray-500">{r.date}</div>
                  </div>
                  <div className="flex text-gold-500 ml-auto text-xs">{'★'.repeat(r.rating)}</div>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-base font-bold mb-3">More in this category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPanel
