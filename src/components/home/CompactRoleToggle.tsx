import type { UserRole } from '../../hooks/useRole'

interface CompactRoleToggleProps {
  value: UserRole
  onChange: (role: UserRole) => void
}

export function CompactRoleToggle({ value, onChange }: CompactRoleToggleProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-warm-200 bg-white p-0.5 text-xs font-medium shadow-sm">
      <button
        type="button"
        onClick={() => onChange('young-person')}
        className={`rounded-full px-2.5 py-1.5 transition-all duration-200 ${
          value === 'young-person'
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
            : 'text-warm-500 hover:text-warm-700'
        }`}
        title="I'm a young person"
      >
        🧑
      </button>
      <button
        type="button"
        onClick={() => onChange('parent-carer')}
        className={`rounded-full px-2.5 py-1.5 transition-all duration-200 ${
          value === 'parent-carer'
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-sm'
            : 'text-warm-500 hover:text-warm-700'
        }`}
        title="I'm a parent or carer"
      >
        👨‍👩‍👧
      </button>
    </div>
  )
}
