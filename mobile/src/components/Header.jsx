import React from "react";
import { View, Text, Image } from "react-native";
import { MapPin } from "lucide-react-native";
import { usePrayer } from "@/context/PrayerContext";

export default function Header() {
  const { nextPrayer, locationName, loading } = usePrayer();
  const nextPrayerDisplay = loading ? "Loading..." : `${nextPrayer?.name || "---"}, ${nextPrayer?.time || "---"}`;

  return (
    <View
      className="rounded-2xl bg-[rgba(26,22,20,0.7)] shadow-black"
      style={{
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
      }}
    >
      <View className="rounded-2xl overflow-hidden bg-white/10 border-[0.5px] border-white/15">
        <View className="flex-row justify-between items-center p-3">
          <View className="flex-row items-center gap-2.5 flex-1">
            <Image
              source={require("../../assets/icon.png")}
              className="w-[22px] h-[22px]"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="color-white text-[12px] font-montserrat font-bold tracking-tight" numberOfLines={1}>
                {nextPrayerDisplay}
              </Text>
              <View className="flex-row items-center gap-[3px] mt-[1px]">
                <MapPin size={9} color="rgba(255, 255, 255, 0.7)" />
                <Text className="color-white/70 text-[9px] font-quicksand font-semibold tracking-wider" numberOfLines={1}>
                  {loading ? "Detecting..." : `${locationName.city}, ${locationName.country}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
