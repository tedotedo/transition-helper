import type { ReactNode } from 'react'

interface InfoCardProps {
  title: string
  id?: string
  highlight?: boolean
  children: ReactNode
}

/** White content card used on the information pages. */
export function InfoCard({ title, id, highlight, children }: InfoCardProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 rounded-2xl border px-5 py-5 shadow-card transition-all duration-300 hover:shadow-card-hover ${
        highlight
          ? 'border-primary-200 bg-gradient-to-br from-primary-50 to-white'
          : 'border-warm-200 bg-white hover:border-primary-200'
      }`}
    >
      <h2 className="text-base md:text-lg font-bold text-warm-800">{title}</h2>
      <div className="mt-3 space-y-3 text-sm text-warm-600 leading-relaxed">{children}</div>
    </section>
  )
}

interface ExternalLinkProps {
  href: string
  children: ReactNode
}

/** Link to an official website. Opens in a new tab. */
export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-600 underline hover:text-primary-700"
    >
      {children} ↗
    </a>
  )
}

interface OfficialLinksProps {
  links: { title: string; href: string }[]
}

/** A short list of official links, with the style guide's reminder line. */
export function OfficialLinks({ links }: OfficialLinksProps) {
  return (
    <div className="rounded-xl border border-warm-100 bg-warm-50 px-4 py-4 text-sm">
      <p className="font-semibold text-warm-800">Find out more</p>
      <ul className="mt-2 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <ExternalLink href={link.href}>{link.title}</ExternalLink>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-warm-500">For the most up-to-date information, see the official websites.</p>
    </div>
  )
}
