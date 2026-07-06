import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, MapPin, Clock, ShieldCheck, Pill, FileText, Search, ChevronDown } from 'lucide-react'

const PICKUP_POINTS = [
  { name: 'Столички', addr: 'Московская обл, Ликино-Дулёво г, Калинина ул, дом № 2А', hours: 'Пн-Сб: 08:00-21:00', phone: '8 800 775 03 33' },
  { name: 'ЕАПТЕКА', addr: 'Московская обл, Егорьевск г, Парижской Коммуны ул, дом № 1Б', hours: 'Пн-Сб: 08:00-21:00', phone: '8 495 730 53 00' },
  { name: 'Столички', addr: 'Московская обл, Ликино-Дулёво г, Калинина ул, дом № 2А', hours: 'Пн-Сб: 08:00-21:00', phone: '8 800 775 03 33' },
  { name: 'ЕАПТЕКА', addr: 'Московская обл, Егорьевск г, Парижской Коммуны ул, дом № 1Б', hours: 'Пн-Сб: 08:00-21:00', phone: '8 495 730 53 00' },
]

// Same city list shown in the PDF mockup's "Выбор города" block
const CITIES = [
  'Москва', 'Санкт-Петербург', 'Нижний Новгород', 'Ростов-на-Дону', 'Самара', 'Казань',
  'Екатеринбург', 'Тольятти', 'Омск', 'Волгоград', 'Ставрополь', 'Краснодар',
  'Воронеж', 'Уфа', 'Ярославль', 'Саратов', 'Ижевск', 'Челябинск',
]

const DeliveryPickup = () => {
  const [city, setCity] = useState('Москва')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)

  const filteredCities = CITIES.filter(c => c.toLowerCase().includes(query.toLowerCase()))
  const visibleCities = expanded ? filteredCities : filteredCities.slice(0, 12)

  return (
  <div className="bg-gray-100">
  <div className="container mx-auto px-4 py-6">
    <p className="text-xs text-gray-500 mb-2">
      <Link to="/" className="hover:text-primary-500">Главная</Link> / Доставка и самовывоз
    </p>
    <h1 className="text-2xl font-bold mb-6">Доставка и самовывоз</h1>

    {/* Выбор города */}
    <section className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">
      <h2 className="text-lg font-bold mb-3">Выбор города</h2>
      <div className="relative max-w-md mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Найдите свой город..."
          className="w-full pl-4 pr-10 py-2.5 rounded border border-gray-200 focus:border-primary-500 focus:outline-none text-sm"
        />
        <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-3 gap-y-2 text-sm">
        {visibleCities.map(c => (
          <button
            key={c}
            onClick={() => setCity(c)}
            className={`text-left truncate ${c === city ? 'text-primary-500 font-bold' : 'text-gray-600 hover:text-primary-500'}`}
          >
            {c}
          </button>
        ))}
      </div>
      {filteredCities.length > 12 && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1 text-primary-500 text-xs font-bold mt-4 hover:underline"
        >
          {expanded ? 'Свернуть' : 'Показать ещё'}
          <ChevronDown size={14} className={expanded ? 'rotate-180 transition' : 'transition'} />
        </button>
      )}
    </section>

    <div className="bg-white rounded-lg shadow-sm p-5 mb-10 flex items-center gap-4 border-l-4 border-primary-500">
      <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
        <Truck size={24} className="text-primary-500" />
      </div>
      <div>
        <h3 className="font-bold text-sm mb-1">Оставайтесь дома! Заказывайте доставку!</h3>
        <p className="text-xs text-gray-500">
          Чтобы гарантировать безопасность и обеспечить ваше спокойствие, мы ежедневно проверяем самочувствие
          всех курьеров и на входе выдаем им новые медицинские маски, перчатки и антисептики.
        </p>
      </div>
    </div>

    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">Доставка</h2>
      <p className="text-sm text-gray-500 mb-4">Доставка и самовывоз в {city} и области</p>
      <h3 className="text-sm font-bold text-gray-500 mb-3">Доставка заказов в пределах МКАД</h3>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-[#0b1f66] text-xs text-white">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Способ доставки</th>
              <th className="text-left px-4 py-3 font-medium">Время исполнения</th>
              <th className="text-left px-4 py-3 font-medium">Стоимость</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr><td className="px-4 py-3">Курьером</td><td className="px-4 py-3 text-gray-500">1-2 часа</td><td className="px-4 py-3 text-primary-500 font-bold">150 руб.</td></tr>
            <tr><td className="px-4 py-3">Курьером (срочно)</td><td className="px-4 py-3 text-gray-500">30-60 мин</td><td className="px-4 py-3 text-primary-500 font-bold">от 300 руб.</td></tr>
            <tr><td className="px-4 py-3">При заказе от 500 руб.</td><td className="px-4 py-3 text-gray-500">1-2 часа</td><td className="px-4 py-3 text-primary-500 font-bold">Бесплатно</td></tr>
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Clock, t: 'SMS с телефоном курьера', d: 'В день доставки' },
          { icon: ShieldCheck, t: 'Бережная транспортировка', d: 'В надлежащих условиях' },
          { icon: Truck, t: 'Звонок курьера', d: 'Перед доставкой' },
          { icon: MapPin, t: 'Удобный интервал', d: 'Доставка в удобное время' },
        ].map(f => (
          <div key={f.t} className="bg-white rounded-lg shadow-sm p-4 text-center border border-gray-100">
            <f.icon size={20} className="text-primary-500 mx-auto mb-2" />
            <h4 className="font-bold text-xs mb-1">{f.t}</h4>
            <p className="text-[11px] text-gray-500">{f.d}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Pill size={18} className="text-primary-500" />
            <h3 className="font-bold text-sm">Доставка безрецептурных лекарств</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Согласно указу президента №187 от 17 марта 2020 года о дистанционной продаже безрецептурных
            лекарств, осуществляется доставка на дом безрецептурных лекарственных средств, а также БАД,
            медицинских изделий, товаров для дома и красоты, бытовой химии и сопутствующих товаров.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={18} className="text-primary-500" />
            <h3 className="font-bold text-sm">Доставка рецептурных лекарств</h3>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Доставка рецептурных лекарств, при наличии рецепта, выписанного врачом, осуществляется до
            ближайшей аптеки. Забрать заказ можно самостоятельно, предъявив рецепт и документ,
            удостоверяющий личность.
          </p>
        </div>
      </div>
    </section>

    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">Порядок обмена/возврата</h2>
      <div className="bg-white rounded-lg shadow-sm p-5 text-sm text-gray-600 space-y-2 border border-gray-100">
        <p>Отказаться от доставленного заказа и его оплаты возможно в следующих случаях:</p>
        <ul className="list-disc list-inside space-y-1 text-xs text-gray-500">
          <li>доставленный товар не соответствует заказанному;</li>
          <li>товар поврежден вследствие нарушения целостности упаковки;</li>
          <li>товар поврежден вследствие несоответствия упаковки характеру вложения и условиям пересылки (за исключением требований по температурному режиму).</li>
        </ul>
        <p className="text-xs text-gray-400 pt-1">Товар может быть возвращен только в момент доставки.</p>
        <p className="text-xs text-primary-500 pt-1">
          Согласно Постановлению Правительства РФ от 31.12.2020 №2463, не подлежат обмену и возврату товары
          надлежащего качества: лекарственные препараты, предметы личной гигиены (зубные щетки и другие
          аналогичные товары), парфюмерно-косметические товары.
        </p>
      </div>
    </section>

    <section>
      <h2 className="text-xl font-bold mb-4">Самовывоз</h2>
      <div className="space-y-3 mb-6">
        {PICKUP_POINTS.map((p, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm border border-gray-100">
            <span className="font-bold text-primary-500 w-24 shrink-0">{p.name}</span>
            <div className="flex items-start gap-2 flex-1">
              <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
              <span className="text-gray-600">{p.addr}</span>
            </div>
            <span className="text-gray-500 text-xs shrink-0">{p.hours}</span>
            <span className="text-gray-700 font-medium text-xs shrink-0">{p.phone}</span>
            <button className="text-primary-500 text-xs font-bold hover:underline shrink-0">Посмотреть</button>
          </div>
        ))}
      </div>

      <div className="bg-primary-50 rounded-lg p-5 border border-primary-100">
        <h3 className="font-bold text-sm mb-2">Условия самовывоза</h3>
        <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
          <li>Стоимость самовывоза — бесплатно</li>
          <li>Самовывоз из партнерских аптек при заказе от 500 руб.</li>
          <li>Заказ хранится 5 дней с момента доставки в пункт самовывоза</li>
        </ul>
      </div>
    </section>
  </div>
  </div>
  )
}

export default DeliveryPickup
