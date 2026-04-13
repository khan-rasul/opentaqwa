import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Clock } from "lucide-react-native";
import { usePrayer } from "@/context/PrayerContext";

function useCountdown(targetDate) {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!targetDate) return;
    const update = () => {
      const diff = targetDate - new Date();
      if (diff <= 0) { setCountdown("Now"); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(
        h > 0
          ? `${h}h ${String(m).padStart(2, "0")}m`
          : `${m}m ${String(s).padStart(2, "0")}s`
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
}

export default function PrayerScreen() {
  const insets = useSafeAreaInsets();
  const { prayerTimes, nextPrayer, locationName, loading, error } = usePrayer();
  const countdown = useCountdown(nextPrayer?.date);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: insets.bottom + 32,
      }}
    >

      {/* Loading */}
      {loading && (
        <View style={{ alignItems: "center", paddingVertical: 48 }}>
          <ActivityIndicator color="#af8f69" />
          <Text style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Quicksand-Bold", fontSize: 10, marginTop: 12, textTransform: "uppercase", letterSpacing: 2 }}>
            Calculating times...
          </Text>
        </View>
      )}

      {/* Error */}
      {!!error && !loading && (
        <View style={{ backgroundColor: "rgba(220,38,38,0.08)", borderWidth: 0.5, borderColor: "rgba(220,38,38,0.2)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <Text style={{ color: "#f87171", fontFamily: "Quicksand-Bold", fontSize: 13, textAlign: "center" }}>{error}</Text>
        </View>
      )}

      {/* Next prayer card */}
      {!!nextPrayer && !loading && (
        <LinearGradient
          colors={["rgba(175,143,105,0.18)", "rgba(175,143,105,0.06)"]}
          start={[0, 0]} end={[1, 1]}
          style={{ borderRadius: 20, borderWidth: 0.5, borderColor: "rgba(175,143,105,0.25)", padding: 20, marginBottom: 16, overflow: "hidden" }}
        >
          {/* Decorative circle */}
          <View style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: 50, backgroundColor: "rgba(175,143,105,0.06)" }} />

          <Text style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Quicksand-Bold", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>
            Next Prayer
          </Text>
          <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" }}>
            <View>
              <Text style={{ color: "white", fontFamily: "Montserrat-Black", fontSize: 28, letterSpacing: -0.5 }}>
                {nextPrayer.name}
              </Text>
              <Text style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Quicksand-SemiBold", fontSize: 13, marginTop: 2 }}>
                {nextPrayer.arabic}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "#af8f69", fontFamily: "Montserrat-Black", fontSize: 22, letterSpacing: -0.3 }}>
                {nextPrayer.time}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                <Clock size={9} color="rgba(255,255,255,0.25)" />
                <Text style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Quicksand-Bold", fontSize: 10 }}>
                  {countdown}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}

      {/* Prayer times list */}
      {!loading && prayerTimes.length > 0 && (
        <View style={{ borderRadius: 20, overflow: "hidden", borderWidth: 0.5, borderColor: "rgba(255,255,255,0.08)", backgroundColor: "rgba(26,22,20,0.5)" }}>
          {prayerTimes.map((prayer, index) => {
            const isNext = nextPrayer?.id === prayer.id;
            const isLast = index === prayerTimes.length - 1;
            return (
              <View
                key={prayer.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                  paddingVertical: 16,
                  borderBottomWidth: isLast ? 0 : 0.5,
                  borderBottomColor: "rgba(255,255,255,0.05)",
                  backgroundColor: isNext ? "rgba(175,143,105,0.07)" : "transparent",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 14 }}>
                  <View style={{
                    width: 5, height: 5, borderRadius: 3,
                    backgroundColor: isNext ? "#af8f69" : "rgba(255,255,255,0.1)",
                  }} />
                  <View>
                    <Text style={{
                      fontFamily: "Montserrat-Black",
                      fontSize: 15,
                      letterSpacing: -0.2,
                      color: isNext ? "white" : "rgba(255,255,255,0.6)",
                    }}>
                      {prayer.name}
                    </Text>
                    <Text style={{ fontFamily: "Quicksand-SemiBold", fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>
                      {prayer.arabic}
                    </Text>
                  </View>
                </View>
                <Text style={{
                  fontFamily: "Montserrat-Black",
                  fontSize: 15,
                  color: isNext ? "#af8f69" : "rgba(255,255,255,0.4)",
                }}>
                  {prayer.time}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      {/* Footer */}
      {!loading && (
        <Text style={{
          color: "rgba(255,255,255,0.15)",
          fontSize: 9, fontFamily: "Quicksand-Bold",
          textAlign: "center", marginTop: 20,
          textTransform: "uppercase", letterSpacing: 1.5,
        }}>
          Al-Adhan API · Hanafi method
        </Text>
      )}
    </ScrollView>
  );
}
