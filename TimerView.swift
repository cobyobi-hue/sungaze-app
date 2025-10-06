// TimerView.swift
import SwiftUI
import AVFoundation

struct TimerView: View {
    @StateObject private var networkManager = NetworkManager.shared
    @State private var isTimerRunning = false
    @State private var timeRemaining = 0
    @State private var selectedDuration = 10 // minutes
    @State private var timer: Timer?
    @State private var audioPlayer: AVAudioPlayer?
    @State private var showCompletionAlert = false
    
    let durations = [5, 10, 15, 20, 30, 45, 60]
    
    var body: some View {
        NavigationView {
            VStack(spacing: 30) {
                // Timer Display
                ZStack {
                    Circle()
                        .stroke(Color.orange.opacity(0.3), lineWidth: 20)
                        .frame(width: 250, height: 250)
                    
                    Circle()
                        .trim(from: 0, to: progress)
                        .stroke(Color.orange, style: StrokeStyle(lineWidth: 20, lineCap: .round))
                        .frame(width: 250, height: 250)
                        .rotationEffect(.degrees(-90))
                        .animation(.easeInOut(duration: 1), value: progress)
                    
                    VStack {
                        Text(timeString)
                            .font(.system(size: 48, weight: .bold, design: .monospaced))
                            .foregroundColor(.primary)
                        
                        Text(isTimerRunning ? "Gazing" : "Ready")
                            .font(.headline)
                            .foregroundColor(.secondary)
                    }
                }
                
                // Duration Selector
                if !isTimerRunning {
                    VStack {
                        Text("Select Duration")
                            .font(.headline)
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 15) {
                                ForEach(durations, id: \.self) { duration in
                                    Button(action: {
                                        selectedDuration = duration
                                        timeRemaining = duration * 60
                                    }) {
                                        Text("\(duration)m")
                                            .font(.headline)
                                            .foregroundColor(selectedDuration == duration ? .white : .orange)
                                            .padding(.horizontal, 20)
                                            .padding(.vertical, 10)
                                            .background(selectedDuration == duration ? Color.orange : Color.orange.opacity(0.2))
                                            .cornerRadius(20)
                                    }
                                }
                            }
                            .padding(.horizontal)
                        }
                    }
                }
                
                // Control Buttons
                HStack(spacing: 30) {
                    if isTimerRunning {
                        Button(action: pauseTimer) {
                            Image(systemName: "pause.fill")
                                .font(.title)
                                .foregroundColor(.orange)
                        }
                        
                        Button(action: stopTimer) {
                            Image(systemName: "stop.fill")
                                .font(.title)
                                .foregroundColor(.red)
                        }
                    } else {
                        Button(action: startTimer) {
                            HStack {
                                Image(systemName: "play.fill")
                                Text("Start Session")
                            }
                            .font(.headline)
                            .foregroundColor(.white)
                            .padding(.horizontal, 30)
                            .padding(.vertical, 15)
                            .background(Color.orange)
                            .cornerRadius(25)
                        }
                        .disabled(timeRemaining == 0)
                        .hapticFeedback(.buttonPress)
                    }
                }
                
                // Safety Reminders
                VStack(alignment: .leading, spacing: 8) {
                    Text("Safety Reminders:")
                        .font(.headline)
                    
                    Text("• Never look directly at the sun")
                    Text("• Use proper eye protection")
                    Text("• Start with short sessions")
                    Text("• Stop if you feel discomfort")
                }
                .font(.caption)
                .foregroundColor(.secondary)
                .padding()
                .background(Color(.systemGray6))
                .cornerRadius(12)
                .padding(.horizontal)
                
                Spacer()
            }
            .padding()
            .navigationTitle("Sungazing Timer")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        // Dismiss timer
                    }
                }
            }
        }
        .alert("Session Complete!", isPresented: $showCompletionAlert) {
            Button("Save Progress") {
                saveSessionProgress()
            }
            Button("Cancel", role: .cancel) {}
        } message: {
            Text("Great job! Your \(selectedDuration)-minute session is complete.")
        }
    }
    
    private var progress: Double {
        guard selectedDuration > 0 else { return 0 }
        return 1.0 - (Double(timeRemaining) / Double(selectedDuration * 60))
    }
    
    private var timeString: String {
        let minutes = timeRemaining / 60
        let seconds = timeRemaining % 60
        return String(format: "%02d:%02d", minutes, seconds)
    }
    
    private func startTimer() {
        isTimerRunning = true
        timeRemaining = selectedDuration * 60
        
        timer = Timer.scheduledTimer(withTimeInterval: 1.0, repeats: true) { _ in
            if timeRemaining > 0 {
                timeRemaining -= 1
            } else {
                completeTimer()
            }
        }
        
        // Play start sound and haptic feedback
        playSound(named: "timer_start")
        HapticManager.shared.timerStart()
    }
    
    private func pauseTimer() {
        isTimerRunning = false
        timer?.invalidate()
        timer = nil
    }
    
    private func stopTimer() {
        isTimerRunning = false
        timer?.invalidate()
        timer = nil
        timeRemaining = selectedDuration * 60
    }
    
    private func completeTimer() {
        isTimerRunning = false
        timer?.invalidate()
        timer = nil
        
        // Play completion sound and haptic feedback
        playSound(named: "timer_complete")
        HapticManager.shared.timerComplete()
        
        // Show completion alert
        showCompletionAlert = true
    }
    
    private func playSound(named: String) {
        guard let url = Bundle.main.url(forResource: named, withExtension: "mp3") else { return }
        
        do {
            audioPlayer = try AVAudioPlayer(contentsOf: url)
            audioPlayer?.play()
        } catch {
            print("Error playing sound: \(error)")
        }
    }
    
    private func saveSessionProgress() {
        Task {
            do {
                // Send progress to your Vercel backend
                // This would be a custom API endpoint you'd create
                print("Saving session progress...")
            } catch {
                print("Error saving progress: \(error)")
            }
        }
    }
}

