import React from "react";
import { ScrollView, View, Pressable, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import Tagline from "@/components/Home/Tagline";
import PrayerTime from "@/components/Home/PrayerTime";
import Card from "@/components/Home/Card";
import FeatureCards from "@/components/Home/FeatureCards";

// 6" iPhone (~844pt) is our design baseline; taller screens scale up.
const BASELINE_HEIGHT = 844;

export default function Page() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { height } = useWindowDimensions();
  const scale = Math.max(1, height / BASELINE_HEIGHT);
  const rowHeight = Math.round(110 * scale);
  const featureHeight = Math.round(130 * scale);

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
