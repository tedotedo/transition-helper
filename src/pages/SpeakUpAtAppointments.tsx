import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks'
import ReadAloud from '../components/ReadAloud'

interface SpeakUpData {
  practiceAnswers: string[]
  questionsToAsk: string[]
  confidenceLevel: number
  lastUpdated?: string
}

const STORAGE_KEY = 'transition-care-speak-up'

const practiceQuestions = [
  {
    question: "How have you been feeling lately?",
    tip: "Think about your energy levels, mood, any pain or discomfort, and how you've been sleeping.",
    example: "I've been feeling quite tired this week, and my leg has been a bit sore."
  },
  {
    question: "Have you had any problems with your treatment or medicines?",
    tip: "Think about side effects, forgetting doses, or anything that's been difficult.",
    example: "Sometimes I forget my evening tablet when I'm at a friend's house."
  },
  {
    question: "Is there anything worrying you about your health?",
    tip: "It's okay to share worries - that's what your team is there for!",
    example: "I'm a bit worried about going on the school trip next month."
  },
  {
    question: "What would you like to talk about today?",
    tip: "Think about anything you want to know more about or any changes you'd like.",
    example: "I'd like to know if I can do more sports with my condition."
  }
]

const conversationStarters = [
  "I've noticed that...",
  "I wanted to ask about...",
  "Something that's been bothering me is...",
  "I'm not sure I understand...",
  "Could you explain...",
  "What happens if...",
  "I've been wondering about..."
]

const initialData: SpeakUpData = {
  practiceAnswers: ['', '', '', ''],
  questionsToAsk: ['', '', ''],
  confidenceLevel: 3
}

export function SpeakUpAtAppointments() {
  const [data, setData] = useLocalStorage<SpeakUpData>(STORAGE_KEY, initialData)
  const [saved, setSaved] = useState(false)
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null)

  // Ensure arrays have the right length for display
  const practiceAnswers = data.practiceAnswers.length >= 4
    ? data.practiceAnswers
    : [...data.practiceAnswers, '', '', '', ''].slice(0, 4)
  const questionsToAsk = data.questionsToAsk.length >= 3
    ? data.questionsToAsk
    : [...data.questionsToAsk, '', '', ''].slice(0, 3)
  const confidenceLevel = data.confidenceLevel || 3

  const handleSave = useCallback(() => {
    setData({
      practiceAnswers,
      questionsToAsk: questionsToAsk.filter(q => q.trim() !== ''),
      confidenceLevel,
      lastUpdated: new Date().toISOString()
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }, [practiceAnswers, questionsToAsk, confidenceLevel, setData])

  const updateAnswer = useCallback((index: number, value: string) => {
    const newAnswers = [...practiceAnswers]
    newAnswers[index] = value
    setData(prev => ({ ...prev, practiceAnswers: newAnswers }))
  }, [practiceAnswers, setData])

  const updateQuestion = useCallback((index: number, value: string) => {
    const newQuestions = [...questionsToAsk]
    newQuestions[index] = value
    setData(prev => ({ ...prev, questionsToAsk: newQuestions }))
  }, [questionsToAsk, setData])

  const confidenceEmojis = ['😰', '😟', '😐', '🙂', '😊']
  const confidenceLabels = ['Very nervous', 'A bit nervous', 'Okay', 'Quite confident', 'Very confident']

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/journey" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to My Journey</span>
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-3xl">💬</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Steady Stage Activity</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Speak Up at Appointments</h1>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3">You've got this! 💪</h2>
        <div className="space-y-3 text-sm text-warm-600 leading-relaxed">
          <p>
            It can feel scary to speak up at appointments, especially if you're used to your parent or carer doing the talking.
            But the more you practise, the easier it gets!
          </p>
          <p>
            Your doctors and nurses <strong>want</strong> to hear from you - you know your own body better than anyone else.
          </p>
          <div className="mt-3">
            <ReadAloud text="It can feel scary to speak up at appointments, especially if you're used to your parent or carer doing the talking. But the more you practise, the easier it gets! Your doctors and nurses want to hear from you - you know your own body better than anyone else." />
          </div>
        </div>
      </section>

      {/* Conversation Starters */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>🗣️</span>
          <span>Helpful phrases to get started</span>
        </h2>
        <p className="text-sm text-warm-500 mb-4">Try using these to start a conversation with your care team:</p>
        <div className="flex flex-wrap gap-2">
          {conversationStarters.map((starter, i) => (
            <span
              key={i}
              className="px-3 py-2 bg-gradient-to-r from-accent-50 to-accent-100 text-accent-700 rounded-xl text-sm font-medium border border-accent-200"
            >
              {starter}
            </span>
          ))}
        </div>
      </section>

      {/* Practice Questions */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
          <span>📝</span>
          <span>Practice answering questions</span>
        </h2>
        <p className="text-sm text-warm-500">
          Click on each question to see tips and try writing your own answer. This helps you feel prepared!
        </p>

        <div className="space-y-3">
          {practiceQuestions.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 ${
                activeQuestion === index
                  ? 'border-primary-300 bg-gradient-to-br from-primary-50 to-white shadow-card'
                  : 'border-warm-200 bg-white hover:border-primary-200'
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
                className="w-full px-5 py-4 text-left flex items-center justify-between"
              >
                <span className="font-medium text-warm-800">&quot;{item.question}&quot;</span>
                <span className={`text-warm-400 transition-transform duration-200 ${activeQuestion === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {activeQuestion === index && (
                <div className="px-5 pb-5 space-y-4 animate-fade-in">
                  <div className="bg-accent-50 rounded-xl p-3 border border-accent-100">
                    <p className="text-sm text-accent-700">
                      <strong>💡 Tip:</strong> {item.tip}
                    </p>
                    <div className="mt-2">
                      <ReadAloud text={item.tip} />
                    </div>
                  </div>
                  <div className="bg-warm-50 rounded-xl p-3 border border-warm-100">
                    <p className="text-sm text-warm-600">
                      <strong>Example answer:</strong> &quot;{item.example}&quot;
                    </p>
                    <div className="mt-2">
                      <ReadAloud text={item.example} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`answer-${index}`} className="block text-sm font-medium text-warm-700 mb-2">
                      Your practice answer:
                    </label>
                    <textarea
                      id={`answer-${index}`}
                      value={practiceAnswers[index]}
                      onChange={(e) => updateAnswer(index, e.target.value)}
                      placeholder="Try writing your own answer..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Questions to Ask */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>❓</span>
          <span>Questions I want to ask at my next appointment</span>
        </h2>
        <p className="text-sm text-warm-500 mb-4">
          Write down anything you want to ask so you don't forget!
        </p>
        <div className="space-y-3">
          {questionsToAsk.map((question, index) => (
            <input
              key={index}
              type="text"
              value={question}
              onChange={(e) => updateQuestion(index, e.target.value)}
              placeholder={`Question ${index + 1}...`}
              className="w-full px-4 py-3 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
          ))}
        </div>
      </section>

      {/* Confidence Slider */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3 flex items-center gap-2">
          <span>📊</span>
          <span>How confident do you feel about speaking at appointments?</span>
        </h2>
        <div className="space-y-4">
          <input
            type="range"
            min="1"
            max="5"
            value={confidenceLevel}
            onChange={(e) => setData(prev => ({ ...prev, confidenceLevel: parseInt(e.target.value) }))}
            className="w-full h-3 bg-warm-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
          />
          <div className="flex justify-between text-2xl">
            {confidenceEmojis.map((emoji, i) => (
              <span
                key={i}
                className={`transition-all duration-200 ${i + 1 === confidenceLevel ? 'scale-150' : 'opacity-50'}`}
              >
                {emoji}
              </span>
            ))}
          </div>
          <p className="text-center text-sm font-medium text-warm-600">
            {confidenceLabels[confidenceLevel - 1]}
          </p>
        </div>
      </section>

      {/* Save Button */}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
        >
          <span>💾</span>
          <span>Save My Progress</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fade-in">
          <span>✓</span>
          <span>Your progress has been saved!</span>
        </div>
      )}

      {/* Encouragement */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⭐</span>
          <div className="text-sm text-warm-600">
            <p className="font-semibold text-warm-800 mb-1">Remember!</p>
            <p>
              It's okay to say "I don't know" or "Can you explain that differently?" Your care team won't mind at all -
              they'd rather you ask than leave confused!
            </p>
            <div className="mt-3">
              <ReadAloud text="It's okay to say I don't know or Can you explain that differently? Your care team won't mind at all - they'd rather you ask than leave confused!" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
