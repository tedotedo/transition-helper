import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RoleToggle } from '../components/home/RoleToggle'
import { RoleSelector } from '../components/home/RoleSelector'
import { QuickActionTile } from '../components/home/QuickActionTile'
import { ProgressTracker } from '../components/home/ProgressTracker'
import { NamedWorkerCard } from '../components/home/NamedWorkerCard'
import { TipCallout } from '../components/home/TipCallout'
import { JourneyQuiz } from '../components/home/JourneyQuiz'
import { ParentQuiz } from '../components/home/ParentQuiz'
import {
  getRouteForAnswers,
  getMessageForAnswers,
  type QuizAnswers,
  type ParentQuizAnswers,
  type CombinedQuizAnswers
} from '../components/home/journeyQuizHelpers'
import type { UserRole } from '../hooks/useRole'
import { FloatingShapes, ConfettiCelebration } from '../components/illustrations'
// import { LanguageSwitcherCompact } from '../components/layout/LanguageSwitcher'
import { getChecklistProgress } from './Checklist'
import { getUpcomingAppointmentsCount } from './Appointments'
import { getCareTeamCount } from './CareTeam'
import { useRole } from '../hooks'
import ReadAloud from '../components/ReadAloud'
import VoicePicker from '../components/VoicePicker'

const LAST_BACKUP_KEY = 'transition-last-backup'
const USER_NAME_KEY = 'transition-user-name'
const FIRST_VISIT_KEY = 'transition-has-visited'

function isFirstTimeVisitor(): boolean {
  return !localStorage.getItem(FIRST_VISIT_KEY)
}

function markAsReturningVisitor(): void {
  localStorage.setItem(FIRST_VISIT_KEY, 'true')
}

// All localStorage keys used by the app
const ALL_STORAGE_KEYS = [
  'transition-app-role',
  'transition-care-checklist',
  'transition-care-appointments',
  'transition-care-plan',
  'transition-care-team',
  'transition-named-worker',
  'transition-care-my-team',
  'transition-last-backup',
  'transition-user-name',
  'transition-easy-read',
  'transition-has-visited',
]

function getLastBackupDate(): Date | null {
  const stored = localStorage.getItem(LAST_BACKUP_KEY)
  if (!stored) return null
  const date = new Date(stored)
  return isNaN(date.getTime()) ? null : date
}

function exportBackup(): void {
  const backup: Record<string, unknown> = {
    _exportDate: new Date().toISOString(),
    _appVersion: '1.0',
  }

  ALL_STORAGE_KEYS.forEach(key => {
    const value = localStorage.getItem(key)
    if (value) {
      try {
        backup[key] = JSON.parse(value)
      } catch {
        backup[key] = value
      }
    }
  })

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `transition-care-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  localStorage.setItem(LAST_BACKUP_KEY, new Date().toISOString())
}

function importBackup(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)

        // Restore each key
        ALL_STORAGE_KEYS.forEach(key => {
          if (data[key] !== undefined) {
            localStorage.setItem(key, typeof data[key] === 'string' ? data[key] : JSON.stringify(data[key]))
          }
        })

        localStorage.setItem(LAST_BACKUP_KEY, new Date().toISOString())
        resolve(true)
      } catch {
        resolve(false)
      }
    }
    reader.onerror = () => resolve(false)
    reader.readAsText(file)
  })
}

// Stage names now use translations (see getStageNames function below)

export function Home() {
  const { role, setRole } = useRole()
  const navigate = useNavigate()
  const { t } = useTranslation()

  // User name state
  const [userName, setUserName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(USER_NAME_KEY) || ''
    }
    return ''
  })
  const [isEditingName, setIsEditingName] = useState(false)
  const [nameInput, setNameInput] = useState('')

  // Dynamic data from localStorage
  const [checklistData, setChecklistData] = useState(() => getChecklistProgress())
  const [appointmentsCount, setAppointmentsCount] = useState(() => getUpcomingAppointmentsCount())
  const [teamCount, setTeamCount] = useState(() => getCareTeamCount())

  // Backup state
  const [backupMessage, setBackupMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // First-time visitor state - now with role selection step
  const [isFirstVisit, setIsFirstVisit] = useState(() => isFirstTimeVisitor())
  const [onboardingStep, setOnboardingStep] = useState<'role' | 'quiz' | 'complete'>('role')
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [welcomeMessage, setWelcomeMessage] = useState('')

  const handleRoleSelect = useCallback((selectedRole: UserRole) => {
    setSelectedRole(selectedRole)
    setRole(selectedRole) // Persist to context
    setOnboardingStep('quiz')
  }, [setRole])

  const handleBackToRoleSelect = useCallback(() => {
    setOnboardingStep('role')
    setSelectedRole(null)
  }, [])

  const handleYoungPersonQuizComplete = useCallback((answers: QuizAnswers) => {
    markAsReturningVisitor()
    const combined: CombinedQuizAnswers = { role: 'young-person', youngPerson: answers }
    setWelcomeMessage(getMessageForAnswers(combined))
    setOnboardingStep('complete')

    // Brief delay to show the completion message, then navigate
    setTimeout(() => {
      const route = getRouteForAnswers(combined)
      navigate(route)
    }, 1500)
  }, [navigate])

  const handleParentQuizComplete = useCallback((answers: ParentQuizAnswers) => {
    markAsReturningVisitor()
    const combined: CombinedQuizAnswers = { role: 'parent-carer', parent: answers }
    setWelcomeMessage(getMessageForAnswers(combined))
    setOnboardingStep('complete')

    // Brief delay to show the completion message, then navigate
    setTimeout(() => {
      const route = getRouteForAnswers(combined)
      navigate(route)
    }, 1500)
  }, [navigate])

  const handleDismissWelcome = useCallback(() => {
    markAsReturningVisitor()
    setIsFirstVisit(false)
  }, [])

  const handleBackup = useCallback(() => {
    exportBackup()
    setBackupMessage({ type: 'success', text: 'Backup downloaded! Keep it somewhere safe.' })
    setTimeout(() => setBackupMessage(null), 5000)
  }, [])

  const handleRestore = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const success = await importBackup(file)
    if (success) {
      setBackupMessage({ type: 'success', text: 'Data restored successfully! Refreshing...' })
      setTimeout(() => window.location.reload(), 1500)
    } else {
      setBackupMessage({ type: 'error', text: 'Could not restore backup. Is the file valid?' })
      setTimeout(() => setBackupMessage(null), 5000)
    }
    e.target.value = '' // Reset input
  }, [])

  const handleSaveName = useCallback(() => {
    const trimmedName = nameInput.trim()
    setUserName(trimmedName)
    localStorage.setItem(USER_NAME_KEY, trimmedName)
    setIsEditingName(false)
  }, [nameInput])

  const handleStartEditingName = useCallback(() => {
    setNameInput(userName)
    setIsEditingName(true)
  }, [userName])

  const handleClearName = useCallback(() => {
    setUserName('')
    localStorage.removeItem(USER_NAME_KEY)
    setIsEditingName(false)
  }, [])

  // Update data when localStorage changes (e.g., when returning from another page)
  useEffect(() => {
    const handleStorageChange = () => {
      setChecklistData(getChecklistProgress())
      setAppointmentsCount(getUpcomingAppointmentsCount())
      setTeamCount(getCareTeamCount())
    }

    // Also update on focus (when user comes back to the page)
    window.addEventListener('focus', handleStorageChange)
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('focus', handleStorageChange)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const { completed: checklistDone, total: checklistTotal, stage: currentStage, percent: progressPercent } = checklistData

  // Get translated stage names
  const stageNames: Record<string, string> = {
    'getting-started': t('stages.ready'),
    'building-skills': t('stages.steady'),
    'almost-there': t('stages.go'),
    'flying-solo': t('stages.adult'),
  }

  const tip = role === 'young-person' ? t('home.tip.youngPerson') : t('home.tip.parent')

  const heroHeading =
    role === 'young-person'
      ? userName ? t('home.heroYoung.greetingWithName', { name: userName }) + ' 👋' : t('home.heroYoung.greeting') + ' 👋'
      : t('home.heroParent.title')

  const heroBody =
    role === 'young-person'
      ? t('home.heroYoung.mainMessage')
      : t('home.heroParent.subtitle')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Backup message toast */}
      {backupMessage && (
        <div className={`rounded-xl px-4 py-3 flex items-center gap-2 text-sm ${
          backupMessage.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          <span>{backupMessage.type === 'success' ? '✓' : '!'}</span>
          <span>{backupMessage.text}</span>
        </div>
      )}

      {/* First-time visitor welcome - now starts with role selection */}
      {isFirstVisit && (
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent-500 via-accent-400 to-primary-400 px-4 py-6 sm:px-6 sm:py-8 shadow-card">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
            {/* Background video silhouette */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-10"
            >
              <source src="/Friendly_Doctor_Chatting_With_Youth_compressed.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative">
            {/* Step 1: Role Selection */}
            {onboardingStep === 'role' && (
              <RoleSelector onSelect={handleRoleSelect} />
            )}

            {/* Step 2: Quiz (different for each role) */}
            {onboardingStep === 'quiz' && selectedRole === 'young-person' && (
              <JourneyQuiz
                onComplete={handleYoungPersonQuizComplete}
                onSkip={handleDismissWelcome}
                onBack={handleBackToRoleSelect}
              />
            )}

            {onboardingStep === 'quiz' && selectedRole === 'parent-carer' && (
              <ParentQuiz
                onComplete={handleParentQuizComplete}
                onSkip={handleDismissWelcome}
                onBack={handleBackToRoleSelect}
              />
            )}

            {/* Step 3: Completion */}
            {onboardingStep === 'complete' && (
              <div className="text-center space-y-4 animate-fade-in py-8">
                <ConfettiCelebration active={true} density="heavy" />
                <div className="text-6xl animate-bounce">🎉</div>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Perfect! Taking you there now...
                </h2>
                <p className="text-lg text-white/90">{welcomeMessage}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Hero with role toggle */}
      {role === 'young-person' ? (
        <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary-500 via-primary-400 to-accent-400 px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 shadow-card">
          {/* Animated background elements */}
          <FloatingShapes variant="hero" />
          {/* Background video silhouette */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
          >
            <source src="/Friendly_Doctor_Chatting_With_Youth_compressed.mp4" type="video/mp4" />
          </video>
          {/* Floating icons */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <span className="absolute top-4 right-8 text-4xl opacity-20 animate-bounce" style={{ animationDuration: '2s' }}>🚀</span>
            <span className="absolute bottom-8 left-12 text-3xl opacity-15 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>💪</span>
            <span className="absolute top-1/3 right-1/4 text-2xl opacity-10 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}>⭐</span>
          </div>

          <div className="relative flex flex-col items-center text-center">
            <div className="space-y-5 md:space-y-6 max-w-2xl">
              {/* Role toggle */}
              <div className="flex justify-center">
                <RoleToggle value={role} onChange={setRole} />
              </div>

              <div className="flex items-center justify-center">
                <p className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 md:px-5 py-2 md:py-2.5 text-sm md:text-base font-bold text-white shadow-lg">
                  <span className="h-2 md:h-2.5 w-2 md:w-2.5 rounded-full bg-green-400 mr-2 animate-pulse" />
                  {t('home.heroYoung.journeyLabel')}
                </p>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-lg leading-tight px-2">
                {userName ? (
                  <>{t('home.heroYoung.greetingWithName', { name: userName })} <span className="inline-block animate-bounce">👋</span></>
                ) : (
                  <>{t('home.heroYoung.title')} <span className="inline-block animate-bounce">✨</span></>
                )}
              </h1>

              {/* Name input/display for young person */}
              <div className="flex items-center justify-center gap-2 px-2">
                {isEditingName ? (
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="What's your name?"
                      className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 border-white/30 bg-white/20 backdrop-blur-sm text-white placeholder-white/60 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-white/50 w-40 sm:w-48"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName()
                        if (e.key === 'Escape') setIsEditingName(false)
                      }}
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white text-primary-600 text-sm sm:text-base font-bold hover:bg-white/90 transition-colors shadow-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-white/70 text-sm sm:text-base hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : userName ? (
                  <button
                    onClick={handleStartEditingName}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/10 text-sm sm:text-base text-white/80 hover:bg-white/20 hover:text-white transition-all"
                  >
                    <span>✏️</span>
                    <span>{t('home.heroYoung.changeName')}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStartEditingName}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl border-2 border-dashed border-white/40 text-sm sm:text-base text-white/80 hover:border-white/60 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <span>🏷️</span>
                    <span>{t('home.heroYoung.addName')}</span>
                  </button>
                )}
                {userName && !isEditingName && (
                  <button
                    onClick={handleClearName}
                    className="text-sm sm:text-base text-white/50 hover:text-white/80 transition-colors"
                    title="Remove name"
                  >
                    ✕
                  </button>
                )}
              </div>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-semibold px-2">
                {t('home.heroYoung.mainMessage')}
              </p>

              {/* Read Aloud + Voice Picker (Easy Read mode) */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <ReadAloud text={heroBody} label="Read aloud" />
                <VoicePicker />
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 pt-4 px-2">
                <a
                  href="/journey"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white text-primary-600 text-base sm:text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  <span className="text-xl sm:text-2xl">🗺️</span> {t('home.startJourney')}
                </a>
                <a
                  href="/rights"
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl bg-white/20 backdrop-blur-sm text-white text-base sm:text-lg font-bold border-2 border-white/30 hover:bg-white/30 transition-all"
                >
                  <span className="text-xl sm:text-2xl">⚖️</span> {t('home.knowRights')}
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl bg-gradient-to-br from-primary-50 via-white to-accent-50/30 border border-primary-100 px-6 py-6 md:px-10 md:py-8 shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xl space-y-3">
              <p className="inline-flex items-center rounded-full bg-white border border-accent-200 px-3 py-1.5 text-xs font-medium text-accent-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-accent-400 mr-2 animate-pulse-soft" />
                Getting ready for adult care
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-warm-800">{heroHeading}</h1>
              <p className="text-sm md:text-base text-warm-600 leading-relaxed">{heroBody}</p>
            </div>
            <RoleToggle value={role} onChange={setRole} />
          </div>
        </section>
      )}

      {/* Quick actions */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <QuickActionTile
          icon="✅"
          title={t('home.quickActions.checklist')}
          href="/checklist"
          badge={`${checklistDone}/${checklistTotal}`}
          progress={progressPercent}
        />
        <QuickActionTile
          icon="📅"
          title={t('home.quickActions.appointments')}
          href="/appointments"
          badge={appointmentsCount > 0 ? appointmentsCount : undefined}
        />
        <QuickActionTile
          icon="📋"
          title={t('home.quickActions.carePlan')}
          href="/care-plan"
        />
        <QuickActionTile
          icon="👥"
          title={t('home.quickActions.careTeam')}
          href="/care-team"
          badge={teamCount > 0 ? teamCount : undefined}
        />
      </section>

      {/* Communication Passport banner */}
      <Link
        to="/care-plan/passport"
        className="flex items-center gap-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
      >
        <span className="text-4xl flex-shrink-0">🗂️</span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-base leading-tight">Communication Passport</p>
          <p className="text-accent-100 text-sm mt-0.5">Help any clinician understand how to communicate with your young person</p>
        </div>
        <span className="text-white text-xl flex-shrink-0">→</span>
      </Link>

      {/* Comic guide banner */}
      <Link
        to="/comic-guide"
        className="flex items-center gap-4 bg-white rounded-2xl border border-primary-100 p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
      >
        <img
          src="/zachs-transition-journey-comic.png"
          alt=""
          className="h-20 w-16 flex-shrink-0 rounded-lg border border-warm-200 object-cover object-top"
        />
        <div className="flex-1 min-w-0">
          <p className="text-warm-800 font-bold text-base leading-tight">Prefer pictures and short captions?</p>
          <p className="text-warm-500 text-sm mt-0.5">Try Zach's comic-strip guide to the transition journey.</p>
        </div>
        <span className="text-primary-500 text-xl flex-shrink-0">→</span>
      </Link>

      {/* Progress tracker */}
      <ProgressTracker stageName={stageNames[currentStage] || 'Almost There'} percent={progressPercent} />

      {/* Resources */}
      <section className="grid gap-4 md:grid-cols-3">
        <ResourceCard
          title={t('home.resources.learnAdult')}
          description={t('home.resources.learnAdultDesc')}
          href="/rights"
          exploreText={t('buttons.explore')}
        />
        <ResourceCard
          title={t('home.resources.skillsBuilder')}
          description={t('home.resources.skillsBuilderDesc')}
          href="/skills"
          exploreText={t('buttons.explore')}
        />
        <ResourceCard
          title={t('home.resources.questions')}
          description={t('home.resources.questionsDesc')}
          href="/questions"
          exploreText={t('buttons.explore')}
        />
      </section>

      {/* Tip */}
      <TipCallout tip={tip} />

      {/* Named worker */}
      <NamedWorkerCard />

      {/* Backup section */}
      <section className="rounded-2xl border border-warm-200 bg-white p-5 shadow-card">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💾</span>
          <div className="flex-1">
            <h2 className="font-semibold text-warm-800">{t('home.backup.title')}</h2>
            <p className="text-sm text-warm-500 mt-1">
              {t('home.backup.description')}
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              <button
                onClick={handleBackup}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold shadow-card hover:shadow-card-hover transition-all"
              >
                {t('home.backup.download')}
              </button>
              <label className="px-4 py-2 rounded-xl border border-warm-200 text-warm-600 text-sm font-medium hover:border-warm-300 cursor-pointer transition-all">
                {t('home.backup.restore')}
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestore}
                  className="hidden"
                />
              </label>
            </div>
            {getLastBackupDate() && (
              <p className="text-xs text-warm-400 mt-3">
                {t('home.backup.lastBackup')} {getLastBackupDate()?.toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

interface ResourceCardProps {
  title: string
  description: string
  href?: string
  disabled?: boolean
  exploreText?: string
  comingSoonText?: string
}

function ResourceCard({ title, description, href, disabled, exploreText = 'Explore', comingSoonText = 'Coming soon' }: ResourceCardProps) {
  const content = (
    <div
      className={`flex h-full flex-col rounded-2xl border bg-white px-5 py-5 shadow-card text-sm transition-all duration-300 ${
        disabled
          ? 'border-warm-100 opacity-60'
          : 'border-warm-200 hover:border-primary-300 hover:shadow-card-hover hover:-translate-y-0.5'
      }`}
    >
      <h2 className="text-base font-semibold text-warm-800">{title}</h2>
      <p className="mt-2 text-warm-600 flex-1 leading-relaxed">{description}</p>
      <span className={`mt-4 inline-flex items-center text-sm font-medium ${disabled ? 'text-warm-400' : 'text-primary-600'}`}>
        {disabled ? `🔜 ${comingSoonText}` : exploreText}
        {!disabled && <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>}
      </span>
    </div>
  )

  if (disabled || !href) {
    return content
  }

  return (
    <a href={href} className="block group">
      {content}
    </a>
  )
}
