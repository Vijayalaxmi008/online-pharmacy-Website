import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blog'

const HealthBlogSection = () => {
  const posts = blogPosts.slice(0, 4)

  return (
    <section className="bg-gray-50 py-8 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Health Blog</h2>
          <Link to="/blog" className="text-xs text-primary-500 font-semibold hover:underline">
            Latest posts
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img src={post.image} alt={post.title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="text-sm font-bold mb-1 line-clamp-2">{post.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HealthBlogSection
