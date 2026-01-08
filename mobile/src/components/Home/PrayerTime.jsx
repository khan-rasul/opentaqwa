import React, { useState, useEffect } from "react";
import { View, Text, ImageBackground, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MapPin,
  Sunrise,
  Sun,
  CloudSun,
  Sunset,
  Moon,
} from "lucide-react-native";

// Mock data - replace with actual hooks later
const mockPrayerTimes = [
  {
    name: "Fajr",
    arabic: "الفجر",
    time: "5:30 AM",
    icon: Sunrise,
    next: false,
  },
  {
    name: "Dhuhr",
    arabic: "الظهر",
    time: "12:45 PM",
    icon: Sun,
    next: false,
  },
  {
    name: "Asr",
    arabic: "العصر",
    time: "3:30 PM",
    icon: CloudSun,
    next: true,
  },
  {
    name: "Maghrib",
    arabic: "المغرب",
    time: "6:15 PM",
    icon: Sunset,
    next: false,
  },
  {
    name: "Isha",
    arabic: "العشاء",
    time: "7:45 PM",
    icon: Moon,
    next: false,
  },
];

const BACKGROUND_IMAGE_URL =
  "https://images.pexels.com/photos/33759665/pexels-photo-33759665.jpeg";

export default function PrayerTime() {
  const [countdown, setCountdown] = useState("02:15:30");
  const [loading, setLoading] = useState(false);
  const location = { city: "New York", country: "USA" };
  const nextPrayer = mockPrayerTimes.find((prayer) => prayer.next);

  useEffect(() => {
    const timer = setInterval(() => {
      // Update countdown logic here
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <View
        className="h-[360px] rounded-2xl overflow-hidden shadow-black"
        style={{
          shadowOffset: { width: 6, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 18,
          elevation: 18,
        }}
      >
        <LinearGradient
          colors={["#264872", "#1a3454"]}
          start={[0, 0]}
          end={[1, 1]}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text className="text-white text-base font-semibold mt-3">
            Loading Adhān times
          </Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View
      className="h-[360px] rounded-2xl bg-black shadow-black"
      style={{
        shadowOffset: { width: 6, height: 10 },
        shadowOpacity: 0.45,
        shadowRadius: 18,
        elevation: 18,
      }}
    >
      <View className="flex-1 rounded-2xl overflow-hidden">
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE_URL }}
          className="flex-1"
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              "rgba(38, 72, 114, 0.45)",
              "rgba(26, 52, 84, 0.65)",
              "rgba(15, 23, 42, 0.75)",
            ]}
            start={[0, 0]}
            end={[1, 1]}
            style={{ flex: 1, padding: 20 }}
          >
            <View className="flex-1 justify-between">
              {/* Header */}
              <View>
                <Text className="text-white text-xl font-bold mb-1 tracking-tight">
                  Adhān
                </Text>
                <View className="flex-row items-center gap-1">
                  <MapPin size={12} color="rgba(255, 255, 255, 0.8)" />
                  <Text className="text-white/80 text-[12px] font-medium">
                    {location.city}, {location.country}
                  </Text>
                </View>
              </View>

              {/* Middle Section - Countdown */}
              <View className="items-center py-5">
                <Text className="text-white text-[32px] font-bold mb-2 tracking-widest">
                  {countdown}
                </Text>
                <Text className="text-white/90 text-[15px] font-semibold mb-3">
                  Until {nextPrayer?.name} ({nextPrayer?.arabic})
                </Text>
                <Text className="text-white/70 text-[11px] italic text-center leading-4 px-5">
                  "Indeed, performing prayers is a duty on the believers at the
                  appointed times."
                </Text>
              </View>

              {/* Footer - Prayer Times */}
              <View>
                <View className="flex-row justify-between mb-4">
                  {mockPrayerTimes.map((prayer) => {
                    const IconComponent = prayer.icon;
                    return (
                      <View
                        key={prayer.name}
                        className={`items-center flex-1 ${prayer.next ? 'opacity-100' : 'opacity-70'}`}
                      >
                        <View
                          className={`w-10 h-10 rounded-full justify-center items-center mb-1.5 border-white/20
                            ${prayer.next ? 'bg-white/15 border' : 'bg-white/5 border-0'}`}
                        >
                          <IconComponent
                            size={20}
                            color={prayer.next ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)"}
                            strokeWidth={2}
                          />
                        </View>
                        <Text className={`text-[11px] mb-0.5 ${prayer.next ? 'text-white font-bold' : 'text-white/80 font-semibold'}`}>
                          {prayer.name}
                        </Text>
                        <Text className={`text-[10px] font-medium ${prayer.next ? 'text-white/95' : 'text-white/70'}`}>
                          {prayer.time}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {/* Prayer indicators */}
                <View className="flex-row justify-center gap-1.5">
                  {mockPrayerTimes.map((prayer, index) => (
                    <View
                      key={index}
                      className={`h-1.5 rounded-full ${prayer.next ? 'w-5 bg-white/95' : 'w-1.5 bg-white/25'}`}
                    />
                  ))}
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </View>
  );
}
