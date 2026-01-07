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
        backgroundColor: "rgba(26, 22, 20, 1)", // Lighter warm gray
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
        {/* Subtle top shine */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />

        {/* Decorative circle */}
        <View
          style={{
            position: "absolute",
            bottom: -15,
            right: -15,
            width: 45,
            height: 45,
            backgroundColor: "rgba(0, 0, 0, 0.06)",
            borderRadius: 22.5,
          }}
        />

        <View
          style={{
            flex: 1,
            padding: 14,
            justifyContent: "space-between",
          }}
        >
          {/* Icon */}
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: `${color}30`, // Increased opacity
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 0.5,
              borderColor: `${color}50`,
            }}
          >
            <Icon size={20} color={color} strokeWidth={2} />
          </View>

          {/* Text */}
          <View style={{ zIndex: 1 }}>
            <Text
              style={{
                fontSize: 9,
                fontWeight: "600",
                color: "rgba(255, 255, 255, 0.65)",
                marginBottom: 2,
                letterSpacing: 1.2,
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#FFFFFF",
                letterSpacing: 0.2,
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
