import { useEffect, useRef } from 'react'
import { markIntroSeen } from './introStorage'

interface Props {
  onClose: () => void
}

export default function WelcomeIntro({ onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleClose = () => {
    markIntroSeen()
    onClose()
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-warm-900/70 backdrop-blur-sm p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Transition Ready"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close intro"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-warm-700 hover:text-warm-900 font-bold text-xl shadow-card"
        >
          ×
        </button>
        <video
          ref={videoRef}
          src="/intro.mp4"
          autoPlay
          controls
          playsInline
          className="w-full aspect-video bg-warm-900"
          onEnded={handleClose}
        />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 sm:p-6">
          <div>
            <div className="text-xs text-warm-500 uppercase tracking-wider font-semibold">
              Welcome
            </div>
            <div className="text-warm-800 font-semibold">
              A 55-second tour of Transition Ready
            </div>
          </div>
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover whitespace-nowrap"
          >
            Got it — let's go
          </button>
        </div>
      </div>
    </div>
  )
}
