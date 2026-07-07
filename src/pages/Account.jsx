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
          <h2 className="text-2xl font-bold mb-2">You are not signed in</h2>
          <p className="text-gray-500 mb-6">Sign in to manage your orders</p>
          <div className="flex gap-3 justify-center">
            <Link to="/login" className="bg-primary-500 text-white px-6 py-2.5 rounded-full hover:bg-primary-600">
              Sign In
            </Link>
            <Link to="/register" className="border-2 border-primary-500 text-primary-500 px-6 py-2.5 rounded-full hover:bg-primary-50">
              Register
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
    { id: 12345, date: '15.11.2024', total: 1250, status: 'Delivered' },
    { id: 12344, date: '10.11.2024', total: 890, status: 'On the way' },
    { id: 12343, date: '01.11.2024', total: 2400, status: 'Delivered' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account</h1>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="text-center mb-6 pb-6 border-b">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                V
              </div>
              <h3 className="font-bold">{user.name || user.email || 'User'}</h3>
              <p className="text-sm text-gray-500">{user.email || user.phone}</p>
            </div>
            <nav className="space-y-1">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'orders', label: 'My orders', icon: Package },
                { id: 'favorites', label: `Favorites (${favorites.length})`, icon: Heart },
                { id: 'addresses', label: 'Addresses', icon: MapPin },
                { id: 'feedback', label: 'Feedback', icon: MessageSquare },
                { id: 'settings', label: 'Settings', icon: Settings },
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
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {tab === 'profile' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Personal information</h2>
                <button className="text-primary-500 text-sm flex items-center gap-1 hover:underline">
                  <Edit size={14} /> Edit
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Name</label>
                  <p className="font-medium">{user.name || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email</label>
                  <p className="font-medium">{user.email || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Phone</label>
                  <p className="font-medium">{user.phone || 'Not specified'}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Date of birth</label>
                  <p className="font-medium">Not specified</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">My orders</h2>
              <div className="space-y-3">
                {orders.map(order => (
                  <div key={order.id} className="border rounded-xl p-4 flex items-center justify-between hover:shadow-sm transition">
                    <div>
                      <div className="font-medium">Order #{order.id}</div>
                      <div className="text-sm text-gray-500">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{order.total} ₽</div>
                      <div className={`text-sm ${
                        order.status === 'Delivered' ? 'text-primary-500' : 'text-yellow-600'
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
              <h2 className="text-xl font-bold mb-6">Favorites</h2>
              {favorites.length === 0 ? (
                <p className="text-gray-500 text-center py-8">You do not have any favorite products yet</p>
              ) : (
                <p>You have you {favorites.length} favorite products</p>
              )}
            </div>
          )}

          {tab === 'addresses' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">My addresses</h2>
              <p className="text-gray-500 text-center py-8">You do not have any saved addresses yet</p>
            </div>
          )}

          {tab === 'feedback' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Feedback</h2>
              <p className="text-sm text-gray-500 mb-4">
                Still have questions or have suggestions? Write to us, and we will reply in near time.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <select className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none">
                  <option>Select a request topic</option>
                  <option>Order question</option>
                  <option>Delivery question</option>
                  <option>Other</option>
                </select>
                <textarea
                  placeholder="Message text"
                  rows={4}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-2xl text-sm focus:border-primary-500 focus:outline-none"
                />
                <button className="bg-primary-500 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary-600 transition">
                  Contact me
                </button>
              </form>
            </div>
          )}

          {tab === 'settings' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Settings</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between">
                  <span>Receive order notifications</span>
                  <input type="checkbox" defaultChecked className="accent-primary-500 w-5 h-5" />
                </label>
                <label className="flex items-center justify-between">
                  <span>Email newsletter</span>
                  <input type="checkbox" defaultChecked className="accent-primary-500 w-5 h-5" />
                </label>
                <label className="flex items-center justify-between">
                  <span>SMS notifications</span>
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
