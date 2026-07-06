import { Link } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import Logo from './Logo'

const SOCIAL = [
  { key: 'vk', label: 'VK' },
  { key: 'fb', label: 'FB' },
  { key: 'ok', label: 'OK' },
  { key: 'tw', label: 'TW' },
  { key: 'ig', label: 'IG' },
  { key: 'yt', label: 'YT' },
]

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-navy-500 to-primary-600 text-white mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo + tagline */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Logo size="small" theme="dark" />
              <div>
                <div className="text-lg font-bold">Аптека<span className="text-gray-300 font-normal">.онлайн</span></div>
                <div className="text-xs text-gray-300">Ваша онлайн аптека</div>
              </div>
            </Link>
            <p className="text-xs text-gray-300">
              Все права защищены и охраняются законом
            </p>
          </div>

          {/* Column 1 */}
          <ul className="space-y-3 text-sm text-gray-200">
            <li><Link to="/about" className="hover:text-white transition">О компании</Link></li>
            <li><Link to="/delivery" className="hover:text-white transition">Доставка</Link></li>
            <li><Link to="/delivery" className="hover:text-white transition">Самовывоз из аптек</Link></li>
            <li><Link to="/payment" className="hover:text-white transition">Оплата</Link></li>
            <li><Link to="/about" className="hover:text-white transition">Юридическим лицам</Link></li>
            <li><Link to="/license" className="hover:text-white transition">Лицензия</Link></li>
          </ul>

          {/* Column 2 */}
          <ul className="space-y-3 text-sm text-gray-200">
            <li><Link to="/reviews" className="hover:text-white transition">Обратная связь</Link></li>
            <li><Link to="/advertising" className="hover:text-white transition">Реклама на сайте</Link></li>
            <li><Link to="/about" className="hover:text-white transition">Франшиза</Link></li>
            <li><span className="text-gray-200">Вакансии</span></li>
            <li><Link to="/privacy" className="hover:text-white transition">Политика конфиденциальности</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Пользовательское соглашение</Link></li>
          </ul>

          {/* Contact + social */}
          <div>
            <a href="mailto:INFO@RESTOLL.RU" className="flex items-start gap-2 mb-3 hover:text-white transition">
              <Mail size={18} className="text-white mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-sm">INFO@RESTOLL.RU</div>
                <div className="text-xs text-gray-300">Напишите нам</div>
              </div>
            </a>
            <a href="tel:88007772233" className="flex items-start gap-2 mb-4 hover:text-white transition">
              <Phone size={18} className="text-white mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-sm">8-800-777-22-33</div>
                <div className="text-xs text-gray-300">Круглосуточно</div>
              </div>
            </a>
            <div className="flex gap-2">
              {SOCIAL.map(s => (
                <a
                  key={s.key}
                  href="#"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-[10px] font-bold transition"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal / company details */}
        <div className="border-t border-white/20 pt-6 text-xs text-gray-300 leading-relaxed">
          Общество с ограниченной ответственностью «еАптека»; Адрес: Москва, Фрунзенская набережная,
          дом 42, цокольный этаж, помещение I, комната 2; Лицензия: ЛО-50-02-007632 от 27 ноября 2020 г.;
          ЛО-77-02-011346 от 22 декабря 2020 г.; ОГРН: 1147746631988; ИНН 7704865540
        </div>
      </div>
    </footer>
  )
}

export default Footer
