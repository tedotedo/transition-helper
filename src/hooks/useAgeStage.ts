import { useSyncExternalStore } from 'react'
import {
  AGE_BAND_EVENT,
  AGE_BAND_KEY,
  readStoredAge,
  stageFromStoredAge,
  type Stage,
  type StoredAge,
} from '../utils/ageStage'

function subscribe(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === null || e.key === AGE_BAND_KEY) callback()
  }
  window.addEventListener(AGE_BAND_EVENT, callback)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(AGE_BAND_EVENT, callback)
    window.removeEventListener('storage', onStorage)
  }
}

/** The stored age group: an age band, 'skipped', or null if we haven't asked yet. */
export function useStoredAge(): StoredAge {
  return useSyncExternalStore(subscribe, readStoredAge, () => null)
}

/** The stage that fits the user's age, or null if we don't know it. */
export function useAgeStage(): Stage | null {
  return stageFromStoredAge(useStoredAge())
}
