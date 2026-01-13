import { useState, useEffect } from 'react'
import { RoleToggle, type UserRole } from '../components/home/RoleToggle'
import { QuickActionTile } from '../components/home/QuickActionTile'
import { ProgressTracker } from '../components/home/ProgressTracker'
import { NamedWorkerCard } from '../components/home/NamedWorkerCard'
import { TipCallout } from '../components/home/TipCallout'

const ROLE_STORAGE_KEY = 'transition-app-role'

// Mock data - in future this could come from an API or local storage
const mockChecklist = [
  { id: '1', title: 'Read consent at 16–17 guide', done: true },
  { id: '2', title: 'Fill in Go questionnaire', done: true },
  { id: '3', title: 'Ask about transfer date', done: false },
  { id: '4', title: 'Check if PIP applies', done: false },
  { id: '5', title: 'Meet adult team', done: false },
]

const mockAppointments = [
  { id: '1', title: 'Transition clinic', date: '12 Feb 2026' },
]

const mockNamedWorker = {
  name: 'Sarah Johnson',
  role: 'Transition Coordinator',
  phone: '0123 456 7890',
  email: 'sarah.johnson@nhs.example',
}

const youngPersonNextSteps = [
  { number: 1, text: 'Fill in the Go questionnaire before your next visit.', href: '/resources/ready-steady-go/go-questionnaire', emoji: '📋' },
  { number: 2, text: 'Check out the consent guide - it explains who makes decisions about your care.', href: '/rights/consent-16-17', emoji: '✨' },
  { number: 3, text: 'Ask your team when you\'ll be moving to adult services.', emoji: '💬' },
]

const parentNextSteps = [
  { number: 1, text: 'Encourage your child to fill in their Go questionnaire.', href: '/resources/ready-steady-go/go-questionnaire', emoji: '📋' },
  { number: 2, text: 'Read through the parent info sheet together.', href: '/resources', emoji: '📖' },
  { number: 3, text: 'Chat with the team about how you can stay involved after 18.', emoji: '💬' },
]

const youngPersonTip = 'Try explaining your condition in your own words before your next appointment - it really helps your new team get to know you!'
const parentTip = "Let your child have a go at answering the first question at their next appointment. Small steps make a big difference!"

export function Home() {
  const [role, setRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(ROLE_STORAGE_KEY)
      if (stored === 'young-person' || stored === 'parent-carer') return stored
    }
    return 'young-person'
  })

  useEffect(() => {
    localStorage.setItem(ROLE_STORAGE_KEY, role)
  }, [role])

  const checklistDone = mockChecklist.filter((t) => t.done).length
  const checklistTotal = mockChecklist.length
  const progressPercent = Math.round((checklistDone / checklistTotal) * 100)

  const nextSteps = role === 'young-person' ? youngPersonNextSteps : parentNextSteps
  const tip = role === 'young-person' ? youngPersonTip : parentTip

  const heroHeading =
    role === 'young-person'
      ? "Hey, welcome back! 👋"
      : "Supporting your young person's journey"

  const heroBody =
    role === 'young-person'
      ? "We're here to help you understand what happens at 16 and 18, who makes decisions about your care, and how to feel more confident at appointments. You've got this!"
      : "This app helps you and your child get ready for adult services, understand how your role is changing, and find the support you both need."

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero with role toggle */}
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

      {/* Quick actions */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <QuickActionTile
          icon="✅"
          title="Checklist"
          href="/journey"
          badge={`${checklistDone}/${checklistTotal}`}
          progress={progressPercent}
        />
        <QuickActionTile
          icon="📅"
          title="Appointments"
          badge={mockAppointments.length}
          disabled
        />
        <QuickActionTile icon="📋" title="Care Plan" disabled />
        <QuickActionTile icon="👥" title="Care Team" disabled />
      </section>

      {/* Progress tracker */}
      <ProgressTracker stageName="Go" percent={progressPercent} />

      {/* Two-column layout: Named worker + Next steps */}
      <section className="grid gap-4 md:grid-cols-2">
        <NamedWorkerCard {...mockNamedWorker} />

        <div className="rounded-2xl border border-warm-200 bg-white px-5 py-5 shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <p className="text-xs font-semibold uppercase tracking-wider text-warm-500">Your next steps</p>
          <ol className="mt-4 space-y-4">
            {nextSteps.map((step) => (
              <li key={step.number} className="flex items-start gap-3 text-sm group">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-sm font-semibold text-primary-700 group-hover:from-primary-200 group-hover:to-primary-300 transition-all">
                  {step.number}
                </span>
                <span className="text-warm-700 pt-0.5">
                  <span className="mr-1">{step.emoji}</span>
                  {step.text}
                  {step.href && (
                    <a href={step.href} className="ml-1 text-primary-600 hover:text-primary-700 font-medium hover:underline">
                      Open →
                    </a>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Resources */}
      <section className="grid gap-4 md:grid-cols-3">
        <ResourceCard
          title="Learn about adult services"
          description="See what changes and what stays the same when you move to an adult team."
          href="/rights"
        />
        <ResourceCard
          title="Skills builder"
          description="Practise the skills that help you take more control of your care."
          disabled
        />
        <ResourceCard
          title="Questions & answers"
          description="Common questions from young people and families about transition."
          disabled
        />
      </section>

      {/* Tip */}
      <TipCallout tip={tip} />
    </div>
  )
}

interface ResourceCardProps {
  title: string
  description: string
  href?: string
  disabled?: boolean
}

function ResourceCard({ title, description, href, disabled }: ResourceCardProps) {
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
        {disabled ? '🔜 Coming soon' : 'Explore'}
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
