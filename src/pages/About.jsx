import { Link } from 'react-router-dom'
import { ShoppingBag, Truck, ShieldCheck, PiggyBank, Users, Building2 } from 'lucide-react'
import { features } from '../data/categories'

const ICONS = { 1: ShoppingBag, 2: Truck, 3: ShieldCheck, 4: PiggyBank }

const historyPeriods = [
  { years: '2005-2008', text: 'Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом рамки и место обучения кадров обеспечивает широкому.' },
  { years: '2008-2012', text: 'Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом рамки и место обучения кадров обеспечивает широкому.' },
  { years: '2012-2016', text: 'Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом рамки и место обучения кадров обеспечивает широкому.' },
  { years: '2016-2018', text: 'Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом рамки и место обучения кадров обеспечивает широкому.' },
  { years: '2018-2020', text: 'Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом рамки и место обучения кадров обеспечивает широкому.' },
  { years: '2020-2021', text: 'Разнообразный и богатый опыт начало повседневной работы по формированию позиции способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом рамки и место обучения кадров обеспечивает широкому.' },
]

const stats = [
  { icon: Users, value: '5000', label: 'сотрудников. Настоящая большая семья!' },
  { icon: Building2, value: '750', label: 'аптек в 80 городах Центрального и Северо-западного округов РФ' },
  { icon: Users, value: '5000', label: 'сотрудников. Настоящая большая семья!' },
  { icon: Building2, value: '750', label: 'аптек в 80 городах Центрального и Северо-западного округов РФ' },
]

const About = () => (
  <div className="container mx-auto px-4 py-6">
    <p className="text-xs text-gray-500 mb-2">
      <Link to="/" className="hover:text-primary-500">Главная</Link> / О компании
    </p>
    <h1 className="text-2xl font-bold mb-4">О компании</h1>

    <div className="bg-white rounded-2xl p-5 shadow-sm text-sm text-gray-600 leading-relaxed space-y-3 mb-6">
      <p>
        Сеть социальных аптек СТОЛИЧКИ является частью аптечного холдинга Неофарм. Первая аптека в Москве была
        открыта в 2000 году. Наша миссия с первого дня была проста: сделать лекарства доступными по цене. Мы
        максимально сократили путь медикаментов от производителя к потребителю. Сотрудничая напрямую с
        производителями и дистрибьюторами, мы не только предоставляем лекарства по низким ценам, а также
        гарантируем подлинность товаров.
      </p>
      <p>
        В дополнение к низким ценам мы также неустанно работаем над расширением ассортимента, чтобы поиск
        лекарств был простым для вас. В аптечных пунктах и на сайте СТОЛИЧКИ вы найдете широкий ассортимент:
        лекарственные средства, медтехнику, лечебную косметику, спортивное питание, товары для мам и малышей и
        др. В наших аптеках допущены к продаже только разрешенные Минздравом России медикаменты.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {features.map(f => {
        const Icon = ICONS[f.id]
        return (
          <div key={f.id} className="bg-white rounded-2xl p-5 text-center shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary-100 flex items-center justify-center text-primary-500 mb-3">
              <Icon size={22} />
            </div>
            <h3 className="font-bold mb-1 text-sm">{f.title}</h3>
            <p className="text-xs text-gray-500">{f.desc}</p>
          </div>
        )
      })}
    </div>

    <h2 className="text-xl font-bold mb-3">История основания</h2>
    <div className="bg-white rounded-2xl shadow-sm p-5 text-sm text-gray-600 leading-relaxed mb-10">
      История ГК НЕОФАРМ начиналась в 2000 году как небольшой семейный бизнес с открытия нескольких аптечных
      киосков в Красногорском районе Московской области. А возглавил его провизор, выпускник первого
      мед.института им. Сеченова — Евгений Нифантьев. А в 2013 году, на улице Толбухина, была открыта первая
      аптека под брендом «Столички», в которую потянулись не только местные жители, но и люди из окрестных
      микрорайонов и даже подмосковного Одинцово. Стало понятно, что формат социальной аптеки востребован
      населением и «Столички» стали открываться одна за одной, стремительно расширяя географию присутствия.
    </div>

    <div className="bg-gray-50 rounded-2xl p-6 mb-10">
      <h2 className="text-xl font-bold mb-5">История нашего развития</h2>
      <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
        {historyPeriods.map(p => (
          <div key={p.years}>
            <h3 className="font-bold text-primary-500 mb-2">{p.years}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>
    </div>

    <h2 className="text-xl font-bold mb-1">Сегодня "Аптека"</h2>
    <p className="text-sm text-gray-500 mb-5">…это -</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
      {stats.map((s, i) => {
        const Icon = s.icon
        return (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-3">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500">
              <Icon size={18} />
            </div>
            <p className="text-xs text-gray-500">
              Более чем <span className="font-bold text-gray-900">{s.value}</span> {s.label}
            </p>
          </div>
        )
      })}
    </div>

    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold mb-1">Наша лицензия</h2>
        <p className="text-sm text-gray-500">Копии сертификатов и лицензий на фармацевтическую деятельность</p>
      </div>
      <Link
        to="/license"
        className="shrink-0 px-5 py-2.5 rounded-full bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition"
      >
        Смотреть лицензию
      </Link>
    </div>
  </div>
)

export default About