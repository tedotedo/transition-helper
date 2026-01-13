import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface PIPData {
  currentlyGetsDLA: string
  dlaCareComponent: string
  dlaMobilityComponent: string
  pipLetterReceived: boolean
  pipApplicationStarted: boolean
  assessmentDate: string
  helpWithDaily: string[]
  helpWithMobility: string[]
  notes: string
  lastUpdated: string
}

const STORAGE_KEY = 'transition-care-pip-info'

const dailyActivities = [
  { id: 'preparing-food', label: 'Preparing food', description: 'e.g. planning meals, cooking, using kitchen equipment safely' },
  { id: 'eating-drinking', label: 'Eating and drinking', description: 'e.g. cutting food, feeding yourself, using special equipment' },
  { id: 'managing-treatments', label: 'Managing treatments', description: 'e.g. taking medicines, monitoring conditions, managing therapy' },
  { id: 'washing-bathing', label: 'Washing and bathing', description: 'e.g. getting in/out of bath, washing yourself, staying safe' },
  { id: 'toileting', label: 'Managing toilet needs', description: 'e.g. getting to toilet, managing incontinence' },
  { id: 'dressing', label: 'Dressing and undressing', description: 'e.g. choosing clothes, putting them on, doing buttons/zips' },
  { id: 'communicating', label: 'Communicating', description: 'e.g. speaking, understanding, reading, using communication aids' },
  { id: 'reading-signs', label: 'Reading and understanding signs', description: 'e.g. reading signs, understanding symbols, following directions' },
  { id: 'socialising', label: 'Mixing with other people', description: 'e.g. social anxiety, behaving appropriately, making friends' },
  { id: 'budgeting', label: 'Managing money', description: 'e.g. understanding money, planning spending, paying for things' },
]

const mobilityActivities = [
  { id: 'planning-journeys', label: 'Planning and following journeys', description: 'e.g. working out routes, dealing with unexpected changes' },
  { id: 'moving-around', label: 'Moving around', description: 'e.g. walking, standing, physical fatigue, pain, breathlessness' },
]

function getStoredData(): PIPData | null {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

function saveData(data: PIPData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function LookIntoPIP() {
  const [currentlyGetsDLA, setCurrentlyGetsDLA] = useState('')
  const [dlaCareComponent, setDlaCareComponent] = useState('')
  const [dlaMobilityComponent, setDlaMobilityComponent] = useState('')
  const [pipLetterReceived, setPipLetterReceived] = useState(false)
  const [pipApplicationStarted, setPipApplicationStarted] = useState(false)
  const [assessmentDate, setAssessmentDate] = useState('')
  const [helpWithDaily, setHelpWithDaily] = useState<string[]>([])
  const [helpWithMobility, setHelpWithMobility] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = getStoredData()
    if (stored) {
      setCurrentlyGetsDLA(stored.currentlyGetsDLA || '')
      setDlaCareComponent(stored.dlaCareComponent || '')
      setDlaMobilityComponent(stored.dlaMobilityComponent || '')
      setPipLetterReceived(stored.pipLetterReceived || false)
      setPipApplicationStarted(stored.pipApplicationStarted || false)
      setAssessmentDate(stored.assessmentDate || '')
      setHelpWithDaily(stored.helpWithDaily || [])
      setHelpWithMobility(stored.helpWithMobility || [])
      setNotes(stored.notes || '')
    }
  }, [])

  const handleSave = () => {
    const data: PIPData = {
      currentlyGetsDLA,
      dlaCareComponent,
      dlaMobilityComponent,
      pipLetterReceived,
      pipApplicationStarted,
      assessmentDate,
      helpWithDaily,
      helpWithMobility,
      notes,
      lastUpdated: new Date().toISOString()
    }
    saveData(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const toggleDailyActivity = (id: string) => {
    if (helpWithDaily.includes(id)) {
      setHelpWithDaily(helpWithDaily.filter(a => a !== id))
    } else {
      setHelpWithDaily([...helpWithDaily, id])
    }
  }

  const toggleMobilityActivity = (id: string) => {
    if (helpWithMobility.includes(id)) {
      setHelpWithMobility(helpWithMobility.filter(a => a !== id))
    } else {
      setHelpWithMobility([...helpWithMobility, id])
    }
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">💰</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Go Stage Activity</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Look into PIP</h1>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3">What is PIP? 🤔</h2>
        <div className="space-y-3 text-sm text-warm-600 leading-relaxed">
          <p>
            <strong>PIP (Personal Independence Payment)</strong> is money from the government to help with extra costs if you have a
            long-term health condition or disability. It's not means-tested - that means it doesn't matter if your family has money or not.
          </p>
          <p>
            If you currently get <strong>DLA (Disability Living Allowance)</strong>, you'll usually need to apply for PIP when you turn 16.
            The DWP (Department for Work and Pensions) will write to you about this.
          </p>
          <div className="bg-accent-50 rounded-xl p-3 border border-accent-100 mt-3">
            <p className="text-sm text-accent-700">
              <strong>💡 Important:</strong> You can get PIP whether you're in school, college, work, or not working.
              It's separate from other benefits.
            </p>
          </div>
        </div>
      </section>

      {/* Current DLA Status */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>📋</span>
          <span>Your current situation</span>
        </h2>

        <div className="space-y-4">
          <div>
            <label htmlFor="currently-gets-dla" className="block text-sm font-medium text-warm-700 mb-1">
              Do you currently get DLA (Disability Living Allowance)?
            </label>
            <select
              id="currently-gets-dla"
              value={currentlyGetsDLA}
              onChange={(e) => setCurrentlyGetsDLA(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            >
              <option value="">Select...</option>
              <option value="yes">Yes, I get DLA</option>
              <option value="no">No, I don&apos;t get DLA</option>
              <option value="unsure">I&apos;m not sure</option>
            </select>
          </div>

          {currentlyGetsDLA === 'yes' && (
            <div className="grid gap-4 md:grid-cols-2 animate-fade-in">
              <div>
                <label htmlFor="dla-care" className="block text-sm font-medium text-warm-700 mb-1">
                  DLA Care component
                </label>
                <select
                  id="dla-care"
                  value={dlaCareComponent}
                  onChange={(e) => setDlaCareComponent(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                >
                  <option value="">Select...</option>
                  <option value="higher">Higher rate</option>
                  <option value="middle">Middle rate</option>
                  <option value="lower">Lower rate</option>
                  <option value="none">I don&apos;t get this</option>
                </select>
              </div>
              <div>
                <label htmlFor="dla-mobility" className="block text-sm font-medium text-warm-700 mb-1">
                  DLA Mobility component
                </label>
                <select
                  id="dla-mobility"
                  value={dlaMobilityComponent}
                  onChange={(e) => setDlaMobilityComponent(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
                >
                  <option value="">Select...</option>
                  <option value="higher">Higher rate</option>
                  <option value="lower">Lower rate</option>
                  <option value="none">I don&apos;t get this</option>
                </select>
              </div>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={pipLetterReceived}
                onChange={(e) => setPipLetterReceived(e.target.checked)}
                className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
              />
              <span className="text-sm text-warm-700">I&apos;ve received a letter about applying for PIP</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={pipApplicationStarted}
                onChange={(e) => setPipApplicationStarted(e.target.checked)}
                className="w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
              />
              <span className="text-sm text-warm-700">I&apos;ve started my PIP application</span>
            </label>
          </div>

          {pipApplicationStarted && (
            <div className="animate-fade-in">
              <label htmlFor="assessment-date" className="block text-sm font-medium text-warm-700 mb-1">
                Assessment date (if scheduled)
              </label>
              <input
                id="assessment-date"
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
                className="w-full md:w-1/2 px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>
          )}
        </div>
      </section>

      {/* What PIP Looks At - Daily Living */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>🏠</span>
          <span>Daily living activities</span>
        </h2>
        <p className="text-sm text-warm-500 mb-4">
          PIP looks at what help you need with everyday tasks. Tick any areas where you need help, supervision, or prompting
          because of your condition. This helps you prepare for your application.
        </p>

        <div className="space-y-2">
          {dailyActivities.map((activity) => (
            <label
              key={activity.id}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                helpWithDaily.includes(activity.id)
                  ? 'bg-primary-50 border border-primary-200'
                  : 'bg-warm-50 border border-transparent hover:bg-warm-100'
              }`}
            >
              <input
                type="checkbox"
                checked={helpWithDaily.includes(activity.id)}
                onChange={() => toggleDailyActivity(activity.id)}
                className="mt-0.5 w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
              />
              <div>
                <span className="text-sm font-medium text-warm-800">{activity.label}</span>
                <p className="text-xs text-warm-500 mt-0.5">{activity.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* What PIP Looks At - Mobility */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>🚶</span>
          <span>Mobility activities</span>
        </h2>
        <p className="text-sm text-warm-500 mb-4">
          This is about getting around outside your home. Tick if you need help with these.
        </p>

        <div className="space-y-2">
          {mobilityActivities.map((activity) => (
            <label
              key={activity.id}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                helpWithMobility.includes(activity.id)
                  ? 'bg-primary-50 border border-primary-200'
                  : 'bg-warm-50 border border-transparent hover:bg-warm-100'
              }`}
            >
              <input
                type="checkbox"
                checked={helpWithMobility.includes(activity.id)}
                onChange={() => toggleMobilityActivity(activity.id)}
                className="mt-0.5 w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
              />
              <div>
                <span className="text-sm font-medium text-warm-800">{activity.label}</span>
                <p className="text-xs text-warm-500 mt-0.5">{activity.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>📝</span>
          <span>My notes</span>
        </h2>
        <p className="text-sm text-warm-500 mb-3">
          Write down examples of how your condition affects you day-to-day. This will help with your application.
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. On bad days I can't... I need help with... My condition makes it hard to..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all resize-none"
        />
      </section>

      {/* Save Button */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
        >
          <span>💾</span>
          <span>Save My Notes</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fade-in">
          <span>✓</span>
          <span>Your notes have been saved!</span>
        </div>
      )}

      {/* Helpful Links */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-5">
        <h3 className="font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>🔗</span>
          <span>Helpful resources</span>
        </h3>
        <div className="space-y-2 text-sm">
          <a
            href="https://www.gov.uk/pip"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>→</span>
            <span>GOV.UK - Personal Independence Payment (PIP)</span>
          </a>
          <a
            href="https://www.citizensadvice.org.uk/benefits/sick-or-disabled-people-and-carers/pip/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>→</span>
            <span>Citizens Advice - Help with PIP</span>
          </a>
          <a
            href="https://www.scope.org.uk/advice-and-support/pip-claim/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>→</span>
            <span>Scope - PIP guide for disabled people</span>
          </a>
        </div>
        <p className="mt-4 text-xs text-warm-500">
          💡 You can also get free help with your PIP application from Citizens Advice or disability charities in your area.
        </p>
      </section>
    </div>
  )
}
