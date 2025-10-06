// HapticManager.swift
import UIKit
import SwiftUI

class HapticManager {
    static let shared = HapticManager()
    
    private init() {}
    
    // MARK: - Haptic Feedback Types
    
    func lightImpact() {
        let impactFeedback = UIImpactFeedbackGenerator(style: .light)
        impactFeedback.impactOccurred()
    }
    
    func mediumImpact() {
        let impactFeedback = UIImpactFeedbackGenerator(style: .medium)
        impactFeedback.impactOccurred()
    }
    
    func heavyImpact() {
        let impactFeedback = UIImpactFeedbackGenerator(style: .heavy)
        impactFeedback.impactOccurred()
    }
    
    func success() {
        let notificationFeedback = UINotificationFeedbackGenerator()
        notificationFeedback.notificationOccurred(.success)
    }
    
    func warning() {
        let notificationFeedback = UINotificationFeedbackGenerator()
        notificationFeedback.notificationOccurred(.warning)
    }
    
    func error() {
        let notificationFeedback = UINotificationFeedbackGenerator()
        notificationFeedback.notificationOccurred(.error)
    }
    
    func selection() {
        let selectionFeedback = UISelectionFeedbackGenerator()
        selectionFeedback.selectionChanged()
    }
    
    // MARK: - Custom Patterns
    
    func timerStart() {
        // Light impact for timer start
        lightImpact()
        
        // Add a slight delay and another light impact for emphasis
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            self.lightImpact()
        }
    }
    
    func timerComplete() {
        // Success notification for timer completion
        success()
        
        // Add a medium impact for extra emphasis
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            self.mediumImpact()
        }
    }
    
    func timerTick() {
        // Very light feedback for timer ticks (use sparingly)
        // This could be called every few seconds during timer countdown
        lightImpact()
    }
    
    func buttonPress() {
        // Light impact for button presses
        lightImpact()
    }
    
    func levelUp() {
        // Success notification for level progression
        success()
        
        // Add multiple impacts for celebration
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            self.mediumImpact()
        }
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            self.lightImpact()
        }
    }
    
    func ritualComplete() {
        // Success notification for ritual completion
        success()
        
        // Add a heavy impact for significance
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.15) {
            self.heavyImpact()
        }
    }
    
    func oracleResponse() {
        // Medium impact for oracle responses
        mediumImpact()
        
        // Add a light impact for mystical effect
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            self.lightImpact()
        }
    }
    
    func meditationStart() {
        // Gentle pattern for meditation start
        lightImpact()
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            self.lightImpact()
        }
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) {
            self.lightImpact()
        }
    }
    
    func meditationEnd() {
        // Gentle pattern for meditation end
        lightImpact()
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            self.lightImpact()
        }
    }
    
    func solarWindowOpen() {
        // Special pattern for solar window opening
        mediumImpact()
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
            self.lightImpact()
        }
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            self.lightImpact()
        }
    }
    
    func solarWindowClose() {
        // Special pattern for solar window closing
        lightImpact()
        
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            self.mediumImpact()
        }
    }
}

// SwiftUI View Modifier for Haptic Feedback
struct HapticFeedback: ViewModifier {
    let feedbackType: HapticFeedbackType
    let action: () -> Void
    
    enum HapticFeedbackType {
        case light
        case medium
        case heavy
        case success
        case warning
        case error
        case selection
        case timerStart
        case timerComplete
        case buttonPress
        case levelUp
        case ritualComplete
        case oracleResponse
        case meditationStart
        case meditationEnd
        case solarWindowOpen
        case solarWindowClose
    }
    
    func body(content: Content) -> some View {
        content
            .onTapGesture {
                triggerHaptic()
                action()
            }
    }
    
    private func triggerHaptic() {
        switch feedbackType {
        case .light:
            HapticManager.shared.lightImpact()
        case .medium:
            HapticManager.shared.mediumImpact()
        case .heavy:
            HapticManager.shared.heavyImpact()
        case .success:
            HapticManager.shared.success()
        case .warning:
            HapticManager.shared.warning()
        case .error:
            HapticManager.shared.error()
        case .selection:
            HapticManager.shared.selection()
        case .timerStart:
            HapticManager.shared.timerStart()
        case .timerComplete:
            HapticManager.shared.timerComplete()
        case .buttonPress:
            HapticManager.shared.buttonPress()
        case .levelUp:
            HapticManager.shared.levelUp()
        case .ritualComplete:
            HapticManager.shared.ritualComplete()
        case .oracleResponse:
            HapticManager.shared.oracleResponse()
        case .meditationStart:
            HapticManager.shared.meditationStart()
        case .meditationEnd:
            HapticManager.shared.meditationEnd()
        case .solarWindowOpen:
            HapticManager.shared.solarWindowOpen()
        case .solarWindowClose:
            HapticManager.shared.solarWindowClose()
        }
    }
}

// Extension to make it easier to use
extension View {
    func hapticFeedback(_ type: HapticFeedback.HapticFeedbackType, action: @escaping () -> Void = {}) -> some View {
        self.modifier(HapticFeedback(feedbackType: type, action: action))
    }
}
