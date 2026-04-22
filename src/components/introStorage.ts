const STORAGE_KEY = 'transition-intro-shown'

export function hasSeenIntro(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    /* ignore */
  }
}

export function resetIntro() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}
