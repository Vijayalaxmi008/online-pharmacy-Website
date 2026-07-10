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

const medicalSuppliesProducts = [
  {
    id: 301, name: 'Elastic bandage, 5 m x 10 cm',
    brand: 'MedLine', inStock: true, price: 145, image: arbidolImg,
    isHit: true, category: 'medical-supplies', code: 789346, rating: 5,
    description: 'Elastic bandage for wound care and support.',
  },
  {
    id: 302, name: 'Digital thermometer',
    brand: 'ThermoCare', inStock: true, price: 41108, oldPrice: 49999,
    image: bicyclolImg, isHit: true, isProductOfDay: true,
    category: 'medical-supplies', code: 153250,
    description: 'Fast and accurate digital body thermometer.',
  },
  {
    id: 303, name: 'Disposable syringes 5 ml, 10 pcs.',
    brand: 'MedLine', inStock: true, price: 41108, oldPrice: 49999,
    image: bififormImg, isHit: true, isProductOfDay: true,
    category: 'medical-supplies', code: 153251,
    description: 'Sterile disposable syringes for single use.',
  },
  {
    id: 304,
    name: 'Blood glucose monitoring system',
    brand: 'GlucoCheck', inStock: true, price: 9999999, oldPrice: 10000000,
    image: creonImg, category: 'medical-supplies', code: 25564, rating: 4,
    description: 'Reliable blood glucose monitor with test strips.',
  },
  {
    id: 305, name: 'Disposable face masks, 50 pcs.',
    brand: 'SafeGuard', inStock: true, price: 444, image: desmoxanImg,
    isHit: true, category: 'medical-supplies', code: 890457, rating: 5,
  },
  {
    id: 306, name: 'Latex examination gloves, 100 pcs.',
    brand: 'SafeGuard', inStock: true, price: 41108, oldPrice: 49999,
    image: detragelImg, isHit: true, isProductOfDay: true,
    category: 'medical-supplies', code: 153252,
    description: 'Powder-free latex gloves for medical use.',
  },
  {
    id: 307, name: 'Antiseptic solution, 250 ml',
    brand: 'MedLine', inStock: true, price: 41108, oldPrice: 49999,
    image: femibionImg, isHit: true, isProductOfDay: true,
    category: 'medical-supplies', code: 153253,
    description: 'Antiseptic solution for skin and wound disinfection.',
  },
  {
    id: 308, name: 'First aid kit, complete set',
    brand: 'SafeGuard', inStock: false, price: 41108, oldPrice: 49999,
    image: heptralImg, isHit: true, isProductOfDay: true,
    category: 'medical-supplies', code: 153254,
    description: 'Complete first aid kit for home and travel.',
  },
  {
    id: 309, name: 'Automatic blood pressure monitor',
    brand: 'BPCare', inStock: true, price: 244, image: niseImg,
    isHit: true, category: 'medical-supplies', code: 678235, rating: 5,
    description: 'Automatic upper-arm blood pressure monitor.',
  },
  {
    id: 310, name: 'Cotton wool, 100 g',
    brand: 'MedLine', inStock: true, price: 1340, image: normovenImg,
    category: 'medical-supplies', code: 250004, rating: 5,
  },
  {
    id: 311, name: 'Medical Supplies Care Set',
    brand: 'MedLine', inStock: true, price: 480, image: neviaCareImg,
    category: 'medical-supplies', code: 240003, rating: 5,
    description: 'Essential medical supplies bundle for everyday needs.',
  },
  {
    id: 312, name: 'Oral-B',
    brand: 'Oral-B', inStock: true, price: 1290, image: oralBImg,
    isHit: true, isProductOfDay: true, category: 'medical-supplies', code: 220002, rating: 5,
  },
]

const sortOptions = [
  { key: 'price-asc', label: 'Lowest price first', icon: ArrowDownWideNarrow },
  { key: 'price-desc', label: 'Highest price first', icon: ArrowUpWideNarrow },
  { key: 'new', label: 'New arrivals', icon: Sparkles },
  { key: 'hits', label: 'Bestsellers', icon: Flame },
]

const MedicalSupplies = () => {
  const [sortBy, setSortBy] = useState('default')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filtered = useMemo(() => {
    let list = medicalSuppliesProducts.filter(p => p.category === 'medical-supplies')
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
          <span className="text-gray-700">Medical Supplies</span>
        </div>

        <h1 className="text-2xl font-bold mb-1 text-gray-900">Medical Supplies</h1>
        <p className="text-sm text-gray-500 mb-4 max-w-2xl">Bandages, first aid, diagnostic devices and medical consumables.</p>

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

export default MedicalSupplies