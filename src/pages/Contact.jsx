import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import mapImg from '../assets/images/map/image.png'

const Contact = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <div className="container mx-auto px-4 py-6">
      <p className="text-xs text-gray-500 mb-2">Home / Contacts</p>
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-start gap-2 text-sm">
            <MapPin size={16} className="text-primary-500 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs text-gray-400 uppercase">Glavnyy ofis</div>
              <div className="font-bold">129226, . Moscow, St.. Dokukina, d.16, str.1, 6 floor</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-primary-500 shrink-0" />
              <div>
                <div className="font-bold">8-800-777-22-33</div>
                <div className="text-xs text-gray-500">Request a call</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} className="text-primary-500 shrink-0" />
              <div>
                <div className="font-bold">8 (495) 223-34-03</div>
                <div className="text-xs text-gray-500">Free on Rossii</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock size={16} className="text-primary-500 shrink-0" />
            <div>
              <div className="font-bold">8:00 - 22:00</div>
              <div className="text-xs text-gray-500">without vykhodnykh</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail size={16} className="text-primary-500 shrink-0" />
            <div>
              <div className="font-bold">info@restoll.ru</div>
              <div className="text-xs text-gray-500">Napisat nam</div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 text-xs text-gray-500">
            <h4 className="font-bold text-gray-900 mb-1 text-sm">Rekvizity</h4>
            <p>INN/Kpp 7451432180/745101001</p>
            <p>r/with 40702810010000281954 in Ao «Tinkoff Bank»</p>
            <p>Bik 044525974 kor./sch 30101810145250000974</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-sm mb-3">We vam perezvonim</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2 text-xs">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___ __ __"
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-full focus:border-primary-500 focus:outline-none"
            />
            <p className="text-[10px] text-gray-400 px-1">
              By clicking the button, you agree to the processing of personal data
            </p>
            <button className="w-full bg-primary-500 text-white font-bold py-2.5 rounded-full text-xs hover:bg-primary-600 transition">
              Perezvonite Mne
            </button>
          </form>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-3">How proekhat</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        m. Polezhaevskaya. last vagon from tsentra, after turniketa nalevo, vykhod k ostanovke also nalevo.
        Trolleybusy 20, 35 or 65 (up to ostanovki «Bulvar Generala Karbysheva»)
      </p>
      <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-10 border border-gray-100">
        <img src={mapImg} alt="Karta proezda" className="w-full h-full object-cover" />
      </div>

      <h2 className="text-xl font-bold mb-4">for partnerov</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-bold text-sm mb-1.5">Arendodatelyam</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            suggestions on arende torgovykh ploshchadey or subarende otpravlyayte cherez formu to sayte or to
            address <a href="mailto:estate@neo-pharm.ru" className="text-primary-500 hover:underline">estate@neo-pharm.ru</a>
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-bold text-sm mb-1.5">for proposals</h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-1">
            By obshchim voprosam <a href="mailto:office@neo-pharm.ru" className="text-primary-500 hover:underline">office@neo-pharm.ru</a>
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            By voprosam reklamy and prodvizheniya <a href="mailto:press@neo-pharm.ru" className="text-primary-500 hover:underline">press@neo-pharm.ru</a>
          </p>
        </div>
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-5">
          <h3 className="font-bold text-sm mb-1.5">Tsentralnyy ofis</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Address: . Moscow, Ave.-t Marshala Zhukova, d. 43, korp. 3<br />
            Address for pochtovykh otpravleniy: 117246, . Moscow, a/ya No. 5, Ooo «Neo Farm».
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
