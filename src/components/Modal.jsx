import { X } from 'lucide-react'

export default function Modal({ open, onClose, children, tint = 'dark' }) {
  if (!open) return null
  const bg = tint === 'dark' ? 'bg-tile-dark text-white' : 'bg-brand-500 text-white'
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className={`${bg} w-full max-w-sm rounded-2xl p-6 relative shadow-soft animate-[pop_.25s_ease-out]`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-white/10 transition"
        >
          <X size={18} />
        </button>
        {children}
      </div>
      <style>{`@keyframes pop { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }`}</style>
    </div>
  )
}
