import SwiftUI
import SwiftData

struct TeleprompterView: View {
    @Bindable var script: Script
    @Environment(\.dismiss) private var dismiss

    private let settings = PrompterSettings.shared

    @State private var fontSize: Double = 56
    @State private var scrollSpeed: Double = 60
    @State private var mirrored: Bool = false

    @State private var isPlaying = false
    @State private var offset: CGFloat = 0
    @State private var contentHeight: CGFloat = 0
    @State private var viewportHeight: CGFloat = 0
    @State private var lastTick: Date?
    @State private var countdown: Int? = nil
    @State private var showingControls = true
    @State private var hideControlsTask: Task<Void, Never>?

    var body: some View {
        ZStack {
            settings.theme.background
                .ignoresSafeArea()

            scrollingScript
                .scaleEffect(x: mirrored ? -1 : 1, y: 1)

            if settings.showGuideLine {
                GeometryReader { geo in
                    Rectangle()
                        .fill(settings.theme.guideLine)
                        .frame(height: 2)
                        .position(x: geo.size.width / 2, y: geo.size.height * 0.33)
                }
                .allowsHitTesting(false)
            }

            if let countdown {
                CountdownOverlay(value: countdown)
            }

            if showingControls {
                controlsOverlay
                    .transition(.opacity)
            }
        }
        .statusBarHidden()
        .persistentSystemOverlays(.hidden)
        .onAppear(perform: configureFromPreferences)
        .onDisappear(perform: persistPreferences)
        .onTapGesture { handleTap() }
        .gesture(verticalDragGesture)
    }

    // MARK: - Scrolling content

    private var scrollingScript: some View {
        GeometryReader { geo in
            ScrollView(.vertical, showsIndicators: false) {
                Text(script.body)
                    .font(.system(size: fontSize, weight: .semibold, design: .rounded))
                    .foregroundStyle(settings.theme.foreground)
                    .lineSpacing(fontSize * 0.25)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 24)
                    .padding(.top, geo.size.height * 0.33)
                    .padding(.bottom, geo.size.height * 0.66)
                    .background(
                        GeometryReader { inner in
                            Color.clear
                                .onAppear { contentHeight = inner.size.height }
                                .onChange(of: inner.size.height) { _, newValue in
                                    contentHeight = newValue
                                }
                        }
                    )
                    .offset(y: -offset)
            }
            .scrollDisabled(true)
            .onAppear { viewportHeight = geo.size.height }
            .onChange(of: geo.size.height) { _, h in viewportHeight = h }
        }
        .timelineDriver(isActive: isPlaying) { now in
            tick(at: now)
        }
    }

    private func tick(at now: Date) {
        guard isPlaying else { lastTick = nil; return }
        defer { lastTick = now }
        guard let last = lastTick else { return }
        let dt = now.timeIntervalSince(last)
        let pixelsPerSecond = scrollSpeed
        offset += CGFloat(dt) * CGFloat(pixelsPerSecond)
        let maxOffset = max(0, contentHeight - viewportHeight)
        if offset >= maxOffset {
            offset = maxOffset
            isPlaying = false
        }
    }

    // MARK: - Controls

    private var controlsOverlay: some View {
        VStack {
            HStack {
                Button {
                    dismiss()
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title)
                        .foregroundStyle(.white, .black.opacity(0.4))
                }
                Spacer()
                Button {
                    mirrored.toggle()
                } label: {
                    Image(systemName: mirrored ? "rectangle.lefthalf.inset.filled.arrow.left" : "rectangle.righthalf.inset.filled.arrow.right")
                        .font(.title2)
                        .foregroundStyle(.white, .black.opacity(0.4))
                }
            }
            .padding()

            Spacer()

            VStack(spacing: 14) {
                HStack(spacing: 14) {
                    Button(action: rewind) {
                        Image(systemName: "gobackward.10")
                            .font(.title2)
                    }
                    Button(action: togglePlay) {
                        Image(systemName: isPlaying ? "pause.fill" : "play.fill")
                            .font(.system(size: 28))
                            .frame(width: 56, height: 56)
                            .background(.white.opacity(0.95), in: Circle())
                            .foregroundStyle(.black)
                    }
                    Button(action: restart) {
                        Image(systemName: "arrow.counterclockwise")
                            .font(.title2)
                    }
                }
                .foregroundStyle(.white)

                slider(
                    label: "Speed",
                    value: $scrollSpeed,
                    range: 10...200,
                    valueText: "\(Int(scrollSpeed)) px/s"
                )

                slider(
                    label: "Font",
                    value: $fontSize,
                    range: 24...140,
                    valueText: "\(Int(fontSize))"
                )
            }
            .padding()
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 24))
            .padding()
        }
    }

    private func slider(label: String, value: Binding<Double>, range: ClosedRange<Double>, valueText: String) -> some View {
        HStack {
            Text(label).frame(width: 56, alignment: .leading)
            Slider(value: value, in: range)
            Text(valueText).font(.caption.monospacedDigit()).frame(width: 70, alignment: .trailing)
        }
        .foregroundStyle(.white)
    }

    // MARK: - Actions

    private func togglePlay() {
        if isPlaying {
            isPlaying = false
            return
        }
        let seconds = settings.countdownSeconds
        guard seconds > 0 else {
            isPlaying = true
            return
        }
        countdown = seconds
        Task {
            for value in stride(from: seconds, to: 0, by: -1) {
                countdown = value
                try? await Task.sleep(for: .seconds(1))
            }
            countdown = nil
            lastTick = nil
            isPlaying = true
        }
    }

    private func rewind() {
        offset = max(0, offset - fontSize * 4)
    }

    private func restart() {
        isPlaying = false
        offset = 0
    }

    private func handleTap() {
        if isPlaying {
            isPlaying = false
            withAnimation { showingControls = true }
            scheduleControlsHide()
        } else {
            withAnimation { showingControls.toggle() }
            if showingControls { scheduleControlsHide() }
        }
    }

    private func scheduleControlsHide() {
        hideControlsTask?.cancel()
        hideControlsTask = Task {
            try? await Task.sleep(for: .seconds(3))
            if !Task.isCancelled, isPlaying {
                withAnimation { showingControls = false }
            }
        }
    }

    private var verticalDragGesture: some Gesture {
        DragGesture(minimumDistance: 8)
            .onChanged { value in
                offset = max(0, min(contentHeight - viewportHeight, offset - value.translation.height * 0.2))
            }
    }

    // MARK: - Preferences

    private func configureFromPreferences() {
        fontSize = script.preferredFontSize ?? settings.defaultFontSize
        scrollSpeed = script.preferredScrollSpeed ?? settings.defaultScrollSpeed
        mirrored = script.preferredMirrored ?? settings.defaultMirrored
        scheduleControlsHide()
    }

    private func persistPreferences() {
        script.preferredFontSize = fontSize
        script.preferredScrollSpeed = scrollSpeed
        script.preferredMirrored = mirrored
    }
}

// MARK: - Countdown overlay

private struct CountdownOverlay: View {
    let value: Int

    var body: some View {
        Text("\(value)")
            .font(.system(size: 180, weight: .bold, design: .rounded))
            .foregroundStyle(.white)
            .shadow(radius: 20)
            .transition(.scale.combined(with: .opacity))
            .id(value)
    }
}

// MARK: - TimelineView driver

private extension View {
    @ViewBuilder
    func timelineDriver(isActive: Bool, _ tick: @escaping (Date) -> Void) -> some View {
        TimelineView(.animation(minimumInterval: 1.0 / 60.0, paused: !isActive)) { context in
            self.onChange(of: context.date) { _, newValue in
                tick(newValue)
            }
        }
    }
}
