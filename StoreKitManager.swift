import Foundation
import StoreKit

@MainActor
final class StoreKitManager: ObservableObject {
    // MARK: - Published State
    @Published private(set) var products: [Product] = []
    @Published private(set) var purchasedProductIDs: Set<String> = []
    @Published private(set) var isPremiumUnlocked: Bool = UserDefaults.standard.bool(forKey: "isPremiumUser")
    @Published var isLoadingProducts: Bool = false
    @Published var lastErrorMessage: String?

    // MARK: - Identifiers
    private let productIdentifiers: [String] = [
        "com.sungaze.premium.monthly",
        "com.sungaze.premium.yearly",
        "com.sungaze.founder44"
    ]

    private var updatesListenerTask: Task<Void, Never>? = nil

    // MARK: - Init / Deinit
    init() {
        print("🚀 StoreKitManager init() started")
        print("🛒 StoreKit: Initializing...")
        print("🛒 Looking for product IDs: \(productIdentifiers)")
        updatesListenerTask = listenForTransactions()
        Task {
            await loadProductsIfNeeded()
            await refreshPurchasedProducts()
        }
    }

    deinit {
        updatesListenerTask?.cancel()
    }

    // MARK: - Product Loading
    func loadProductsIfNeeded() async {
        if products.isEmpty {
            print("🛒 About to call fetchProducts()")
            await fetchProducts()
        }
    }

    func fetchProducts() async {
        print("🛒 fetchProducts() function entered")
        isLoadingProducts = true
        print("🛒 StoreKit: Fetching products...")
        print("🛒 Product IDs requested: \(productIdentifiers)")
        defer { isLoadingProducts = false }

        do {
            var fetchedProducts = try await Product.products(for: productIdentifiers)
            
            print("🛒 Products fetched successfully")
            print("🛒 Found \(fetchedProducts.count) products")
            
            if fetchedProducts.isEmpty {
                print("❌ NO PRODUCTS FOUND - Check product IDs and App Store Connect configuration")
                print("❌ Requested IDs: \(productIdentifiers)")
                lastErrorMessage = "Products not available. Please check App Store Connect configuration."
            } else {
                for product in fetchedProducts {
                    print("🛒   - \(product.id): \(product.displayName) - \(product.displayPrice)")
                    if let subscription = product.subscription {
                        print("🛒     Subscription period: \(subscription.subscriptionPeriod.value) \(subscription.subscriptionPeriod.unit)")
                    }
                }
            }
            
            fetchedProducts.sort { productSortIndex(for: $0.id) < productSortIndex(for: $1.id) }
            products = fetchedProducts
            lastErrorMessage = nil
        } catch {
            print("❌ StoreKit Error: \(error.localizedDescription)")
            print("❌ Full error: \(error)")
            if let storeKitError = error as? StoreKitError {
                print("❌ StoreKit Error Code: \(storeKitError)")
            }
            lastErrorMessage = error.localizedDescription
        }
    }

    private func productSortIndex(for productID: String) -> Int {
        switch productID {
        case "com.sungaze.premium.monthly":
            return 0
        case "com.sungaze.premium.yearly":
            return 1
        case "com.sungaze.founder44":
            return 2
        default:
            return Int.max
        }
    }

    // MARK: - Purchasing
    func purchase(_ product: Product) async -> Bool {
        print("🛒 StoreKit: Attempting to purchase \(product.id)")
        do {
            let result = try await product.purchase()
            print("🛒 StoreKit: Purchase result received")

            switch result {
            case .success(let verification):
                print("🛒 StoreKit: Purchase successful, verifying transaction...")
                let transaction = try Self.checkVerified(verification)
                await handleVerifiedTransaction(transaction)
                await transaction.finish()
                print("🛒 StoreKit: Transaction verified and finished")
                return true
            case .userCancelled:
                print("🛒 StoreKit: User cancelled purchase")
                return false
            case .pending:
                print("🛒 StoreKit: Purchase is pending")
                return false
            @unknown default:
                print("🛒 StoreKit: Unknown purchase result")
                return false
            }
        } catch {
            print("❌ StoreKit Purchase Error: \(error.localizedDescription)")
            print("❌ Full purchase error: \(error)")
            lastErrorMessage = error.localizedDescription
            return false
        }
    }

    func restorePurchases() async {
        do {
            try await AppStore.sync()
            await refreshPurchasedProducts()
        } catch {
            lastErrorMessage = error.localizedDescription
        }
    }

    func isPurchased(_ product: Product) -> Bool {
        purchasedProductIDs.contains(product.id)
    }

    func clearError() {
        lastErrorMessage = nil
    }

    // MARK: - Transaction Handling
    private func listenForTransactions() -> Task<Void, Never> {
        Task.detached(priority: .background) { [weak self] in
            guard let self else { return }

            for await result in Transaction.updates {
                do {
                    let transaction = try Self.checkVerified(result)
                    await self.handleVerifiedTransaction(transaction)
                    await transaction.finish()
                } catch {
                    await MainActor.run {
                        self.lastErrorMessage = error.localizedDescription
                    }
                }
            }
        }
    }

    private func handleVerifiedTransaction(_ transaction: Transaction) async {
        guard productIdentifiers.contains(transaction.productID) else { return }
        await refreshPurchasedProducts()
    }

    func refreshPurchasedProducts() async {
        print("🛒 StoreKit: Refreshing purchased products...")
        var validProductIDs: Set<String> = []

        for await result in Transaction.currentEntitlements {
            do {
                let transaction = try Self.checkVerified(result)
                guard productIdentifiers.contains(transaction.productID) else { continue }

                let isRevoked = transaction.revocationDate != nil
                let isExpired = transaction.expirationDate?.compare(Date()) == .orderedAscending

                if !isRevoked && !isExpired {
                    print("🛒 Found valid purchase: \(transaction.productID)")
                    validProductIDs.insert(transaction.productID)
                } else {
                    print("🛒 Purchase expired or revoked: \(transaction.productID)")
                }
            } catch {
                print("❌ Error checking transaction: \(error.localizedDescription)")
                await MainActor.run {
                    lastErrorMessage = error.localizedDescription
                }
            }
        }

        await MainActor.run {
            purchasedProductIDs = validProductIDs
            let unlocked = !validProductIDs.isEmpty
            print("🛒 Premium unlocked: \(unlocked) (Products: \(validProductIDs))")
            if isPremiumUnlocked != unlocked {
                isPremiumUnlocked = unlocked
                UserDefaults.standard.set(unlocked, forKey: "isPremiumUser")
            }
        }
    }

    nonisolated private static func checkVerified<T>(_ result: VerificationResult<T>) throws -> Transaction where T == Transaction {
        switch result {
        case .verified(let transaction):
            return transaction
        case .unverified(_, let error):
            throw error
        }
    }
}


