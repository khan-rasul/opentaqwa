# OpenTaqwā Mobile 📱

OpenTaqwā is a premium, minimalistic spiritual companion app designed for the global Muslim community. Built with **React Native (Expo)** and **Tailwind CSS**, it offers a seamless and aesthetically pleasing experience across iOS and Android.

---

## ✨ Features

- **📖 al-Qur’ān:** Daily random verses with Arabic text and Hilali-Khan English translations.
- **✨ Asmā’ al-Husnā:** Reflection on the 99 Divine Names of Allah.
- **🕋 Qiblah:** Precise compass for finding the direction of the Kaaba.
- **🕌 Adhān & Prayer Times:** Smart prayer time detection based on location with live countdowns.
- **📿 Remembrance:** Curated collections of Dhikr, Durood, and Dua.
- **🎨 Premium Aesthetics:** Modern dark mode interface with glassmorphism effects and custom typography (**Montserrat**, **Quicksand**, **Great Vibes**).

---

## 🛠️ Tech Stack

- **Framework:** [Expo](https://expo.dev/) (React Native)
- **Styling:** [NativeWind](https://nativewind.dev/) (Tailwind CSS for React Native)
- **Animations:** [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- **Icons:** [Lucide React Native](https://lucide.dev/)
- **State Management:** React Context API
- **Fonts:** Expo Google Fonts

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/expo-go) app installed on your physical device (iOS/Android)

### Installation

This project is part of a monorepo. Follow these steps to set up the mobile app:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/khan-rasul/opentaqwa-chrome.git
   cd opentaqwa-chrome
   ```

2. **Install dependencies from the root:**
   ```bash
   npm install
   ```

3. **Navigate to the mobile directory:**
   ```bash
   cd mobile
   ```

---

##  Using on iOS

You can run OpenTaqwā on your iOS device or the iOS Simulator.

### 1. Using Physical Device (Recommended)
This is the easiest way to test the app with full access to sensors (like the compass for Qibla).

1. Install the **Expo Go** app from the [Apple App Store](https://apps.apple.com/app/expo-go/id982107779).
2. Ensure your Mac and iPhone are on the **same Wi-Fi network**.
3. Start the development server:
   ```bash
   npm run start
   ```
4. Open your iPhone's **Camera** and scan the QR code displayed in the terminal.
5. The app will open inside Expo Go.

### 2. Using iOS Simulator
Requires a Mac with **Xcode** installed.

1. Open Xcode and ensure Command Line Tools are installed.
2. Start the development server:
   ```bash
   npm run ios
   ```
3. The iOS Simulator will automatically launch and open the app.

---

## 🤖 Using on Android

### 1. Using Physical Device
1. Install **Expo Go** from the [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. Start the server: `npm run start`.
3. Scan the QR code using the Expo Go app.

### 2. Using Android Emulator
1. Open Android Studio and launch a Virtual Device (AVD).
2. Run:
   ```bash
   npm run android
   ```

---

## 📦 Deployment & Builds

The app uses **Expo Application Services (EAS)** for professional builds and deployment.

### Development Builds
For features requiring custom native code (outside of Expo Go):
```bash
npx eas build --profile development --platform ios
```

### Production Release
```bash
npx eas build --platform ios --profile production
```

---

## 📄 License

OpenTaqwā is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**. 
See the [LICENSE](../LICENSE) file in the root for details.

---

Made with ❤️ for the Ummah

OpenTaqwā - With Īmān as light and Taqwā as guide
