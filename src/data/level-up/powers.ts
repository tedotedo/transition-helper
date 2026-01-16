export interface Power {
  id: string;
  name: string;
  easyName: string; // Simpler name for Easy Read
  icon: string;
  unlockAge: number;
  stage: 'getting-ready' | 'getting-steady' | 'ready-steady' | 'go';
  shortDescription: string;
  easyDescription: string; // Simpler description for Easy Read
  fullDescription: string;
  examples: string[];
  easyExamples: string[]; // Simpler examples for Easy Read
  color: string;
}

export const powers: Power[] = [
  {
    id: 'learning-mode',
    name: 'Learning Mode',
    easyName: 'Learn About Me',
    icon: '📚',
    unlockAge: 11,
    stage: 'getting-ready',
    shortDescription: 'Start learning about your condition',
    easyDescription: 'Learn about your body and health',
    fullDescription: 'This is when you begin to understand your health condition better. You can ask questions, learn medical words, and understand why you take medicines or go to appointments.',
    examples: [
      'Ask your doctor to explain your condition in your own words',
      'Keep a list of questions to ask at appointments',
      'Learn what your medicines do and why you take them',
    ],
    easyExamples: [
      'Ask the doctor questions',
      'Learn about your medicines',
    ],
    color: '#A78BFA', // Purple
  },
  {
    id: 'voice-boost',
    name: 'Voice Boost',
    easyName: 'Speak Up',
    icon: '🗣️',
    unlockAge: 14,
    stage: 'getting-steady',
    shortDescription: 'Your opinions count more in appointments',
    easyDescription: 'Doctors listen to YOU more',
    fullDescription: 'Your voice matters! From around 14, doctors and nurses will start asking YOU directly about how you feel and what you think. Your opinions help shape your care.',
    examples: [
      'The doctor asks you questions directly, not just your parents',
      'You can say if a treatment isn\'t working for you',
      'Your preferences about appointment times matter',
    ],
    easyExamples: [
      'Doctor asks YOU how you feel',
      'You can say what you want',
    ],
    color: '#F472B6', // Pink
  },
  {
    id: 'question-power',
    name: 'Question Power',
    easyName: 'Ask Questions',
    icon: '❓',
    unlockAge: 14,
    stage: 'getting-steady',
    shortDescription: 'Ask your own questions to doctors',
    easyDescription: 'Ask the doctor anything!',
    fullDescription: 'You can ask anything! There are no silly questions when it comes to your health. Doctors expect you to be curious and want to understand.',
    examples: [
      '"Why do I need this test?"',
      '"What happens if I miss a dose?"',
      '"Can you explain that in a different way?"',
    ],
    easyExamples: [
      '"Why do I need this?"',
      '"Can you say that again?"',
    ],
    color: '#FB923C', // Orange
  },
  {
    id: 'solo-skills',
    name: 'Solo Skills',
    easyName: 'Try By Myself',
    icon: '🎯',
    unlockAge: 15,
    stage: 'getting-steady',
    shortDescription: 'Practice parts of appointments alone',
    easyDescription: 'Do some things on your own',
    fullDescription: 'Ready to try some independence? You might spend part of your appointment talking to the doctor on your own. Your parent can still be there for the rest!',
    examples: [
      'Having 5-10 minutes alone with the doctor',
      'Checking in at reception by yourself',
      'Answering the nurse\'s questions independently',
    ],
    easyExamples: [
      'Talk to doctor on your own for a bit',
      'Check in by yourself',
    ],
    color: '#4ADE80', // Green
  },
  {
    id: 'privacy-shield',
    name: 'Privacy Shield',
    easyName: 'Keep Secrets',
    icon: '🔐',
    unlockAge: 16,
    stage: 'ready-steady',
    shortDescription: 'Choose what\'s shared with parents',
    easyDescription: 'Some things can be private',
    fullDescription: 'From 16, you have more control over your private information. You decide what gets shared with your parents or carers. This is your right.',
    examples: [
      'You can ask to speak to the doctor privately',
      'Some things can stay between you and your healthcare team',
      'You choose who knows what about your health',
    ],
    easyExamples: [
      'Talk to doctor without Mum or Dad',
      'You choose who knows your info',
    ],
    color: '#60A5FA', // Blue
  },
  {
    id: 'consent-key',
    name: 'Consent Key',
    easyName: 'Say Yes or No',
    icon: '✍️',
    unlockAge: 16,
    stage: 'ready-steady',
    shortDescription: 'Sign your own consent forms',
    easyDescription: 'Sign papers yourself',
    fullDescription: 'At 16, you can legally agree to your own medical treatment. You\'ll sign consent forms yourself. This means you\'re in charge of decisions about your body.',
    examples: [
      'Signing consent for procedures or treatments',
      'Agreeing to share your records with new services',
      'Deciding whether to take part in research',
    ],
    easyExamples: [
      'Sign your own forms',
      'Decide about your treatment',
    ],
    color: '#34D399', // Teal
  },
  {
    id: 'prep-master',
    name: 'Prep Master',
    easyName: 'Get Ready',
    icon: '📋',
    unlockAge: 17,
    stage: 'ready-steady',
    shortDescription: 'Prepare for adult services',
    easyDescription: 'Get ready for grown-up doctors',
    fullDescription: 'Time to get ready for the move! You\'ll learn about adult services, maybe visit them, and make sure everyone knows your needs and preferences.',
    examples: [
      'Meeting your new adult healthcare team',
      'Creating a health summary to share with new doctors',
      'Learning how adult appointments work',
    ],
    easyExamples: [
      'Meet your new doctors',
      'Learn how adult appointments work',
    ],
    color: '#F472B6', // Pink
  },
  {
    id: 'full-control',
    name: 'Full Control',
    easyName: 'You\'re The Boss',
    icon: '👑',
    unlockAge: 18,
    stage: 'go',
    shortDescription: 'You\'re captain of your care team',
    easyDescription: 'YOU are in charge!',
    fullDescription: 'You\'ve made it! At 18, you\'re officially in charge of your healthcare. You decide who\'s involved, when appointments happen, and how your condition is managed.',
    examples: [
      'Booking your own appointments',
      'Choosing who comes with you (or going alone)',
      'Managing your own prescriptions',
      'Being the main contact for your healthcare team',
    ],
    easyExamples: [
      'Book your own appointments',
      'Choose who comes with you',
      'Get your own medicines',
    ],
    color: '#FBBF24', // Gold
  },
];

export function getPowersByStage(stage: Power['stage']): Power[] {
  return powers.filter(p => p.stage === stage);
}

export function getUnlockedPowers(age: number): Power[] {
  return powers.filter(p => p.unlockAge <= age);
}

export function getNextPower(age: number): Power | undefined {
  return powers.find(p => p.unlockAge > age);
}
