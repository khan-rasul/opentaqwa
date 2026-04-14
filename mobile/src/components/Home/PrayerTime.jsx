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
const KAABAH_IMAGE = require("../../../assets/kaabah.jpg");

export default function PrayerTime() {
  const { prayerTimes, nextPrayer, locationName, loading } = usePrayer();
  const [countdown, setCountdown] = useState("");

  const calculateCountdown = useCallback(() => {
    if (!nextPrayer) return;
    const diff = nextPrayer.date - new Date();
    if (diff <= 0) {
      setCountdown("00:00:00");
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    setCountdown(
      `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    );
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
        style={{
          height: 360,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "#000",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        }}
      >
        <LinearGradient
          colors={["#264872", "#1a3454"]}
          start={[0, 0]}
          end={[1, 1]}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontFamily: "Quicksand-Bold",
              marginTop: 12,
            }}
          >
            Loading Adhān times
          </Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View
      style={{
        height: 360,
        borderRadius: 16,
        backgroundColor: "#000",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      }}
    >
      <View style={{ flex: 1, borderRadius: 16, overflow: "hidden" }}>
        <ImageBackground
          source={KAABAH_IMAGE}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={[
              "rgba(38,72,114,0.45)",
              "rgba(26,52,84,0.65)",
              "rgba(15,23,42,0.75)",
            ]}
            start={[0, 0]}
            end={[1, 1]}
            style={{ flex: 1, padding: 20 }}
          >
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              {/* Header */}
              <View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    fontFamily: "Montserrat-Black",
                    marginBottom: 4,
                    letterSpacing: -0.5,
                  }}
                >
                  Adhān
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <MapPin size={12} color="rgba(255,255,255,0.8)" />
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.8)",
                      fontSize: 12,
                      fontFamily: "Quicksand-Medium",
                    }}
                  >
                    {locationName.city}
                    {locationName.country ? `, ${locationName.country}` : ""}
                  </Text>
                </View>
              </View>

              {/* Countdown */}
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 32,
                    fontFamily: "Montserrat-Black",
                    marginBottom: 8,
                    letterSpacing: 4,
                  }}
                >
                  {countdown || "--:--:--"}
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 15,
                    fontFamily: "Quicksand-Bold",
                    marginBottom: 12,
                  }}
                >
                  Until {nextPrayer?.name} ({nextPrayer?.arabic})
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                    fontFamily: "Quicksand-Medium",
                    fontStyle: "italic",
                    textAlign: "center",
                    lineHeight: 16,
                    paddingHorizontal: 20,
                  }}
                >
                  "Indeed, performing prayers is a duty on the believers at the
                  appointed times."
                </Text>
              </View>

              {/* Prayer list */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  {prayerTimes.map((prayer) => {
                    const IconComponent = PRAYER_ICONS[prayer.id];
                    const isNext = nextPrayer?.id === prayer.id;
                    return (
                      <View
                        key={prayer.id}
                        style={{
                          alignItems: "center",
                          flex: 1,
                          opacity: isNext ? 1 : 0.7,
                        }}
                      >
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 6,
                            backgroundColor: isNext
                              ? "rgba(255,255,255,0.15)"
                              : "rgba(255,255,255,0.05)",
                            borderWidth: isNext ? 1 : 0,
                            borderColor: "rgba(255,255,255,0.2)",
                          }}
                        >
                          <IconComponent
                            size={20}
                            color={isNext ? "#fff" : "rgba(255,255,255,0.8)"}
                            strokeWidth={2}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 11,
                            fontFamily: isNext
                              ? "Montserrat-Black"
                              : "Montserrat-Bold",
                            color: isNext ? "white" : "rgba(255,255,255,0.8)",
                            marginBottom: 2,
                          }}
                        >
                          {prayer.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontFamily: "Quicksand-Bold",
                            color: isNext
                              ? "rgba(255,255,255,0.95)"
                              : "rgba(255,255,255,0.7)",
                          }}
                        >
                          {prayer.time}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {/* Progress dots */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  {prayerTimes.map((prayer, i) => (
                    <View
                      key={i}
                      style={{
                        height: 6,
                        borderRadius: 3,
                        width: nextPrayer?.id === prayer.id ? 20 : 6,
                        backgroundColor:
                          nextPrayer?.id === prayer.id
                            ? "rgba(255,255,255,0.95)"
                            : "rgba(255,255,255,0.25)",
                      }}
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
