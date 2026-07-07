import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Package, Truck, ShieldCheck, Wallet, MessageCircle } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import HitCard from '../components/HitCard'
import { products, hitsProducts } from '../data/products'
import {
  partnerLogos, howItWorks, aboutParagraphs, alphabetCategoryGroups, reviews, diseases,
} from '../data/categories'
import { blogPosts } from '../data/blog'
import oralBImage from '../assets/images/banners/Oral-B.png'
import niveaImage from '../assets/images/banners/neviaCare.png'
import reviewOne from '../assets/images/Categories/review1.jpg'
import reviewTwo from '../assets/images/Categories/review2.jpg'
import reviewThree from '../assets/images/Categories/ladyAvacado.jpg'


const ALPHABET_RU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const ALPHABET_EN = 'abcdefghijklmnopqrstuvwxyz'.split('')

const FEATURES = [
  { icon: Package, title: 'Assortment', desc: 'Promotions, vitamins, medicines, equipment and cosmetics' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Quick delivery to any location' },
  { icon: ShieldCheck, title: 'Guarantee', desc: 'All products are certified' },
  { icon: Wallet, title: 'Low Prices', desc: 'We work to keep prices affordable' },
  { icon: MessageCircle, title: '4349 Reviews', desc: 'Satisfied pharmacy customers' },
]

const Home = () => {
  const [searchMode, setSearchMode] = useState('alphabet') // 'alphabet' | 'disease'
  const promoProducts = products.slice(0, 5)
  const promoProducts2 = [...products].reverse().slice(0, 5)
  const blogPreview = blogPosts.slice(0, 4)
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

      {/* ACTION OF THE MONTH */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Monthly Promotion</h2>
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
          {promoProducts.map((p, i) => <ProductCard key={p.id} product={p} showNumber number={i + 1} />)}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {promoProducts2.map((p, i) => <ProductCard key={`b-${p.id}`} product={p} showNumber number={i + 6} />)}
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
            <h3 className="font-bold text-sm mb-1">Average Pharmacy Rating</h3>
            <div className="text-4xl font-bold my-2">4.8</div>
            <div className="flex text-gold-500 mb-1">★★★★★</div>
            <p className="text-xs text-gray-500 mb-4">Overall rating based on 4349 customer reviews</p>
            <Link to="/feedback" className="inline-block bg-primary-500 text-white text-xs font-bold px-4 py-2.5 rounded-full hover:bg-primary-600">
              LEAVE A REVIEW
            </Link>
          </div>
          <div>
            <div className="space-y-3">
              {reviews.slice(0, 3).map((r, index) => (
                <Link key={r.id} to="/feedback" className="border-b pb-3 last:border-b-0 flex gap-3 rounded-lg p-2 transition hover:bg-gray-50">
                  <img src={reviewImages[index]} alt={r.name} className="h-12 w-12 rounded-full object-cover shrink-0" />
                  <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-bold text-sm">{r.name}</div>
                    <div className="text-xs text-gray-400">{r.date}</div>
                    <div className="flex text-gold-500 ml-auto text-xs">{'★'.repeat(r.rating)}</div>
                  </div>
                  <p className="text-xs text-gray-600">{r.text}</p>
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

      {/* PARTNERS */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Our Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {partnerLogos.map((p, i) => (
            <div key={i} className="bg-white rounded-xl p-3 shadow-sm h-16 flex items-center justify-center border border-gray-100">
              <span className="text-sm font-bold text-gray-700 tracking-wide text-center leading-tight">{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="container mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900">About Company</h2>
        <ul className="space-y-3 text-sm text-gray-600 leading-relaxed">
          {aboutParagraphs.map((p, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-primary-500 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ALPHABET / DISEASE SEARCH */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setSearchMode('alphabet')}
            className={`text-sm font-bold px-4 py-2 rounded-full transition ${
              searchMode === 'alphabet' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 shadow-sm'
            }`}
          >
            Alphabet Search
          </button>
          <button
            onClick={() => setSearchMode('disease')}
            className={`text-sm font-bold px-4 py-2 rounded-full transition ${
              searchMode === 'disease' ? 'bg-primary-500 text-white' : 'bg-white text-gray-600 shadow-sm'
            }`}
          >
            Choose products by condition
          </button>
        </div>

        {searchMode === 'alphabet' && (
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4 flex flex-wrap items-center gap-1 text-xs text-gray-500">
            {ALPHABET_RU.map(l => <button key={l} className="w-6 h-6 rounded hover:bg-primary-50 hover:text-primary-500">{l}</button>)}
            <span className="mx-2 text-gray-300">|</span>
            {ALPHABET_EN.map(l => <button key={l} className="w-6 h-6 rounded hover:bg-primary-50 hover:text-primary-500">{l}</button>)}
            <span className="mx-2 text-gray-300">|</span>
            {[0,1,2,3,4,5,6,7,8,9].map(n => <button key={n} className="w-6 h-6 rounded hover:bg-primary-50 hover:text-primary-500">{n}</button>)}
            <span className="ml-auto text-2xl font-bold text-primary-200">A-Z</span>
          </div>
        )}

        {searchMode === 'alphabet' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alphabetCategoryGroups.map(group => (
              <div key={group.slug} className="bg-white rounded-2xl shadow-sm p-5">
                <h4 className="font-bold text-sm mb-3 text-primary-600">{group.title}</h4>
                <ul className="space-y-1.5 text-xs text-gray-500">
                  {group.items.map(item => (
                    <li key={item}>
                      <Link to={`/catalog?category=${group.slug}`} className="hover:text-primary-500">{item}</Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/catalog?category=${group.slug}`} className="inline-block text-primary-500 text-xs font-bold mt-3 hover:underline">
                  All categories
                </Link>
              </div>
            ))}
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

      {/* BLOG */}
      <section className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Health Blog</h2>
          <Link to="/blog" className="text-primary-500 text-sm font-bold hover:underline">Latest posts</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {blogPreview.map(post => (
            <Link key={post.id} to={`/blog/${post.id}`} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col">
              <img src={post.image} alt={post.title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="text-xs font-bold mb-1.5 line-clamp-2">{post.title}</h3>
                <p className="text-[10px] text-gray-500 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
