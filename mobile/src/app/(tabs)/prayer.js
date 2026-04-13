import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MapPin, RefreshCw, Clock } from "lucide-react-native";
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
  const { prayerTimes, nextPrayer, locationName, loading, error, refresh } = usePrayer();
  const countdown = useCountdown(nextPrayer?.date);

  return (
    <ScrollView
      className="flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        padding: 12,
        paddingTop: 8,
        paddingBottom: insets.bottom + 24,
      }}
    >
      {/* Location Header */}
      <View className="flex-row items-center justify-between mb-4 px-1">
        <View className="flex-row items-center gap-2">
          <MapPin size={14} color="#af8f69" />
          <View>
            <Text className="text-white font-montserrat font-black text-base tracking-tight">
              {loading ? "Detecting..." : locationName.city}
            </Text>
            {locationName.country ? (
              <Text className="text-white/40 font-quicksand font-bold text-[10px] uppercase tracking-widest">
                {locationName.country}
              </Text>
            ) : null}
          </View>
        </View>
        <Pressable
          onPress={refresh}
          disabled={loading}
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 items-center justify-center active:opacity-60"
        >
          <RefreshCw size={14} color={loading ? "rgba(255,255,255,0.2)" : "#af8f69"} />
        </Pressable>
      </View>

      {/* Next Prayer Highlight */}
      {nextPrayer && !loading && (
        <View className="bg-[rgba(175,143,105,0.12)] border border-[#af8f69]/20 rounded-2xl p-5 mb-4">
          <Text className="text-white/40 font-quicksand font-bold text-[10px] uppercase tracking-[2px] mb-1">
            Next Prayer
          </Text>
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-white font-montserrat font-black text-2xl tracking-tight">
                {nextPrayer.name}
              </Text>
              <Text className="text-white/50 font-quicksand font-bold text-[11px] mt-0.5">
                {nextPrayer.arabic}
              </Text>
            </View>
            <View className="items-end">
              <Text className="text-[#af8f69] font-montserrat font-black text-xl">
                {nextPrayer.time}
              </Text>
              <View className="flex-row items-center gap-1 mt-1">
                <Clock size={10} color="rgba(255,255,255,0.3)" />
                <Text className="text-white/30 font-quicksand font-bold text-[10px]">
                  {countdown}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Loading / Error */}
      {loading && (
        <View className="items-center py-10">
          <ActivityIndicator color="#af8f69" />
          <Text className="text-white/30 font-quicksand font-bold text-xs mt-3 uppercase tracking-widest">
            Calculating prayer times...
          </Text>
        </View>
      )}

      {error && !loading && (
        <View className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4">
          <Text className="text-red-400 font-quicksand font-bold text-sm text-center">{error}</Text>
        </View>
      )}

      {/* All Prayer Times */}
      {!loading && prayerTimes.length > 0 && (
        <View className="bg-[rgba(26,22,20,0.5)] border-[0.5px] border-white/10 rounded-2xl overflow-hidden">
          {prayerTimes.map((prayer, index) => {
            const isNext = nextPrayer?.id === prayer.id;
            const isLast = index === prayerTimes.length - 1;
            return (
              <View
                key={prayer.id}
                className={`flex-row items-center justify-between px-5 py-4 ${
                  !isLast ? "border-b border-white/5" : ""
                } ${isNext ? "bg-[#af8f69]/8" : ""}`}
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-1.5 h-1.5 rounded-full ${
                      isNext ? "bg-[#af8f69]" : "bg-white/10"
                    }`}
                  />
                  <View>
                    <Text
                      className={`font-montserrat font-black text-[15px] tracking-tight ${
                        isNext ? "text-white" : "text-white/70"
                      }`}
                    >
                      {prayer.name}
                    </Text>
                    <Text className="text-white/30 font-quicksand font-bold text-[10px] mt-0.5">
                      {prayer.arabic}
                    </Text>
                  </View>
                </View>
                <Text
                  className={`font-montserrat font-black text-base ${
                    isNext ? "text-[#af8f69]" : "text-white/50"
                  }`}
                >
                  {prayer.time}
                </Text>
              </View>
            );
          })}
        </View>
      )}

      {/* Footer note */}
      <Text className="text-white/20 text-[9px] font-quicksand font-bold text-center mt-6 uppercase tracking-widest">
        Times calculated via Al-Adhan API · Hanafi method
      </Text>
    </ScrollView>
  );
}
