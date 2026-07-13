import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart, Minus, Plus, X, ChevronLeft, ChevronRight, ChevronDown, Star,
  ThumbsUp, ThumbsDown, ShoppingCart, MapPin, Truck, ListFilter,
  PackageSearch, Info, Droplet, Pill, SprayCan, Package, ShieldCheck, Wallet,
  Activity, Search, Share2, Mail, MessageCircle, BookOpen,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import ProductCard from './ProductCard'
import refArbidolImg from '../assets/images/products/arbidol.png'
import refBicyclolImg from '../assets/images/products/bicyclol.png'
import refBififormImg from '../assets/images/products/bifiform.png'
import refDetragelImg from '../assets/images/products/detragel.png'
import refNormovenImg from '../assets/images/products/Normoven.png'
import refFemibionImg from '../assets/images/products/femibion.png'
import refKreonImg from '../assets/images/products/Kreon.png'
import refSyrupImg from '../assets/images/products/Syrup.png'
import refTabletImg from '../assets/images/products/tablet.png'
import refSerumImg from '../assets/images/products/serum.png'
import refHeroImg from '../assets/images/banners/tab4.jpg'
import refArticleOneImg from '../assets/images/banners/tab1.png'
import refArticleTwoImg from '../assets/images/banners/tab2.jpg'
import refArticleThreeImg from '../assets/images/banners/tab3.jpg'
import refBabyImg from '../assets/images/Categories/baby.png'
import refCareImg from '../assets/images/Categories/ladyAvacado.jpg'
import refBlackLadyImg from '../assets/images/Categories/blackLady.png'
import refLadyModelImg from '../assets/images/Categories/ladyModel.png'

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

const DEFAULT_CATALOG_TILES = [
  { name: 'External products', icon: Droplet },
  { name: 'Syrups, drops, suspensions', icon: SprayCan },
  { name: 'Tablets & capsules', icon: Pill },
  { name: 'External products', icon: Droplet },
  { name: 'Tablets & capsules', icon: Pill },
  { name: 'External products', icon: Droplet },
  { name: 'External products', icon: Droplet },
  { name: 'Syrups, drops, suspensions', icon: SprayCan },
]

const DEFAULT_BRANDS = [
  'Smeg', 'Grodtorgmash', 'Dihr', 'Adler', 'MEC',
  'Abat', 'Elettrobar', 'Solis', 'Amika', 'Meiko',
  'Comenda', 'Silanos', 'Fagor', 'Tatra', 'Kocateq',
  'Apach', 'Electrolux', 'Vortmax', 'ATA', 'Winterhalter',
  'Modular', 'Compack', 'Kromo', 'Viatto', 'Apach',
  'Electrolux', 'Fagor', 'Tatra',
]

const DEFAULT_CATEGORIES = [
  'Obstetrics, Gynecology', 'Allergy', 'Anesthesia, Resuscitation', 'Antibiotics',
  'Blood Diseases', 'Pain, Temperature', 'Hemorrhoids', 'Eyes',
  'Worms, Lice, Scabies', 'Homeopathy', 'Diabetes', 'Diagnostic Agents',
  'Respiratory System', 'Stomach, Intestine, Liver',
]

const DEFAULT_MORE_CATEGORIES = [
  'Teeth & Mouth', 'Immune System', 'Skin', 'Urogenital System',
  'Metabolic Disorders', 'Neurology, Psychiatry', 'Antiseptics', 'Oncology',
]

const DEFAULT_FEATURES = [
  { icon: Package, title: 'Assortment', desc: 'Equipment, furniture, tableware & inventory' },
  { icon: Truck, title: 'Fast delivery', desc: 'To any point in Russia, quickly' },
  { icon: ShieldCheck, title: 'Guarantee', desc: 'All products are certified' },
  { icon: Wallet, title: 'Low prices', desc: 'We strive to maintain the lowest prices' },
]

const DEFAULT_SEO = [
  'Barclay Plaza Business Centre class B+, built in 2008, despite its age, is one of the most in-demand Business Centres in the Western Administrative District of Moscow.',
  'Proximity to Kutuzovsky Prospekt, Minskaya St. and Moscow-City, as well as walking distance to three metro stations add to its relevance. Thus, Park Pobedy metro station is just 800 metres away.',
  'Barclay Plaza is distinguished by a stylish panoramic facade, an unusual entrance group and designer finishing of common areas and elevator halls. Ceiling height in offices is more than 3 metres.',
]

const DEFAULT_COUNTRIES = ['Belarus', 'Germany', 'Greece', 'Ireland', 'Spain', 'Italy', 'China']
const DEFAULT_EFFECTS = ['For bronchi', 'For hair', 'For eyes', 'For throat', 'For lips', 'For respiratory tract', 'For stomach']

const paginateItems = [1, 2, 3, 4, '...', 32]

export const CategoryListingPage = ({
  title,
  description,
  products,
  category,
  catalogTiles = DEFAULT_CATALOG_TILES,
  popularBrands = DEFAULT_BRANDS,
  categories = DEFAULT_CATEGORIES,
  moreCategories = DEFAULT_MORE_CATEGORIES,
  countries = DEFAULT_COUNTRIES,
  effects = DEFAULT_EFFECTS,
  seoParagraphs = DEFAULT_SEO,
}) => {
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

  const preparedProducts = useMemo(
    () => products.map((product, index) => ({
      ...product,
      country: product.country || countries[index % countries.length],
      effect: product.effect || effects[index % effects.length],
    })),
    [products, countries, effects],
  )

  const toggleCountry = (countryName) => {
    setSelectedCountries((prev) => prev.includes(countryName) ? prev.filter((item) => item !== countryName) : [...prev, countryName])
  }

  const toggleEffect = (effectName) => {
    setSelectedEffects((prev) => prev.includes(effectName) ? prev.filter((item) => item !== effectName) : [...prev, effectName])
  }

  const filtered = useMemo(() => {
    let list = preparedProducts.filter((product) => product.category === category)
    list = list.filter((product) => product.price <= maxPrice)
    if (inStockOnly) list = list.filter((product) => product.inStock)
    if (selectedCountries.length) list = list.filter((product) => selectedCountries.includes(product.country))
    if (selectedEffects.length) list = list.filter((product) => selectedEffects.includes(product.effect))
    if (sortBy === 'price') list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'popularity') list = list.filter((product) => product.isHit).concat(list.filter((product) => !product.isHit))
    return list
  }, [category, inStockOnly, maxPrice, preparedProducts, selectedCountries, selectedEffects, sortBy])

  const visibleEffects = effects.filter((effect) => effect.toLowerCase().includes(effectSearch.toLowerCase()))
  const visibleCategories = showAllCategories ? [...categories, ...moreCategories] : categories

  const resetFilters = () => {
    setMaxPrice(865878)
    setInStockOnly(true)
    setSelectedCountries([])
    setSelectedEffects([])
    setEffectSearch('')
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <Link to="/" className="hover:text-primary-500">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700">{title}</span>
        </div>

        <h1 className="text-2xl font-bold mb-1 text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mb-4 max-w-2xl">{description}</p>

        {selectedProduct ? (
          <ProductDetailPanel
            product={selectedProduct}
            relatedProducts={filtered.filter((product) => product.id !== selectedProduct.id).slice(0, 4)}
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
                    {visibleCategories.map((item) => (
                      <li key={item}>
                        <button
                          onClick={() => setActiveCategory(item)}
                          className={`w-full text-left px-2 py-1.5 rounded-lg transition ${
                            activeCategory === item ? 'text-primary-500 font-bold' : 'text-gray-700 hover:text-primary-500'
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setShowAllCategories((value) => !value)}
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
                    <input type="number" value={2365} readOnly className="w-1/2 px-2 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-700" />
                    <span className="text-gray-300">-</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(event) => setMaxPrice(Number(event.target.value) || 0)}
                      className="w-1/2 px-2 py-1.5 bg-gray-50 rounded-lg text-xs text-gray-700"
                    />
                  </div>
                  <input
                    type="range"
                    min="2365"
                    max="865878"
                    step="500"
                    value={maxPrice}
                    onChange={(event) => setMaxPrice(Number(event.target.value))}
                    className="w-full accent-primary-500 mb-5"
                  />

                  <h4 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Country</h4>
                  <ul className="space-y-2 text-sm text-gray-700 mb-5">
                    {countries.map((countryName) => (
                      <li key={countryName}>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCountries.includes(countryName)}
                            onChange={() => toggleCountry(countryName)}
                            className="accent-primary-500 w-4 h-4"
                          />
                          {countryName}
                        </label>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Effect</h4>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={effectSearch}
                    onChange={(event) => setEffectSearch(event.target.value)}
                    className="w-full mb-3 px-3 py-1.5 bg-gray-50 rounded-lg text-xs focus:outline-none"
                  />
                  <ul className="space-y-2 text-sm text-gray-700 mb-5">
                    {visibleEffects.map((effectName) => (
                      <li key={effectName}>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedEffects.includes(effectName)}
                            onChange={() => toggleEffect(effectName)}
                            className="accent-primary-500 w-4 h-4"
                          />
                          {effectName}
                        </label>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-bold text-xs tracking-wide text-gray-400 mb-3">Availability</h4>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mb-1.5">
                    <input type="radio" name={`${category}-availability`} checked={inStockOnly} onChange={() => setInStockOnly(true)} className="accent-primary-500 w-4 h-4" />
                    In stock
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer mb-4">
                    <input type="radio" name={`${category}-availability`} checked={!inStockOnly} onChange={() => setInStockOnly(false)} className="accent-primary-500 w-4 h-4" />
                    Pre-order
                  </label>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary-500 text-white font-bold py-2.5 rounded-full text-sm hover:bg-primary-600">Show</button>
                    <button onClick={resetFilters} className="flex-1 bg-gray-100 text-gray-600 font-bold py-2.5 rounded-full text-sm hover:bg-gray-200">
                      Reset
                    </button>
                  </div>
                </div>
              </aside>

              <div className="flex-1 min-w-0">
                <section className="bg-white rounded-2xl shadow-sm p-5 mb-4">
                  <h3 className="font-bold text-sm mb-3 text-gray-900">Catalog</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {catalogTiles.map((tile, index) => (
                      <button key={`${tile.name}-${index}`} className="flex items-center gap-2 bg-gray-50 hover:bg-primary-50 rounded-xl px-4 py-4 text-left transition">
                        <tile.icon size={20} className="text-gray-400 shrink-0" />
                        <span className="text-xs font-medium text-gray-700">{tile.name}</span>
                      </button>
                    ))}
                  </div>

                  <h3 className="font-bold text-sm mb-3 text-gray-900">Popular Brands</h3>
                  <div className="border border-gray-100 rounded-xl p-4 grid grid-cols-3 sm:grid-cols-6 gap-x-4 gap-y-2 text-xs text-gray-600">
                    {popularBrands.map((brand, index) => (
                      <span key={`${brand}-${index}`} className="hover:text-primary-500 cursor-pointer">{brand}</span>
                    ))}
                  </div>
                </section>

                <div className="bg-white rounded-2xl p-3 mb-4 shadow-sm flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                    <ListFilter size={14} />
                    SORT BY:
                  </span>
                  <button onClick={() => setSortBy('price')} className={`text-xs font-bold ${sortBy === 'price' ? 'text-primary-500' : 'text-gray-500 hover:text-primary-500'}`}>
                    By price
                  </button>
                  <button onClick={() => setSortBy('popularity')} className={`text-xs font-bold ${sortBy === 'popularity' ? 'text-primary-500' : 'text-gray-500 hover:text-primary-500'}`}>
                    By popularity
                  </button>
                  <div className="ml-auto flex items-center gap-1.5">
                    {paginateItems.map((item, index) => (
                      <button key={`${item}-${index}`} className={`w-7 h-7 rounded-lg text-xs font-medium ${item === 1 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{item}</button>
                    ))}
                  </div>
                </div>

                {filtered.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                    {filtered.map((product) => (
                      <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />
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
                  {paginateItems.map((item, index) => (
                    <button key={`bottom-${item}-${index}`} className={`w-8 h-8 rounded-lg text-sm font-medium ${item === 1 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-white'}`}>{item}</button>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
                  {DEFAULT_FEATURES.map((feature) => (
                    <div key={feature.title} className="bg-white rounded-2xl p-4 shadow-sm flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                        <feature.icon size={18} className="text-primary-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900">{feature.title}</h4>
                        <p className="text-[10px] text-gray-500">{feature.desc}</p>
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
                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500"><ChevronRight size={14} className="rotate-180" /></button>
                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500"><ChevronRight size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {preparedProducts.slice(0, 5).map((product) => <ProductCard key={`deal-${product.id}`} product={product} onSelect={setSelectedProduct} />)}
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Recently viewed</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {preparedProducts.slice(3, 8).map((product) => <ProductCard key={`viewed-${product.id}`} product={product} onSelect={setSelectedProduct} />)}
                </div>
              </section>

              <section className="mt-10">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-bold text-gray-900">Deal of the Month</h2>
                  <div className="flex gap-2">
                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500"><ChevronRight size={14} className="rotate-180" /></button>
                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500"><ChevronRight size={14} /></button>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {preparedProducts.slice(0, 5).map((product) => <ProductCard key={`deal2-${product.id}`} product={product} onSelect={setSelectedProduct} />)}
                </div>
              </section>

              <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4">SEO text</h2>
                <div className="text-xs text-gray-500 leading-relaxed grid md:grid-cols-3 gap-6 mb-4">
                  {seoParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>

                <div className="flex gap-3 items-start bg-gray-50 border border-gray-100 rounded-xl p-4 mb-4">
                  <Info size={18} className="text-primary-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-600 leading-relaxed">{seoParagraphs[0]}</p>
                </div>

                {seoExpanded && (
                  <div className="grid md:grid-cols-3 gap-8 text-xs text-gray-500 leading-relaxed mb-6">
                    {[0, 1, 2].map((column) => (
                      <div key={column} className="space-y-5">
                        {seoParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={() => setSeoExpanded((value) => !value)} className="inline-flex items-center gap-1 text-primary-500 text-xs font-bold hover:underline">
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

const referenceImages = [
  refArbidolImg,
  refBicyclolImg,
  refBififormImg,
  refDetragelImg,
  refNormovenImg,
]

const ReferenceStars = ({ count = 4, size = 13 }) => (
  <span className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, index) => (
      <Star key={index} size={size} className={index < count ? 'fill-gold-500 text-gold-500' : 'fill-gray-200 text-gray-200'} />
    ))}
  </span>
)

const ReferenceProductCard = ({ product }) => (
  <div className="bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow flex flex-col overflow-hidden group cursor-pointer">
    <div className="relative bg-gray-50 h-[140px] flex items-center justify-center">
      <span className="absolute top-2 left-2 bg-[#26c6bc] text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap z-10">Deal of the Day</span>
      <img src={product.img} alt={product.name} className="h-[120px] w-auto object-contain" />
    </div>
    <div className="flex flex-col flex-1 p-3 gap-1.5">
      <div className="flex items-center justify-between gap-1 flex-wrap">
        <span className={`text-[10px] font-bold ${product.inStock ? 'text-[#26c6bc]' : 'text-red-500'}`}>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
        <ReferenceStars count={product.stars} />
      </div>
      <p className="text-[12px] font-bold text-gray-800 leading-snug line-clamp-2">{product.name}</p>
      <ul className="flex flex-col gap-0.5 mt-0.5">
        {[
          ['Brand', product.brand],
          ['Qty per pack', product.qty],
          ['Item code', product.code],
        ].map(([label, value]) => (
          <li key={label} className="flex items-center gap-1.5 text-[10.5px] text-gray-400 font-medium">
            <span className="w-1 h-1 rounded-full bg-[#26c6bc] shrink-0" />
            <span className="text-gray-400">{label}:</span>
            <span className="text-gray-500 font-semibold">{value}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between mt-auto pt-2 gap-2">
        <div>
          <p className="text-[17px] font-black text-gray-900 leading-none">{product.price} <span className="text-[13px]">PY6.</span></p>
          <p className="text-[11px] font-bold text-red-500 line-through mt-0.5">{product.oldPrice} PY6.</p>
        </div>
        {product.inStock && (
          <button className="w-10 h-10 rounded-full bg-[#26c6bc] hover:bg-[#1aada4] flex items-center justify-center shrink-0 transition-colors shadow-sm">
            <ShoppingCart size={18} className="text-white" />
          </button>
        )}
      </div>
    </div>
  </div>
)

const referenceProducts = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  inStock: index !== 0 && index !== 5,
  name: 'Velson film-coated tablets 3 mg, 30 pcs.',
  brand: 'Lirina',
  qty: '10 pcs',
  code: '153249',
  price: '41 108',
  oldPrice: '49 999',
  stars: 4,
  img: referenceImages[index % referenceImages.length],
}))

export const ReferenceDeals = ({ title = 'Favorites', count = 5 }) => (
  <section className="w-full bg-white py-8 px-4">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center text-gray-500"><ChevronLeft size={16} /></button>
          <button className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center text-gray-500"><ChevronRight size={16} /></button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {referenceProducts.slice(0, count).map((product) => <ReferenceProductCard key={`${title}-${product.id}`} product={product} />)}
      </div>
    </div>
  </section>
)

export const ReferenceFeatureStrip = () => {
  const items = [
    ['Assortment', 'Equipment, furniture, dishes and inventory', Package],
    ['Fast Delivery', 'To any location across the country quickly', Truck],
    ['Guarantee', 'All products are certified', ShieldCheck],
    ['Low Prices', 'We strive to maintain the lowest prices', Wallet],
    ['4,349 Reviews', 'We strive to maintain the lowest prices', Star],
  ]

  return (
    <section className="w-full bg-white border-y border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-5 divide-x-0 lg:divide-x divide-gray-100">
          {items.map(([title, desc, Icon], index) => (
            <div key={title} className={`flex items-start gap-3 ${index === 0 ? '' : 'lg:pl-4'}`}>
              <div className="w-10 h-10 rounded-full bg-[#26c6bc] flex items-center justify-center shrink-0">
                <Icon size={19} className="text-white" />
              </div>
              <div>
                <p className="text-[13px] font-extrabold text-gray-800 leading-tight mb-0.5">{title}</p>
                <p className="text-[11.5px] text-gray-400 font-medium leading-snug">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const beautyCatalogColors = ['#e8f7f6', '#f4f7fb', '#fff4e6', '#fdf2f8']

const beautyCatalogImageByName = {
  'External products': refSerumImg,
  'Syrups, drops, suspensions': refSyrupImg,
  'Tablets & capsules': refTabletImg,
}

const beautyCountries = ['Belarus', 'Germany', 'Greece', 'Ireland', 'Spain', 'Italy', 'China']
const beautyEffects = ['For face', 'For hair', 'For lips', 'For body', 'For sensitive skin', 'For sun care', 'For daily care']

const ReferenceFilterPanel = () => {
  const [maxPrice, setMaxPrice] = useState(865878)
  const [inStockOnly, setInStockOnly] = useState(true)
  const [selectedCountries, setSelectedCountries] = useState(['Italy'])
  const [selectedEffects, setSelectedEffects] = useState(['For daily care'])
  const [effectSearch, setEffectSearch] = useState('')

  const toggleCountry = (country) => {
    setSelectedCountries((current) => current.includes(country) ? current.filter((item) => item !== country) : [...current, country])
  }

  const toggleEffect = (effect) => {
    setSelectedEffects((current) => current.includes(effect) ? current.filter((item) => item !== effect) : [...current, effect])
  }

  const visibleEffects = beautyEffects.filter((effect) => effect.toLowerCase().includes(effectSearch.toLowerCase()))

  const resetFilters = () => {
    setMaxPrice(865878)
    setInStockOnly(true)
    setSelectedCountries([])
    setSelectedEffects([])
    setEffectSearch('')
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-[15px] font-black text-gray-900 mb-4">Filter</h3>

      <h4 className="font-bold text-[11px] tracking-widest text-gray-400 uppercase mb-3">Price</h4>
      <div className="flex items-center gap-2 mb-3">
        <input type="number" value={2365} readOnly className="w-1/2 px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-600" />
        <span className="text-gray-300">-</span>
        <input
          type="number"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value) || 0)}
          className="w-1/2 px-3 py-2 bg-gray-50 rounded-lg text-xs text-gray-600 outline-none focus:ring-1 focus:ring-[#26c6bc]"
        />
      </div>
      <input
        type="range"
        min="2365"
        max="865878"
        step="500"
        value={maxPrice}
        onChange={(event) => setMaxPrice(Number(event.target.value))}
        className="w-full accent-[#26c6bc] mb-5"
      />

      <h4 className="font-bold text-[11px] tracking-widest text-gray-400 uppercase mb-3">Country</h4>
      <ul className="space-y-2 text-[13px] text-gray-600 mb-5">
        {beautyCountries.map((country) => (
          <li key={country}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedCountries.includes(country)} onChange={() => toggleCountry(country)} className="accent-[#26c6bc] w-4 h-4" />
              {country}
            </label>
          </li>
        ))}
      </ul>

      <h4 className="font-bold text-[11px] tracking-widest text-gray-400 uppercase mb-3">Effect</h4>
      <input
        type="text"
        placeholder="Search..."
        value={effectSearch}
        onChange={(event) => setEffectSearch(event.target.value)}
        className="w-full mb-3 px-3 py-2 bg-gray-50 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#26c6bc]"
      />
      <ul className="space-y-2 text-[13px] text-gray-600 mb-5">
        {visibleEffects.map((effect) => (
          <li key={effect}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedEffects.includes(effect)} onChange={() => toggleEffect(effect)} className="accent-[#26c6bc] w-4 h-4" />
              {effect}
            </label>
          </li>
        ))}
      </ul>

      <h4 className="font-bold text-[11px] tracking-widest text-gray-400 uppercase mb-3">Availability</h4>
      <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mb-2">
        <input type="radio" name="beauty-availability" checked={inStockOnly} onChange={() => setInStockOnly(true)} className="accent-[#26c6bc] w-4 h-4" />
        In stock
      </label>
      <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer mb-5">
        <input type="radio" name="beauty-availability" checked={!inStockOnly} onChange={() => setInStockOnly(false)} className="accent-[#26c6bc] w-4 h-4" />
        Pre-order
      </label>

      <div className="flex gap-2">
        <button className="flex-1 bg-[#26c6bc] hover:bg-[#1aada4] text-white font-bold py-2.5 rounded-full text-sm">Show</button>
        <button onClick={resetFilters} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2.5 rounded-full text-sm">Reset</button>
      </div>
    </div>
  )
}

const ReferenceSeoText = ({ title, paragraphs }) => (
  <section className="w-full bg-white px-4 py-8">
    <div className="max-w-screen-xl mx-auto rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-lg font-black text-gray-900 mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-5 text-[13px] text-gray-600 leading-relaxed">
        {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </div>
    </div>
  </section>
)

const ReferenceAboutCompanySeo = () => {
  const [aboutExpanded, setAboutExpanded] = useState(false)

  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-navy-900 mb-8">SEO Text</h2>
      <div className="bg-white rounded-3xl shadow-sm p-10">
        <div className="grid lg:grid-cols-3 gap-10 text-[15px] leading-8 text-gray-500">
          <div className="space-y-8">
            <p>Barclay Plaza Business Centre class B+, built in 2008, despite its age, is one of the most in-demand Business Centres in the Western Administrative District of Moscow.</p>
            <p>Proximity to Kutuzovsky Prospekt, Minskaya St. and Moscow-City, as well as walking distance to three metro stations add to its relevance. Thus, Park Pobedy metro station is just 800 metres away.</p>
            <p>Barclay Plaza is distinguished by a stylish panoramic facade, an unusual entrance group and designer finishing of common areas and elevator halls.</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-4">
              <span className="w-3 h-3 rounded-full bg-teal-400 mt-3 shrink-0" />
              <p>Barclay Plaza Business Centre class B+, built in 2008, despite its age, is one of the most in-demand Business Centres in the Western Administrative District.</p>
            </div>
            <div className="flex gap-4">
              <span className="w-3 h-3 rounded-full bg-teal-400 mt-3 shrink-0" />
              <p>Proximity to Kutuzovsky Prospekt, Minskaya St. and Moscow-City, as well as walking distance to three metro stations add to its relevance. Thus, Park metro station.</p>
            </div>
            <div className="flex gap-4">
              <span className="w-3 h-3 rounded-full bg-teal-400 mt-3 shrink-0" />
              <p>Barclay Plaza is distinguished by a stylish panoramic facade, an unusual entrance group and designer finishing of common areas and elevator halls.</p>
            </div>
          </div>

          <div className="space-y-8">
            <p>Barclay Plaza Business Centre class B+, built in 2008, despite its age, is one of the most in-demand Business Centres in the Western Administrative District of Moscow.</p>
            <p>Proximity to Kutuzovsky Prospekt, Minskaya St. and Moscow-City, as well as walking distance to three metro stations add to its relevance. Thus, Park Pobedy metro station is just 800 metres away.</p>
            <p>Barclay Plaza is distinguished by a stylish panoramic facade, an unusual entrance group and designer finishing of common areas and elevator halls.</p>
          </div>
        </div>

        <div className="mt-10">
          <p className="text-gray-500 leading-8">Our company's activities are based on providing professional kitchen equipment to public catering establishments of any format: hotels, hostels, hypermarkets, canteens, kindergartens and schools. The speed of cooking dishes of any complexity and the quality of your chefs' work depends on the quality of the equipment.</p>
        </div>

        <div className="mt-8 bg-gray-50 border rounded-3xl p-8 flex gap-5">
          <div className="w-10 h-10 rounded-full border-2 border-teal-400 flex items-center justify-center text-teal-400 font-bold text-xl shrink-0">i</div>
          <p className="text-gray-500 leading-8">Our company's activities are based on providing professional kitchen equipment to public catering establishments of any format: hotels, hostels, hypermarkets, canteens, kindergartens and schools.</p>
        </div>

        {aboutExpanded && (
          <div className="mt-8">
            <p className="text-gray-500 leading-8">Our company's activities are based on providing professional kitchen equipment to public catering establishments of any format. We offer high-quality equipment for your business including thermal, refrigeration, laundry, coffee, bar and fast-food solutions.</p>
          </div>
        )}

        <button
          onClick={() => setAboutExpanded(!aboutExpanded)}
          className="mt-8 text-teal-500 uppercase font-bold tracking-wide hover:text-teal-700"
        >
          {aboutExpanded ? '>> Collapse Text' : '>> Expand Text'}
        </button>
      </div>
    </section>
  )
}

export const ReferenceBeautyPage = () => {
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Anesthesia, Resuscitation')
  const [sortBy, setSortBy] = useState('price')
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const visibleCategories = showAllCategories ? [...DEFAULT_CATEGORIES, ...DEFAULT_MORE_CATEGORIES] : DEFAULT_CATEGORIES

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-[11px] font-bold tracking-widest text-gray-800 uppercase">Categories</h2>
              </div>
              <ul className="divide-y divide-gray-50">
                {visibleCategories.map((categoryName) => {
                  const isActive = categoryName === activeCategory
                  return (
                    <li key={categoryName}>
                      <button
                        onClick={() => setActiveCategory(categoryName)}
                        className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${isActive ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-[#26c6bc]' : 'bg-gray-300'}`} />
                        <span className={`text-[13.5px] leading-snug ${isActive ? 'font-bold text-gray-900' : 'font-normal text-gray-600'}`}>
                          {categoryName}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <button
                onClick={() => setShowAllCategories((value) => !value)}
                className="w-full flex items-center justify-center gap-2 bg-[#26c6bc] hover:bg-[#1aada4] text-white text-[11px] font-bold tracking-widest uppercase py-4 transition-colors"
              >
                <ChevronDown size={14} className={showAllCategories ? 'rotate-180 transition' : 'transition'} />
                {showAllCategories ? 'Show Less' : 'Show All Categories'}
              </button>
            </div>
            <div className="mt-5">
              <ReferenceFilterPanel />
            </div>
          </aside>

          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <section>
              <h2 className="text-[11px] font-bold tracking-widest text-gray-800 uppercase mb-4">Catalog</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                {DEFAULT_CATALOG_TILES.map((tile, index) => (
                  <button
                    key={`${tile.name}-${index}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 bg-white hover:shadow-sm transition-shadow text-left min-h-[88px] overflow-hidden"
                    style={{ background: beautyCatalogColors[index % beautyCatalogColors.length] }}
                  >
                    <span className="w-16 h-16 shrink-0 rounded-lg bg-white/70 flex items-center justify-center overflow-hidden">
                      <img
                        src={beautyCatalogImageByName[tile.name]}
                        alt={tile.name}
                        className="max-w-[58px] max-h-[58px] object-contain"
                      />
                    </span>
                    <span className="text-[13px] font-medium text-gray-700 leading-tight">{tile.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[11px] font-bold tracking-widest text-gray-800 uppercase mb-4">Popular Brands</h2>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-2 gap-x-4">
                  {DEFAULT_BRANDS.map((brand, index) => (
                    <span key={`${brand}-${index}`} className="text-[13px] text-gray-500 cursor-pointer hover:text-[#26c6bc] whitespace-nowrap">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-100 rounded-xl px-5 py-3 shadow-sm">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-[11px] font-bold tracking-widest text-gray-800 uppercase whitespace-nowrap">Sort by:</span>
                <ListFilter size={16} className="text-[#26c6bc]" />
                {[
                  ['price', 'By price'],
                  ['popularity', 'By popularity'],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`text-[13px] transition-colors whitespace-nowrap ${sortBy === key ? 'text-[#26c6bc] font-semibold' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              
               <ReferenceDeals title="" count={16} />
             
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, '...', 32].map((item, index) => (
                  <button key={`${item}-${index}`} className={`min-w-[28px] h-7 rounded text-[13px] font-medium ${item === 1 ? 'bg-[#26c6bc] text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
                    {item === '...' ? '...' : item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ReferenceFeatureStrip />
      <ReferenceDeals title="Deal of the Month" count={10} />
      <ReferenceDeals title="" count={5} />
      <ReferenceAboutCompanySeo />
      
    </div>
  )
}

export const ReferencePetProductsPage = () => (
  <div className="bg-white">
    <ReferenceDeals title="Favorites" count={10} />
    <ReferenceDeals title="Always useful" count={5} />
    <ReferenceFeatureStrip />
  </div>
)

export const ReferenceMedEquipmentPage = () => {
  const [items, setItems] = useState(referenceProducts.slice(0, 4).map((item, index) => ({ ...item, count: 1, inStock: index !== 3 })))
  const total = items.reduce((sum, item) => sum + 41108 * item.count, 0) - 32 + 548

  return (
    <div className="bg-white">
      <section className="w-full bg-white px-4 py-6">
        <div className="max-w-screen-xl mx-auto">
          <nav className="text-[11px] text-gray-400 mb-3 flex items-center gap-1">
            <span className="text-[#26c6bc] cursor-pointer hover:underline">Home</span><span>›</span>
            <span className="text-[#26c6bc] cursor-pointer hover:underline">Pharmacy</span><span>›</span><span>Cart</span>
          </nav>
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-[22px] font-black text-gray-900">Cart</h1>
            {items.length > 0 && <button onClick={() => setItems([])} className="text-[12px] text-gray-400 hover:text-red-400">Clear cart</button>}
          </div>
          {items.length === 0 ? (
            <p className="text-[14px] text-gray-400 py-12 text-center">Your cart is empty</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
              <div className="flex flex-col divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    <div className="w-[90px] h-[90px] shrink-0 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                      <img src={item.img} alt={item.name} className="h-[80px] w-auto object-contain" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex items-center gap-2"><span className={`text-[10px] font-bold ${item.inStock ? 'text-[#26c6bc]' : 'text-red-500'}`}>{item.inStock ? 'In stock' : 'Out of stock'}</span><ReferenceStars size={11} /></div>
                      <p className="text-[12px] font-bold text-gray-800 leading-snug line-clamp-2">{item.name}</p>
                      <div className="flex flex-col gap-0.5 text-[10px] text-gray-400">
                        <span>Brand: <b className="text-gray-500">{item.brand}</b></span>
                        <span>Pack qty: <b className="text-gray-500">{item.qty}</b></span>
                        <span>Item code: <b className="text-gray-500">{item.code}</b></span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <p className="text-[16px] font-black text-gray-900">{(41108 * item.count).toLocaleString()} <span className="text-[11px]">PY6.</span></p>
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => setItems((prev) => prev.map((p) => p.id === item.id ? { ...p, count: Math.max(1, p.count - 1) } : p))} className="w-7 h-7 text-gray-400">-</button>
                        <span className="w-7 h-7 flex items-center justify-center text-[12px] font-bold border-x border-gray-200">{item.count}</span>
                        <button onClick={() => setItems((prev) => prev.map((p) => p.id === item.id ? { ...p, count: p.count + 1 } : p))} className="w-7 h-7 text-[#26c6bc]">+</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-4 lg:sticky lg:top-4">
                <div className="border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-[15px] font-black text-gray-900 mb-4">Your Order</h3>
                  <div className="flex justify-between text-[13px] mb-2"><span className="text-gray-500">Discount</span><span className="text-red-400 font-bold">-32 PY6.</span></div>
                  <div className="flex justify-between text-[13px] mb-4"><span className="text-gray-500">Total without delivery</span><span className="text-gray-700 font-bold">548 PY6.</span></div>
                  <div className="border-t border-gray-100 pt-3 mb-4 flex justify-between"><span className="text-[13px] font-black">Total</span><span className="text-[18px] font-black">{total.toLocaleString()} PY6.</span></div>
                  <button className="w-full bg-[#26c6bc] hover:bg-[#1aada4] text-white font-bold text-[13px] rounded-xl py-3">Place Order</button>
                </div>
                <div className="border border-gray-100 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-[14px] font-black text-gray-900 mb-3">Promo Code</h3>
                  <div className="flex items-center gap-2">
                    <input placeholder="Enter promo code" className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-[12px] outline-none focus:border-[#26c6bc]" />
                    <button className="w-9 h-9 rounded-xl bg-[#26c6bc] text-white">›</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <ReferenceDeals title="Always useful" count={5} />
      <ReferenceFeatureStrip />
    </div>
  )
}

export const ReferenceReviewsPage = () => (
  <section className="w-full bg-white px-4 py-6">
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-[22px] font-black text-gray-900 mb-5">Reviews about us</h1>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Sort by:</span>
          {['Popular', 'Most recent', 'By rating'].map((item, index) => <button key={item} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold ${index === 0 ? 'bg-[#26c6bc] text-white' : 'bg-gray-100 text-gray-600'}`}>{item}</button>)}
        </div>
        <div className="flex items-center gap-1">{[1, 2, 3, 4, '...', 37].map((item, index) => <button key={index} className={`w-7 h-7 rounded-lg text-[11px] font-bold ${item === 1 ? 'bg-[#26c6bc] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{item}</button>)}</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start">
        <aside className="border border-gray-100 rounded-2xl p-5">
          <div className="text-5xl font-black text-[#26c6bc]">4.9</div>
          <ReferenceStars count={5} />
          <p className="text-xs text-gray-400 mt-2">49 ratings</p>
          {[5, 4, 3, 2, 1].map((rating) => <div key={rating} className="flex items-center gap-2 mt-3 text-xs text-gray-500"><span>{rating}</span><div className="flex-1 h-1.5 rounded-full bg-gray-100"><div className="h-full rounded-full bg-[#26c6bc]" style={{ width: `${rating * 18}%` }} /></div></div>)}
        </aside>
        <div>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="border-b border-gray-100 py-5">
              <div className="flex items-start justify-between gap-3 mb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[13px] font-black text-gray-900">Liana,</span>
                  <span className="text-[12px] text-gray-500">Moscow,</span>
                  <span className="text-[12px] text-gray-400">7.5 hours</span>
                  <ReferenceStars count={5} />
                </div>
              </div>
              <p className="text-[12.5px] text-gray-600 leading-relaxed">Everyday practice shows that the framework and place of staff training allows evaluating the significance of forms of development. The task of the organization represents an interesting experiment.</p>
            </div>
          ))}
          <div className="border border-gray-100 rounded-2xl p-5 shadow-sm mb-6">
            <h3 className="text-[15px] font-black text-gray-900 mb-3">Leave a Review</h3>
            <ReferenceStars count={4} size={22} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 mb-3">
              <input placeholder="Your name" className="border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-[#26c6bc]" />
              <input placeholder="Your e-mail" className="border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-[#26c6bc]" />
            </div>
            <textarea placeholder="Write your comment here, it is important..." rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] text-gray-700 placeholder-gray-400 outline-none focus:border-[#26c6bc] resize-none mb-3" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button className="rounded-full px-8 py-2.5 font-bold text-white text-[13px] bg-[#26c6bc] hover:bg-[#1aada4]">Submit</button>
              <p className="text-[11px] text-gray-400 leading-snug">By clicking the button, you agree to the processing of <span className="text-[#26c6bc] underline">personal data</span></p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </section>
)

const ReferenceBreadcrumb = ({ current = 'Irritable bowel' }) => (
  <nav className="w-full bg-white px-4 py-2">
    <div className="max-w-screen-xl mx-auto flex items-center flex-wrap gap-1 text-[12px] font-semibold">
      {['Home', 'Medicines', 'Enzyme preparations'].map((item) => (
        <span key={item} className="flex items-center gap-1 text-[#26c6bc]">
          <span>{item}</span>
          <ChevronRight size={10} />
        </span>
      ))}
      <span className="text-gray-400">{current}</span>
    </div>
  </nav>
)

const ReferencePayAttention = () => (
  <section className="w-full bg-white py-8 px-4">
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">Pay Attention</h2>
      <div className="flex flex-col sm:flex-row items-stretch gap-2">
        {[referenceProducts[1], referenceProducts[3]].map((product, index) => (
          <div key={product.id} className="flex-1 min-w-0 border border-gray-100 rounded-2xl p-4 flex items-center gap-4">
            <img src={product.img} alt={product.name} className="w-24 h-24 object-contain bg-gray-50 rounded-xl" />
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#26c6bc]">In Stock</span>
              <p className="text-[13px] font-black text-gray-800 line-clamp-2">{index === 0 ? 'Bitsyklol tablets 25 mg, 15 pcs.' : 'Femibion Natalcare 1 tablets, 60 pcs.'}</p>
              <ReferenceStars count={4} />
            </div>
          </div>
        ))}
        <div className="w-full sm:w-24 rounded-2xl bg-gray-50 flex flex-col items-center justify-center p-4">
          <span className="text-xs text-gray-400">Together</span>
          <span className="text-lg font-black text-gray-900">82 216</span>
          <button className="mt-2 w-10 h-10 rounded-full bg-[#26c6bc] flex items-center justify-center"><ShoppingCart size={18} className="text-white" /></button>
        </div>
      </div>
    </div>
  </section>
)

const ReferenceTabsBar = () => (
  <div className="w-full bg-white border-y border-gray-100 px-4">
    <div className="max-w-screen-xl mx-auto flex items-center gap-4 py-2 overflow-x-auto">
      <div className="flex items-center gap-1.5 shrink-0 text-gray-400">
        <span className="w-3.5 h-3.5 rounded-full border-2 border-[#26c6bc]" />
        <span className="text-[12px] whitespace-nowrap">10 min read</span>
      </div>
      <div className="w-px h-5 bg-gray-200 shrink-0" />
      <span className="text-[13px] font-black text-gray-900 whitespace-nowrap">Category name</span>
      <div className="w-px h-5 bg-gray-200 shrink-0" />
      {['Manufacturer', 'About the product', 'Indications'].map((item, index) => (
        <button key={item} className={`px-3 py-1 rounded-full text-[12px] font-semibold whitespace-nowrap ${index === 0 ? 'bg-[#26c6bc] text-white' : 'text-gray-500'}`}>
          {item}
        </button>
      ))}
      <div className="flex-1 min-w-4" />
      <span className="text-[12px] text-gray-400 whitespace-nowrap">49 ratings</span>
      <ReferenceStars count={4} />
      <button className="shrink-0 px-4 py-1.5 rounded-full border border-[#26c6bc] text-[12px] font-semibold text-[#26c6bc]">Read later</button>
    </div>
  </div>
)

const blogCategories = [
  ['COVID-19', 14, Activity],
  ['Allergy', 24, Droplet],
  ['Medical cosmetics', 124, SprayCan],
  ['Intestine', 2, Pill],
  ['Respiratory system', 18, Package],
  ['Pain relief', 31, Heart],
  ['Children', 8, PackageSearch],
]

const ReferenceHealthBlogCategories = () => {
  const [active, setActive] = useState('COVID-19')

  return (
    <section className="w-full bg-white px-4 pt-6 pb-2">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-5">Health Blog</h1>
        <div className="relative flex items-center">
          <button className="hidden sm:flex w-7 h-7 rounded-full border border-gray-200 items-center justify-center shrink-0 mr-1 text-gray-400">
            <ChevronLeft size={14} />
          </button>
          <div className="flex items-center gap-0 overflow-x-auto flex-1 [scrollbar-width:none]">
            {blogCategories.map(([label, count, Icon]) => {
              const selected = active === label
              return (
                <button
                  key={label}
                  onClick={() => setActive(label)}
                  className={`flex items-center gap-2 px-4 py-3 shrink-0 border-r border-gray-100 transition-colors ${selected ? 'text-[#26c6bc]' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Icon size={20} className={selected ? 'text-[#26c6bc]' : 'text-gray-300'} />
                  <span className={`text-[13px] font-bold whitespace-nowrap ${selected ? 'text-gray-900' : 'text-gray-600'}`}>{label}</span>
                  <span className={`text-[11px] font-semibold ${selected ? 'text-[#26c6bc]' : 'text-gray-400'}`}>{count}</span>
                </button>
              )
            })}
          </div>
          <button className="hidden sm:flex w-7 h-7 rounded-full border border-gray-200 items-center justify-center shrink-0 ml-1 text-gray-400">
            <ChevronRight size={14} />
          </button>
        </div>
        <div className="border-b border-gray-100" />
      </div>
    </section>
  )
}

const ReferenceSearchBand = () => {
  const [focused, setFocused] = useState(false)

  return (
    <div className="w-full px-4 py-5 bg-[#f0f9ff]">
      <div className="max-w-screen-xl mx-auto">
        <div className={`flex items-center bg-white rounded-full px-5 py-3 border transition-all ${focused ? 'border-[#26c6bc] shadow-sm' : 'border-gray-200'}`}>
          <input
            type="text"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Start typing or enter a product name..."
            className="flex-1 bg-transparent outline-none text-[13px] text-gray-600 placeholder-gray-400 font-medium"
          />
          <Search size={20} className="ml-3 text-[#26c6bc] shrink-0" />
        </div>
      </div>
    </div>
  )
}

const ReferenceTags = () => {
  const [active, setActive] = useState('Manufacturer')
  const tags = ['Manufacturer', 'About the product', 'Indications', 'Dosage & course of treatment', 'Description', 'Functional benefits', 'Storage conditions', 'Shelf life', 'Active substance', 'Dosage form']

  return (
    <div className="w-full bg-white px-4 py-3">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-[10px] font-black tracking-widest uppercase text-gray-500 mb-2">Tags</p>
        <div className="flex flex-wrap gap-x-1 gap-y-2">
          {tags.map((tag) => (
            <button key={tag} onClick={() => setActive(tag)} className={`px-4 py-1.5 rounded-full text-[13px] font-semibold ${active === tag ? 'bg-[#26c6bc] text-white' : 'bg-white text-gray-600 hover:text-gray-900'}`}>
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const articleTitle = 'Active life without "hot flashes" - it is all in your hands'
const articleText = 'On the other hand, from the very beginning of everyday work on shaping positions, the organization ensures wide involvement of specialists in shaping the directions of progressive development. Everyday practice shows that the framework and the place of staff training allows executing important tasks in developing the model of development.'
const articleImages = [refArticleTwoImg, refArticleOneImg, refHeroImg, refArticleThreeImg]

const ReferenceArticleGrid = () => (
  <section className="w-full bg-white py-8 px-4">
    <div className="max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-8">
        <article className="lg:col-span-2 lg:row-span-2 group cursor-pointer">
          <div className="overflow-hidden rounded-sm mb-3">
            <img src={refHeroImg} alt={articleTitle} className="w-full h-[340px] object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <h2 className="text-[20px] font-black text-gray-900 leading-snug mb-2 group-hover:text-[#26c6bc]">{articleTitle}</h2>
          <p className="text-[13px] text-gray-500 leading-relaxed mb-2">{articleText}</p>
          <p className="text-[13px] text-gray-500 leading-relaxed">Thus, constant information and propaganda support of our activities allows us to evaluate the significance of substantial financial conditions.</p>
        </article>
        {articleImages.map((image, index) => (
          <article key={index} className="flex flex-col cursor-pointer group">
            <div className="overflow-hidden rounded-sm mb-2">
              <img src={image} alt={articleTitle} className="w-full h-[160px] object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <h3 className="text-[13px] font-bold text-gray-900 leading-snug mb-1 group-hover:text-[#26c6bc]">{articleTitle}</h3>
            <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3">And yet it is impossible to deceive nature, and almost every woman after forty starts thinking about the approaching menopause.</p>
          </article>
        ))}
      </div>
      {[0, 1, 2].map((row) => (
        <div key={row} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {articleImages.map((image, index) => (
            <article key={`${row}-${index}`} className="flex flex-col cursor-pointer group">
              <img src={image} alt={articleTitle} className="w-full h-[160px] object-cover rounded-sm mb-2" />
              <h3 className="text-[13px] font-bold text-gray-900 leading-snug mb-1">{articleTitle}</h3>
              <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3">{articleText}</p>
            </article>
          ))}
        </div>
      ))}
    </div>
  </section>
)

const ReferencePagination = () => (
  <div className="w-full bg-white py-3 px-4">
    <div className="max-w-screen-xl mx-auto flex items-center justify-start gap-1.5 flex-wrap">
      {[1, 2, 3, 4, '...', 32].map((item, index) => (
        <button key={index} className={`w-8 h-8 rounded-lg text-[12px] font-bold ${item === 1 ? 'bg-[#26c6bc] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}>{item}</button>
      ))}
    </div>
  </div>
)

export const ReferenceLensesPage = () => (
  <div className="bg-white">
    <ReferenceBreadcrumb />
    <ReferenceSearchBand />
    <ReferenceTags />
    <ReferenceArticleGrid />
    <ReferencePagination />
  </div>
)

const ReferenceProductDetailHero = () => (
  <section className="w-full bg-white px-4 py-6">
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-[24px] md:text-[30px] font-black text-gray-900 mb-4">Kreon 10000 enteric-coated capsules, 20 pcs.</h1>
      <div className="grid lg:grid-cols-[90px_1fr_310px_270px] gap-5">
        <div className="hidden lg:flex flex-col gap-2">
          {[refKreonImg, refSyrupImg, refTabletImg, refSerumImg].map((image, index) => (
            <button key={index} className={`border-2 rounded-xl p-1 ${index === 0 ? 'border-[#26c6bc]' : 'border-gray-100'}`}>
              <img src={image} alt="" className="w-full aspect-square object-contain" />
            </button>
          ))}
        </div>
        <div className="relative bg-gray-50 rounded-2xl min-h-[340px] flex items-center justify-center">
          <span className="absolute top-4 left-4 bg-[#26c6bc] text-white text-[10px] font-bold px-3 py-1 rounded-full">Deal of the Day</span>
          <img src={refKreonImg} alt="Kreon 10000" className="max-h-[310px] object-contain" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-2"><ReferenceStars count={4} /><span className="text-[#26c6bc] text-xs font-bold">6 reviews</span><span className="ml-auto text-[#26c6bc] text-xs font-bold">In stock</span></div>
          <p className="text-xs text-gray-400">Item code: 153249</p>
          <div className="border border-gray-100 rounded-2xl p-4">
            <h3 className="text-sm font-black text-gray-900 mb-2">Characteristics</h3>
            {['Brand: Lirina', 'Qty per pack: 10 pcs', 'Producer: Lirina', 'Shelf life: Long shelf life'].map((item) => <p key={item} className="text-xs text-gray-500 leading-6">- {item}</p>)}
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-[#eefbf9] rounded-xl p-3"><b className="text-[#26c6bc]">In Moscow</b><p className="text-gray-500">Delivery today, free from 500 rub.</p></div>
            <div className="bg-[#eefbf9] rounded-xl p-3"><b className="text-[#26c6bc]">For MKAD</b><p className="text-gray-500">Delivery today, free from 500 rub.</p></div>
          </div>
        </div>
        <div className="border border-gray-100 rounded-2xl p-5 h-fit">
          <span className="text-xs text-gray-400">Current price</span>
          <p className="text-sm text-red-400 line-through mt-2">49 999 PY6.</p>
          <p className="text-3xl font-black text-gray-900 mb-4">41 108 PY6.</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button className="w-9 h-9 text-gray-400">-</button><span className="w-9 h-9 flex items-center justify-center border-x border-gray-200 text-sm font-bold">1</span><button className="w-9 h-9 text-[#26c6bc]">+</button>
            </div>
            <button className="flex-1 bg-[#26c6bc] text-white rounded-xl py-3 text-sm font-bold">Add to cart</button>
          </div>
          <button className="w-full border border-gray-200 rounded-xl py-3 text-sm font-bold text-gray-700">Buy in 1 click</button>
        </div>
      </div>
    </div>
  </section>
)

const ReferenceHygieneDetails = () => (
  <>
    <section className="w-full bg-white px-4 py-8">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-[1fr_360px] gap-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Instructions for Use</h3>
          <div className="flex flex-wrap gap-2 mb-5 text-xs">
            {['Manufacturer', 'About the product', 'Indications', 'Dosage & course', 'Description', 'Functional benefits', 'Storage conditions', 'Shelf life', 'Active substance', 'Dosage form'].map((topic, index) => (
              <button key={topic} className={`px-3 py-1.5 rounded-full transition ${index === 0 ? 'bg-[#26c6bc] text-white font-semibold' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                {topic}
              </button>
            ))}
          </div>
          <h4 className="font-bold text-sm text-gray-900 mb-2">Manufacturer</h4>
           <h5 className="mt-3 text-[#26c6bc] text-xs font-bold ">About USA</h5>
          <h4 className="font-bold text-sm text-gray-900 mb-2">About the Product</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
           It should be noted, however, that the further development of various forms of activity plays an important role in shaping further directions of development. The task of the organization, especially the consultation with a wide asset, requires us to analyze the further directions of development.<br></br>
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            The task of the organization, especially the new model of organizational activity, to a large extent determines the creation of a staff training system that meets pressing needs. Everyday practice shows that constant information and propaganda support of our activities allows us to evaluate the significance of the directions of progressive development.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            On the other hand, the further development of various forms of activity requires an analysis of the training system of personnel, meets pressing needs. The task of the organization, especially the beginning of everyday work, entails the process of implementation and modernization of positions held by participants in relation to the set tasks.
          </p>
          <button className="inline-flex items-center gap-1 text-[#26c6bc] text-xs font-bold mt-3 hover:underline">
            <ChevronRight size={14} /> Show full text
          </button>
          <h4 className="font-bold text-sm text-gray-900 mb-2">Indications</h4>
          <p className="text-sm text-gray-600 leading-relaxed">It should be noted, however, that the further development of various forms of activity plays an important role in shaping further directions of development. The task of the organization, especially the consultation with a wide asset, requires us to analyze the further directions of development.
          </p>
          <button className="inline-flex items-center gap-1 text-[#26c6bc] text-xs font-bold mt-3 hover:underline">
            <ChevronRight size={14} /> Show full text
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Reviews</h3>
          <form className="border border-gray-100 rounded-2xl p-4 mb-5">
            <div className="font-bold text-sm text-gray-900 mb-2">Leave a Review</div>
            <div className="mb-3">
              <div className="text-xs text-gray-400 mb-1">Rating:</div>
              <ReferenceStars count={4} size={20} />
            </div>
            <input type="text" placeholder="Your name" className="w-full mb-2 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none" />
            <input type="email" placeholder="Your e-mail" className="w-full mb-2 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none" />
            <textarea placeholder="Write a detailed review, it's important..." rows={3} className="w-full mb-3 px-3 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none resize-none" />
            <button type="button" className="bg-[#26c6bc] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#1aada4]">Submit</button>
            <p className="text-[10px] text-gray-400 mt-2">By clicking the button, you agree to the processing of <span className="text-[#26c6bc] underline">personal data</span></p>
          </form>
          {['Elena', 'Vladimir'].map((name, index) => (
            <div key={name} className="border-b border-gray-100 pb-4 mb-4 last:border-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full bg-[#26c6bc] text-white flex items-center justify-center text-xs font-bold shrink-0">{name[0]}</div>
                <div className="text-sm font-medium">{name}</div>
                <ReferenceStars count={4} size={12} />
                <span className="ml-auto text-[10px] text-gray-400">January 17, 2026</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-2">
                I ordered this product and it was delivered quickly by the courier. It arrived on time and works exactly as described.
              </p>
              <div className="flex items-center gap-4 text-[11px] text-gray-400">
                <button className="flex items-center gap-1 hover:text-[#26c6bc]"><ThumbsUp size={12} />{index === 0 ? 2 : 0}</button>
                <button className="flex items-center gap-1 hover:text-[#26c6bc]"><ThumbsDown size={12} />{index === 0 ? 0 : 4}</button>
                <button className="ml-auto text-[#26c6bc] font-medium hover:underline">Reply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="w-full bg-white px-4 py-8">
      <div className="max-w-screen-xl mx-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery &amp; Pickup in Moscow and Region</h3>
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {['Order delivery within MKAD', 'Order delivery outside MKAD'].map((title) => (
            <div key={title}>
              <div className="text-xs text-gray-400 mb-2">{title}</div>
              <div className="flex justify-between text-sm border-b border-gray-100 py-2">
                <span className="text-gray-500">Order delivery</span>
                <span className="text-gray-900 font-medium">up to 500 rub.</span>
                <span className="text-gray-900 font-medium">from 500 rub.</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-500">{title.includes('outside') ? 'outside MKAD' : 'within MKAD'}</span>
                <span className="text-gray-900 font-medium">150 rub.</span>
                <span className="text-[#26c6bc] font-medium">Free</span>
              </div>
            </div>
          ))}
        </div>

        <h4 className="font-bold text-base text-gray-900 mb-1">Pickup in Moscow and Region</h4>
        <div className="text-xs text-gray-400 mb-3">Order delivery within MKAD</div>
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_140px_80px] bg-gray-50 text-xs text-gray-400 px-4 py-2.5">
            <span>Pharmacy list</span><span>Item dispatch</span><span className="text-right">Cost</span>
          </div>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="grid grid-cols-[1fr_140px_80px] items-center px-4 py-3 text-xs text-gray-500 border-t border-gray-50">
              <span>PHARMACY Moscow region, Podolsk city, Sverdlova st., building No. 13</span>
              <span>Within an hour</span>
              <span className="text-right text-[#26c6bc] font-medium">Free</span>
            </div>
          ))}
        </div>
        <button className="mt-3 text-[#26c6bc] text-xs font-bold hover:underline">All delivery terms</button>
      </div>
    </section>

    <ReferenceAboutCompanySeo />
  </>
)

export const ReferenceHygienePage = () => (
  <div className="bg-white">
    <ReferenceBreadcrumb />
    <ReferenceProductDetailHero />
    <ReferenceDeals title="Analog" count={5} />
    <ReferencePayAttention />
   
    <ReferenceDeals title="Analogues" count={5} />
    <ReferenceHygieneDetails />
    <ReferenceFeatureStrip />
  </div>
)

const ReferenceArticleContents = () => {
  const [open, setOpen] = useState(true)
  const contents = ['Attend preparatory courses;', 'Receive and filter information;', 'Read books, take courses;', 'Engage in physical activity;', 'About the last point and speech;', 'Receive and filter information;']

  return (
    <section className="w-full bg-white px-4 py-6">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 items-start">
        <aside className="border border-gray-200 rounded-xl overflow-hidden self-start">
          <button onClick={() => setOpen((value) => !value)} className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50">
            <span className="text-[13px] font-black text-gray-900">Contents</span>
            {open ? <ChevronDown size={14} className="rotate-180" /> : <ChevronDown size={14} />}
          </button>
          {open && (
            <ul className="px-4 pb-4 pt-1 flex flex-col gap-2.5 border-t border-gray-100">
              {contents.map((item) => (
                <li key={item} className="flex items-start gap-2.5 group">
                  <span className="mt-1 w-2.5 h-2.5 rounded-full border border-[#26c6bc] shrink-0" />
                  <span className="text-[12px] text-gray-600 leading-snug group-hover:text-[#26c6bc]">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>
        <article className="flex flex-col gap-4">
          <p className="text-[13px] text-gray-600 leading-relaxed">On the other hand, from the very beginning of everyday work on shaping positions, the organization ensures wide involvement of specialists in shaping the directions of progressive development. Everyday practice shows that the framework and the place of staff training allows executing important tasks in developing the model of development.</p>
          <p className="text-[13px] text-gray-600 leading-relaxed"> Everyday practice shows that consultation with a wide active audience requires us to analyze positions, participants in relation to the set tasks. Ideal representations of the highest order, as well as the growing complexity of the structure of the organization, represent an interesting experiment of checking substantial financial and administrative conditions.</p>
          <h2 className="text-[20px] font-black text-gray-900 mt-4 mb-1">Heading h2</h2>
          <p className="text-[13px] text-gray-600 leading-relaxed">{articleText}</p>
          <p className="text-[13px] text-gray-600 leading-relaxed"> Everyday practice shows that consultation with a wide active audience requires us to analyze positions, participants in relation to the set tasks. Ideal representations of the highest order, as well as the growing complexity of the structure of the organization, represent an interesting experiment of checking substantial financial and administrative conditions.</p>
          
          <blockquote className="relative pl-5 py-1 my-2">
            <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#26c6bc] rounded-full" />
            <p className="text-[13px] text-gray-600 leading-relaxed italic mb-0">Equally, the new model of organizational activity entails the process of introducing and modernizing the development model. Equally, the framework and place of staff training requires analysis of the staff training system, which corresponds to pressing needs.</p>
          </blockquote>
          <p className="text-[13px] text-gray-600 leading-relaxed">Everyday practice shows that the further development of various forms of activity plays an important role in shaping substantial financial and administrative conditions. The significance of these problems is so obvious that the growing complexity of the structure of the organization allows executing important tasks in developing substantial financial and administrative conditions. It should not be forgotten, however, that the further development of various forms of activity contributes to the preparation and realization of new proposals. The diverse and rich experience of constant quantitative growth and the sphere of our activity plays an important role in shaping the directions of progressive development.</p>
        </article>
      </div>
    </section>
  )
}

const ReferenceQuoteSection = () => (
  <section className="w-full bg-white px-4 py-6">
    <div className="max-w-screen-xl mx-auto">
      <h2 className="text-[22px] font-black text-gray-900 mb-4">Heading h2</h2>
      <p className="text-[13px] text-gray-600 leading-relaxed mb-4">On the other hand, from the very beginning of everyday work on shaping positions, the organization ensures wide involvement of specialists in shaping the directions of progressive development. Everyday practice shows that the framework and the place of staff training allows executing important tasks in developing the model of development. Everyday practice shows that consultation with a wide active audience requires us to analyze positions, participants in relation to the set tasks. Ideal representations of the highest order, as well as the growing complexity of the structure of the organization, present an interesting experiment of checking substantial financial and administrative conditions. Equally, the beginning of everyday work on shaping positions allows evaluating the significance of new proposals.</p>
      <div className="relative bg-gray-50 rounded-xl px-6 py-5 mb-4 flex gap-4 items-start">
        <span className="text-5xl leading-none font-black text-[#26c6bc] opacity-80">“</span>
        <p className="text-[13px] text-gray-600 leading-relaxed italic mb-0">Equally, the new model of organizational activity entails the process of introducing and modernizing the development model. Equally, the framework and the place of staff training requires analysis of the staff training system, which corresponds to pressing needs.</p>
      </div>
      <p className="text-[13px] text-gray-600 leading-relaxed">Everyday practice shows that the further development of various forms of activity plays an important role in shaping substantial financial and administrative conditions. The significance of these problems is so obvious that the growing complexity of the structure of the organization allows executing important tasks in developing substantial financial and administrative conditions. It should not be forgotten, however, that the further development of various forms of activity contributes to the preparation and realization of new proposals. The diverse and rich experience of constant quantitative growth and the sphere of our activity plays an important role in shaping the directions of progressive development.</p>
    </div>
  </section>
)

const ReferenceOrderedSection = () => (
  <section className="w-full bg-white px-4 py-6">
    <div className="max-w-screen-xl mx-auto">
      <h3 className="text-[19px] font-black text-gray-900 mb-3">Heading h3</h3>
      <p className="text-[13px] text-gray-600 leading-relaxed mb-5">On the other hand, from the very beginning of everyday work on shaping positions, the organization ensures wide involvement of specialists in shaping the directions of progressive development. Everyday practice shows that the framework and the place of staff training allows executing important tasks in developing the model of development. Everyday practice shows that consultation with a wide active audience requires us to analyze positions, participants in relation to the set tasks. Ideal representations of the highest order, as well as the growing complexity of the structure of the organization, present an interesting experiment of checking substantial financial and administrative conditions. Equally, the beginning of everyday work on shaping positions allows evaluating the significance of new proposals.</p>
      <ol className="flex flex-col gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="flex gap-4">
            <span className="shrink-0 w-6 h-6 rounded-full bg-[#26c6bc] text-white text-[11px] font-black flex items-center justify-center mt-0.5">{index + 1}</span>
            <p className="text-[13px] text-gray-600 leading-relaxed mb-0">{articleText}</p>
          </li>
        ))}
      </ol>
      <h4 className="text-[17px] font-black text-gray-900 mb-3">Heading h4</h4>
       <p className="text-[13px] text-gray-600 leading-relaxed mb-5">On the other hand, from the very beginning of everyday work on shaping positions, the organization ensures wide involvement of specialists in shaping the directions of progressive development. Everyday practice shows that the framework and the place of staff training allows executing important tasks in developing the model of development.</p>
      <div className="flex items-start gap-4 bg-gray-50 rounded-xl px-5 py-4 mb-4">
        <Info size={30} className="text-[#26c6bc] shrink-0 mt-0.5" />
        <p className="text-[13px] text-gray-600 leading-relaxed mb-0">Everyday practice shows that consultation with a wide active audience requires us to analyze positions, participants in relation to the set tasks.</p>
      </div>
      <p className="text-[13px] text-gray-600 leading-relaxed mb-5">Ideal representations of the highest order, as well as the growing complexity of the structure of the organization, present an interesting experiment of checking substantial financial and administrative conditions. Equally, the beginning of everyday work on shaping positions allows evaluating the significance of new proposals.</p>
    </div>
  </section>
)

const ReferenceDataTable = () => {
  const [openRows, setOpenRows] = useState([0])
  const rows = [
    [10, 'Audrey Mckinney', '1473 Ranchview Dr undefined San Jose', '(209) 555-0104'],
    [1, 'Savannah Howard', '8445 Railroad St undefined Tampa', '(201) 555-0124'],
    [2, 'Morris Cooper', '8584 W Sherman Dr undefined Desoto', '(505) 555-0125'],
    [2, 'Victoria Lane', '1921 Ranchview Dr undefined San Francisco', '(704) 555-0127'],
    [9, 'Stella Warren', '6380 Fincher Rd undefined Tucson', '(219) 555-0114'],
    [9, 'Max Alexander', '4324 Mcclellan Rd undefined Denton', '(319) 555-0115'],
    [8, 'Guy Richards', '3891 Ranchview Dr undefined Richardson', '(207) 555-0119'],
    [0, 'Kyle Murphy', '8223 Adams St undefined Glendale', '(603) 555-0123'],
    [3, 'Morris Bell', '3763 W Dallas St undefined Simi Valley', '(843) 555-0130'],
    [1, 'Jacob Black', '6405 Thornridge Cir undefined Jacksonville', '(270) 555-0117'],
    [10, 'Arlene Steward', '5781 Spring St undefined Salinas', '(414) 555-0132'],
    [5, 'Nathan Flores', '9553 Railroad St undefined Lewisville', '(684) 555-0102'],
    [8, 'Marjorie Hawkins', '2118 Thornridge Cir undefined Syracuse', '(907) 555-0101'],
    [3, 'Ralph Jones', '7736 Central St undefined South Bend', '(303) 555-0105'],
    [9, 'Marvin Mccoy', '9915 Saddle Dr undefined San Francisco', '(629) 555-0129'],
    [10, 'Calvin Henry', '6638 Jackson St undefined Stockton', '(307) 555-0133'],
    [10, 'Julie Webb', '6386 Spring St undefined Anchorage', '(262) 555-0131'],
    [3, 'Dianne Cooper', '6513 Dogwood Ave undefined Syracuse', '(405) 555-0128'],
    [7, 'Mitchell Russell', '2496 Miller Ave undefined Lansing', '(480) 555-0103'],
  ]

  const toggleRow = (index) => {
    setOpenRows((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
  }

  return (
    <section className="w-full bg-white px-4 py-6">
      <div className="max-w-screen-xl mx-auto overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-[#26c6bc]">
              <th className="w-10 py-3.5 px-3" />
              {['Count', 'Name', 'Address', 'Phone Number'].map((head) => <th key={head} className="text-left py-3.5 px-4 text-[12px] font-semibold text-white">{head}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map(([count, name, address, phone], index) => {
              const isOpen = openRows.includes(index)
              return [
                <tr key={`${name}-row`} onClick={() => toggleRow(index)} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                  <td className="py-4 px-3 text-gray-400">
                    <ChevronDown size={12} className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
                  </td>
                  <td className="py-4 px-4 text-[13px] text-gray-700">{count}</td>
                  <td className="py-4 px-4 text-[13px] text-gray-700">{name}</td>
                  <td className="py-4 px-4 text-[13px] text-gray-700">{address}</td>
                  <td className="py-4 px-4 text-[13px] text-gray-700">{phone}</td>
                </tr>,
                isOpen && (
                  <tr key={`${name}-details`} className="border-b border-gray-100 bg-gray-50">
                    <td />
                    <td colSpan={4} className="px-4 py-3 text-[12px] text-gray-500">
                      <span className="font-bold text-gray-700">Details:</span> {name} - {address} - {phone} - Count: {count}
                    </td>
                  </tr>
                ),
              ]
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const ReferenceH5Section = () => (
  <section className="w-full bg-white px-4 py-8">
    <div className="max-w-screen-xl mx-auto">
      <h5 className="text-[16px] font-black text-gray-900 mb-3">Heading h5</h5>
      <p className="text-[13px] text-gray-600 leading-relaxed mb-5">On the other hand, from the very beginning of everyday work on shaping positions, the organization ensures wide involvement of specialists in shaping the directions of progressive development. Everyday practice shows that the framework and the place of staff training allows executing important tasks in developing the model of development. Everyday practice shows that consultation with a wide active audience requires us to analyze positions, participants in relation to the set tasks. Ideal representations of the highest order, as well as the growing complexity of the structure of the organization, present an interesting experiment of checking substantial financial and administrative conditions. Equally, the beginning of everyday work on shaping positions allows evaluating the significance of new proposals.</p>
      <div className="flex flex-col sm:flex-row gap-5 mb-6 rounded-xl overflow-hidden border border-gray-100">
        <div className="shrink-0 sm:w-[280px] w-full">
          <img src={refBlackLadyImg} alt="Mother and child care" className="w-full h-full object-cover min-h-[140px] max-h-[200px]" />
        </div>
        <div className="flex flex-col justify-center px-4 py-4 sm:py-0 sm:pr-5">
          <p className="text-[15px] sm:text-[16px] font-black text-gray-900 leading-snug mb-2">How a woman prepares for the appearance of a child?</p>
          <a href="#" className="text-[#26c6bc] text-[12px] font-semibold hover:underline">Read more</a>
        </div>
      </div>
      <ul className="list-disc pl-5 text-[13px] text-gray-600 leading-relaxed mb-0">
  <li>On the other hand, from the very beginning of everyday work on shaping positions, the organization ensures wide involvement of specialists in shaping the directions of progressive development. Everyday practice shows that the framework and the place of staff training allows executing important tasks in developing the model of development. The framework and the place of staff training allows executing important tasks in developing the model.</li>
</ul>
<ul className="list-disc pl-5 text-[13px] text-gray-600 leading-relaxed mb-0">
  <li>Everyday practice shows that consultation with a wide active audience requires us to analyze positions, participants in relation to the set tasks. Ideal representations of the highest order, as well as the growing complexity of the structure of the organization, present an interesting experiment of checking substantial financial and administrative conditions.</li>
</ul>

            <ul className="list-disc pl-5 text-[13px] text-gray-600 leading-relaxed mb-0">
  <li>Equally, the beginning of everyday work on shaping positions allows evaluating the significance of new proposals. Everyday practice shows that the further development of various forms of activity plays an important role in shaping substantial financial and administrative conditions. The significance of these problems is so obvious.</li>
</ul>
            <ul className="list-disc pl-5 text-[13px] text-gray-600 leading-relaxed mb-0">
  <li>It should not be forgotten, however, that the further development of various forms of activity contributes to the preparation and realization of new proposals. The diverse and rich experience of constant quantitative growth and the sphere of our activity plays an important role in shaping the directions of progressive development. Equally, the framework and the place of staff training requires analysis of the staff training system, which corresponds to pressing needs.</li>
</ul>
  
    </div>
  </section>
)

const ReferenceH6AndComments = () => (
  <section className="w-full bg-white px-4 py-6">
    <div className="max-w-screen-xl mx-auto">
      <h6 className="text-[14px] font-black text-gray-900 mb-3">Heading h6</h6>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mb-8">
        <div className="flex flex-col gap-3">
          <p className="text-[13px] text-gray-600 leading-relaxed">{articleText}</p>
          <p className="text-[13px] text-gray-600 leading-relaxed">It should not be forgotten that the further development of various forms of activity contributes to the preparation of new proposals.</p>
           <p className="text-[13px] text-gray-600 leading-relaxed">The diverse and rich experience of constant quantitative growth and the sphere of our activity plays an important role in shaping the directions of progressive development.</p>
        </div>
        <div className="relative rounded-xl overflow-hidden group">
          <img src={refCareImg} alt="Mother and child video" className="w-full h-auto object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-md">
              <span className="ml-1 text-[#26c6bc] text-xl">▶</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-2xl p-5 mb-8 bg-white">
        <h3 className="text-[15px] font-black text-gray-900 mb-4">Leave a Comment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <input placeholder="Your name" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-[#26c6bc]" />
          <input placeholder="Your e-mail" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-[#26c6bc]" />
        </div>
        <textarea placeholder="Describe your problem..." rows={3} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] outline-none focus:border-[#26c6bc] resize-none mb-3" />
        <button className="rounded-full px-8 py-2.5 font-bold text-white text-[13px] bg-[#26c6bc] hover:bg-[#1aada4]">Submit</button>
      </div>
      {['Elena', 'Vladimir', 'Vladimir'].map((name, index) => (
        <div key={`${name}-${index}`} className={`border-b border-gray-100 py-5 ${index === 1 ? 'ml-8' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[#26c6bc] font-black">{name[0]}</div>
            <span className="text-[13px] font-black text-gray-900">{name}</span>
            <ReferenceStars count={4} size={13} />
            <span className="ml-auto text-[12px] text-gray-400">January 17, 2020</span>
          </div>
          <p className="text-[12.5px] text-gray-600 leading-relaxed">{articleText}</p>
        </div>
      ))}
    </div>
  </section>
)

const ReferenceArticleShareAndReadAlso = () => {
  const readAlso = [
    ['How a woman prepares for the appearance of a child?', refBabyImg],
    ['Daily care checklist for mother and baby', refCareImg],
    ['What to keep in a young family medicine kit', refArticleThreeImg],
  ]

  return (
    <section className="w-full bg-white px-4 py-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="border-y border-gray-100 py-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-[18px] font-black text-gray-900 mb-1">Liked the article? Share with friends!</h3>
            <p className="text-[12px] text-gray-500">Send this material to someone who may find it useful.</p>
          </div>
          <div className="flex items-center gap-2">
            {[
              ['Share', Share2],
              ['E-mail', Mail],
              ['Message', MessageCircle],
            ].map(([label, Icon]) => (
              <button key={label} className="w-10 h-10 rounded-full border border-gray-200 hover:border-[#26c6bc] hover:text-[#26c6bc] flex items-center justify-center text-gray-500" aria-label={label}>
                <Icon size={17} />
              </button>
            ))}
          </div>
        </div>

        <h3 className="text-[20px] font-black text-gray-900 mb-5">Read also</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {readAlso.map(([title, image]) => (
            <article key={title} className="group cursor-pointer">
              <div className="rounded-xl overflow-hidden bg-gray-50 mb-3">
                <img src={image} alt={title} className="w-full h-[170px] object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="flex items-start gap-2">
                <BookOpen size={16} className="text-[#26c6bc] shrink-0 mt-0.5" />
                <h4 className="text-[14px] font-black text-gray-900 leading-snug group-hover:text-[#26c6bc]">{title}</h4>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export const ReferenceMotherChildPage = () => (
  <div className="bg-white">
    <ReferenceBreadcrumb current="Mother & Child" />
    <div className="w-full px-4 py-4">
      <div className="max-w-screen-xl mx-auto overflow-hidden rounded-xl max-h-[420px]">
        <img src={refLadyModelImg} alt="Mother and child" className="w-full h-full max-h-[420px] object-cover object-center" />
      </div>
    </div>
    <ReferenceTabsBar />
    <ReferenceArticleContents />
    <ReferenceQuoteSection />
    <ReferencePayAttention />
    <ReferenceOrderedSection />
    <ReferenceDataTable />
    <ReferenceH5Section />
    <ReferenceH6AndComments />
    <ReferenceArticleShareAndReadAlso />
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
