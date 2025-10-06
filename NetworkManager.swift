// NetworkManager.swift
import Foundation

class NetworkManager: ObservableObject {
    static let shared = NetworkManager()
    private let baseURL = "https://sungaze-app.vercel.app"
    
    private init() {}
    
    // MARK: - Authentication
    func authenticateUser(email: String, password: String) async throws -> AuthResponse {
        let url = URL(string: "\(baseURL)/api/auth/signin")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["email": email, "password": password]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(AuthResponse.self, from: data)
    }
    
    // MARK: - User Progress
    func getUserProgress() async throws -> UserProgress {
        let url = URL(string: "\(baseURL)/api/user/progress")!
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue("Bearer \(getAuthToken())", forHTTPHeaderField: "Authorization")
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(UserProgress.self, from: data)
    }
    
    // MARK: - Solar Data
    func getSolarData(latitude: Double, longitude: Double) async throws -> SolarData {
        let url = URL(string: "\(baseURL)/api/solar-data?lat=\(latitude)&lng=\(longitude)")!
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode(SolarData.self, from: data)
    }
    
    // MARK: - Meditation Audio
    func getMeditationAudio(type: String) async throws -> AudioResponse {
        let url = URL(string: "\(baseURL)/api/audio/signed-url")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["storagePath": "audio/\(type).mp3"]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(AudioURLResponse.self, from: data)
        return AudioResponse(signedUrl: response.url, duration: 600) // Default duration
    }
    
    // MARK: - Oracle Questions
    func askOracle(question: String) async throws -> OracleResponse {
        let url = URL(string: "\(baseURL)/api/oracle")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["question": question, "sessionType": "sungazing"]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        let response = try JSONDecoder().decode(OracleAPIResponse.self, from: data)
        return OracleResponse(answer: response.response, wisdomLevel: "advanced")
    }
    
    // MARK: - Payment Integration
    func createCheckoutSession(priceId: String) async throws -> CheckoutResponse {
        let url = URL(string: "\(baseURL)/api/payments/create-checkout-session")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = ["priceId": priceId]
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(CheckoutResponse.self, from: data)
    }
    
    // MARK: - Flutterwave Payment
    func createFlutterwavePayment(amount: Double, currency: String, email: String, name: String, userId: String, tier: String) async throws -> FlutterwaveResponse {
        let url = URL(string: "\(baseURL)/api/payments/flutterwave")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body = [
            "amount": amount,
            "currency": currency,
            "email": email,
            "name": name,
            "userId": userId,
            "tier": tier
        ] as [String : Any]
        
        request.httpBody = try JSONSerialization.data(withJSONObject: body)
        
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(FlutterwaveResponse.self, from: data)
    }
    
    private func getAuthToken() -> String {
        // Retrieve from Keychain or UserDefaults
        return UserDefaults.standard.string(forKey: "authToken") ?? ""
    }
}

// MARK: - Data Models
struct AuthResponse: Codable {
    let token: String
    let user: User
}

struct User: Codable {
    let id: String
    let email: String
    let name: String?
    let subscriptionTier: String?
}

struct UserProgress: Codable {
    let currentLevel: Int
    let totalGazingTime: Int
    let completedRituals: [String]
    let unlockedFeatures: [String]
}

struct SolarData: Codable {
    let sunrise: String
    let sunset: String
    let solarNoon: String
    let safeGazingTimes: [String]
    let uvIndex: Int
    let weatherCondition: String
}

struct AudioResponse: Codable {
    let signedUrl: String
    let duration: Int
}

struct OracleResponse: Codable {
    let answer: String
    let wisdomLevel: String
}

struct CheckoutResponse: Codable {
    let sessionId: String
    let url: String
}

// MARK: - API Response Models
struct AudioURLResponse: Codable {
    let url: String
}

struct OracleAPIResponse: Codable {
    let response: String
    let sessionType: String?
    let userLevel: String?
    let timestamp: String?
}

struct FlutterwaveResponse: Codable {
    let success: Bool
    let paymentData: FlutterwavePaymentData
    let message: String
}

struct FlutterwavePaymentData: Codable {
    let tx_ref: String
    let amount: Double
    let currency: String
    let redirect_url: String
    let payment_options: String
    let customer: FlutterwaveCustomer
    let customizations: FlutterwaveCustomizations
    let meta: FlutterwaveMeta
}

struct FlutterwaveCustomer: Codable {
    let email: String
    let name: String
}

struct FlutterwaveCustomizations: Codable {
    let title: String
    let description: String
    let logo: String
}

struct FlutterwaveMeta: Codable {
    let userId: String
    let tier: String
    let product: String
}

