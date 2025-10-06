// OracleView.swift
import SwiftUI

struct OracleView: View {
    @StateObject private var networkManager = NetworkManager.shared
    @State private var question = ""
    @State private var isLoading = false
    @State private var oracleResponse: OracleResponse?
    @State private var showResponse = false
    @State private var recentQuestions: [OracleQuestion] = []
    
    let sampleQuestions = [
        "What should I focus on in my solar practice today?",
        "How can I deepen my connection with solar energy?",
        "What does my solar journey reveal about my spiritual path?",
        "How can I integrate solar wisdom into my daily life?",
        "What guidance does the sun offer for my current challenges?"
    ]
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 30) {
                    // Header
                    VStack(spacing: 15) {
                        Image(systemName: "sparkles")
                            .font(.system(size: 60))
                            .foregroundColor(.purple)
                        
                        Text("Solar Oracle")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                        
                        Text("Seek wisdom from the ancient solar consciousness")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .padding(.top)
                    
                    // Question Input
                    VStack(alignment: .leading, spacing: 15) {
                        Text("Ask Your Question")
                            .font(.headline)
                        
                        TextField("What guidance do you seek?", text: $question)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                        
                        // Sample Questions
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Sample Questions:")
                                .font(.subheadline)
                                .foregroundColor(.secondary)
                            
                            ForEach(sampleQuestions, id: \.self) { sampleQuestion in
                                Button(action: {
                                    question = sampleQuestion
                                }) {
                                    HStack {
                                        Text(sampleQuestion)
                                            .font(.caption)
                                            .foregroundColor(.primary)
                                            .multilineTextAlignment(.leading)
                                        
                                        Spacer()
                                        
                                        Image(systemName: "arrow.up.left")
                                            .font(.caption)
                                            .foregroundColor(.purple)
                                    }
                                    .padding(.horizontal, 12)
                                    .padding(.vertical, 8)
                                    .background(Color.purple.opacity(0.1))
                                    .cornerRadius(8)
                                }
                            }
                        }
                    }
                    .padding(.horizontal)
                    
                    // Ask Button
                    Button(action: askOracle) {
                        HStack {
                            if isLoading {
                                ProgressView()
                                    .scaleEffect(0.8)
                            }
                            Text(isLoading ? "Consulting Oracle..." : "Ask the Oracle")
                        }
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.purple)
                        .foregroundColor(.white)
                        .cornerRadius(12)
                    }
                    .disabled(isLoading || question.isEmpty)
                    .hapticFeedback(.oracleResponse)
                    .padding(.horizontal)
                    
                    // Recent Questions
                    if !recentQuestions.isEmpty {
                        VStack(alignment: .leading, spacing: 15) {
                            Text("Recent Questions")
                                .font(.headline)
                                .padding(.horizontal)
                            
                            ForEach(recentQuestions.prefix(3)) { oracleQuestion in
                                RecentQuestionRow(question: oracleQuestion) {
                                    question = oracleQuestion.question
                                    oracleResponse = oracleQuestion.response
                                    showResponse = true
                                }
                            }
                        }
                    }
                    
                    Spacer()
                }
            }
            .navigationTitle("Oracle")
            .navigationBarTitleDisplayMode(.inline)
            .sheet(isPresented: $showResponse) {
                OracleResponseView(response: oracleResponse, question: question)
            }
            .onAppear {
                loadRecentQuestions()
            }
        }
    }
    
    private func askOracle() {
        isLoading = true
        
        Task {
            do {
                let response = try await networkManager.askOracle(question: question)
                
                await MainActor.run {
                    oracleResponse = response
                    isLoading = false
                    showResponse = true
                    
                    // Save to recent questions
                    let oracleQuestion = OracleQuestion(
                        id: UUID().uuidString,
                        question: question,
                        response: response,
                        date: Date()
                    )
                    recentQuestions.insert(oracleQuestion, at: 0)
                    saveRecentQuestions()
                }
            } catch {
                await MainActor.run {
                    isLoading = false
                    print("Error asking oracle: \(error)")
                }
            }
        }
    }
    
    private func loadRecentQuestions() {
        // Load from UserDefaults or Core Data
        if let data = UserDefaults.standard.data(forKey: "recentOracleQuestions"),
           let questions = try? JSONDecoder().decode([OracleQuestion].self, from: data) {
            recentQuestions = questions
        }
    }
    
    private func saveRecentQuestions() {
        if let data = try? JSONEncoder().encode(recentQuestions) {
            UserDefaults.standard.set(data, forKey: "recentOracleQuestions")
        }
    }
}

struct RecentQuestionRow: View {
    let question: OracleQuestion
    let onTap: () -> Void
    
    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 8) {
                Text(question.question)
                    .font(.body)
                    .foregroundColor(.primary)
                    .multilineTextAlignment(.leading)
                
                HStack {
                    Text(question.date, style: .relative)
                        .font(.caption)
                        .foregroundColor(.secondary)
                    
                    Spacer()
                    
                    Text(question.response.wisdomLevel.capitalized)
                        .font(.caption)
                        .foregroundColor(.purple)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.purple.opacity(0.1))
                        .cornerRadius(8)
                }
            }
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(12)
        }
        .padding(.horizontal)
    }
}

struct OracleResponseView: View {
    let response: OracleResponse?
    let question: String
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 30) {
                    // Question
                    VStack(alignment: .leading, spacing: 15) {
                        Text("Your Question")
                            .font(.headline)
                            .foregroundColor(.secondary)
                        
                        Text(question)
                            .font(.body)
                            .foregroundColor(.primary)
                            .padding()
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                    }
                    
                    // Oracle Response
                    VStack(alignment: .leading, spacing: 15) {
                        HStack {
                            Image(systemName: "sparkles")
                                .foregroundColor(.purple)
                            Text("Oracle's Response")
                                .font(.headline)
                        }
                        
                        if let response = response {
                            Text(response.answer)
                                .font(.body)
                                .foregroundColor(.primary)
                                .padding()
                                .background(Color.purple.opacity(0.1))
                                .cornerRadius(12)
                            
                            HStack {
                                Text("Wisdom Level:")
                                    .font(.caption)
                                    .foregroundColor(.secondary)
                                
                                Text(response.wisdomLevel.capitalized)
                                    .font(.caption)
                                    .fontWeight(.semibold)
                                    .foregroundColor(.purple)
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(Color.purple.opacity(0.2))
                                    .cornerRadius(8)
                                
                                Spacer()
                            }
                        } else {
                            Text("No response available")
                                .font(.body)
                                .foregroundColor(.secondary)
                                .italic()
                        }
                    }
                    
                    // Reflection Prompt
                    VStack(alignment: .leading, spacing: 15) {
                        Text("Reflection")
                            .font(.headline)
                        
                        Text("Take a moment to reflect on this guidance. How does it resonate with your current solar practice and life journey?")
                            .font(.body)
                            .foregroundColor(.secondary)
                            .padding()
                            .background(Color(.systemGray6))
                            .cornerRadius(12)
                    }
                    
                    Spacer()
                }
                .padding()
            }
            .navigationTitle("Oracle Response")
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

// Data Models
struct OracleQuestion: Identifiable, Codable {
    let id: String
    let question: String
    let response: OracleResponse
    let date: Date
}