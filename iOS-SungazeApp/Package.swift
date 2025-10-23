// Package.swift
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SungazeApp",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "SungazeApp",
            targets: ["SungazeApp"]),
    ],
    dependencies: [
        // No external dependencies for App Store approval
    ],
    targets: [
        .target(
            name: "SungazeApp",
            dependencies: []),
        .testTarget(
            name: "SungazeAppTests",
            dependencies: ["SungazeApp"]),
    ]
)
