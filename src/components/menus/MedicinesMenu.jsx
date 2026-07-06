import { useState } from 'react'
import { medicineCategories, moreMedicineCategories, diseases } from '../../data/categories'
import { hitsProducts } from '../../data/products'
import HitCard from '../HitCard'

const MedicinesMenu = ({ onClose }) => {
  const [hovered, setHovered] = useState(null)
  const activeCat = medicineCategories.find(c => c.slug === hovered)

  return (
    <div className="absolute left-0 right-0 top-full bg-white shadow-2xl border-t-2 border-primary-500 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-white px-4 py-1.5 rounded-t-xl flex items-center gap-1.5 border-t-2 border-x-2 border-primary-500">
            <span className="text-primary-500">💊</span>
            <span className="font-bold text-xs">ЛЕКАРСТВА</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold text-xs mb-2 text-gray-900">КАТЕГОРИИ</h3>
            <ul className="space-y-1 text-xs">
              {medicineCategories.map(cat => (
                <li key={cat.slug} onMouseEnter={() => setHovered(cat.slug)}
                  className={`cursor-pointer flex items-center gap-1 ${cat.active || hovered === cat.slug ? 'text-primary-500 font-medium' : 'text-gray-700 hover:text-primary-500'}`}>
                  <span className="text-gray-400">›</span> {cat.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-1 text-xs pt-7">
              {moreMedicineCategories.map(cat => (
                <li key={cat} className="text-gray-700 hover:text-primary-500 cursor-pointer flex items-center gap-1">
                  <span className="text-gray-400">›</span> {cat}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xs mb-2 text-gray-900">ЗАБОЛЕВАНИЯ</h3>
            <ul className="space-y-1 text-xs">
              {diseases.map(d => (
                <li key={d} className="text-gray-700 hover:text-primary-500 cursor-pointer flex items-center gap-1">
                  <span className="text-gray-400">›</span> {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xs mb-2 text-gray-900">ХИТЫ ПРОДАЖ</h3>
            <div className="space-y-2">
              {hitsProducts.map(p => <HitCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
        {activeCat?.subcategories && (
          <div className="absolute left-0 right-0 bottom-0 translate-y-full bg-white border-t shadow-lg">
            <div className="container mx-auto px-4 py-3">
              <div className="grid grid-cols-1 gap-1 max-w-xs ml-[16%]">
                <div className="bg-primary-500 text-white px-3 py-1.5 rounded-t-lg font-medium text-sm">{activeCat.name}</div>
                {activeCat.subcategories.map(sub => (
                  <a key={sub} href="#" className="block px-3 py-1.5 hover:bg-gray-50 border-b text-xs">{sub}</a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicinesMenu
