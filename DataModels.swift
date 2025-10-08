// DataModels.swift
import Foundation

// MARK: - Solar Data Models
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

// MARK: - User Progress Models
struct UserProgress: Codable {
    let totalSessions: Int
    let totalDuration: Int // in seconds
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

// MARK: - Authentication Models
struct AuthResponse: Codable {
    let success: Bool
    let token: String?
    let user: User?
    let message: String?
}

struct User: Codable {
    let id: String
    let email: String
    let name: String?
    let tier: String
    let createdAt: String
    let updatedAt: String
}

// MARK: - Audio Models
struct AudioResponse: Codable {
    let success: Bool
    let url: String?
    let error: String?
}

// MARK: - Oracle Models
struct OracleResponse: Codable {
    let success: Bool
    let response: String?
    let error: String?
}

// MARK: - Payment Models
struct PaymentResponse: Codable {
    let success: Bool
    let sessionId: String?
    let url: String?
    let error: String?
}

// MARK: - Journal Models
struct JournalEntry: Codable {
    let id: String
    let userId: String
    let date: String
    let duration: Int
    let notes: String?
    let mood: String?
    let weather: String?
    let location: String?
    let createdAt: String
    let updatedAt: String
}

// MARK: - Meditation Models
struct MeditationTrack: Codable {
    let id: String
    let title: String
    let duration: Int
    let type: String
    let url: String
    let description: String?
}

// MARK: - Location Models
struct LocationData: Codable {
    let latitude: Double
    let longitude: Double
    let city: String?
    let country: String?
    let timezone: String?
}
