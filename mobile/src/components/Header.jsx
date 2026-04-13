import React from "react";
import { View, Text, Pressable } from "react-native";
import { Moon, Bookmark } from "lucide-react-native";
import { useRouter } from "expo-router";
import { usePrayer } from "@/context/PrayerContext";

const ACCENT = "#af8f69";

export default function Header() {
  const router = useRouter();
  const { nextPrayer, loading } = usePrayer();

  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 4,
      paddingVertical: 6,
    }}>
      {/* Left: accent bar + prayer pill */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {!loading && nextPrayer && (
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(175,143,105,0.08)",
            borderWidth: 0.5,
            borderColor: "rgba(175,143,105,0.25)",
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}>
            <Moon size={10} color={ACCENT} strokeWidth={2} />
            <View>
              <Text style={{
                color: ACCENT,
                fontFamily: "Quicksand-Bold",
                fontSize: 10,
                letterSpacing: 0.3,
                lineHeight: 13,
              }}>
                {nextPrayer.name}
              </Text>
              <Text style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "Quicksand-Bold",
                fontSize: 9,
                letterSpacing: 0.3,
                lineHeight: 12,
              }}>
                {nextPrayer.time}
              </Text>
            </View>
          </View>
        )}

        {loading && (
          <View style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderWidth: 0.5,
            borderColor: "rgba(255,255,255,0.07)",
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}>
            <Text style={{
              color: "rgba(255,255,255,0.2)",
              fontFamily: "Quicksand-Bold",
              fontSize: 9,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}>
              Loading...
            </Text>
          </View>
        )}
      </View>

      {/* Right: saved button */}
      <Pressable
        onPress={() => router.push("/(tabs)/favourites")}
        style={{
          width: 34,
          height: 34,
          borderRadius: 17,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.05)",
          borderWidth: 0.5,
          borderColor: "rgba(255,255,255,0.1)",
        }}
      >
        <Bookmark size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
      </Pressable>
    </View>
  );
}
