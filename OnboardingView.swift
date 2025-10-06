// OnboardingView.swift
import SwiftUI

struct OnboardingView: View {
    @State private var currentStep = 0
    @State private var answers: [String] = []
    @State private var showPaywall = false
    @Environment(\.dismiss) private var dismiss
    
    let questions = [
        "What draws you to the revolutionary intersection of ancient solar wisdom and modern light science?",
        "How would you describe your current relationship with sunlight?",
        "What are your primary goals with solar practice?",
        "How much time can you dedicate to solar practice daily?",
        "What's your experience level with meditation and mindfulness?",
        "How important is scientific validation in your spiritual practice?",
        "What concerns do you have about solar gazing?",
        "How do you prefer to learn new practices?",
        "What would success look like for you in this journey?"
    ]
    
    let options = [
        [
            "I'm fascinated by how ancient practices align with cutting-edge photobiology",
            "I want to safely learn HRM's methods with proper scientific guidance",
            "I'm seeking both spiritual growth and measurable health optimization",
            "I'm interested in the documented cases of people living on light alone",
            "I want to enhance my consciousness while improving my biology"
        ],
        [
            "I avoid direct sunlight due to health concerns",
            "I enjoy sunlight but don't actively practice with it",
            "I have some experience with sunbathing and light therapy",
            "I'm already practicing some form of solar meditation",
            "I'm deeply committed to solar-based spiritual practices"
        ],
        [
            "Physical health and energy optimization",
            "Spiritual awakening and consciousness expansion",
            "Mental clarity and focus improvement",
            "Emotional healing and balance",
            "All of the above - holistic transformation"
        ],
        [
            "5-10 minutes",
            "15-20 minutes",
            "30-45 minutes",
            "1 hour or more",
            "I'm flexible and can adapt"
        ],
        [
            "Complete beginner",
            "Some experience with basic meditation",
            "Regular meditation practitioner",
            "Advanced practitioner",
            "Teacher or guide level"
        ],
        [
            "Essential - I need scientific backing",
            "Important but not the only factor",
            "Somewhat important",
            "Not very important",
            "Not important at all"
        ],
        [
            "Eye damage and safety",
            "Skin damage from UV exposure",
            "Not knowing proper techniques",
            "Lack of guidance or support",
            "I don't have major concerns"
        ],
        [
            "Step-by-step guided instructions",
            "Video demonstrations and tutorials",
            "Reading materials and research",
            "Community support and sharing",
            "Personalized coaching and feedback"
        ],
        [
            "Increased energy and vitality",
            "Deeper spiritual connection",
            "Better mental and emotional health",
            "Reduced dependence on food",
            "Complete transformation of consciousness"
        ]
    ]
    
    var body: some View {
        VStack(spacing: 0) {
            // Progress Bar
            ProgressView(value: Double(currentStep), total: Double(questions.count))
                .progressViewStyle(LinearProgressViewStyle(tint: .orange))
                .padding()
            
            // Question Content
            VStack(spacing: 30) {
                // Question Number
                Text("Question \(currentStep + 1) of \(questions.count)")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                
                // Question
                Text(questions[currentStep])
                    .font(.title2)
                    .fontWeight(.semibold)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
                
                // Options
                VStack(spacing: 12) {
                    ForEach(Array(options[currentStep].enumerated()), id: \.offset) { index, option in
                        Button(action: {
                            selectOption(at: index)
                        }) {
                            HStack {
                                Text(option)
                                    .font(.body)
                                    .multilineTextAlignment(.leading)
                                    .foregroundColor(.primary)
                                
                                Spacer()
                                
                                if answers.count > currentStep && answers[currentStep] == option {
                                    Image(systemName: "checkmark.circle.fill")
                                        .foregroundColor(.orange)
                                }
                            }
                            .padding()
                            .background(
                                answers.count > currentStep && answers[currentStep] == option
                                    ? Color.orange.opacity(0.1)
                                    : Color(.systemGray6)
                            )
                            .cornerRadius(12)
                        }
                    }
                }
                .padding(.horizontal)
                
                Spacer()
                
                // Navigation Buttons
                HStack {
                    if currentStep > 0 {
                        Button("Previous") {
                            withAnimation {
                                currentStep -= 1
                            }
                        }
                        .foregroundColor(.orange)
                    }
                    
                    Spacer()
                    
                    if currentStep < questions.count - 1 {
                        Button("Next") {
                            withAnimation {
                                currentStep += 1
                            }
                        }
                        .disabled(answers.count <= currentStep)
                        .foregroundColor(.orange)
                    } else {
                        Button("Complete") {
                            completeOnboarding()
                        }
                        .disabled(answers.count <= currentStep)
                        .foregroundColor(.white)
                        .padding(.horizontal, 30)
                        .padding(.vertical, 12)
                        .background(Color.orange)
                        .cornerRadius(25)
                    }
                }
                .padding(.horizontal)
                .padding(.bottom, 30)
            }
        }
        .navigationBarHidden(true)
        .sheet(isPresented: $showPaywall) {
            PaywallView()
        }
    }
    
    private func selectOption(at index: Int) {
        let selectedOption = options[currentStep][index]
        
        // Ensure answers array is long enough
        while answers.count <= currentStep {
            answers.append("")
        }
        
        answers[currentStep] = selectedOption
        
        // Auto-advance after selection
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            if currentStep < questions.count - 1 {
                withAnimation {
                    currentStep += 1
                }
            }
        }
    }
    
    private func completeOnboarding() {
        // Save onboarding completion
        UserDefaults.standard.set(true, forKey: "hasCompletedOnboarding")
        
        // Send answers to your Vercel backend
        Task {
            do {
                // This would be a custom API endpoint to save onboarding responses
                print("Saving onboarding responses...")
            } catch {
                print("Error saving onboarding: \(error)")
            }
        }
        
        // Show paywall or dismiss
        showPaywall = true
    }
}

struct PaywallView: View {
    @Environment(\.dismiss) private var dismiss
    @StateObject private var networkManager = NetworkManager.shared
    @State private var isLoading = false
    
    var body: some View {
        NavigationView {
            VStack(spacing: 30) {
                VStack(spacing: 20) {
                    Image(systemName: "crown.fill")
                        .font(.system(size: 60))
                        .foregroundColor(.orange)
                    
                    Text("Unlock Your Solar Journey")
                        .font(.title)
                        .fontWeight(.bold)
                    
                    Text("Get personalized guidance, advanced features, and deeper solar wisdom")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                }
                .padding(.top, 40)
                
                VStack(spacing: 15) {
                    FeatureRow(icon: "sparkles", title: "Personalized Solar Plan", description: "Customized based on your responses")
                    FeatureRow(icon: "chart.line.uptrend.xyaxis", title: "Progress Tracking", description: "Detailed analytics and insights")
                    FeatureRow(icon: "music.note", title: "Premium Audio", description: "Exclusive meditation tracks")
                    FeatureRow(icon: "book", title: "Solar Library", description: "Access to ancient wisdom texts")
                    FeatureRow(icon: "questionmark.circle", title: "Advanced Oracle", description: "Deeper insights and guidance")
                }
                .padding(.horizontal)
                
                VStack(spacing: 15) {
                    Button(action: subscribeToPremium) {
                        HStack {
                            if isLoading {
                                ProgressView()
                                    .scaleEffect(0.8)
                            }
                            Text(isLoading ? "Processing..." : "Start Premium - $9.99/month")
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.orange)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                    }
                    .disabled(isLoading)
                    
                    Button(action: continueFree) {
                        Text("Continue with Free Version")
                            .foregroundColor(.secondary)
                    }
                }
                .padding(.horizontal)
                
                Spacer()
            }
            .navigationTitle("Premium")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Skip") {
                        dismiss()
                    }
                }
            }
        }
    }
    
    private func subscribeToPremium() {
        isLoading = true
        
        Task {
            do {
                let response = try await networkManager.createCheckoutSession(priceId: "premium_monthly")
                
                // Open Stripe checkout
                if let url = URL(string: response.url) {
                    await MainActor.run {
                        UIApplication.shared.open(url)
                    }
                }
                
                await MainActor.run {
                    isLoading = false
                    dismiss()
                }
            } catch {
                await MainActor.run {
                    isLoading = false
                    // Handle error
                }
            }
        }
    }
    
    private func continueFree() {
        dismiss()
    }
}

