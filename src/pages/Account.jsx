import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { User, Package, Heart, MapPin, LogOut, Settings, Edit, MessageSquare } from 'lucide-react'

const Account = () => {
  const navigate = useNavigate()
  const { user, setUser, favorites } = useApp()
  const [tab, setTab] = useState('profile')

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md">
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Вы не авторизованы</h2>
          <p className="text-gray-500 mb-6">Войдите в аккаунт, чтобы управлять заказами</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="bg-primary-500 text-white px-6 py-2.5 rounded-full hover:bg-primary-600">
              Войти
            </Link>
            <Link to="/register" className="border-2 border-primary-500 text-primary-500 px-6 py-2.5 rounded-full hover:bg-primary-50">
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  const orders = [
    { id: 12345, date: '15.11.2024', total: 1250, status: 'Доставлен' },
    { id: 12344, date: '10.11.2024', total: 890, status: 'В пути' },
    { id: 12343, date: '01.11.2024', total: 2400, status: 'Доставлен' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Личный кабинет</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center mb-6 pb-6 border-b">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                V
              </div>
              <h3 className="font-bold">{user.name || user.email || 'Пользователь'}</h3>
              <p className="text-sm text-gray-500">{user.email || user.phone}</p>
            </div>
            <nav className="space-y-1">
              {[
                { id: 'profile', label: 'Профиль', icon: User },
                { id: 'orders', label: 'Мои заказы', icon: Package },
                { id: 'favorites', label: `Избранное (${favorites.length})`, icon: Heart },
                { id: 'addresses', label: 'Адреса', icon: MapPin },
                { id: 'feedback', label: 'Обратная связь', icon: MessageSquare },
                { id: 'settings', label: 'Настройки', icon: Settings },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition ${
                    tab === id ? 'bg-primary-50 text-primary-500 font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-red-500 hover:bg-red-50 mt-4"
              >
                <LogOut size={18} />
                <span>Выйти</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {tab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Личные данные</h2>
                <button className="text-primary-500 text-sm flex items-center gap-1 hover:underline">
                  <Edit size={14} /> Редактировать
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Имя</label>
                  <p className="font-medium">{user.name || 'Не указано'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email</label>
                  <p className="font-medium">{user.email || 'Не указано'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Телефон</label>
                  <p className="font-medium">{user.phone || 'Не указано'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Дата рождения</label>
                  <p className="font-medium">Не указано</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Мои заказы</h2>
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition">
                    <div>
                      <div className="font-medium">Заказ #{order.id}</div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{order.total} ₽</div>
                      <div className={`text-sm ${
                        order.status === 'Доставлен' ? 'text-primary-500' : 'text-yellow-600'
                      }`}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'favorites' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Избранное</h2>
              {favorites.length === 0 ? (
                <p className="text-gray-500 text-center py-8">У вас пока нет избранных товаров</p>
              ) : (
                <p>У вас {favorites.length} избранных товаров</p>
              )}
            </div>
          )}

          {tab === 'addresses' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Мои адреса</h2>
              <p className="text-gray-500 text-center py-8">У вас пока нет сохраненных адресов</p>
            </div>
          )}

          {tab === 'feedback' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Обратная связь</h2>
              <p className="text-sm text-gray-500 mb-4">
                Остались вопросы или есть предложения? Напишите нам, и мы ответим в ближайшее время.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <select className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none">
                  <option>Выбрать тему обращения</option>
                  <option>Вопрос по заказу</option>
                  <option>Вопрос по доставке</option>
                  <option>Другое</option>
                </select>
                <textarea
                  placeholder="Текст сообщения"
                  rows={4}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-2xl text-sm focus:border-primary-500 focus:outline-none"
                />
                <button className="bg-primary-500 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary-600 transition">
                  Напишите мне
                </button>
              </form>
            </div>
          )}

          {tab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Настройки</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span>Получать уведомления о заказах</span>
                  <input type="checkbox" defaultChecked className="accent-primary-500 w-5 h-5" />
                </label>
                <label className="flex items-center justify-between">
                  <span>Email рассылка</span>
                  <input type="checkbox" defaultChecked className="accent-primary-500 w-5 h-5" />
                </label>
                <label className="flex items-center justify-between">
                  <span>SMS уведомления</span>
                  <input type="checkbox" className="accent-primary-500 w-5 h-5" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account