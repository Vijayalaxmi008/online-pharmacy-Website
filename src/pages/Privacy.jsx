import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Store, ClipboardList, PackageCheck } from 'lucide-react'
import moneyIllustration from '../assets/images/Privacy/privacy2.png'
import securityIllustration from '../assets/images/Privacy/privacy1.png'

// PAYMENT PAGE ("Оплата") — replica of Оплата.png reference

// Step 1-4 process cards
const paymentSteps = [
  { title: 'Выберите товар', description: 'Воспользуйтесь поиском, чтобы найти необходимый товар', icon: ShoppingBag },
  { title: 'Выберите аптеку', description: 'Выберите аптеку, из которой вам будет удобно забрать заказ', icon: Store },
  { title: 'Оформите заказ', description: 'Следуйте инструкциям и завершите оформление заказа', icon: ClipboardList },
  { title: 'Получите заказ', description: 'Заберите заказ в ближайшей к Вам аптеке', icon: PackageCheck },
]

// Bank "logos" — text badges (no real bank artwork in project assets)
const bankLogos = [
  'ВБРР', 'Уралсиб', 'Сбер Банк', 'Райффайзен', 'ВТБ',
  'Почта Банк', 'МТС Банк', 'Газпромбанк', 'Citibank', 'Альфа Банк',
]

const cashPaymentFAQ = [
  {
    question: 'Где оплачивать',
    answer: 'Наличный расчет возможен при курьерской доставке, а также в пункте самовывоза. Оплата заказа и доставки осуществляется непосредственно курьеру или кассиру в аптеке при получении заказа, вместе с заказом вы получаете все необходимые документы и кассовый чек.',
  },
  {
    question: 'Есть ли чек?',
    answer: 'Наличный расчет возможен при курьерской доставке, а также в пункте самовывоза. Оплата заказа и доставки осуществляется непосредственно курьеру или кассиру в аптеке при получении заказа, вместе с заказом вы получаете все необходимые документы и кассовый чек.',
  },
]

const securityInfo = {
  title: 'Как обеспечивается безопасность и защита персональных данных',
  paragraphs: [
    'Разнообразный и богатый опыт сложившаяся структура организации требует определения и уточнения модели развития.',
    'Задача организации, в особенности же новая модель организационной деятельности требует.',
    'Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности требует и уточнения.',
  ],
}

const Privacy = () => {
  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [questionPhone, setQuestionPhone] = useState('')

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-500 mb-2">
          <Link to="/" className="hover:text-primary-500">Главная</Link> / Оплата
        </p>

        {/* Page title */}
        <h1 className="text-3xl font-bold mb-6">Оплата</h1>

        {/* Introduction */}
        <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-4xl">
          Сеть социальных аптек СТОЛИЧКИ является частью аптечного холдинга Неофарм. Первая аптека в Москве
          была открыта в 2000 году. Наша миссия с первого дня была проста: сделать лекарства доступными по
          цене. Мы максимально сократили путь медикаментов от производителя к потребителю. Сотрудничая
          напрямую с производителями и дистрибьюторами, мы не только предоставляем лекарства по низким
          ценам, а также гарантируем подлинность товаров.
        </p>

        {/* Step cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {paymentSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
                  <Icon size={26} className="text-primary-500" />
                </div>
                <h3 className="font-bold text-sm mb-1">{index + 1}. {step.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </section>

        {/* Варианты рассрочки */}
        <section className="grid lg:grid-cols-2 gap-8 mb-14 items-stretch">
          <div>
            <h2 className="text-2xl font-bold mb-4">Варианты рассрочки</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Разнообразный и богатый опыт сложившаяся структура организации требуют определения и уточнения
              модели развития.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Задача организации, в особенности же новая модель организационной деятельности требует
              определения.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности
              требуют определения и уточнения дальнейших направлений развития.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="text-white flex-1 space-y-3">
              <p className="text-sm leading-relaxed opacity-95">
                Разнообразный и богатый опыт сложившаяся структура организации требуют определения и
                уточнения модели развития.
              </p>
              <p className="text-sm leading-relaxed opacity-95">
                Задача организации, в особенности же новая модель организационной деятельности требуют
                определения и уточнения направлений прогрессивного развития.
              </p>
              <p className="text-sm leading-relaxed opacity-95">Идейные соображения высшего порядка.</p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ваш телефон"
                  className="flex-1 px-4 py-2 rounded-full text-gray-900 text-sm focus:outline-none"
                />
                <button className="px-6 py-2 bg-white text-primary-600 font-bold text-xs rounded-full whitespace-nowrap hover:bg-gray-100">
                  РЕГИСТРАЦИЯ
                </button>
              </div>
              <p className="text-[11px] text-primary-100">
                Нажимая на кнопку, вы соглашаетесь на обработку{' '}
                <Link to="/privacy" className="underline hover:text-white">персональных данных</Link>
              </p>
            </div>
            <img src={moneyIllustration} alt="Оплата" className="w-full max-w-[260px] object-contain mx-auto" />
          </div>
        </section>

        {/* Оплата наличными */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Оплата наличными</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {cashPaymentFAQ.map((faq, index) => (
              <div key={index}>
                <h3 className="font-bold text-base mb-3">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Оплата банковской картой */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Оплата банковской картой</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-base mb-3">Какие платежные системы принимаются?</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Наличный расчет возможен при курьерской доставке, а также в пункте самовывоза. Оплата заказа
                и доставки осуществляется непосредственно курьеру или кассиру в аптеке при получении заказа,
                вместе с заказом вы получаете все необходимые документы и кассовый чек.
              </p>
              <div className="grid grid-cols-5 gap-3">
                {bankLogos.map((bank, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-center text-center"
                  >
                    <span className="text-[11px] font-bold text-gray-700 leading-tight">{bank}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mt-6">
                Копии сертификатов и лицензий предоставляются по предварительному запросу. Чтобы оплатить
                заказ наличными при получении, при оформлении заказа выберите способ оплаты «Наличными» и
                нажмите «Оформить заказ».
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-3">{securityInfo.title}</h3>
              {securityInfo.paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed mb-4">{p}</p>
              ))}
              <div className="flex items-center justify-center bg-primary-50 rounded-2xl p-6 mt-4">
                <img src={securityIllustration} alt="Защита персональных данных" className="w-full max-w-[280px] object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Безналичный расчет для юр. лиц */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Безналичный расчет для юридических лиц или ИП</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-5xl">
            Разнообразный и богатый опыт сложившаяся структура организации требует определения и уточнения
            модели развития. Задача организации, в особенности же новая модель организационной деятельности
            требует определения и уточнения направлений прогрессивного развития. Идейные соображения высшего
            порядка, а также дальнейшее развитие различных форм деятельности требует определения и уточнения
            дальнейших направлений развития.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-5xl">
            Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей
            деятельности позволяет оценить значение модели развития. Задача организации, в особенности же
            начало повседневной работы по формированию позиции способствует подготовки и реализации системы
            обучения кадров, соответствует насущным потребностям.
          </p>
        </section>

        {/* Teal contact info banner */}
        <section className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl p-8 mb-8 text-center text-white">
          <p className="text-sm leading-relaxed max-w-3xl mx-auto">
            Если возникнут вопросы, звоните на бесплатный номер{' '}
            <a href="tel:88007772233" className="font-bold underline">8-800-777-22-33</a>, пишите на почту{' '}
            <a href="mailto:info@restoll.ru" className="font-bold underline">info@restoll.ru</a>. Мы на связи по
            будним дням с 9:00 до 18:00 часов, а по выходным с 12:00 до 16:00 часов.
          </p>
        </section>

        {/* White "Остались вопросы?" form block */}
        <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h3 className="text-xl font-bold mb-6">Остались вопросы?</h3>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row gap-3 md:items-center"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Иванов Иван Иванович"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none"
            />
            <input
              type="tel"
              value={questionPhone}
              onChange={(e) => setQuestionPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none"
            />
            <p className="text-[11px] text-gray-400 shrink-0 md:max-w-[180px]">
              Нажимая на кнопку, вы соглашаетесь на обработку{' '}
              <Link to="/privacy" className="text-primary-500 hover:underline">персональных данных</Link>
            </p>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-500 text-white font-bold text-xs rounded-full whitespace-nowrap hover:bg-primary-600 transition"
            >
              ЗАДАТЬ ВОПРОС
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Privacy
