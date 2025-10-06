// ContentView.swift
import SwiftUI

struct ContentView: View {
    @StateObject private var networkManager = NetworkManager.shared
    @State private var isAuthenticated = false
    @State private var showOnboarding = false
    @State private var currentView: AppView = .main
    
    var body: some View {
        Group {
            if !isAuthenticated {
                AuthenticationView()
            } else if showOnboarding {
                OnboardingView()
            } else {
                MainAppView(currentView: $currentView)
            }
        }
        .onAppear {
            checkAuthenticationStatus()
        }
    }
    
    private func checkAuthenticationStatus() {
        // Check if user is already authenticated
        let token = UserDefaults.standard.string(forKey: "authToken")
        isAuthenticated = token != nil
        
        // Check if onboarding is needed
        let hasCompletedOnboarding = UserDefaults.standard.bool(forKey: "hasCompletedOnboarding")
        showOnboarding = !hasCompletedOnboarding && isAuthenticated
    }
}

enum AppView {
    case main
    case timer
    case meditation
    case journal
    case oracle
    case profile
}

struct MainAppView: View {
    @Binding var currentView: AppView
    @StateObject private var networkManager = NetworkManager.shared
    @StateObject private var locationManager = LocationManager()
    @State private var solarData: SolarData?
    @State private var userProgress: UserProgress?
    @State private var showLocationPermission = false
    
    var body: some View {
        TabView(selection: $currentView) {
            HomeView(solarData: solarData, userProgress: userProgress)
                .tabItem {
                    Image(systemName: "sun.max")
                    Text("Home")
                }
                .tag(AppView.main)
            
            TimerView()
                .tabItem {
                    Image(systemName: "timer")
                    Text("Timer")
                }
                .tag(AppView.timer)
            
            MeditationPlayer()
                .tabItem {
                    Image(systemName: "music.note")
                    Text("Meditation")
                }
                .tag(AppView.meditation)
            
            JournalView()
                .tabItem {
                    Image(systemName: "book")
                    Text("Journal")
                }
                .tag(AppView.journal)
            
            OracleView()
                .tabItem {
                    Image(systemName: "sparkles")
                    Text("Oracle")
                }
                .tag(AppView.oracle)
            
            ProfileView()
                .tabItem {
                    Image(systemName: "person")
                    Text("Profile")
                }
                .tag(AppView.profile)
        }
        .onAppear {
            loadInitialData()
        }
        .sheet(isPresented: $showLocationPermission) {
            LocationPermissionModal(isPresented: $showLocationPermission) {
                locationManager.requestLocationPermission()
            }
        }
    }
    
    private func loadInitialData() {
        Task {
            do {
                // Load user progress
                userProgress = try await networkManager.getUserProgress()
                
                // Check location permission and load solar data
                if locationManager.hasLocationPermission {
                    if let coordinates = locationManager.coordinates {
                        solarData = try await networkManager.getSolarData(
                            latitude: coordinates.latitude,
                            longitude: coordinates.longitude
                        )
                    } else {
                        // Request location if we have permission but no coordinates yet
                        locationManager.startLocationUpdates()
                    }
                } else {
                    // Show location permission modal
                    await MainActor.run {
                        showLocationPermission = true
                    }
                }
            } catch {
                print("Error loading data: \(error)")
            }
        }
    }
}

