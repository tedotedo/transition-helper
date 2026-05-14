import SwiftUI
import SwiftData

@main
struct TeleprompterApp: App {
    var body: some Scene {
        WindowGroup {
            ScriptListView()
        }
        .modelContainer(for: Script.self)
    }
}
