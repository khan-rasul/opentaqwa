import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import Header from "@/components/Header";
import Tagline from "@/components/Tagline";
import PrayerTime from "@/components/PrayerTime";
import Footer from "@/components/Footer";
import Card from "@/components/Home/Card";
import FeatureCards from "@/components/Home/FeatureCards";

export default function Page() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: "#0f0d0c" }}>
        <LinearGradient
          colors={["#3d3530", "#2a2522", "#1a1614", "#0f0d0c"]}
          locations={[0, 0.3, 0.7, 1]}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 12,
              paddingTop: insets.top + 8,
              paddingBottom: insets.bottom + 24,
            }}
          >
            <View className="flex flex-col gap-3">
              <Header />

              {/* First row - Dhikr and Durood */}
              <View className="flex-row gap-3" style={{ height: 100 }}>
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
                    subtitle="Blessings"
                    route="/durood"
                    gradientColors={["#263936", "#1a2725"]}
                  />
                </View>
              </View>

              {/* Second row - Dua and Tagline */}
              <View className="flex-row gap-3" style={{ height: 100 }}>
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

              <PrayerTime />
              <FeatureCards />
              <Footer />
            </View>
          </ScrollView>
        </LinearGradient>
      </View>
    </>
  );
}
