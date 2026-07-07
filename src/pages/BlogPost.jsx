import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogPosts, relatedPostLinks } from '../data/blog'

const BlogPost = () => {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === Number(id)) || blogPosts[0]
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const sections = [
    { h: 'hormonal balance and ego rol', p: 'On other hand, start daily work on forming position provides wide range specialists participation in formation positions, held participants in regarding assigned tasks. Raznoobraznyy and bogatyy opyt postoyannoe informatsionno-propagandistskoe obespechenie nashey activity requires from us analysis sistem massovogo uchastiya.' },
    { h: 'How podderzhivat balance estestvenno', p: 'Tovarishchi! realizatsiya namechennykh planovykh zadaniy allows evaluate importance directions progressive development. Znachimost etikh problem nastolko ochevidna, that ukreplenie and development struktury igraet vazhnuyu rol in formation new proposals.' },
    { h: 'Pitanie and fizicheskaya aktivnost', p: 'Likewise similarly ramki and mesto obucheniya kadrov provides wide range specialists participation in formation positions, held participants in regarding assigned tasks.' },
  ]

  const reviews = [
    { name: 'Elena', date: '2 dnya ago', text: 'Ochen poleznaya statya, spasibo! How raz iskala podobnuyu information.' },
    { name: 'Vladimir', date: '5 dney ago', text: 'Interesnyy vzglyad to problemu, primenil rekomendatsii to praktike.' },
  ]

  return (
    <div>
      <div className="bg-gradient-to-br from-navy-500 to-primary-500 text-white">
        <div className="container mx-auto px-4 py-10">
          <p className="text-xs text-primary-100 mb-3">
            <Link to="/" className="hover:text-white">Home</Link> / <Link to="/blog" className="hover:text-white">Health Blog</Link> / Statya
          </p>
          <h1 className="text-2xl md:text-3xl font-bold max-w-3xl">{post.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="hidden lg:block text-xs space-y-2">
          <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
            <h4 className="font-bold text-sm mb-2">Contents</h4>
            <ul className="space-y-2 text-gray-600">
              {sections.map(s => <li key={s.h} className="hover:text-primary-500 cursor-pointer">{s.h}</li>)}
            </ul>
          </div>
        </aside>

        <article>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>

          {sections.map(s => (
            <div key={s.h} className="mb-6">
              <h2 className="text-lg font-bold mb-2">{s.h}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{s.p}</p>
            </div>
          ))}

          <div className="flex items-center justify-between border-t pt-4 mt-6 mb-8">
            <div className="text-sm">
              <span className="font-bold">Ponravilas statya?</span> Podelites ssylkoy with druzyami!
              <div className="flex gap-2 mt-2">
                {['VK', 'OK', 'TG', 'WA', 'FB'].map(s => (
                  <button key={s} className="w-8 h-8 rounded-full bg-gray-100 text-xs font-bold hover:bg-primary-100">{s}</button>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold mb-1">Rate the article</div>
              <div className="flex gap-0.5 justify-end">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHoverRating(n)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`text-xl ${n <= (hoverRating || rating) ? 'text-gold-500' : 'text-gray-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="font-bold text-sm mb-2">Chitayte also:</h4>
            <ul className="text-sm text-primary-500 space-y-1.5">
              {relatedPostLinks.map(l => (
                <li key={l}><a href="#" className="hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
            <h4 className="font-bold mb-3">Leave a comment</h4>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2 text-sm">
              <div className="grid sm:grid-cols-2 gap-2">
                <input placeholder="Your name" className="px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none" />
                <input placeholder="Your email" className="px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none" />
              </div>
              <textarea placeholder="Write your comment" rows={3} className="w-full px-3 py-2 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none" />
              <button className="bg-primary-500 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-primary-600">Send</button>
            </form>
          </div>

          <div className="space-y-3">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-navy-500 to-primary-500 text-white flex items-center justify-center text-xs font-bold">{r.name[0]}</div>
                  <div>
                    <div className="text-sm font-bold">{r.name}</div>
                    <div className="text-[10px] text-gray-500">{r.date}</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{r.text}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}

export default BlogPost
