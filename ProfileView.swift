// ProfileView.swift
import SwiftUI

struct ProfileView: View {
    @StateObject private var networkManager = NetworkManager.shared
    @State private var user: User?
    @State private var userProgress: UserProgress?
    @State private var isLoading = false
    @State private var showSettings = false
    @State private var showSubscription = false
    @State private var isAuthenticated = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 30) {
                    if isLoading {
                        ProgressView("Loading profile...")
                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                    } else if let user = user {
                        // Profile Header
                        ProfileHeader(user: user)
                        
                        // Progress Overview
                        if let progress = userProgress {
                            ProgressOverview(progress: progress)
                        }
                        
                        // Quick Stats
                        QuickStatsView(progress: userProgress)
                        
                        // Action Buttons
                        ActionButtonsView(
                            showSettings: $showSettings,
                            showSubscription: $showSubscription
                        )
                        
                        // App Info
                        AppInfoView()
                        
                    } else {
                        // Not authenticated
                        NotAuthenticatedView()
                    }
                }
                .padding()
            }
            .navigationTitle("Profile")
            .sheet(isPresented: $showSettings) {
                SettingsView()
            }
            .sheet(isPresented: $showSubscription) {
                SubscriptionView()
            }
            .onAppear {
                loadUserData()
            }
        }
    }
    
    private func loadUserData() {
        isLoading = true
        
        Task {
            do {
                // Check authentication status
                let token = UserDefaults.standard.string(forKey: "authToken")
                isAuthenticated = token != nil && token != "guest"
                
                if isAuthenticated {
                    // Load user progress
                    let progress = try await networkManager.getUserProgress()
                    
                    await MainActor.run {
                        // Create a mock user for now - you'd get this from your API
                        user = User(
                            id: UserDefaults.standard.string(forKey: "userId") ?? "unknown",
                            email: "user@example.com",
                            name: "Solar Practitioner",
                            subscriptionTier: "premium"
                        )
                        userProgress = progress
                        isLoading = false
                    }
                } else {
                    await MainActor.run {
                        isLoading = false
                    }
                }
            } catch {
                await MainActor.run {
                    isLoading = false
                    print("Error loading user data: \(error)")
                }
            }
        }
    }
}

struct ProfileHeader: View {
    let user: User
    
    var body: some View {
        VStack(spacing: 20) {
            // Avatar
            Circle()
                .fill(Color.orange.opacity(0.2))
                .frame(width: 100, height: 100)
                .overlay(
                    Image(systemName: "person.fill")
                        .font(.system(size: 40))
                        .foregroundColor(.orange)
                )
            
            // User Info
            VStack(spacing: 8) {
                Text(user.name ?? "Solar Practitioner")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                Text(user.email)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                if let tier = user.subscriptionTier {
                    Text(tier.capitalized)
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.white)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 6)
                        .background(Color.orange)
                        .cornerRadius(12)
                }
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }
}

struct ProgressOverview: View {
    let progress: UserProgress
    
    var body: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("Your Solar Journey")
                .font(.headline)
            
            VStack(spacing: 12) {
                ProgressRow(
                    icon: "chart.line.uptrend.xyaxis",
                    title: "Current Level",
                    value: "\(progress.currentLevel)",
                    color: .orange
                )
                
                ProgressRow(
                    icon: "clock",
                    title: "Total Practice Time",
                    value: "\(progress.totalGazingTime) min",
                    color: .blue
                )
                
                ProgressRow(
                    icon: "checkmark.circle",
                    title: "Rituals Completed",
                    value: "\(progress.completedRituals.count)",
                    color: .green
                )
                
                ProgressRow(
                    icon: "sparkles",
                    title: "Features Unlocked",
                    value: "\(progress.unlockedFeatures.count)",
                    color: .purple
                )
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }
}

struct ProgressRow: View {
    let icon: String
    let title: String
    let value: String
    let color: Color
    
    var body: some View {
        HStack {
            Image(systemName: icon)
                .foregroundColor(color)
                .frame(width: 24)
            
            Text(title)
                .font(.body)
            
            Spacer()
            
            Text(value)
                .font(.body)
                .fontWeight(.semibold)
                .foregroundColor(color)
        }
    }
}

struct QuickStatsView: View {
    let progress: UserProgress?
    
    var body: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("This Week")
                .font(.headline)
            
            HStack(spacing: 20) {
                StatCard(
                    title: "Sessions",
                    value: "7",
                    icon: "sun.max",
                    color: .orange
                )
                
                StatCard(
                    title: "Minutes",
                    value: "105",
                    icon: "timer",
                    color: .blue
                )
                
                StatCard(
                    title: "Streak",
                    value: "5 days",
                    icon: "flame",
                    color: .red
                )
            }
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }
}

struct StatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.title2)
                .foregroundColor(color)
            
            Text(value)
                .font(.title3)
                .fontWeight(.bold)
                .foregroundColor(.primary)
            
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
    }
}

struct ActionButtonsView: View {
    @Binding var showSettings: Bool
    @Binding var showSubscription: Bool
    
    var body: some View {
        VStack(spacing: 12) {
            Button(action: { showSubscription = true }) {
                HStack {
                    Image(systemName: "crown.fill")
                    Text("Manage Subscription")
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.orange)
                .foregroundColor(.white)
                .cornerRadius(12)
            }
            
            Button(action: { showSettings = true }) {
                HStack {
                    Image(systemName: "gearshape.fill")
                    Text("Settings")
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color(.systemGray5))
                .foregroundColor(.primary)
                .cornerRadius(12)
            }
            
            Button(action: signOut) {
                HStack {
                    Image(systemName: "arrow.right.square")
                    Text("Sign Out")
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.red.opacity(0.1))
                .foregroundColor(.red)
                .cornerRadius(12)
            }
        }
    }
    
    private func signOut() {
        UserDefaults.standard.removeObject(forKey: "authToken")
        UserDefaults.standard.removeObject(forKey: "userId")
        UserDefaults.standard.removeObject(forKey: "hasCompletedOnboarding")
        
        // This would trigger a refresh of the main app state
        // You might want to use a notification or environment object for this
    }
}

struct NotAuthenticatedView: View {
    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "person.circle")
                .font(.system(size: 80))
                .foregroundColor(.orange.opacity(0.6))
            
            VStack(spacing: 15) {
                Text("Welcome to SUNGAZE")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                Text("Sign in to track your solar journey, save your progress, and unlock personalized features.")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }
            
            Button(action: {}) {
                Text("Sign In")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding(.horizontal, 30)
                    .padding(.vertical, 15)
                    .background(Color.orange)
                    .cornerRadius(25)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
}

struct AppInfoView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 15) {
            Text("About SUNGAZE")
                .font(.headline)
            
            VStack(alignment: .leading, spacing: 8) {
                InfoRow(title: "Version", value: "1.0.0")
                InfoRow(title: "Build", value: "1")
                InfoRow(title: "Last Updated", value: "Today")
            }
            
            Text("SUNGAZE combines ancient solar wisdom with modern science to help you safely connect with the healing power of sunlight.")
                .font(.caption)
                .foregroundColor(.secondary)
                .padding(.top, 8)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }
}

struct InfoRow: View {
    let title: String
    let value: String
    
    var body: some View {
        HStack {
            Text(title)
                .font(.caption)
                .foregroundColor(.secondary)
            
            Spacer()
            
            Text(value)
                .font(.caption)
                .fontWeight(.medium)
        }
    }
}

// Placeholder views for sheets
struct SettingsView: View {
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        NavigationView {
            VStack {
                Text("Settings")
                    .font(.title)
                
                Text("Settings functionality will be implemented here")
                    .foregroundColor(.secondary)
                
                Spacer()
            }
            .padding()
            .navigationTitle("Settings")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}

struct SubscriptionView: View {
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        NavigationView {
            VStack {
                Text("Subscription")
                    .font(.title)
                
                Text("Subscription management will be implemented here")
                    .foregroundColor(.secondary)
                
                Spacer()
            }
            .padding()
            .navigationTitle("Subscription")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Done") {
                        dismiss()
                    }
                }
            }
        }
    }
}