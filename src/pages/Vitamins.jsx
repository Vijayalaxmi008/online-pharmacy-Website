import { Link } from 'react-router-dom'
import { alphabetCategoryGroups, mainNavCategories } from '../data/categories'

const CYRILLIC_LETTERS = 'А Б В Г Д Е Ё Ж З И Й К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ъ Ы Ь Э Ю Я'.split(' ')
const EN_LETTERS = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'.split(' ')
const DIGITS = '0 1 2 3 4 5 6 7 8 9'.split(' ')

const iconForSlug = (slug) => mainNavCategories.find(c => c.slug === slug)?.icon

const COLOR_FOR_SLUG = {
  medicines: 'bg-primary-100 text-primary-500',
  vitamins: 'bg-orange-100 text-orange-500',
  cosmetics: 'bg-purple-100 text-purple-500',
  hygiene: 'bg-teal-100 text-teal-600',
  medical: 'bg-red-100 text-red-500',
  pets: 'bg-amber-100 text-amber-600',
  baby: 'bg-pink-100 text-pink-500',
  lenses: 'bg-blue-100 text-blue-500',
  equipment: 'bg-primary-100 text-primary-600',
}
const colorForSlug = (slug) => COLOR_FOR_SLUG[slug] || 'bg-primary-100 text-primary-500'

const Vitamins = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
        <Link to="/" className="hover:text-primary-500">Home</Link>
        <span>›</span>
        <span>Alphabetical Search</span>
      </p>

      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-2xl font-bold">Alphabetical Search</h1>
        <span className="text-sm text-primary-500 font-medium">Select product by disease</span>
      </div>

      <div className="relative bg-white rounded-2xl shadow-sm p-4 mb-8 overflow-hidden">
        <div className="flex flex-wrap gap-1 text-sm font-medium">
          {CYRILLIC_LETTERS.map((l, i) => (
            <button
              key={l}
              className={`w-8 h-8 rounded-lg flex items-center justify-center uppercase transition ${
                i === 0 ? 'bg-primary-500 text-white' : 'text-gray-600 hover:bg-primary-500 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 text-sm font-medium mt-2">
          {EN_LETTERS.map(l => (
            <button
              key={l}
              className="w-8 h-8 rounded-lg flex items-center justify-center uppercase hover:bg-primary-500 hover:text-white transition text-gray-600"
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1 text-sm font-medium mt-2">
          {DIGITS.map(l => (
            <button
              key={l}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-primary-500 hover:text-white transition text-gray-600"
            >
              {l}
            </button>
          ))}
        </div>
        <span className="hidden md:block absolute right-6 top-4 text-6xl font-black text-gray-100 select-none pointer-events-none">A-Z</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {alphabetCategoryGroups.map(group => {
          const Icon = iconForSlug(group.slug)
          return (
            <div key={group.slug} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${colorForSlug(group.slug)}`}>
                  {Icon ? <Icon size={16} /> : '#'}
                </span>
                <h2 className="font-bold">{group.title}</h2>
              </div>
              <ul className="space-y-1.5 text-sm text-gray-600">
                {group.items.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 w-2 h-px bg-gray-300 shrink-0"></span>
                    <Link
                    to={`/catalog?category=${group.slug}`}
                    className="text-gray-600 hover:text-primary-500 transition"
                    >
                        {item}
                    </Link>
                 </li>
                ))}
              </ul>
              {group.truncated && (
                <Link
                  to={`/catalog?category=${group.slug}`}
                  className="inline-block mt-3 text-sm font-bold text-primary-500 hover:underline"
                >
                  All categories
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Vitamins