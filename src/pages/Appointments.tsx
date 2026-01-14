import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLocalStorage } from '../hooks'

interface Appointment {
  id: string
  title: string
  date: string
  time: string
  location: string
  notes: string
  questions: string[]
  completed: boolean
}

interface AppointmentsData {
  appointments: Appointment[]
  lastUpdated?: string
}

export const APPOINTMENTS_STORAGE_KEY = 'transition-care-appointments'

const initialData: AppointmentsData = {
  appointments: []
}

export function Appointments() {
  const [data, setData] = useLocalStorage<AppointmentsData>(APPOINTMENTS_STORAGE_KEY, initialData)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id' | 'completed'>>({
    title: '',
    date: '',
    time: '',
    location: '',
    notes: '',
    questions: ['']
  })

  const { appointments } = data

  // Separate upcoming and past appointments
  const today = new Date().toISOString().split('T')[0]
  const upcomingAppointments = appointments
    .filter(apt => !apt.completed && apt.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
  const pastAppointments = appointments
    .filter(apt => apt.completed || apt.date < today)
    .sort((a, b) => b.date.localeCompare(a.date))

  const handleAddAppointment = useCallback(() => {
    if (!newAppointment.title.trim() || !newAppointment.date) return

    const appointment: Appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      questions: newAppointment.questions.filter(q => q.trim() !== ''),
      completed: false
    }

    setData(prev => ({
      ...prev,
      appointments: [...prev.appointments, appointment],
      lastUpdated: new Date().toISOString()
    }))

    setNewAppointment({
      title: '',
      date: '',
      time: '',
      location: '',
      notes: '',
      questions: ['']
    })
    setShowAddForm(false)
  }, [newAppointment, setData])

  const handleDeleteAppointment = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      appointments: prev.appointments.filter(apt => apt.id !== id),
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const handleToggleComplete = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      appointments: prev.appointments.map(apt =>
        apt.id === id ? { ...apt, completed: !apt.completed } : apt
      ),
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const handleUpdateQuestion = useCallback((id: string, index: number, value: string) => {
    setData(prev => ({
      ...prev,
      appointments: prev.appointments.map(apt => {
        if (apt.id !== id) return apt
        const newQuestions = [...apt.questions]
        newQuestions[index] = value
        return { ...apt, questions: newQuestions }
      }),
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const handleAddQuestion = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      appointments: prev.appointments.map(apt =>
        apt.id === id ? { ...apt, questions: [...apt.questions, ''] } : apt
      ),
      lastUpdated: new Date().toISOString()
    }))
  }, [setData])

  const updateNewAppointmentField = <K extends keyof typeof newAppointment>(
    field: K,
    value: typeof newAppointment[K]
  ) => {
    setNewAppointment(prev => ({ ...prev, [field]: value }))
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Header */}
      <header className="space-y-3">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600 transition-colors">
          <span>←</span>
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-warm-800">My Appointments</h1>
              <p className="text-sm text-warm-500">
                {upcomingAppointments.length} upcoming appointment{upcomingAppointments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
            >
              + Add Appointment
            </button>
          )}
        </div>
      </header>

      {/* Add Appointment Form */}
      {showAddForm && (
        <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-200 p-5 shadow-card space-y-4">
          <h2 className="font-semibold text-warm-800 flex items-center gap-2">
            <span>📝</span>
            <span>Add New Appointment</span>
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="apt-title" className="block text-sm font-medium text-warm-700 mb-1">
                What's it for? *
              </label>
              <input
                id="apt-title"
                type="text"
                value={newAppointment.title}
                onChange={(e) => updateNewAppointmentField('title', e.target.value)}
                placeholder="e.g. Transition clinic, Blood test..."
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
            <div>
              <label htmlFor="apt-location" className="block text-sm font-medium text-warm-700 mb-1">
                Where?
              </label>
              <input
                id="apt-location"
                type="text"
                value={newAppointment.location}
                onChange={(e) => updateNewAppointmentField('location', e.target.value)}
                placeholder="e.g. Children's Hospital, Room 2..."
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="apt-date" className="block text-sm font-medium text-warm-700 mb-1">
                Date *
              </label>
              <input
                id="apt-date"
                type="date"
                value={newAppointment.date}
                onChange={(e) => updateNewAppointmentField('date', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
            <div>
              <label htmlFor="apt-time" className="block text-sm font-medium text-warm-700 mb-1">
                Time
              </label>
              <input
                id="apt-time"
                type="time"
                value={newAppointment.time}
                onChange={(e) => updateNewAppointmentField('time', e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>

          <div>
            <label htmlFor="apt-notes" className="block text-sm font-medium text-warm-700 mb-1">
              Notes / Reminders
            </label>
            <textarea
              id="apt-notes"
              value={newAppointment.notes}
              onChange={(e) => updateNewAppointmentField('notes', e.target.value)}
              placeholder="e.g. Bring medication list, wear short sleeves for blood test..."
              rows={2}
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 mb-2">
              Questions to ask (optional)
            </label>
            {newAppointment.questions.map((q, idx) => (
              <input
                key={idx}
                type="text"
                value={q}
                onChange={(e) => {
                  const newQuestions = [...newAppointment.questions]
                  newQuestions[idx] = e.target.value
                  updateNewAppointmentField('questions', newQuestions)
                }}
                placeholder={`Question ${idx + 1}...`}
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => updateNewAppointmentField('questions', [...newAppointment.questions, ''])}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add another question
            </button>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddAppointment}
              disabled={!newAppointment.title.trim() || !newAppointment.date}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Appointment
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setNewAppointment({
                  title: '',
                  date: '',
                  time: '',
                  location: '',
                  notes: '',
                  questions: ['']
                })
              }}
              className="px-5 py-2 rounded-xl border border-warm-200 text-warm-600 font-medium hover:border-warm-300"
            >
              Cancel
            </button>
          </div>
        </section>
      )}

      {/* Upcoming Appointments */}
      <section className="space-y-3">
        <h2 className="font-semibold text-warm-800 flex items-center gap-2">
          <span>📍</span>
          <span>Upcoming</span>
          {upcomingAppointments.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold">
              {upcomingAppointments.length}
            </span>
          )}
        </h2>

        {upcomingAppointments.length === 0 ? (
          <div className="bg-warm-50 rounded-2xl border border-warm-200 border-dashed p-6 text-center">
            <span className="text-3xl">📅</span>
            <p className="mt-2 text-warm-600 font-medium">No upcoming appointments</p>
            <p className="text-sm text-warm-500">Add your next appointment to keep track!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingAppointments.map(apt => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                isEditing={editingId === apt.id}
                onToggleEdit={() => setEditingId(editingId === apt.id ? null : apt.id)}
                onDelete={() => handleDeleteAppointment(apt.id)}
                onToggleComplete={() => handleToggleComplete(apt.id)}
                onUpdateQuestion={(idx, val) => handleUpdateQuestion(apt.id, idx, val)}
                onAddQuestion={() => handleAddQuestion(apt.id)}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </section>

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-semibold text-warm-500 flex items-center gap-2">
            <span>📜</span>
            <span>Past Appointments</span>
          </h2>
          <div className="space-y-3 opacity-75">
            {pastAppointments.map(apt => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                isEditing={editingId === apt.id}
                onToggleEdit={() => setEditingId(editingId === apt.id ? null : apt.id)}
                onDelete={() => handleDeleteAppointment(apt.id)}
                onToggleComplete={() => handleToggleComplete(apt.id)}
                onUpdateQuestion={(idx, val) => handleUpdateQuestion(apt.id, idx, val)}
                onAddQuestion={() => handleAddQuestion(apt.id)}
                formatDate={formatDate}
              />
            ))}
          </div>
        </section>
      )}

      {/* Tips */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div className="text-sm text-warm-600">
            <p className="font-semibold text-warm-800">Top tip!</p>
            <p>Write down questions before your appointment so you don't forget to ask them. It's your appointment - make the most of it!</p>
          </div>
        </div>
      </section>
    </div>
  )
}

interface AppointmentCardProps {
  appointment: Appointment
  isEditing: boolean
  onToggleEdit: () => void
  onDelete: () => void
  onToggleComplete: () => void
  onUpdateQuestion: (index: number, value: string) => void
  onAddQuestion: () => void
  formatDate: (date: string) => string
}

function AppointmentCard({
  appointment,
  isEditing,
  onToggleEdit,
  onDelete,
  onToggleComplete,
  onUpdateQuestion,
  onAddQuestion,
  formatDate,
}: AppointmentCardProps) {
  return (
    <div className={`bg-white rounded-2xl border p-4 shadow-card transition-all ${
      appointment.completed ? 'border-green-200 bg-green-50/50' : 'border-warm-200'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold ${appointment.completed ? 'text-green-700 line-through' : 'text-warm-800'}`}>
              {appointment.title}
            </h3>
            {appointment.completed && (
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                Done
              </span>
            )}
          </div>
          <p className="text-sm text-warm-600 mt-1">
            📅 {formatDate(appointment.date)}
            {appointment.time && ` at ${appointment.time}`}
          </p>
          {appointment.location && (
            <p className="text-sm text-warm-500">📍 {appointment.location}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleComplete}
            className={`p-2 rounded-lg transition-all ${
              appointment.completed
                ? 'bg-green-100 text-green-600'
                : 'bg-warm-100 text-warm-500 hover:bg-primary-100 hover:text-primary-600'
            }`}
            title={appointment.completed ? 'Mark as not done' : 'Mark as done'}
          >
            {appointment.completed ? '✓' : '○'}
          </button>
          <button
            onClick={onToggleEdit}
            className="p-2 rounded-lg bg-warm-100 text-warm-500 hover:bg-primary-100 hover:text-primary-600 transition-all"
            title="Edit"
          >
            {isEditing ? '▲' : '▼'}
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg bg-warm-100 text-warm-400 hover:bg-red-100 hover:text-red-500 transition-all"
            title="Delete"
          >
            ×
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 pt-4 border-t border-warm-200 space-y-3">
          {appointment.notes && (
            <div>
              <p className="text-xs font-medium text-warm-500 mb-1">Notes</p>
              <p className="text-sm text-warm-700 bg-warm-50 rounded-lg p-2">{appointment.notes}</p>
            </div>
          )}

          <div>
            <p className="text-xs font-medium text-warm-500 mb-2">Questions to ask</p>
            {appointment.questions.length === 0 ? (
              <p className="text-sm text-warm-400 italic">No questions added</p>
            ) : (
              appointment.questions.map((q, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <span className="text-warm-400">?</span>
                  <input
                    type="text"
                    value={q}
                    onChange={(e) => onUpdateQuestion(idx, e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 px-3 py-1.5 rounded-lg border border-warm-200 bg-white text-sm text-warm-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                </div>
              ))
            )}
            <button
              onClick={onAddQuestion}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add question
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Export helper function for getting appointment count (used by Home page)
export function getUpcomingAppointmentsCount(): number {
  const stored = localStorage.getItem(APPOINTMENTS_STORAGE_KEY)
  if (!stored) return 0

  try {
    const data: AppointmentsData = JSON.parse(stored)
    const today = new Date().toISOString().split('T')[0]
    return data.appointments.filter(apt => !apt.completed && apt.date >= today).length
  } catch {
    return 0
  }
}
