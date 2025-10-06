// AudioManager.swift
import Foundation
import AVFoundation
import SwiftUI

class AudioManager: NSObject, ObservableObject {
    static let shared = AudioManager()
    
    @Published var isPlaying = false
    @Published var currentTrack: MeditationTrack?
    @Published var playbackProgress: Double = 0.0
    @Published var duration: TimeInterval = 0.0
    @Published var currentTime: TimeInterval = 0.0
    
    private var audioPlayer: AVAudioPlayer?
    private var playbackTimer: Timer?
    
    private override init() {
        super.init()
        setupAudioSession()
    }
    
    private func setupAudioSession() {
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            print("Failed to setup audio session: \(error)")
        }
    }
    
    // MARK: - Playback Control
    
    func playTrack(_ track: MeditationTrack) {
        Task {
            do {
                let audioData = try await loadAudioData(for: track)
                
                await MainActor.run {
                    self.currentTrack = track
                    self.playAudioData(audioData)
                }
            } catch {
                print("Error loading audio: \(error)")
            }
        }
    }
    
    func pausePlayback() {
        audioPlayer?.pause()
        isPlaying = false
        stopPlaybackTimer()
    }
    
    func resumePlayback() {
        audioPlayer?.play()
        isPlaying = true
        startPlaybackTimer()
    }
    
    func stopPlayback() {
        audioPlayer?.stop()
        audioPlayer = nil
        isPlaying = false
        currentTrack = nil
        playbackProgress = 0.0
        currentTime = 0.0
        duration = 0.0
        stopPlaybackTimer()
    }
    
    func seekTo(_ time: TimeInterval) {
        audioPlayer?.currentTime = time
        currentTime = time
        updateProgress()
    }
    
    // MARK: - Private Methods
    
    private func loadAudioData(for track: MeditationTrack) async throws -> Data {
        // First try to load from bundle
        if let bundleURL = Bundle.main.url(forResource: track.fileName, withExtension: "mp3") {
            return try Data(contentsOf: bundleURL)
        }
        
        // If not in bundle, try to load from network
        return try await loadAudioFromNetwork(for: track)
    }
    
    private func loadAudioFromNetwork(for track: MeditationTrack) async throws -> Data {
        let networkManager = NetworkManager.shared
        let audioResponse = try await networkManager.getMeditationAudio(type: track.type)
        
        guard let url = URL(string: audioResponse.signedUrl) else {
            throw AudioError.invalidURL
        }
        
        let (data, _) = try await URLSession.shared.data(from: url)
        return data
    }
    
    private func playAudioData(_ data: Data) {
        do {
            audioPlayer = try AVAudioPlayer(data: data)
            audioPlayer?.delegate = self
            audioPlayer?.prepareToPlay()
            
            duration = audioPlayer?.duration ?? 0.0
            audioPlayer?.play()
            isPlaying = true
            
            startPlaybackTimer()
        } catch {
            print("Error playing audio: \(error)")
        }
    }
    
    private func startPlaybackTimer() {
        playbackTimer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { _ in
            self.updatePlaybackProgress()
        }
    }
    
    private func stopPlaybackTimer() {
        playbackTimer?.invalidate()
        playbackTimer = nil
    }
    
    private func updatePlaybackProgress() {
        guard let player = audioPlayer else { return }
        
        currentTime = player.currentTime
        updateProgress()
    }
    
    private func updateProgress() {
        guard duration > 0 else { return }
        playbackProgress = currentTime / duration
    }
}

// MARK: - AVAudioPlayerDelegate

extension AudioManager: AVAudioPlayerDelegate {
    func audioPlayerDidFinishPlaying(_ player: AVAudioPlayer, successfully flag: Bool) {
        DispatchQueue.main.async {
            self.isPlaying = false
            self.playbackProgress = 1.0
            self.currentTime = self.duration
            self.stopPlaybackTimer()
        }
    }
    
    func audioPlayerDecodeErrorDidOccur(_ player: AVAudioPlayer, error: Error?) {
        print("Audio decode error: \(error?.localizedDescription ?? "Unknown error")")
        DispatchQueue.main.async {
            self.isPlaying = false
            self.stopPlaybackTimer()
        }
    }
}

// MARK: - Data Models

struct MeditationTrack: Identifiable, Codable {
    let id: String
    let title: String
    let description: String
    let type: String
    let fileName: String
    let duration: Int // in seconds
    let category: MeditationCategory
    let isPremium: Bool
}

enum MeditationCategory: String, CaseIterable, Codable {
    case sunrise = "sunrise"
    case sunset = "sunset"
    case goldenHour = "golden_hour"
    case solarFlare = "solar_flare"
    case cosmic = "cosmic"
    case chakra = "chakra"
    case breathing = "breathing"
    case visualization = "visualization"
    
    var displayName: String {
        switch self {
        case .sunrise:
            return "Sunrise Meditation"
        case .sunset:
            return "Sunset Meditation"
        case .goldenHour:
            return "Golden Hour"
        case .solarFlare:
            return "Solar Flare"
        case .cosmic:
            return "Cosmic Meditation"
        case .chakra:
            return "Chakra Alignment"
        case .breathing:
            return "Breathing Exercise"
        case .visualization:
            return "Solar Visualization"
        }
    }
    
    var icon: String {
        switch self {
        case .sunrise:
            return "sunrise"
        case .sunset:
            return "sunset"
        case .goldenHour:
            return "sun.max"
        case .solarFlare:
            return "flame"
        case .cosmic:
            return "sparkles"
        case .chakra:
            return "circle.grid.cross"
        case .breathing:
            return "wind"
        case .visualization:
            return "eye"
        }
    }
}

enum AudioError: Error {
    case invalidURL
    case networkError
    case fileNotFound
}

// MARK: - Sample Data

extension MeditationTrack {
    static let sampleTracks: [MeditationTrack] = [
        MeditationTrack(
            id: "1",
            title: "Celestial Turiya",
            description: "A deep meditation for sunrise practice",
            type: "sunrise",
            fileName: "Celestial Turiya",
            duration: 600,
            category: .sunrise,
            isPremium: false
        ),
        MeditationTrack(
            id: "2",
            title: "Mahavakya Gold",
            description: "Sacred mantras for solar consciousness",
            type: "golden_hour",
            fileName: "Mahavakya Gold  2",
            duration: 900,
            category: .goldenHour,
            isPremium: true
        ),
        MeditationTrack(
            id: "3",
            title: "Solar Flare Activation",
            description: "High-energy meditation for solar flares",
            type: "solar_flare",
            fileName: "solar_flare_activation",
            duration: 300,
            category: .solarFlare,
            isPremium: true
        ),
        MeditationTrack(
            id: "4",
            title: "Cosmic Alignment",
            description: "Connect with universal solar energy",
            type: "cosmic",
            fileName: "cosmic_alignment",
            duration: 1200,
            category: .cosmic,
            isPremium: true
        )
    ]
}
