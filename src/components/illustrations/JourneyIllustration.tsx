interface JourneyIllustrationProps {
  stage: 'ready' | 'steady' | 'go' | 'adult'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-24 h-24',
  md: 'w-32 h-32',
  lg: 'w-48 h-48',
}

export function JourneyIllustration({ stage, className = '', size = 'md' }: JourneyIllustrationProps) {
  const sizeClass = sizeMap[size]

  // Ready stage: Seedling growing
  if (stage === 'ready') {
    return (
      <svg viewBox="0 0 120 120" className={`${sizeClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ground */}
        <ellipse cx="60" cy="100" rx="45" ry="10" fill="#d6d3d1" opacity="0.5" />

        {/* Pot */}
        <path d="M35 75 L40 95 L80 95 L85 75 Z" fill="#ea580c" />
        <path d="M38 75 L60 75 L60 95 L42 95 Z" fill="#f97316" />
        <rect x="32" y="70" width="56" height="8" rx="3" fill="#c2410c" />

        {/* Soil */}
        <ellipse cx="60" cy="75" rx="22" ry="5" fill="#57534e" />

        {/* Stem */}
        <path d="M60 70 Q55 55 60 40" stroke="#14b8a6" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Leaves */}
        <ellipse cx="50" cy="50" rx="12" ry="8" fill="#2dd4bf" transform="rotate(-30 50 50)" />
        <ellipse cx="70" cy="45" rx="10" ry="6" fill="#5eead4" transform="rotate(25 70 45)" />

        {/* Sparkles */}
        <circle cx="30" cy="35" r="2" fill="#fdba74" />
        <circle cx="90" cy="40" r="1.5" fill="#99f6e4" />
        <circle cx="45" cy="25" r="1.5" fill="#fdba74" />
      </svg>
    )
  }

  // Steady stage: Growing plant with more leaves
  if (stage === 'steady') {
    return (
      <svg viewBox="0 0 120 120" className={`${sizeClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ground */}
        <ellipse cx="60" cy="105" rx="50" ry="10" fill="#d6d3d1" opacity="0.5" />

        {/* Main stem */}
        <path d="M60 100 Q50 70 60 35" stroke="#0d9488" strokeWidth="5" strokeLinecap="round" fill="none" />

        {/* Branches */}
        <path d="M55 60 Q35 55 30 45" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M65 50 Q85 45 90 35" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Leaves */}
        <ellipse cx="25" cy="42" rx="15" ry="10" fill="#2dd4bf" transform="rotate(-20 25 42)" />
        <ellipse cx="95" cy="32" rx="12" ry="8" fill="#5eead4" transform="rotate(30 95 32)" />
        <ellipse cx="50" cy="30" rx="14" ry="9" fill="#2dd4bf" transform="rotate(-10 50 30)" />
        <ellipse cx="70" cy="25" rx="12" ry="8" fill="#5eead4" transform="rotate(15 70 25)" />

        {/* Buds */}
        <circle cx="60" cy="18" r="8" fill="#fb923c" />
        <circle cx="60" cy="18" r="5" fill="#fdba74" />

        {/* Sparkles */}
        <circle cx="20" cy="25" r="2" fill="#fdba74" />
        <circle cx="100" cy="50" r="2" fill="#99f6e4" />
        <circle cx="40" cy="15" r="1.5" fill="#fed7aa" />
      </svg>
    )
  }

  // Go stage: Rocket launching
  if (stage === 'go') {
    return (
      <svg viewBox="0 0 120 120" className={`${sizeClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Exhaust flames */}
        <ellipse cx="60" cy="105" rx="15" ry="10" fill="#fb923c" opacity="0.6" />
        <ellipse cx="60" cy="98" rx="10" ry="8" fill="#fdba74" opacity="0.8" />
        <ellipse cx="60" cy="92" rx="6" ry="5" fill="#fff7ed" />

        {/* Rocket body */}
        <path d="M45 85 L60 20 L75 85 Z" fill="#ea580c" />
        <path d="M60 20 L75 85 L60 85 Z" fill="#f97316" />

        {/* Rocket window */}
        <circle cx="60" cy="50" r="10" fill="#0f766e" />
        <circle cx="60" cy="50" r="7" fill="#14b8a6" />
        <circle cx="57" cy="47" r="3" fill="#5eead4" opacity="0.7" />

        {/* Fins */}
        <path d="M45 85 L30 95 L45 75 Z" fill="#c2410c" />
        <path d="M75 85 L90 95 L75 75 Z" fill="#ea580c" />

        {/* Sparkles/stars */}
        <circle cx="25" cy="30" r="2" fill="#fdba74" />
        <circle cx="95" cy="25" r="2.5" fill="#99f6e4" />
        <circle cx="20" cy="60" r="1.5" fill="#fed7aa" />
        <circle cx="100" cy="55" r="2" fill="#5eead4" />
        <path d="M85 70 L87 65 L89 70 L94 72 L89 74 L87 79 L85 74 L80 72 Z" fill="#fdba74" />
      </svg>
    )
  }

  // Adult stage: Graduation cap / celebration
  return (
    <svg viewBox="0 0 120 120" className={`${sizeClass} ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Graduation cap */}
      <polygon points="60,25 100,45 60,65 20,45" fill="#44403c" />
      <polygon points="60,25 100,45 60,50" fill="#57534e" />
      <rect x="55" y="45" width="10" height="20" fill="#292524" />
      <rect x="45" y="62" width="30" height="8" fill="#44403c" />

      {/* Tassel */}
      <line x1="100" y1="45" x2="105" y2="70" stroke="#f97316" strokeWidth="3" />
      <circle cx="105" cy="72" r="5" fill="#fb923c" />
      <path d="M100 75 Q105 85 100 90" stroke="#f97316" strokeWidth="2" fill="none" />
      <path d="M105 75 Q110 85 105 90" stroke="#fb923c" strokeWidth="2" fill="none" />
      <path d="M110 75 Q115 82 112 88" stroke="#fdba74" strokeWidth="2" fill="none" />

      {/* Confetti */}
      <rect x="25" y="80" width="6" height="6" fill="#2dd4bf" transform="rotate(15 28 83)" />
      <rect x="90" y="85" width="5" height="5" fill="#fb923c" transform="rotate(-20 92 87)" />
      <circle cx="35" cy="95" r="4" fill="#fdba74" />
      <circle cx="85" cy="100" r="3" fill="#5eead4" />
      <rect x="50" y="90" width="4" height="8" fill="#14b8a6" transform="rotate(30 52 94)" />
      <rect x="70" y="88" width="5" height="5" fill="#fed7aa" transform="rotate(-15 72 90)" />

      {/* Stars */}
      <path d="M15 40 L17 35 L19 40 L24 42 L19 44 L17 49 L15 44 L10 42 Z" fill="#fdba74" />
      <path d="M105 30 L107 26 L109 30 L113 32 L109 34 L107 38 L105 34 L101 32 Z" fill="#99f6e4" />

      {/* Sparkles */}
      <circle cx="20" cy="60" r="2" fill="#fb923c" />
      <circle cx="100" cy="65" r="1.5" fill="#2dd4bf" />
    </svg>
  )
}
