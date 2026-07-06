import { X } from 'lucide-react'
import { useEffect } from 'react'

const Modal = ({ children, onClose, maxWidth = 'max-w-md' }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${maxWidth} relative`} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"><X size={20} /></button>
        {children}
      </div>
    </div>
  )
}

export default Modal
