import { useMemo } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  delay: number
  duration: number
  color: string
  size: number
  rotation: number
  isCircle: boolean
  spinDuration: number
}

interface ConfettiCelebrationProps {
  active?: boolean
  className?: string
  density?: 'light' | 'medium' | 'heavy'
}

const colors = [
  '#f97316', // primary-500
  '#fb923c', // primary-400
  '#fdba74', // primary-300
  '#14b8a6', // accent-500
  '#2dd4bf', // accent-400
  '#5eead4', // accent-300
]

// Generate pieces deterministically based on index
function generatePiece(index: number, total: number): ConfettiPiece {
  // Use index-based pseudo-random values for consistency
  const seed = index / total
  const seed2 = (index * 7) % total / total
  const seed3 = (index * 13) % total / total

  return {
    id: index,
    x: (seed * 100),
    delay: seed2 * 2,
    duration: 2 + seed3 * 2,
    color: colors[index % colors.length],
    size: 6 + (seed * 8),
    rotation: seed2 * 360,
    isCircle: index % 2 === 0,
    spinDuration: 0.5 + seed3,
  }
}

export function ConfettiCelebration({ active = true, className = '', density = 'medium' }: ConfettiCelebrationProps) {
  const pieceCount = density === 'light' ? 15 : density === 'heavy' ? 40 : 25

  const pieces = useMemo(() => {
    if (!active) return []
    return Array.from({ length: pieceCount }, (_, i) => generatePiece(i, pieceCount))
  }, [active, pieceCount])

  if (!active || pieces.length === 0) return null

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.x}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          <div
            className="animate-confetti-spin"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: piece.isCircle ? '50%' : '2px',
              transform: `rotate(${piece.rotation}deg)`,
              animationDuration: `${piece.spinDuration}s`,
            }}
          />
        </div>
      ))}

      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes confetti-spin {
          0%, 100% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          25% {
            transform: rotateY(90deg) rotateX(45deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(90deg);
          }
          75% {
            transform: rotateY(270deg) rotateX(45deg);
          }
        }
        .animate-confetti-fall {
          animation: confetti-fall linear forwards;
        }
        .animate-confetti-spin {
          animation: confetti-spin linear infinite;
        }
      `}</style>
    </div>
  )
}
