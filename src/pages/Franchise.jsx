import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Truck, ShieldCheck, PiggyBank, Building2, Handshake } from 'lucide-react'

const BENEFITS = [
  { icon: ShieldCheck, title: 'Известный бренд', desc: 'Более 750 аптек в 80 городах и узнаваемость сети «Аптека.онлайн».' },
  { icon: Truck, title: 'Готовая логистика', desc: 'Отлаженные поставки от производителей и дистрибьюторов напрямую.' },
  { icon: PiggyBank, title: 'Низкий порог входа', desc: 'Гибкие условия открытия точки и поддержка на всех этапах запуска.' },
  { icon: ShoppingBag, title: 'Широкий ассортимент', desc: 'Лекарства, медтехника, косметика и товары для мам и малышей.' },
]

const STEPS = [
  { step: 1, title: 'Заявка', desc: 'Оставляете контакты в форме ниже' },
  { step: 2, title: 'Консультация', desc: 'Менеджер обсуждает условия и локацию' },
  { step: 3, title: 'Договор', desc: 'Подписываем франчайзинговое соглашение' },
  { step: 4, title: 'Запуск', desc: 'Помогаем открыть и запустить аптеку' },
]

const Franchise = () => {
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Главная</Link> / Франшиза
      </p>
      <h1 className="text-2xl font-bold mb-4">Франшиза «Аптека.онлайн»</h1>

      <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed mb-8">
        Сеть социальных аптек «Аптека.онлайн» является частью крупного аптечного холдинга. Мы приглашаем
        предпринимателей к сотрудничеству и предлагаем открыть аптеку под нашим брендом: с готовой бизнес-моделью,
        поддержкой поставок и низкими ценами для покупателей.
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {BENEFITS.map((b, i) => {
          const Icon = b.icon
          return (
            <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary-100 flex items-center justify-center text-primary-500 mb-3">
                <Icon size={22} />
              </div>
              <h3 className="font-bold mb-1 text-sm">{b.title}</h3>
              <p className="text-xs text-gray-500">{b.desc}</p>
            </div>
          )
        })}
      </div>

      <h2 className="text-xl font-bold mb-4">Как начать</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STEPS.map(s => (
          <div key={s.step} className="bg-white rounded-2xl shadow-sm p-4 flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500 font-bold text-sm">
              {s.step}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900 mb-0.5">{s.title}</div>
              <p className="text-xs text-gray-500 leading-snug">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="flex items-center gap-3">
          <Building2 size={22} className="text-primary-500 shrink-0" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Более 750 аптек в 80 городах Центрального и Северо-Западного округов РФ уже работают под нашим брендом.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Handshake size={22} className="text-primary-500 shrink-0" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Мы сопровождаем партнёров на каждом этапе — от выбора помещения до обучения персонала.
          </p>
        </div>
      </div>

      <div className="bg-primary-50 rounded-2xl p-5 max-w-xl">
        <h3 className="font-bold text-sm mb-1">Оставить заявку на франшизу</h3>
        {sent ? (
          <p className="text-sm text-primary-700 mt-3">Спасибо! Мы свяжемся с вами в ближайшее время.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mt-3">
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ваш телефон"
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-primary-500"
            />
            <button type="submit" className="px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition whitespace-nowrap">
              ОСТАВИТЬ ЗАЯВКУ
            </button>
          </form>
        )}
        <p className="text-[11px] text-gray-400 mt-2">
          Нажимая на кнопку, вы соглашаетесь на обработку{' '}
          <Link to="/privacy" className="text-primary-500 hover:underline">персональных данных</Link>
        </p>
      </div>
    </div>
  )
}

export default Franchise
