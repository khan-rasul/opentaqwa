import "../global.css";
import { useEffect } from "react";
import { Slot } from "expo-router";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black
} from '@expo-google-fonts/montserrat';
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold
} from '@expo-google-fonts/quicksand';
import { GreatVibes_400Regular } from '@expo-google-fonts/great-vibes';

import Header from "@/components/Header";
import { PrayerProvider } from "@/context/PrayerContext";
import { AuthProvider } from "@/context/AuthContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function LayoutContent() {
  const insets = useSafeAreaInsets();
  const [loaded, error] = useFonts({
    'Montserrat': Montserrat_400Regular,
    'Montserrat-Bold': Montserrat_700Bold,
    'Montserrat-ExtraBold': Montserrat_800ExtraBold,
    'Montserrat-Black': Montserrat_900Black,
    'Quicksand': Quicksand_400Regular,
    'Quicksand-Medium': Quicksand_500Medium,
    'Quicksand-SemiBold': Quicksand_600SemiBold,
    'Quicksand-Bold': Quicksand_700Bold,
    'GreatVibes': GreatVibes_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

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
      <AuthProvider>
        <PrayerProvider>
          <LayoutContent />
        </PrayerProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
