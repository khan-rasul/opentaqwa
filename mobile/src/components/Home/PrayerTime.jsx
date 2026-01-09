import React, { useState, useEffect, useCallback } from "react";
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
import { usePrayer } from "@/context/PrayerContext";

const PRAYER_ICONS = {
  Fajr: Sunrise,
  Dhuhr: Sun,
  Asr: CloudSun,
  Maghrib: Sunset,
  Isha: Moon,
};

const KAABAH_IMAGE = require("../../../assets/kaabah.jpeg");

export default function PrayerTime() {
  const { prayerTimes, nextPrayer, locationName, loading } = usePrayer();
  const [countdown, setCountdown] = useState("");

  const calculateCountdown = useCallback(() => {
    if (!nextPrayer) return;

    const now = new Date();
    const diff = nextPrayer.date - now;

    if (diff <= 0) {
      setCountdown("00:00:00");
      return;
    }

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    setCountdown(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`);
  }, [nextPrayer]);

  useEffect(() => {
    if (!nextPrayer) return;

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, [nextPrayer, calculateCountdown]);

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
          source={KAABAH_IMAGE}
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
                <Text className="text-white text-xl font-montserrat font-bold mb-1 tracking-tight">
                  Adhān
                </Text>
                <View className="flex-row items-center gap-1">
                  <MapPin size={12} color="rgba(255, 255, 255, 0.8)" />
                  <Text className="text-white/80 text-[12px] font-quicksand font-medium">
                    {locationName.city}{locationName.country ? `, ${locationName.country}` : ''}
                  </Text>
                </View>
              </View>

              {/* Middle Section - Countdown */}
              <View className="items-center py-5">
                <Text className="text-white text-[32px] font-montserrat font-black mb-2 tracking-widest">
                  {countdown || "--:--:--"}
                </Text>
                <Text className="text-white/90 text-[15px] font-quicksand font-bold mb-3">
                  Until {nextPrayer?.name} ({nextPrayer?.arabic})
                </Text>
                <Text className="text-white/70 text-[11px] font-quicksand italic text-center leading-4 px-5">
                  "Indeed, performing prayers is a duty on the believers at the
                  appointed times."
                </Text>
              </View>

              {/* Footer - Prayer Times */}
              <View>
                <View className="flex-row justify-between mb-4">
                  {prayerTimes.map((prayer) => {
                    const IconComponent = PRAYER_ICONS[prayer.id];
                    const isNext = nextPrayer?.id === prayer.id;
                    return (
                      <View
                        key={prayer.id}
                        className={`items-center flex-1 ${isNext ? 'opacity-100' : 'opacity-70'}`}
                      >
                        <View
                          className={`w-10 h-10 rounded-full justify-center items-center mb-1.5 border-white/20
                            ${isNext ? 'bg-white/15 border' : 'bg-white/5 border-0'}`}
                        >
                          <IconComponent
                            size={20}
                            color={isNext ? "#FFFFFF" : "rgba(255, 255, 255, 0.8)"}
                            strokeWidth={2}
                          />
                        </View>
                        <Text className={`text-[11px] mb-0.5 font-montserrat ${isNext ? 'text-white font-black' : 'text-white/80 font-bold'}`}>
                          {prayer.name}
                        </Text>
                        <Text className={`text-[10px] font-quicksand font-bold ${isNext ? 'text-white/95' : 'text-white/70'}`}>
                          {prayer.time}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {/* Prayer indicators */}
                <View className="flex-row justify-center gap-1.5">
                  {prayerTimes.map((prayer, index) => (
                    <View
                      key={index}
                      className={`h-1.5 rounded-full ${nextPrayer?.id === prayer.id ? 'w-5 bg-white/95' : 'w-1.5 bg-white/25'}`}
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
