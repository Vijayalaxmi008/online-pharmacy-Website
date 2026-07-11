import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, Package, Truck, ShieldCheck, Wallet, MessageCircle,
  Pill, FlaskConical, Sparkles, Users, Stethoscope, PawPrint, Baby, Eye, Activity,
  Info, ChevronDown, Star,
} from 'lucide-react'
import ProductCard from '../components/ProductCard'
import HitCard from '../components/HitCard'
import { products, hitsProducts } from '../data/products'
import {
  partnerLogos, howItWorks, aboutParagraphs, alphabetCategoryGroups, reviews, diseases,
} from '../data/categories'
import oralBImage from '../assets/images/banners/Oral-B.png'
import niveaImage from '../assets/images/banners/neviaCare.png'
import reviewOne from '../assets/images/Categories/review1.jpg'
import reviewTwo from '../assets/images/Categories/review2.jpg'
import reviewThree from '../assets/images/Categories/ladyAvacado.jpg'
import partnersImage from '../assets/images/Categories/PartnerLogo.png'

const ALPHABET_RU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const ALPHABET_EN = 'abcdefghijklmnopqrstuvwxyz'.split('')

const FEATURES = [
  { icon: Package, title: 'Assortment', desc: 'Promotions, vitamins, medicines, equipment and cosmetics' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Quick delivery to any location' },
  { icon: ShieldCheck, title: 'Guarantee', desc: 'All products are certified' },
  { icon: Wallet, title: 'Low Prices', desc: 'We work to keep prices affordable' },
  { icon: MessageCircle, title: '4349 Reviews', desc: 'Satisfied pharmacy customers' },
]

const Stars = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-0.5 text-gold-500 shrink-0">
    {[1, 2, 3, 4, 5].map(i => (
      <Star
        key={i}
        size={size}
        className={i <= rating ? 'fill-gold-500 text-gold-500' : 'fill-gray-200 text-gray-200'}
      />
    ))}
  </div>
)

const CATEGORY_ICONS = {
  medicines: Pill,
  vitamins: FlaskConical,
  cosmetics: Sparkles,
  hygiene: Users,
  medical: Stethoscope,
  pets: PawPrint,
  baby: Baby,
  lenses: Eye,
  equipment: Activity,
}

const Home = () => {
  const [searchMode, setSearchMode] = useState('alphabet')
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const promoProducts = products.slice(0, 5)
  const promoProducts2 = [...products].reverse().slice(0, 5)
  const reviewImages = [reviewOne, reviewTwo, reviewThree]

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HERO: banners + hit cards */}
      <section className="container mx-auto px-4 pt-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between gap-4 overflow-hidden min-h-[260px]">
            <div className="relative z-10 max-w-sm">
              <h2 className="text-xl font-bold mb-2">Oral-B vitality</h2>
              <p className="text-sm text-gray-500 mb-4">Electric toothbrush</p>
              <p className="text-xs text-gray-400 mb-4 max-w-xs">
                Clinically proven to clean teeth more effectively than a regular manual toothbrush.
              </p>
              <Link to="/catalog" className="inline-block bg-primary-500 text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-primary-600">
                GO TO CATALOG
              </Link>
            </div>
            <img
              src={oralBImage}
              alt="Oral-B vitality"
              className="hidden sm:block w-56 lg:w-72 max-h-64 object-contain shrink-0 -mr-8"
            />
          </div>

          <div className="bg-gradient-to-br from-pink-200 to-pink-50 rounded-2xl shadow-sm p-5 flex flex-col justify-between overflow-hidden min-h-[260px]">
            <div className="relative z-10">
              <h3 className="font-bold text-base mb-1">Nivea Care</h3>
              <p className="text-xs text-gray-600">Moisturizing face cream</p>
            </div>
            <img src={niveaImage} alt="Nivea Care" className="w-full h-32 object-contain my-2" />
            <Link to="/catalog" className="self-start bg-white text-primary-600 text-xs font-bold px-4 py-2 rounded-full mt-4 hover:bg-gray-50">
              GO TO CATALOG
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            {hitsProducts.map(p => <HitCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white rounded-2xl p-5 text-center shadow-sm">
              <div className="w-12 h-12 mx-auto mb-2 bg-primary-50 rounded-lg flex items-center justify-center">
                <f.icon size={22} className="text-primary-500" />
              </div>
              <h3 className="font-bold text-sm mb-1">{f.title}</h3>
              <p className="text-[10px] text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DEAL OF THE MONTH */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Deal of the Month</h2>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500">
              <ChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white text-gray-500">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-3">
          {promoProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {promoProducts2.map((p) => <ProductCard key={`b-${p.id}`} product={p} />)}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">How do we work?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {howItWorks.map(s => (
            <div key={s.step} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center shrink-0">{s.step}</span>
                <h3 className="font-bold text-sm">{s.title}</h3>
              </div>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AVERAGE RATING + REVIEWS */}
      <section className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 grid md:grid-cols-[220px_1fr] gap-6">
          <div>
            <h3 className="font-bold text-sm mb-1 text-gray-900">Average Pharmacy Rating</h3>
            <div className="text-4xl font-bold my-2 text-gray-900">4.8</div>
            <Stars rating={5} size={16} />
            <p className="text-xs text-gray-500 mt-1 mb-4">Overall rating based on 4349 customer reviews</p>
            <Link to="/feedback" className="inline-block bg-primary-500 text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-primary-600">
              LEAVE A REVIEW
            </Link>
          </div>
          <div>
            <div>
              {reviews.slice(0, 3).map((r, index) => (
                <Link key={r.id} to="/feedback" className="border-b border-gray-100 py-3 first:pt-0 last:border-b-0 last:pb-0 flex gap-3 transition hover:bg-gray-50 -mx-2 px-2 rounded-lg">
                  <img src={reviewImages[index]} alt={r.name} className="h-12 w-12 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0 flex items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-sm text-gray-900">{r.name}</span>
                      <span className="text-xs text-gray-400 ml-2">{r.date}</span>
                      <p className="text-sm text-navy-500 mt-0.5">{r.text}</p>
                    </div>
                    <Stars rating={r.rating} size={14} />
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/feedback" className="inline-block text-primary-500 text-xs font-bold mt-3 hover:underline">
              All 4349 reviews
            </Link>
          </div>
        </div>
      </section>

      {/* OUR PARTNERS */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Our Partners
          </h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
            src={partnersImage} 
            alt="Our Partners"
            className="w-full h-auto object-cover"
            />
            </div>
      </section>

    {/* ABOUT COMPANY */}
<section className="container mx-auto px-4 py-8">
  <h2 className="text-4xl font-extrabold text-navy-900 mb-8">
    About the Company
  </h2>

  <div className="bg-white rounded-3xl shadow-sm p-10">

    {/* Top 3 Columns */}

    <div className="grid lg:grid-cols-3 gap-10 text-[15px] leading-8 text-gray-500">

      <div className="space-y-8">
        <p>
          Barclay Plaza Business Centre class B+, built in 2008,
          despite its age, is one of the most in-demand Business
          Centres in the Western Administrative District of Moscow.
        </p>

        <p>
          Proximity to Kutuzovsky Prospekt, Minskaya St. and
          Moscow-City, as well as walking distance to three metro
          stations add to its relevance. Thus, Park Pobedy metro
          station is just 800 metres away.
        </p>

        <p>
          Barclay Plaza is distinguished by a stylish panoramic
          facade, an unusual entrance group and designer finishing
          of common areas and elevator halls.
        </p>
      </div>

      <div className="space-y-8">

        <div className="flex gap-4">
          <span className="w-3 h-3 rounded-full bg-teal-400 mt-3 shrink-0"></span>
          <p>
            Barclay Plaza Business Centre class B+, built in 2008,
            despite its age, is one of the most in-demand Business
            Centres in the Western Administrative District.
          </p>
        </div>

        <div className="flex gap-4">
          <span className="w-3 h-3 rounded-full bg-teal-400 mt-3 shrink-0"></span>
          <p>
            Proximity to Kutuzovsky Prospekt, Minskaya St. and
            Moscow-City, as well as walking distance to three metro
            stations add to its relevance. Thus, Park metro station.
          </p>
        </div>

        <div className="flex gap-4">
          <span className="w-3 h-3 rounded-full bg-teal-400 mt-3 shrink-0"></span>
          <p>
            Barclay Plaza is distinguished by a stylish panoramic
            facade, an unusual entrance group and designer finishing
            of common areas and elevator halls.
          </p>
        </div>

      </div>

      <div className="space-y-8">

        <p>
          Barclay Plaza Business Centre class B+, built in 2008,
          despite its age, is one of the most in-demand Business
          Centres in the Western Administrative District of Moscow.
        </p>

        <p>
          Proximity to Kutuzovsky Prospekt, Minskaya St. and
          Moscow-City, as well as walking distance to three metro
          stations add to its relevance. Thus, Park Pobedy metro
          station is just 800 metres away.
        </p>

        <p>
          Barclay Plaza is distinguished by a stylish panoramic
          facade, an unusual entrance group and designer finishing
          of common areas and elevator halls.
        </p>

      </div>

    </div>

    {/* Paragraph */}

    <div className="mt-10">

      <p className="text-gray-500 leading-8">
        Our company's activities are based on providing professional
        kitchen equipment to public catering establishments of any
        format: hotels, hostels, hypermarkets, canteens,
        kindergartens and schools. The speed of cooking dishes of
        any complexity and the quality of your chefs' work depends
        on the quality of the equipment.
      </p>

    </div>

    {/* Info Box */}

    <div className="mt-8 bg-gray-50 border rounded-3xl p-8 flex gap-5">

      <div className="w-10 h-10 rounded-full border-2 border-teal-400 flex items-center justify-center text-teal-400 font-bold text-xl">
        i
      </div>

      <p className="text-gray-500 leading-8">
        Our company's activities are based on providing professional
        kitchen equipment to public catering establishments of any
        format: hotels, hostels, hypermarkets, canteens,
        kindergartens and schools.
      </p>

    </div>

    {/* Expand */}

    {aboutExpanded && (

      <div className="mt-8">

        <p className="text-gray-500 leading-8">
          Our company's activities are based on providing
          professional kitchen equipment to public catering
          establishments of any format. We offer high-quality
          equipment for your business including thermal,
          refrigeration, laundry, coffee, bar and fast-food
          solutions.
        </p>

      </div>

    )}

    <button
      onClick={() => setAboutExpanded(!aboutExpanded)}
      className="mt-8 text-teal-500 uppercase font-bold tracking-wide hover:text-teal-700"
    >
      {aboutExpanded ? "❯❯ Collapse Text" : "❯❯ Expand Text"}
    </button>

  </div>
</section>

      {/* SEARCH BY ALPHABET */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Search by Alphabet</h2>
          <button
            onClick={() => setSearchMode(searchMode === 'disease' ? 'alphabet' : 'disease')}
            className="text-xs font-semibold text-primary-500 hover:underline"
          >
            Select a product by condition
          </button>
        </div>

        {searchMode === 'alphabet' ? (
          <div className="bg-white rounded-2xl shadow-sm p-5 flex flex-wrap items-center gap-1 text-xs text-gray-500">
            <button className="w-6 h-6 rounded bg-primary-500 text-white font-bold">A</button>
            {ALPHABET_RU.slice(1).map(l => <button key={l} className="w-6 h-6 rounded hover:bg-primary-50 hover:text-primary-500">{l}</button>)}
            <span className="mx-2 text-gray-300">|</span>
            {ALPHABET_EN.map(l => <button key={l} className="w-6 h-6 rounded hover:bg-primary-50 hover:text-primary-500">{l}</button>)}
            <span className="mx-2 text-gray-300">|</span>
            {[0,1,2,3,4,5,6,7,8,9].map(n => <button key={n} className="w-6 h-6 rounded hover:bg-primary-50 hover:text-primary-500">{n}</button>)}
            <span className="ml-auto text-2xl font-bold text-primary-200">A-Z</span>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h4 className="font-bold text-sm mb-3 text-primary-600">Choose a condition</h4>
            <div className="flex flex-wrap gap-2">
              {diseases.map(d => (
                <Link
                  key={d}
                  to={`/catalog?disease=${encodeURIComponent(d)}`}
                  className="text-xs text-gray-600 bg-gray-50 hover:bg-primary-50 hover:text-primary-600 px-3 py-1.5 rounded-full transition"
                >
                  {d}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CATEGORY GRID */}
      <section className="container mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {alphabetCategoryGroups.map(group => {
            const Icon = CATEGORY_ICONS[group.slug] || Package
            return (
              <div key={group.slug} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={18} className="text-primary-500" />
                  <h4 className="font-bold text-sm text-gray-900">{group.title}</h4>
                </div>
                <ul className="space-y-1.5 text-xs text-gray-500">
                  {group.items.slice(0, 5).map(item => (
                    <li key={item}>
                      <Link to={`/catalog?category=${group.slug}`} className="hover:text-primary-500">{item}</Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/catalog?category=${group.slug}`} className="inline-block text-primary-500 text-xs font-bold mt-3 hover:underline">
                  » All categories
                </Link>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default Home