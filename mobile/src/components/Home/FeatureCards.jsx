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
    color: "#af8f69", // gold
  },
  {
    title: "Qiblah",
    subtitle: "Direction",
    route: "/qibla",
    icon: Compass,
    color: "#8B9D98", // forest
  },
  {
    title: "Names",
    subtitle: "99 Divine",
    route: "/names",
    icon: Sparkles,
    color: "#B8A4B0", // plum
  },
];

export default function FeatureCards() {
  return (
    <View style={{ flexDirection: "row", gap: 12 }}>
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
      style={{
        flex: 1,
        borderRadius: 16,
        backgroundColor: "rgba(26, 22, 20, 0.7)", // Lighter warm gray
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        minHeight: 120,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 16,
          backgroundColor: "rgba(255, 255, 255, 0.08)", // Slightly increased
          overflow: "hidden",
          borderWidth: 0.5,
          borderColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        {/* Decorative circle */}
        <View
          style={{
            position: "absolute",
            bottom: -15,
            right: -15,
            width: 45,
            height: 45,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            borderRadius: 22.5,
          }}
        />

        <View
          style={{
            flex: 1,
            padding: 14,
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Icon */}
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: `${color}25`,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: `${color}40`,
            }}
          >
            <Icon size={22} color={color} strokeWidth={2} />
          </View>

          {/* Text */}
          <View style={{ alignItems: "center", zIndex: 1 }}>
            <Text
              style={{
                fontSize: 9,
                fontWeight: "700",
                color: "rgba(255, 255, 255, 0.5)",
                marginBottom: 2,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              {subtitle}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#FFFFFF",
                letterSpacing: 0.3,
                textAlign: "center",
              }}
            >
              {title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
