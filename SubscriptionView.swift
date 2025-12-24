import SwiftUI
import StoreKit

struct SubscriptionView: View {
    enum Mode {
        case onboarding
        case manage
    }

    var mode: Mode = .manage
    var onPurchaseComplete: (() -> Void)?

    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var storeKitManager: StoreKitManager

    @State private var purchaseInProgressID: String?
    @State private var restoreInProgress = false
    @State private var errorMessage: String?
    @State private var showErrorAlert = false
    @State private var refreshID = UUID()

    private let planDetails: [String: PlanDetail] = [
        "com.sungaze.premium.monthly": PlanDetail(
            title: "Monthly Access",
            subtitle: "Billed monthly. Cancel anytime.",
            badge: nil
        ),
        "com.sungaze.premium.yearly": PlanDetail(
            title: "Yearly Access",
            subtitle: "Best value – save compared to monthly.",
            badge: "Popular"
        ),
        "com.sungaze.founder44": PlanDetail(
            title: "Founder Lifetime",
            subtitle: "One-time payment. Lifetime access.",
            badge: "Founder 444"
        )
    ]

    struct PlanDetail {
        let title: String
        let subtitle: String
        let badge: String?
    }

    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 32) {
                    headerSection

                    planStack

                    restoreSection

                    if mode == .onboarding {
                        Button(action: dismiss) {
                            Text("Continue with Free Version")
                                .foregroundColor(.secondary)
                                .padding(.vertical, 8)
                        }
                    }

                    termsSection
                }
                .padding(.horizontal, 24)
                .padding(.bottom, 32)
            }
            .navigationTitle("Premium Access")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                if mode == .manage {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Close") { dismiss() }
                    }
                }
            }
        }
        .onAppear {
            print("📱 SubscriptionView appeared")
            print("📱 StoreKitManager isLoadingProducts: \(storeKitManager.isLoadingProducts)")
            print("📱 StoreKitManager has \(storeKitManager.products.count) products")
            if storeKitManager.products.isEmpty {
                print("📱 No products loaded yet, will fetch...")
            } else {
                print("📱 Products already loaded:")
                for product in storeKitManager.products {
                    print("📱   - \(product.id): \(product.displayName)")
                }
            }
        }
        .task {
            print("📱 SubscriptionView: Loading products if needed...")
            print("📱 Before load - isLoadingProducts: \(storeKitManager.isLoadingProducts), products count: \(storeKitManager.products.count)")
            
            // Force load products even if they're already loaded
            if storeKitManager.products.isEmpty {
                await storeKitManager.loadProductsIfNeeded()
            } else {
                // Products already loaded, just ensure we're observing them
                print("📱 Products already available, refreshing view...")
            }
            
            print("📱 After load - isLoadingProducts: \(storeKitManager.isLoadingProducts), products count: \(storeKitManager.products.count)")
            
            // Force UI refresh after a small delay to ensure state is updated
            try? await Task.sleep(nanoseconds: 100_000_000) // 0.1 seconds
            refreshID = UUID()
        }
        .onChange(of: storeKitManager.isPremiumUnlocked) { unlocked in
            if unlocked {
                onPurchaseComplete?()
                dismiss()
            }
        }
        .onChange(of: storeKitManager.lastErrorMessage) { message in
            guard let message else { return }
            errorMessage = message
            showErrorAlert = true
            storeKitManager.clearError()
        }
        .alert("Purchase Issue", isPresented: $showErrorAlert, presenting: errorMessage) { _ in
            Button("OK", role: .cancel) { }
        } message: { message in
            Text(message)
        }
    }

    // MARK: - Sections
    private var headerSection: some View {
        VStack(spacing: 16) {
            Image(systemName: "sun.max.fill")
                .font(.system(size: 56))
                .foregroundColor(.orange)

            VStack(spacing: 8) {
                Text(storeKitManager.isPremiumUnlocked ? "Premium Unlocked" : "Unlock Your Solar Journey")
                    .font(.title2)
                    .fontWeight(.bold)

                Text("Get personalized guidance, advanced features, and deeper solar wisdom.")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
            }

            featureHighlights
        }
        .frame(maxWidth: .infinity)
        .padding(.top, 32)
    }

    private var featureHighlights: some View {
        VStack(spacing: 12) {
            FeatureRow(icon: "sparkles", title: "Personalized Solar Plan", description: "Customized based on your responses.")
            FeatureRow(icon: "chart.line.uptrend.xyaxis", title: "Progress Tracking", description: "Detailed analytics and insights.")
            FeatureRow(icon: "music.note", title: "Premium Audio", description: "Exclusive meditation tracks.")
            FeatureRow(icon: "book", title: "Solar Library", description: "Access to ancient wisdom texts.")
            FeatureRow(icon: "questionmark.circle", title: "Advanced Oracle", description: "Deeper insights and guidance.")
        }
    }

    @ViewBuilder
    private var planStack: some View {
        VStack(alignment: .leading, spacing: 20) {
            Text("Choose your plan")
                .font(.headline)

            // Directly observe both isLoadingProducts and products
            if storeKitManager.isLoadingProducts {
                ProgressView("Loading plans...")
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 40)
            } else if storeKitManager.products.isEmpty {
                VStack(spacing: 12) {
                    Image(systemName: "exclamationmark.triangle")
                        .font(.title2)
                        .foregroundColor(.orange)
                    Text("Products are not available right now.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                    Text("Please try again later.")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 40)
            } else {
                ForEach(storeKitManager.products, id: \.id) { product in
                    planCard(for: product)
                }
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .onChange(of: storeKitManager.isLoadingProducts) { isLoading in
            print("📱 planStack: isLoadingProducts changed to \(isLoading), products count: \(storeKitManager.products.count)")
        }
        .onChange(of: storeKitManager.products.count) { count in
            print("📱 planStack: products count changed to \(count), isLoadingProducts: \(storeKitManager.isLoadingProducts)")
        }
    }

    private func planCard(for product: Product) -> some View {
        let detail = planDetails[product.id]
        let isPurchased = storeKitManager.isPurchased(product)
        let isProcessing = purchaseInProgressID == product.id

        return VStack(spacing: 16) {
            HStack(alignment: .firstTextBaseline) {
                VStack(alignment: .leading, spacing: 6) {
                    HStack(spacing: 8) {
                        Text(detail?.title ?? product.displayName)
                            .font(.title3)
                            .fontWeight(.semibold)

                        if let badge = detail?.badge {
                            Text(badge.uppercased())
                                .font(.caption2)
                                .fontWeight(.bold)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(Color.orange.opacity(0.2))
                                .foregroundColor(.orange)
                                .cornerRadius(8)
                        }
                    }

                    Text(detail?.subtitle ?? "")
                        .font(.subheadline)
                        .foregroundColor(.secondary)

                    Text(billingDescription(for: product))
                        .font(.headline)
                        .foregroundColor(.primary)
                }

                Spacer()

                if isPurchased {
                    Label("Active", systemImage: "checkmark.seal.fill")
                        .font(.caption)
                        .padding(.horizontal, 10)
                        .padding(.vertical, 6)
                        .background(Color.green.opacity(0.15))
                        .foregroundColor(.green)
                        .cornerRadius(10)
                }
            }

            Button {
                purchase(product)
            } label: {
                HStack {
                    if isProcessing {
                        ProgressView()
                    } else {
                        Text(isPurchased ? "Purchased" : "Select Plan")
                            .fontWeight(.semibold)
                    }
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(isPurchased ? Color.green.opacity(0.2) : Color.orange)
                .foregroundColor(isPurchased ? .green : .white)
                .cornerRadius(12)
            }
            .disabled(isPurchased || isProcessing)
        }
        .padding()
        .background(Color(.secondarySystemBackground))
        .cornerRadius(16)
    }

    private var restoreSection: some View {
        VStack(spacing: 12) {
            Button {
                restorePurchases()
            } label: {
                HStack(spacing: 8) {
                    if restoreInProgress {
                        ProgressView()
                    } else {
                        Image(systemName: "arrow.clockwise")
                    }
                    Text("Restore Purchases")
                        .fontWeight(.semibold)
                }
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .background(Color(.secondarySystemBackground))
                .cornerRadius(12)
            }
            .disabled(restoreInProgress)

            Text("All purchases are securely processed by Apple.")
                .font(.caption)
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
    }

    private var termsSection: some View {
        VStack(spacing: 8) {
            Text("Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current period. Manage or cancel your subscription any time in Settings.")
                .font(.caption)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
    }

    // MARK: - Helpers
    private func billingDescription(for product: Product) -> String {
        if let subscription = product.subscription {
            switch subscription.subscriptionPeriod.unit {
            case .day:
                return "\(product.displayPrice) / day"
            case .week:
                return "\(product.displayPrice) / week"
            case .month:
                return "\(product.displayPrice) / month"
            case .year:
                return "\(product.displayPrice) / year"
            @unknown default:
                return product.displayPrice
            }
        } else {
            return "\(product.displayPrice) • One-time payment"
        }
    }

    private func purchase(_ product: Product) {
        print("📱 SubscriptionView: Purchase button tapped for \(product.id)")
        purchaseInProgressID = product.id
        Task {
            print("📱 SubscriptionView: Starting purchase process...")
            let success = await storeKitManager.purchase(product)
            await MainActor.run {
                purchaseInProgressID = nil
                print("📱 SubscriptionView: Purchase completed. Success: \(success)")
                if !success, let message = storeKitManager.lastErrorMessage {
                    print("📱 SubscriptionView: Purchase failed with error: \(message)")
                    errorMessage = message
                    showErrorAlert = true
                    storeKitManager.clearError()
                }
            }
        }
    }

    private func restorePurchases() {
        restoreInProgress = true
        Task {
            await storeKitManager.restorePurchases()
            await MainActor.run {
                restoreInProgress = false
                if let message = storeKitManager.lastErrorMessage {
                    errorMessage = message
                    showErrorAlert = true
                    storeKitManager.clearError()
                }
            }
        }
    }
}

// MARK: - Feature Row
private struct FeatureRow: View {
    let icon: String
    let title: String
    let description: String

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Image(systemName: icon)
                .foregroundColor(.orange)
                .frame(width: 24)

            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .fontWeight(.semibold)
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            Spacer()
        }
    }
}



