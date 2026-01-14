# CLAUDE.md - WARP Transition Helper

## Project Overview

**WARP Transition Helper** is a React-based Progressive Web App (PWA) designed to help young people (ages 11-18+) and their parents/carers prepare for transitioning from children's healthcare to adult healthcare services. It follows the NHS "Ready Steady Go" transition framework.

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
│       ├── AppShell.tsx    # Main layout wrapper (sidebar + header)
│       ├── Notifications.tsx
│       └── Search.tsx
├── pages/                  # All route pages (see Routes section)
├── hooks/
│   ├── index.ts
│   └── useLocalStorage.ts  # Custom hook for persisted state
└── data/                   # Static data files
    ├── notifications.ts
    ├── search-index.ts
    └── success-stories.ts
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
| `/rights/consent-16-17` | Consent16to17 | Detailed consent guide for 16-17 |
| `/money` | MoneyPip | Financial independence info |
| `/planning` | PlanningTools | Planning resources |
| `/videos` | VideosStories | Video/story content hub |
| `/resources` | Resources | Ready Steady Go PDF downloads |
| `/resources/ready-steady-go/*` | PdfViewer | PDF viewer for questionnaires |

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

The `useLocalStorage` hook handles persistence with automatic JSON serialization.

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

## Known Mobile UX Issues

Areas identified for potential improvement:

1. **Home page:** 7 stacked sections create long scroll depth
2. **Care Plan:** 9 sections always visible; could use accordions
3. **Appointments/CareTeam:** Inline add forms push content down; could use bottom sheets
4. **Checklist:** 4-column stage selector cramped on small phones
5. **Rights Hub:** Very long expanded content sections (100+ lines each)
6. **Global:** Cards have heavy styling (gradients + borders + shadows)

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
