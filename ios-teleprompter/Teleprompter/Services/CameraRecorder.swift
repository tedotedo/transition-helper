import AVFoundation
import Photos
import Observation

@Observable
final class CameraRecorder: NSObject, AVCaptureFileOutputRecordingDelegate {
    let session = AVCaptureSession()

    private(set) var isAuthorized = false
    private(set) var isRecording = false
    private(set) var lastError: String?
    var position: AVCaptureDevice.Position = .front

    private let movieOutput = AVCaptureMovieFileOutput()
    private let configurationQueue = DispatchQueue(label: "teleprompter.camera.configure")
    private var configured = false

    func clearError() {
        lastError = nil
    }

    func prepare() async {
        lastError = nil
        let cameraGranted = await requestAccess(for: .video)
        let micGranted = await requestAccess(for: .audio)
        isAuthorized = cameraGranted && micGranted
        guard isAuthorized else {
            lastError = "Camera or microphone permission denied."
            return
        }
        await configureSession()
    }

    func switchCamera() async {
        position = (position == .front) ? .back : .front
        await configureSession()
    }

    func start() {
        guard isAuthorized else { return }
        configurationQueue.async { [weak self] in
            guard let self, !self.session.isRunning else { return }
            self.session.startRunning()
        }
    }

    func stop() {
        configurationQueue.async { [weak self] in
            guard let self, self.session.isRunning else { return }
            self.session.stopRunning()
        }
    }

    func startRecording() {
        guard isAuthorized, !isRecording else { return }
        let url = FileManager.default.temporaryDirectory
            .appendingPathComponent("teleprompter-\(UUID().uuidString).mov")
        if let connection = movieOutput.connection(with: .video) {
            if connection.isVideoMirroringSupported {
                connection.automaticallyAdjustsVideoMirroring = false
                connection.isVideoMirrored = (position == .front)
            }
        }
        movieOutput.startRecording(to: url, recordingDelegate: self)
        isRecording = true
    }

    func stopRecording() {
        guard isRecording else { return }
        movieOutput.stopRecording()
    }

    // MARK: - AVCaptureFileOutputRecordingDelegate

    func fileOutput(_ output: AVCaptureFileOutput,
                    didFinishRecordingTo outputFileURL: URL,
                    from connections: [AVCaptureConnection],
                    error: Error?) {
        Task { @MainActor in
            self.isRecording = false
            if let error {
                self.lastError = "Recording failed: \(error.localizedDescription)"
                return
            }
            await self.saveToPhotos(outputFileURL)
        }
    }

    // MARK: - Helpers

    private func requestAccess(for type: AVMediaType) async -> Bool {
        switch AVCaptureDevice.authorizationStatus(for: type) {
        case .authorized: return true
        case .notDetermined: return await AVCaptureDevice.requestAccess(for: type)
        default: return false
        }
    }

    private func configureSession() async {
        await withCheckedContinuation { (continuation: CheckedContinuation<Void, Never>) in
            configurationQueue.async { [weak self] in
                guard let self else { continuation.resume(); return }
                self.session.beginConfiguration()

                if !self.configured {
                    self.session.sessionPreset = .high
                }

                for input in self.session.inputs {
                    self.session.removeInput(input)
                }

                if let device = AVCaptureDevice.default(.builtInWideAngleCamera,
                                                       for: .video,
                                                       position: self.position),
                   let input = try? AVCaptureDeviceInput(device: device),
                   self.session.canAddInput(input) {
                    self.session.addInput(input)
                }

                if let mic = AVCaptureDevice.default(for: .audio),
                   let micInput = try? AVCaptureDeviceInput(device: mic),
                   self.session.canAddInput(micInput) {
                    self.session.addInput(micInput)
                }

                if !self.configured {
                    if self.session.canAddOutput(self.movieOutput) {
                        self.session.addOutput(self.movieOutput)
                    }
                    self.configured = true
                }

                self.session.commitConfiguration()
                continuation.resume()
            }
        }
    }

    private func saveToPhotos(_ url: URL) async {
        let status = await PHPhotoLibrary.requestAuthorization(for: .addOnly)
        guard status == .authorized || status == .limited else {
            lastError = "Photo Library access denied — recording kept in app sandbox."
            return
        }
        do {
            try await PHPhotoLibrary.shared().performChanges {
                let request = PHAssetCreationRequest.forAsset()
                request.addResource(with: .video, fileURL: url, options: nil)
            }
        } catch {
            lastError = "Could not save video: \(error.localizedDescription)"
        }
    }
}
