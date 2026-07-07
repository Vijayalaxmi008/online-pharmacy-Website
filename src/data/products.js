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
    id: 1, name: 'Velson film-coated tablets 3 mg, 30 pcs.',
    brand: 'Lirina', inStock: true, price: 41108, oldPrice: 49999,
    image: bicyclol, isHit: true, isProductOfDay: true,
    category: 'medicines', code: 153249,
    description: 'Medicine for supporting liver health.',
  },
  {
    id: 2, name: 'Femibion Natalcare I tablets, 30 pcs.',
    brand: 'Femibion', inStock: true, price: 41108, oldPrice: 49999,
    image: femibion, isHit: true, isProductOfDay: true,
    category: 'vitamins', code: 153249,
    description: 'Prenatal vitamins for the first trimester.',
  },
  {
    id: 3, name: 'Bifiform capsules, 30 pcs.',
    brand: 'Bifiform', inStock: true, price: 41108, oldPrice: 49999,
    image: bifiform, isHit: true, isProductOfDay: true,
    category: 'medicines', code: 153249,
    description: 'Digestive support for adults and children over 2 years old.',
  },
  {
    id: 4, name: 'Detragel leg gel, 40 g',
    brand: 'Detragel', inStock: true, price: 41108, oldPrice: 49999,
    image: detragel, isHit: true, isProductOfDay: true,
    category: 'medicines', code: 153249,
    description: 'Gel for leg heaviness and varicose vein care.',
  },
  {
    id: 5, name: 'Heptral tablets 400 mg, 20 pcs.',
    brand: 'Heptral', inStock: false, price: 41108, oldPrice: 49999,
    image: heptral, isHit: true, isProductOfDay: true,
    category: 'medicines', code: 153249,
    description: 'Hepatoprotective medicine.',
  },
  {
    id: 6, name: 'Nise Bounty Skin, Hair and Nails capsules, 60 pcs.',
    brand: 'Nise', inStock: true, price: 244, image: nise,
    isHit: true, category: 'vitamins', code: 678234, rating: 5,
  },
  {
    id: 7, name: 'Arbidol anti-cold and flu tablets, 10 pcs.',
    brand: 'Arbidol', inStock: true, price: 145, image: arbidol,
    isHit: true, category: 'medicines', code: 789345, rating: 5,
  },
  {
    id: 8, name: 'Desmoxan smoking cessation tablets, 100 pcs.',
    brand: 'Desmohan', inStock: true, price: 444, image: desmoxan,
    isHit: true, category: 'medicines', code: 890456, rating: 5,
  },
]

export const hitsProducts = [
  { id: 6, name: 'Nise Bounty Skin, Hair and Nails capsules, 60 pcs.', price: 244, image: nise, rating: 5 },
  { id: 7, name: 'Arbidol anti-cold and flu tablets, 10 pcs.', price: 145, image: arbidol, rating: 4 },
  { id: 8, name: 'Desmoxan smoking cessation tablets, 100 pcs.', price: 444, image: desmoxan, rating: 5 },
]
