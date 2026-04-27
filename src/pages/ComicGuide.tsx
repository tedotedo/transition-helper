import { Link } from 'react-router-dom'
import ReadAloud from '../components/ReadAloud'

const panelSummaries = [
  'Start planning early so the move does not feel sudden.',
  'Build knowledge and practical skills one step at a time.',
  'Share your goals, worries, and what matters to you.',
  'Work with your team so important information follows you.',
  'Learn what adult services may feel like before you arrive.',
  'Ask for help after transfer if things feel hard.',
  'Use your voice and feedback to improve care.',
  'Look ahead with confidence: transition is a journey, not one moment.',
]

const panelImages = panelSummaries.map((summary, index) => ({
  panelNumber: index + 1,
  summary,
  src: `/comic-panels/zachs-transition-panel-${index + 1}.png`,
}))

const readAloudText = [
  "Zach's Transition Journey is a comic guide about moving from paediatric to adult medical services.",
  ...panelSummaries,
  'Small steps, your way. You are not just changing services, you are growing into your future.',
].join(' ')

export function ComicGuide() {
  return (
    <div className="space-y-6 animate-fade-in">
      <header className="space-y-4">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Visual guide</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Zach's transition journey</h1>
            <p className="text-sm md:text-base text-warm-600 leading-relaxed">
              A comic-strip version of the transition story for anyone who prefers pictures, short captions, and a friendly overview before using the planning tools.
            </p>
          </div>
          <ReadAloud text={readAloudText} />
        </div>
      </header>

      <section className="rounded-2xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-accent-50 p-4 md:p-5 shadow-card">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-base font-semibold text-warm-800">Use this when words feel like too much</h2>
            <p className="mt-1 text-sm text-warm-600">
              You can look through it together, pick one panel to talk about, or print it as a conversation starter.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-card hover:shadow-card-hover transition-all print:hidden"
          >
            <span>🖨️</span>
            <span>Print / save</span>
          </button>
        </div>
      </section>

      <section className="space-y-4 md:hidden print:hidden">
        <div>
          <h2 className="text-base font-semibold text-warm-800">Mobile comic view</h2>
          <p className="mt-1 text-sm text-warm-500">
            Each panel is shown separately so the words stay readable on a phone.
          </p>
        </div>
        <div className="space-y-4">
          {panelImages.map((panel) => (
            <article key={panel.panelNumber} className="overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-card">
              <img
                src={panel.src}
                alt={`Comic panel ${panel.panelNumber}: ${panel.summary}`}
                className="w-full"
                loading={panel.panelNumber > 2 ? 'lazy' : 'eager'}
              />
              <div className="border-t border-warm-100 bg-warm-50 px-4 py-3 text-sm text-warm-700">
                <p>{panel.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <figure className="hidden overflow-hidden rounded-2xl border border-warm-200 bg-white shadow-card md:block print:block print:shadow-none">
        <img
          src="/zachs-transition-journey-comic.png"
          alt="Comic strip called Zach's Transition Journey explaining eight steps in moving from paediatric to adult medical services: planning early, building skills, shared decisions, smooth transfer, knowing what to expect, support after transfer, voice and feedback, and looking ahead."
          className="w-full"
        />
      </figure>

      <section className="rounded-2xl border border-warm-200 bg-white p-5 shadow-card">
        <h2 className="text-base font-semibold text-warm-800">Plain-text version</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {panelSummaries.map((summary, index) => (
            <li key={summary} className="flex gap-3 rounded-xl bg-warm-50 px-4 py-3 text-sm text-warm-700">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                {index + 1}
              </span>
              <span>{summary}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
