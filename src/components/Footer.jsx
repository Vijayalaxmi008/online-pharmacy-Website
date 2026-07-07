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
                <div className="text-lg font-bold">Pharmacy<span className="text-gray-300 font-normal">.online</span></div>
                <div className="text-xs text-gray-300">Your online pharmacy</div>
              </div>
            </Link>
            <p className="text-xs text-gray-300">
              All rights reserved and protected by law
            </p>
          </div>

          {/* Column 1 */}
          <ul className="space-y-3 text-sm text-gray-200">
            <li><Link to="/about" className="hover:text-white transition">About Company</Link></li>
            <li><Link to="/delivery" className="hover:text-white transition">Delivery</Link></li>
            <li><Link to="/delivery" className="hover:text-white transition">Pickup from pharmacies</Link></li>
            <li><Link to="/payment" className="hover:text-white transition">Payment</Link></li>
            <li><Link to="/about" className="hover:text-white transition">For Corporate Customers</Link></li>
            <li><Link to="/license" className="hover:text-white transition">License</Link></li>
          </ul>

          {/* Column 2 */}
          <ul className="space-y-3 text-sm text-gray-200">
            <li><Link to="/reviews" className="hover:text-white transition">Feedback</Link></li>
            <li><Link to="/advertising" className="hover:text-white transition">Website Advertising</Link></li>
            <li><Link to="/about" className="hover:text-white transition">Franchise</Link></li>
            <li><span className="text-gray-200">Careers</span></li>
            <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white transition">Terms of Use</Link></li>
          </ul>

          {/* Contact + social */}
          <div>
            <a href="mailto:INFO@RESTOLL.RU" className="flex items-start gap-2 mb-3 hover:text-white transition">
              <Mail size={18} className="text-white mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-sm">INFO@RESTOLL.RU</div>
                <div className="text-xs text-gray-300">Write to us</div>
              </div>
            </a>
            <a href="tel:88007772233" className="flex items-start gap-2 mb-4 hover:text-white transition">
              <Phone size={18} className="text-white mt-0.5 shrink-0" />
              <div>
                <div className="font-bold text-sm">8-800-777-22-33</div>
                <div className="text-xs text-gray-300">24/7</div>
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
          Company with limited liability «ePharmacy»; Address: Moscow, Frunzenskaya Embankment,
          building 42, basement floor, premises I, room 2; License: LO-50-02-007632 from 27 November 2020 .;
          LO-77-02-011346 from 22 December 2020 .; OGRN: 1147746631988; INN 7704865540
        </div>
      </div>
    </footer>
  )
}

export default Footer
