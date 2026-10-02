import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import { useRole, useSimpleLanguage, useStoredAge } from '../../hooks'
import {
  ageBands,
  ageBandToStage,
  isAgeBand,
  saveAgeBand,
  skipAgeBand,
  type AgeBand,
  type StoredAge,
} from '../../utils/ageStage'

const bandEmoji: Record<AgeBand, string> = {
  'under-11': '🌼',
  '11-13': '🌱',
  '14-15': '🌿',
  '16-17': '🌳',
  '18+': '🎓',
}

const stageKey = {
  'getting-started': 'stages.gettingStarted',
  'building-skills': 'stages.buildingSkills',
  'almost-there': 'stages.almostThere',
  'flying-solo': 'stages.flyingSolo',
} as const

function useAgeText() {
  const { t } = useTranslation()
  const { simpleLanguage } = useSimpleLanguage()
  const { isYoungPerson } = useRole()
  return {
    simpleLanguage,
    title: isYoungPerson
      ? t('age.title', 'How old are you?')
      : t('age.titleParent', 'How old is your young person?'),
    help: simpleLanguage
      ? t('age.helpSimple', 'Pick an age group. It stays on this device only.')
      : isYoungPerson
        ? t('age.help', 'We use this to show the stage that fits you. It stays on this device only. You can skip it and change it any time.')
        : t('age.helpParent', 'We use this to show the stage that fits them. It stays on this device only. You can skip it and change it any time.'),
    t,
  }
}

function bandLabel(band: AgeBand, t: (key: string, fallback: string) => string) {
  return band === 'under-11' ? t('age.under11', 'Under 11') : band
}

interface PickerProps {
  value: StoredAge
  onPick: (band: AgeBand) => void
  firstButtonRef?: React.Ref<HTMLButtonElement>
}

export function AgeBandPicker({ value, onPick, firstButtonRef }: PickerProps) {
  const { t, simpleLanguage } = useAgeText()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" role="group" aria-label={t('age.groupLabel', 'Age group')}>
      {ageBands.map((band, i) => (
        <button
          key={band}
          type="button"
          ref={i === 0 ? firstButtonRef : undefined}
          onClick={() => onPick(band)}
          aria-pressed={value === band}
          className={`flex flex-col items-center gap-1 rounded-xl border-2 px-3 py-3 font-semibold transition-all ${
            simpleLanguage ? 'text-lg' : 'text-sm'
          } ${
            value === band
              ? 'border-primary-400 bg-primary-50 text-primary-700'
              : 'border-warm-200 bg-white text-warm-700 hover:border-primary-200 hover:bg-primary-50/50'
          }`}
        >
          <span className="text-2xl" aria-hidden="true">{bandEmoji[band]}</span>
          <span>{bandLabel(band, t)}</span>
        </button>
      ))}
    </div>
  )
}

/** Friendly card on Home. Shown until the user answers or skips. */
export function AgeBandPrompt() {
  const stored = useStoredAge()
  const { title, help, t, simpleLanguage } = useAgeText()
  if (stored !== null) return null

  return (
    <section
      aria-labelledby="age-prompt-title"
      className="rounded-2xl border border-primary-200 bg-white p-5 shadow-card space-y-4"
    >
      <div className="space-y-1">
        <h2 id="age-prompt-title" className={`font-bold text-warm-800 ${simpleLanguage ? 'text-2xl' : 'text-lg'}`}>
          {title} 🎂
        </h2>
        <p className={`text-warm-600 ${simpleLanguage ? 'text-base' : 'text-sm'}`}>{help}</p>
      </div>
      <AgeBandPicker value={stored} onPick={saveAgeBand} />
      <button
        type="button"
        onClick={skipAgeBand}
        className={`text-warm-500 underline hover:text-primary-600 ${simpleLanguage ? 'text-base' : 'text-sm'}`}
      >
        {t('age.skip', 'Skip for now')}
      </button>
    </section>
  )
}

/** Pop-up to change the age group later. */
export function AgeBandDialog({ onClose }: { onClose: () => void }) {
  const stored = useStoredAge()
  const { title, help, t, simpleLanguage } = useAgeText()
  const firstRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    firstRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const stage = isAgeBand(stored) ? ageBandToStage(stored) : null

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-warm-900/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-dialog-title"
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl space-y-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="space-y-1">
          <h2 id="age-dialog-title" className={`font-bold text-warm-800 ${simpleLanguage ? 'text-2xl' : 'text-lg'}`}>
            {title}
          </h2>
          <p className={`text-warm-600 ${simpleLanguage ? 'text-base' : 'text-sm'}`}>{help}</p>
        </div>
        <AgeBandPicker
          value={stored}
          firstButtonRef={firstRef}
          onPick={band => {
            saveAgeBand(band)
            onClose()
          }}
        />
        {stage && (
          <p className="text-sm text-warm-600">
            {t('age.yourStageIs', 'Your stage:')} <strong>{t(stageKey[stage], stage)}</strong>
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              skipAgeBand()
              onClose()
            }}
            className="text-sm text-warm-500 underline hover:text-primary-600"
          >
            {t('age.clear', "Don't use my age")}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-warm-100 px-4 py-2 text-sm font-semibold text-warm-700 hover:bg-warm-200"
          >
            {t('age.close', 'Close')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

/** Button for the sidebar and the More menu that opens the dialog. */
export function AgeSettingButton({ className = '', onOpen }: { className?: string; onOpen?: () => void }) {
  const [open, setOpen] = useState(false)
  const stored = useStoredAge()
  const { t } = useTranslation()

  const label = isAgeBand(stored)
    ? `${t('age.settingsLabel', 'My age group')}: ${bandLabel(stored, t)}`
    : t('age.setNow', 'Set my age group')

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          onOpen?.()
        }}
        className={className}
      >
        <span aria-hidden="true">🎂</span>
        <span>{label}</span>
        {isAgeBand(stored) && <span className="text-xs underline">{t('age.change', 'Change')}</span>}
      </button>
      {open && <AgeBandDialog onClose={() => setOpen(false)} />}
    </>
  )
}
