import { useState, useRef } from 'react'
import {
  Heart, Minus, Plus, X, ChevronLeft, ChevronRight, ChevronDown, Star,
  ThumbsUp, ThumbsDown, ShoppingCart, FileText, MapPin, Truck,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import ProductCard from './ProductCard'

const TABS = [
  { key: 'main', label: 'MAIN' },
  { key: 'instructions', label: 'INSTRUCTIONS' },
  { key: 'variants', label: 'VARIANTS' },
  { key: 'reviews', label: 'REVIEWS' },
  { key: 'delivery', label: 'DELIVERY' },
  { key: 'pickup', label: 'SELF-PICKUP' },
]

const INSTRUCTION_TOPICS = [
  'Manufacturer', 'About the product', 'Indications', 'Dosage & course', 'Description',
  'Functional benefits', 'Storage conditions', 'Shelf life', 'Active substance', 'Dosage form',
]

const INSTRUCTION_CONTENT = {
  'Manufacturer': 'See product packaging for full manufacturer details.',
  'About the product': "It should be noted, however, that the further development of various forms of activity plays an important role in shaping further directions of development. The task of the organization, especially the consultation with a wide asset, requires us to analyze the further directions of development.\n\nOn the other hand, the further development of various forms of activity requires an analysis of the training system of personnel, meets pressing needs. Everyday practice shows that constant information and propaganda support of our activities allows us to evaluate the significance of the directions of progressive development.",
  'Indications': 'It should be noted, however, that the further development of various forms of activity plays an important role in shaping further directions of development. The task of the organization requires us to analyze the further directions of development.',
  'Dosage & course': 'Follow the dosage and course of use exactly as indicated on the packaging and product insert, or as directed by your healthcare provider.',
  'Description': 'A complete product description is provided on the packaging and enclosed product insert.',
  'Functional benefits': 'Supports the intended use case described on the packaging, formulated for consistent, reliable results.',
  'Storage conditions': 'Store below 25°C in tightly closed packaging and keep out of reach of children.',
  'Shelf life': 'See the expiration date printed on the packaging.',
  'Active substance': 'See packaging and product insert for full active substance information.',
  'Dosage form': 'See packaging for exact dosage form details.',
}

const REVIEWS = [
  {
    name: 'Elena', date: 'January 17, 2026', rating: 4,
    text: "I ordered this product and it was delivered quickly by the courier. It's well packaged, arrived on time, and works exactly as described. Great communication from the store throughout — highly recommend!",
    likes: 2, dislikes: 0,
  },
  {
    name: 'Vladimir', date: 'January 17, 2026', rating: 4,
    text: 'Huge thanks to the team — professional, courteous, and everything arrived as promised. Congratulations to everyone on a job well done, and I wish continued success and prosperity to the store.',
    likes: 0, dislikes: 4,
  },
  {
    name: 'Vladimir', date: 'January 17, 2026', rating: 0,
    text: 'Great value for money and fast shipping.',
    likes: 0, dislikes: 0,
  },
]

const PHARMACY_ROWS = Array.from({ length: 6 }).map(() => ({
  name: 'PHARMACY Moscow region, Podolsk city, Sverdlova st., building No. 13',
  dispatch: 'Within an hour',
  cost: 'Free',
}))

const StarRow = ({ rating, size = 14, interactive = false, onChange }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <button
        key={i}
        type="button"
        disabled={!interactive}
        onClick={() => onChange && onChange(i)}
        className={interactive ? 'cursor-pointer' : 'cursor-default'}
      >
        <Star size={size} className={i <= rating ? 'fill-gold-500 text-gold-500' : 'fill-gray-200 text-gray-200'} />
      </button>
    ))}
  </div>
)

const ProductDetailPanel = ({ product, relatedProducts = [], onClose, onSelectProduct }) => {
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useApp()
  const [activeTab, setActiveTab] = useState('main')
  const [infoTab, setInfoTab] = useState('delivery')
  const [activeTopic, setActiveTopic] = useState(INSTRUCTION_TOPICS[0])
  const [instructionsExpanded, setInstructionsExpanded] = useState(false)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const [qty, setQty] = useState(1)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewName, setReviewName] = useState('')
  const [reviewEmail, setReviewEmail] = useState('')
  const [reviewText, setReviewText] = useState('')

  const sectionRefs = {
    main: useRef(null), instructions: useRef(null), variants: useRef(null),
    reviews: useRef(null), delivery: useRef(null), pickup: useRef(null),
  }

  if (!product) return null

  const isFav = favorites.includes(product.id)
  const gallery = [product.image, product.image, product.image, product.image]
  const visibleReviews = showAllReviews ? REVIEWS : REVIEWS.slice(0, 2)
  const analogues = relatedProducts.slice(0, 5)
  const bundleItems = relatedProducts.slice(0, 2)
  const bundlePrice = bundleItems.reduce((sum, p) => sum + p.price, 0)
  const bundleOldPrice = bundleItems.reduce((sum, p) => sum + (p.oldPrice || p.price), 0)

  const scrollToTab = (key) => {
    setActiveTab(key)
    sectionRefs[key]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    setReviewRating(0); setReviewName(''); setReviewEmail(''); setReviewText('')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-2">
        <button onClick={onClose} className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-primary-500">
          <ChevronLeft size={14} /> Back to list
        </button>
        <button onClick={onClose} className="w-8 h-8 shrink-0 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400" aria-label="Close product details">
          <X size={16} />
        </button>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

      {/* Tab nav */}
      <div className="flex gap-1 mb-6 text-xs border-b overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => scrollToTab(tab.key)}
            className={`shrink-0 px-3 py-2.5 border-b-2 font-bold tracking-wide transition ${
              activeTab === tab.key ? 'border-primary-500 text-primary-500' : 'border-transparent text-gray-500 hover:text-primary-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN — thumbnails / image / characteristics+delivery / price */}
      <div ref={sectionRefs.main} className="grid lg:grid-cols-[64px_1fr_280px_260px] gap-4 mb-10 scroll-mt-20">
        <div className="hidden lg:flex flex-col gap-2">
          {gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setGalleryIndex(i)}
              className={`border-2 rounded-xl p-1 ${galleryIndex === i ? 'border-primary-500' : 'border-gray-100'}`}
            >
              <img src={img} alt="" className="w-full aspect-square object-contain" />
            </button>
          ))}
          <div className="flex justify-center text-gray-300"><ChevronDown size={16} /></div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 relative flex items-center justify-center min-h-[260px]">
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.isProductOfDay && (
              <span className="bg-primary-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full w-fit">Deal of the day</span>
            )}
            {!product.inStock && (
              <span className="bg-navy-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full w-fit">Pickup only</span>
            )}
          </div>
          <img src={gallery[galleryIndex]} alt={product.name} className="w-full max-w-[220px] aspect-square object-contain" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <StarRow rating={4} size={13} />
            <button onClick={() => scrollToTab('reviews')} className="text-primary-500 font-medium hover:underline">6 reviews</button>
            <span className={`ml-auto font-medium ${product.inStock ? 'text-primary-500' : 'text-red-500'}`}>
              {product.inStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>
          <div className="text-xs text-gray-400">Item code: {product.code}</div>

          <div className="border border-gray-100 rounded-xl p-4">
            <div className="font-bold text-sm text-gray-900 mb-2">Characteristics</div>
            <ul className="text-xs space-y-1.5 text-gray-600">
              <li>• Manufacturer: <span className="text-primary-500">{product.brand}</span></li>
              <li>• Active substance: {product.brand}</li>
              <li>• Shelf life: Long shelf life</li>
              <li>• Producer: <span className="text-primary-500">{product.brand}</span></li>
            </ul>
          </div>

          <div className="flex gap-3 text-[11px] font-semibold border-b border-gray-100">
            <button
              onClick={() => setInfoTab('delivery')}
              className={`pb-2 border-b-2 ${infoTab === 'delivery' ? 'border-primary-500 text-primary-500' : 'border-transparent text-gray-400'}`}
            >
              Delivery and self-pickup
            </button>
            <button
              onClick={() => setInfoTab('storage')}
              className={`pb-2 border-b-2 ${infoTab === 'storage' ? 'border-primary-500 text-primary-500' : 'border-transparent text-gray-400'}`}
            >
              Storage conditions
            </button>
          </div>

          {infoTab === 'delivery' ? (
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-primary-50 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-primary-600 font-semibold mb-1"><MapPin size={12} /> In Moscow</div>
                <p className="text-gray-500">Delivery today, free from 500 rub.</p>
              </div>
              <div className="bg-primary-50 rounded-xl p-2.5">
                <div className="flex items-center gap-1 text-primary-600 font-semibold mb-1"><Truck size={12} /> For MKAD</div>
                <p className="text-gray-500">Delivery today, free from 500 rub.</p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-gray-500 leading-relaxed">Store below 25°C in tightly closed packaging, out of reach of children.</p>
          )}
        </div>

        <div className="border border-gray-100 rounded-2xl p-5 h-fit">
          <div className="flex items-start justify-between mb-2">
            <span className="text-xs text-gray-400">Current price</span>
            <button
              onClick={() => toggleFavorite(product.id)}
              className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 transition shrink-0"
            >
              <Heart size={16} className={isFav ? 'fill-primary-500 text-primary-500' : 'text-gray-400'} />
            </button>
          </div>
          {product.oldPrice && (
            <div className="text-sm text-red-400 line-through">{product.oldPrice.toLocaleString('en-US')} rub.</div>
          )}
          <div className="text-2xl font-bold text-gray-900 mb-4">{product.price.toLocaleString('en-US')} rub.</div>

          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center border-2 border-gray-200 rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2.5 text-gray-500 hover:text-primary-500"><Minus size={14} /></button>
              <span className="w-8 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-2.5 text-gray-500 hover:text-primary-500"><Plus size={14} /></button>
            </div>
            <button
              onClick={() => addToCart(product, qty)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-primary-500 text-white font-bold py-2.5 rounded-full hover:bg-primary-600 transition text-sm"
            >
              <ShoppingCart size={14} /> Add to cart
            </button>
          </div>
          <button
            onClick={() => addToCart(product, qty)}
            className="w-full border-2 border-gray-200 text-gray-700 font-bold py-2.5 rounded-full hover:border-primary-500 hover:text-primary-500 transition text-sm"
          >
            Buy in 1 click
          </button>
        </div>
      </div>

      {/* ANALOG carousel */}
      {analogues.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Analog</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"><ChevronLeft size={16} /></button>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
            {analogues.map((p) => <ProductCard key={`analog-${p.id}`} product={p} onSelect={onSelectProduct} />)}
          </div>
        </div>
      )}

      {/* PAY ATTENTION bundle */}
      {bundleItems.length === 2 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Pay Attention</h3>
          <div className="border border-gray-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4">
            {bundleItems.map((p, i) => (
              <div key={p.id} className="flex items-center gap-4">
                <div className="flex flex-col items-center text-center w-36">
                  <img src={p.image} alt={p.name} className="h-20 object-contain mb-2" />
                  <span className={`text-xs font-medium ${p.inStock ? 'text-primary-500' : 'text-red-500'}`}>{p.inStock ? 'In stock' : 'Out of stock'}</span>
                  <p className="text-xs text-gray-600 line-clamp-2">{p.name}</p>
                </div>
                {i === 0 && <span className="text-xl text-gray-300 font-bold shrink-0">+</span>}
              </div>
            ))}
            <span className="text-xl text-gray-300 font-bold shrink-0">=</span>
            <div className="ml-auto text-center sm:text-left">
              <div className="text-xs text-gray-400">Together cheaper</div>
              <div className="text-lg font-bold text-gray-900">{bundlePrice.toLocaleString('en-US')} rub.</div>
              {bundleOldPrice > bundlePrice && (
                <div className="text-xs text-red-400 line-through">{bundleOldPrice.toLocaleString('en-US')} rub.</div>
              )}
              <button
                onClick={() => bundleItems.forEach((p) => addToCart(p, 1))}
                className="mt-2 flex items-center gap-1.5 bg-primary-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-primary-600"
              >
                <ShoppingCart size={14} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANALOGUES grid */}
      {analogues.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Analogues <span className="text-gray-400 font-normal">{analogues.length}</span></h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {analogues.map((p) => <ProductCard key={`ag-${p.id}`} product={p} onSelect={onSelectProduct} />)}
          </div>
        </div>
      )}

      {/* INSTRUCTIONS + REVIEWS */}
      <div ref={sectionRefs.instructions} className="grid lg:grid-cols-[1fr_360px] gap-8 mb-10 scroll-mt-20">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Instructions for Use</h3>
          <div className="flex flex-wrap gap-2 mb-5 text-xs">
            {INSTRUCTION_TOPICS.map((topic) => (
              <button
                key={topic}
                onClick={() => setActiveTopic(topic)}
                className={`px-3 py-1.5 rounded-full transition ${
                  activeTopic === topic ? 'bg-primary-500 text-white font-semibold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
          <h4 className="font-bold text-sm text-gray-900 mb-2">{activeTopic}</h4>
          <p className={`text-sm text-gray-600 leading-relaxed whitespace-pre-line ${instructionsExpanded ? '' : 'line-clamp-4'}`}>
            {INSTRUCTION_CONTENT[activeTopic]}
          </p>
          <button
            onClick={() => setInstructionsExpanded((v) => !v)}
            className="inline-flex items-center gap-1 text-primary-500 text-xs font-bold mt-3 hover:underline"
          >
            <ChevronRight size={14} className={instructionsExpanded ? 'rotate-90 transition' : 'transition'} />
            {instructionsExpanded ? 'Show less' : 'Show full text'}
          </button>
        </div>

        <div ref={sectionRefs.reviews} className="scroll-mt-20">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Reviews</h3>

          <form onSubmit={handleReviewSubmit} className="border border-gray-100 rounded-2xl p-4 mb-5">
            <div className="font-bold text-sm text-gray-900 mb-2">Leave a Review</div>
            <div className="mb-3">
              <div className="text-xs text-gray-400 mb-1">Rating:</div>
              <StarRow rating={reviewRating} size={20} interactive onChange={setReviewRating} />
            </div>
            <input type="text" required placeholder="Your name" value={reviewName} onChange={(e) => setReviewName(e.target.value)}
              className="w-full mb-2 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none" />
            <input type="email" required placeholder="Your e-mail" value={reviewEmail} onChange={(e) => setReviewEmail(e.target.value)}
              className="w-full mb-2 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none" />
            <textarea placeholder="Write a detailed review, it's important..." rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)}
              className="w-full mb-3 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none resize-none" />
            <button type="submit" className="bg-primary-500 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-primary-600">Submit</button>
            <p className="text-[10px] text-gray-400 mt-2">By clicking the button, you agree to the processing of <span className="text-primary-500 underline">personal data</span></p>
          </form>

          <div className="space-y-4">
            {visibleReviews.map((r, i) => (
              <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white flex items-center justify-center text-xs font-bold shrink-0">{r.name[0]}</div>
                  <div className="min-w-0"><div className="text-sm font-medium">{r.name}</div></div>
                  {r.rating > 0 && <StarRow rating={r.rating} size={12} />}
                  <span className="ml-auto text-[10px] text-gray-400 shrink-0">{r.date}</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">{r.text}</p>
                <div className="flex items-center gap-4 text-[11px] text-gray-400">
                  <button className="flex items-center gap-1 hover:text-primary-500"><ThumbsUp size={12} />{r.likes}</button>
                  <button className="flex items-center gap-1 hover:text-primary-500"><ThumbsDown size={12} />{r.dislikes}</button>
                  <button className="ml-auto text-primary-500 font-medium hover:underline">Reply</button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowAllReviews((v) => !v)}
            className="w-full mt-4 flex items-center justify-center gap-1.5 bg-primary-500 text-white text-xs font-bold py-2.5 rounded-full hover:bg-primary-600"
          >
            <ChevronRight size={14} className={showAllReviews ? '-rotate-90 transition' : 'rotate-90 transition'} />
            {showAllReviews ? 'Show fewer reviews' : 'Show all reviews'}
          </button>
        </div>
      </div>

      <div ref={sectionRefs.variants} className="scroll-mt-20" />

      {/* DELIVERY & PICKUP */}
      <div ref={sectionRefs.delivery} className="mb-10 scroll-mt-20">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery &amp; Self-Pickup in Moscow and Region</h3>
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-xs text-gray-400 mb-2">Order delivery within MKAD</div>
            <div className="flex justify-between text-sm border-b border-gray-100 py-2">
              <span className="text-gray-500">Order delivery</span>
              <span className="text-gray-900 font-medium">up to 500 rub.</span>
              <span className="text-gray-900 font-medium">from 500 rub.</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-gray-500">within MKAD</span>
              <span className="text-gray-900 font-medium">150 rub.</span>
              <span className="text-primary-500 font-medium">Free</span>
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-2">Order delivery outside MKAD</div>
            <div className="flex justify-between text-sm border-b border-gray-100 py-2">
              <span className="text-gray-500">Order delivery</span>
              <span className="text-gray-900 font-medium">up to 500 rub.</span>
              <span className="text-gray-900 font-medium">from 500 rub.</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-gray-500">outside MKAD</span>
              <span className="text-gray-900 font-medium">150 rub.</span>
              <span className="text-primary-500 font-medium">Free</span>
            </div>
          </div>
        </div>

        <div ref={sectionRefs.pickup} className="scroll-mt-20">
          <h4 className="font-bold text-base text-gray-900 mb-1">Self-Pickup in Moscow and Region</h4>
          <div className="text-xs text-gray-400 mb-3">Order delivery within MKAD</div>
          <div className="border border-gray-100 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-[1fr_140px_80px] bg-gray-50 text-xs text-gray-400 px-4 py-2.5">
              <span>Pharmacy list</span><span>Item dispatch</span><span className="text-right">Cost</span>
            </div>
            {PHARMACY_ROWS.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_140px_80px] items-center px-4 py-3 text-xs text-gray-500 border-t border-gray-50">
                <span>{row.name}</span><span>{row.dispatch}</span><span className="text-right text-primary-500 font-medium">{row.cost}</span>
              </div>
            ))}
          </div>
          <button className="mt-3 text-primary-500 text-xs font-bold hover:underline">All delivery terms</button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-base font-bold mb-3">More in this category</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
            {relatedProducts.map((p) => <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPanel