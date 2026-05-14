# Teleprompter (iOS)

A SwiftUI teleprompter app for recording your own scripted videos.

## What's in this scaffold

A working MVP teleprompter you can open in Xcode and run on a real device or simulator:

- **Script library** — create, rename, edit, and delete scripts (persisted with SwiftData)
- **Editor** — write or paste your script with a large, comfortable text area
- **Teleprompter view** — full-screen scrolling text with:
  - Adjustable scroll speed (slider + tap-to-pause)
  - Adjustable font size
  - Mirror flip (horizontal) for use with a reflective glass rig
  - Light / dark / high-contrast themes
  - Reading guide line (highlights where your eye should be)
  - 3-2-1 countdown before scrolling starts
  - Estimated reading time
- **Settings** — defaults for speed, font size, theme, mirror
- **Record-while-prompting** — front/back camera preview behind the scrolling text, with a tap-to-record button. Finished videos are saved straight to the Photos library.

## Project layout

```
Teleprompter/
├── App/
│   └── TeleprompterApp.swift        # @main entry point
├── Models/
│   ├── Script.swift                 # SwiftData model
│   └── PrompterSettings.swift       # User defaults wrapper
├── Views/
│   ├── ScriptListView.swift         # Library / home screen
│   ├── ScriptEditorView.swift       # Edit a script
│   ├── TeleprompterView.swift       # Full-screen prompter
│   ├── CameraPreviewView.swift      # Live AVCaptureSession preview
│   └── SettingsView.swift           # App settings
├── Services/
│   ├── CameraRecorder.swift         # AVCaptureSession + save to Photos
│   └── ReadingTimeEstimator.swift   # Words/minute helpers
└── Resources/
    └── Assets.xcassets/             # (create in Xcode)
```

## Opening in Xcode (Mac required)

Xcode project files (`.xcodeproj`) are tricky to hand-write, so the simplest path is:

1. Open Xcode → **File → New → Project…**
2. Choose **iOS → App**, name it `Teleprompter`, interface **SwiftUI**, language **Swift**, storage **SwiftData**.
3. When the new project opens, **delete** the auto-generated `ContentView.swift` and `TeleprompterApp.swift`.
4. Drag the contents of the `Teleprompter/` folder from this repo into the Xcode project navigator (check "Copy items if needed" and "Create groups").
5. In **Signing & Capabilities**, pick your Apple ID team.
6. In the target's **Info** tab, add the following Info.plist keys (required for the camera-record feature):

   | Key | Suggested value |
   |-----|-----------------|
   | `NSCameraUsageDescription` | "Teleprompter uses the camera so you can record yourself reading your script." |
   | `NSMicrophoneUsageDescription` | "Teleprompter records audio with your video so your recordings have sound." |
   | `NSPhotoLibraryAddUsageDescription` | "Teleprompter saves finished recordings to your Photos library." |

7. Hit ▶ to build & run **on a real device** (the iOS simulator doesn't expose a real camera).

## Roadmap of paid-app "bells and whistles"

These are the features that justify a price tag and review well:

| Tier | Feature | Why it sells |
|------|---------|--------------|
| Free hook | Basic scroll, speed, mirror | What the App Store will judge as "is it a real teleprompter" |
| Easy wins | Countdown, reading-time estimate, dark/sepia themes | Polish — reviewers notice |
| ✅ Built | **Record video while teleprompting** (front/back camera overlay, prompter over the preview, saves to Photos) | Lets users film + read in one app — single biggest reason people pay |
| Killer feature | **Bluetooth foot-pedal & AirTurn support** | Pros buy this — covers a niche existing free apps ignore |
| Killer feature | **Apple Watch remote** (start/stop, speed up/down) | Demo-able, screenshotable, no extra hardware |
| Killer feature | **Voice-paced auto-scroll** (uses on-device speech recognition to keep the line you're saying under the eye-line marker) | "Magic" feature — no big competitor does it well |
| Polish | Markdown / pause-marker support (`[pause]`, `**emphasis**`) | Power users |
| Polish | Eye-line marker + "look here" camera dot | Helps eye contact, very visible in screenshots |
| Polish | Per-script settings (each script remembers its own speed/font) | Repeat users love it |
| Polish | iCloud sync of scripts across devices | Reduces friction, trivial with SwiftData + CloudKit |
| Polish | Import from Files / Pages / Word / PDF / paste-from-clipboard | Removes onboarding friction |
| Polish | AirPlay / external display mirroring | Lets people use an iPad as the prompter and iPhone to record |
| Pro tier | **AI script tools** — rewrite, shorten, hook-ify, translate (via on-device Apple Intelligence or your API) | Subscription justification |
| Pro tier | Export prompter + recorded video bundle, with auto-trim of dead air | Saves editing time |
| Pro tier | Practice mode with WPM/pace analytics | "Get better at delivery" angle |
| Pro tier | Custom fonts, unlimited script library, no watermark | Standard freemium fence |

### Suggested pricing model

A one-time IAP ($4.99–$9.99) to unlock recording + pedal support, plus an optional subscription ($2.99/mo or $19.99/yr) for AI tools and unlimited cloud sync. Keep the free tier genuinely useful (basic prompter + 3 saved scripts) so reviews stay positive.

### App Store positioning tips

- Screenshots: show the **mirror** mode and **camera overlay** on the first two slides — that's what differentiates from a Notes-app workaround.
- Keywords: `teleprompter`, `prompter`, `script reader`, `video script`, `auto cue`, `cue card`, `reels`, `tiktok script`.
- Localise the App Store listing into Spanish, French, German, Portuguese, Italian, Japanese, Korean — costs nothing and ~doubles addressable downloads for utility apps.
- Ship a 30–60s preview video showing record-while-prompting — Apple weights apps with previews higher.
