// MeditationPlayer.swift
import SwiftUI

struct MeditationPlayer: View {
    @StateObject private var audioManager = AudioManager.shared
    @State private var selectedCategory: MeditationCategory = .sunrise
    @State private var tracks: [MeditationTrack] = []
    @State private var isLoading = false
    @State private var showPlayer = false
    
    var body: some View {
        VStack(spacing: 20) {
            // Header
            VStack(spacing: 15) {
                Image(systemName: "music.note")
                    .font(.system(size: 50))
                    .foregroundColor(.orange)
                
                Text("Meditation Audio")
                    .font(.title2)
                    .fontWeight(.bold)
                
                Text("Enhance your solar practice with guided meditations")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            .padding(.top)
            
            // Category Selector
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 12) {
                    ForEach(MeditationCategory.allCases, id: \.self) { category in
                        CategoryButton(
                            category: category,
                            isSelected: selectedCategory == category
                        ) {
                            selectedCategory = category
                            loadTracksForCategory()
                        }
                    }
                }
                .padding(.horizontal)
            }
            
            // Tracks List
            if isLoading {
                ProgressView("Loading tracks...")
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
            } else {
                ScrollView {
                    LazyVStack(spacing: 12) {
                        ForEach(tracks) { track in
                            TrackRow(track: track) {
                                audioManager.playTrack(track)
                                showPlayer = true
                            }
                        }
                    }
                    .padding(.horizontal)
                }
            }
            
            Spacer()
        }
        .navigationTitle("Meditation")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            loadTracksForCategory()
        }
        .sheet(isPresented: $showPlayer) {
            if let currentTrack = audioManager.currentTrack {
                PlayerView(track: currentTrack)
            }
        }
    }
    
    private func loadTracksForCategory() {
        isLoading = true
        
        // Filter tracks by category
        tracks = MeditationTrack.sampleTracks.filter { $0.category == selectedCategory }
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            isLoading = false
        }
    }
}

struct CategoryButton: View {
    let category: MeditationCategory
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 8) {
                Image(systemName: category.icon)
                    .font(.title2)
                    .foregroundColor(isSelected ? .white : .orange)
                
                Text(category.displayName)
                    .font(.caption)
                    .fontWeight(.medium)
                    .foregroundColor(isSelected ? .white : .primary)
                    .multilineTextAlignment(.center)
            }
            .frame(width: 80, height: 80)
            .background(isSelected ? Color.orange : Color.orange.opacity(0.1))
            .cornerRadius(12)
        }
        .hapticFeedback(.selection)
    }
}

struct TrackRow: View {
    let track: MeditationTrack
    let onPlay: () -> Void
    
    var body: some View {
        HStack(spacing: 15) {
            // Track Icon
            Image(systemName: track.category.icon)
                .font(.title2)
                .foregroundColor(.orange)
                .frame(width: 40, height: 40)
                .background(Color.orange.opacity(0.1))
                .cornerRadius(8)
            
            // Track Info
            VStack(alignment: .leading, spacing: 4) {
                Text(track.title)
                    .font(.headline)
                    .foregroundColor(.primary)
                
                Text(track.description)
                    .font(.caption)
                    .foregroundColor(.secondary)
                    .lineLimit(2)
                
                HStack {
                    Text("\(track.duration / 60) min")
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    if track.isPremium {
                        Text("Premium")
                            .font(.caption)
                            .fontWeight(.semibold)
                            .foregroundColor(.orange)
                            .padding(.horizontal, 6)
                            .padding(.vertical, 2)
                            .background(Color.orange.opacity(0.1))
                            .cornerRadius(4)
                    }
                }
            }
            
            Spacer()
            
            // Play Button
            Button(action: onPlay) {
                Image(systemName: "play.circle.fill")
                    .font(.title2)
                    .foregroundColor(.orange)
            }
            .hapticFeedback(.buttonPress)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

struct PlayerView: View {
    let track: MeditationTrack
    @StateObject private var audioManager = AudioManager.shared
    @Environment(\.dismiss) private var dismiss
    @State private var isDragging = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 30) {
                // Track Artwork
                Image(systemName: track.category.icon)
                    .font(.system(size: 120))
                    .foregroundColor(.orange)
                    .frame(width: 200, height: 200)
                    .background(Color.orange.opacity(0.1))
                    .cornerRadius(20)
                
                // Track Info
                VStack(spacing: 8) {
                    Text(track.title)
                        .font(.title2)
                        .fontWeight(.bold)
                        .multilineTextAlignment(.center)
                    
                    Text(track.description)
                        .font(.body)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                
                // Progress Bar
                VStack(spacing: 10) {
                    Slider(
                        value: Binding(
                            get: { audioManager.currentTime },
                            set: { audioManager.seekTo($0) }
                        ),
                        in: 0...audioManager.duration,
                        onEditingChanged: { editing in
                            isDragging = editing
                        }
                    )
                    .accentColor(.orange)
                    
                    HStack {
                        Text(timeString(audioManager.currentTime))
                            .font(.caption)
                            .foregroundColor(.secondary)
                        
                        Spacer()
                        
                        Text(timeString(audioManager.duration))
                            .font(.caption)
                            .foregroundColor(.secondary)
                    }
                }
                .padding(.horizontal)
                
                // Control Buttons
                HStack(spacing: 40) {
                    Button(action: {
                        audioManager.seekTo(max(0, audioManager.currentTime - 30))
                    }) {
                        Image(systemName: "gobackward.30")
                            .font(.title2)
                            .foregroundColor(.orange)
                    }
                    .hapticFeedback(.buttonPress)
                    
                    Button(action: {
                        if audioManager.isPlaying {
                            audioManager.pausePlayback()
                        } else {
                            audioManager.resumePlayback()
                        }
                    }) {
                        Image(systemName: audioManager.isPlaying ? "pause.circle.fill" : "play.circle.fill")
                            .font(.system(size: 60))
                            .foregroundColor(.orange)
                    }
                    .hapticFeedback(.buttonPress)
                    
                    Button(action: {
                        audioManager.seekTo(min(audioManager.duration, audioManager.currentTime + 30))
                    }) {
                        Image(systemName: "goforward.30")
                            .font(.title2)
                            .foregroundColor(.orange)
                    }
                    .hapticFeedback(.buttonPress)
                }
                
                Spacer()
            }
            .padding()
            .navigationTitle("Now Playing")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
        .onAppear {
            if audioManager.currentTrack?.id != track.id {
                audioManager.playTrack(track)
            }
        }
    }
    
    private func timeString(_ time: TimeInterval) -> String {
        let minutes = Int(time) / 60
        let seconds = Int(time) % 60
        return String(format: "%d:%02d", minutes, seconds)
    }
}
