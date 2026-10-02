// Works out which stage fits the user's age group.
// The age group is stored in this browser only (localStorage). Nothing is sent anywhere.

export type Stage = 'getting-started' | 'building-skills' | 'almost-there' | 'flying-solo'
export type AgeBand = 'under-11' | '11-13' | '14-15' | '16-17' | '18+'
// 'skipped' means the user chose not to say. null means we haven't asked yet.
export type StoredAge = AgeBand | 'skipped' | null

export const AGE_BAND_KEY = 'transition-age-band'
export const AGE_BAND_EVENT = 'transition-age-band-changed'

// Used when we don't know the age (the same stage the app has always started on)
export const FALLBACK_STAGE: Stage = 'almost-there'

export const ageBands: AgeBand[] = ['under-11', '11-13', '14-15', '16-17', '18+']

const stageForBand: Record<AgeBand, Stage> = {
  'under-11': 'getting-started',
  '11-13': 'getting-started',
  '14-15': 'building-skills',
  '16-17': 'almost-there',
  '18+': 'flying-solo',
}

export function isAgeBand(value: unknown): value is AgeBand {
  return typeof value === 'string' && (ageBands as string[]).includes(value)
}

export function ageBandToStage(band: AgeBand): Stage {
  return stageForBand[band]
}

export function readStoredAge(): StoredAge {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(AGE_BAND_KEY)
    if (raw === 'skipped') return 'skipped'
    return isAgeBand(raw) ? raw : null
  } catch {
    return null
  }
}

// The stage that matches the stored age, or null if we don't know it
export function stageFromStoredAge(stored: StoredAge): Stage | null {
  return isAgeBand(stored) ? ageBandToStage(stored) : null
}

function write(value: AgeBand | 'skipped' | null) {
  try {
    if (value === null) window.localStorage.removeItem(AGE_BAND_KEY)
    else window.localStorage.setItem(AGE_BAND_KEY, value)
  } catch {
    // Storage can be blocked (for example in private browsing). The app still works without it.
  }
  window.dispatchEvent(new Event(AGE_BAND_EVENT))
}

export function saveAgeBand(band: AgeBand) {
  write(band)
}

export function skipAgeBand() {
  write('skipped')
}

export function clearAgeBand() {
  write(null)
}

// Stage ids saved by earlier versions of the app, mapped to the current ids
const legacyStageIds: Record<string, Stage> = {
  'ready': 'getting-started',
  'steady': 'building-skills',
  'go': 'almost-there',
  'adult': 'flying-solo',
}

export function migrateStageId(raw: string | undefined): Stage | undefined {
  if (!raw) return undefined
  return legacyStageIds[raw] ?? (raw as Stage)
}

// The checklist remembers a stage the user tapped, and the age group they had set at the time.
// If the age group changes later, that tap is ignored and the stage follows the new age.
export interface StageChoice {
  stage: Stage
  band: string // the stored age at the time, or 'none'
}

export function resolveStage(
  saved: { currentStage?: string; stageChoice?: StageChoice } | null | undefined,
  stored: StoredAge
): Stage {
  const bandKey = isAgeBand(stored) ? stored : 'none'
  if (saved?.stageChoice && saved.stageChoice.band === bandKey) return saved.stageChoice.stage
  const fromAge = stageFromStoredAge(stored)
  if (fromAge) return fromAge
  return migrateStageId(saved?.currentStage) ?? FALLBACK_STAGE
}

export function choiceKey(stored: StoredAge): string {
  return isAgeBand(stored) ? stored : 'none'
}
