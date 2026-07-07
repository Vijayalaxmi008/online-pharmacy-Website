import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Store, ClipboardList, PackageCheck } from 'lucide-react'
import moneyIllustration from '../assets/images/Privacy/privacy2.png'
import securityIllustration from '../assets/images/Privacy/privacy1.png'

// PAYMENT PAGE ("Payment") — replica of Payment.png reference

// Step 1-4 process cards
const paymentSteps = [
  { title: 'Select a product', description: 'Use the search function to find the product you need.', icon: ShoppingBag },
  { title: 'Select a pharmacy', description: 'Select a pharmacy from which it will be convenient for you to pick up the order', icon: Store },
  { title: 'Place an order', description: 'Follow the instructions and complete the order placement', icon: ClipboardList },
  { title: 'Receive the order', description: 'Pick up the order at the nearest pharmacy to you', icon: PackageCheck },
]

// Bank "logos" — text badges (no real bank artwork in project assets)
const bankLogos = [
  'Vbrr', 'Uralsib', 'Sber Bank', 'Rayffayzen', 'Vtb',
  'Pochta Bank', 'Mts Bank', 'Gazprombank', 'Citibank', 'Alfa Bank',
]

const cashPaymentFAQ = [
  {
    question: 'Where to pay',
    answer: 'Cash payment is available for courier delivery and at the pharmacy pickup location. Payment and delivery are made directly to the courier or cashier at the pharmacy upon receipt of your order. You will receive all necessary documents and a receipt along with your order.',
  },
  {
    question: 'Take a look?',
    answer: 'Copies of certificates and licenses are available upon request. To pay for your order in cash upon delivery or pickup, select "Cash" as the payment method during checkout and click "Place Order".',
    },
]

const securityInfo = {
  title: 'Security and the protection of personal data are ensured.',
  paragraphs: [
    'The organization\s diverse and extensive experience and established structure require defining and refining the development model..',
    'The task of the organization, and especially the new model of organizational activity, requires...',
    'High-level conceptual considerations, as well as the further development of various forms of activity, require refinement and the addition of an official website.',
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
          <Link to="/" className="hover:text-primary-500">Home</Link> / Payment
        </p>

        {/* Page title */}
        <h1 className="text-3xl font-bold mb-6">Payment</h1>

        {/* Introduction */}
        <p className="text-sm text-gray-600 leading-relaxed mb-10 max-w-4xl">
          The <b>Stolichki</b> social pharmacy chain is part of the <b>Neopharm</b> pharmacy holding. The first pharmacy in <b>Moscow</b> was opened in <b>2000</b>. 
          Our mission, from the very first day, has been simple: <b>to make medicines affordable in terms of price</b>. 
          We have reduced the path of medicines from the manufacturer to the consumer as much as possible. 
          By cooperating directly with manufacturers and distributors, we not only provide medicines at low prices but also guarantee the authenticity of our products.
          This version stays very close to the original wording while using natural, formal English appropriate for an official website.
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

        {/* Varianty rassrochki */}
        <section className="grid lg:grid-cols-2 gap-8 mb-14 items-stretch">
          <div>
            <h2 className="text-2xl font-bold mb-4">Installment options</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              The organization's diverse and extensive experience, along with its established structure, necessitate the definition and refinement of its development model.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              The task of the organization, and in particular the new model of organizational activity, requires definition.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Higher-order strategic considerations, together with the further development of various forms of activity, 
              require the definition and clarification of future directions for development.
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl p-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="text-white flex-1 space-y-3">
              <p className="text-sm leading-relaxed opacity-95">
                Our diverse experience and well-established organizational structure provide a strong foundation for continuous growth. 
                We are committed to defining, refining, and improving our development model to support innovation, operational excellence, and long-term sustainable success.
              </p>
              <p className="text-sm leading-relaxed opacity-95">
                The organization's objectives, and in particular its new model of organizational activity, require the definition and refinement of directions for progressive development.
              </p>
              <p className="text-sm leading-relaxed opacity-95">Higher-order strategic considerations.</p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone"
                  className="flex-1 px-4 py-2 rounded-full text-gray-900 text-sm focus:outline-none"
                />
                <button className="px-6 py-2 bg-white text-primary-600 font-bold text-xs rounded-full whitespace-nowrap hover:bg-gray-100">
                  Registration
                </button>
              </div>
              <p className="text-[11px] text-primary-100">
                By clicking the button, you agree to the processing of{' '}
                <Link to="/privacy" className="underline hover:text-white">personal data</Link>
              </p>
            </div>
            <img src={moneyIllustration} alt="Payment" className="w-full max-w-[260px] object-contain mx-auto" />
          </div>
        </section>

        {/* Payment nalichnymi */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Cash payment</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {cashPaymentFAQ.map((faq, index) => (
              <div key={index}>
                <h3 className="font-bold text-base mb-3">{faq.question}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Payment bankovskoy kartoy */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Payment by bank card</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-bold text-base mb-3">Which payment systems are accepted?</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Cash payment is available for both courier delivery and in-store pickup. 
                Payment is made directly to the courier upon delivery or to the cashier at the pharmacy when collecting your order.
                Along with your order, you will receive all the necessary documents and a cash receipt.
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
                Copies of certificates and licenses are available upon request. To pay for your order in cash upon receipt, select the <b>"Cash"</b> payment method during checkout and click <b>"Place Order."</b>
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base mb-3">{securityInfo.title}</h3>
              {securityInfo.paragraphs.map((p, i) => (
                <p key={i} className="text-sm text-gray-600 leading-relaxed mb-4">{p}</p>
              ))}
              <div className="flex items-center justify-center bg-primary-50 rounded-2xl p-6 mt-4">
                <img src={securityIllustration} alt="Zashchita personal data" className="w-full max-w-[280px] object-contain" />
              </div>
            </div>
          </div>
        </section>

        {/* Beznalichnyy raschet for yur. lits */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Cashless Payment for Legal Entities and Individual Entrepreneurs</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4 max-w-5xl">
            Our diverse experience and well-established organizational structure require the definition and refinement of our development model. 
            The organization's objectives, and in particular its new model of organizational activity, require the definition and clarification of directions for progressive development. 
            Higher-order strategic considerations, together with the continued development of various forms of activity, require the definition and clarification of future directions for development.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed max-w-5xl">
            Our diverse experience and continuous information and communication support for our activities enable us to assess the importance of our development model. 
            The organization's objectives, and in particular the daily work of establishing a clear operational framework, support the preparation and implementation of a personnel training system that meets current needs.
          </p>
        </section>

        {/* Teal contact info banner */}
        <section className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-2xl p-8 mb-8 text-center text-white">
          <p className="text-sm leading-relaxed max-w-3xl mx-auto">
            If you have any questions, please call our toll-free number.{' '}
            <a href="tel:88007772233" className="font-bold underline">8-800-777-22-33</a>, Please write down the email address.{' '}
            <a href="mailto:info@restoll.ru" className="font-bold underline">info@restoll.ru</a>. We to svyazi on
            We are available on weekdays from 9:00 to 18:00, and on weekends from 12:00 to 16:00.
          </p>
        </section>

        {/* White "Still have questions?" form block */}
        <section className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h3 className="text-xl font-bold mb-6">Still have questions?</h3>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row gap-3 md:items-center"
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
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
              By clicking the button, you agree to the processing of{' '}
              <Link to="/privacy" className="text-primary-500 hover:underline">personal data</Link>
            </p>
            <button
              type="submit"
              className="px-6 py-3 bg-primary-500 text-white font-bold text-xs rounded-full whitespace-nowrap hover:bg-primary-600 transition"
            >
              ASK A QUESTION
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}

export default Privacy
