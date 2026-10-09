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
    description: 'Track your progress through the four stages, from Getting Started to Flying Solo',
    keywords: ['journey', 'progress', 'stages', 'getting started', 'building skills', 'almost there', 'flying solo', 'checklist', 'transition'],
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
    description: 'Plan each of the four stages, from Getting Started to Flying Solo',
    keywords: ['planning', 'tools', 'stages', 'getting started', 'building skills', 'almost there', 'flying solo', 'plan'],
    href: '/planning',
    category: 'page',
  },
  {
    id: 'videos',
    title: 'Videos & Stories',
    description: 'Videos about moving to adult health care, shown via YouTube',
    keywords: ['videos', 'stories', 'experiences', 'youtube', 'films', 'watch'],
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
  {
    id: 'comic-guide',
    title: "Zach's Transition Journey Comic",
    description: 'A visual comic-strip guide to moving from paediatric to adult medical services',
    keywords: ['comic', 'visual', 'pictures', 'zach', 'journey', 'transition', 'easy', 'friendly', 'story', 'cartoon'],
    href: '/comic-guide',
    category: 'guide',
  },
  {
    id: 'checklist',
    title: 'My Transition Checklist',
    description: 'Track your progress with stage-specific transition tasks',
    keywords: ['checklist', 'tasks', 'progress', 'getting started', 'building skills', 'almost there', 'flying solo', 'transition', 'goals'],
    href: '/checklist',
    category: 'page',
  },
  {
    id: 'appointments',
    title: 'My Appointments',
    description: 'Manage your healthcare appointments and questions to ask',
    keywords: ['appointments', 'clinic', 'hospital', 'visit', 'questions', 'doctor', 'schedule', 'calendar'],
    href: '/appointments',
    category: 'page',
  },
  {
    id: 'care-plan',
    title: 'My Care Plan',
    description: 'Your personal health record with conditions, medications, and preferences',
    keywords: ['care plan', 'health record', 'medications', 'allergies', 'conditions', 'preferences', 'emergency', 'goals'],
    href: '/care-plan',
    category: 'page',
  },
  {
    id: 'care-team',
    title: 'My Care Team',
    description: 'List of healthcare professionals involved in your care',
    keywords: ['care team', 'doctor', 'nurse', 'consultant', 'healthcare', 'professionals', 'contacts', 'team'],
    href: '/care-team',
    category: 'page',
  },

  // Journey Activities - Getting Started
  {
    id: 'learn-condition',
    title: 'Learn About Your Condition',
    description: 'Interactive activity to understand and describe your health condition',
    keywords: ['condition', 'learn', 'health', 'getting started', 'activity', 'describe', 'understand', 'illness', 'diagnosis'],
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

  // Journey Activities - Building Skills
  {
    id: 'speak-up',
    title: 'Speak Up at Appointments',
    description: 'Practice answering questions and build confidence at appointments',
    keywords: ['speak', 'appointments', 'confidence', 'questions', 'answers', 'practice', 'building skills'],
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

  // Journey Activities - Almost There
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

  // Journey Activities - Flying Solo
  {
    id: 'new-team',
    title: 'Meet Your New Team',
    description: 'Meet your adult care team and learn how to contact them',
    keywords: ['new', 'team', 'adult', 'services', 'contact', 'meet', 'introduce'],
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
  {
    id: 'no-adult-service',
    title: "If there's no adult service for you",
    description: 'What happens if there is no adult team or you are not eligible, and how to be referred again',
    keywords: ['no adult service', 'not eligible', 'eligibility', 'criteria', 'discharged', 'gp', 'refer', 're-referral', 'social care', 'needs assessment'],
    href: '/journey/no-adult-service',
    category: 'page',
  },
  {
    id: 'neurodevelopmental',
    title: 'ADHD, autism and learning disability',
    description: 'ADHD medicine after 18, annual health checks from 14, and support for autistic young people',
    keywords: ['adhd', 'autism', 'autistic', 'learning disability', 'neurodevelopmental', 'neurodiversity', 'medicine', 'shared care'],
    href: '/neurodevelopmental',
    category: 'page',
  },
  {
    id: 'adhd-medicine',
    title: 'ADHD medicine after 18',
    description: 'Who prescribes, GP shared care, waits for adult services and not running out',
    keywords: ['adhd', 'medicine', 'medication', 'prescription', 'shared care', 'methylphenidate', 'lisdexamfetamine', 'controlled drug', 'gp'],
    href: '/neurodevelopmental#adhd',
    category: 'topic',
  },
  {
    id: 'annual-health-check',
    title: 'Learning disability annual health check',
    description: 'Free yearly health check from age 14, the GP register and health action plans',
    keywords: ['learning disability', 'annual health check', 'health check', 'register', 'health action plan', 'community learning disability team', 'ld'],
    href: '/neurodevelopmental#learning-disability',
    category: 'topic',
  },
  {
    id: 'autism-adult-services',
    title: 'Autism and adult services',
    description: 'What adult autism services do, where support comes from, and reasonable adjustments',
    keywords: ['autism', 'autistic', 'asd', 'reasonable adjustments', 'adult autism service', 'support'],
    href: '/neurodevelopmental#autism',
    category: 'topic',
  },
  {
    id: 'mental-capacity-16',
    title: 'Mental Capacity Act from 16',
    description: 'How decisions are made in your best interests if you cannot make a particular decision',
    keywords: ['mental capacity act', 'mca', 'capacity', 'best interests', '16', '17', 'decision'],
    href: '/rights/consent-16-17',
    category: 'topic',
  },
  {
    id: 'missed-appointments',
    title: 'Missed appointments after the move',
    description: 'What adult services should do if you miss appointments, and who to contact',
    keywords: ['missed appointment', 'did not attend', 'dna', 'discharged', 'discharge', 'follow up', 'named worker'],
    href: '/journey/new-team',
    category: 'topic',
  },
  {
    id: 'planning-year-9',
    title: 'When transition planning starts',
    description: 'Planning by Year 9 (age 13-14), yearly reviews, EHCP preparing for adulthood and transition assessments',
    keywords: ['year 9', 'planning', 'start', 'annual review', 'preparing for adulthood', 'transition assessment', 'care act', 'ehcp'],
    href: '/journey/move-date',
    category: 'topic',
  },
  {
    id: 'carer-support',
    title: 'Support for families and young carers',
    description: "Carer's assessments, Carers UK, young carers and peer support",
    keywords: ['carer', 'carers', "carer's assessment", 'carers uk', 'young carer', 'parent', 'peer support', 'family'],
    href: '/resources#more-support',
    category: 'topic',
  },
  {
    id: 'nice-ng43',
    title: 'How this app follows NICE NG43',
    description: "The national guidance on moving from children's to adults' services",
    keywords: ['nice', 'ng43', 'guidance', 'guideline', 'national'],
    href: '/resources',
    category: 'resource',
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
