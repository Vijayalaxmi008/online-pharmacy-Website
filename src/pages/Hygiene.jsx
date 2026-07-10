import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductDetailPanel from '../components/ProductDetailPanel'
import { ChevronRight, ArrowDownWideNarrow, ArrowUpWideNarrow, Sparkles, Flame, PackageSearch } from 'lucide-react'
import arbidolImg from '../assets/images/products/arbidol.png'
import bicyclolImg from '../assets/images/products/bicyclol.png'
import bififormImg from '../assets/images/products/bifiform.png'
import creonImg from '../assets/images/products/creon.png'
import desmoxanImg from '../assets/images/products/desmoxan.png'
import detragelImg from '../assets/images/products/detragel.png'
import femibionImg from '../assets/images/products/femibion.png'
import heptralImg from '../assets/images/products/heptral.png'
import niseImg from '../assets/images/products/nise.png'
import normovenImg from '../assets/images/products/Normoven.png'
import neviaCareImg from '../assets/images/banners/neviaCare.png'
import oralBImg from '../assets/images/banners/Oral-B.png'

const hygieneProducts = [
  {
    id: 401, name: 'Whitening toothpaste, 100 ml',
    brand: 'DentaFresh', inStock: true, price: 145, image: arbidolImg,
    isHit: true, category: 'hygiene', code: 789347, rating: 5,
    description: 'Whitening toothpaste for daily oral care.',
  },
  {
    id: 402, name: 'Hand sanitizer gel, 250 ml',
    brand: 'CleanHands', inStock: true, price: 41108, oldPrice: 49999,
    image: bicyclolImg, isHit: true, isProductOfDay: true,
    category: 'hygiene', code: 153255,
    description: 'Antibacterial hand sanitizer gel.',
  },
  {
    id: 403, name: 'Wet wipes, 80 pcs.',
    brand: 'CleanHands', inStock: true, price: 41108, oldPrice: 49999,
    image: bififormImg, isHit: true, isProductOfDay: true,
    category: 'hygiene', code: 153256,
    description: 'Gentle wet wipes for everyday hygiene.',
  },
  {
    id: 404,
    name: 'Nourishing shampoo, 400 ml',
    brand: 'HairCare', inStock: true, price: 9999999, oldPrice: 10000000,
    image: creonImg, category: 'hygiene', code: 25565, rating: 4,
    description: 'Nourishing shampoo for everyday use.',
  },
  {
    id: 405, name: 'Moisturizing hand soap, 300 ml',
    brand: 'CleanHands', inStock: true, price: 444, image: desmoxanImg,
    isHit: true, category: 'hygiene', code: 890458, rating: 5,
  },
  {
    id: 406, name: 'Roll-on deodorant, 50 ml',
    brand: 'FreshDay', inStock: true, price: 41108, oldPrice: 49999,
    image: detragelImg, isHit: true, isProductOfDay: true,
    category: 'hygiene', code: 153257,
    description: 'Long-lasting roll-on deodorant.',
  },
  {
    id: 407, name: 'Disposable razors, 5 pcs.',
    brand: 'SmoothShave', inStock: true, price: 41108, oldPrice: 49999,
    image: femibionImg, isHit: true, isProductOfDay: true,
    category: 'hygiene', code: 153258,
    description: 'Disposable razors for a smooth, close shave.',
  },
  {
    id: 408, name: 'Cotton buds, 200 pcs.',
    brand: 'CleanHands', inStock: false, price: 41108, oldPrice: 49999,
    image: heptralImg, isHit: true, isProductOfDay: true,
    category: 'hygiene', code: 153259,
    description: 'Soft cotton buds for everyday hygiene.',
  },
  {
    id: 409, name: 'Antiseptic mouthwash, 500 ml',
    brand: 'DentaFresh', inStock: true, price: 244, image: niseImg,
    isHit: true, category: 'hygiene', code: 678236, rating: 5,
    description: 'Antiseptic mouthwash for fresh breath.',
  },
  {
    id: 410, name: 'Sanitary napkins, 20 pcs.',
    brand: 'FreshDay', inStock: true, price: 1340, image: normovenImg,
    category: 'hygiene', code: 250005, rating: 5,
  },
  {
    id: 411, name: 'NeviaCare',
    brand: 'NeviaCare', inStock: true, price: 480, image: neviaCareImg,
    category: 'hygiene', code: 240004, rating: 5,
    description: 'Moisturizing face cream for everyday skin care.',
  },
  {
    id: 412, name: 'Oral-B',
    brand: 'Oral-B', inStock: true, price: 1290, image: oralBImg,
    isHit: true, isProductOfDay: true, category: 'hygiene', code: 220003, rating: 5,
  },
]

const sortOptions = [
  { key: 'price-asc', label: 'Lowest price first', icon: ArrowDownWideNarrow },
  { key: 'price-desc', label: 'Highest price first', icon: ArrowUpWideNarrow },
  { key: 'new', label: 'New arrivals', icon: Sparkles },
  { key: 'hits', label: 'Bestsellers', icon: Flame },
]

const Hygiene = () => {
  const [sortBy, setSortBy] = useState('default')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filtered = useMemo(() => {
    let list = hygieneProducts.filter(p => p.category === 'hygiene')
    list = list.filter(p => p.price <= maxPrice)
    if (inStockOnly) list = list.filter(p => p.inStock)
    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'hits') list = list.filter(p => p.isHit).concat(list.filter(p => !p.isHit))
    return list
  }, [sortBy, maxPrice, inStockOnly])

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <Link to="/" className="hover:text-primary-500">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700">Hygiene</span>
        </div>

        <h1 className="text-2xl font-bold mb-1 text-gray-900">Hygiene</h1>
        <p className="text-sm text-gray-500 mb-4 max-w-2xl">Personal care and hygiene essentials for the whole family.</p>

        {selectedProduct ? (
          <ProductDetailPanel
            product={selectedProduct}
            relatedProducts={filtered.filter((p) => p.id !== selectedProduct.id).slice(0, 4)}
            onClose={() => setSelectedProduct(null)}
            onSelectProduct={setSelectedProduct}
          />
        ) : (
          <div className="flex gap-4">
            <aside className="hidden lg:block w-64 shrink-0 space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Price</h3>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary-500 mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0 RUB</span>
                  <span className="font-medium text-gray-700">up to {maxPrice.toLocaleString('en-US')} RUB</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Availability</h3>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-primary-500 w-4 h-4"
                  />
                  In stock only
                </label>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl p-3 mb-4 shadow-sm flex flex-wrap items-center gap-2">
                {sortOptions.map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setSortBy(sortBy === opt.key ? 'default' : opt.key)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition ${
                      sortBy === opt.key ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <opt.icon size={14} />
                    {opt.label}
                  </button>
                ))}
                <span className="ml-auto text-xs text-gray-400 hidden sm:inline">Found: {filtered.length}</span>
              </div>

              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                  {filtered.map((p) => (
                    <ProductCard key={p.id} product={p} onSelect={setSelectedProduct} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col items-center text-center gap-3">
                  <PackageSearch size={40} className="text-gray-300" />
                  <p className="text-gray-500 text-sm">No products in this category yet. Please check back soon.</p>
                  <Link to="/catalog" className="text-primary-500 text-sm font-bold hover:underline">Browse all medicines</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Hygiene