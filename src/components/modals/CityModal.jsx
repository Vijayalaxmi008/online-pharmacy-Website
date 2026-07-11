import { useState } from 'react'
import Modal from './Modal'
import { Search } from 'lucide-react'

const cities = ['Moscow', 'Saint Petersburg', 'Novosibirsk', 'Yekaterinburg', 'Kazan', 'Nizhny Novgorod', 'Chelyabinsk', 'Samara', 'Omsk', 'Rostov-on-Don', 'Ufa', 'Krasnoyarsk', 'Voronezh', 'Volgograd', 'Krasnodar', 'Saratov', 'Tyumen', 'Tolyatti', 'Izhevsk', 'Barnaul', 'Irkutsk', 'Ulyanovsk', 'Khabarovsk', 'Vladivostok', 'Yaroslavl', 'Makhachkala', 'Tomsk', 'Orenburg', 'Kemerovo', 'Novokuznetsk', 'Ryazan', 'Astrakhan', 'Naberezhnye Chelny', 'Penza', 'Lipetsk', 'Tula', 'Kirov', 'Cheboksary', 'Kaliningrad', 'Bryansk', 'Magnitogorsk', 'Ivanovo', 'Kursk', 'Tver', 'Stavropol', 'Nizhny Tagil', 'Belgorod', 'Arkhangelsk', 'Vladimir', 'Sochi', 'Kurgan', 'Smolensk', 'Kaluga', 'Chita', 'Oryol', 'Volzhsky', 'Cherepovets', 'Vladikavkaz', 'Murmansk', 'Surgut', 'Vologda', 'Tambov', 'Sterlitamak', 'Grozny', 'Yakutsk', 'Kostroma', 'Komsomolsk-on-Amur', 'Petrozavodsk', 'Taganrog', 'Nizhnevartovsk', 'Yoshkar-Ola', 'Bratsk', 'Novorossiysk', 'Dzerzhinsk', 'Shakhty', 'Orsk', 'Blagoveshchensk']

const CityModal = ({ onClose, onSelect }) => {
  const [search, setSearch] = useState('')
  const filtered = cities.filter(c => c.toLowerCase().includes(search.toLowerCase()))
  return (
    <Modal onClose={onClose} maxWidth="max-w-2xl">
      <div className="p-5">
        <h2 className="text-lg font-bold mb-3">Choose your city</h2>
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Find your city..."
            className="w-full pl-9 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:outline-none text-sm" />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 max-h-72 overflow-y-auto text-sm">
          {filtered.map(city => (
            <button key={city} onClick={() => { onSelect(city + (city === 'Moscow' ? ' and Moscow Region' : '')); onClose() }}
              className={`text-left py-1 hover:text-primary-600 ${city === 'Moscow' ? 'text-primary-500 font-medium' : 'text-gray-700'}`}>
              {city}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default CityModal