import { useState, useEffect, useCallback } from 'react'
import { useVoice } from '../hooks/useVoice'
import { useRole } from '../hooks'

/**
 * Voice selection priority (auto mode):
 * 1. en-GB female voice (e.g. Shelley, Flo)
 * 2. en-GB any voice (e.g. Daniel)
 * 3. en female voice from any region (e.g. Samantha, Karen)
 * 4. en any voice
 * 5. Browser default with lang: 'en-GB'
 */
function selectAutoVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  // 1. en-GB female
  const gbFemale = voices.find(
    (v) => v.lang.startsWith('en-GB') && /female|flo|shelley|kate|serena|martha/i.test(v.name)
  )
  if (gbFemale) return gbFemale

  // 2. en-GB any
  const gbAny = voices.find((v) => v.lang.startsWith('en-GB'))
  if (gbAny) return gbAny

  // 3. en female from any region
  const enFemale = voices.find(
    (v) => v.lang.startsWith('en') && /female|samantha|karen|victoria|fiona|moira|tessa/i.test(v.name)
  )
  if (enFemale) return enFemale

  // 4. en any voice
  const enAny = voices.find((v) => v.lang.startsWith('en'))
  if (enAny) return enAny

  return null
}

interface ReadAloudProps {
  text: string
  label?: string
}

export default function ReadAloud({ text, label = 'Read aloud' }: ReadAloudProps) {
  const { selectedVoice, voices } = useVoice()
  const { isYoungPerson } = useRole()
  const [speaking, setSpeaking] = useState(false)

  // Only show when young person mode is active
  const showReadAloud = isYoungPerson

  // Cancel speech on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  // Cancel if young person mode turns off while speaking
  useEffect(() => {
    if (!showReadAloud && speaking) {
      window.speechSynthesis?.cancel()
      setSpeaking(false)
    }
  }, [showReadAloud, speaking])

  const handleToggle = useCallback(() => {
    const synth = window.speechSynthesis
    if (!synth) return

    if (speaking) {
      synth.cancel()
      setSpeaking(false)
      return
    }

    // Build utterance
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = selectedVoice || selectAutoVoice(voices)
    if (voice) {
      utterance.voice = voice
      utterance.lang = voice.lang
    } else {
      utterance.lang = 'en-GB'
    }

    // Gentle voice parameters
    utterance.rate = 0.9
    utterance.pitch = 1.1

    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    synth.cancel() // clear any queued speech
    synth.speak(utterance)
    setSpeaking(true)
  }, [text, selectedVoice, voices, speaking])

  if (!showReadAloud) return null

  return (
    <button
      onClick={handleToggle}
      aria-label={speaking ? 'Stop reading aloud' : label}
      className={`read-aloud-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all duration-200 cursor-pointer ${
        speaking
          ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100'
          : 'bg-white border-warm-200 text-warm-600 hover:border-primary-400 hover:text-primary-600'
      }`}
    >
      <span className="text-base" aria-hidden="true">
        {speaking ? '⏹️' : '🔊'}
      </span>
      <span>{speaking ? 'Stop' : label}</span>
    </button>
  )
}
