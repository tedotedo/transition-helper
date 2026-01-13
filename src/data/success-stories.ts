// Success Stories Video Data
// To add a new video:
// 1. Get the YouTube video ID (the part after "v=" in the URL)
// 2. Add a new entry to this array
// 3. Fill in all the required fields

export interface SuccessStory {
  id: number
  title: string
  description: string
  youtubeId: string // The YouTube video ID (e.g., from youtube.com/watch?v=VIDEO_ID_HERE)
  duration: string // Format: "MM:SS"
  age: string // Age or "Parent"
  condition: string // Health condition or "Various"
  stage: 'Ready' | 'Steady' | 'Go' | 'All Stages'
}

export const successStories: SuccessStory[] = [
  {
    id: 1,
    title: 'Transition to Adult Services - Young Person\'s Experience',
    description:
      'A young person shares their personal journey transitioning from paediatric to adult healthcare services',
    youtubeId: '3dLcS7bn0xo',
    duration: 'Video 1',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
  {
    id: 2,
    title: 'Healthcare Transition Journey',
    description: 'Learn about the transition process and what to expect when moving to adult services',
    youtubeId: 'Fcm9s3-Xst0',
    duration: 'Video 2',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
  {
    id: 3,
    title: 'Moving to Adult Care',
    description: 'Tips and insights about preparing for and managing the transition to adult healthcare',
    youtubeId: '30JMnQZz8nk',
    duration: 'Video 3',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
  {
    id: 4,
    title: 'Transition Support and Guidance',
    description: 'Understanding the support available during your transition to adult services',
    youtubeId: 'p6VaU1-1Ltc',
    duration: 'Video 4',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
  {
    id: 5,
    title: 'Preparing for Adult Healthcare',
    description: 'Practical advice on getting ready for your move to adult healthcare services',
    youtubeId: 'L-tN2kx6Rmg',
    duration: 'Video 5',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
]
