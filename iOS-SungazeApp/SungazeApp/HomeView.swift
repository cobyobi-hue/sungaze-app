import SwiftUI

struct HomeView: View {
    @EnvironmentObject var authManager: AuthenticationManager
    @State private var currentTime = Date()
    
    let timer = Timer.publish(every: 1, on: .main, in: .common).autoconnect()
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 30) {
                    // Header with SUNGAZE branding
                    VStack(spacing: 20) {
                        // 44 Circle with animation
                        ZStack {
                            Circle()
                                .fill(
                                    LinearGradient(
                                        gradient: Gradient(colors: [.yellow.opacity(0.3), .orange.opacity(0.3)]),
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .frame(width: 120, height: 120)
                                .blur(radius: 30)
                                .scaleEffect(1.2)
                            
                            Circle()
                                .fill(
                                    LinearGradient(
                                        gradient: Gradient(colors: [.yellow, .orange]),
                                        startPoint: .topLeading,
                                        endPoint: .bottomTrailing
                                    )
                                )
                                .frame(width: 100, height: 100)
                                .overlay(
                                    Text("44")
                                        .font(.largeTitle)
                                        .fontWeight(.bold)
                                        .foregroundColor(.black)
                                )
                                .shadow(color: .yellow.opacity(0.5), radius: 20)
                        }
                        .scaleEffect(1.0)
                        .animation(.easeInOut(duration: 2).repeatForever(autoreverses: true), value: currentTime)
                        
                        Text("SUNGAZE")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                            .foregroundColor(.yellow)
                            .shadow(color: .yellow.opacity(0.5), radius: 10)
                    }
                    
                    // Main content card
                    VStack(spacing: 20) {
                        Text("LIGHT NUTRITION RITUAL")
                            .font(.caption)
                            .fontWeight(.semibold)
                            .foregroundColor(.white)
                            .tracking(2)
                        
                        VStack(spacing: 15) {
                            Text("Transform sunlight into cellular nourishment through ancient gazing meditation.")
                                .font(.body)
                                .fontWeight(.medium)
                                .multilineTextAlignment(.center)
                                .foregroundColor(.white)
                            
                            Text("From 10 seconds to 44 minutes — become a solar being through sacred practice.")
                                .font(.subheadline)
                                .fontStyle(.italic)
                                .multilineTextAlignment(.center)
                                .foregroundColor(.white.opacity(0.9))
                        }
                    }
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 20)
                            .fill(Color.black.opacity(0.4))
                            .background(.ultraThinMaterial)
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 20)
                            .stroke(Color.white.opacity(0.3), lineWidth: 1)
                    )
                    
                    // Solar Status
                    VStack(spacing: 15) {
                        HStack {
                            Image(systemName: "crown.fill")
                                .foregroundColor(.orange)
                            Text("Sacred Access Unlocked")
                                .font(.headline)
                                .fontWeight(.semibold)
                        }
                        
                        Text("First Witness of the Flame")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                        
                        Text("Founder #1/444")
                            .font(.subheadline)
                            .fontWeight(.bold)
                            .foregroundColor(.orange)
                    }
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color.blue.opacity(0.1))
                            .background(.ultraThinMaterial)
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 15)
                            .stroke(Color.blue.opacity(0.2), lineWidth: 1)
                    )
                    
                    // Oracle Section
                    VStack(spacing: 15) {
                        HStack {
                            ZStack {
                                Circle()
                                    .fill(
                                        LinearGradient(
                                            gradient: Gradient(colors: [.purple, .pink]),
                                            startPoint: .topLeading,
                                            endPoint: .bottomTrailing
                                        )
                                    )
                                    .frame(width: 30, height: 30)
                                
                                Text("🔮")
                                    .font(.caption)
                            }
                            
                            Text("Ask the Oracle")
                                .font(.headline)
                                .fontWeight(.medium)
                        }
                        
                        Text("Seek guidance from ancient solar wisdom")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding()
                    .background(
                        RoundedRectangle(cornerRadius: 15)
                            .fill(Color.purple.opacity(0.1))
                            .background(.ultraThinMaterial)
                    )
                    .overlay(
                        RoundedRectangle(cornerRadius: 15)
                            .stroke(Color.purple.opacity(0.2), lineWidth: 1)
                    )
                    
                    Spacer(minLength: 100)
                }
                .padding()
            }
            .background(
                LinearGradient(
                    gradient: Gradient(colors: [.blue.opacity(0.8), .purple.opacity(0.8)]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
            .navigationTitle("SUNGAZE")
            .navigationBarTitleDisplayMode(.inline)
        }
        .onReceive(timer) { _ in
            currentTime = Date()
        }
    }
}

#Preview {
    HomeView()
        .environmentObject(AuthenticationManager())
}
