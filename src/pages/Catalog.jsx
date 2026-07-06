import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { medicineCategories, moreMedicineCategories, diseases, subNavLinks } from '../data/categories'
import { ChevronRight, ChevronDown, ArrowDownWideNarrow, ArrowUpWideNarrow, Sparkles, Flame } from 'lucide-react'

const sortOptions = [
  { key: 'price-asc', label: 'Сначала дешёвые', icon: ArrowDownWideNarrow },
  { key: 'price-desc', label: 'Сначала дорогие', icon: ArrowUpWideNarrow },
  { key: 'new', label: 'Новинки', icon: Sparkles },
  { key: 'hits', label: 'Хиты продаж', icon: Flame },
]

const Catalog = () => {
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('default')
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [showAllDiseases, setShowAllDiseases] = useState(false)
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'anesthesia')
  const [maxPrice, setMaxPrice] = useState(50000)
  const [inStockOnly, setInStockOnly] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]
    list = list.filter(p => p.price <= maxPrice)
    if (inStockOnly) list = list.filter(p => p.inStock)
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'hits') list = list.filter(p => p.isHit).concat(list.filter(p => !p.isHit))
    return list
  }, [sortBy, maxPrice, inStockOnly])

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-xs text-gray-500 mb-3 flex items-center gap-1">
          <Link to="/" className="hover:text-primary-500">Главная</Link>
          <ChevronRight size={12} />
          <span className="text-gray-700">Лекарственные средства</span>
        </div>

        <h1 className="text-2xl font-bold mb-4 text-gray-900">Лекарственные средства</h1>

        <div className="flex gap-4">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">КАТЕГОРИИ</h3>
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
                {showAllCategories ? 'Скрыть' : 'Все категории'}
                <ChevronDown size={12} className={showAllCategories ? 'rotate-180 transition' : 'transition'} />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">ЗАБОЛЕВАНИЯ</h3>
              <ul className="space-y-1.5 text-sm text-gray-700">
                {(showAllDiseases ? diseases : diseases.slice(0, 8)).map(d => (
                  <li key={d} className="hover:text-primary-500 cursor-pointer">{d}</li>
                ))}
              </ul>
              <button
                onClick={() => setShowAllDiseases(v => !v)}
                className="text-primary-500 text-xs font-bold mt-3 flex items-center gap-1"
              >
                {showAllDiseases ? 'Скрыть' : `Ещё ${diseases.length - 8}`}
                <ChevronDown size={12} className={showAllDiseases ? 'rotate-180 transition' : 'transition'} />
              </button>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">ЦЕНА</h3>
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
                <span>0 руб.</span>
                <span className="font-medium text-gray-700">до {maxPrice.toLocaleString('ru-RU')} руб.</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-bold text-xs tracking-wide text-gray-400 mb-3">НАЛИЧИЕ</h3>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-primary-500 w-4 h-4"
                />
                Только в наличии
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
              <span className="ml-auto text-xs text-gray-400 hidden sm:inline">Найдено: {filtered.length}</span>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-1.5 mt-8">
              {[1, 2, 3, 4, '...', 10].map((n, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-sm font-medium ${n === 1 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-white'}`}>{n}</button>
              ))}
            </div>

            {/* Акция месяца */}
            <section className="mt-10">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Акция месяца</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {products.slice(0, 4).map(p => <ProductCard key={`promo-${p.id}`} product={p} />)}
              </div>
            </section>

            {/* Вы смотрели */}
            <section className="mt-10">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Вы смотрели</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {products.slice(2, 6).map(p => <ProductCard key={`viewed-${p.id}`} product={p} />)}
              </div>
            </section>

            {/* SEO text */}
            <section className="mt-10 bg-white rounded-2xl p-6 shadow-sm text-xs text-gray-500 leading-relaxed grid md:grid-cols-2 gap-6">
              <p>
                Купить лекарства в Москве и области с доставкой можно в нашей онлайн-аптеке. Широкий ассортимент
                препаратов от проверенных производителей, доступные цены и быстрая доставка по всей России.
              </p>
              <p>
                Мы гарантируем подлинность всех товаров — каждый препарат имеет сертификат соответствия. Оформите
                заказ на сайте или заберите его самостоятельно в ближайшей аптеке партнёрской сети.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog