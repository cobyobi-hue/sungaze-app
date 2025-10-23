import Foundation
import AuthenticationServices

class AuthenticationManager: ObservableObject {
    @Published var isAuthenticated = false
    @Published var currentUser: User?
    
    private let backendURL = "https://your-nextjs-backend.com/api" // Replace with your backend URL
    
    init() {
        // Check for existing authentication
        checkAuthenticationStatus()
    }
    
    func signInWithEmail(email: String, password: String, completion: @escaping (Bool, String?) -> Void) {
        guard let url = URL(string: "\(backendURL)/auth/signin") else {
            completion(false, "Invalid URL")
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: String] = [
            "email": email,
            "password": password
        ]
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
        } catch {
            completion(false, "Failed to encode request body")
            return
        }
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                if let error = error {
                    completion(false, error.localizedDescription)
                    return
                }
                
                guard let data = data else {
                    completion(false, "No data received")
                    return
                }
                
                do {
                    let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
                    
                    if let userData = json?["user"] as? [String: Any],
                       let token = json?["token"] as? String {
                        
                        self.currentUser = User(
                            id: userData["id"] as? String ?? "",
                            email: userData["email"] as? String ?? "",
                            name: userData["name"] as? String ?? ""
                        )
                        
                        // Store token securely
                        self.storeAuthToken(token)
                        self.isAuthenticated = true
                        completion(true, nil)
                    } else {
                        completion(false, "Invalid response format")
                    }
                    
                } catch {
                    completion(false, "Failed to parse response")
                }
            }
        }.resume()
    }
    
    func signInWithApple(userIdentifier: String, email: String?, fullName: PersonNameComponents?) {
        guard let url = URL(string: "\(backendURL)/auth/apple") else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let body: [String: Any] = [
            "userIdentifier": userIdentifier,
            "email": email ?? "",
            "firstName": fullName?.givenName ?? "",
            "lastName": fullName?.familyName ?? ""
        ]
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: body)
        } catch {
            return
        }
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                if let data = data,
                   let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let userData = json["user"] as? [String: Any],
                   let token = json["token"] as? String {
                    
                    self.currentUser = User(
                        id: userData["id"] as? String ?? "",
                        email: userData["email"] as? String ?? "",
                        name: userData["name"] as? String ?? ""
                    )
                    
                    self.storeAuthToken(token)
                    self.isAuthenticated = true
                }
            }
        }.resume()
    }
    
    func signOut() {
        currentUser = nil
        isAuthenticated = false
        clearAuthToken()
    }
    
    private func checkAuthenticationStatus() {
        // Check for stored auth token
        if let token = getStoredAuthToken(), !token.isEmpty {
            // Validate token with backend
            validateToken(token)
        }
    }
    
    private func validateToken(_ token: String) {
        guard let url = URL(string: "\(backendURL)/auth/validate") else { return }
        
        var request = URLRequest(url: url)
        request.httpMethod = "GET"
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                if let data = data,
                   let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                   let userData = json["user"] as? [String: Any] {
                    
                    self.currentUser = User(
                        id: userData["id"] as? String ?? "",
                        email: userData["email"] as? String ?? "",
                        name: userData["name"] as? String ?? ""
                    )
                    self.isAuthenticated = true
                } else {
                    self.clearAuthToken()
                }
            }
        }.resume()
    }
    
    private func storeAuthToken(_ token: String) {
        UserDefaults.standard.set(token, forKey: "auth_token")
    }
    
    private func getStoredAuthToken() -> String? {
        return UserDefaults.standard.string(forKey: "auth_token")
    }
    
    private func clearAuthToken() {
        UserDefaults.standard.removeObject(forKey: "auth_token")
    }
}

struct User {
    let id: String
    let email: String
    let name: String
}
