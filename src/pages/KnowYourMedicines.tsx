import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Medicine {
  id: string
  name: string
  whatFor: string
  dose: string
  whenToTake: string[]
  colour: string
}

interface MedicinesData {
  medicines: Medicine[]
  pharmacyName: string
  pharmacyPhone: string
  lastUpdated: string
}

const STORAGE_KEY = 'transition-care-my-medicines'

const timingOptions = [
  { id: 'morning', label: 'Morning', emoji: '🌅' },
  { id: 'midday', label: 'Midday', emoji: '☀️' },
  { id: 'evening', label: 'Evening', emoji: '🌆' },
  { id: 'bedtime', label: 'Bedtime', emoji: '🌙' },
  { id: 'with-food', label: 'With food', emoji: '🍽️' },
  { id: 'as-needed', label: 'As needed', emoji: '⏰' },
]

const colourOptions = [
  { id: 'blue', class: 'bg-blue-400', label: 'Blue' },
  { id: 'pink', class: 'bg-pink-400', label: 'Pink' },
  { id: 'white', class: 'bg-gray-200', label: 'White' },
  { id: 'yellow', class: 'bg-yellow-400', label: 'Yellow' },
  { id: 'orange', class: 'bg-orange-400', label: 'Orange' },
  { id: 'green', class: 'bg-green-400', label: 'Green' },
  { id: 'purple', class: 'bg-purple-400', label: 'Purple' },
  { id: 'brown', class: 'bg-amber-700', label: 'Brown' },
]

function getStoredData(): MedicinesData | null {
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

function saveData(data: MedicinesData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function KnowYourMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [pharmacyName, setPharmacyName] = useState('')
  const [pharmacyPhone, setPharmacyPhone] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMedicine, setNewMedicine] = useState<Omit<Medicine, 'id'>>({
    name: '',
    whatFor: '',
    dose: '',
    whenToTake: [],
    colour: 'blue'
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = getStoredData()
    if (stored) {
      setMedicines(stored.medicines)
      setPharmacyName(stored.pharmacyName || '')
      setPharmacyPhone(stored.pharmacyPhone || '')
    }
  }, [])

  const handleSave = () => {
    const data: MedicinesData = {
      medicines,
      pharmacyName,
      pharmacyPhone,
      lastUpdated: new Date().toISOString()
    }
    saveData(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleAddMedicine = () => {
    if (!newMedicine.name.trim()) return

    const medicine: Medicine = {
      id: Date.now().toString(),
      ...newMedicine
    }
    const updatedMedicines = [...medicines, medicine]
    setMedicines(updatedMedicines)

    // Auto-save when adding
    const data: MedicinesData = {
      medicines: updatedMedicines,
      pharmacyName,
      pharmacyPhone,
      lastUpdated: new Date().toISOString()
    }
    saveData(data)

    setNewMedicine({ name: '', whatFor: '', dose: '', whenToTake: [], colour: 'blue' })
    setShowAddForm(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleRemoveMedicine = (id: string) => {
    const updatedMedicines = medicines.filter(m => m.id !== id)
    setMedicines(updatedMedicines)

    // Auto-save when removing
    const data: MedicinesData = {
      medicines: updatedMedicines,
      pharmacyName,
      pharmacyPhone,
      lastUpdated: new Date().toISOString()
    }
    saveData(data)
  }

  const toggleTiming = (timingId: string) => {
    const newTiming = newMedicine.whenToTake.includes(timingId)
      ? newMedicine.whenToTake.filter(t => t !== timingId)
      : [...newMedicine.whenToTake, timingId]
    setNewMedicine({ ...newMedicine, whenToTake: newTiming })
  }

  const getColourClass = (colourId: string) => {
    return colourOptions.find(c => c.id === colourId)?.class || 'bg-blue-400'
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
          <span className="text-3xl">💊</span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Steady Stage Activity</p>
            <h1 className="text-2xl md:text-3xl font-bold text-warm-800">Know Your Medicines</h1>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="bg-gradient-to-br from-primary-50 to-white rounded-2xl border border-primary-100 p-5 shadow-card">
        <h2 className="text-lg font-semibold text-warm-800 mb-3">Why is this important? 💡</h2>
        <div className="space-y-3 text-sm text-warm-600 leading-relaxed">
          <p>
            Knowing about your medicines is a big step towards looking after yourself. When you understand what each one does,
            you can:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-primary-500">✓</span>
              <span>Remember to take them at the right times</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">✓</span>
              <span>Tell doctors or pharmacists what you take if you need to</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">✓</span>
              <span>Notice if something doesn't feel right</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-500">✓</span>
              <span>Reorder prescriptions when you're running low</span>
            </li>
          </ul>
        </div>
      </section>

      {/* My Medicines List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
            <span>📋</span>
            <span>My Medicines</span>
          </h2>
          {!showAddForm && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
            >
              <span>+</span>
              <span>Add Medicine</span>
            </button>
          )}
        </div>

        {/* Add Medicine Form */}
        {showAddForm && (
          <div className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-200 p-5 space-y-4 animate-fade-in">
            <h3 className="font-semibold text-warm-800">Add a medicine</h3>

            {/* Medicine Name */}
            <div>
              <label htmlFor="med-name" className="block text-sm font-medium text-warm-700 mb-1">
                What's it called?
              </label>
              <input
                id="med-name"
                type="text"
                value={newMedicine.name}
                onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                placeholder="e.g. Paracetamol, Salbutamol inhaler..."
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>

            {/* What For */}
            <div>
              <label htmlFor="med-what-for" className="block text-sm font-medium text-warm-700 mb-1">
                What's it for?
              </label>
              <input
                id="med-what-for"
                type="text"
                value={newMedicine.whatFor}
                onChange={(e) => setNewMedicine({ ...newMedicine, whatFor: e.target.value })}
                placeholder="e.g. Helps with pain, keeps my breathing clear..."
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>

            {/* Dose */}
            <div>
              <label htmlFor="med-dose" className="block text-sm font-medium text-warm-700 mb-1">
                How much do you take?
              </label>
              <input
                id="med-dose"
                type="text"
                value={newMedicine.dose}
                onChange={(e) => setNewMedicine({ ...newMedicine, dose: e.target.value })}
                placeholder="e.g. 2 tablets, 2 puffs, 5ml..."
                className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-white text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
              />
            </div>

            {/* When to Take */}
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">When do you take it?</label>
              <div className="flex flex-wrap gap-2">
                {timingOptions.map((timing) => (
                  <button
                    key={timing.id}
                    type="button"
                    onClick={() => toggleTiming(timing.id)}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1 ${
                      newMedicine.whenToTake.includes(timing.id)
                        ? 'bg-primary-100 text-primary-700 ring-2 ring-primary-300'
                        : 'bg-warm-100 text-warm-600 hover:bg-warm-200'
                    }`}
                  >
                    <span>{timing.emoji}</span>
                    <span>{timing.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Colour */}
            <div>
              <label className="block text-sm font-medium text-warm-700 mb-2">What colour is it? (helps you remember!)</label>
              <div className="flex flex-wrap gap-2">
                {colourOptions.map((colour) => (
                  <button
                    key={colour.id}
                    type="button"
                    onClick={() => setNewMedicine({ ...newMedicine, colour: colour.id })}
                    className={`w-8 h-8 rounded-full ${colour.class} transition-all ${
                      newMedicine.colour === colour.id ? 'ring-2 ring-offset-2 ring-primary-500 scale-110' : 'hover:scale-105'
                    }`}
                    aria-label={colour.label}
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddMedicine}
                disabled={!newMedicine.name.trim()}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>✓</span>
                <span>Add Medicine</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false)
                  setNewMedicine({ name: '', whatFor: '', dose: '', whenToTake: [], colour: 'blue' })
                }}
                className="px-5 py-2 rounded-xl border border-warm-200 text-warm-600 font-medium hover:border-warm-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Medicines Grid */}
        {medicines.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {medicines.map((med) => (
              <div
                key={med.id}
                className="relative bg-white rounded-2xl border border-warm-200 p-5 shadow-card hover:shadow-card-hover transition-all group"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(med.id)}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-warm-100 text-warm-400 hover:bg-red-100 hover:text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                  aria-label={`Remove ${med.name}`}
                >
                  ×
                </button>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full ${getColourClass(med.colour)} flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-warm-800">{med.name}</p>
                    <p className="text-sm text-primary-600">{med.dose}</p>
                    {med.whatFor && (
                      <p className="mt-1 text-sm text-warm-500">{med.whatFor}</p>
                    )}
                    {med.whenToTake.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {med.whenToTake.map(t => {
                          const timing = timingOptions.find(to => to.id === t)
                          return timing ? (
                            <span key={t} className="text-xs bg-warm-100 px-2 py-1 rounded-full">
                              {timing.emoji} {timing.label}
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-warm-50 rounded-2xl border border-warm-200 border-dashed p-8 text-center">
            <span className="text-4xl">💊</span>
            <p className="mt-3 text-warm-600 font-medium">No medicines added yet</p>
            <p className="text-sm text-warm-500 mt-1">
              Click "Add Medicine" to start building your medicine list.
            </p>
          </div>
        )}
      </section>

      {/* Pharmacy Info */}
      <section className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card space-y-4">
        <h2 className="text-lg font-semibold text-warm-800 flex items-center gap-2">
          <span>🏪</span>
          <span>My Pharmacy</span>
        </h2>
        <p className="text-sm text-warm-500">
          It's useful to know where you get your medicines from, in case you need to order more or have questions.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="pharmacy-name" className="block text-sm font-medium text-warm-700 mb-1">
              Pharmacy name
            </label>
            <input
              id="pharmacy-name"
              type="text"
              value={pharmacyName}
              onChange={(e) => setPharmacyName(e.target.value)}
              placeholder="e.g. Boots, Lloyds Pharmacy..."
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
          </div>
          <div>
            <label htmlFor="pharmacy-phone" className="block text-sm font-medium text-warm-700 mb-1">
              Phone number
            </label>
            <input
              id="pharmacy-phone"
              type="tel"
              value={pharmacyPhone}
              onChange={(e) => setPharmacyPhone(e.target.value)}
              placeholder="e.g. 01onal 123 456 7890"
              className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-all"
            />
          </div>
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
          <span>Save All Info</span>
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3 animate-fade-in">
          <span>✓</span>
          <span>Your medicine information has been saved!</span>
        </div>
      )}

      {/* Safety Tips */}
      <section className="bg-gradient-to-br from-accent-50 to-white rounded-2xl border border-accent-100 p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="text-sm text-warm-600 space-y-2">
            <p className="font-semibold text-warm-800">Important reminders</p>
            <ul className="space-y-1">
              <li>• Never take someone else's medicines</li>
              <li>• If you miss a dose, don't take double - check the leaflet or ask a pharmacist</li>
              <li>• Tell your doctor if you have any side effects</li>
              <li>• Keep a list of your medicines on your phone in case of emergencies</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
