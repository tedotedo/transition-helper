interface NamedWorkerCardProps {
  name: string
  role: string
  phone?: string
  email?: string
}

export function NamedWorkerCard({ name, role, phone, email }: NamedWorkerCardProps) {
  return (
    <section className="rounded-2xl border border-warm-200 bg-white px-5 py-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Your go-to person 🤝</p>
      <div className="mt-3 flex items-center gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent-400 to-accent-500 text-sm font-bold text-white shadow-card">
          {name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase()}
        </span>
        <div>
          <p className="text-base font-semibold text-warm-800">{name}</p>
          <p className="text-sm text-warm-500">{role}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {phone && (
          <a
            href={`tel:${phone}`}
            className="inline-flex items-center gap-2 rounded-full border border-warm-200 bg-warm-50 px-4 py-2 text-sm text-warm-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all"
          >
            📞 <span className="font-medium">Call</span>
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full border border-warm-200 bg-warm-50 px-4 py-2 text-sm text-warm-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-700 transition-all"
          >
            ✉️ <span className="font-medium">Email</span>
          </a>
        )}
      </div>

      <p className="mt-4 text-sm text-warm-500 leading-relaxed">
        Got questions about your transition? This is the person to ask! If they're not around, your team can also help.
      </p>
    </section>
  )
}
