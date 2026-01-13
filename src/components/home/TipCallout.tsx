interface TipCalloutProps {
  tip: string
}

export function TipCallout({ tip }: TipCalloutProps) {
  return (
    <section className="rounded-2xl border border-primary-200 bg-gradient-to-r from-primary-50 to-primary-100/50 px-5 py-5 shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">Quick tip</p>
          <p className="mt-1 text-sm text-warm-700 leading-relaxed">{tip}</p>
        </div>
      </div>
    </section>
  )
}
