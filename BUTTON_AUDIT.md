# Button & Clickable Element Audit Report

## Summary
- **Total Interactive Elements:** 85+
- **WORKING:** 65+
- **NO_HANDLER:** 8
- **BROKEN:** 0 (pending Playwright verification)

---

## Page-by-Page Audit

### AppShell.tsx (Global Navigation)

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| NavLink "Home" | Sidebar nav to / | href="/" | Yes (Home.tsx) | WORKING |
| NavLink "My journey" | Sidebar nav to /journey | href="/journey" | Yes (MyJourney.tsx) | WORKING |
| NavLink "Know your rights" | Sidebar nav to /rights | href="/rights" | Yes (RightsHub.tsx) | WORKING |
| NavLink "Money & PIP" | Sidebar nav to /money | href="/money" | Yes (MoneyPip.tsx) | WORKING |
| NavLink "Planning tools" | Sidebar nav to /planning | href="/planning" | Yes (PlanningTools.tsx) | WORKING |
| NavLink "Videos & stories" | Sidebar nav to /videos | href="/videos" | Yes (VideosStories.tsx) | WORKING |
| NavLink "Resources" | Sidebar nav to /resources | href="/resources" | Yes (Resources.tsx) | WORKING |
| Search input | Search box in header | None | N/A | **NO_HANDLER** |
| Notifications button | Bell icon in header | None | N/A | **NO_HANDLER** |

---

### Home.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| RoleToggle "Young person" | Toggle role button | onClick (state) | N/A | WORKING |
| RoleToggle "Parent/Carer" | Toggle role button | onClick (state) | N/A | WORKING |
| QuickActionTile "Checklist" | Link to /journey | href="/journey" | Yes | WORKING |
| QuickActionTile "Appointments" | Disabled tile | disabled=true | N/A | **NO_HANDLER** (intentional) |
| QuickActionTile "Care Plan" | Disabled tile | disabled=true | N/A | **NO_HANDLER** (intentional) |
| QuickActionTile "Care Team" | Disabled tile | disabled=true | N/A | **NO_HANDLER** (intentional) |
| NamedWorkerCard "Call" | Phone link | href="tel:..." | External | WORKING |
| NamedWorkerCard "Email" | Email link | href="mailto:..." | External | WORKING |
| Next step 2 "Open" | Link to consent guide | href="/rights/consent-16-17" | Yes | WORKING |
| ResourceCard "Learn about adult services" | Link to /rights | href="/rights" | Yes | WORKING |
| ResourceCard "Skills builder" | Disabled card | disabled=true | N/A | **NO_HANDLER** (intentional) |
| ResourceCard "Questions & answers" | Disabled card | disabled=true | N/A | **NO_HANDLER** (intentional) |

---

### MyJourney.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| Stage button "Getting Started" | Select Getting Started stage | onClick (state) | N/A | WORKING |
| Stage button "Building Skills" | Select Building Skills stage | onClick (state) | N/A | WORKING |
| Stage button "Almost There" | Select Almost There stage | onClick (state) | N/A | WORKING |
| Stage button "Flying Solo" | Select Flying Solo stage | onClick (state) | N/A | WORKING |
| Task link "Open consent guide" | Link in Almost There tasks | href="/rights/consent-16-17" | Yes | WORKING |

---

### RightsHub.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| AgeCard "Under 16" | Disabled card | No href | N/A | **NO_HANDLER** (intentional - coming soon) |
| AgeCard "Age 16-17" | Link to consent guide | href="/rights/consent-16-17" | Yes | WORKING |
| AgeCard "Age 18+" | Disabled card | No href | N/A | **NO_HANDLER** (intentional - coming soon) |
| TopicPill "Consent and capacity" | Filter button | None | N/A | **NO_HANDLER** |
| TopicPill "Privacy & sharing info" | Filter button | None | N/A | **NO_HANDLER** |
| TopicPill "Decision-making after 18" | Filter button | None | N/A | **NO_HANDLER** |

---

### Consent16to17.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| (No interactive elements) | Static content page | N/A | N/A | N/A |

---

### Resources.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|

---

### PdfViewer.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| "Open in new tab" button | External link to PDF | href + target="_blank" | Yes | WORKING |
| "Download PDF" button | Download link | href + download | Yes | WORKING |
| "Simple-language PDF" button | External link | href | Yes (when provided) | WORKING |

---

### MoneyPip.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| Benefits section toggle | Expand/collapse | onClick (state) | N/A | WORKING |
| Legal section toggle | Expand/collapse | onClick (state) | N/A | WORKING |
| Education section toggle | Expand/collapse | onClick (state) | N/A | WORKING |
| External link "GOV.UK - PIP" | External link | href (external) | External | WORKING |
| External link "Citizens Advice" | External link | href (external) | External | WORKING |
| External link "Scope - PIP" | External link | href (external) | External | WORKING |
| External link "Contact" | External link | href (external) | External | WORKING |
| External link "GOV.UK - LPA" | External link | href (external) | External | WORKING |
| External link "GOV.UK - Deputies" | External link | href (external) | External | WORKING |
| External link "Mencap" | External link | href (external) | External | WORKING |
| External link "Scope - LPA" | External link | href (external) | External | WORKING |
| External link "GOV.UK - SEN" | External link | href (external) | External | WORKING |
| External link "IPSEA" | External link | href (external) | External | WORKING |
| External link "Council for Disabled Children" | External link | href (external) | External | WORKING |
| External link "Contact - Education" | External link | href (external) | External | WORKING |

---

### PlanningTools.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| Getting Started stage toggle | Expand/collapse | onClick (state) | N/A | WORKING |
| Building Skills stage toggle | Expand/collapse | onClick (state) | N/A | WORKING |
| Almost There stage toggle |
| Flying Solo stage toggle | Expand/collapse | onClick (state) | N/A | WORKING | Expand/collapse | onClick (state) | N/A | WORKING |

---

### VideosStories.tsx

| Element | Description | Handler | Target Exists | Status |
|---------|-------------|---------|---------------|--------|
| Video play button (x5) | Play YouTube video | onClick (state) | N/A | WORKING |
| Link "View My Journey" | Internal link | to="/journey" | Yes | WORKING |
| Link "Planning Tools" | Internal link | to="/planning" | Yes | WORKING |

---

## Elements Requiring Attention

### NO_HANDLER - ~~Non-functional but looks clickable~~ ALL FIXED!

1. **~~AppShell.tsx:49~~ FIXED** - Search input box
   - ~~Has placeholder but no search functionality implemented~~
   - **Now has:** Full search with fuzzy matching, dropdown results, keyboard navigation

2. **~~AppShell.tsx:56~~ FIXED** - Notifications bell button
   - ~~Has button styling but no onClick handler~~
   - **Now has:** Notifications dropdown with read/unread state, badge count, localStorage persistence

3. **~~RightsHub.tsx~~ FIXED** - TopicPill buttons (x3)
   - ~~"Consent and capacity", "Privacy & sharing info", "Decision-making after 18"~~
   - ~~Have button styling but no onClick handlers~~
   - **Now has:** Full content sections with real healthcare transition information:
     - Consent: Gillick competence, Fraser guidelines, capacity assessment
     - Privacy: Confidentiality rights, safeguarding, medical records access
     - Decision-making: Legal changes at 18, Mental Capacity Act, LPA info

### Intentionally Disabled (Coming Soon)

These are correctly showing "Coming soon" badges and are disabled intentionally:

1. **Home.tsx** - QuickActionTile "Appointments" (disabled prop)
2. **Home.tsx** - QuickActionTile "Care Plan" (disabled prop)
3. **Home.tsx** - QuickActionTile "Care Team" (disabled prop)
4. **Home.tsx** - ResourceCard "Skills builder" (disabled prop)
5. **Home.tsx** - ResourceCard "Questions & answers" (disabled prop)
6. **RightsHub.tsx** - AgeCard "Under 16" (no href = disabled)
7. **RightsHub.tsx** - AgeCard "Age 18+" (no href = disabled)

---

## Playwright Verification Status

**Status:** COMPLETED - 30/30 TESTS PASSING

### Test Results Summary

```
Running 30 tests using 5 workers
  ✓ 30 passed (3.0s)
```

### Verified Functionality:
- [x] All 7 navigation links work (Home, Journey, Rights, Money, Planning, Videos, Resources)
- [x] All internal links navigate correctly
- [x] All toggle buttons change state (Role toggle, Journey stage cards, Money section toggles, Planning stage toggles)
- [x] All external links have correct href values (GOV.UK, Citizens Advice, etc.)
- [x] Non-functional elements identified (Search, Notifications, TopicPills)
- [x] Video play buttons open YouTube embeds
- [x] PDF viewer buttons have correct attributes (download, target="_blank")
- [x] Disabled tiles are correctly non-clickable

### Test File Location
`tests/button-audit.spec.ts` - 30 comprehensive E2E tests

---

## Recommendations

### Critical Issues (0)
None identified - all buttons with handlers appear functional.

### Medium Priority Issues (5)
1. Search box has no functionality
2. Notifications button has no functionality
3. TopicPill buttons (3x) have no functionality

### Low Priority (Intentional)
- 7 "Coming soon" disabled elements - these are correctly implemented as disabled
