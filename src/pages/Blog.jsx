import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { blogCategories, blogPosts } from '../data/blog'

const CARD_COLORS = ['bg-primary-100', 'bg-gold-400/30', 'bg-navy-500/10', 'bg-primary-200']

const Blog = () => {
  const [activeTag, setActiveTag] = useState(blogCategories[0])
  const filtered = blogPosts.filter(p => p.tag === activeTag)
  const list = filtered.length ? filtered : blogPosts
  const [featured, ...rest] = list

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Home</Link> / Health Blog
      </p>
      <h1 className="text-2xl font-bold mb-4">Health Blog</h1>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 text-xs">
        {blogCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveTag(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full border whitespace-nowrap ${
              activeTag === cat
                ? 'bg-primary-500 text-white border-primary-500'
                : 'border-gray-200 text-gray-600 hover:border-primary-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative mb-6 max-w-xl">
        <input
          type="text"
          placeholder="Did not find an article on the topic you need? Ask us!"
          className="w-full pl-4 pr-10 py-3 rounded-full border-2 border-gray-200 focus:border-primary-500 focus:outline-none text-sm"
        />
        <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {featured && (
          <Link
            to={`/blog/${featured.id}`}
            className="md:col-span-2 md:row-span-2 bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <div className="aspect-[16/9] bg-gradient-to-br from-navy-500 to-primary-500 flex items-center justify-center text-white text-5xl">💊</div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-[10px] font-bold text-primary-500 uppercase mb-2">{featured.tag}</span>
              <h2 className="text-lg font-bold mb-2">{featured.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-3">{featured.excerpt}</p>
            </div>
          </Link>
        )}
        {rest.map((post, i) => (
          <Link
            key={post.id}
            to={`/blog/${post.id}`}
            className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            <div className={`aspect-[16/10] ${CARD_COLORS[i % CARD_COLORS.length]} flex items-center justify-center text-3xl`}>💊</div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="text-sm font-bold mb-1.5 line-clamp-2">{post.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1 mt-8 text-xs">
        {[1, 2, 3, 4, '...', 8].map((p, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              p === 1 ? 'bg-primary-500 text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Blog
