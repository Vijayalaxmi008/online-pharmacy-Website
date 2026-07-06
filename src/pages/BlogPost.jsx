import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { blogPosts, relatedPostLinks } from '../data/blog'

const BlogPost = () => {
  const { id } = useParams()
  const post = blogPosts.find(p => p.id === Number(id)) || blogPosts[0]
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const sections = [
    { h: 'Гормональный баланс и его роль', p: 'С другой стороны, начало повседневной работы по формированию позиции обеспечивает широкому кругу специалистов участие в формировании позиций, занимаемых участниками в отношении поставленных задач. Разнообразный и богатый опыт постоянное информационно-пропагандистское обеспечение нашей деятельности требует от нас анализа систем массового участия.' },
    { h: 'Как поддерживать баланс естественно', p: 'Товарищи! реализация намеченных плановых заданий позволяет оценить значение направлений прогрессивного развития. Значимость этих проблем настолько очевидна, что укрепление и развитие структуры играет важную роль в формировании новых предложений.' },
    { h: 'Питание и физическая активность', p: 'Равным образом рамки и место обучения кадров обеспечивает широкому кругу специалистов участие в формировании позиций, занимаемых участниками в отношении поставленных задач.' },
  ]

  const reviews = [
    { name: 'Елена', date: '2 дня назад', text: 'Очень полезная статья, спасибо! Как раз искала подобную информацию.' },
    { name: 'Владимир', date: '5 дней назад', text: 'Интересный взгляд на проблему, применил рекомендации на практике.' },
  ]

  return (
    <div>
      <div className="bg-gradient-to-br from-navy-500 to-primary-500 text-white">
        <div className="container mx-auto px-4 py-10">
          <p className="text-xs text-primary-100 mb-3">
            <Link to="/" className="hover:text-white">Главная</Link> / <Link to="/blog" className="hover:text-white">Блог о здоровье</Link> / Статья
          </p>
          <h1 className="text-2xl md:text-3xl font-bold max-w-3xl">{post.title}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-[220px_1fr] gap-6">
        <aside className="hidden lg:block text-xs space-y-2">
          <div className="bg-white rounded-2xl shadow-sm p-4 sticky top-24">
            <h4 className="font-bold text-sm mb-2">Содержание</h4>
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
              <span className="font-bold">Понравилась статья?</span> Поделитесь ссылкой с друзьями!
              <div className="flex gap-2 mt-2">
                {['VK', 'OK', 'TG', 'WA', 'FB'].map(s => (
                  <button key={s} className="w-8 h-8 rounded-full bg-gray-100 text-xs font-bold hover:bg-primary-100">{s}</button>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold mb-1">Оцените статью</div>
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
            <h4 className="font-bold text-sm mb-2">Читайте также:</h4>
            <ul className="text-sm text-primary-500 space-y-1.5">
              {relatedPostLinks.map(l => (
                <li key={l}><a href="#" className="hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
            <h4 className="font-bold mb-3">Оставить комментарий</h4>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2 text-sm">
              <div className="grid sm:grid-cols-2 gap-2">
                <input placeholder="Ваше имя" className="px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none" />
                <input placeholder="Ваша почта" className="px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none" />
              </div>
              <textarea placeholder="Напишите свой комментарий" rows={3} className="w-full px-3 py-2 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none" />
              <button className="bg-primary-500 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-primary-600">Отправить</button>
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