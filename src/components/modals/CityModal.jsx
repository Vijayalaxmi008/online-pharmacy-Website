import { useState } from 'react'
import Modal from './Modal'
import { Search } from 'lucide-react'

const cities = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону', 'Уфа', 'Красноярск', 'Воронеж', 'Волгоград', 'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск', 'Барнаул', 'Иркутск', 'Ульяновск', 'Хабаровск', 'Владивосток', 'Ярославль', 'Махачкала', 'Томск', 'Оренбург', 'Кемерово', 'Новокузнецк', 'Рязань', 'Астрахань', 'Набережные Челны', 'Пенза', 'Липецк', 'Тула', 'Киров', 'Чебоксары', 'Калининград', 'Брянск', 'Магнитогорск', 'Иваново', 'Курск', 'Тверь', 'Ставрополь', 'Нижний Тагил', 'Белгород', 'Архангельск', 'Владимир', 'Сочи', 'Курган', 'Смоленск', 'Калуга', 'Чита', 'Орёл', 'Волжский', 'Череповец', 'Владикавказ', 'Мурманск', 'Сургут', 'Вологда', 'Тамбов', 'Стерлитамак', 'Грозный', 'Якутск', 'Кострома', 'Комсомольск-на-Амуре', 'Петрозаводск', 'Таганрог', 'Нижневартовск', 'Йошкар-Ола', 'Братск', 'Новороссийск', 'Дзержинск', 'Шахты', 'Орск', 'Благовещенск']

const CityModal = ({ onClose, onSelect }) => {
  const [search, setSearch] = useState('')
  const filtered = cities.filter(c => c.toLowerCase().includes(search.toLowerCase()))
  return (
    <Modal onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-5">
        <h2 className="text-lg font-bold mb-3">Выбор города</h2>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Найдите свой город..."
            className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-sm" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-72 overflow-y-auto text-sm">
          {filtered.map(city => (
            <button key={city} onClick={() => { onSelect(city + (city === 'Москва' ? ' и область' : '')); onClose() }}
              className={`text-left py-1 hover:text-primary-600 ${city === 'Москва' ? 'text-primary-500 font-medium' : 'text-gray-700'}`}>
              {city}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default CityModal
