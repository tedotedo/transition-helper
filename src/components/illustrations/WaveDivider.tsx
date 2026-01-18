interface WaveDividerProps {
  className?: string
  color?: 'primary' | 'accent' | 'warm'
  flip?: boolean
}

const colorMap = {
  primary: '#fff7ed', // primary-50
  accent: '#f0fdfa',  // accent-50
  warm: '#fafaf9',    // warm-50
}

export function WaveDivider({ className = '', color = 'primary', flip = false }: WaveDividerProps) {
  return (
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-auto ${flip ? 'rotate-180' : ''} ${className}`}
      preserveAspectRatio="none"
    >
      <path
        d="M0 60C240 120 480 0 720 60C960 120 1200 0 1440 60V120H0V60Z"
        fill={colorMap[color]}
      />
    </svg>
  )
}
