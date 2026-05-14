import Foundation

enum ReadingTimeEstimator {
    static let averageWordsPerMinute: Double = 150

    static func wordCount(for text: String) -> Int {
        text.split { $0.isWhitespace || $0.isNewline }.count
    }

    static func estimatedSeconds(for text: String, wordsPerMinute: Double = averageWordsPerMinute) -> Int {
        let words = Double(wordCount(for: text))
        guard words > 0, wordsPerMinute > 0 else { return 0 }
        return Int((words / wordsPerMinute) * 60)
    }

    static func formatted(seconds: Int) -> String {
        let minutes = seconds / 60
        let remaining = seconds % 60
        if minutes == 0 { return "\(remaining)s" }
        return String(format: "%d:%02d", minutes, remaining)
    }
}
