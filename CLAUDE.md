# CLAUDE.md - Transition Ready

## Project Overview

**Transition Ready** (https://transitionready.app) is a React-based Progressive Web App (PWA) designed to help young people (ages 11-18+) and their parents/carers prepare for transitioning from children's healthcare to adult healthcare services. It follows the NHS "Ready Steady Go" transition framework.

## Tech Stack

- **Framework:** React 19.2.0 with TypeScript
- **Build Tool:** Vite 7.x
- **Routing:** React Router DOM 7.11.0
- **Styling:** Tailwind CSS 3.4.17
- **PWA:** vite-plugin-pwa
- **Testing:** Playwright
- **Data Persistence:** localStorage (no backend)

## Commands

```bash
npm run dev      # Start development server
npm run build    # TypeScript check + Vite build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── App.tsx                 # Main router configuration
├── main.tsx                # Entry point
├── index.css               # Global styles + Tailwind imports
├── components/
│   ├── home/               # Home page components
│   │   ├── QuickActionTile.tsx
│   │   ├── ProgressTracker.tsx
│   │   ├── RoleToggle.tsx
│   │   ├── NamedWorkerCard.tsx
│   │   └── TipCallout.tsx
│   └── layout/
│       ├── AppShell.tsx    # Main layout wrapper (sidebar + bottom nav)
│       ├── Notifications.tsx
│       └── Search.tsx
├── pages/
│   ├── level-up/           # Level Up game pages
│   │   ├── LevelUpHome.tsx # Game hub with progress
│   │   ├── MythBusters.tsx # Flip-card myth vs fact game
│   │   ├── PowerUpsGuide.tsx # Browse abilities by age
│   │   └── MyBadges.tsx    # Achievement collection
│   └── ...                 # Other route pages (see Routes section)
├── hooks/
│   ├── index.ts
│   ├── useLocalStorage.ts  # Custom hook for persisted state
│   └── useLevelUpProgress.ts # Level Up game progress tracking
└── data/
    ├── level-up/           # Level Up game data
    │   ├── powers.ts       # 8 power-up abilities by age
    │   ├── myths.ts        # 8 fear vs fact cards
    │   └── badges.ts       # 12 earnable achievements
    ├── notifications.ts
    ├── search-index.ts
    └── success-stories.ts

docs/
└── level-up-game-design.md # Full game design specification
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Dashboard with role toggle, quick actions, progress |
| `/checklist` | Checklist | Stage-based transition task tracker |
| `/appointments` | Appointments | Appointment planner with questions |
| `/care-plan` | CarePlan | Personal health record (printable) |
| `/care-team` | CareTeam | Healthcare professionals directory |
| `/journey` | MyJourney | Activity hub for transition stages |
| `/journey/learn-about-condition` | LearnAboutCondition | Activity: describe condition |
| `/journey/my-team` | MyTeam | Learn about healthcare roles |
| `/journey/speak-up` | SpeakUpAtAppointments | Appointment communication practice |
| `/journey/my-medicines` | KnowYourMedicines | Medication tracking activity |
| `/journey/move-date` | AskAboutMoveDate | Transition timing planning |
| `/journey/pip` | LookIntoPIP | PIP benefits information |
| `/journey/new-team` | HelloNewTeam | Guide for meeting adult services |
| `/journey/check-support` | CheckYourSupport | Support system review |
| `/rights` | RightsHub | Consent, privacy, decision-making info |
| `/rights/consent-under-16` | ConsentUnder16 | Consent guide for under 16s |
| `/rights/consent-16-17` | Consent16to17 | Detailed consent guide for 16-17 |
| `/rights/consent-18-plus` | Consent18Plus | Adult decision-making guide |
| `/money` | MoneyPip | Financial independence info |
| `/planning` | PlanningTools | Planning resources |
| `/videos` | VideosStories | Video/story content hub |
| `/skills` | SkillsBuilder | Interactive skills practice (9 skills) |
| `/questions` | QuestionsAnswers | FAQ page (16 questions in 4 categories) |
| `/resources` | Resources | Ready Steady Go PDF downloads |
| `/resources/ready-steady-go/*` | PdfViewer | PDF viewer for questionnaires |
| `/level-up` | LevelUpHome | Game hub with progress tracking |
| `/level-up/myths` | MythBusters | Flip-card game: fears vs facts |
| `/level-up/powers` | PowerUpsGuide | Browse abilities unlocked by age |
| `/level-up/badges` | MyBadges | Achievement collection display |

## Data Persistence

All user data is stored in localStorage using these keys:

| Storage Key | Used By | Data Type |
|-------------|---------|-----------|
| `transition-app-role` | Home | `'young-person' \| 'parent-carer'` |
| `transition-care-checklist` | Checklist | `{ completedItems: string[], currentStage: Stage }` |
| `transition-care-appointments` | Appointments | `{ appointments: Appointment[] }` |
| `transition-care-plan` | CarePlan | Personal health info (name, conditions, meds, etc.) |
| `transition-care-team` | CareTeam | `{ teamMembers: TeamMember[] }` |
| `transition-named-worker` | NamedWorkerCard | `{ name, role, phone, email }` |
| `transition-care-my-team` | MyTeam | `TeamMember[]` (activity page) |
| `transition-last-backup` | Home | ISO date string of last backup |
| `transition-level-up-progress` | Level Up | `{ powersViewed, mythsFlipped, badgesEarned, visitDates }` |
| `transition-skills-completed` | SkillsBuilder | `string[]` (array of completed skill IDs) |

The `useLocalStorage` hook handles persistence with automatic JSON serialization.

### Backup/Restore

Home page includes backup functionality (`src/pages/Home.tsx`):
- **Weekly reminder banner** appears when no backup in 7+ days
- **Download backup** exports all localStorage data as JSON
- **Restore from backup** imports JSON file and reloads page
- Backup includes all keys listed above

## Styling Patterns

### Tailwind Custom Theme

Located in `tailwind.config.js`:

- **Primary color:** Warm coral/peach (`primary-50` to `primary-700`) - `#f97316` base
- **Accent color:** Soft teal (`accent-50` to `accent-700`) - `#14b8a6` base
- **Neutrals:** Warm grays (`warm-50` to `warm-900`) instead of cold slate
- **Shadows:** `shadow-card`, `shadow-card-hover`, `shadow-glow`
- **Animations:** `animate-fade-in`, `animate-slide-up`, `animate-pulse-soft`

### Common Patterns

```tsx
// Card styling
className="bg-white rounded-2xl border border-warm-200 p-5 shadow-card"

// Primary button
className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-card hover:shadow-card-hover"

// Secondary button
className="px-4 py-2 rounded-xl border border-warm-200 text-warm-600 hover:border-warm-300"

// Form input
className="w-full px-4 py-2 rounded-xl border border-warm-200 bg-warm-50/50 text-warm-800 focus:outline-none focus:ring-2 focus:ring-primary-300"

// Page header pattern
<header className="space-y-3">
  <Link to="/" className="inline-flex items-center gap-2 text-sm text-warm-500 hover:text-primary-600">
    ← Back to Home
  </Link>
  <div className="flex items-center gap-3">
    <span className="text-3xl">{emoji}</span>
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-warm-800">{title}</h1>
      <p className="text-sm text-warm-500">{subtitle}</p>
    </div>
  </div>
</header>
```

### Responsive Breakpoints

- Mobile-first approach
- Primary breakpoint: `md:` (768px)
- Common patterns:
  - `grid-cols-2 md:grid-cols-4` for tiles
  - `md:grid-cols-2` for form layouts
  - `px-4 md:px-8` for padding
  - `text-2xl md:text-3xl` for headings

## Component Patterns

### Page Structure

Most pages follow this structure:
1. Back navigation link
2. Header with emoji icon + title + subtitle
3. Optional action button (top right)
4. Main content in white cards
5. Tips/encouragement section at bottom

### Mobile Navigation

`AppShell.tsx` provides different navigation for mobile vs desktop:
- **Desktop:** Sidebar with full navigation + header with search
- **Mobile:** No header, fixed bottom navigation bar with 5 items:
  - Home, Checklist, Care Plan, Team, More
  - "More" button opens slide-up panel with additional pages
- Main content has `pb-20 md:pb-8` to account for bottom nav

### Accordion Sections

CarePlan uses collapsible accordion pattern (`AccordionSection` component):
- Only one section open at a time on mobile
- Shows summary text when collapsed (e.g., "2 medication(s) listed")
- Green dot indicator for sections with data
- All sections expand for printing (`print:block`)

### Data Entry Cards

Appointments and CareTeam use expandable card patterns:
- Collapsed: Show summary info + edit/delete buttons
- Expanded: Show editable fields inline
- State managed by `editingId` matching card ID

### Role-based Content

Home page toggles between "young-person" and "parent-carer" views:
- Different hero text
- Different "next steps"
- Different tips
- Role stored in localStorage

## Mobile UX Status

### Fixed
- ✅ **Care Plan:** Now uses collapsible accordion sections
- ✅ **Navigation:** Bottom nav bar replaces hidden sidebar
- ✅ **Header:** Removed redundant mobile header for more screen space
- ✅ **Rights Hub:** Redesigned with young-person friendly UI, colorful cards, mobile-first fonts
- ✅ **Home Hero:** Vibrant gradient background for young person view, centered layout

### Remaining improvements to consider
1. **Appointments/CareTeam:** Inline add forms push content down; could use bottom sheets
2. **Checklist:** 4-column stage selector cramped on small phones

## Key Files for Common Tasks

| Task | Files to Edit |
|------|---------------|
| Add new page | `src/pages/NewPage.tsx`, `src/App.tsx` (add route) |
| Modify navigation | `src/components/layout/AppShell.tsx` |
| Change colors/theme | `tailwind.config.js` |
| Add localStorage data | Create hook in `src/hooks/`, add storage key |
| Modify home dashboard | `src/pages/Home.tsx`, `src/components/home/*` |

## Testing

Playwright is configured for e2e testing. Test files should be in a `tests/` directory (not yet created).

## Print Support

CarePlan page has print-specific styles:
- `print:hidden` - Hide interactive elements
- `print:shadow-none` - Remove shadows
- `print:border-gray-300` - Simpler borders

## Level Up Game

Interactive game to help young people understand transition as empowering, not scary.

### Game Sections (MVP)

| Section | Description | Badge Earned |
|---------|-------------|--------------|
| **Myth Busters** | 8 flip cards turning fears into facts | `myth-buster` |
| **Power-Ups Guide** | 8 abilities unlocked at different ages | `power-collector` |
| **My Badges** | 12 achievements to collect | Various |

### Badge System

Badges are auto-awarded when conditions are met:
- `first-steps` - Complete any activity
- `myth-buster` - Flip all 8 myth cards
- `power-collector` - View all 8 power-ups
- `comeback-kid` - Visit on 3 different days
- `level-up-champion` - Earn all other badges

### Related Pages (Now Implemented)

- **Skills Builder** (`/skills`): Interactive practice for healthcare skills
- **My Journey** (`/journey`): Visual timeline of transition stages
- **Videos & Stories** (`/videos`): Real testimonials from young people

## Skills Builder

Interactive page for practicing real-life healthcare skills (`src/pages/SkillsBuilder.tsx`).

### Skills by Difficulty

| Level | Skills |
|-------|--------|
| **Getting Started** | Introduce yourself, Describe how you feel, Ask questions |
| **Building Confidence** | Know your medications, Book appointments, Collect prescriptions, Speak alone |
| **Ready for Anything** | Share your opinion, Handle emergencies |

### Features
- Expandable skill cards with tips and practice prompts
- Example responses for each skill
- Progress tracking with localStorage
- "I've practiced this!" checkboxes

## Questions & Answers

FAQ page with common transition questions (`src/pages/QuestionsAnswers.tsx`).

### Categories
- **The Basics** - What is transition, when does it happen, who decides
- **Appointments & Care** - First adult appointment, can parents come
- **Your Rights** - Confidentiality, saying no, seeing records
- **Common Worries** - Fear of change, not feeling ready

### Features
- 16 questions answered in plain English
- Filterable by category
- Expandable question cards
- Young-person friendly tone

## PWA & Meta Tags

### Manifest (`vite.config.ts`)

```typescript
VitePWA({
  manifest: {
    name: 'Transition Ready',
    short_name: 'Transition',
    theme_color: '#f97316',
    background_color: '#fffbf5',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192' },
      { src: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
})
```

### Open Graph (`index.html`)

Social sharing previews configured for WhatsApp, Facebook, Twitter:
- `og:title` - "Transition Ready"
- `og:description` - "Helping young people prepare..."
- `og:image` - `/og-image.png` (1200x630)

### Favicon Files (`public/`)

| File | Purpose |
|------|---------|
| `favicon.ico` | Browser tabs |
| `icon.svg` | Modern browsers |
| `apple-touch-icon.png` | iOS home screen |
| `android-chrome-192x192.png` | Android small |
| `android-chrome-512x512.png` | Android large + PWA |
| `og-image.png` | Social sharing preview |
