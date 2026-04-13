import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { BookOpen, Compass, Sparkles } from "lucide-react-native";

const FEATURE_CARDS = [
  {
    title: "Qur'ān",
    subtitle: "Read",
    route: "/quran",
    Icon: BookOpen,
    color: "#af8f69",
  },
  {
    title: "Qiblah",
    subtitle: "Direction",
    route: "/qibla",
    Icon: Compass,
    color: "#8B9D98",
  },
  {
    title: "Names",
    subtitle: "99 Divine",
    route: "/names",
    Icon: Sparkles,
    color: "#B8A4B0",
  },
];

export default function FeatureCards() {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {FEATURE_CARDS.map((card) => (
        <FeatureCard key={card.title} {...card} />
      ))}
    </View>
  );
}

function FeatureCard({ title, subtitle, route, Icon, color }) {
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
        backgroundColor: "rgba(26,22,20,0.7)",
        minHeight: 120,
        opacity: pressed ? 0.85 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        shadowColor: "#000",
        elevation: 8,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderWidth: 0.5,
          borderColor: "rgba(255,255,255,0.15)",
        }}
      >
        <View
          style={{
            position: "absolute",
            bottom: -16,
            right: -16,
            width: 45,
            height: 45,
            borderRadius: 22,
            backgroundColor: "rgba(255,255,255,0.05)",
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
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: `${color}25`,
              borderWidth: 1,
              borderColor: `${color}40`,
            }}
          >
            <Icon size={22} color={color} strokeWidth={2} />
          </View>
          <View style={{ alignItems: "center", zIndex: 1 }}>
            <Text
              style={{
                fontSize: 9,
                fontFamily: "Quicksand-Bold",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 2,
                textTransform: "uppercase",
                letterSpacing: 1.5,
                textAlign: "center",
              }}
            >
              {subtitle}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Montserrat-Black",
                color: "white",
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
