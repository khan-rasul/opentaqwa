# OpenTaqwā Mobile MVP — Design Spec

**Date:** 2026-04-11  
**Goal:** TestFlight-ready iOS build  
**Approach:** Local-first, no backend, native tab bar navigation

---

## Overview

Finish the OpenTaqwā mobile app to a TestFlight-ready state by restructuring navigation into a native iOS tab bar, populating content collections with authentic static data, wiring local persistence via AsyncStorage, and configuring EAS Build for iOS submission. Auth is removed entirely for this MVP.

---

## 1. Navigation Architecture

### Route Structure

```
mobile/src/app/
├── _layout.js                  ← root layout (AuthProvider removed)
├── (tabs)/
│   ├── _layout.js              ← tab bar definition + custom tab bar component
│   ├── index.js                ← Home tab
│   ├── prayer.js               ← Prayer Times tab
│   ├── quran.js                ← Qur'ān tab
│   ├── dua.js                  ← Du'ā tab
│   └── more.js                 ← More tab (grid of secondary features)
├── dhikr/index.js              ← stack screen, navigated from More
├── durood/index.js             ← stack screen, navigated from More
├── qibla/index.js              ← stack screen, navigated from More
└── names/index.js              ← stack screen, navigated from More
```

Auth routes (`/auth/login`, `/auth/register`) are deleted. `AuthProvider` is removed from `_layout.js`. The `Header` component loses its login/avatar button.

### Tab Bar Design

- **Background:** `#0f0d0c` (matches app background)
- **Top border:** 1px `rgba(255,255,255,0.08)`
- **Active tab:** icon + label in gold `#af8f69`
- **Inactive tab:** icon + label at `rgba(255,255,255,0.3)`
- **Label font:** Quicksand SemiBold, 10px, uppercase tracking
- **No blur/frosted glass** — sharp to match the premium minimal aesthetic

### Tabs

| Tab | Route | Icon (lucide) | Notes |
|-----|-------|---------------|-------|
| Home | `/(tabs)/` | `Home` | Current dashboard, unchanged |
| Prayer | `/(tabs)/prayer` | `Moon` | Full prayer times screen |
| Qur'ān | `/(tabs)/quran` | `BookOpen` | Current verse swiper |
| Du'ā | `/(tabs)/dua` | `Hand` | Expanded content collection |
| More | `/(tabs)/more` | `Grid3x3` | Grid: Dhikr, Durood, Qibla, Names |

---

## 2. Screens

### Home Tab
Current home screen unchanged. Contains:
- Next prayer mini-widget (from PrayerContext)
- Feature cards: Dhikr, Durood, Dua (navigate to stack screens)
- Feature cards: Qur'ān, Names of Allah, Qibla
- Tagline component

### Prayer Tab
The existing `PrayerTime` home component promoted to a full screen.
- All 5 prayer times displayed in a list
- Next prayer highlighted with live countdown timer
- City/country name from `PrayerContext`
- Refresh button to re-fetch (calls `PrayerContext.refresh()`)
- Prayer times cached to AsyncStorage so the last-known times show on cold open before the network call completes

### Qur'ān Tab
Current Quran screen as-is. One change: `isFavorited` state replaced with `useFavorites('quran')` hook backed by AsyncStorage.

### Du'ā Tab
Current HeroView-based Dua screen with full content dataset.  
Categories: All · Morning · Evening · Travel · Food · Sleep · General · Favorites  
Favorites wired to `useFavorites('dua')`.

### More Tab
A scrollable grid of 4 feature cards styled like the home feature cards:
- **Dhikr** → navigates to `/dhikr`
- **Durood** → navigates to `/durood`
- **Qibla** → navigates to `/qibla`
- **Names of Allah** → navigates to `/names`

### Dhikr / Durood Stack Screens
Existing screens unchanged except:
- Content replaced with full static datasets (see Section 3)
- Favorites wired to `useFavorites('dhikr')` / `useFavorites('durood')`

---

## 3. Static Content

Three new data files in `shared/src/data/`:

### `dhikr.js` — ~35 adhkar
Sources: Hisnul Muslim (Fortress of the Muslim)  
Fields: `id`, `arabic`, `transliteration`, `translation`, `benefit`, `reference`, `category`  
Categories: `morning` · `evening` · `all`

### `duas.js` — ~35 duas
Sources: Hisnul Muslim, Qur'anic duas  
Fields: same as dhikr  
Categories: `morning` · `evening` · `travel` · `food` · `sleep` · `general`

### `durood.js` — ~15 salawat
Sources: well-known narrations  
Fields: same as dhikr  
Categories: `short` · `blessings`

All data is hardcoded JavaScript — no network requests, works fully offline.

---

## 4. Local Persistence

### `useFavorites(key)` Hook
Location: `mobile/src/hooks/useFavorites.js`

```
useFavorites(key: string) → { favorites: Set<id>, toggle(id), isFavorite(id) }
```

- Backed by `AsyncStorage` with key prefix `opentaqwa:favorites:`
- Loads on mount, persists on every toggle
- Used by: Dhikr, Dua, Durood, Qur'ān screens

### Prayer Cache
Key: `opentaqwa:prayer:cache`  
Shape: `{ city, country, timings, date }` (date as YYYY-MM-DD string)  
Written by `PrayerContext` after a successful fetch.  
On cold open, cached data is shown immediately while a fresh fetch runs in the background. Cache is invalidated when the date changes.

### AsyncStorage Dependency
`@react-native-async-storage/async-storage` — add to `mobile/package.json`.

---

## 5. Auth Removal

- Delete `mobile/src/app/auth/` directory
- Remove `AuthProvider` import and wrapper from `mobile/src/app/_layout.js`
- Remove `useAuth` references from `Header` component
- Remove `authApi` from `shared/src/index.js` exports (or leave — it's unused)
- `AuthContext.js` can be deleted

---

## 6. EAS / TestFlight Configuration

### `mobile/app.json` changes
```json
{
  "expo": {
    "name": "OpenTaqwā",
    "slug": "opentaqwa",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.opentaqwa.app",
      "buildNumber": "1",
      "supportsTablet": false
    },
    "plugins": [
      ["expo-location", {
        "locationWhenInUsePermission": "OpenTaqwā uses your location to calculate prayer times and Qibla direction."
      }]
    ]
  }
}
```

### `mobile/eas.json`
```json
{
  "cli": { "version": ">= 7.0.0" },
  "build": {
    "production": {
      "ios": { "simulator": false }
    },
    "preview": {
      "ios": { "simulator": true }
    }
  }
}
```

### Build Command
```bash
cd mobile && eas build --platform ios --profile production
```

---

## 7. Out of Scope (Post-MVP)

- Audio recitation (`onPlayAudio` handlers remain no-ops)
- Share in Dhikr/Durood (Qur'ān share already works via native Share API)
- Prayer time push notifications
- Dark/light theme toggle
- User accounts / backend sync
- Tasbih counter
- Hijri calendar

---

## 8. Implementation Order

1. **Navigation refactor** — create `(tabs)/_layout.js`, custom tab bar component, move screens into tabs, delete auth routes, remove AuthProvider
2. **Static content** — write `dhikr.js`, `duas.js`, `durood.js` data files in shared, wire into screens
3. **Persistence** — implement `useFavorites` hook, replace in-memory favorites in all screens; add prayer cache to PrayerContext
4. **Prayer tab** — build full Prayer screen from existing PrayerTime component
5. **More tab** — build grid screen linking to secondary feature screens
6. **EAS config** — update `app.json`, add `eas.json`, verify build
