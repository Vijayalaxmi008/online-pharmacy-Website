import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Mail, Phone } from 'lucide-react'

const Feedback = () => {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">
        <Link to="/" className="hover:text-primary-500">Home</Link> / Feedback
      </p>
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={20} className="text-primary-500" />
            <h2 className="text-lg font-bold">Write to us</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Still have questions or have suggestions? Zapolnite formu, and we svyazhemsya with vami in near time.
          </p>

          {sent ? (
            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 text-sm text-primary-700">
              Thank you! Vashe soobshchenie otpravleno, we will reply in near time.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <select
                required
                defaultValue=""
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none"
              >
                <option value="" disabled>Select a request topic</option>
                <option>Order question</option>
                <option>Delivery question</option>
                <option>Payment question</option>
                <option>Partnership proposal</option>
                <option>Other</option>
              </select>

              <input
                required
                type="text"
                placeholder="Familiya, Name and Otchestvo"
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none"
              />

              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  required
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-full text-sm focus:border-primary-500 focus:outline-none"
                />
              </div>

              <textarea
                required
                placeholder="Message text"
                rows={4}
                className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-2xl text-sm focus:border-primary-500 focus:outline-none"
              />

              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-[11px] text-gray-400 max-w-xs">
                  By clicking the button, you agree to the processing of{' '}
                  <Link to="/privacy" className="text-primary-500 hover:underline">personal data</Link>
                </p>
                <button
                  type="submit"
                  className="bg-primary-500 text-white font-bold px-6 py-2.5 rounded-full text-sm hover:bg-primary-600 transition whitespace-nowrap"
                >
                  Napishite Mne
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit space-y-4">
          <h3 className="font-bold text-sm">Drugie sposoby svyazi</h3>
          <a href="mailto:INFO@RESTOLL.RU" className="flex items-start gap-2 text-sm hover:text-primary-500">
            <Mail size={16} className="text-primary-500 mt-0.5 shrink-0" />
            <div>
              <div className="font-bold">INFO@RESTOLL.RU</div>
              <div className="text-xs text-gray-500">Write to us</div>
            </div>
          </a>
          <a href="tel:88007772233" className="flex items-start gap-2 text-sm hover:text-primary-500">
            <Phone size={16} className="text-primary-500 mt-0.5 shrink-0" />
            <div>
              <div className="font-bold">8-800-777-22-33</div>
              <div className="text-xs text-gray-500">24/7</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Feedback
