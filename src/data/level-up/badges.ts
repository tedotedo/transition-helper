export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  howToEarn: string;
  category: 'explorer' | 'practice' | 'special';
}

export const badges: Badge[] = [
  // Explorer badges
  {
    id: 'myth-buster',
    name: 'Myth Buster',
    icon: '🔍',
    description: 'You know the truth about transition!',
    howToEarn: 'Flip all the myth cards to reveal the facts',
    category: 'explorer',
  },
  {
    id: 'power-collector',
    name: 'Power Collector',
    icon: '⚡',
    description: 'You understand all the powers you\'ll gain!',
    howToEarn: 'View all power-up cards',
    category: 'explorer',
  },
  {
    id: 'story-listener',
    name: 'Story Listener',
    icon: '👂',
    description: 'You\'ve heard from others who\'ve been there!',
    howToEarn: 'Read or listen to 3 real stories',
    category: 'explorer',
  },
  {
    id: 'map-reader',
    name: 'Map Reader',
    icon: '🗺️',
    description: 'You understand the journey ahead!',
    howToEarn: 'View all stages on the journey map',
    category: 'explorer',
  },
  // Practice badges
  {
    id: 'phone-pro',
    name: 'Phone Pro',
    icon: '📞',
    description: 'You can book your own appointments!',
    howToEarn: 'Complete the "Book Your Appointment" scenario',
    category: 'practice',
  },
  {
    id: 'question-asker',
    name: 'Question Asker',
    icon: '❓',
    description: 'You\'re not afraid to ask questions!',
    howToEarn: 'Complete the "Ask the Doctor" scenario',
    category: 'practice',
  },
  {
    id: 'independence-star',
    name: 'Independence Star',
    icon: '⭐',
    description: 'You know how to choose your support!',
    howToEarn: 'Complete the "Decide Your Support" scenario',
    category: 'practice',
  },
  {
    id: 'explainer',
    name: 'Explainer',
    icon: '💬',
    description: 'You can describe your condition clearly!',
    howToEarn: 'Complete the "Explain Your Condition" scenario',
    category: 'practice',
  },
  {
    id: 'pharmacy-ready',
    name: 'Pharmacy Ready',
    icon: '💊',
    description: 'You can collect your own prescriptions!',
    howToEarn: 'Complete the "Collect Prescription" scenario',
    category: 'practice',
  },
  // Special badges
  {
    id: 'level-up-champion',
    name: 'Level Up Champion',
    icon: '🏆',
    description: 'You\'ve mastered everything!',
    howToEarn: 'Earn all other badges',
    category: 'special',
  },
  {
    id: 'first-steps',
    name: 'First Steps',
    icon: '👣',
    description: 'You\'ve started your Level Up journey!',
    howToEarn: 'Complete any activity in Level Up',
    category: 'special',
  },
  {
    id: 'comeback-kid',
    name: 'Comeback Kid',
    icon: '🔄',
    description: 'You keep coming back to learn more!',
    howToEarn: 'Visit Level Up on 3 different days',
    category: 'special',
  },
];

export function getBadgesByCategory(category: Badge['category']): Badge[] {
  return badges.filter(b => b.category === category);
}

export function getBadgeById(id: string): Badge | undefined {
  return badges.find(b => b.id === id);
}
