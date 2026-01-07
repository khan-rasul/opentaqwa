import React from "react";
import { View, Text, Image } from "react-native";

export default function Tagline() {
  return (
    <View className="flex-1 rounded-xl overflow-hidden">
      <View
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          width: 30,
          height: 30,
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderRadius: 15,
        }}
      />

      {/* Content */}
      <View className="flex-1 justify-center items-start">
        <Text className="text-[8px] font-light mb-1 text-white/60">
          Companion for Ummah
        </Text>

        {/* Brand Name with Logo */}
        <View className="flex-row items-center gap-1.5">
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />

          <Text className="text-sm font-semibold text-white">
            Open
            <Text className="text-gold-light font-great-vibes">Taqwā</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
