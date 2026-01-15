# Level Up: Your Transition Adventure

## Design Outline v1.0

---

## 1. Overview

### Purpose
An interactive, game-like experience that reframes healthcare transition from something scary into an empowering journey of gaining independence and new abilities.

### Target Audience
- Primary: Young people ages 11-18+ with long-term health conditions
- Secondary: Parents/carers (observer mode to understand the journey)
- Accessibility: Adaptable for those with learning disabilities

### Core Philosophy
> "You're not losing support — you're gaining superpowers"

---

## 2. Game Structure

### 2.1 Main Sections

```
┌─────────────────────────────────────────────────────────┐
│                    LEVEL UP HOME                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  MY      │  │  POWER   │  │  PRACTICE│              │
│  │  JOURNEY │  │  UPS     │  │  ZONE    │              │
│  │  MAP     │  │  GUIDE   │  │          │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  REAL    │  │  MYTH    │  │  MY      │              │
│  │  STORIES │  │  BUSTERS │  │  BADGES  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Section Descriptions

| Section | Purpose | Interaction Type |
|---------|---------|------------------|
| **My Journey Map** | Visual timeline showing where they are in transition | View + Mark progress |
| **Power-Ups Guide** | Explains abilities unlocked at each age | Browse + Quiz |
| **Practice Zone** | Safe scenarios to try adult interactions | Interactive roleplay |
| **Real Stories** | Video/audio clips from transitioned young people | Watch/Listen |
| **Myth Busters** | Before/After card flipper dispelling fears | Swipe cards |
| **My Badges** | Achievements earned through the game | Collection view |

---

## 3. Detailed Section Designs

### 3.1 My Journey Map

**Visual Concept:** A winding path/road with milestones, styled like a board game

```
        START                                          FINISH
          │                                              │
    ┌─────┴─────┐    ┌───────────┐    ┌───────────┐    ┌┴────────┐
    │  Getting  │───▶│  Getting  │───▶│  Ready    │───▶│  GO!    │
    │  Ready    │    │  Steady   │    │  Steady   │    │  Adult  │
    │  (11-13)  │    │  (14-15)  │    │  (16-17)  │    │  (18+)  │
    └───────────┘    └───────────┘    └───────────┘    └─────────┘
         🌱               🌿               🌳              🌲
      Seedling          Growing          Strong           Tree
```

**Features:**
- Animated character (customizable avatar) walks the path
- Current position highlighted with glow effect
- Tap milestones to see what happens at each stage
- Optional: Connect to Checklist progress for real tracking

**Data Structure:**
```typescript
interface JourneyProgress {
  currentStage: 'getting-ready' | 'getting-steady' | 'ready-steady' | 'go';
  stagesVisited: string[];
  characterCustomization: {
    avatar: string;
    color: string;
  };
}
```

---

### 3.2 Power-Ups Guide

**Visual Concept:** Trading card style "ability cards" that unlock at each age

**Power-Up Cards:**

| Age | Power | Icon | Description | Unlocked |
|-----|-------|------|-------------|----------|
| 11-13 | **Learning Mode** | 📚 | Start learning about your condition | ✅ |
| 14 | **Voice Boost** | 🗣️ | Your opinions count more in appointments | ⏳ |
| 14 | **Question Power** | ❓ | Ask your own questions to doctors | ⏳ |
| 15 | **Solo Skills** | 🎯 | Practice parts of appointments alone | 🔒 |
| 16 | **Privacy Shield** | 🔐 | Choose what's shared with parents | 🔒 |
| 16 | **Consent Key** | ✍️ | Sign your own consent forms | 🔒 |
| 17 | **Prep Master** | 📋 | Prepare for adult services | 🔒 |
| 18 | **Full Control** | 👑 | You're captain of your care team | 🔒 |

**Card Design:**
```
┌─────────────────────────┐
│  🔐  PRIVACY SHIELD     │  ← Icon + Name
│  ━━━━━━━━━━━━━━━━━━━━━  │
│                         │
│   [Illustration of      │
│    shield protecting    │
│    a person]            │
│                         │
│  ━━━━━━━━━━━━━━━━━━━━━  │
│  Unlocks at age 16      │  ← Unlock info
│                         │
│  You choose what's      │  ← Description
│  shared with parents    │
│                         │
│  ┌─────────────────┐    │
│  │  Learn More  ▶  │    │  ← Action button
│  └─────────────────┘    │
└─────────────────────────┘
```

**Interaction:**
- Swipe through cards horizontally
- Locked cards shown with opacity/lock icon
- Tap to flip card for more details + examples
- Quiz mode: "Which power unlocks at 16?"

---

### 3.3 Practice Zone

**Visual Concept:** Safe sandbox scenarios with dialogue choices

**Scenarios:**

1. **"Book Your Own Appointment"**
   - Simulated phone call with receptionist
   - Multiple choice responses
   - Gentle feedback on choices

2. **"Ask the Doctor"**
   - Practice asking questions during appointment
   - "I don't understand" option always available
   - Build confidence with repetition

3. **"Decide Your Support"**
   - Choose who comes to appointment
   - See it's YOUR choice, not a rule
   - Practice saying "I'd like some time alone"

4. **"Explain Your Condition"**
   - Practice describing condition in your words
   - For when you meet new adult team
   - Fill-in-the-blank helper

5. **"Collect Your Prescription"**
   - Pharmacy simulation
   - Know what to say and do
   - Demystify the process

**Scenario Flow:**
```
┌─────────────────────────────────────────┐
│  📞 Booking Your Appointment            │
│  ─────────────────────────────────────  │
│                                         │
│  [Illustration: Phone + Calendar]       │
│                                         │
│  Receptionist says:                     │
│  "Hello, GP surgery, how can I help?"   │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ A) "Can I book an appointment   │    │
│  │    with Dr Smith please?"       │ ◀──── Best choice
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ B) "Appointment"                │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ C) "My mum usually does this,   │    │
│  │    can you wait while I get her"│    │
│  └─────────────────────────────────┘    │
│                                         │
│  💡 Tip: You can always ask them to     │
│     repeat something if needed!         │
│                                         │
└─────────────────────────────────────────┘
```

**Feedback Approach:**
- No "wrong" answers, just "try this instead"
- Celebrate attempts, not just perfect answers
- "That works! Here's another way you could say it..."
- Earn badges for completing scenarios

---

### 3.4 Real Stories

**Visual Concept:** Video/audio testimonials with transcript option

**Content Structure:**
```typescript
interface RealStory {
  id: string;
  name: string;          // "Alex, 19"
  condition?: string;    // Optional - "diabetes"
  thumbnail: string;     // Illustration (not real photo for privacy)
  duration: string;      // "1:30"
  audioUrl?: string;     // Audio version
  transcript: string;    // Full text
  keyQuote: string;      // Pull quote for preview
  topics: string[];      // ["first adult appointment", "independence"]
}
```

**Example Stories:**

| Name | Key Quote | Topics |
|------|-----------|--------|
| Alex, 19 | "I was so nervous, but my adult doctor actually listens MORE than before" | First appointment, Fears |
| Jordan, 20 | "The best part? I decide when my appointments are now" | Independence, Control |
| Sam, 18 | "My mum still comes sometimes - it's my choice, not a rule" | Family support, Choices |
| Riley, 21 | "I wish someone told me it's okay to not know everything" | Learning, Mistakes |

**Layout:**
```
┌────────────────────────────────────────┐
│  💬 Real Stories                       │
│  Hear from young people who've         │
│  been through transition               │
│  ──────────────────────────────────    │
│                                        │
│  ┌────────────────────────────────┐    │
│  │ [Avatar]  Alex, 19             │    │
│  │           ──────────           │    │
│  │  "I was so nervous, but my     │    │
│  │   adult doctor actually        │    │
│  │   listens MORE than before"    │    │
│  │                                │    │
│  │   ▶ Listen (1:30)  📄 Read    │    │
│  └────────────────────────────────┘    │
│                                        │
│  ┌────────────────────────────────┐    │
│  │ [Avatar]  Jordan, 20           │    │
│  │  ...                           │    │
│  └────────────────────────────────┘    │
│                                        │
└────────────────────────────────────────┘
```

---

### 3.5 Myth Busters

**Visual Concept:** Swipeable "Before & After" cards that flip fears into facts

**Card Format:**
```
┌─────────────────────────────────────────┐
│                                         │
│   😰 FEAR                    (tap to    │
│   ─────                       flip)     │
│                                         │
│   "My parents won't be                  │
│    allowed in appointments              │
│    anymore"                             │
│                                         │
│         [Worried face illustration]     │
│                                         │
│   ◀ swipe ─────────────────── swipe ▶   │
│                                         │
└─────────────────────────────────────────┘

        ↓ TAP TO FLIP ↓

┌─────────────────────────────────────────┐
│                                         │
│   💪 FACT                               │
│   ─────                                 │
│                                         │
│   "YOU choose who comes to              │
│    your appointments - your             │
│    parents can still come               │
│    if you want!"                        │
│                                         │
│         [Happy face illustration]       │
│                                         │
│   ◀ swipe ─────────────────── swipe ▶   │
│                                         │
└─────────────────────────────────────────┘
```

**Myth Buster Cards:**

| # | Fear (Myth) | Fact (Truth) |
|---|-------------|--------------|
| 1 | "Parents can't come to appointments" | "YOU choose who comes - parents welcome if you want" |
| 2 | "Adult doctors don't care about young people" | "Adult teams are trained to support young adults" |
| 3 | "I have to know everything about my condition" | "It's okay to learn as you go - your team will help" |
| 4 | "I'll be abandoned by my children's team" | "There's a handover period - you won't be dropped suddenly" |
| 5 | "I have to do everything alone now" | "Independence means choosing your support, not having none" |
| 6 | "If I mess up, I'll be in trouble" | "Everyone makes mistakes - your team is there to help" |
| 7 | "Adult services are scary and unfriendly" | "Many young people prefer adult services once they try them" |
| 8 | "My condition will be less important to adults" | "Adult specialists focus deeply on your specific condition" |

**Interaction:**
- Swipe left/right to browse cards
- Tap to flip between Fear and Fact
- Cards marked as "Busted!" once viewed
- Badge earned after viewing all myths

---

### 3.6 My Badges

**Visual Concept:** Achievement collection to reward engagement

**Badge Categories:**

**Explorer Badges** (Completing sections)
| Badge | How to Earn | Icon |
|-------|-------------|------|
| Map Reader | View all journey stages | 🗺️ |
| Power Collector | View all power-up cards | ⚡ |
| Myth Buster | Flip all myth cards | 🔍 |
| Story Listener | Listen to 3+ real stories | 👂 |

**Practice Badges** (Completing scenarios)
| Badge | How to Earn | Icon |
|-------|-------------|------|
| Phone Pro | Complete "Book Appointment" | 📞 |
| Question Asker | Complete "Ask the Doctor" | ❓ |
| Independence Star | Complete "Decide Your Support" | ⭐ |
| Explainer | Complete "Explain Your Condition" | 💬 |
| Pharmacy Ready | Complete "Collect Prescription" | 💊 |

**Special Badges**
| Badge | How to Earn | Icon |
|-------|-------------|------|
| Level Up Champion | Earn all other badges | 🏆 |
| Daily Visitor | Visit game 3 days in a row | 📅 |
| Sharer | Share progress with someone | 🤝 |

**Badge Display:**
```
┌────────────────────────────────────────┐
│  🏆 My Badges                          │
│  ──────────────────────────────────    │
│  You've earned 4 of 12 badges!         │
│                                        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │ 🗺️ │ │ ⚡ │ │ 🔍 │ │ 👂 │          │
│  │ ✓  │ │ ✓  │ │    │ │    │          │
│  └────┘ └────┘ └────┘ └────┘          │
│  Map    Power  Myth   Story           │
│  Reader Coll.  Buster Listen.         │
│                                        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│  │ 📞 │ │ ❓ │ │ ⭐ │ │ 💬 │          │
│  │ ✓  │ │ ✓  │ │    │ │    │          │
│  └────┘ └────┘ └────┘ └────┘          │
│  Phone  Quest. Indep. Expl.           │
│                                        │
└────────────────────────────────────────┘
```

---

## 4. Visual Design

### 4.1 Fitting Existing Theme

Use the established Tailwind theme from `tailwind.config.js`:

| Element | Colors |
|---------|--------|
| Primary actions | `primary-500` to `primary-600` gradient (coral) |
| Positive/Success | `accent-500` (teal) |
| Cards | `bg-white` with `border-warm-200`, `shadow-card` |
| Text | `warm-800` (headings), `warm-600` (body) |
| Locked items | `warm-300` with opacity |

### 4.2 Game-Specific Additions

**Suggested new theme additions:**

```javascript
// Additional colors for game elements
colors: {
  // Power-up card colors (one per age bracket)
  power: {
    learning: '#A78BFA',  // Purple - Learning Mode
    voice: '#F472B6',     // Pink - Voice Boost
    privacy: '#60A5FA',   // Blue - Privacy Shield
    consent: '#34D399',   // Green - Consent Key
    control: '#FBBF24',   // Gold - Full Control
  },
  // Badge colors
  badge: {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
  }
}
```

### 4.3 Illustrations Style

- **Warm, friendly, inclusive** - diverse characters
- **Simple, icon-based** - not photo-realistic
- **Consistent character style** - same art style throughout
- **Age-appropriate** - not childish, not too adult
- **Condition-agnostic** - no specific medical imagery

Suggested style: Similar to Headspace app or modern NHS illustrations

---

## 5. Technical Implementation

### 5.1 New Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/level-up` | LevelUpHome | Game hub/dashboard |
| `/level-up/journey` | JourneyMap | Interactive journey visualization |
| `/level-up/powers` | PowerUpsGuide | Power-up cards browser |
| `/level-up/practice` | PracticeZone | Scenario selection |
| `/level-up/practice/:id` | PracticeScenario | Individual scenario |
| `/level-up/stories` | RealStories | Testimonials hub |
| `/level-up/myths` | MythBusters | Card flipper game |
| `/level-up/badges` | MyBadges | Achievement collection |

### 5.2 Data Storage

```typescript
// localStorage key: 'transition-level-up-progress'

interface LevelUpProgress {
  // Journey
  currentStage: Stage;
  stagesViewed: Stage[];

  // Power-ups
  powersViewed: string[];
  powerQuizCompleted: boolean;

  // Practice
  scenariosCompleted: string[];
  scenarioAttempts: Record<string, number>;

  // Stories
  storiesListened: string[];
  storiesRead: string[];

  // Myths
  mythsFlipped: string[];

  // Badges
  badgesEarned: string[];

  // Meta
  firstVisit: string;  // ISO date
  lastVisit: string;   // ISO date
  totalVisits: number;
}
```

### 5.3 Components to Create

```
src/
├── pages/
│   └── level-up/
│       ├── LevelUpHome.tsx
│       ├── JourneyMap.tsx
│       ├── PowerUpsGuide.tsx
│       ├── PracticeZone.tsx
│       ├── PracticeScenario.tsx
│       ├── RealStories.tsx
│       ├── MythBusters.tsx
│       └── MyBadges.tsx
├── components/
│   └── level-up/
│       ├── PowerCard.tsx
│       ├── MythCard.tsx
│       ├── StoryCard.tsx
│       ├── BadgeIcon.tsx
│       ├── ScenarioChoice.tsx
│       ├── ProgressRing.tsx
│       └── JourneyPath.tsx
├── data/
│   └── level-up/
│       ├── powers.ts
│       ├── myths.ts
│       ├── stories.ts
│       ├── scenarios.ts
│       └── badges.ts
└── hooks/
    └── useLevelUpProgress.ts
```

### 5.4 Estimated Component Complexity

| Component | Complexity | Notes |
|-----------|------------|-------|
| LevelUpHome | Medium | Grid layout, progress summary |
| JourneyMap | High | SVG path animation, interactivity |
| PowerUpsGuide | Medium | Swipeable cards, flip animation |
| PracticeZone | Low | Simple list/grid |
| PracticeScenario | High | State machine for dialogue flow |
| RealStories | Medium | Audio player, expandable cards |
| MythBusters | Medium | Flip animation, swipe gesture |
| MyBadges | Low | Grid of badge icons |

---

## 6. Accessibility

### 6.1 Standard Accessibility

- Full keyboard navigation
- Screen reader compatible (ARIA labels)
- Sufficient color contrast (WCAG AA)
- Reducible motion option
- Text alternatives for all visuals
- Focusable interactive elements

### 6.2 Learning Disability Adaptations

**Simple Mode Toggle:**
When enabled:
- Larger text and icons
- Fewer options per screen
- Audio descriptions auto-play
- Simplified language
- Traffic light color coding (red/amber/green)
- Symbol-based navigation

**Content Simplification:**

| Standard | Simple Mode |
|----------|-------------|
| "Your opinions will carry more weight in healthcare decisions" | "Doctors will listen to you more 🗣️" |
| "You have the right to confidentiality" | "Private things stay private 🔐" |
| "Transition to adult services" | "Moving to grown-up doctors 👨‍⚕️" |

### 6.3 Multi-Sensory Options

- **Read aloud** button on all text
- **Visual + Audio** for scenarios
- **Haptic feedback** on mobile for interactions
- **Progress sounds** (optional) for achievements

---

## 7. Parent/Carer Mode

When app is in "parent-carer" role:

### 7.1 Different View

- See same content but with parent framing
- "What your young person is learning" perspective
- Tips for how to support without taking over
- Discussion prompts for after each section

### 7.2 Example Adaptations

| Section | Young Person View | Parent View |
|---------|------------------|-------------|
| Power-Ups | "Powers you'll unlock" | "Independence skills to encourage" |
| Practice Zone | "Try these scenarios" | "Ways to practice together" |
| Myths | "Fears you might have" | "Worries your child might have" |

---

## 8. Integration with Existing App

### 8.1 Navigation

Add to bottom nav "More" menu:
```
🎮 Level Up Game
```

Add to sidebar (desktop):
```
🎮 Level Up: Your Transition Adventure
```

### 8.2 Home Page Widget

Add optional progress widget to home dashboard:
```
┌──────────────────────────────────────┐
│ 🎮 Level Up Progress                 │
│ ──────────────────────────────────── │
│ ████████░░░░░░░░ 4/12 badges         │
│                                      │
│ Next: Complete "Privacy Shield" ▶   │
└──────────────────────────────────────┘
```

### 8.3 Cross-Linking

- Checklist items can link to relevant Power-Ups
- Journey page can link to Level Up Journey Map
- Care Plan can suggest Practice Zone scenarios

---

## 9. Content Guidelines

### 9.1 Tone of Voice

| Do | Don't |
|----|-------|
| Encouraging and warm | Patronizing or childish |
| Honest about challenges | Dismissive of worries |
| Empowering language | Passive or victim framing |
| Inclusive pronouns | Assumptions about family |
| Celebrate small wins | Only reward perfection |

### 9.2 Example Phrases

**Good:**
- "You've got this!"
- "It's okay to feel nervous - most people do"
- "Every expert was once a beginner"
- "Your feelings are valid"
- "Take it at your own pace"

**Avoid:**
- "Don't worry!" (dismissive)
- "It's easy!" (minimizing)
- "You should know this by now" (shaming)
- "When your parents..." (assumes family structure)

---

## 10. Success Metrics

### 10.1 Engagement Metrics (In-App)

- % of users who open Level Up
- Average badges earned
- Scenario completion rates
- Return visits to game
- Time spent per session

### 10.2 Outcome Indicators

- Increased confidence self-reports
- More items completed in Checklist
- Higher engagement with Practice Zone before real appointments
- Positive feedback in any surveys

---

## 11. Future Enhancements

### Phase 2 Ideas

1. **Multiplayer Mode** - Compare progress with friends (anonymized)
2. **Weekly Challenges** - New mini-tasks each week
3. **Customizable Avatar** - Dress up your journey character
4. **AR Features** - Point camera at clinic to get tips
5. **Healthcare Team Mode** - Clinicians can see patient progress

### Content Expansion

- More practice scenarios
- Condition-specific story collections
- Regional variations (Scotland, Wales, NI)
- Languages beyond English

---

## 12. Implementation Priority

### MVP (Phase 1)
1. ✅ LevelUpHome - Hub page
2. ✅ MythBusters - Quick win, high impact
3. ✅ PowerUpsGuide - Core concept
4. ✅ MyBadges - Motivation system

### Phase 2
5. PracticeZone + 2 scenarios
6. RealStories (with placeholder content)
7. JourneyMap (simplified)

### Phase 3
8. Full Practice scenarios
9. Full JourneyMap with animation
10. Parent/Carer mode adaptations
11. Accessibility Simple Mode

---

## Appendix: Content Drafts

### A. Full Myth Buster Content

See `/docs/level-up-content/myths.md` (to be created)

### B. Practice Scenario Scripts

See `/docs/level-up-content/scenarios.md` (to be created)

### C. Power-Up Detailed Descriptions

See `/docs/level-up-content/powers.md` (to be created)

---

*Document created: January 2026*
*Version: 1.0 - Design Outline*
*Status: Ready for review*
