import "../global.css";
import { Slot } from "expo-router";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { PrayerProvider } from "@/context/PrayerContext";

function LayoutContent() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-[#0f0d0c]">
      <LinearGradient
        colors={["#3d3530", "#2a2522", "#1a1614", "#0f0d0c"]}
        locations={[0, 0.3, 0.7, 1]}
        style={{ flex: 1 }}
      >
        <StatusBar style="light" />
        {/* Persistent Header */}
        <View
          className="px-3 z-[100]"
          style={{ paddingTop: insets.top + 8 }}
        >
          <Header />
        </View>

        {/* Content Area */}
        <View className="flex-1">
          <Slot />
        </View>
      </LinearGradient>
    </View>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <PrayerProvider>
        <LayoutContent />
      </PrayerProvider>
    </SafeAreaProvider>
  );
}
