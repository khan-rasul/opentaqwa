import React from "react";
import { View, Text, Image } from "react-native";

export default function Tagline() {
  return (
    <View className="flex-1 rounded-xl overflow-hidden">
      <View className="absolute -top-2.5 -right-2.5 w-[30px] h-[30px] bg-white/5 rounded-full" />

      {/* Content */}
      <View className="flex-1 justify-center items-start">
        <Text className="text-[8px] font-light mb-1 text-white/60">
          Companion for Ummah
        </Text>

        {/* Brand Name with Logo */}
        <View className="flex-row items-center gap-1.5">
          <Image
            source={require("../../assets/icon.png")}
            className="w-5 h-5"
            resizeMode="contain"
          />

          <Text className="text-sm font-montserrat font-bold text-white">
            Open
            <Text className="text-[#af8f69] font-great-vibes text-lg leading-4"> Taqwā</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}
