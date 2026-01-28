# Multilingual Implementation Plan for Transition Ready

**Target Communities:** Middlesbrough and Stockton ethnic communities
**Date:** January 2026
**Status:** Planning Phase

---

## 1. Target Languages (Priority Order)

Based on Census 2021 data and current community demographics for Middlesbrough and Stockton:

### Tier 1: High Priority (Essential)
| Language | Community | Population % | Rationale |
|----------|-----------|--------------|-----------|
| **Urdu** | Pakistani | 6.2% | Largest ethnic minority in Middlesbrough |
| **Arabic** | Middle Eastern, Sudanese, Syrian refugees | Growing | #1 requested NHS translation language; significant Muslim population (10.22%) |
| **Punjabi** | Pakistani, Indian | 2-3% | Widely spoken across South Asian communities |

### Tier 2: Medium Priority (Important)
| Language | Community | Population % | Rationale |
|----------|-----------|--------------|-----------|
| **Bengali/Sylheti** | Bangladeshi | 0.4% | Established community |
| **Tigrinya** | Eritrean refugees | Growing | 17% of 2024 small boat arrivals; active refugee community |
| **Pashto/Dari** | Afghan refugees | 101+ registered | Afghan Resettlement Programme; 13% of recent arrivals |

### Tier 3: Lower Priority (Consider Later)
| Language | Community | Rationale |
|----------|-----------|-----------|
| **Ukrainian** | Ukrainian refugees | 106+ in Middlesbrough; Homes for Ukraine scheme |
| **Polish** | Eastern European | Established community across North East |
| **Somali** | Somali refugees | 8% of 2024 arrivals |
| **Farsi/Persian** | Iranian asylum seekers | 11% of 2024 arrivals |

### Note on Chinese
Chinese community (0.5%) is relatively small but if included, **Simplified Chinese** would be appropriate for NHS healthcare context.

---

## 2. Content Translation Strategy

### 2.1 Content Volume Assessment

| Content Type | Count | Strings | Priority |
|--------------|-------|---------|----------|
| **Navigation & UI** | ~15 items | ~50 | Critical |
| **Data Files** (myths, powers, badges) | 28 items | ~200 | High |
| **FAQ Section** | 16 questions | ~100 | High |
| **Skills Builder** | 9 skills | ~80 | High |
| **Major Pages** | 29 pages | ~2,500 | Medium-High |
| **Form Labels/Placeholders** | ~100 fields | ~100 | Medium |
| **Error Messages** | ~20 messages | ~30 | Medium |
| **Total Estimated** | - | **~3,000** | - |

### 2.2 Easy Read Consideration

The app already has "Easy Read" variants for accessibility. For multilingual:
- **Option A:** Translate both Standard and Easy Read versions (6,000 strings per language)
- **Option B:** Translate Standard only; offer Easy Read in English (3,000 strings per language)
- **Recommended:** Option A for Tier 1 languages, Option B for Tier 2-3

### 2.3 RTL (Right-to-Left) Languages

**Arabic and Urdu are RTL languages.** This requires:
- CSS direction changes (`dir="rtl"`)
- Flipped layouts (sidebar position, icons, etc.)
- Tailwind RTL plugin or custom utilities
- Testing all interactive components in RTL mode

---

## 3. Technical Architecture

### 3.1 Recommended i18n Library

**Primary Recommendation: `react-i18next`**

Reasons:
- Most popular React i18n solution
- Excellent TypeScript support
- Namespace support (group by feature/page)
- Pluralization and interpolation built-in
- Easy Read variants can use nested keys
- Good RTL support

Alternative: `lingui` (smaller bundle, good for PWAs)

### 3.2 File Structure

```
src/
├── i18n/
│   ├── index.ts                 # i18next configuration
│   ├── types.ts                 # TypeScript types for translations
│   └── locales/
│       ├── en/
│       │   ├── common.json      # Shared UI (nav, buttons, labels)
│       │   ├── home.json        # Home page content
│       │   ├── checklist.json   # Checklist page
│       │   ├── carePlan.json    # Care Plan page
│       │   ├── levelUp.json     # Level Up game (myths, powers, badges)
│       │   ├── skills.json      # Skills Builder
│       │   ├── faq.json         # Questions & Answers
│       │   ├── rights.json      # Rights Hub + consent pages
│       │   ├── journey.json     # My Journey activities
│       │   └── easyRead.json    # Easy Read variants (all)
│       ├── ur/                  # Urdu
│       │   └── [same structure]
│       ├── ar/                  # Arabic
│       │   └── [same structure]
│       ├── pa/                  # Punjabi
│       │   └── [same structure]
│       ├── bn/                  # Bengali
│       │   └── [same structure]
│       ├── ti/                  # Tigrinya
│       │   └── [same structure]
│       └── ps/                  # Pashto
│           └── [same structure]
```

### 3.3 Translation Key Strategy

```typescript
// Example key structure
{
  "home": {
    "hero": {
      "youngPerson": {
        "title": "Your Health, Your Future",
        "subtitle": "Take charge of your healthcare journey"
      },
      "parentCarer": {
        "title": "Supporting Your Young Person",
        "subtitle": "Helping them become healthcare independent"
      }
    },
    "actions": {
      "viewChecklist": "View Checklist",
      "manageTeam": "Manage Care Team"
    }
  },
  "easyRead": {
    "home": {
      "hero": {
        "youngPerson": {
          "title": "Your Health",
          "subtitle": "Learn about your healthcare"
        }
      }
    }
  }
}
```

### 3.4 Language Detection & Switching

```typescript
// Priority order for language detection:
1. User preference (saved in localStorage)
2. URL parameter (?lang=ur)
3. Browser language (navigator.language)
4. Default: English

// Language switcher component
<LanguageSwitcher
  position="header"        // Desktop: in header
  mobilePosition="menu"    // Mobile: in More menu
  showNativeNames={true}   // "اردو" not "Urdu"
/>
```

### 3.5 localStorage Keys Update

| Current Key | Multilingual Key |
|-------------|------------------|
| (new) | `transition-app-language` |

Value: ISO 639-1 code (`en`, `ur`, `ar`, `pa`, `bn`, `ti`, `ps`)

---

## 4. Implementation Phases

### Phase 1: Infrastructure (Foundation)
**Duration:** Sprint 1

1. Install and configure `react-i18next`
2. Create i18n folder structure and base configuration
3. Set up English translation files (extract from components)
4. Build `LanguageSwitcher` component
5. Add language detection logic
6. Implement RTL CSS foundation (Tailwind plugin)
7. Update `AppShell` with language switcher placement
8. Create translation extraction tooling

**Deliverable:** App works in English with i18n infrastructure ready

### Phase 2: Core UI Translation
**Duration:** Sprint 2

1. Translate navigation and common UI (`common.json`)
2. Translate Home page and role selector
3. Translate Quick Action tiles
4. Translate bottom nav and More menu
5. Test RTL layout fundamentals
6. Create style guide for translators

**Deliverable:** Navigation and home screen in all Tier 1 languages

### Phase 3: Key Feature Pages
**Duration:** Sprint 3-4

1. Translate Checklist page and stage names
2. Translate Care Plan page and form labels
3. Translate Care Team page
4. Translate Appointments page
5. Translate Level Up game content:
   - Myth Busters (8 myths x 2 variants)
   - Power-Ups Guide (8 powers x 2 variants)
   - Badges (12 badges)
6. Quality assurance: native speaker review

**Deliverable:** Core features fully translated

### Phase 4: Content-Heavy Pages
**Duration:** Sprint 5-6

1. Translate Rights Hub and consent guides
2. Translate My Journey activity pages (8 activities)
3. Translate Skills Builder (9 skills)
4. Translate Questions & Answers (16 FAQs)
5. Translate Money & PIP page
6. Translate About page and Privacy page

**Deliverable:** All content pages translated

### Phase 5: Easy Read Translations
**Duration:** Sprint 7

1. Extract Easy Read variants for all translated content
2. Translate Easy Read versions for Tier 1 languages
3. Test Easy Read toggle in each language
4. Review with accessibility consultants

**Deliverable:** Full Easy Read support in Tier 1 languages

### Phase 6: PDF & Resources
**Duration:** Sprint 8

1. Create translated PDF landing pages
2. Source or create translated Ready Steady Go materials
3. Add language-specific resource links
4. Create "Resources in Your Language" section

**Deliverable:** Translated resource guidance (Note: actual PDF translation is external dependency)

### Phase 7: Testing & Polish
**Duration:** Sprint 9-10

1. End-to-end testing in all languages
2. RTL layout comprehensive testing
3. Community user testing sessions
4. Performance optimization (lazy loading translations)
5. Accessibility audit in each language
6. Fix reported issues

**Deliverable:** Production-ready multilingual app

---

## 5. Translation Workflow

### 5.1 Translation Management

**Option A: Translation Management System (TMS)**
- Crowdin, Lokalise, or Phrase
- Professional translators upload to platform
- Developers sync via CLI/CI
- Cost: $50-200/month

**Option B: Community Translation**
- Google Sheets or Airtable for coordination
- Community volunteers translate
- Manual JSON export
- Cost: Free (volunteer time)

**Option C: Hybrid**
- Professional translation for medical/legal content
- Community review and refinement
- Recommended for healthcare context

### 5.2 Translation Quality

For NHS healthcare content, translations should be:
- **Medically accurate** - Reviewed by healthcare professionals
- **Culturally appropriate** - Not just literal translation
- **Age-appropriate** - Target audience is 11-18 year olds
- **Plain language** - Avoid medical jargon where possible

**Recommended reviewers:**
- NHS interpreting services
- Local community health workers
- Tees Valley Inclusion Project
- Halo Project (BAME community services)

### 5.3 Content Update Process

```
1. English content updated by developers
2. CI marks translation keys as "needs update"
3. Translators notified of changes
4. Translations updated and reviewed
5. PR created with translation updates
6. Review by native speaker
7. Merge and deploy
```

---

## 6. User Experience Design

### 6.1 Language Selector Placement

**Desktop:**
- Globe icon in header (right side)
- Opens dropdown with language names in native script
- Shows flag icons (optional, can be controversial)

**Mobile:**
- In "More" menu at top
- Full language names visible
- Persists across sessions

### 6.2 Language Indicator

- Show current language code in header (e.g., "EN", "اردو")
- Subtle indicator, not distracting
- Always visible for easy switching

### 6.3 First-Time Visitor Experience

```
1. Detect browser language
2. If non-English detected and translation available:
   - Show banner: "This site is available in [Language Name]"
   - One-click to switch
   - Option to dismiss and stay in English
3. Remember choice in localStorage
```

### 6.4 Partial Translation Handling

For pages not yet translated:
- Show English content with notice
- "This page is not yet available in [Language]. Showing English."
- Link to help translate (community contribution)

---

## 7. RTL Implementation Details

### 7.1 Tailwind RTL Setup

```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
```

### 7.2 Key RTL Changes

| Component | LTR | RTL |
|-----------|-----|-----|
| Sidebar | Left | Right |
| Back arrows | ← | → |
| Progress bars | Left to right | Right to left |
| Form labels | Left-aligned | Right-aligned |
| Lists | Left bullets | Right bullets |
| Icons with direction | Standard | Mirrored |

### 7.3 RTL CSS Utilities

```css
/* Base direction */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* Logical properties (modern CSS) */
.ms-4 { margin-inline-start: 1rem; }
.me-4 { margin-inline-end: 1rem; }
.ps-4 { padding-inline-start: 1rem; }
.pe-4 { padding-inline-end: 1rem; }
```

---

## 8. Accessibility Considerations

### 8.1 Language Attributes

```html
<html lang="ur" dir="rtl">
<p lang="en">English text within Urdu page</p>
```

### 8.2 Screen Reader Support

- Announce language changes
- Proper lang attributes on mixed-language content
- Test with NVDA/JAWS in RTL mode

### 8.3 Font Considerations

| Language | Recommended Font | Notes |
|----------|-----------------|-------|
| Urdu | Noto Nastaliq Urdu | Complex script |
| Arabic | Noto Sans Arabic | Modern, readable |
| Punjabi | Noto Sans Gurmukhi | For Gurmukhi script |
| Bengali | Noto Sans Bengali | Clear at small sizes |
| Tigrinya | Noto Sans Ethiopic | Ge'ez script |
| Pashto | Noto Sans Arabic | Arabic script variant |

Google Fonts provides all Noto fonts for free.

---

## 9. Performance Optimization

### 9.1 Translation Loading

```typescript
// Lazy load translations per language
i18n.loadLanguages(['ur']).then(() => {
  i18n.changeLanguage('ur');
});

// Only load needed namespaces
i18n.loadNamespaces(['common', 'home']);
```

### 9.2 Bundle Size Impact

| Strategy | Bundle Impact |
|----------|---------------|
| All translations in main bundle | +500KB |
| Lazy load per language | +5KB initial, +80KB per language |
| Code split by namespace | +5KB initial, +10-20KB per page |

**Recommended:** Lazy load by language + code split by namespace

### 9.3 Caching

- Translation files cached by service worker (PWA)
- Version hash in filename for cache busting
- Preload likely secondary language

---

## 10. Community Engagement

### 10.1 Partner Organizations

| Organization | Role |
|--------------|------|
| **Tees Valley Inclusion Project** | BAME community outreach |
| **Halo Project** | Cultural liaison, translation review |
| **MAP Middlesbrough** | Refugee community access |
| **North of England Refugee Service** | Translation volunteers |
| **NHS Tees Valley** | Medical terminology review |
| **Local mosques/temples** | Community distribution |

### 10.2 User Testing

- Recruit young people from target communities
- Test with parents/carers who prefer non-English
- Gather feedback on cultural appropriateness
- Iterate based on community input

### 10.3 Launch Strategy

1. Soft launch with Tier 1 languages
2. Announce through community organizations
3. Gather feedback for 4-6 weeks
4. Refine translations based on feedback
5. Full launch with Tier 2 languages
6. Ongoing community feedback loop

---

## 11. Success Metrics

### 11.1 Usage Metrics

- Language selection distribution
- Page views per language
- Session duration by language
- Feature usage by language (Checklist completion, Care Plan entries)

### 11.2 Quality Metrics

- User feedback (in-app feedback in each language)
- Translation error reports
- Community satisfaction surveys
- Accessibility audit scores

### 11.3 Target Goals

| Metric | 3-month Target | 6-month Target |
|--------|----------------|----------------|
| Non-English users | 10% | 20% |
| Languages active | 3 (Tier 1) | 6 (Tier 1+2) |
| Translation completeness | 80% | 95% |
| User satisfaction | 4.0/5.0 | 4.5/5.0 |

---

## 12. Budget Considerations

### 12.1 Translation Costs

| Item | Estimated Cost |
|------|----------------|
| Professional translation (3,000 strings x 3 languages) | £3,000-6,000 |
| Medical terminology review | £500-1,000 |
| Native speaker QA | £500-1,000 per language |
| Community volunteer coordination | Staff time |
| **Total Tier 1** | **£5,000-10,000** |

### 12.2 Ongoing Costs

| Item | Monthly Cost |
|------|--------------|
| Translation management platform | £50-200 |
| Incremental translation updates | £100-300 |
| Community coordinator time | Staff time |

### 12.3 Cost-Saving Options

- Partner with university translation students
- NHS translation services (may be free for health content)
- Community volunteer translators with professional review
- Apply for health equity grants

---

## 13. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Poor translation quality | High | Professional review, community testing |
| RTL layout bugs | Medium | Comprehensive testing, gradual rollout |
| Performance degradation | Medium | Lazy loading, code splitting |
| Incomplete translations | Low | Graceful fallback to English |
| Cultural insensitivity | High | Community involvement from start |
| Maintenance burden | Medium | Clear update process, TMS tooling |

---

## 14. Timeline Summary

| Phase | Duration | Languages | Milestone |
|-------|----------|-----------|-----------|
| Phase 1: Infrastructure | 2 weeks | - | i18n system ready |
| Phase 2: Core UI | 2 weeks | EN, UR, AR, PA | Navigation translated |
| Phase 3: Key Features | 4 weeks | EN, UR, AR, PA | Core features translated |
| Phase 4: Content Pages | 4 weeks | EN, UR, AR, PA | All pages translated |
| Phase 5: Easy Read | 2 weeks | UR, AR, PA | Easy Read in Tier 1 |
| Phase 6: Resources | 2 weeks | All | Resource guidance |
| Phase 7: Testing | 4 weeks | All | Production ready |
| **Total** | **20 weeks** | **6 languages** | **Full multilingual** |

---

## 15. Next Steps

1. **Immediate:**
   - Review and approve this plan
   - Identify translation budget
   - Contact community partners

2. **Short-term:**
   - Set up i18n infrastructure
   - Create English translation files
   - Begin Tier 1 translation procurement

3. **Medium-term:**
   - Implement language switcher
   - Complete Phase 2-3
   - Begin community testing

4. **Long-term:**
   - Complete all phases
   - Establish ongoing translation workflow
   - Expand to Tier 2-3 languages

---

## Appendix A: Language Codes Reference

| Language | ISO 639-1 | Native Name | Script | Direction |
|----------|-----------|-------------|--------|-----------|
| English | en | English | Latin | LTR |
| Urdu | ur | اردو | Nastaliq | RTL |
| Arabic | ar | العربية | Arabic | RTL |
| Punjabi | pa | ਪੰਜਾਬੀ / پنجابی | Gurmukhi/Shahmukhi | LTR/RTL |
| Bengali | bn | বাংলা | Bengali | LTR |
| Tigrinya | ti | ትግርኛ | Ge'ez | LTR |
| Pashto | ps | پښتو | Arabic | RTL |

---

## Appendix B: Research Sources

- [Middlesbrough Council - Local Population Diversity](https://www.middlesbrough.gov.uk/open-data-and-foi/local-statistics-and-data/local-population-diversity/)
- [ONS Census 2021 - How life has changed in Middlesbrough](https://www.ons.gov.uk/visualisations/censusareachanges/E06000002)
- [Stockton-on-Tees Demographics](https://www.stockton.gov.uk/article/11023/Demographics-of-Stockton-on-Tees)
- [GOV.UK - Immigration Statistics September 2024](https://www.gov.uk/government/statistics/immigration-system-statistics-year-ending-september-2024/how-many-people-are-granted-asylum-in-the-uk)
- [Tees Valley of Sanctuary](https://tees-valley.cityofsanctuary.org/)
- [Tees Valley Inclusion Project](https://www.babinc.org/empowering-inclusive-communities-the-tees-valley-inclusion-project/)

---

*Document created: January 2026*
*Last updated: January 2026*
*Author: Claude Code Assistant*
