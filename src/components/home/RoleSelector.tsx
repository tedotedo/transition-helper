import type { UserRole } from '../../hooks/useRole'

interface RoleSelectorProps {
  onSelect: (role: UserRole) => void
}

export function RoleSelector({ onSelect }: RoleSelectorProps) {
  return (
    <div className="space-y-6 text-center">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2">
          <span className="text-2xl">👋</span>
          <span className="text-sm font-bold text-white">Welcome to Transition Ready!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
          Who's visiting today?
        </h2>

        <p className="max-w-lg mx-auto text-base sm:text-lg text-white/80 leading-relaxed">
          We'll personalise your experience based on your answer
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 max-w-xl mx-auto">
        <button
          onClick={() => onSelect('young-person')}
          className="group flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-transparent hover:border-primary-300 hover:bg-primary-50 hover:scale-105 transition-all shadow-lg"
        >
          <span className="text-5xl group-hover:scale-110 transition-transform">🧑</span>
          <div>
            <p className="text-lg font-bold text-warm-800 group-hover:text-primary-600 transition-colors">I'm a young person</p>
            <p className="text-sm text-warm-500 mt-1">Moving to adult healthcare</p>
          </div>
        </button>

        <button
          onClick={() => onSelect('parent-carer')}
          className="group flex-1 flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/95 backdrop-blur-sm border-2 border-transparent hover:border-accent-300 hover:bg-accent-50 hover:scale-105 transition-all shadow-lg"
        >
          <span className="text-5xl group-hover:scale-110 transition-transform">👨‍👩‍👧</span>
          <div>
            <p className="text-lg font-bold text-warm-800 group-hover:text-accent-600 transition-colors">I'm a parent or carer</p>
            <p className="text-sm text-warm-500 mt-1">Supporting someone through transition</p>
          </div>
        </button>
      </div>

      <p className="text-white/60 text-sm">
        You can change this anytime using the toggle at the top of the page
      </p>
    </div>
  )
}
