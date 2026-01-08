// components/FeatureCards.js
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { BookOpen, Compass, Sparkles } from "lucide-react-native";

const featureCards = [
  {
    title: "Qur'ān",
    subtitle: "Read",
    route: "/quran",
    icon: BookOpen,
    color: "#af8f69",
  },
  {
    title: "Qiblah",
    subtitle: "Direction",
    route: "/qibla",
    icon: Compass,
    color: "#8B9D98",
  },
  {
    title: "Names",
    subtitle: "99 Divine",
    route: "/names",
    icon: Sparkles,
    color: "#B8A4B0",
  },
];

export default function FeatureCards() {
  return (
    <View className="flex-row gap-2">
      {featureCards.map((card) => (
        <FeatureCard key={card.title} {...card} />
      ))}
    </View>
  );
}

function FeatureCard({ title, subtitle, route, icon: Icon, color }) {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => router.push(route)}
      className={`flex-1 rounded-2xl bg-[rgba(26,22,20,0.7)] shadow-black min-h-[120px] 
        ${pressed ? 'opacity-85 scale-[0.97]' : 'opacity-100 scale-100'}`}
      style={{
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
      }}
    >
      <View className="flex-1 rounded-2xl overflow-hidden bg-white/10 border-[0.5px] border-white/15">
        {/* Decorative circle */}
        <View className="absolute -bottom-4 -right-4 w-[45px] h-[45px] bg-white/5 rounded-full" />

        <View className="flex-1 p-3.5 justify-center items-center gap-3">
          {/* Icon */}
          <View
            className="w-11 h-11 rounded-full justify-center items-center border"
            style={{
              backgroundColor: `${color}25`,
              borderColor: `${color}40`,
            }}
          >
            <Icon size={22} color={color} strokeWidth={2} />
          </View>

          {/* Text */}
          <View className="items-center z-[1]">
            <Text className="text-[9px] font-bold text-white/50 mb-0.5 tracking-[1.5px] uppercase text-center">
              {subtitle}
            </Text>
            <Text className="text-[15px] font-bold text-white tracking-[0.3px] text-center">
              {title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
