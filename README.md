# OpenTaqwā (OpenTaqwa) - Spiritual Companion Monorepo 🕋

OpenTaqwā is a modern, premium spiritual companion suite for the Muslim Ummah. It is designed with a focus on high-end aesthetics, minimal distraction, and spiritual utility across multiple platforms.

---

## 📂 Project Structure

This is a monorepo managed with **npm workspaces**.

- **[`/mobile`](./mobile)**: Premium mobile application built with **React Native (Expo)** and **Tailwind CSS**.
- **[`/chrome`](./chrome)**: Feature-rich **Chrome Extension** for browser-based reminders and tools.
- **[`/shared`](./shared)**: Core business logic, API services (Quran, Names of Allah, Prayer Times), and static data shared across all platforms.

---

## 🚀 Quick Start

### 1. Global Setup
Install dependencies for all workspaces from the project root:
```bash
npm install
```

### 2. Development

- **To start the Mobile App:**
  ```bash
  cd mobile
  npm run start
  ```

- **To build the Chrome Extension:**
  ```bash
  cd chrome
  npm run build
  ```

- **To run tests (Shared package):**
  ```bash
  npm test -w shared
  ```

---

## 🎨 Design Philosophy

OpenTaqwā prioritizes **Premium Minimalism**. We avoid generic templates in favor of:
- **Rich Typography**: Custom pairings of *Montserrat*, *Quicksand*, and *Great Vibes*.
- **Modern UI Patterns**: Glassmorphism, subtle gradients, and smooth reanimated transitions.
- **Accessibility**: High-contrast Arabic typography and RTL support.

---

## 📜 License & Legal

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**. 

- **Attribution**: You must give appropriate credit to the original author (Rasul Khan).
- **Non-Commercial**: You may not use the material for commercial purposes.

For full details, please refer to the following files:
- [LICENSE](./LICENSE)
- [TERMS](./TERMS.md)
- [PRIVACY](./PRIVACY.md)

---

Made with ❤️ for the Ummah

OpenTaqwā - With Īmān as light and Taqwā as guide
