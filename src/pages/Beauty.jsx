import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ProductDetailPanel from '../components/ProductDetailPanel'
import {
  ChevronRight, ChevronDown, ListFilter, PackageSearch, Info,
  Droplet, Pill, SprayCan, Package, Truck, ShieldCheck, Wallet,
} from 'lucide-react'
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
import { AlertCircle } from 'lucide-react'

const beautyProducts = [
  {
    id: 201, name: 'Arbidol anti-cold and flu tablets, 10 pcs.',
    brand: 'Arbidol', inStock: true, price: 145, image: arbidolImg,
    isHit: true, category: 'cosmetics', code: 789345, rating: 5,
    country: 'Germany', effect: 'For respiratory tract',
    description: 'Supports skin and body wellness during cold season.',
  },
  {
    id: 202, name: 'Velson film-coated tablets 3 mg, 30 pcs.',
    brand: 'Lirina', inStock: true, price: 41108, oldPrice: 49999,
    image: bicyclolImg, isHit: true, isProductOfDay: true,
    category: 'cosmetics', code: 153249, packQty: 10,
    country: 'Italy', effect: 'For respiratory tract',
    description: 'Care formula for supporting healthy skin from within.',
  },
  {
    id: 203, name: 'Bifiform capsules, 30 pcs.',
    brand: 'Bifiform', inStock: true, price: 41108, oldPrice: 49999,
    image: bififormImg, isHit: true, isProductOfDay: true,
    category: 'cosmetics', code: 153249, packQty: 10,
    country: 'Italy', effect: 'For respiratory tract',
    description: 'Balances skin health for adults and children over 2 years old.',
  },
  {
    id: 204,
    name: 'Creon 10000, enteric-coated capsules, 10,000 units, 20 pcs.',
    brand: 'Abbott', inStock: true, price: 9999999, oldPrice: 10000000,
    image: creonImg, category: 'cosmetics', code: 25563, rating: 4,
    country: 'Italy', effect: 'For respiratory tract',
    description: 'Supports overall wellness that shows through healthy-looking skin.',
  },
  {
    id: 205, name: 'Desmoxan smoking cessation tablets, 100 pcs.',
    brand: 'Desmohan', inStock: true, price: 444, image: desmoxanImg,
    isHit: true, category: 'cosmetics', code: 890456, rating: 5,
    country: 'Ireland', effect: 'For throat',
  },
  {
    id: 206, name: 'Detragel leg gel, 40 g',
    brand: 'Detragel', inStock: true, price: 41108, oldPrice: 49999,
    image: detragelImg, isHit: true, isProductOfDay: true,
    category: 'cosmetics', code: 153249, packQty: 10,
    country: 'Italy', effect: 'For respiratory tract',
    description: 'Gel for leg heaviness and varicose vein care.',
  },
  {
    id: 207, name: 'Femibion Natalcare I tablets, 30 pcs.',
    brand: 'Femibion', inStock: true, price: 41108, oldPrice: 49999,
    image: femibionImg, isHit: true, isProductOfDay: true,
    category: 'cosmetics', code: 153249, packQty: 10,
    country: 'Italy', effect: 'For respiratory tract',
    description: 'Prenatal vitamins that also support skin and hair health.',
  },
  {
    id: 208, name: 'Heptral tablets 400 mg, 20 pcs.',
    brand: 'Heptral', inStock: false, price: 41108, oldPrice: 49999,
    image: heptralImg, isHit: true, isProductOfDay: true,
    category: 'cosmetics', code: 153249, packQty: 10,
    country: 'Italy', effect: 'For respiratory tract',
    description: 'Hepatoprotective support for overall wellbeing.',
  },
  {
    id: 209, name: 'Nise Bounty Skin, Hair and Nails capsules, 60 pcs.',
    brand: 'Nise', inStock: true, price: 244, image: niseImg,
    isHit: true, category: 'cosmetics', code: 678234, rating: 5,
    country: 'China', effect: 'For hair',
    description: 'Beauty formula for skin, hair and nail support.',
  },
  {
    id: 210, name: 'Normoven',
    brand: 'Normoven', inStock: true, price: 1340, image: normovenImg,
    category: 'cosmetics', code: 250003, rating: 5,
    country: 'Belarus', effect: 'For eyes',
  },
  {
    id: 211, name: 'NeviaCare',
    brand: 'NeviaCare', inStock: true, price: 480, image: neviaCareImg,
    category: 'cosmetics', code: 240002, rating: 5,
    country: 'Germany', effect: 'For lips',
    description: 'Moisturizing face cream for everyday skin care.',
  },
  {
    id: 212, name: 'Oral-B',
    brand: 'Oral-B', inStock: true, price: 1290, image: oralBImg,
    isHit: true, isProductOfDay: true, category: 'cosmetics', code: 220001, rating: 5,
    country: 'Greece', effect: 'For throat',
  },
  ...Array.from({ length: 8 }, (_, i) => ({
    id: 300 + i,
    name: 'Velson film-coated tablets 3 mg, 30 pcs.',
    brand: 'Lirina', inStock: i % 4 !== 3, price: 41108, oldPrice: 49999,
    image: [bicyclolImg, femibionImg, bififormImg, detragelImg, heptralImg][i % 5],
    isProductOfDay: true, category: 'cosmetics', code: 153249, packQty: 10,
    country: 'Italy', effect: 'For respiratory tract', rating: 4,
  })),
]

const catalogTiles = [
  { name: 'External products', icon: Droplet },
  { name: 'Syrups, drops, suspensions', icon: SprayCan },
  { name: 'Tablets & capsules', icon: Pill },
  { name: 'External products', icon: Droplet },
  { name: 'Tablets & capsules', icon: Pill },
  { name: 'External products', icon: Droplet },
  { name: 'External products', icon: Droplet },
  { name: 'Syrups, drops, suspensions', icon: SprayCan },
]

const popularBrands = [
  'Smeg', 'Гродторгмаш', 'Dihr', 'Adler', 'MEC',
  'Abat', 'Elettrobar', 'Solis', 'Amika', 'Meiko',
  'Comenda', 'Silanos', 'Fagor', 'Tatra', 'Kocateq',
  'Apach', 'Electrolux', 'Vortmax', 'ATA', 'Winterhalter',
  'Modular', 'Compack', 'Kromo', 'Viatto', 'Apach',
  'Electrolux', 'Fagor', 'Tatra',
]

const beautyCategories = [
  'Obstetrics, Gynecology', 'Allergy', 'Anesthesia, Resuscitation', 'Antibiotics',
  'Blood Diseases', 'Pain, Temperature', 'Hemorrhoids', 'Eyes',
  'Worms, Lice, Scabies', 'Homeopathy', 'Diabetes', 'Diagnostic Agents',
  'Respiratory System', 'Stomach, Intestine, Liver',
]
const moreBeautyCategories = [
  'Teeth & Mouth', 'Immune System', 'Skin', 'Urogenital System',
  'Metabolic Disorders', 'Neurology, Psychiatry', 'Antiseptics', 'Oncology',
]

const features = [
  { icon: Package, title: 'Assortment', desc: 'Equipment, furniture, tableware & inventory' },
  { icon: Truck, title: 'Fast delivery', desc: 'To any point in Russia, quickly' },
  { icon: ShieldCheck, title: 'Guarantee', desc: 'All products are certified' },
  { icon: Wallet, title: 'Low prices', desc: 'We strive to maintain the lowest prices' },
]

const seoParagraphs = [
  'Barclay Plaza Business Centre class B+, built in 2008, despite its age, is one of the most in-demand Business Centres in the Western Administrative District of Moscow.',
  'Proximity to Kutuzovsky Prospekt, Minskaya St. and Moscow-City, as well as walking distance to three metro stations add to its relevance. Thus, Park Pobedy metro station is just 800 metres away.',
  'Barclay Plaza is distinguished by a stylish panoramic facade, an unusual entrance group and designer finishing of common areas and elevator halls. Ceiling height in offices is more than 3 metres.',
]

const countries = ['Belarus', 'Germany', 'Greece', 'Ireland', 'Spain', 'Italy', 'China']
const effects = ['For bronchi', 'For hair', 'For eyes', 'For throat', 'For lips', 'For respiratory tract', 'For stomach']

const Beauty = () => {
  const [sortBy, setSortBy] = useState('price')
  const [maxPrice, setMaxPrice] = useState(865878)
  const [inStockOnly, setInStockOnly] = useState(true)
  const [selectedCountries, setSelectedCountries] = useState(['Italy'])
  const [selectedEffects, setSelectedEffects] = useState(['For respiratory tract'])
  const [effectSearch, setEffectSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Anesthesia, Resuscitation')
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [seoExpanded, setSeoExpanded] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  

  const toggleCountry = (c) => {
    setSelectedCountries((prev) => prev.includes(c) ? prev.filter((v) => v !== c) : [...prev, c])
  }
  const toggleEffect = (e) => {
    setSelectedEffects((prev) => prev.includes(e) ? prev.filter((v) => v !== e) : [...prev, e])
  }

  const filtered = useMemo(() => {
    let list = beautyProducts.filter(p => p.category === 'cosmetics')
    list = list.filter(p => p.price <= maxPrice)
    if (inStockOnly) list = list.filter(p => p.inStock)
    if (selectedCountries.length) list = list.filter(p => selectedCountries.includes(p.country))
    if (selectedEffects.length) list = list.filter(p => selectedEffects.includes(p.effect))
    if (sortBy === 'price') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'popularity') list = list.filter(p => p.isHit).concat(list.filter(p => !p.isHit))
    return list
  }, [sortBy, maxPrice, inStockOnly, selectedCountries, selectedEffects])

  const visibleEffects = effects.filter((e) => e.toLowerCase().includes(effectSearch.toLowerCase()))

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <Link to="/" className="hover:text-primary-500">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700">Beauty</span>
        </div>

        <h1 className="text-2xl font-bold mb-1 text-gray-900">Beauty</h1>
        <p className="text-sm text-gray-500 mb-4 max-w-2xl">Face and body care, pharmacy cosmetics and dermocosmetics.</p>

        {selectedProduct ? (
          <ProductDetailPanel
            product={selectedProduct}
            relatedProducts={filtered.filter((p) => p.id !== selectedProduct.id).slice(0, 4)}
            onClose={() => setSelectedProduct(null)}
            onSelectProduct={setSelectedProduct}
          />
        ) : (
          <>
          <div className="flex gap-4">
            <aside className="hidden lg:block w-64 shrink-0 space-y-4 sticky top-4 self-start">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">CATEGORIES</h3>
                <ul className="space-y-1 text-sm">
                  {(showAllCategories ? [...beautyCategories, ...moreBeautyCategories] : beautyCategories).map(cat => (
                    <li key={cat}>
                      <button
                        onClick={() => setActiveCategory(cat)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg transition ${
                          activeCategory === cat ? 'text-primary-500 font-bold' : 'text-gray-700 hover:text-primary-500'
                        }`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowAllCategories(v => !v)}
                  className="w-full mt-3 bg-primary-500 text-white text-xs font-bold py-2.5 rounded-full hover:bg-primary-600 flex items-center justify-center gap-1"
                >
                  {showAllCategories ? 'Hide' : 'Show all categories'}
                  <ChevronDown size={12} className={showAllCategories ? 'rotate-180 transition' : 'transition'} />
                </button>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-sm text-gray-900 mb-3">Filter</h3>

                <h4 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Price</h4>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={2365}
                    readOnly
                    className="w-1/2 px-2 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-700"
                  />
                  <span className="text-gray-300">—</span>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
                    className="w-1/2 px-2 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-700"
                  />
                </div>
                <input
                  type="range"
                  min="2365"
                  max="865878"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary-500 mb-5"
                />

                <h4 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Country</h4>
                <ul className="space-y-2 text-sm text-gray-700 mb-5">
                  {countries.map((c) => (
                    <li key={c}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCountries.includes(c)}
                          onChange={() => toggleCountry(c)}
                          className="accent-primary-500 w-4 h-4"
                        />
                        {c}
                      </label>
                    </li>
                  ))}
                </ul>

                <h4 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Effect</h4>
                <input
                  type="text"
                  placeholder="Search..."
                  value={effectSearch}
                  onChange={(e) => setEffectSearch(e.target.value)}
                  className="w-full mb-3 px-3 py-1.5 bg-gray-50 rounded-lg text-xs focus:outline-none"
                />
                <ul className="space-y-2 text-sm text-gray-700 mb-5">
                  {visibleEffects.map((e) => (
                    <li key={e}>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedEffects.includes(e)}
                          onChange={() => toggleEffect(e)}
                          className="accent-primary-500 w-4 h-4"
                        />
                        {e}
                      </label>
                    </li>
                  ))}
                </ul>

                <h4 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Availability</h4>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mb-1.5">
                  <input
                    type="radio"
                    name="availability"
                    checked={inStockOnly}
                    onChange={() => setInStockOnly(true)}
                    className="accent-primary-500 w-4 h-4"
                  />
                  In stock
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mb-4">
                  <input
                    type="radio"
                    name="availability"
                    checked={!inStockOnly}
                    onChange={() => setInStockOnly(false)}
                    className="accent-primary-500 w-4 h-4"
                  />
                  Pre-order
                </label>

                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-500 text-white font-bold py-2.5 rounded-full text-sm hover:bg-primary-600">Show</button>
                  <button
                    onClick={() => { setMaxPrice(865878); setInStockOnly(true); setSelectedCountries([]); setSelectedEffects([]); setEffectSearch('') }}
                    className="flex-1 bg-gray-100 text-gray-600 font-bold py-2.5 rounded-full text-sm hover:bg-gray-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <section className="bg-white rounded-2xl shadow-sm p-5 mb-4">
                <h3 className="font-bold text-sm mb-3 text-gray-900">Catalog</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                  {catalogTiles.map((tile, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-2 bg-gray-50 hover:bg-primary-50 rounded-xl px-4 py-4 text-left transition"
                    >
                      <tile.icon size={20} className="text-gray-400 shrink-0" />
                      <span className="text-xs font-medium text-gray-700">{tile.name}</span>
                    </button>
                  ))}
                </div>

                <h3 className="font-bold text-sm mb-3 text-gray-900">Popular Brands</h3>
                <div className="border border-gray-100 rounded-xl p-4 grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-2 text-xs text-gray-600">
                  {popularBrands.map((b, i) => (
                    <span key={i} className="hover:text-primary-500 cursor-pointer">{b}</span>
                  ))}
                </div>
              </section>

              <div className="bg-white rounded-2xl p-3 mb-4 shadow-sm flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                  <ListFilter size={14} />
                  SORT BY:
                </span>
                <button
                  onClick={() => setSortBy('price')}
                  className={`text-xs font-bold ${sortBy === 'price' ? 'text-primary-500' : 'text-gray-500 hover:text-primary-500'}`}
                >
                  By price
                </button>
                <button
                  onClick={() => setSortBy('popularity')}
                  className={`text-xs font-bold ${sortBy === 'popularity' ? 'text-primary-500' : 'text-gray-500 hover:text-primary-500'}`}
                >
                  By popularity
                </button>
                <div className="ml-auto flex items-center gap-1.5">
                  {[1, 2, 3, 4, '...', 32].map((n, i) => (
                    <button key={i} className={`w-7 h-7 rounded-lg text-xs font-medium ${n === 1 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{n}</button>
                  ))}
                </div>
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
                  <p className="text-gray-500 text-sm">No products match these filters. Try adjusting them.</p>
                  <Link to="/catalog" className="text-primary-500 text-sm font-bold hover:underline">Browse all medicines</Link>
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 mt-8">
                {[1, 2, 3, 4, '...', 32].map((n, i) => (
                  <button key={i} className={`w-8 h-8 rounded-lg text-sm font-medium ${n === 1 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-white'}`}>{n}</button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                {features.map((f) => (
                  <div key={f.title} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                      <f.icon size={18} className="text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{f.title}</h4>
                      <p className="text-[10px] text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-gray-900">Deal of the Month</h2>
                  <div className="flex gap-2">
                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500"><ChevronLeftIcon /></button>
                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500"><ChevronRightIcon /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {beautyProducts.slice(0, 5).map((p) => <ProductCard key={`deal-${p.id}`} product={p} />)}
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Recently viewed</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {beautyProducts.slice(3, 8).map((p) => <ProductCard key={`viewed-${p.id}`} product={p} />)}
                </div>
              </section>

              <section className="mt-10">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-gray-900">Deal of the Month</h2>
                  <div className="flex gap-2">
                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500"><ChevronLeftIcon /></button>
                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500"><ChevronRightIcon /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {beautyProducts.slice(0, 5).map((p) => <ProductCard key={`deal2-${p.id}`} product={p} />)}
                </div>
              </section>

              <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">SEO text</h2>
                <div className="text-xs text-gray-500 leading-relaxed grid md:grid-cols-3 gap-6 mb-4">
                  {seoParagraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                <div className="flex gap-3 items-start bg-gray-50 border border-gray-100 rounded-xl p-4 mb-4">
                  <Info size={18} className="text-primary-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">{seoParagraphs[0]}</p>
                </div>

                {seoExpanded && (
                  <div className="grid md:grid-cols-3 gap-8 text-xs text-gray-500 leading-relaxed mb-6">
                    {[0,1,2].map((_, column) => (
                      <div key={column} className="space-y-5">
                        {seoParagraphs.map((p,index)=>(<p key={index}>{p}</p>))}</div> ))}
                  </div>
                )}

                <button
                  onClick={() => setSeoExpanded(v => !v)}
                  className="inline-flex items-center gap-1 text-primary-500 text-xs font-bold hover:underline"
                >
                  {seoExpanded ? 'Hide' : 'Show full text'}
                  {seoExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              </section>
          </div>
          </>
        )}
      </div>
    </div>
  )
}

const ChevronLeftIcon = () => <ChevronRight size={14} className="rotate-180" />
const ChevronRightIcon = () => <ChevronRight size={14} />

export default Beauty