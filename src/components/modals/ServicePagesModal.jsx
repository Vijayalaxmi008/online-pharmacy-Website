import { X } from 'lucide-react'
import { servicePages } from '../../data/categories'

const ServicePagesModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
    <div className="w-full relative" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-center gap-2 mb-2">
        <div className="bg-white px-3 py-1.5 rounded-t-xl border-t border-x flex items-center gap-1.5">
          <X size={14} className="text-primary-500" />
          <span className="text-primary-500 text-xs">Служебные страницы</span>
        </div>
      </div>
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 z-10"><X size={20} /></button>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-auto p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {servicePages.map(group => (
          <div key={group.title}>
            <h3 className="font-bold text-xs mb-3 text-gray-900">{group.title}</h3>
            <ul className="space-y-2">
              {group.items.map(item => (
                <li key={item}>
                  <a href="#" className={`text-xs flex items-start gap-1 ${item === group.activeItem ? 'text-primary-500' : 'text-gray-700 hover:text-primary-500'}`}>
                    <span className="text-gray-400">›</span>{item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default ServicePagesModal
