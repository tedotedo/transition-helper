import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useVoice } from '../hooks/useVoice'
import { useRole } from '../hooks'

/** Map voice lang codes to country flag emojis */
function langFlag(lang: string): string {
  if (lang.startsWith('en-GB')) return '\uD83C\uDDEC\uD83C\uDDE7'
  if (lang.startsWith('en-US')) return '\uD83C\uDDFA\uD83C\uDDF8'
  if (lang.startsWith('en-AU')) return '\uD83C\uDDE6\uD83C\uDDFA'
  if (lang.startsWith('en-IN')) return '\uD83C\uDDEE\uD83C\uDDF3'
  if (lang.startsWith('en-ZA')) return '\uD83C\uDDFF\uD83C\uDDE6'
  if (lang.startsWith('en-IE')) return '\uD83C\uDDEE\uD83C\uDDEA'
  if (lang.startsWith('en-NZ')) return '\uD83C\uDDF3\uD83C\uDDFF'
  if (lang.startsWith('en-CA')) return '\uD83C\uDDE8\uD83C\uDDE6'
  return '\uD83C\uDF10'
}

/** Preview a voice by speaking a short sample */
function previewVoice(voice: SpeechSynthesisVoice) {
  const synth = window.speechSynthesis
  if (!synth) return
  synth.cancel()
  const u = new SpeechSynthesisUtterance('Hello, this is how I sound.')
  u.voice = voice
  u.lang = voice.lang
  u.rate = 0.9
  u.pitch = 1.1
  synth.speak(u)
}

export default function VoicePicker() {
  const { voiceName, setVoiceName, voices } = useVoice()
  const { isYoungPerson } = useRole()
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const showPicker = isYoungPerson

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  const handleSelect = useCallback(
    (name: string) => {
      setVoiceName(name)
      setOpen(false)
      window.speechSynthesis?.cancel()
    },
    [setVoiceName]
  )

  if (!showPicker || voices.length === 0) return null

  // Calculate position for portal dropdown
  const btnRect = btnRef.current?.getBoundingClientRect()

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setOpen(!open)}
        aria-label="Change voice"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 bg-white border-warm-200 text-warm-600 hover:border-primary-400 hover:text-primary-600 transition-all duration-200 cursor-pointer"
      >
        <span className="text-base" aria-hidden="true">🗣️</span>
        <span>Voice</span>
      </button>

      {open &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setOpen(false)}
            />
            {/* Dropdown */}
            <div
              ref={dropdownRef}
              className="fixed z-[9999] bg-white rounded-2xl shadow-lg border border-warm-200 max-h-72 overflow-y-auto w-72"
              style={{
                top: btnRect ? btnRect.bottom + 8 : '50%',
                left: btnRect
                  ? Math.min(btnRect.left, window.innerWidth - 300)
                  : '50%',
              }}
            >
              <div className="p-2 border-b border-warm-100">
                <p className="text-xs font-medium text-warm-500 px-2 py-1">
                  Choose a voice
                </p>
              </div>
              <div className="p-1">
                {voices.map((voice) => {
                  const isSelected = voice.name === voiceName
                  return (
                    <div
                      key={voice.name}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-primary-50 border border-primary-200'
                          : 'hover:bg-warm-50'
                      }`}
                      onClick={() => handleSelect(voice.name)}
                    >
                      <span className="text-sm" aria-hidden="true">
                        {langFlag(voice.lang)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-warm-800 truncate">
                          {voice.name}
                        </p>
                        <p className="text-xs text-warm-500">{voice.lang}</p>
                      </div>
                      {isSelected && (
                        <span className="text-primary-600 text-sm" aria-hidden="true">
                          ✓
                        </span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          previewVoice(voice)
                        }}
                        aria-label={`Preview ${voice.name}`}
                        className="ml-1 p-1 rounded-full hover:bg-warm-100 text-warm-400 hover:text-primary-600 transition-colors"
                      >
                        <span className="text-sm" aria-hidden="true">▶</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  )
}
