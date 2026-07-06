// Import local product images
import bicyclol from '../assets/images/products/bicyclol.png'
import femibion from '../assets/images/products/femibion.png'
import bifiform from '../assets/images/products/bifiform.png'
import detragel from '../assets/images/products/detragel.png'
import heptral from '../assets/images/products/heptral.png'
import nise from '../assets/images/products/nise.png'
import arbidol from '../assets/images/products/arbidol.png'
import desmoxan from '../assets/images/products/desmoxan.png'

export const products = [
  {
    id: 1, name: 'Велсон таблетки покрыт. плен. об. 3 мг, 30 шт.',
    brand: 'Lirina', inStock: true, price: 41108, oldPrice: 49999,
    image: bicyclol, isHit: true, isProductOfDay: true,
    category: 'medicines', code: 153249,
    description: 'Препарат для лечения заболеваний печени.',
  },
  {
    id: 2, name: 'Femibion Natalcare I таблетки 30 шт.',
    brand: 'Femibion', inStock: true, price: 41108, oldPrice: 49999,
    image: femibion, isHit: true, isProductOfDay: true,
    category: 'vitamins', code: 153249,
    description: 'Витамины для беременных, 1 триместр.',
  },
  {
    id: 3, name: 'Бифиформ капсулы 30 шт.',
    brand: 'Bifiform', inStock: true, price: 41108, oldPrice: 49999,
    image: bifiform, isHit: true, isProductOfDay: true,
    category: 'medicines', code: 153249,
    description: 'Лечение диареи. Для детей с 2-х лет.',
  },
  {
    id: 4, name: 'Детрагель гель для ног 40г',
    brand: 'Detragel', inStock: true, price: 41108, oldPrice: 49999,
    image: detragel, isHit: true, isProductOfDay: true,
    category: 'medicines', code: 153249,
    description: 'Гель при варикозе и тяжести в ногах.',
  },
  {
    id: 5, name: 'Гептрал таблетки 400мг 20 шт.',
    brand: 'Heptral', inStock: false, price: 41108, oldPrice: 49999,
    image: heptral, isHit: true, isProductOfDay: true,
    category: 'medicines', code: 153249,
    description: 'Гепатопротектор.',
  },
  {
    id: 6, name: 'Найзе Баунти Кожа, волосы, ногти, капсулы 60 шт',
    brand: 'Nise', inStock: true, price: 244, image: nise,
    isHit: true, category: 'vitamins', code: 678234, rating: 5,
  },
  {
    id: 7, name: 'Арбидол® - препарат от ОРВИ и гриппа, 10 таблеток',
    brand: 'Arbidol', inStock: true, price: 145, image: arbidol,
    isHit: true, category: 'medicines', code: 789345, rating: 5,
  },
  {
    id: 8, name: 'Desmoxan - лечение, при бросании курения, 100 таблеток',
    brand: 'Desmohan', inStock: true, price: 444, image: desmoxan,
    isHit: true, category: 'medicines', code: 890456, rating: 5,
  },
]

export const hitsProducts = [
  { id: 6, name: 'Найзе Баунти Кожа, волосы, ногти, капсулы 60 шт', price: 244, image: nise, rating: 5 },
  { id: 7, name: 'Арбидол® - препарат от ОРВИ и гриппа, 10 таблеток', price: 145, image: arbidol, rating: 4 },
  { id: 8, name: 'Desmoxan - лечение, при бросании курения, 100 таблеток', price: 444, image: desmoxan, rating: 5 },
]
