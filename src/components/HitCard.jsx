import { Star } from 'lucide-react'

const HitCard = ({ product }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-2 flex gap-2 hover:shadow-md transition">
    <div className="relative shrink-0">
      <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center z-10">HIT</span>
      <img src={product.image} alt={product.name} className="w-14 h-14 object-contain rounded bg-white" />
    </div>
    <div className="text-[10px] flex-1 min-w-0">
      <p className="line-clamp-2 mb-1 leading-tight">{product.name}</p>
      <div className="font-bold text-xs">{product.price} RUB</div>
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={8} className={i <= (product.rating || 5) ? 'fill-gold-500 text-gold-500' : 'text-gray-300'} />
        ))}
      </div>
    </div>
  </div>
)

export default HitCard
