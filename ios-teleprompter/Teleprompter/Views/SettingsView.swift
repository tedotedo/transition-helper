import SwiftUI

struct SettingsView: View {
    @Environment(\.dismiss) private var dismiss
    @Bindable private var settings = PrompterSettings.shared

    var body: some View {
        NavigationStack {
            Form {
                Section("Appearance") {
                    Picker("Theme", selection: $settings.theme) {
                        ForEach(PrompterTheme.allCases) { theme in
                            Text(theme.label).tag(theme)
                        }
                    }
                    Toggle("Show reading guide line", isOn: $settings.showGuideLine)
                }

                Section("Defaults") {
                    HStack {
                        Text("Font size")
                        Spacer()
                        Text("\(Int(settings.defaultFontSize))")
                            .foregroundStyle(.secondary)
                    }
                    Slider(value: $settings.defaultFontSize, in: 24...140, step: 2)

                    HStack {
                        Text("Scroll speed")
                        Spacer()
                        Text("\(Int(settings.defaultScrollSpeed)) px/s")
                            .foregroundStyle(.secondary)
                    }
                    Slider(value: $settings.defaultScrollSpeed, in: 10...200, step: 5)

                    Toggle("Mirror by default", isOn: $settings.defaultMirrored)
                }

                Section("Countdown before scroll") {
                    Stepper(value: $settings.countdownSeconds, in: 0...10) {
                        Text("\(settings.countdownSeconds) seconds")
                    }
                }

                Section("About") {
                    LabeledContent("Version", value: "0.1.0")
                    Text("Tap the screen to pause. Drag up or down to scrub. Each script remembers its own speed and font.")
                        .font(.footnote)
                        .foregroundStyle(.secondary)
                }
            }
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button("Done") { dismiss() }
                }
            }
        }
    }
}
