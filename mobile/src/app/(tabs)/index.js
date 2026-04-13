import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Tagline from "@/components/Home/Tagline";
import PrayerTime from "@/components/Home/PrayerTime";
import Card from "@/components/Home/Card";
import FeatureCards from "@/components/Home/FeatureCards";

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 12,
        paddingTop: 8,
        paddingBottom: insets.bottom + 24,
      }}
    >
      <View className="flex flex-col gap-2">
        {/* First row - Dhikr and Durood */}
        <View className="flex-row gap-2 h-[100px]">
          <View className="flex-[8]">
            <Card
              title="Dhikr"
              subtitle="Remembrance"
              route="/dhikr"
              gradientColors={["#625443", "#4a3f32"]}
            />
          </View>
          <View className="flex-[10]">
            <Card
              title="Durūd"
              subtitle="Blessings"
              route="/durood"
              gradientColors={["#263936", "#1a2725"]}
            />
          </View>
        </View>

        {/* Second row - Dua and Tagline */}
        <View className="flex-row gap-2 h-[100px]">
          <View className="flex-[2]">
            <Card
              title="Du'ā"
              subtitle="Supplication"
              route="/dua"
              gradientColors={["#5E4B56", "#463640"]}
            />
          </View>
          <View className="flex-1">
            <Tagline />
          </View>
        </View>

        <PrayerTime />
        <FeatureCards />
      </View>
    </ScrollView>
  );
}
