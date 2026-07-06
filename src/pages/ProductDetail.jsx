import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useApp } from '../context/AppContext'
import { Heart, Minus, Plus, Truck, ShieldCheck } from 'lucide-react'

const TABS = ['Основное', 'Инструкция', 'Отзывы', 'Аналоги', 'Доставка', 'Самовывоз']
const INSTRUCTION_TOPICS = [
  'Производитель', 'Кратко о товаре', 'Показания', 'Как принимать, курс приема и дозировка',
  'Описание', 'Функциональные преимущества', 'Условия хранения', 'Срок годности',
  'Действующее вещество', 'Лекарственная форма',
]

const INSTRUCTION_CONTENT = {
  'Производитель': 'Эбботт, США',
  'Кратко о товаре': 'Ферментный препарат для улучшения пищеварения. Помогает организму переваривать белки, жиры и углеводы при нехватке собственных ферментов поджелудочной железы.',
  'Показания': 'Назначается при недостаточности внешнесекреторной функции поджелудочной железы, а также при разовых нарушениях пищеварения, связанных с погрешностями в питании.',
  'Как принимать, курс приема и дозировка': 'Как правило, для устранения тяжести после еды достаточно 1 капсулы. Капсулу принимают во время или сразу после приема пищи, запивая достаточным количеством жидкости.',
  'Описание': 'Твердые желатиновые капсулы, содержащие минимикросферы бурого цвета с кишечнорастворимой оболочкой.',
  'Функциональные преимущества': 'Минимикросферы равномерно перемешиваются с пищей и быстро высвобождают ферменты в кишечнике, поддерживая собственное пищеварение.',
  'Условия хранения': 'При температуре не выше 25°C, в плотно закрытой упаковке, в недоступном для детей месте.',
  'Срок годности': '3 года. Не использовать по истечении срока годности, указанного на упаковке.',
  'Действующее вещество': 'Панкреатин',
  'Лекарственная форма': 'Капсулы кишечнорастворимые',
}

const REVIEWS = [
  { name: 'Елена', date: '17 января 2020', rating: 5, text: 'Хороший препарат, помогает быстро справиться с тяжестью после еды. Врач назначил после операции — результатом довольны.' },
  { name: 'Владимир', date: '10 января 2020', rating: 4, text: 'Пользуемся уже полгода, побочных эффектов не заметили. Цена немного высоковата, но качество того стоит.' },
]

const PICKUP_ROWS = [
  { name: 'ЕАПТЕКА', addr: 'Московская обл, Подольск г, Свердлова ул, дом № 13', hours: 'Пн-Сб: 08:00-21:00', cost: 'Бесплатно' },
  { name: 'ЕАПТЕКА', addr: 'Московская обл, Подольск г, Свердлова ул, дом № 13', hours: 'Пн-Сб: 08:00-21:00', cost: 'Бесплатно' },
  { name: 'ЕАПТЕКА', addr: 'Московская обл, Подольск г, Свердлова ул, дом № 13', hours: 'Пн-Сб: 08:00-21:00', cost: 'Бесплатно' },
]

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { favorites, toggleFavorite } = useApp()
  const product = products.find(p => p.id === Number(id))

  const [activeTab, setActiveTab] = useState('Основное')
  const [activeTopic, setActiveTopic] = useState(INSTRUCTION_TOPICS[0])
  const [qty, setQty] = useState(1)

  if (!product) return <div className="container mx-auto p-8">Товар не найден</div>

  const analogues = products.filter(p => p.id !== product.id).slice(0, 4)
  const related = products.filter(p => p.id !== product.id).slice(4, 8)
  const isFav = favorites.includes(product.id)

  const handleBuyNow = () => {
    addToCart(product, qty)
    navigate('/checkout')
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Главная</Link> / <Link to="/catalog" className="hover:text-primary-500">Лекарственные средства</Link> / {product.name}
      </p>
      <h1 className="text-xl font-bold mb-3">{product.name}</h1>

      <div className="flex gap-1 mb-6 text-xs border-b overflow-x-auto">
        {TABS.map(tab => (
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

      {activeTab === 'Основное' && (
        <>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-4 shadow-sm relative">
              {product.isProductOfDay && (
                <span className="absolute top-6 left-6 bg-primary-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Товар дня</span>
              )}
              <img src={product.image} alt={product.name} className="w-full aspect-square object-contain" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-medium ${product.inStock ? 'text-primary-500' : 'text-red-500'}`}>
                  {product.inStock ? 'Есть в наличии' : 'Нет в наличии'}
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex text-gold-500 text-sm">★★★★★</div>
                  <span className="text-xs text-gray-500">6 отзывов</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-600 space-y-1">
                <div className="font-bold text-gray-900 mb-1">Характеристики</div>
                <div>Производитель: <span className="text-primary-500">{product.brand}</span></div>
                <div>Действующее вещество: Панкреатин</div>
                <div>Срок годности: Длинный срок</div>
                <div>Артикул: {product.code}</div>
              </div>

              <div className="flex items-end gap-3 mb-4">
                <div className="text-2xl font-bold text-primary-500">{product.price.toLocaleString('ru-RU')} руб.</div>
                {product.oldPrice && (
                  <div className="text-base text-gray-400 line-through mb-0.5">{product.oldPrice.toLocaleString('ru-RU')} руб.</div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center border-2 border-gray-200 rounded-full">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-2 text-gray-500 hover:text-primary-500">
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="p-2 text-gray-500 hover:text-primary-500">
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => addToCart(product, qty)}
                  className="flex-1 bg-primary-500 text-white font-bold py-2.5 rounded-full hover:bg-primary-600 transition text-sm"
                >
                  В корзину
                </button>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="w-11 h-11 shrink-0 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary-500 transition"
                >
                  <Heart size={18} className={isFav ? 'fill-primary-500 text-primary-500' : 'text-gray-400'} />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full border-2 border-primary-500 text-primary-500 font-bold py-2.5 rounded-full hover:bg-primary-50 transition text-sm mb-4"
              >
                Купить в 1 клик
              </button>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-primary-50 rounded-xl p-3 flex items-start gap-2">
                  <Truck size={16} className="text-primary-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">Доставка сегодня, бесплатно от 500 руб.</span>
                </div>
                <div className="bg-primary-50 rounded-xl p-3 flex items-start gap-2">
                  <ShieldCheck size={16} className="text-primary-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">При температуре не выше 25°C, в закрытой упаковке</span>
                </div>
              </div>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">Аналоги</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {analogues.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">Обратите внимание</h2>
            <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                {products.slice(0, 2).map(p => (
                  <img key={p.id} src={p.image} alt={p.name} className="w-16 h-16 object-contain" />
                ))}
              </div>
              <div className="text-2xl font-bold text-primary-500">+</div>
              <div className="text-center">
                <div className="text-xs text-gray-500">Вместе дешевле</div>
                <div className="text-xl font-bold">
                  {(product.price + products[0].price).toLocaleString('ru-RU')} руб.
                </div>
              </div>
              <button className="bg-primary-500 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-primary-600 transition shrink-0">
                В корзину
              </button>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg font-bold mb-3">Похожие товары</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        </>
      )}

      {(activeTab === 'Основное' || activeTab === 'Инструкция') && (
        <section className="bg-white rounded-2xl shadow-sm p-5 mb-10">
          <h2 className="text-lg font-bold mb-3">Инструкция по применению</h2>
          <div className="flex flex-wrap gap-2 mb-4 text-xs border-b pb-3">
            {INSTRUCTION_TOPICS.map(topic => (
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
        </section>
      )}

      {(activeTab === 'Основное' || activeTab === 'Отзывы') && (
        <section className="bg-white rounded-2xl shadow-sm p-5 mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Отзывы</h2>
            <button className="bg-primary-500 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-primary-600 transition">
              Оставить отзыв
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
        </section>
      )}

      {(activeTab === 'Основное' || activeTab === 'Доставка' || activeTab === 'Самовывоз') && (
        <section className="bg-white rounded-2xl shadow-sm p-5 mb-10">
          <h2 className="text-lg font-bold mb-4">Доставка и самовывоз в Москве и области</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-bold text-xs text-gray-400 uppercase mb-2">В пределах МКАД</h3>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-600">до 500 руб.</span>
                <span className="font-medium">150 руб.</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-600">от 500 руб.</span>
                <span className="font-medium text-primary-500">Бесплатно</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-xs text-gray-400 uppercase mb-2">За пределами МКАД</h3>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-600">до 500 руб.</span>
                <span className="font-medium">от 300 руб.</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-gray-600">от 500 руб.</span>
                <span className="font-medium text-primary-500">Бесплатно</span>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-sm mt-6 mb-3">Самовывоз в Москве и области</h3>
          <div className="rounded-xl border border-gray-100 overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="text-left px-3 py-2 font-medium">Аптека</th>
                  <th className="text-left px-3 py-2 font-medium hidden sm:table-cell">Часы работы</th>
                  <th className="text-left px-3 py-2 font-medium">Стоимость</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PICKUP_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2.5">
                      <span className="font-medium text-primary-500">{row.name}</span>{' '}
                      <span className="text-gray-500">{row.addr}</span>
                    </td>
                    <td className="px-3 py-2.5 text-gray-500 hidden sm:table-cell">{row.hours}</td>
                    <td className="px-3 py-2.5 font-medium">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail