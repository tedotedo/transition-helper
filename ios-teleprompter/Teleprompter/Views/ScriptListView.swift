import SwiftUI
import SwiftData

struct ScriptListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Script.updatedAt, order: .reverse) private var scripts: [Script]

    @State private var showingSettings = false
    @State private var newScript: Script?

    var body: some View {
        NavigationStack {
            Group {
                if scripts.isEmpty {
                    emptyState
                } else {
                    list
                }
            }
            .navigationTitle("Scripts")
            .toolbar {
                ToolbarItem(placement: .topBarLeading) {
                    Button {
                        showingSettings = true
                    } label: {
                        Image(systemName: "gearshape")
                    }
                }
                ToolbarItem(placement: .topBarTrailing) {
                    Button(action: addScript) {
                        Image(systemName: "plus.circle.fill")
                            .font(.title2)
                    }
                }
            }
            .sheet(isPresented: $showingSettings) {
                SettingsView()
            }
            .navigationDestination(item: $newScript) { script in
                ScriptEditorView(script: script)
            }
        }
    }

    private var list: some View {
        List {
            ForEach(scripts) { script in
                NavigationLink(value: script) {
                    ScriptRow(script: script)
                }
            }
            .onDelete(perform: delete)
        }
        .navigationDestination(for: Script.self) { script in
            ScriptEditorView(script: script)
        }
    }

    private var emptyState: some View {
        VStack(spacing: 16) {
            Image(systemName: "text.alignleft")
                .font(.system(size: 56))
                .foregroundStyle(.secondary)
            Text("No scripts yet")
                .font(.title2.bold())
            Text("Tap + to write your first script.")
                .foregroundStyle(.secondary)
            Button("New script", action: addScript)
                .buttonStyle(.borderedProminent)
                .padding(.top, 8)
        }
        .padding()
    }

    private func addScript() {
        let script = Script(title: "Untitled script", body: "")
        modelContext.insert(script)
        newScript = script
    }

    private func delete(at offsets: IndexSet) {
        for index in offsets {
            modelContext.delete(scripts[index])
        }
    }
}

private struct ScriptRow: View {
    let script: Script

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text(script.title.isEmpty ? "Untitled" : script.title)
                .font(.headline)
            HStack(spacing: 8) {
                Text("\(ReadingTimeEstimator.wordCount(for: script.body)) words")
                Text("·")
                Text(ReadingTimeEstimator.formatted(
                    seconds: ReadingTimeEstimator.estimatedSeconds(for: script.body)))
                Text("·")
                Text(script.updatedAt, style: .date)
            }
            .font(.caption)
            .foregroundStyle(.secondary)
        }
        .padding(.vertical, 4)
    }
}
