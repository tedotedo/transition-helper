// Success Stories Video Data
// To add a new video:
// 1. Get the YouTube video ID (the part after "v=" in the URL)
// 2. Look it up at https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=VIDEO_ID&format=json
//    and copy the exact title, author_name and author_url. Never type these from memory.
// 3. Add a new entry to this array and fill in all the required fields

export interface SuccessStory {
  id: number
  title: string // Exact title of the video on YouTube
  description: string // Short summary based on the video's YouTube description
  youtubeId: string // The YouTube video ID (e.g., from youtube.com/watch?v=VIDEO_ID_HERE)
  creator: string // Channel name shown on YouTube (oEmbed author_name)
  creatorUrl: string // Channel link on YouTube (oEmbed author_url)
  duration: string // Format: "M:SS", from the video's YouTube page
  age: string // Age or "Parent"
  condition: string // Health condition or "Various"
  stage: 'Getting Started' | 'Building Skills' | 'Almost There' | 'All Stages'
}

// Credits below were checked against each video's YouTube oEmbed data and watch page on 2 October 2026.
export const successStories: SuccessStory[] = [
  {
    id: 1,
    title: 'The Transition Journey at CHFT',
    description:
      "A short film from a hospital trust about how moving from children's to adult outpatient clinics has been made smoother for patients.",
    youtubeId: '3dLcS7bn0xo',
    creator: 'Calderdale and Huddersfield NHS Foundation Trust',
    creatorUrl: 'https://www.youtube.com/@chftnhs',
    duration: '2:45',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
  {
    id: 2,
    title: 'Transition to adult health care: preparing for the move',
    description:
      'Young people with long-term illnesses share how they feel about moving to adult health care, including worries and excitement.',
    youtubeId: 'Fcm9s3-Xst0',
    creator: 'SteppingUp Ireland',
    creatorUrl: 'https://www.youtube.com/@steppingupireland9195',
    duration: '3:02',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
  {
    id: 3,
    title: 'Ready Steady Go - Supporting Transition to Adult Care',
    description:
      "A film about supporting young people as they move from children's to adult care.",
    youtubeId: '30JMnQZz8nk',
    creator: 'Picker Experience Network',
    creatorUrl: 'https://www.youtube.com/@pickerexperiencenetwork',
    duration: '6:06',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
  {
    id: 4,
    title: 'GCS Ready Steady Go   Ready Subtitle',
    description:
      'A short film explaining what "transition" means: preparing, planning and moving from children\'s to adult services.',
    youtubeId: 'p6VaU1-1Ltc',
    creator: 'Gloucestershire Care Services NHS Trust',
    creatorUrl: 'https://www.youtube.com/@gloucestershirecareservice7535',
    duration: '1:33',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
  {
    id: 5,
    title: 'Health Transition',
    description:
      'A short film about health transition, designed with students from Cambridge Regional College.',
    youtubeId: 'L-tN2kx6Rmg',
    creator: 'Cambridgeshire County Council',
    creatorUrl: 'https://www.youtube.com/@CambsCountyCouncil',
    duration: '13:17',
    age: 'Various',
    condition: 'Various',
    stage: 'All Stages',
  },
]
