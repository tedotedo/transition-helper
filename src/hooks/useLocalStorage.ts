import { useState, useCallback } from 'react'

/**
 * Custom hook for persisting state in localStorage
 * Handles JSON serialization/deserialization automatically
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Get initial value from localStorage or use provided default
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Wrapper for setState that also persists to localStorage
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        // Allow value to be a function (like regular setState)
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore))
        }
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // Function to remove the item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}

/**
 * Simplified hook for when you just need to persist an object
 * with automatic lastUpdated timestamp
 */
export function usePersistedData<T extends object>(
  key: string,
  initialValue: T
): {
  data: T & { lastUpdated?: string }
  updateData: (updates: Partial<T>) => void
  resetData: () => void
  hasExistingData: boolean
} {
  const [data, setData, removeData] = useLocalStorage<T & { lastUpdated?: string }>(
    key,
    initialValue
  )

  const updateData = useCallback(
    (updates: Partial<T>) => {
      setData((prev) => ({
        ...prev,
        ...updates,
        lastUpdated: new Date().toISOString(),
      }))
    },
    [setData]
  )

  const resetData = useCallback(() => {
    removeData()
  }, [removeData])

  const hasExistingData = Boolean(data.lastUpdated)

  return { data, updateData, resetData, hasExistingData }
}
