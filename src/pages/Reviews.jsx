import { useState } from 'react'
import { Link } from 'react-router-dom'
import { reviews as seedReviews } from '../data/categories'

const RATING_BREAKDOWN = [
  { stars: 5, count: 671, pct: 75 },
  { stars: 4, count: 125, pct: 15 },
  { stars: 3, count: 38, pct: 7 },
  { stars: 2, count: 21, pct: 2 },
  { stars: 1, count: 11, pct: 1 },
]

const Reviews = () => {
  const [sort, setSort] = useState('date')
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const sorted = [...seedReviews].sort((a, b) =>
    sort === 'rating' ? b.rating - a.rating : b.id - a.id
  )

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Home</Link> / Reviews About Us
      </p>
      <h1 className="text-2xl font-bold mb-4">Reviews About Us</h1>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        <aside>
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
            <div className="text-sm text-gray-500 mb-1">Average rating</div>
            <div className="flex items-end gap-2 mb-1">
              <span className="text-4xl font-bold">4.8</span>
              <div className="flex text-gold-500 mb-1">★★★★★</div>
            </div>
            <p className="text-xs text-gray-500 mb-4">Overall rating to based on 4241 reviews</p>
            <button className="w-full bg-primary-500 text-white font-bold py-2.5 rounded-full text-sm hover:bg-primary-600">
              LEAVE REVIEW
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-2 text-xs">
            {RATING_BREAKDOWN.map(r => (
              <label key={r.stars} className="flex items-center gap-2 cursor-pointer">
                <span className="w-3">{r.stars}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div className="bg-gold-500 h-1.5 rounded-full" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="text-gray-500 w-14 text-right">{r.count} review.</span>
              </label>
            ))}
          </div>
        </aside>

        <div>
          <div className="flex items-center gap-2 mb-4 text-xs">
            <span className="text-gray-500">Sort:</span>
            <button
              onClick={() => setSort('date')}
              className={`px-3 py-1.5 rounded-full border ${sort === 'date' ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600'}`}
            >
              By date
            </button>
            <button
              onClick={() => setSort('rating')}
              className={`px-3 py-1.5 rounded-full border ${sort === 'rating' ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-200 text-gray-600'}`}
            >
              Most helpful
            </button>
          </div>

          <div className="space-y-3 mb-6">
            {sorted.map(r => (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-navy-500 to-primary-500 text-white flex items-center justify-center text-xs font-bold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{r.name}</div>
                    <div className="text-[10px] text-gray-400">{r.date}</div>
                  </div>
                  <div className="flex text-gold-500 ml-auto text-sm">{'★'.repeat(r.rating)}</div>
                </div>
                <p className="text-sm text-gray-600">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="font-bold mb-3">Leave a review</h3>
            <div className="flex gap-0.5 mb-3">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`text-2xl ${n <= (hoverRating || rating) ? 'text-gold-500' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2 text-sm">
              <div className="grid sm:grid-cols-2 gap-2">
                <input placeholder="Your name" className="px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none" />
                <input placeholder="Your email" className="px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none" />
              </div>
              <textarea placeholder="Write detailed review, helpful for us..." rows={3} className="w-full px-3 py-2 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:outline-none" />
              <button className="bg-primary-500 text-white font-bold px-5 py-2 rounded-full text-sm hover:bg-primary-600">SEND</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
