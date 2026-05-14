import SwiftUI
import SwiftData

struct ScriptEditorView: View {
    @Bindable var script: Script
    @Environment(\.modelContext) private var modelContext
    @State private var showingPrompter = false
    @FocusState private var bodyFocused: Bool

    var body: some View {
        VStack(spacing: 0) {
            TextField("Title", text: $script.title)
                .font(.title2.bold())
                .textFieldStyle(.plain)
                .padding(.horizontal)
                .padding(.top, 8)

            Divider().padding(.top, 8)

            TextEditor(text: $script.body)
                .font(.system(size: 18, design: .rounded))
                .padding(.horizontal, 12)
                .focused($bodyFocused)

            statsBar
        }
        .navigationBarTitleDisplayMode(.inline)
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button {
                    bodyFocused = false
                    showingPrompter = true
                } label: {
                    Label("Start", systemImage: "play.fill")
                        .labelStyle(.titleAndIcon)
                }
                .buttonStyle(.borderedProminent)
                .disabled(script.body.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            }
        }
        .onChange(of: script.body) { script.updatedAt = .now }
        .onChange(of: script.title) { script.updatedAt = .now }
        .fullScreenCover(isPresented: $showingPrompter) {
            TeleprompterView(script: script)
        }
    }

    private var statsBar: some View {
        HStack(spacing: 12) {
            Label("\(ReadingTimeEstimator.wordCount(for: script.body)) words", systemImage: "text.word.spacing")
            Label(
                ReadingTimeEstimator.formatted(
                    seconds: ReadingTimeEstimator.estimatedSeconds(for: script.body)),
                systemImage: "clock"
            )
            Spacer()
        }
        .font(.caption)
        .foregroundStyle(.secondary)
        .padding(.horizontal)
        .padding(.vertical, 10)
        .background(.bar)
    }
}
