// HomeView.swift
import SwiftUI

struct HomeView: View {
    let solarData: SolarData?
    let userProgress: UserProgress?
    @State private var showTimer = false
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 20) {
                    // Header
                    VStack {
                        Image(systemName: "sun.max.fill")
                            .font(.system(size: 60))
                            .foregroundColor(.orange)
                        
                        Text("SUNGAZE")
                            .font(.largeTitle)
                            .fontWeight(.bold)
                        
                        Text("Light Nutrition & Solar Wisdom")
                            .font(.subheadline)
                            .foregroundColor(.secondary)
                    }
                    .padding()
                    
                    // Solar Data Card
                    if let solarData = solarData {
                        SolarDataCard(solarData: solarData)
                    }
                    
                    // Progress Card
                    if let progress = userProgress {
                        ProgressCard(progress: progress)
                    }
                    
                    // Quick Actions
                    VStack(spacing: 15) {
                        Button(action: { showTimer = true }) {
                            HStack {
                                Image(systemName: "timer")
                                Text("Start Sungazing Session")
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.orange)
                            .foregroundColor(.white)
                            .cornerRadius(12)
                        }
                        
                        Button(action: {}) {
                            HStack {
                                Image(systemName: "sparkles")
                                Text("Ask the Oracle")
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.purple)
                            .foregroundColor(.white)
                            .cornerRadius(12)
                        }
                        
                        Button(action: {}) {
                            HStack {
                                Image(systemName: "book")
                                Text("Solar Journal")
                            }
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Color.blue)
                            .foregroundColor(.white)
                            .cornerRadius(12)
                        }
                    }
                    .padding(.horizontal)
                }
            }
            .navigationTitle("Home")
        }
        .sheet(isPresented: $showTimer) {
            TimerView()
        }
    }
}

struct SolarDataCard: View {
    let solarData: SolarData
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "sunrise")
                    .foregroundColor(.orange)
                Text("Today's Solar Schedule")
                    .font(.headline)
            }
            
            HStack {
                VStack(alignment: .leading) {
                    Text("Sunrise")
                    Text(solarData.sunrise)
                        .font(.title2)
                        .fontWeight(.semibold)
                }
                
                Spacer()
                
                VStack(alignment: .trailing) {
                    Text("Sunset")
                    Text(solarData.sunset)
                        .font(.title2)
                        .fontWeight(.semibold)
                }
            }
            
            HStack {
                Text("UV Index: \(solarData.uvIndex)")
                Spacer()
                Text(solarData.weatherCondition)
            }
            .font(.caption)
            .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
        .padding(.horizontal)
    }
}

struct ProgressCard: View {
    let progress: UserProgress
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "chart.line.uptrend.xyaxis")
                    .foregroundColor(.green)
                Text("Your Progress")
                    .font(.headline)
            }
            
            HStack {
                VStack(alignment: .leading) {
                    Text("Solar Level")
                    Text("\(progress.currentLevel)")
                        .font(.title)
                        .fontWeight(.bold)
                }
                
                Spacer()
                
                VStack(alignment: .trailing) {
                    Text("Total Time")
                    Text("\(progress.totalGazingTime) min")
                        .font(.title2)
                        .fontWeight(.semibold)
                }
            }
            
            Text("\(progress.completedRituals.count) rituals completed")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
        .padding(.horizontal)
    }
}

