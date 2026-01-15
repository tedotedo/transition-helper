export interface Myth {
  id: string;
  fear: string;
  fact: string;
  fearEmoji: string;
  factEmoji: string;
  category: 'support' | 'independence' | 'care' | 'feelings';
}

export const myths: Myth[] = [
  {
    id: 'parents-banned',
    fear: "My parents won't be allowed in appointments anymore",
    fact: "YOU choose who comes to your appointments - your parents can still come if you want them to!",
    fearEmoji: '😰',
    factEmoji: '💪',
    category: 'support',
  },
  {
    id: 'doctors-dont-care',
    fear: "Adult doctors don't care about young people",
    fact: "Adult teams are specially trained to support young adults. Many young people find them easier to talk to!",
    fearEmoji: '😟',
    factEmoji: '🤝',
    category: 'care',
  },
  {
    id: 'know-everything',
    fear: "I have to know everything about my condition",
    fact: "It's okay to learn as you go - your healthcare team will help you. Nobody expects you to be an expert overnight!",
    fearEmoji: '😬',
    factEmoji: '📚',
    category: 'feelings',
  },
  {
    id: 'abandoned',
    fear: "I'll be abandoned by my children's team",
    fact: "There's a handover period where both teams work together. You won't be dropped suddenly - it's a gradual change.",
    fearEmoji: '😢',
    factEmoji: '🤗',
    category: 'care',
  },
  {
    id: 'completely-alone',
    fear: "I have to do everything alone now",
    fact: "Independence means choosing YOUR support, not having none. You can still ask for help whenever you need it!",
    fearEmoji: '😨',
    factEmoji: '⭐',
    category: 'independence',
  },
  {
    id: 'mess-up-trouble',
    fear: "If I mess up, I'll be in trouble",
    fact: "Everyone makes mistakes - that's how we learn! Your healthcare team is there to help, not judge you.",
    fearEmoji: '😰',
    factEmoji: '💚',
    category: 'feelings',
  },
  {
    id: 'scary-unfriendly',
    fear: "Adult services are scary and unfriendly",
    fact: "Many young people actually prefer adult services once they try them - more independence and being treated as a grown-up!",
    fearEmoji: '😱',
    factEmoji: '😊',
    category: 'care',
  },
  {
    id: 'less-important',
    fear: "My condition will be less important to adult doctors",
    fact: "Adult specialists focus deeply on your specific condition. They often have more expertise in managing long-term conditions.",
    fearEmoji: '😞',
    factEmoji: '🎯',
    category: 'care',
  },
];

export function getMythsByCategory(category: Myth['category']): Myth[] {
  return myths.filter(m => m.category === category);
}
