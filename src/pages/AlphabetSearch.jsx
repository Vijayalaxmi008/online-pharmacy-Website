import { Link } from 'react-router-dom'
import { alphabetCategoryGroups } from '../data/categories'

const RU_LETTERS = 'а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я'.split(' ')
const EN_LETTERS = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(' ')
const DIGITS = '0 1 2 3 4 5 6 7 8 9'.split(' ')

const AlphabetSearch = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Главная</Link> / Поиск по алфавиту
      </p>

      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h1 className="text-2xl font-bold">Поиск по алфавиту</h1>
        <span className="text-sm text-gray-500">Выбор товара по заболеванию</span>
      </div>

      <div className="relative bg-white rounded-2xl shadow-sm p-4 mb-8">
        <div className="flex flex-wrap gap-1 text-sm font-medium">
          {RU_LETTERS.map(l => (
            <button
              key={l}
              className="w-8 h-8 rounded-lg flex items-center justify-center uppercase hover:bg-primary-500 hover:text-white transition text-gray-600"
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
        <span className="hidden md:block absolute right-6 top-4 text-6xl font-black text-gray-100 select-none">А-Я</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alphabetCategoryGroups.map(group => (
          <div key={group.slug} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-500">
                #
              </span>
              <h2 className="font-bold">{group.title}</h2>
            </div>
            <ul className="space-y-1.5 text-sm text-gray-600">
              {group.items.map(item => (
                <li key={item}>
                  <Link
                    to={`/catalog?category=${group.slug}`}
                    className="hover:text-primary-500 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlphabetSearch