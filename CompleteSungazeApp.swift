// SungazeApp.swift - Complete App File
import SwiftUI

// MARK: - Data Models
struct SolarData: Codable {
    let sunrise: String
    let sunset: String
    let solarNoon: String
    let goldenHourStart: String
    let goldenHourEnd: String
    let blueHourStart: String
    let blueHourEnd: String
    let civilTwilightBegin: String
    let civilTwilightEnd: String
    let nauticalTwilightBegin: String
    let nauticalTwilightEnd: String
    let astronomicalTwilightBegin: String
    let astronomicalTwilightEnd: String
    let dayLength: String
    let solarElevation: Double
    let solarAzimuth: Double
    let isDaytime: Bool
    let nextSunrise: String
    let nextSunset: String
}

struct UserProgress: Codable {
    let totalSessions: Int
    let totalDuration: Int
    let currentStreak: Int
    let longestStreak: Int
    let level: Int
    let experience: Int
    let badges: [String]
    let achievements: [Achievement]
    let lastSessionDate: String?
    let weeklyGoal: Int
    let weeklyProgress: Int
}

struct Achievement: Codable {
    let id: String
    let title: String
    let description: String
    let icon: String
    let unlockedAt: String?
    let progress: Int
    let maxProgress: Int
}

// MARK: - Network Manager
class NetworkManager: ObservableObject {
    static let shared = NetworkManager()
    private let baseURL = "https://sungaze-app-z3sf.vercel.app"
    
    private init() {}
    
    func getUserProgress() async throws -> UserProgress {
        // Mock data for now
        return UserProgress(
            totalSessions: 5,
            totalDuration: 300,
            currentStreak: 3,
            longestStreak: 7,
            level: 2,
            experience: 150,
            badges: ["First Timer", "Streak Master"],
            achievements: [],
            lastSessionDate: "2025-01-06",
            weeklyGoal: 7,
            weeklyProgress: 3
        )
    }
    
    func getSolarData(latitude: Double, longitude: Double) async throws -> SolarData {
        // Mock data for now
        return SolarData(
            sunrise: "06:30",
            sunset: "18:45",
            solarNoon: "12:37",
            goldenHourStart: "06:00",
            goldenHourEnd: "07:00",
            blueHourStart: "05:30",
            blueHourEnd: "06:00",
            civilTwilightBegin: "06:00",
            civilTwilightEnd: "19:15",
            nauticalTwilightBegin: "05:30",
            nauticalTwilightEnd: "19:45",
            astronomicalTwilightBegin: "05:00",
            astronomicalTwilightEnd: "20:15",
            dayLength: "12:15",
            solarElevation: 45.2,
            solarAzimuth: 180.5,
            isDaytime: true,
            nextSunrise: "06:30",
            nextSunset: "18:45"
        )
    }
}

// MARK: - Location Manager
class LocationManager: ObservableObject {
    @Published var hasLocationPermission = false
    @Published var coordinates: (latitude: Double, longitude: Double)?
    
    init() {
        // Mock location for now
        coordinates = (latitude: 37.7749, longitude: -122.4194) // San Francisco
        hasLocationPermission = true
    }
    
    func requestLocationPermission() {
        hasLocationPermission = true
    }
    
    func startLocationUpdates() {
        // Mock implementation
    }
}

// MARK: - Simple Views
struct HomeView: View {
    let solarData: SolarData?
    let userProgress: UserProgress?
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    Image(systemName: "sun.max.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.orange)
                    
                    Text("SUNGAZE")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundColor(.primary)
                    
                    if let solar = solarData {
                        VStack(spacing: 10) {
                            Text("Sunrise: \(solar.sunrise)")
                            Text("Sunset: \(solar.sunset)")
                            Text("Solar Elevation: \(solar.solarElevation, specifier: "%.1f")°")
                        }
                        .padding()
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(10)
                    }
                    
                    if let progress = userProgress {
                        VStack(spacing: 10) {
                            Text("Sessions: \(progress.totalSessions)")
                            Text("Current Streak: \(progress.currentStreak)")
                            Text("Level: \(progress.level)")
                        }
                        .padding()
                        .background(Color.green.opacity(0.1))
                        .cornerRadius(10)
                    }
                    
                    Button("Start Sungazing") {
                        // Timer action
                    }
                    .font(.title2)
                    .foregroundColor(.white)
                    .padding()
                    .background(Color.orange)
                    .cornerRadius(10)
                }
                .padding()
            }
            .navigationTitle("Home")
        }
    }
}

struct TimerView: View {
    @State private var timeRemaining = 60
    @State private var isRunning = false
    
    var body: some View {
        VStack(spacing: 30) {
            Text("Sungazing Timer")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("\(timeRemaining)")
                .font(.system(size: 80, weight: .bold))
                .foregroundColor(.orange)
            
            Button(isRunning ? "Pause" : "Start") {
                isRunning.toggle()
            }
            .font(.title2)
            .foregroundColor(.white)
            .padding()
            .background(isRunning ? Color.red : Color.green)
            .cornerRadius(10)
        }
        .padding()
    }
}

struct MeditationPlayer: View {
    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "music.note")
                .font(.system(size: 60))
                .foregroundColor(.purple)
            
            Text("Meditation Player")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Coming Soon")
                .font(.title2)
                .foregroundColor(.secondary)
        }
        .padding()
    }
}

struct JournalView: View {
    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "book")
                .font(.system(size: 60))
                .foregroundColor(.blue)
            
            Text("Journal")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Coming Soon")
                .font(.title2)
                .foregroundColor(.secondary)
        }
        .padding()
    }
}

struct OracleView: View {
    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "sparkles")
                .font(.system(size: 60))
                .foregroundColor(.yellow)
            
            Text("Solar Oracle")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Coming Soon")
                .font(.title2)
                .foregroundColor(.secondary)
        }
        .padding()
    }
}

struct ProfileView: View {
    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "person")
                .font(.system(size: 60))
                .foregroundColor(.green)
            
            Text("Profile")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text("Coming Soon")
                .font(.title2)
                .foregroundColor(.secondary)
        }
        .padding()
    }
}

// MARK: - Main App
@main
struct SungazeApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    @StateObject private var networkManager = NetworkManager.shared
    @StateObject private var locationManager = LocationManager()
    @State private var solarData: SolarData?
    @State private var userProgress: UserProgress?
    @State private var currentTab = 0
    
    var body: some View {
        TabView(selection: $currentTab) {
            HomeView(solarData: solarData, userProgress: userProgress)
                .tabItem {
                    Image(systemName: "sun.max")
                    Text("Home")
                }
                .tag(0)
            
            TimerView()
                .tabItem {
                    Image(systemName: "timer")
                    Text("Timer")
                }
                .tag(1)
            
            MeditationPlayer()
                .tabItem {
                    Image(systemName: "music.note")
                    Text("Meditation")
                }
                .tag(2)
            
            JournalView()
                .tabItem {
                    Image(systemName: "book")
                    Text("Journal")
                }
                .tag(3)
            
            OracleView()
                .tabItem {
                    Image(systemName: "sparkles")
                    Text("Oracle")
                }
                .tag(4)
            
            ProfileView()
                .tabItem {
                    Image(systemName: "person")
                    Text("Profile")
                }
                .tag(5)
        }
        .onAppear {
            loadData()
        }
    }
    
    private func loadData() {
        Task {
            do {
                userProgress = try await networkManager.getUserProgress()
                if let coords = locationManager.coordinates {
                    solarData = try await networkManager.getSolarData(
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    )
                }
            } catch {
                print("Error loading data: \(error)")
            }
        }
    }
}
