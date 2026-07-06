import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import mapImg from '../assets/images/map/image.png'

const Contact = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">Главная / Контакты</p>
      <h1 className="text-2xl font-bold mb-6">Контакты</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-start gap-2 text-sm">
            <MapPin size={16} className="text-primary-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs text-gray-400 uppercase">Главный офис</div>
              <div className="font-bold">129226, г. Москва, ул. Докукина, д.16, стр.1, 6 этаж</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-primary-500 shrink-0" />
              <div>
                <div className="font-bold">8-800-777-22-33</div>
                <div className="text-xs text-gray-500">Заказать звонок</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-primary-500 shrink-0" />
              <div>
                <div className="font-bold">8 (495) 223-34-03</div>
                <div className="text-xs text-gray-500">Бесплатно по России</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-primary-500 shrink-0" />
            <div>
              <div className="font-bold">8:00 - 22:00</div>
              <div className="text-xs text-gray-500">Без выходных</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-primary-500 shrink-0" />
            <div>
              <div className="font-bold">info@restoll.ru</div>
              <div className="text-xs text-gray-500">Написать нам</div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
            <h4 className="font-bold text-gray-900 mb-1 text-sm">Реквизиты</h4>
            <p>ИНН/КПП 7451432180/745101001</p>
            <p>р/с 40702810010000281954 в АО «ТИНЬКОФФ БАНК»</p>
            <p>БИК 044525974 кор./сч 30101810145250000974</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-sm mb-3">Мы вам перезвоним</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2 text-xs">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иванов Иван Иванович"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___ __ __"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 px-1">
              Нажимая на кнопку, вы соглашаетесь на обработку персональных данных
            </p>
            <button className="w-full bg-primary-500 text-white font-bold py-2.5 rounded-full text-xs hover:bg-primary-600 transition">
              ПЕРЕЗВОНИТЕ МНЕ
            </button>
          </form>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-3">Как проехать</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        м. Полежаевская. Последний вагон из центра, после турникета налево, выход к остановке также налево.
        Троллейбусы 20, 35 или 65 (до остановки «Бульвар Генерала Карбышева»)
      </p>
      <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-10 border border-gray-100">
        <img src={mapImg} alt="Карта проезда" className="w-full h-full object-cover" />
      </div>

      <h2 className="text-xl font-bold mb-4">Для партнеров</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-bold text-sm mb-1.5">Арендодателям</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Предложения по аренде торговых площадей или субаренде отправляйте через форму на сайте или на
            адрес <a href="mailto:estate@neo-pharm.ru" className="text-primary-500 hover:underline">estate@neo-pharm.ru</a>
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-bold text-sm mb-1.5">Для предложений</h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-1">
            По общим вопросам <a href="mailto:office@neo-pharm.ru" className="text-primary-500 hover:underline">office@neo-pharm.ru</a>
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            По вопросам рекламы и продвижения <a href="mailto:press@neo-pharm.ru" className="text-primary-500 hover:underline">press@neo-pharm.ru</a>
          </p>
        </div>
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-bold text-sm mb-1.5">Центральный офис</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Адрес: г. Москва, пр-т Маршала Жукова, д. 43, корп. 3<br />
            Адрес для почтовых отправлений: 117246, г. Москва, а/я № 5, ООО «НЕО ФАРМ».
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact