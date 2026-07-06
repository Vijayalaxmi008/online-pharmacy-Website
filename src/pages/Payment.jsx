import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Store, ClipboardList, PackageCheck, Wallet, CreditCard, ShieldCheck, Building2 } from 'lucide-react'
import { howItWorks } from '../data/categories'

const STEP_ICONS = { 1: Search, 2: Store, 3: ClipboardList, 4: PackageCheck }

const CARDS = [
  { name: 'ВБРР', color: '#c9a227' },
  { name: 'Уралсиб Банк', color: '#0072ce' },
  { name: 'Сбер Банк', color: '#21a038' },
  { name: 'Райффайзен Банк', color: '#fce300' },
  { name: 'ВТБ', color: '#0a2896' },
  { name: 'Почта Банк', color: '#c8102e' },
  { name: 'МТС Банк', color: '#e30611' },
  { name: 'Газпромбанк', color: '#0033a0' },
  { name: 'Citibank', color: '#003b70' },
  { name: 'Альфа Банк', color: '#ef3124' },
]

const Payment = () => {
  const [phone, setPhone] = useState('')

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Главная</Link> / Оплата
      </p>
      <h1 className="text-2xl font-bold mb-4">Оплата</h1>

      <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed mb-8">
        Сеть социальных аптек СТОЛИЧКИ является частью аптечного холдинга Неофарм. Первая аптека в Москве была
        открыта в 2000 году. Наша миссия с первого дня была проста: сделать лекарства доступными по цене. Мы
        максимально сократили путь медикаментов от производителя к потребителю. Сотрудничая напрямую с
        производителями и дистрибьюторами, мы не только предоставляем лекарства по низким ценам, а также
        гарантируем подлинность товаров.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {howItWorks.map(s => {
          const Icon = STEP_ICONS[s.step]
          return (
            <div key={s.step} className="bg-white rounded-2xl shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500">
                <Icon size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-primary-500 mb-0.5">{s.step} {s.title}</div>
                <p className="text-xs text-gray-500 leading-snug">{s.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      <h2 className="text-xl font-bold mb-4">Варианты рассрочки</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="text-sm text-gray-600 leading-relaxed space-y-3">
          <p>
            Разнообразный и богатый опыт сложившаяся структура организации требуют определения и уточнения
            модели развития.
          </p>
          <p>
            Задача организации, в особенности же новая модель организационной деятельности требуют определения.
          </p>
          <p>
            Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности
            требуют определения и уточнения дальнейших направлений развития.
          </p>
        </div>
        <div className="bg-primary-50 rounded-2xl p-5">
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Разнообразный и богатый опыт сложившаяся структура организации требуют определения и уточнения
            модели развития. Задача организации, в особенности же новая модель организационной деятельности
            требуют определения и уточнения направлений прогрессивного развития. Идейные соображения высшего
            порядка.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ваш телефон"
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition"
            >
              РЕГИСТРАЦИЯ
            </button>
          </form>
          <p className="text-[11px] text-gray-400 mt-2">
            Нажимая на кнопку, вы соглашаетесь на обработку персональных данных
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wallet size={20} className="text-primary-500" />
            <h2 className="text-lg font-bold">Оплата наличными</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <h3 className="font-bold text-sm mb-1.5">Где оплачивать</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Наличный расчет возможен при курьерской доставке, а также в пункте самовывоза. Оплата заказа
                и доставки осуществляется непосредственно курьеру или кассиру в аптеке при получении заказа,
                вместе с заказом получаете все необходимые документы и кассовый чек.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1.5">Есть ли чек?</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Копии сертификатов и лицензий предоставляются по предварительному запросу. Чтобы оплатить
                заказ наличными при получении, при оформлении заказа выберите способ оплаты «Наличными» и
                нажмите «Оформить заказ».
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={20} className="text-primary-500" />
            <h2 className="text-lg font-bold">Оплата банковской картой</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
            <div>
              <h3 className="font-bold text-sm mb-2">Какие платежные системы принимаются?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CARDS.map(c => (
                  <div key={c.name} className="border border-gray-200 rounded-xl px-2 py-2.5 text-center flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                    <span className="text-[11px] font-bold text-gray-700">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
              <ShieldCheck size={16} className="text-primary-500 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-sm mb-1">Как обеспечивается безопасность персональных данных</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Разнообразный и богатый опыт сложившаяся структура организации требуют определения и
                  уточнения модели развития. Задача организации, в особенности же новая модель организационной
                  деятельности требуют определения.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Building2 size={20} className="text-primary-500" />
          <h2 className="text-lg font-bold">Безналичный расчет для юридических лиц или ИП</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed space-y-3">
          <p>
            Разнообразный и богатый опыт сложившаяся структура организации требуют определения и уточнения
            модели развития. Задача организации, в особенности же новая модель организационной деятельности
            требуют определения и уточнения направлений прогрессивного развития. Идейные соображения высшего
            порядка, а также дальнейшее развитие различных форм деятельности требуют определения и уточнения
            дальнейших направлений развития.
          </p>
          <p>
            Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей
            деятельности позволяет оценить значение модели развития. Товарищи! начало повседневной работы по
            формированию позиции представляет собой интересный эксперимент проверки систем массового участия.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-navy-500 to-primary-500 text-white rounded-2xl p-6 text-sm">
        Если возникнут вопросы, звоните на бесплатный номер <span className="font-bold">8-800-777-22-33</span>,
        пишите на почту <span className="font-bold">info@restoll.ru</span>. Мы на связи по будним дням с 9:00
        до 18:00 часов, а по выходным с 12:00 до 16:00 часов.
      </div>
    </div>
  )
}

export default Payment