import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import {
  medicineCategories, moreMedicineCategories, diseases, subNavLinks,
  partnerLogos, howItWorks, aboutParagraphs, alphabetCategoryGroups, reviews,
} from '../data/categories'
import {
  ChevronRight, ChevronDown, ArrowDownWideNarrow, ArrowUpWideNarrow, Sparkles, Flame, PackageSearch,
  Package, Pill, FlaskConical, Users, Stethoscope, PawPrint, Baby, Eye, Activity, Info,
} from 'lucide-react'
import reviewOne from '../assets/images/Categories/review1.jpg'
import reviewTwo from '../assets/images/Categories/review2.jpg'
import reviewThree from '../assets/images/Categories/ladyAvacado.jpg'

const CATEGORY_ICONS = {
  medicines: Pill,
  vitamins: FlaskConical,
  cosmetics: Sparkles,
  hygiene: Users,
  medical: Stethoscope,
  pets: PawPrint,
  baby: Baby,
  lenses: Eye,
  equipment: Activity,
}

const sortOptions = [
  { key: 'price-asc', label: 'Lowest price first', icon: ArrowDownWideNarrow },
  { key: 'price-desc', label: 'Highest price first', icon: ArrowUpWideNarrow },
  { key: 'new', label: 'New arrivals', icon: Sparkles },
  { key: 'hits', label: 'Bestsellers', icon: Flame },
]

const Catalog = () => {
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('default')
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllDiseases, setShowAllDiseases] = useState(false)
  const [activeCategory, setActiveCategory] = useState('anesthesia')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const reviewImages = [reviewOne, reviewTwo, reviewThree]
  const searchQuery = (searchParams.get('search') || '').trim().toLowerCase()
  const topCategory = searchParams.get('category') || ''

  const filtered = useMemo(() => {
    let list = [...products]
    if (topCategory) {
      list = list.filter(p => p.category === topCategory)
    }
    if (searchQuery) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(searchQuery) ||
        (p.brand && p.brand.toLowerCase().includes(searchQuery))
      )
    }
    list = list.filter(p => p.price <= maxPrice)
    if (inStockOnly) list = list.filter(p => p.inStock)
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'hits') list = list.filter(p => p.isHit).concat(list.filter(p => !p.isHit))
    return list
  }, [sortBy, maxPrice, inStockOnly, searchQuery, topCategory])

  const pageTitle = searchQuery
    ? `Search results for "${searchParams.get('search')}"`
    : topCategory === 'vitamins'
      ? 'Vitamins and Supplements'
      : topCategory === 'equipment'
        ? 'Medical Equipment'
        : 'Medicines'

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <Link to="/" className="hover:text-primary-500">Home</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700">{searchQuery ? 'Search results' : pageTitle}</span>
        </div>

        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          {pageTitle}
        </h1>

        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">CATEGORIES</h3>
              <ul className="space-y-2 text-sm">
                {medicineCategories.map(cat => (
                  <li key={cat.slug}>
                    <button
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`w-full text-left px-2 py-1 rounded-lg transition ${
                        activeCategory === cat.slug ? 'bg-primary-500 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {cat.name}
                    </button>
                    {cat.subcategories && activeCategory === cat.slug && (
                      <ul className="mt-1 ml-3 space-y-1 border-l-2 border-primary-100 pl-3">
                        {cat.subcategories.map(sub => (
                          <li key={sub} className="text-xs text-gray-500 hover:text-primary-500 cursor-pointer py-0.5">{sub}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
                {(showAllCategories ? moreMedicineCategories : []).map(name => (
                  <li key={name}>
                    <button className="w-full text-left px-2 py-1 rounded-lg text-gray-700 hover:bg-gray-50">{name}</button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowAllCategories(v => !v)}
                className="text-primary-500 text-xs font-bold mt-3 flex items-center gap-1"
              >
                {showAllCategories ? 'Hide' : 'All categories'}
                <ChevronDown size={12} className={showAllCategories ? 'rotate-180 transition' : 'transition'} />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">CONDITIONS</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {(showAllDiseases ? diseases : diseases.slice(0, 8)).map(d => (
                  <li key={d} className="hover:text-primary-500 cursor-pointer">{d}</li>
                ))}
              </ul>
              <button
                onClick={() => setShowAllDiseases(v => !v)}
                className="text-primary-500 text-xs font-bold mt-3 flex items-center gap-1"
              >
                {showAllDiseases ? 'Hide' : `Show ${diseases.length - 8} more`}
                <ChevronDown size={12} className={showAllDiseases ? 'rotate-180 transition' : 'transition'} />
              </button>
            </div>

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

          {/* Main column */}
          <div className="flex-1 min-w-0">
            {/* mobile category chips */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-3 -mx-1 px-1">
              {subNavLinks.map(link => (
                <button key={link} className="shrink-0 px-3 py-1.5 rounded-full bg-white shadow-sm text-xs text-gray-700 whitespace-nowrap">{link}</button>
              ))}
            </div>

            {/* Sort bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-3">
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

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 shadow-sm flex flex-col items-center text-center gap-3">
                <PackageSearch size={40} className="text-gray-300" />
                <p className="text-gray-500 text-sm">No products found.</p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1.5 mt-8">
              {[1, 2, 3, 4, '...', 10].map((n, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-sm font-medium ${n === 1 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-white'}`}>{n}</button>
              ))}
            </div>

            {/* Promotion of the month */}
            <section className="mt-10">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Promotion of the Month</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(0, 4).map(p => <ProductCard key={`promo-${p.id}`} product={p} />)}
              </div>
            </section>

            {/* Recently viewed */}
            <section className="mt-10">
              <h2 className="text-lg font-bold text-gray-900 mb-3">You viewed</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(2, 6).map(p => <ProductCard key={`viewed-${p.id}`} product={p} />)}
              </div>
            </section>

            {/* SEO text */}
            <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm text-xs text-gray-500 leading-relaxed grid md:grid-cols-2 gap-6">
              <p className="text-[15px] leading-8 text-slate-500">
                Buy medicines in Moscow and the surrounding region with home delivery through our online pharmacy. 
                We offer a wide range of medicines from trusted manufacturers, affordable prices, and fast delivery throughout Russia.
              </p>
              <p>
                We guarantee the authenticity of all our products—every medicine is certified for quality and compliance. 
                Place your order online or collect it from the nearest pharmacy in our partner network.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">How do we work?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {howItWorks.map(s => (
            <div key={s.step} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{s.step}</span>
                <h3 className="font-bold text-sm">{s.title}</h3>
              </div>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AVERAGE RATING + REVIEWS */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 grid md:grid-cols-[220px_1fr] gap-6">
          <div>
            <h3 className="font-bold text-sm mb-1">Average Pharmacy Rating</h3>
            <div className="text-4xl font-bold my-2">4.8</div>
            <div className="flex text-gold-500 mb-1">★★★★★</div>
            <p className="text-xs text-gray-500 mb-4">Overall rating based on 4349 customer reviews</p>
            <Link to="/feedback" className="inline-block bg-primary-500 text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-primary-600">
              LEAVE A REVIEW
            </Link>
          </div>
          <div>
            <div className="space-y-3">
              {reviews.slice(0, 3).map((r, index) => (
                <Link key={r.id} to="/feedback" className="border-b pb-3 last:border-b-0 flex gap-3 rounded-lg p-2 transition hover:bg-gray-50">
                  <img src={reviewImages[index]} alt={r.name} className="h-12 w-12 rounded-full object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="font-bold text-sm">{r.name}</div>
                      <div className="text-xs text-gray-400">{r.date}</div>
                      <div className="flex text-gold-500 ml-auto text-xs">{'★'.repeat(r.rating)}</div>
                    </div>
                    <p className="text-xs text-gray-600">{r.text}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/feedback" className="inline-block text-primary-500 text-xs font-bold mt-3 hover:underline">
              All 4349 reviews
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Our Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {partnerLogos.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-3 shadow-sm h-16 flex items-center justify-center border border-gray-100">
              <span className="text-sm font-bold text-gray-700 tracking-wide text-center leading-tight">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT THE COMPANY */}
      <section className="container mx-auto px-4 py-8">

<h2 className="text-4xl font-bold text-slate-900 mb-10">
SEO text
</h2>

<div className="grid lg:grid-cols-3 gap-10">

<div className="space-y-8">

<p>{aboutParagraphs[0]}</p>

<p>{aboutParagraphs[1]}</p>

<p>{aboutParagraphs[2]}</p>

</div>

<div>

<ul className="space-y-8">

<li className="flex gap-3">

<div className="w-2 h-2 rounded-full bg-cyan-400 mt-3 shrink-0"></div>

<p>{aboutParagraphs[0]}</p>

</li>

<li className="flex gap-3">

<div className="w-2 h-2 rounded-full bg-cyan-400 mt-3 shrink-0"></div>

<p>{aboutParagraphs[1]}</p>

</li>

<li className="flex gap-3">

<div className="w-2 h-2 rounded-full bg-cyan-400 mt-3 shrink-0"></div>

<p>{aboutParagraphs[2]}</p>

</li>

</ul>

</div>

<div className="space-y-8">

<p>{aboutParagraphs[0]}</p>

<p>{aboutParagraphs[1]}</p>

<p>{aboutParagraphs[2]}</p>

</div>

</div>

<p className="mt-10 text-gray-500 leading-8">

{aboutParagraphs.join(" ")}

</p>

<div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-7 flex gap-5">

<div className="w-11 h-11 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-400 text-xl shrink-0">

!

</div>

<p className="text-gray-600 leading-8">

{aboutParagraphs.join(" ")}

</p>

</div>

<div className={`${aboutExpanded ? "" : "max-h-24 overflow-hidden"} mt-8 transition-all`}>

<p className="text-gray-500 leading-8">

{aboutParagraphs.join(" ")}

</p>

<p className="mt-6 text-gray-500 leading-8">

{aboutParagraphs.join(" ")}

</p>

</div>

<button

onClick={() => setAboutExpanded(!aboutExpanded)}

className="mt-6 font-bold uppercase tracking-wide text-cyan-500 flex items-center gap-2"

>

❯❯ {aboutExpanded ? "Collapse Text" : "Show Full Text"}

</button>

</section>

      {/* CATEGORY GRID */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {alphabetCategoryGroups.map(group => {
            const Icon = CATEGORY_ICONS[group.slug] || Package
            return (
              <div key={group.slug} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={18} className="text-primary-500" />
                  <h4 className="font-bold text-sm text-gray-900">{group.title}</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-500">
                  {group.items.slice(0, 5).map(item => (
                    <li key={item}>
                      <Link to={`/catalog?category=${group.slug}`} className="hover:text-primary-500">{item}</Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/catalog?category=${group.slug}`} className="inline-block text-primary-500 text-xs font-bold mt-3 hover:underline">
                  » All categories
                </Link>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Catalog