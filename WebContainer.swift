import SwiftUI
import WebKit
import SafariServices

// MARK: - A SwiftUI wrapper around WKWebView with refresh + share + external links

struct WebContainer: View {
    @StateObject private var model = WebModel()
    let startURL = URL(string: "http://localhost:3001")! // Your local development server

    var body: some View {
        ZStack {
            WebView(url: startURL, model: model)
                .ignoresSafeArea()

            if model.isLoading {
                ProgressView().scaleEffect(1.4)
            }
        }
        .toolbar {
            ToolbarItemGroup(placement: .bottomBar) {
                Button(action: { model.goBack() }) { Image(systemName: "chevron.left") }.disabled(!model.canGoBack)
                Button(action: { model.goForward() }) { Image(systemName: "chevron.right") }.disabled(!model.canGoForward)
                Spacer()
                Button(action: { model.reload() }) { Image(systemName: "arrow.clockwise") }
                Button(action: { model.share() }) { Image(systemName: "square.and.arrow.up") }
            }
        }
        .sheet(isPresented: $model.showShareSheet) {
            if let current = model.currentURL {
                ActivityView(activityItems: [current])
            }
        }
        .sheet(item: $model.safariItem) { item in
            SafariView(url: item.url)
        }
    }
}

// MARK: - Safari View Wrapper
struct SafariView: UIViewControllerRepresentable {
    let url: URL

    func makeUIViewController(context: Context) -> SFSafariViewController {
        return SFSafariViewController(url: url)
    }

    func updateUIViewController(_ uiViewController: SFSafariViewController, context: Context) {
        // No updates needed
    }
}

// MARK: - ViewModel for navigation state and actions
final class WebModel: ObservableObject {
    fileprivate weak var webView: WKWebView?
    @Published var isLoading = false
    @Published var canGoBack = false
    @Published var canGoForward = false
    @Published var currentURL: URL?
    @Published var showShareSheet = false
    @Published var safariItem: SafariItem?

    func goBack() { webView?.goBack() }
    func goForward() { webView?.goForward() }
    func reload() { webView?.reload() }
    func share() { showShareSheet = true }
}

struct SafariItem: Identifiable { let id = UUID(); let url: URL }

// MARK: - UIKit share sheet
struct ActivityView: UIViewControllerRepresentable {
    let activityItems: [Any]
    func makeUIViewController(context: Context) -> UIActivityViewController {
        UIActivityViewController(activityItems: activityItems, applicationActivities: nil)
    }
    func updateUIViewController(_ uiViewController: UIActivityViewController, context: Context) {}
}

// MARK: - WKWebView Representable
struct WebView: UIViewRepresentable {
    let url: URL
    @ObservedObject var model: WebModel

    func makeCoordinator() -> Coordinator { Coordinator(model: model) }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []
        config.preferences.javaScriptCanOpenWindowsAutomatically = true

        let wv = WKWebView(frame: .zero, configuration: config)
        wv.navigationDelegate = context.coordinator
        wv.uiDelegate = context.coordinator
        wv.allowsBackForwardNavigationGestures = true
        wv.scrollView.bounces = true

        model.webView = wv
        wv.load(URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData, timeoutInterval: 30))
        return wv
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}

// MARK: - Coordinator handles nav state & external links
final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate {
    private let model: WebModel
    // Allow localhost for development
    private let allowedHosts: Set<String> = [
        "localhost",
        "127.0.0.1",
        "192.168.1.57", // Your network IP
        "sungaze-app.vercel.app",
        "www.sungaze-app.vercel.app"
    ]

    init(model: WebModel) { self.model = model }

    func webView(_ webView: WKWebView, didStartProvisionalNavigation navigation: WKNavigation!) {
        model.isLoading = true
        model.canGoBack = webView.canGoBack
        model.canGoForward = webView.canGoForward
        model.currentURL = webView.url
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        model.isLoading = false
        model.canGoBack = webView.canGoBack
        model.canGoForward = webView.canGoForward
        model.currentURL = webView.url
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        model.isLoading = false
    }
    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        model.isLoading = false
    }

    // Open external hosts in SafariViewController
    func webView(_ webView: WKWebView, decidePolicyFor navAction: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if let host = navAction.request.url?.host, !allowedHosts.contains(host) {
            if let url = navAction.request.url {
                model.safariItem = SafariItem(url: url)
            }
            decisionHandler(.cancel)
            return
        }
        decisionHandler(.allow)
    }

    // Handle window.open / target="_blank"
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                 for navigationAction: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        guard let url = navigationAction.request.url else { return nil }
        if let host = url.host, !allowedHosts.contains(host) {
            model.safariItem = SafariItem(url: url)
            return nil
        }
        webView.load(URLRequest(url: url))
        return nil
    }
}
