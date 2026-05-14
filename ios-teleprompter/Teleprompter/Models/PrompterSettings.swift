import SwiftUI

enum PrompterTheme: String, CaseIterable, Identifiable {
    case dark
    case light
    case sepia

    var id: String { rawValue }

    var label: String {
        switch self {
        case .dark: return "Dark"
        case .light: return "Light"
        case .sepia: return "Sepia"
        }
    }

    var background: Color {
        switch self {
        case .dark: return .black
        case .light: return .white
        case .sepia: return Color(red: 0.96, green: 0.91, blue: 0.78)
        }
    }

    var foreground: Color {
        switch self {
        case .dark: return .white
        case .light: return .black
        case .sepia: return Color(red: 0.25, green: 0.18, blue: 0.10)
        }
    }

    var guideLine: Color {
        switch self {
        case .dark: return .yellow.opacity(0.65)
        case .light: return .orange.opacity(0.7)
        case .sepia: return Color(red: 0.7, green: 0.35, blue: 0.1).opacity(0.7)
        }
    }
}

@Observable
final class PrompterSettings {
    static let shared = PrompterSettings()

    var defaultFontSize: Double {
        didSet { UserDefaults.standard.set(defaultFontSize, forKey: "defaultFontSize") }
    }

    var defaultScrollSpeed: Double {
        didSet { UserDefaults.standard.set(defaultScrollSpeed, forKey: "defaultScrollSpeed") }
    }

    var defaultMirrored: Bool {
        didSet { UserDefaults.standard.set(defaultMirrored, forKey: "defaultMirrored") }
    }

    var theme: PrompterTheme {
        didSet { UserDefaults.standard.set(theme.rawValue, forKey: "theme") }
    }

    var countdownSeconds: Int {
        didSet { UserDefaults.standard.set(countdownSeconds, forKey: "countdownSeconds") }
    }

    var showGuideLine: Bool {
        didSet { UserDefaults.standard.set(showGuideLine, forKey: "showGuideLine") }
    }

    private init() {
        let d = UserDefaults.standard
        self.defaultFontSize = d.object(forKey: "defaultFontSize") as? Double ?? 56
        self.defaultScrollSpeed = d.object(forKey: "defaultScrollSpeed") as? Double ?? 60
        self.defaultMirrored = d.bool(forKey: "defaultMirrored")
        let raw = d.string(forKey: "theme") ?? PrompterTheme.dark.rawValue
        self.theme = PrompterTheme(rawValue: raw) ?? .dark
        self.countdownSeconds = d.object(forKey: "countdownSeconds") as? Int ?? 3
        self.showGuideLine = d.object(forKey: "showGuideLine") as? Bool ?? true
    }
}
