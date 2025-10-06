// AuthenticationView.swift
import SwiftUI

struct AuthenticationView: View {
    @StateObject private var networkManager = NetworkManager.shared
    @State private var email = ""
    @State private var password = ""
    @State private var isSignUp = false
    @State private var isLoading = false
    @State private var errorMessage = ""
    @State private var showError = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 30) {
                // Logo and Title
                VStack(spacing: 20) {
                    Image(systemName: "sun.max.fill")
                        .font(.system(size: 80))
                        .foregroundColor(.orange)
                    
                    Text("SUNGAZE")
                        .font(.largeTitle)
                        .fontWeight(.bold)
                    
                    Text("Light Nutrition & Solar Wisdom")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding(.top, 50)
                
                // Form
                VStack(spacing: 20) {
                    TextField("Email", text: $email)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                    
                    SecureField("Password", text: $password)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                    
                    Button(action: authenticate) {
                        HStack {
                            if isLoading {
                                ProgressView()
                                    .scaleEffect(0.8)
                            }
                            Text(isSignUp ? "Sign Up" : "Sign In")
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.orange)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                    }
                    .disabled(isLoading || email.isEmpty || password.isEmpty)
                    
                    Button(action: { isSignUp.toggle() }) {
                        Text(isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up")
                            .foregroundColor(.orange)
                    }
                }
                .padding(.horizontal, 30)
                
                // Guest Access
                VStack(spacing: 15) {
                    Text("or")
                        .foregroundColor(.secondary)
                    
                    Button(action: continueAsGuest) {
                        Text("Continue as Guest")
                            .foregroundColor(.secondary)
                    }
                }
                
                Spacer()
            }
            .navigationBarHidden(true)
            .alert("Authentication Error", isPresented: $showError) {
                Button("OK") {}
            } message: {
                Text(errorMessage)
            }
        }
    }
    
    private func authenticate() {
        isLoading = true
        errorMessage = ""
        
        Task {
            do {
                let response = try await networkManager.authenticateUser(email: email, password: password)
                
                // Save auth token
                UserDefaults.standard.set(response.token, forKey: "authToken")
                UserDefaults.standard.set(response.user.id, forKey: "userId")
                
                // Update UI on main thread
                await MainActor.run {
                    isLoading = false
                    // Navigation will be handled by ContentView
                }
            } catch {
                await MainActor.run {
                    isLoading = false
                    errorMessage = "Authentication failed. Please check your credentials."
                    showError = true
                }
            }
        }
    }
    
    private func continueAsGuest() {
        // Set a guest token or flag
        UserDefaults.standard.set("guest", forKey: "authToken")
        UserDefaults.standard.set("guest", forKey: "userId")
    }
}

