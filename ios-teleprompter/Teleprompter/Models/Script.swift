import Foundation
import SwiftData

@Model
final class Script {
    var title: String
    var body: String
    var createdAt: Date
    var updatedAt: Date

    var preferredFontSize: Double?
    var preferredScrollSpeed: Double?
    var preferredMirrored: Bool?

    init(
        title: String = "Untitled script",
        body: String = "",
        createdAt: Date = .now,
        updatedAt: Date = .now
    ) {
        self.title = title
        self.body = body
        self.createdAt = createdAt
        self.updatedAt = updatedAt
    }
}
