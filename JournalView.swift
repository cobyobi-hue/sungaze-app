// JournalView.swift
import SwiftUI

struct JournalView: View {
    @StateObject private var networkManager = NetworkManager.shared
    @State private var journalEntries: [JournalEntry] = []
    @State private var showingNewEntry = false
    @State private var isLoading = false
    
    var body: some View {
        NavigationView {
            VStack {
                if isLoading {
                    ProgressView("Loading journal entries...")
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if journalEntries.isEmpty {
                    EmptyJournalView {
                        showingNewEntry = true
                    }
                } else {
                    JournalEntriesList(entries: journalEntries) {
                        showingNewEntry = true
                    }
                }
            }
            .navigationTitle("Solar Journal")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button(action: { showingNewEntry = true }) {
                        Image(systemName: "plus")
                    }
                }
            }
            .sheet(isPresented: $showingNewEntry) {
                NewJournalEntryView { entry in
                    journalEntries.insert(entry, at: 0)
                }
            }
            .onAppear {
                loadJournalEntries()
            }
        }
    }
    
    private func loadJournalEntries() {
        isLoading = true
        
        Task {
            do {
                // This would be a custom API endpoint to fetch journal entries
                // For now, we'll create some sample data
                await MainActor.run {
                    journalEntries = createSampleEntries()
                    isLoading = false
                }
            } catch {
                await MainActor.run {
                    isLoading = false
                    print("Error loading journal entries: \(error)")
                }
            }
        }
    }
    
    private func createSampleEntries() -> [JournalEntry] {
        return [
            JournalEntry(
                id: "1",
                date: Date(),
                title: "Morning Solar Practice",
                content: "Started with 10 minutes of sun gazing during golden hour. Felt a deep sense of peace and energy flowing through my body. The light felt nourishing and healing.",
                mood: "peaceful",
                energyLevel: 8,
                sessionDuration: 10,
                weather: "Clear skies",
                tags: ["morning", "golden-hour", "peaceful"]
            ),
            JournalEntry(
                id: "2",
                date: Calendar.current.date(byAdding: .day, value: -1, to: Date()) ?? Date(),
                title: "Evening Reflection",
                content: "Completed a 15-minute session before sunset. Noticed improved focus and mental clarity throughout the day. The solar energy seems to be enhancing my cognitive abilities.",
                mood: "focused",
                energyLevel: 7,
                sessionDuration: 15,
                weather: "Partly cloudy",
                tags: ["evening", "focus", "clarity"]
            )
        ]
    }
}

struct EmptyJournalView: View {
    let onCreateEntry: () -> Void
    
    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "book.closed")
                .font(.system(size: 80))
                .foregroundColor(.orange.opacity(0.6))
            
            VStack(spacing: 15) {
                Text("Start Your Solar Journey")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                Text("Document your experiences, insights, and progress as you deepen your connection with solar energy.")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
            }
            
            Button(action: onCreateEntry) {
                HStack {
                    Image(systemName: "plus")
                    Text("Create First Entry")
                }
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

struct JournalEntriesList: View {
    let entries: [JournalEntry]
    let onCreateEntry: () -> Void
    
    var body: some View {
        List {
            ForEach(entries) { entry in
                JournalEntryRow(entry: entry)
            }
        }
        .listStyle(PlainListStyle())
    }
}

struct JournalEntryRow: View {
    let entry: JournalEntry
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text(entry.title)
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Text(entry.date, style: .date)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                VStack(alignment: .trailing, spacing: 4) {
                    Text("\(entry.sessionDuration) min")
                        .font(.caption)
                        .fontWeight(.semibold)
                        .foregroundColor(.orange)
                    
                    Text(entry.mood.capitalized)
                        .font(.caption)
                        .foregroundColor(.secondary)
                }
            }
            
            Text(entry.content)
                .font(.body)
                .foregroundColor(.primary)
                .lineLimit(3)
            
            HStack {
                ForEach(entry.tags, id: \.self) { tag in
                    Text("#\(tag)")
                        .font(.caption)
                        .foregroundColor(.orange)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(Color.orange.opacity(0.1))
                        .cornerRadius(8)
                }
                
                Spacer()
                
                Text("Energy: \(entry.energyLevel)/10")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
        }
        .padding(.vertical, 8)
    }
}

struct NewJournalEntryView: View {
    @Environment(\.dismiss) private var dismiss
    @State private var title = ""
    @State private var content = ""
    @State private var mood = "peaceful"
    @State private var energyLevel = 5
    @State private var sessionDuration = 10
    @State private var weather = "Clear"
    @State private var tags = ""
    @State private var isLoading = false
    
    let onSave: (JournalEntry) -> Void
    
    let moodOptions = ["peaceful", "energized", "focused", "calm", "inspired", "grateful", "connected"]
    let weatherOptions = ["Clear", "Partly cloudy", "Cloudy", "Overcast", "Rainy"]
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    // Title
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Title")
                            .font(.headline)
                        TextField("Enter entry title", text: $title)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                    }
                    
                    // Content
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Reflection")
                            .font(.headline)
                        TextField("Describe your experience...", text: $content)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                    }
                    
                    // Session Details
                    VStack(alignment: .leading, spacing: 15) {
                        Text("Session Details")
                            .font(.headline)
                        
                        HStack {
                            Text("Duration (minutes)")
                            Spacer()
                            Stepper("\(sessionDuration)", value: $sessionDuration, in: 1...120)
                        }
                        
                        HStack {
                            Text("Energy Level")
                            Spacer()
                            Stepper("\(energyLevel)/10", value: $energyLevel, in: 1...10)
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Mood")
                            Picker("Mood", selection: $mood) {
                                ForEach(moodOptions, id: \.self) { mood in
                                    Text(mood.capitalized).tag(mood)
                                }
                            }
                            .pickerStyle(MenuPickerStyle())
                        }
                        
                        VStack(alignment: .leading, spacing: 8) {
                            Text("Weather")
                            Picker("Weather", selection: $weather) {
                                ForEach(weatherOptions, id: \.self) { weather in
                                    Text(weather).tag(weather)
                                }
                            }
                            .pickerStyle(MenuPickerStyle())
                        }
                    }
                    
                    // Tags
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Tags (comma-separated)")
                            .font(.headline)
                        TextField("morning, peaceful, insights", text: $tags)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                    }
                }
                .padding()
            }
            .navigationTitle("New Entry")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Save") {
                        saveEntry()
                    }
                    .disabled(title.isEmpty || content.isEmpty || isLoading)
                }
            }
        }
    }
    
    private func saveEntry() {
        isLoading = true
        
        let tagArray = tags.components(separatedBy: ",").map { $0.trimmingCharacters(in: .whitespaces) }.filter { !$0.isEmpty }
        
        let entry = JournalEntry(
            id: UUID().uuidString,
            date: Date(),
            title: title,
            content: content,
            mood: mood,
            energyLevel: energyLevel,
            sessionDuration: sessionDuration,
            weather: weather,
            tags: tagArray
        )
        
        onSave(entry)
        dismiss()
    }
}

// Data Models
struct JournalEntry: Identifiable, Codable {
    let id: String
    let date: Date
    let title: String
    let content: String
    let mood: String
    let energyLevel: Int
    let sessionDuration: Int
    let weather: String
    let tags: [String]
}