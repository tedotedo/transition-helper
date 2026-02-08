# Text-to-Speech Implementation Guide

Status: **IMPLEMENTED** in Transition Ready (Feb 2026)

---

## Overview

The TTS system provides browser-based text-to-speech across the app using the Web Speech API. No API keys, no external services, no cost.

### Architecture

| File | Purpose |
|------|---------|
| `src/hooks/useEasyRead.tsx` | Toggle for Easy Read mode (localStorage) — pre-existing |
| `src/hooks/useVoice.tsx` | Stores selected voice (localStorage), loads available English voices, filters novelty voices |
| `src/components/ReadAloud.tsx` | Per-section "Read aloud" button using Web Speech API |
| `src/components/VoicePicker.tsx` | Portal-based dropdown to preview & choose a voice |

### Key files modified

| File | Change |
|------|--------|
| `src/App.tsx` | Wrapped with `VoiceProvider`, toggles `body.easy-read` CSS class |
| `src/hooks/index.ts` | Exports `useVoice` and `VoiceProvider` |
| `src/components/layout/AppShell.tsx` | Easy Read toggle + VoicePicker in sidebar and mobile menu |
| `src/index.css` | Easy Read typography styles + ReadAloud button animations |
| 21 page files in `src/pages/` | ReadAloud buttons on all text sections (101 instances total) |

---

## How it works

1. **Young person mode** — ReadAloud buttons and VoicePicker are visible only in young person mode
2. **Easy Read toggle** — in the sidebar (desktop) and "More" menu (mobile), above the navigation. Toggles larger text, wider line-height, and max-width on paragraphs
3. **Read aloud buttons** — appear next to every informational text section. Each button reads only its own section's plain text (no emojis, no HTML)
4. **Voice picker** — in the sidebar/mobile menu. Shows all available English voices with country flags and preview buttons. Selection persists to localStorage
5. **Auto fallback** — if no voice is manually chosen, the system picks: en-GB female > en-GB any > en female any > en any > browser default

## Voice selection priority (auto mode)

1. en-GB female voice (e.g. Shelley, Flo)
2. en-GB any voice (e.g. Daniel)
3. en female voice from any region (e.g. Samantha, Karen)
4. en any voice
5. Browser default with `lang: 'en-GB'`

## Speech parameters

- `rate: 0.9` — slightly slower for clarity
- `pitch: 1.1` — slightly higher for a softer tone

## Browser support

- Chrome (desktop + Android) — full support, many voices
- Safari (desktop + iOS) — full support, high-quality voices
- Firefox — supported, fewer voices
- Edge — full support (uses Chrome engine)

## Key design decisions

- **No external APIs** — everything runs locally in the browser
- **Per-section ReadAloud** — each button reads only its own text block, avoiding reading emojis and navigation
- **Plain text only** — ReadAloud `text` props contain clean English text with no emojis, HTML, or formatting markers
- **Portal-based dropdown** — VoicePicker uses `createPortal` to render into `document.body`, avoiding z-index stacking issues on mobile
- **Novelty voice filter** — filters out joke voices (Bells, Boing, Bubbles etc.) that aren't appropriate for a care/health app
- **Gentle voice params** — `rate: 0.9` and `pitch: 1.1` make the voice sound softer and less robotic
- **Cancel on unmount** — speech is cancelled when navigating away
- **TTS independent of Easy Read** — ReadAloud buttons show in young person mode regardless of Easy Read state. Easy Read only controls typography

## Adding ReadAloud to a new page

```tsx
import ReadAloud from '../components/ReadAloud'

// Place after any informational text section:
<p>Your informational text here.</p>
<div className="mt-2">
  <ReadAloud text="Your informational text here." />
</div>
```

The `text` prop should be plain English only — no emojis, no HTML tags, no bold markers.

## Pages with ReadAloud coverage (101 instances across 21 pages)

- Home, My Journey
- Learn About Condition, My Team, Speak Up, Know Your Medicines, Ask About Move Date, Look Into PIP, Hello New Team, Check Your Support
- Rights Hub, Consent Under 16, Consent 16-17, Consent 18+
- Money & PIP, Planning Tools
- Videos & Stories, Resources
- Skills Builder, Questions & Answers, About
