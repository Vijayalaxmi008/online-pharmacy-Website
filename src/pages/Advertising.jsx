import { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import {
  Heart, MessageCircle, Share2, ChevronDown, ChevronUp,
  Bookmark, Star, Quote, Link2, ArrowUp, Facebook, Send,
} from 'lucide-react'
import ladyModelImg from '../assets/images/Categories/ladyModel.png'
import blackLadyImg from '../assets/images/Categories/blackLady.png'
import ladyAvacadoImg from '../assets/images/Categories/ladyAvacado.jpg'
import review1Img from '../assets/images/Categories/review1.jpg'
import review2Img from '../assets/images/Categories/review2.jpg'
import bicyclolImg from '../assets/images/products/bicyclol.png'
import femibionImg from '../assets/images/products/femibion.png'

// ARTICLE PAGE — replica of Article_page.png reference

const article = {
  title: 'Remaing a Women. How does hormal balance help you stay young and beautiful?',
  image: ladyModelImg,
  readTime: '10 minutes to read',
  category: 'Category name',
  producer: 'Manufacturer',
  about: 'About o product',
  indications: 'Indications',
  rating: 4.9,
}

// Table of contents (left sidebar)
const tableOfContents = [
  'Attend preparatory courses',
  'Review and filter information',
  'Reading books, watching educational',
  'Do physical activity',
  'About last point will be discussed',
  'Review and filter information',
]

const numberedSteps = [
  'On other hand start daily work on forming position provides wide range specialists participation in formation directions progressive development.',
  'Daily practice shows, that consultation with broad group requires from us analysis positions, held participants in regarding assigned tasks.',
  'Likewise similarly start daily work on forming position allows evaluate importance new proposals.',
  'Do not should, however forget, that further development various forms activity supports preparation and implementation new proposals.',
]

// Placeholder data table rows (matches table layout in reference)
const tableRows = [
  { slot: 10, name: 'Maria Kuznetsova', address: 'St.. Lenina, 12, Moscow', phone: '+7 (495) 555-01-04' },
  { slot: 1, name: 'Irina Sokolova', address: 'Ave.. Mira, 48, Saint Petersburg', phone: '+7 (812) 555-01-24' },
  { slot: 2, name: 'Victoria Morozova', address: 'St.. Gagarina, 5, Kazan', phone: '+7 (843) 555-01-25' },
  { slot: 3, name: 'Elena Volkova', address: 'St.. Sadovaya, 10, Novosibirsk', phone: '+7 (383) 555-01-27' },
  { slot: 9, name: 'Stella Orlova', address: 'St.. Pushkina, 6, Yekaterinburg', phone: '+7 (343) 555-01-14' },
  { slot: 6, name: 'Ksenia Alexandrova', address: 'St.. Chekhova, 24, Nizhny Novgorod', phone: '+7 (831) 555-01-15' },
  { slot: 8, name: 'Guzel Richards', address: 'St.. Pobedy, 3, Rostov-on-Don', phone: '+7 (863) 555-01-19' },
  { slot: 3, name: 'Kylie Murphy', address: 'St.. Zavodskaya, 8, Samara', phone: '+7 (846) 555-01-23' },
  { slot: 3, name: 'Maria Bell', address: 'St.. Dachnaya, 3, Ufa', phone: '+7 (347) 555-01-30' },
]

const relatedProducts = [
  { name: 'Bicyclol tablets, film. coated. 3 mg, 30 pcs.', price: '15 108 RUB', image: bicyclolImg },
  { name: 'Femibion tablets, film. coated. 3 mg, 30 pcs.', price: '26 000 RUB', image: femibionImg },
]
const comboTotal = { old: '49 850 RUB', new: '41 108 RUB' }

const reviews = [
  { author: 'Elena', rating: 4, date: '2 weeks ago', avatar: review1Img,
    text: 'Booked here to procedures with discount. Today visited to see office and parking, everything clean and tidy, staff friendly and welcoming, impression very good.' },
  { author: 'Vladimir', rating: 4, date: '3 weeks ago', avatar: review2Img,
    text: 'Good service, helped quickly and professionally. Pharmacy in walking distance, have parking. will return again.' },
  { author: 'Vladimir', rating: 4, date: '1 month ago', avatar: review2Img,
    text: 'Good service, pleasant prices to product. Thank you for consultation, everything in detail explained.' },
]

const relatedArticles = [
  'Silver ions silver in treatment wounds and burns',
  'How hormonal balance allows stay young and beautiful?',
  'Active life without «hot flashes» — everything in your hands',
  'First aid kit traveler: that do, if child hurt knee',
]

const Advertising = () => {
  const [liked, setLiked] = useState(false)
  const [tocOpen, setTocOpen] = useState(true)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 pt-4">
        <p className="text-xs text-gray-500">
          <Link to="/" className="hover:text-primary-500">Home</Link> / Medicines / Hormonal medicines
        </p>
      </div>

      {/* Hero with overlaid title */}
      <section className="relative mt-4">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] md:aspect-[3/1]">
            <img
              src={article.image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover object-[75%_30%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <button
              onClick={() => setLiked(!liked)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white"
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} className={liked ? 'text-red-500' : 'text-gray-700'} />
            </button>
            <h1 className="absolute bottom-6 left-6 right-6 text-white text-xl md:text-3xl font-bold leading-snug max-w-2xl">
              {article.title}
            </h1>
          </div>
        </div>
        <a
          href="#top"
          className="hidden lg:flex fixed right-6 bottom-24 w-11 h-11 rounded-full bg-primary-500 text-white items-center justify-center shadow-lg hover:bg-primary-600 z-10"
        >
          <ArrowUp size={20} />
        </a>
      </section>

      {/* Meta row */}
      <div className="container mx-auto px-4 py-5 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
          <span>{article.readTime}</span>
          <span className="text-primary-500 font-semibold">{article.category}</span>
          <span>{article.producer}</span>
          <span>{article.about}</span>
          <span>{article.indications}</span>
          <span className="flex items-center gap-1 font-semibold text-gray-700">
            Rating {article.rating}
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className={i < Math.round(article.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
            ))}
          </span>
          <button className="ml-auto flex items-center gap-1 text-primary-500 font-semibold hover:underline">
            <Bookmark size={14} /> Read later
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          {/* LEFT: Table of contents sidebar */}
          <aside className="lg:order-1 order-2">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sticky top-4">
              <button
                onClick={() => setTocOpen(!tocOpen)}
                className="w-full flex items-center justify-between font-bold text-sm mb-3"
              >
                Contents
                {tocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {tocOpen && (
                <ul className="space-y-2">
                  {tableOfContents.map((item, i) => (
                    <li key={i}>
                      <a href={`#toc-${i}`} className="text-xs text-gray-600 hover:text-primary-500 leading-relaxed block">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>

          {/* RIGHT: Main article content */}
          <article className="lg:order-2 order-1 prose max-w-none">
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              On the other hand, our daily efforts to strengthen our position encourage broad collaboration among specialists in shaping our future development. 
              Continuous improvement and professional development enable us to refine our development model and support sustainable growth while maintaining high standards of service.
            </p>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">Heading h2</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              On the other hand, our daily efforts to strengthen our position encourage the participation of a wide range of specialists in shaping the direction of 
              our continued development. Daily practice demonstrates that consultation with a broad group of experts enables us to analyze different perspectives 
              and effectively address the tasks and objectives before us.
            </p>

            <div className="bg-primary-50 border-l-4 border-primary-400 rounded-r-xl p-6 mb-6 flex gap-4">
              <Quote size={28} className="text-primary-400 shrink-0" />
              <p className="text-sm text-gray-700 leading-relaxed italic">
               Likewise, the new organizational model supports the implementation and modernization of our development processes. 
               By continuously improving the way we operate, we enhance efficiency, strengthen our services, and ensure sustainable growth to meet evolving 
               customer and business needs.
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-10">
              Daily practice demonstrates that the continued development of various areas of our operations plays an important role in the organization's success.
              Our well-established organizational structure enables us to carefully evaluate new ideas and initiatives, ensuring they contribute to continuous 
              improvement and long-term growth.
            </p>

            {/* Combo offer */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 mb-10">
              <h3 className="text-lg font-bold mb-6">Pay Attention</h3>
              <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                {relatedProducts.map((p, i) => (
                  <Fragment key={p.name}>
                    <div className="w-32">
                      <img src={p.image} alt={p.name} className="w-full h-24 object-contain mb-2" />
                      <p className="text-xs text-gray-600 leading-snug">{p.name}</p>
                    </div>
                    {i === 0 && <span className="text-2xl text-gray-300 font-light">+</span>}
                  </Fragment>
                ))}
                <span className="text-2xl text-gray-300 font-light">=</span>
                <div className="min-w-[140px]">
                  <p className="text-xs text-gray-400 line-through">{comboTotal.old}</p>
                  <p className="text-lg font-bold text-primary-600">{comboTotal.new}</p>
                  <button className="mt-2 px-5 py-2 bg-primary-500 text-white rounded-full text-xs font-bold hover:bg-primary-600">
                    ADD TO CART
                  </button>
                </div>
              </div>
            </section>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">Heading h3</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
             Our daily efforts to strengthen our position encourage the active participation of specialists from diverse fields in shaping the direction of our continued development. 
             Through collaboration and shared expertise, we are able to drive innovation, support sustainable growth, and achieve our long-term organizational objectives.
            </p>
            <ol className="space-y-3 mb-10">
              {numberedSteps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">Heading h4</h2>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                <Link2 size={24} className="text-primary-500" />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
            Our daily efforts to strengthen our position encourage the involvement of specialists from various fields in shaping the direction of our progressive development.
            The collaboration of experienced professionals helps us develop effective strategies and continuously improve our operations.
              </p>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-10">
              Our strategic vision and well-established organizational structure represent an important foundation for evaluating and improving key financial and administrative processes. 
              This approach allows us to analyze existing conditions, identify opportunities, and ensure effective organizational development.
            </p>

            {/* Data table */}
            <div className="overflow-x-auto mb-10 rounded-xl border border-gray-200">
              <table className="w-full text-xs">
                <thead className="bg-primary-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Slot</th>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Address</th>
                    <th className="px-4 py-3 text-left font-semibold">Phone</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {tableRows.map((row, i) => (
                    <tr key={i} className={i % 2 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-2 text-gray-500">{row.slot}</td>
                      <td className="px-4 py-2 text-gray-700 font-medium">{row.name}</td>
                      <td className="px-4 py-2 text-gray-500">{row.address}</td>
                      <td className="px-4 py-2 text-gray-500">{row.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">Heading h5</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              Our continuous efforts to strengthen our position encourage the active involvement of specialists from various fields in defining the direction of our progressive development. 
              By combining expertise and experience, we create effective strategies that support innovation, improvement, and sustainable growth.
            </p>

            <Link
              to="#"
              className="flex flex-col sm:flex-row gap-4 bg-white rounded-xl border border-gray-200 p-4 mb-6 hover:shadow-md transition group"
            >
              <img src={blackLadyImg} alt="Podgotovka k materinstvu" className="w-full sm:w-40 h-32 object-cover rounded-lg shrink-0" />
              <div>
                <p className="font-bold text-sm text-gray-900 group-hover:text-primary-600 mb-2">
                  Is a woman preparing for the arrival of a baby? Explain how to add this to the official website.
                </p>
                <span className="text-xs text-primary-500 font-semibold">Chitat podrobnee →</span>
              </div>
            </Link>

            <ul className="space-y-3 mb-10">
              {numberedSteps.slice(0, 4).map((item, i) => (
                <li key={i} className="text-sm text-gray-600 leading-relaxed flex gap-2">
                  <span className="text-primary-500 shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold mb-4 text-gray-900">Heading h6</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              On other hand start daily work on forming position provides wide
              range specialists participation in formation directions progressive development.
            </p>
            <div className="relative rounded-xl overflow-hidden mb-6 h-56">
              <img src={ladyAvacadoImg} alt="Ukhod for kozhey" className="absolute inset-0 w-full h-full object-cover" />
              <button className="absolute inset-0 flex items-center justify-center">
                <span className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <span className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-primary-500 ml-1" />
                </span>
              </button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-10">
              Our diverse and rich experience, constant quantitative growth, and the scope of our activities play an important role in shaping progressive development trends.
            </p>

            {/* Share / rate row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-b border-gray-200 py-6 mb-10">
              <div>
                <p className="font-bold text-sm mb-3">Did you like the article?</p> <p>Share the link with your friends!</p>
                <div className="flex items-center gap-3 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-primary-500 text-xs"><Facebook size={16} /> 104</button>
                  <button className="flex items-center gap-1 hover:text-primary-500 text-xs"><Share2 size={16} /> 172</button>
                  <button className="flex items-center gap-1 hover:text-primary-500 text-xs"><Send size={16} /> 407</button>
                </div>
              </div>
              <div>
                <p className="font-bold text-sm mb-2 text-right">Rate the article</p>
                <div className="flex gap-1 justify-end">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
              </div>
            </div>

            {/* Chitayte also */}
            <section className="mb-10">
              <h3 className="text-lg font-bold mb-4">Read also</h3>
              <ul className="space-y-3">
                {relatedArticles.map((title, i) => (
                  <li key={i}>
                    <Link to="#" className="text-sm text-primary-600 hover:underline flex gap-2">
                      <span className="text-gray-400 shrink-0">›</span>{title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Comment form */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-lg font-bold mb-6">Leave a comment</h3>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3 mb-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Your name"
                    className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your e-mail"
                    className="px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Rating page:</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-gray-300" />
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-500 text-white font-semibold text-sm rounded-full hover:bg-primary-600 transition"
                >
                  SEND
                </button>
              </form>
            </section>

            {/* Existing reviews */}
            <section className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="flex gap-3 pb-6 border-b border-gray-200 last:border-0">
                  <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <p className="font-bold text-sm">{review.author}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={13} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-2">{review.text}</p>
                    <button className="flex items-center gap-1 text-xs text-primary-500 font-semibold hover:underline">
                      <MessageCircle size={13} /> Answer
                    </button>
                  </div>
                </div>
              ))}
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}

export default Advertising
