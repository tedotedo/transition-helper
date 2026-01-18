interface FloatingShapesProps {
  className?: string
  variant?: 'hero' | 'subtle' | 'playful'
}

export function FloatingShapes({ className = '', variant = 'hero' }: FloatingShapesProps) {
  if (variant === 'subtle') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Soft gradient circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary-200/20 to-accent-200/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/3 -left-10 w-40 h-40 bg-gradient-to-br from-accent-200/20 to-primary-200/20 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-1/4 w-32 h-32 bg-gradient-to-br from-primary-100/30 to-accent-100/30 rounded-full blur-xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>
    )
  }

  if (variant === 'playful') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        {/* Playful floating shapes */}
        <svg className="absolute top-10 left-10 w-16 h-16 text-primary-200 animate-bounce" style={{ animationDuration: '3s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.5" />
        </svg>
        <svg className="absolute top-1/4 right-20 w-12 h-12 text-accent-300 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" rx="15" fill="currentColor" opacity="0.4" transform="rotate(15 50 50)" />
        </svg>
        <svg className="absolute bottom-20 left-1/4 w-10 h-10 text-primary-300 animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }} viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="currentColor" opacity="0.4" />
        </svg>
        <svg className="absolute bottom-1/3 right-10 w-8 h-8 text-accent-200 animate-bounce" style={{ animationDuration: '2.8s', animationDelay: '1.5s' }} viewBox="0 0 100 100">
          <path d="M50 10 L61 40 L95 40 L68 60 L79 90 L50 72 L21 90 L32 60 L5 40 L39 40 Z" fill="currentColor" opacity="0.5" />
        </svg>
      </div>
    )
  }

  // Default: hero variant
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Large decorative blobs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-white/20 to-accent-300/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-to-tr from-white/20 to-primary-300/10 rounded-full blur-2xl" />

      {/* Smaller accent shapes */}
      <div className="absolute top-1/4 right-10 w-20 h-20 bg-white/10 rounded-full animate-pulse-soft" />
      <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-white/10 rounded-2xl rotate-12 animate-pulse-soft" style={{ animationDelay: '1s' }} />

      {/* Floating dots pattern */}
      <svg className="absolute top-20 left-20 w-32 h-32 text-white/20" viewBox="0 0 100 100">
        <circle cx="10" cy="10" r="3" fill="currentColor" />
        <circle cx="30" cy="25" r="2" fill="currentColor" />
        <circle cx="50" cy="10" r="4" fill="currentColor" />
        <circle cx="70" cy="30" r="2" fill="currentColor" />
        <circle cx="20" cy="50" r="3" fill="currentColor" />
        <circle cx="45" cy="45" r="2" fill="currentColor" />
        <circle cx="80" cy="60" r="3" fill="currentColor" />
        <circle cx="30" cy="80" r="2" fill="currentColor" />
        <circle cx="60" cy="75" r="4" fill="currentColor" />
        <circle cx="90" cy="90" r="2" fill="currentColor" />
      </svg>
    </div>
  )
}
