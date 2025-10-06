// LocationManager.swift
import Foundation
import CoreLocation
import SwiftUI

class LocationManager: NSObject, ObservableObject {
    private let locationManager = CLLocationManager()
    @Published var location: CLLocation?
    @Published var authorizationStatus: CLAuthorizationStatus = .notDetermined
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        authorizationStatus = locationManager.authorizationStatus
    }
    
    func requestLocationPermission() {
        switch authorizationStatus {
        case .notDetermined:
            locationManager.requestWhenInUseAuthorization()
        case .denied, .restricted:
            // Handle denied permission
            errorMessage = "Location access is required for accurate solar timing. Please enable location access in Settings."
        case .authorizedWhenInUse, .authorizedAlways:
            startLocationUpdates()
        @unknown default:
            break
        }
    }
    
    func startLocationUpdates() {
        guard authorizationStatus == .authorizedWhenInUse || authorizationStatus == .authorizedAlways else {
            return
        }
        
        isLoading = true
        locationManager.startUpdatingLocation()
    }
    
    func stopLocationUpdates() {
        locationManager.stopUpdatingLocation()
        isLoading = false
    }
    
    var hasLocationPermission: Bool {
        return authorizationStatus == .authorizedWhenInUse || authorizationStatus == .authorizedAlways
    }
    
    var coordinates: (latitude: Double, longitude: Double)? {
        guard let location = location else { return nil }
        return (location.coordinate.latitude, location.coordinate.longitude)
    }
}

extension LocationManager: CLLocationManagerDelegate {
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let newLocation = locations.last else { return }
        
        DispatchQueue.main.async {
            self.location = newLocation
            self.isLoading = false
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        DispatchQueue.main.async {
            self.isLoading = false
            self.errorMessage = "Failed to get location: \(error.localizedDescription)"
        }
    }
    
    func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        DispatchQueue.main.async {
            self.authorizationStatus = status
            
            switch status {
            case .authorizedWhenInUse, .authorizedAlways:
                self.startLocationUpdates()
            case .denied, .restricted:
                self.errorMessage = "Location access denied. Please enable location access in Settings for accurate solar timing."
            case .notDetermined:
                self.errorMessage = nil
            @unknown default:
                break
            }
        }
    }
}

// Location Permission Modal
struct LocationPermissionModal: View {
    @Binding var isPresented: Bool
    let onPermissionGranted: () -> Void
    
    var body: some View {
        VStack(spacing: 30) {
            Image(systemName: "location.fill")
                .font(.system(size: 60))
                .foregroundColor(.blue)
            
            VStack(spacing: 15) {
                Text("Location Access Required")
                    .font(.title2)
                    .fontWeight(.bold)
                
                Text("SUNGAZE needs your location to provide accurate sunrise/sunset times and safe gazing recommendations based on your local solar conditions.")
                    .font(.body)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)
            }
            
            VStack(spacing: 12) {
                Button(action: requestLocationPermission) {
                    Text("Allow Location Access")
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.blue)
                        .cornerRadius(12)
                }
                
                Button(action: { isPresented = false }) {
                    Text("Not Now")
                        .font(.body)
                        .foregroundColor(.secondary)
                }
            }
            .padding(.horizontal)
            
            Spacer()
        }
        .padding()
    }
    
    private func requestLocationPermission() {
        // This would trigger the location permission request
        // The actual implementation would be handled by the LocationManager
        onPermissionGranted()
        isPresented = false
    }
}
