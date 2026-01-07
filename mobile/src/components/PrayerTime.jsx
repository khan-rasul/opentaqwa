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
        style={{
          height: 360,
          borderRadius: 20,
          overflow: "hidden",
          shadowColor: "#000",
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
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "600",
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
        borderRadius: 20,
        backgroundColor: "black", // IMPORTANT for iOS
        shadowColor: "#000",
        shadowOffset: { width: 6, height: 10 },
        shadowOpacity: 0.45,
        shadowRadius: 18,
        elevation: 18,
      }}
    >
      <View style={{ borderRadius: 20, overflow: "hidden", flex: 1 }}>
        <ImageBackground
          source={{ uri: BACKGROUND_IMAGE_URL }}
          style={{ flex: 1 }}
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
            {/* Subtle top shine - matching card style */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "35%",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
              }}
            />

            <View style={{ flex: 1, justifyContent: "space-between" }}>
              {/* Header */}
              <View>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 20,
                    fontWeight: "700",
                    marginBottom: 4,
                    letterSpacing: 0.3,
                  }}
                >
                  Adhān
                </Text>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                >
                  <MapPin size={12} color="rgba(255, 255, 255, 0.8)" />
                  <Text
                    style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    {location.city}, {location.country}
                  </Text>
                </View>
              </View>

              {/* Middle Section - Countdown */}
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 32,
                    fontWeight: "700",
                    marginBottom: 8,
                    letterSpacing: 1,
                  }}
                >
                  {countdown}
                </Text>
                <Text
                  style={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 12,
                  }}
                >
                  Until {nextPrayer?.name} ({nextPrayer?.arabic})
                </Text>
                <Text
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 11,
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

              {/* Footer - Prayer Times */}
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 16,
                  }}
                >
                  {mockPrayerTimes.map((prayer) => {
                    const IconComponent = prayer.icon; // Store the component
                    return (
                      <View
                        key={prayer.name}
                        style={{
                          alignItems: "center",
                          flex: 1,
                          opacity: prayer.next ? 1 : 0.7,
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
                            backgroundColor: prayer.next
                              ? "rgba(255, 255, 255, 0.15)"
                              : "rgba(255, 255, 255, 0.05)",
                            borderWidth: prayer.next ? 1 : 0,
                            borderColor: "rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          <IconComponent
                            size={20}
                            color={
                              prayer.next
                                ? "#FFFFFF"
                                : "rgba(255, 255, 255, 0.8)"
                            }
                            strokeWidth={2}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: prayer.next ? "700" : "600",
                            color: prayer.next
                              ? "#FFFFFF"
                              : "rgba(255, 255, 255, 0.8)",
                            marginBottom: 2,
                          }}
                        >
                          {prayer.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            fontWeight: "500",
                            color: prayer.next
                              ? "rgba(255, 255, 255, 0.95)"
                              : "rgba(255, 255, 255, 0.7)",
                          }}
                        >
                          {prayer.time}
                        </Text>
                      </View>
                    );
                  })}
                </View>

                {/* Prayer indicators */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  {mockPrayerTimes.map((prayer, index) => (
                    <View
                      key={index}
                      style={{
                        width: prayer.next ? 20 : 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: prayer.next
                          ? "rgba(255, 255, 255, 0.95)"
                          : "rgba(255, 255, 255, 0.25)",
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
