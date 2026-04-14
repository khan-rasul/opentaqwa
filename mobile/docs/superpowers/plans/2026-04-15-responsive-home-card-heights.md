# Responsive Home Card Heights Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scale the home screen card row heights proportionally to screen height so 6.5" iPhones don't look under-filled relative to 6" iPhones.

**Architecture:** The home screen (`src/app/index.js`) currently uses hardcoded heights (`100`, `100`, `minHeight: 120`) that were tuned for a 6" iPhone (~844pt tall). On 6.5" iPhones (~896–932pt) the cards look shrunken because they don't fill the extra vertical space. Fix: compute a scale factor from `useWindowDimensions()` against the 6" baseline, clamped to `>= 1` so smaller phones remain unchanged, and multiply the three card heights by it.

**Tech Stack:** React Native (Expo SDK 54), `useWindowDimensions` from `react-native`.

---

## File Structure

Only one file is modified — no new files. The scale factor is trivial and local to the home screen, so a dedicated hook would be over-engineered (YAGNI).

- Modify: `src/app/index.js` — add `useWindowDimensions`, derive `scale`, apply to the two row heights and the feature-card minHeight.

The `FeatureCards` component's `minHeight: 120` lives inside `src/components/Home/FeatureCards.jsx`. To keep the scaling in one place, we lift that height out of the component by passing a `minHeight` prop (or removing it entirely and letting the parent control it via a wrapper `View`). This plan uses the **wrapper `View`** approach: zero change to `FeatureCards.jsx`, parent controls the height via a flex container. `FeatureCards` already uses `flex: 1` on each card, so giving it a sized wrapper works cleanly.

---

### Task 1: Scale home card row heights

**Files:**
- Modify: `src/app/index.js:11-70` (entire `Page` component)

- [ ] **Step 1: Read current file to confirm line numbers**

Run: Read `src/app/index.js`

Expected: confirms the three hardcoded heights (`height: 100` on lines 26 and 46, `<FeatureCards />` on line 67 with no wrapper height).

- [ ] **Step 2: Add `useWindowDimensions` import and compute scale**

Replace the imports + top of `Page` so it reads:

```jsx
import React from "react";
import { ScrollView, View, Pressable, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Tagline from "@/components/Home/Tagline";
import PrayerTime from "@/components/Home/PrayerTime";
import Card from "@/components/Home/Card";
import FeatureCards from "@/components/Home/FeatureCards";

// 6" iPhone (e.g. iPhone 14) is ~844pt tall — our design baseline.
// Taller phones scale up proportionally; shorter phones stay unchanged.
const BASELINE_HEIGHT = 844;

export default function Page() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const scale = Math.max(1, height / BASELINE_HEIGHT);

  const rowHeight = Math.round(100 * scale);
  const featureHeight = Math.round(120 * scale);
```

- [ ] **Step 3: Apply `rowHeight` to both card rows**

Replace `height: 100` with `height: rowHeight` on both rows. Full JSX:

```jsx
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 12,
        paddingTop: 8,
        paddingBottom: insets.bottom + 24,
        gap: 8,
      }}
    >
      {/* Row 1: Dhikr + Durood */}
      <View style={{ flexDirection: "row", gap: 8, height: rowHeight }}>
        <View style={{ flex: 8 }}>
          <Card
            title="Dhikr"
            subtitle="Remembrance"
            route="/dhikr"
            gradientColors={["#625443", "#4a3f32"]}
          />
        </View>
        <View style={{ flex: 10 }}>
          <Card
            title="Durūd"
            subtitle="Salutation"
            route="/durood"
            gradientColors={["#263936", "#1a2725"]}
          />
        </View>
      </View>

      {/* Row 2: Dua + Tagline */}
      <View style={{ flexDirection: "row", gap: 8, height: rowHeight }}>
        <View style={{ flex: 2 }}>
          <Card
            title="Du'ā"
            subtitle="Supplication"
            route="/dua"
            gradientColors={["#5E4B56", "#463640"]}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Tagline />
        </View>
      </View>

      <Pressable
        onPress={() => router.push("/prayer")}
        style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
      >
        <PrayerTime />
      </Pressable>

      <View style={{ minHeight: featureHeight }}>
        <FeatureCards />
      </View>
    </ScrollView>
  );
}
```

Note: `FeatureCards` renders a `flexDirection: "row"` with `flex: 1` children, so the wrapper `View`'s `minHeight` propagates to the children. `FeatureCards.jsx` itself already has `minHeight: 120` on each card, which becomes the floor — we're only increasing it on larger screens, never decreasing, so it's safe to leave `FeatureCards.jsx` untouched.

- [ ] **Step 4: Run the app and verify on 6" and 6.5" simulators**

Run:

```bash
npx expo start --clear
```

Then:
1. Launch on iPhone 14 simulator (6.1", 844pt) — heights should look identical to before (`scale === 1`).
2. Launch on iPhone 14 Plus simulator (6.7", 932pt) — heights should be ~10% larger (`scale ≈ 1.10`), cards visibly taller, layout fills the screen.
3. Launch on iPhone SE (3rd gen, 4.7", 667pt) — `scale` clamped to 1, heights unchanged.

Expected: no regressions on 6", visibly improved proportions on 6.5"+, no crashes, `useWindowDimensions` updates on device rotation (not expected since app is portrait-locked, but harmless).

- [ ] **Step 5: Commit**

```bash
git add src/app/index.js
git commit -m "feat: scale home card heights proportionally on taller screens"
```

---

## Verification

End-to-end check:

1. Start the dev server with `npx expo start --clear` from `mobile/`.
2. Open on a 6" device (iPhone 14) — home screen should look identical to current production.
3. Open on a 6.5"+ device (iPhone 14 Plus, 15 Pro Max) — cards should be proportionally taller, no empty gap at the bottom.
4. Confirm tapping still navigates correctly for all cards (Dhikr, Durūd, Du'ā, Qur'ān, Qiblah, al-Asmā').
5. Confirm no layout warnings in the Metro console.

## Notes / Non-Goals

- We do **not** touch inner pages (`/prayer`, `/quran`, `/names`, etc.) — the user confirmed this is specifically about the home cards.
- We do **not** scale fonts, icons, or paddings — only the card container heights, since that's what's visually shrunk.
- We do **not** introduce a shared responsive hook — only one screen needs this today (YAGNI). If a second screen needs the same treatment later, extract then.
