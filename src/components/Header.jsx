import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Heart, User, Search, Phone, Mail, ShoppingCart, Menu, X, ChevronDown, LogOut, Instagram, Youtube } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import { mainNavCategories, subNavLinks } from '../data/categories'
import Logo from './Logo'
import ServicePagesModal from './modals/ServicePagesModal'
import MedicinesMenu from './menus/MedicinesMenu'
import CityModal from './modals/CityModal'
import AuthModal from './modals/AuthModal'
import CallbackModal from './modals/CallbackModal'

const Header = () => {
  const { city, setCity, user, logout, favorites } = useApp()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [serviceOpen, setServiceOpen] = useState(false)
  const [medicinesOpen, setMedicinesOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => { logout(); setMobileMenuOpen(false); navigate('/') }

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="md:hidden bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2">
            <Menu size={22} className="text-gray-700" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <Logo size="small" />
            <div>
              <div className="text-sm font-bold text-gray-900">Аптека<span className="text-gray-500">.онлайн</span></div>
            </div>
          </Link>
          <Link to="/cart" className="relative p-2">
            <ShoppingCart size={20} className="text-gray-700" />
            {totalItems > 0 && <span className="absolute -top-0 -right-0 bg-primary-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
          </Link>
        </div>
        <div className="px-3 py-2 border-b">
          <div className="relative">
            <input type="text" placeholder="Поиск лекарств..." className="w-full pl-3 pr-9 py-2 bg-gray-100 rounded-full focus:outline-none text-sm" />
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center justify-around px-1 py-2 border-b text-[11px]">
          <button onClick={() => setCityOpen(true)} className="flex flex-col items-center gap-0.5 px-2 py-1">
            <MapPin size={16} className="text-primary-500" /><span className="text-gray-600">{city.split(' ')[0]}</span>
          </button>
          <Link to={user ? '/account' : '/login'} className="flex flex-col items-center gap-0.5 px-2 py-1">
            <User size={16} className="text-primary-500" /><span className="text-gray-600">{user ? 'Кабинет' : 'Войти'}</span>
          </Link>
          <Link to="/favorites" className="flex flex-col items-center gap-0.5 px-2 py-1">
            <Heart size={16} className="text-primary-500" /><span className="text-gray-600">Избранное</span>
          </Link>
          <button onClick={() => setServiceOpen(true)} className="flex flex-col items-center gap-0.5 px-2 py-1">
            <Menu size={16} className="text-primary-500" /><span className="text-gray-600">Меню</span>
          </button>
        </div>
      </header>

      {/* MOBILE SLIDE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Logo size="small" />
                <span className="font-bold text-sm">Аптека<span className="text-gray-500">.онлайн</span></span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {user ? (
                <Link to="/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#001A70] to-primary-500 text-white flex items-center justify-center font-bold">{(user.name || 'U')[0].toUpperCase()}</div>
                  <div><div className="font-medium text-sm">{user.name || user.email}</div><div className="text-xs text-gray-500">Личный кабинет</div></div>
                </Link>
              ) : (
                <button onClick={() => { setMobileMenuOpen(false); setAuthOpen(true) }} className="w-full bg-primary-500 text-white py-3 rounded-full font-bold mb-4">Войти / Регистрация</button>
              )}
              <ul className="space-y-1 mb-4">
                {mainNavCategories.map(cat => (
                  <li key={cat.slug}>
                    <Link to={`/catalog?category=${cat.slug}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 hover:bg-gray-50 rounded-lg">
                      <span className="font-medium text-sm">{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-1 border-t pt-2">
                <li><Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 hover:bg-gray-50 rounded-lg text-sm">О компании</Link></li>
                <li><Link to="/delivery" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 hover:bg-gray-50 rounded-lg text-sm">Доставка</Link></li>
                <li><Link to="/payment" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 hover:bg-gray-50 rounded-lg text-sm">Оплата</Link></li>
                <li><Link to="/contacts" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 hover:bg-gray-50 rounded-lg text-sm">Контакты</Link></li>
                <li><Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 hover:bg-gray-50 rounded-lg text-sm">Блог</Link></li>
                <li><Link to="/favorites" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 hover:bg-gray-50 rounded-lg text-sm">Избранное</Link></li>
                <li><Link to="/cart" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-3 hover:bg-gray-50 rounded-lg text-sm">Корзина</Link></li>
              </ul>
              {user && (
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-3 text-red-500 mt-4 border-t pt-4 text-sm">
                  <LogOut size={18} />Выйти
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP HEADER */}
      <header className="hidden md:block bg-white shadow-sm relative z-40">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-3 text-sm bg-white">
          <div className="flex items-center gap-4">
            <button onClick={() => setCityOpen(true)} className="flex items-center gap-1 text-gray-700 hover:text-primary-500">
              <MapPin size={14} className="text-primary-500" /><span>{city}</span><ChevronDown size={12} className="text-gray-400" />
            </button>
            <button onClick={() => setServiceOpen(true)} className="flex items-center gap-1 text-gray-700 hover:text-primary-500">
              <Menu size={14} className="text-primary-500" /><span>Служебные страницы</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/favorites" className="flex items-center gap-1 text-gray-700 hover:text-primary-500">
              <span>Избранное</span><Heart size={14} className="text-primary-500" />
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/account" className="flex items-center gap-1 text-gray-700 hover:text-primary-500">
                  <span>Личный кабинет</span><User size={14} className="text-primary-500" />
                </Link>
                <button onClick={handleLogout} className="text-red-500"><LogOut size={14} /></button>
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)} className="flex items-center gap-1 text-gray-700 hover:text-primary-500">
                <span>Личный кабинет</span><User size={14} className="text-primary-500" />
              </button>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-3 flex flex-wrap lg:flex-nowrap items-center gap-3 lg:gap-6 border-t border-b border-gray-200 bg-white">
  <Link to="/" className="flex items-center gap-2 shrink-0">
    <Logo size="normal" />
    <div>
      <div className="text-lg font-bold leading-tight">Аптека<span className="text-gray-500">.онлайн</span></div>
      <div className="text-[10px] text-gray-500">Ваша онлайн аптека</div>
    </div>
    <div className="hidden xl:flex gap-1 ml-2">
      <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600" aria-label="Instagram">
        <Instagram size={14} />
      </a>
      <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center hover:bg-primary-600" aria-label="YouTube">
        <Youtube size={15} />
      </a>
      <a href="https://vk.com" target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-primary-500 text-white flex items-center justify-center text-[10px] font-bold hover:bg-primary-600" aria-label="VK">VK</a>
    </div>
  </Link>

  <a href="mailto:INFO@RESTOLL.RU" className="hidden xl:flex items-start gap-2 hover:text-primary-500">
    <Mail size={18} className="text-primary-500 mt-0.5" />
    <div><div className="font-bold text-xs">INFO@RESTOLL.RU</div><div className="text-[10px] text-gray-500">Напишите нам</div></div>
  </a>

  <a href="tel:88007772233" className="hidden lg:flex items-start gap-2 hover:text-primary-500">
    <Phone size={18} className="text-primary-500 mt-0.5" />
    <div><div className="font-bold text-xs">8-800-777-22-33</div><div className="text-[10px] text-gray-500">Круглосуточно</div></div>
  </a>

  <a href="tel:84952233403" className="hidden xl:flex items-start gap-2 hover:text-primary-500">
    <Phone size={18} className="text-primary-500 mt-0.5" />
    <div><div className="font-bold text-xs">8 (495) 223-34-03</div><div className="text-[10px] text-gray-500">Интернет аптека</div></div>
  </a>

  <div className="flex items-center gap-2 ml-auto">
    <button className="w-9 h-9 rounded-full border-2 border-primary-500 flex items-center justify-center hover:bg-primary-500 hover:text-white group shrink-0">
      <Search size={16} className="text-primary-500 group-hover:text-white" />
    </button>
    <button onClick={() => setCallbackOpen(true)} className="bg-primary-500 text-white font-bold px-3 lg:px-5 py-2 rounded-full hover:bg-primary-600 text-xs lg:text-sm whitespace-nowrap">
      <span className="hidden lg:inline">ЗАКАЗАТЬ ЗВОНОК</span>
      <span className="lg:hidden">ЗВОНОК</span>
    </button>
    <Link to="/cart" className="relative w-9 h-9 rounded-full border-2 border-primary-500 flex items-center justify-center hover:bg-primary-500 hover:text-white group shrink-0">
      <ShoppingCart size={16} className="text-primary-500 group-hover:text-white" />
      {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
    </Link>
  </div>
</div>

        {/* Sub nav with sub links */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 flex items-center gap-4 text-xs overflow-x-auto">
            {subNavLinks.map(link => (
              <a key={link} href="#" className="py-2 text-gray-600 hover:text-primary-500 whitespace-nowrap">{link}</a>
            ))}
          </div>
        </div>

        {/* Main nav */}
        <nav className="bg-[#0b1f66] relative">
          <div className="container mx-auto px-4">
            <ul className="flex items-center text-white text-sm font-bold">
              {mainNavCategories.map(cat => (
                <li key={cat.slug} className="relative"
                  onMouseEnter={() => cat.slug === 'medicines' && setMedicinesOpen(true)}
                  onMouseLeave={() => cat.slug === 'medicines' && setMedicinesOpen(false)}>
                  <Link to={`/catalog?category=${cat.slug}`} className="flex items-center justify-center gap-2 px-6 py-3 hover:bg-black/10 whitespace-nowrap">
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {medicinesOpen && <MedicinesMenu onClose={() => setMedicinesOpen(false)} />}
        </nav>
      </header>

      {/* MOBILE CATEGORIES */}
      <div className="md:hidden bg-[#0b1f66] sticky top-[104px] z-40">
        <div className="overflow-x-auto">
          <ul className="flex items-center px-2 py-1.5 text-white text-xs font-bold whitespace-nowrap">
            {mainNavCategories.map(cat => (
              <li key={cat.slug} className="shrink-0">
                <Link to={`/catalog?category=${cat.slug}`} className="block px-3 py-1.5">{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {serviceOpen && <ServicePagesModal onClose={() => setServiceOpen(false)} />}
      {cityOpen && <CityModal onClose={() => setCityOpen(false)} onSelect={setCity} />}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
      {callbackOpen && <CallbackModal onClose={() => setCallbackOpen(false)} />}

      {/* MOBILE BOTTOM TAB BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-stretch pb-[env(safe-area-inset-bottom)]">
        <Link to="/catalog" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-gray-500">
          <Menu size={20} className="text-primary-500" />
          <span className="text-[10px]">Каталог</span>
        </Link>
        <Link to="/favorites" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-gray-500 relative">
          <Heart size={20} className="text-primary-500" />
          {favorites.length > 0 && (
            <span className="absolute top-1 right-1/4 bg-primary-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{favorites.length}</span>
          )}
          <span className="text-[10px]">Избранное</span>
        </Link>
        <Link to="/cart" className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-gray-500 relative">
          <ShoppingCart size={20} className="text-primary-500" />
          {totalItems > 0 && (
            <span className="absolute top-1 right-1/4 bg-primary-500 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{totalItems}</span>
          )}
          <span className="text-[10px]">Корзина</span>
        </Link>
        <Link to={user ? '/account' : '/login'} className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 text-gray-500">
          <User size={20} className="text-primary-500" />
          <span className="text-[10px]">Профиль</span>
        </Link>
      </nav>
    </>
  )
}

export default Header
