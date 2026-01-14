import { useState } from 'react'
import { useLocalStorage } from '../../hooks'

interface NamedWorker {
  name: string
  role: string
  phone: string
  email: string
}

const NAMED_WORKER_STORAGE_KEY = 'transition-named-worker'

const emptyWorker: NamedWorker = {
  name: '',
  role: '',
  phone: '',
  email: '',
}

export function NamedWorkerCard() {
  const [worker, setWorker] = useLocalStorage<NamedWorker>(NAMED_WORKER_STORAGE_KEY, emptyWorker)
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState<NamedWorker>(worker)

  const hasWorker = worker.name.trim() !== ''

  const handleSave = () => {
    setWorker(draft)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraft(worker)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setDraft(worker)
    setIsEditing(true)
  }

  // Empty state - prompt to add
  if (!hasWorker && !isEditing) {
    return (
      <section className="rounded-2xl border border-warm-200 border-dashed bg-warm-50/50 px-5 py-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Your go-to person</p>
        <div className="mt-4 text-center py-4">
          <span className="text-3xl">🤝</span>
          <p className="mt-2 text-warm-600 font-medium">Add your named worker</p>
          <p className="text-sm text-warm-500 mt-1">This is your main contact for transition questions</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
          >
            + Add Contact
          </button>
        </div>
      </section>
    )
  }

  // Edit form
  if (isEditing) {
    return (
      <section className="rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white px-5 py-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Your go-to person</p>
        <div className="mt-4 space-y-3">
          <div>
            <label htmlFor="nw-name" className="block text-sm font-medium text-warm-700 mb-1">Name *</label>
            <input
              id="nw-name"
              type="text"
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="e.g. Sarah Johnson"
              className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <div>
            <label htmlFor="nw-role" className="block text-sm font-medium text-warm-700 mb-1">Role</label>
            <input
              id="nw-role"
              type="text"
              value={draft.role}
              onChange={(e) => setDraft({ ...draft, role: e.target.value })}
              placeholder="e.g. Transition Coordinator"
              className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="nw-phone" className="block text-sm font-medium text-warm-700 mb-1">Phone</label>
              <input
                id="nw-phone"
                type="tel"
                value={draft.phone}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                placeholder="0123 456 7890"
                className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
            <div>
              <label htmlFor="nw-email" className="block text-sm font-medium text-warm-700 mb-1">Email</label>
              <input
                id="nw-email"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                placeholder="name@nhs.uk"
                className="w-full px-3 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              disabled={!draft.name.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card hover:shadow-card-hover transition-all disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl border border-warm-200 text-warm-600 text-sm font-medium hover:border-warm-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </section>
    )
  }

  // Display mode
  return (
    <section className="rounded-2xl border border-warm-200 bg-white px-5 py-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Your go-to person</p>
        <button
          onClick={handleEdit}
          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
        >
          Edit
        </button>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-500 text-sm font-bold text-white shadow-card">
          {worker.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </span>
        <div>
          <p className="text-base font-semibold text-warm-800">{worker.name}</p>
          {worker.role && <p className="text-sm text-warm-500">{worker.role}</p>}
        </div>
      </div>

      {(worker.phone || worker.email) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {worker.phone && (
            <a
              href={`tel:${worker.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-warm-200 bg-warm-50 px-4 py-2 text-sm text-warm-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all"
            >
              <span>📞</span> <span className="font-medium">Call</span>
            </a>
          )}
          {worker.email && (
            <a
              href={`mailto:${worker.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-warm-200 bg-warm-50 px-4 py-2 text-sm text-warm-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all"
            >
              <span>✉️</span> <span className="font-medium">Email</span>
            </a>
          )}
        </div>
      )}

      <p className="mt-4 text-sm text-warm-500 leading-relaxed">
        Got questions about your transition? This is the person to ask!
      </p>
    </section>
  )
}
