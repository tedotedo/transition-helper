import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import ReadAloud from '../components/ReadAloud'

interface TransitionData {
  expectedMoveAge: string
  expectedMoveDate: string
  adultServiceName: string
  adultServiceLocation: string
  namedContactPerson: string
  firstMeetingDate: string
  questionsToAsk: string[]
  notes: string
  lastUpdated?: string
}

const STORAGE_KEY = 'transition-care-move-date'

const suggestedQuestions = [
  "When am I likely to move to adult services?",
  "What will my new service be called?",
  "Will I meet my new team before I move?",
  "Can my parent/carer come to my first appointment?",
  "What happens if I'm not ready to move yet?",
  "Will all my information be sent to the new team?",
  "Who do I contact if I have problems during the move?",
  "How is adult care different from children's services?"
]

const initialData: TransitionData = {
  expectedMoveAge: '',
  expectedMoveDate: '',
  adultServiceName: '',
  adultServiceLocation: '',
  namedContactPerson: '',
  firstMeetingDate: '',
  questionsToAsk: [],
  notes: ''
}

export function AskAboutMoveDate() {
  const [data, setData] = useLocalStorage<TransitionData>(STORAGE_KEY, initialData)
  const [customQuestion, setCustomQuestion] = useState('')
  const [saved, setSaved] = useState(false)

  // Destructure for easier access
  const {
    expectedMoveAge,
    expectedMoveDate,
    adultServiceName,
    adultServiceLocation,
    namedContactPerson,
    firstMeetingDate,
    questionsToAsk,
    notes
  } = data

  // Helper to update any field
  const updateField = useCallback(<K extends keyof TransitionData>(field: K, value: TransitionData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [setData])

  const handleSave = useCallback(() => {
    setData(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString()
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }, [setData])

  const toggleQuestion = useCallback((question: string) => {
    setData(prev => ({
      ...prev,
      questionsToAsk: prev.questionsToAsk.includes(question)
        ? prev.questionsToAsk.filter(q => q !== question)
        : [...prev.questionsToAsk, question]
    }))
  }, [setData])

  const addCustomQuestion = useCallback(() => {
    if (customQuestion.trim() && !questionsToAsk.includes(customQuestion.trim())) {
      setData(prev => ({
        ...prev,
        questionsToAsk: [...prev.questionsToAsk, customQuestion.trim()]
      }))
      setCustomQuestion('')
    }
  }, [customQuestion, questionsToAsk, setData])

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">📅</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Almost There Activity</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Ask About Your Move Date</h1>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3">What is transition? 🔄</h2>
        <div className="space-y-3 text-sm text-warm-600 leading-relaxed">
          <p>
            <strong>Transition</strong> is the process of moving from children's healthcare services to adult services.
            This usually happens between ages 16 and 18, but it can be different for everyone.
          </p>
          <p>
            It's really important to start talking about this early so you're not surprised! Your children's team should work
            with you and your family to make sure the move goes smoothly.
          </p>
          <div className="mt-3">
            <ReadAloud text="Transition is the process of moving from children's healthcare services to adult services. This usually happens between ages 16 and 18, but it can be different for everyone. It's really important to start talking about this early so you're not surprised! Your children's team should work with you and your family to make sure the move goes smoothly." />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-4 flex items-center gap-2">
          <span>📍</span>
          <span>My Transition Plan</span>
        </h2>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="move-age" className="block text-sm font-medium text-warm-700 mb-1">
                Expected move age
              </label>
              <select
                id="move-age"
                value={expectedMoveAge}
                onChange={(e) => updateField('expectedMoveAge', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              >
                <option value="">Select age...</option>
                <option value="16">16 years old</option>
                <option value="17">17 years old</option>
                <option value="18">18 years old</option>
                <option value="19+">19 or older</option>
                <option value="unknown">Not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="move-date" className="block text-sm font-medium text-warm-700 mb-1">
                Expected move date (if known)
              </label>
              <input
                id="move-date"
                type="month"
                value={expectedMoveDate}
                onChange={(e) => updateField('expectedMoveDate', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="adult-service" className="block text-sm font-medium text-warm-700 mb-1">
              Name of adult service (if known)
            </label>
            <input
              id="adult-service"
              type="text"
              value={adultServiceName}
              onChange={(e) => updateField('adultServiceName', e.target.value)}
              placeholder="e.g. Adult Diabetes Service, Adult Neurology..."
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
          </div>

          <div>
            <label htmlFor="adult-location" className="block text-sm font-medium text-warm-700 mb-1">
              Where is the adult service? (hospital/clinic name)
            </label>
            <input
              id="adult-location"
              type="text"
              value={adultServiceLocation}
              onChange={(e) => updateField('adultServiceLocation', e.target.value)}
              placeholder="e.g. St Mary's Hospital, City Health Centre..."
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="contact-person" className="block text-sm font-medium text-warm-700 mb-1">
                Named contact/transition coordinator
              </label>
              <input
                id="contact-person"
                type="text"
                value={namedContactPerson}
                onChange={(e) => updateField('namedContactPerson', e.target.value)}
                placeholder="e.g. Nurse Sarah, Dr. Smith..."
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>
            <div>
              <label htmlFor="first-meeting" className="block text-sm font-medium text-warm-700 mb-1">
                First meeting with adult team
              </label>
              <input
                id="first-meeting"
                type="date"
                value={firstMeetingDate}
                onChange={(e) => updateField('firstMeetingDate', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Questions to Ask */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>❓</span>
          <span>Questions to ask your team</span>
        </h2>
        <p className="text-sm text-warm-500 mb-4">
          Tick the questions you want to ask at your next appointment. You can also add your own!
        </p>

        <div className="space-y-2">
          {suggestedQuestions.map((question) => (
            <label
              key={question}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                questionsToAsk.includes(question)
                  ? 'bg-primary-50 border border-primary-200'
                  : 'bg-warm-50 border border-transparent hover:bg-warm-100'
              }`}
            >
              <input
                type="checkbox"
                checked={questionsToAsk.includes(question)}
                onChange={() => toggleQuestion(question)}
                className="mt-0.5 w-5 h-5 rounded border-warm-300 text-primary-600 focus:ring-primary-300"
              />
              <span className="text-sm text-warm-700">{question}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Add your own question..."
            className="flex-1 px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && addCustomQuestion()}
          />
          <button
            type="button"
            onClick={addCustomQuestion}
            className="px-4 py-2 rounded-xl bg-primary-100 text-primary-700 font-medium hover:bg-primary-200 transition-all"
          >
            Add
          </button>
        </div>
      </section>

      {/* Notes */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>📝</span>
          <span>My notes</span>
        </h2>
        <textarea
          value={notes}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Write down anything else you want to remember about your transition..."
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
          <span>Save My Plan</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fade-in">
          <span>✓</span>
          <span>Your transition plan has been saved!</span>
        </div>
      )}

      {/* Tips */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div className="text-sm text-warm-600 space-y-2">
            <p className="font-semibold text-warm-800">Good to know</p>
            <ul className="space-y-1">
              <li>• Some areas have a "transition clinic" where you meet both teams together</li>
              <li>• You might have a gradual handover with several joint appointments</li>
              <li>• If you don't feel ready, tell your team - they may be able to delay the move</li>
              <li>• Ask for a written summary of your care to take to your new team</li>
            </ul>
            <div className="mt-3">
              <ReadAloud text="Some areas have a transition clinic where you meet both teams together. You might have a gradual handover with several joint appointments. If you don't feel ready, tell your team - they may be able to delay the move. Ask for a written summary of your care to take to your new team." />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
