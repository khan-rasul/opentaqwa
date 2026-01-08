import "../global.css";
import { Slot } from "expo-router";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "@/components/Header";

function LayoutContent() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0d0c" }}>
      <LinearGradient
        colors={["#3d3530", "#2a2522", "#1a1614", "#0f0d0c"]}
        locations={[0, 0.3, 0.7, 1]}
        style={{ flex: 1 }}
      >
        <StatusBar style="light" />
        {/* Persistent Header */}
        <View style={{
          paddingTop: insets.top + 8,
          paddingHorizontal: 12,
          zIndex: 100
        }}>
          <Header />
        </View>

        {/* Content Area */}
        <View style={{ flex: 1 }}>
          <Slot />
        </View>
      </LinearGradient>
    </View>
  );
}

export default function Layout() {
  return (
    <SafeAreaProvider>
      <LayoutContent />
    </SafeAreaProvider>
  );
}
