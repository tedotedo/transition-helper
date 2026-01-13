// Searchable content index for the app
export interface SearchItem {
  id: string
  title: string
  description: string
  keywords: string[]
  href: string
  category: 'page' | 'resource' | 'topic' | 'guide'
}

export const searchIndex: SearchItem[] = [
  // Main Pages
  {
    id: 'home',
    title: 'Home',
    description: 'Your dashboard for transition to adult care',
    keywords: ['home', 'dashboard', 'start', 'welcome', 'main'],
    href: '/',
    category: 'page',
  },
  {
    id: 'journey',
    title: 'My Journey',
    description: 'Track your progress through Ready, Steady, Go stages',
    keywords: ['journey', 'progress', 'stages', 'ready', 'steady', 'go', 'checklist', 'transition'],
    href: '/journey',
    category: 'page',
  },
  {
    id: 'rights',
    title: 'Know Your Rights',
    description: 'Learn about consent, capacity, and decision-making at different ages',
    keywords: ['rights', 'consent', 'capacity', 'decisions', 'legal', 'age'],
    href: '/rights',
    category: 'page',
  },
  {
    id: 'money',
    title: 'Money & PIP',
    description: 'Benefits, financial support, and legal information',
    keywords: ['money', 'pip', 'benefits', 'financial', 'dla', 'disability', 'allowance', 'payment'],
    href: '/money',
    category: 'page',
  },
  {
    id: 'planning',
    title: 'Planning Tools',
    description: 'Ready Steady Go questionnaires and transition resources',
    keywords: ['planning', 'tools', 'questionnaire', 'ready', 'steady', 'go', 'nhs'],
    href: '/planning',
    category: 'page',
  },
  {
    id: 'videos',
    title: 'Videos & Stories',
    description: 'Real stories from young people about their transition experiences',
    keywords: ['videos', 'stories', 'experiences', 'real', 'young', 'people', 'watch'],
    href: '/videos',
    category: 'page',
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'PDFs, guides, and downloadable materials',
    keywords: ['resources', 'pdf', 'download', 'guide', 'materials', 'documents'],
    href: '/resources',
    category: 'page',
  },

  // Journey Activities - Ready Stage
  {
    id: 'learn-condition',
    title: 'Learn About Your Condition',
    description: 'Interactive activity to understand and describe your health condition',
    keywords: ['condition', 'learn', 'health', 'ready', 'activity', 'describe', 'understand', 'illness', 'diagnosis'],
    href: '/journey/learn-about-condition',
    category: 'guide',
  },
  {
    id: 'my-team',
    title: 'Get to Know Your Team',
    description: 'Learn about healthcare roles and add your care team members',
    keywords: ['team', 'doctor', 'nurse', 'gp', 'consultant', 'therapist', 'healthcare', 'staff', 'care'],
    href: '/journey/my-team',
    category: 'guide',
  },

  // Journey Activities - Steady Stage
  {
    id: 'speak-up',
    title: 'Speak Up at Appointments',
    description: 'Practice answering questions and build confidence at appointments',
    keywords: ['speak', 'appointments', 'confidence', 'questions', 'answers', 'practice', 'steady'],
    href: '/journey/speak-up',
    category: 'guide',
  },
  {
    id: 'my-medicines',
    title: 'Know Your Medicines',
    description: 'Track your medicines, dosages, and pharmacy information',
    keywords: ['medicines', 'medication', 'tablets', 'pills', 'dose', 'pharmacy', 'prescription'],
    href: '/journey/my-medicines',
    category: 'guide',
  },

  // Journey Activities - Go Stage
  {
    id: 'move-date',
    title: 'Ask About Your Move Date',
    description: 'Plan your transition to adult services and track important dates',
    keywords: ['move', 'transition', 'date', 'adult', 'services', 'transfer', 'plan', 'go'],
    href: '/journey/move-date',
    category: 'guide',
  },
  {
    id: 'pip-info',
    title: 'Look into PIP',
    description: 'Learn about Personal Independence Payment and check eligibility',
    keywords: ['pip', 'benefit', 'money', 'dla', 'disability', 'allowance', 'payment', '16'],
    href: '/journey/pip',
    category: 'guide',
  },

  // Journey Activities - Adult Stage
  {
    id: 'new-team',
    title: 'Say Hello to Your New Team',
    description: 'Meet your adult care team and learn how to contact them',
    keywords: ['new', 'team', 'adult', 'services', 'contact', 'hello', 'meet'],
    href: '/journey/new-team',
    category: 'guide',
  },
  {
    id: 'check-support',
    title: 'Check Your Support',
    description: 'Review your support at education, work, and home',
    keywords: ['support', 'benefits', 'education', 'work', 'home', 'college', 'university', 'social'],
    href: '/journey/check-support',
    category: 'guide',
  },

  // Guides
  {
    id: 'consent-16-17',
    title: 'Consent at 16-17',
    description: 'Understanding consent and decision-making when you\'re 16 or 17',
    keywords: ['consent', '16', '17', 'age', 'decision', 'gillick', 'fraser', 'competence'],
    href: '/rights/consent-16-17',
    category: 'guide',
  },

  // Resources - Questionnaires
  {
    id: 'ready-questionnaire',
    title: 'Ready Questionnaire (Age 11-13)',
    description: 'Start learning about your health and your care team',
    keywords: ['ready', 'questionnaire', '11', '12', '13', 'young', 'start', 'learn'],
    href: '/resources/ready-steady-go/ready-questionnaire',
    category: 'resource',
  },
  {
    id: 'steady-questionnaire',
    title: 'Steady Questionnaire (Age 14-15)',
    description: 'Build independence and learn about your medicines',
    keywords: ['steady', 'questionnaire', '14', '15', 'independence', 'medicines', 'practice'],
    href: '/resources/ready-steady-go/steady-questionnaire',
    category: 'resource',
  },
  {
    id: 'go-questionnaire',
    title: 'Go Questionnaire (Age 16-17)',
    description: 'Prepare for your move to adult services',
    keywords: ['go', 'questionnaire', '16', '17', 'adult', 'services', 'prepare', 'transition'],
    href: '/resources/ready-steady-go/go-questionnaire',
    category: 'resource',
  },

  // Topics
  {
    id: 'topic-consent',
    title: 'Consent and Capacity',
    description: 'What consent means in healthcare and how capacity is assessed',
    keywords: ['consent', 'capacity', 'gillick', 'fraser', 'competence', 'decision', 'healthcare'],
    href: '/rights#consent',
    category: 'topic',
  },
  {
    id: 'topic-privacy',
    title: 'Privacy & Sharing Information',
    description: 'Your right to confidentiality and when information might be shared',
    keywords: ['privacy', 'confidentiality', 'sharing', 'records', 'information', 'safeguarding'],
    href: '/rights#privacy',
    category: 'topic',
  },
  {
    id: 'topic-decision-18',
    title: 'Decision-Making After 18',
    description: 'Legal changes at 18 and the Mental Capacity Act',
    keywords: ['18', 'adult', 'decision', 'capacity', 'act', 'lpa', 'power', 'attorney'],
    href: '/rights#decision-making',
    category: 'topic',
  },

  // Benefits topics
  {
    id: 'pip',
    title: 'Personal Independence Payment (PIP)',
    description: 'Benefits for extra care or mobility needs from age 16',
    keywords: ['pip', 'personal', 'independence', 'payment', 'benefit', 'disability', 'dla', '16'],
    href: '/money#benefits',
    category: 'topic',
  },
  {
    id: 'lpa',
    title: 'Lasting Power of Attorney',
    description: 'Legal arrangements for decision-making support',
    keywords: ['lpa', 'lasting', 'power', 'attorney', 'legal', 'decision', 'deputy'],
    href: '/money#legal',
    category: 'topic',
  },
  {
    id: 'ehcp',
    title: 'Education Health Care Plans (EHCP)',
    description: 'Support for education until age 25',
    keywords: ['ehcp', 'education', 'health', 'care', 'plan', 'sen', 'school', 'college', '25'],
    href: '/money#education',
    category: 'topic',
  },
]

// Simple fuzzy matching function
export function fuzzyMatch(text: string, query: string): boolean {
  const textLower = text.toLowerCase()
  const queryLower = query.toLowerCase()

  // Direct inclusion
  if (textLower.includes(queryLower)) return true

  // Check if all characters in query appear in order in text
  let queryIndex = 0
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++
    }
  }
  if (queryIndex === queryLower.length) return true

  // Handle common typos with Levenshtein distance for short queries
  if (queryLower.length >= 3 && queryLower.length <= 10) {
    const words = textLower.split(/\s+/)
    for (const word of words) {
      if (levenshteinDistance(word, queryLower) <= Math.floor(queryLower.length / 3)) {
        return true
      }
    }
  }

  return false
}

// Levenshtein distance for typo tolerance
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

// Search function that returns ranked results
export function searchContent(query: string): SearchItem[] {
  if (!query || query.length < 2) return []

  const queryLower = query.toLowerCase()

  const results = searchIndex.filter((item) => {
    // Check title
    if (fuzzyMatch(item.title, query)) return true

    // Check description
    if (fuzzyMatch(item.description, query)) return true

    // Check keywords
    if (item.keywords.some((kw) => fuzzyMatch(kw, query))) return true

    return false
  })

  // Sort by relevance: title matches first, then description, then keywords
  return results.sort((a, b) => {
    const aTitle = a.title.toLowerCase().includes(queryLower) ? 0 : 1
    const bTitle = b.title.toLowerCase().includes(queryLower) ? 0 : 1
    if (aTitle !== bTitle) return aTitle - bTitle

    const aDesc = a.description.toLowerCase().includes(queryLower) ? 0 : 1
    const bDesc = b.description.toLowerCase().includes(queryLower) ? 0 : 1
    return aDesc - bDesc
  })
}
