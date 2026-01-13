export type UserRole = 'young-person' | 'parent-carer'

interface RoleToggleProps {
  value: UserRole
  onChange: (role: UserRole) => void
}

export function RoleToggle({ value, onChange }: RoleToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-warm-200 bg-white p-1 text-xs font-medium shadow-sm">
      <button
        type="button"
        onClick={() => onChange('young-person')}
        className={`rounded-full px-4 py-2 transition-all duration-200 ${
          value === 'young-person'
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-card'
            : 'text-warm-600 hover:text-warm-800 hover:bg-warm-50'
        }`}
      >
        🧑 I'm a young person
      </button>
      <button
        type="button"
        onClick={() => onChange('parent-carer')}
        className={`rounded-full px-4 py-2 transition-all duration-200 ${
          value === 'parent-carer'
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-card'
            : 'text-warm-600 hover:text-warm-800 hover:bg-warm-50'
        }`}
      >
        👨‍👩‍👧 Parent / Carer
      </button>
    </div>
  )
}
