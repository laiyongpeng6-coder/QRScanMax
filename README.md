# QRMax - Android QR/Barcode Scanner

An Android native QR code and barcode scanner application built with **Kotlin** and **Jetpack Compose**.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | Kotlin 2.2.10 |
| UI | Jetpack Compose + Material 3 |
| Camera | CameraX 1.4.1 |
| Barcode Detection | Google ML Kit Barcode Scanning 17.3.0 |
| Navigation | Navigation Compose 2.8.8 |
| Architecture | MVVM + StateFlow |
| Build | Gradle 9.4.1, AGP 9.2.1 |
| Min SDK | API 24 (Android 7.0) |
| Target SDK | API 36 (Android 15) |

## Project Structure

```
app/src/main/java/com/example/qrmax/
├── MainActivity.kt
├── data/
│   ├── model/ScannedItem.kt
│   └── parser/QRParser.kt
├── viewmodel/
│   └── AppViewModel.kt
├── ui/
│   ├── screens/
│   │   ├── SplashScreen.kt
│   │   ├── OnboardingScreen.kt
│   │   ├── ScannerScreen.kt
│   │   ├── HistoryScreen.kt
│   │   ├── ResultScreen.kt
│   │   ├── GeneratorScreen.kt
│   │   ├── CreateQRScreen.kt
│   │   ├── CreateBarcodeScreen.kt
│   │   ├── BeautifyScreen.kt
│   │   └── SettingsScreen.kt
│   ├── components/
│   │   ├── ScanningOverlay.kt
│   │   ├── BottomNavBar.kt
│   │   └── MockNativeAd.kt
│   └── theme/
│       ├── Color.kt
│       ├── Theme.kt
│       └── Type.kt
```

## Features
- QR/Barcode scanning with CameraX + ML Kit
- Beautify workspace with custom colors, icons, and templates
- Scan history with detailed results
- Multi-format support: URL, WiFi, vCard, Geo, ISBN, UPC, EAN-13
- Smooth animations with AnimatedContent

## Build
Open in Android Studio, sync Gradle, and run on device/emulator with API 24+.
