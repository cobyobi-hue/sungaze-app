import SwiftUI

@main
struct SUNGAZEApp: App {
    var body: some Scene {
        WindowGroup {
            TabView {
                WebContainer()
                    .tabItem { Label("SUNGAZE", systemImage: "sun.max") }
                NavigationView { SettingsView() }
                    .tabItem { Label("Settings", systemImage: "gearshape") }
            }
        }
    }
}

struct SettingsView: View {
    @AppStorage("hapticsEnabled") var hapticsEnabled = true
    var body: some View {
        Form {
            Toggle("Enable Haptics", isOn: $hapticsEnabled)
            Section(header: Text("About")) {
                Text("SUNGAZE v1.0.0")
                Text("Transform your consciousness through ancient solar wisdom")
                Text("© 2025 SUNGAZE, All rights reserved.")
            }
        }
        .navigationTitle("Settings")
    }
}