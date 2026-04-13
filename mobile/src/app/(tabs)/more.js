import React from "react";
import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BookOpen, Compass, Sparkles, HeartHandshake, HandHeart } from "lucide-react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = (SCREEN_WIDTH - 16 * 2 - 10) / 2;

const FEATURES = [
  {
    title: "Adhkār",
    subtitle: "Remembrance",
    route: "/dhikr",
    gradient: ["#4a3c2e", "#2e2419"],
    Icon: BookOpen,
    accentColor: "#af8f69",
  },
  {
    title: "Du'ā",
    subtitle: "Supplication",
    route: "/dua",
    gradient: ["#3a2e38", "#221b21"],
    Icon: HandHeart,
    accentColor: "#B8A4B0",
  },
  {
    title: "Durōōd",
    subtitle: "Salutation",
    route: "/durood",
    gradient: ["#1c2d2b", "#111d1c"],
    Icon: HeartHandshake,
    accentColor: "#8B9D98",
  },
  {
    title: "Qiblah",
    subtitle: "Direction",
    route: "/qibla",
    gradient: ["#2e2822", "#1c1916"],
    Icon: Compass,
    accentColor: "#af8f69",
  },
  {
    title: "al-Asmā'",
    subtitle: "99 Divine Names",
    route: "/names",
    gradient: ["#2e2838", "#1b1c22"],
    Icon: Sparkles,
    accentColor: "#B8A4B0",
  },
];

export default function MoreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: insets.bottom + 32,
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
        {FEATURES.map((feature) => {
          const Icon = feature.Icon;
          return (
            <Pressable
              key={feature.route}
              onPress={() => router.push(feature.route)}
              style={({ pressed }) => ({
                width: CARD_WIDTH,
                opacity: pressed ? 0.75 : 1,
                transform: [{ scale: pressed ? 0.97 : 1 }],
              })}
            >
              <LinearGradient
                colors={feature.gradient}
                start={[0, 0]}
                end={[1, 1]}
                style={{
                  height: 150,
                  borderRadius: 18,
                  padding: 18,
                  justifyContent: "space-between",
                  overflow: "hidden",
                  borderWidth: 0.5,
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <View style={{
                  position: "absolute", top: -20, right: -20,
                  width: 70, height: 70, borderRadius: 35,
                  backgroundColor: `${feature.accentColor}0a`,
                }} />

                <View style={{
                  width: 38, height: 38, borderRadius: 19,
                  alignItems: "center", justifyContent: "center",
                  backgroundColor: `${feature.accentColor}18`,
                  borderWidth: 0.5,
                  borderColor: `${feature.accentColor}35`,
                }}>
                  <Icon size={18} color={feature.accentColor} strokeWidth={2} />
                </View>

                <View>
                  <Text style={{
                    color: "white", fontFamily: "Montserrat-Black",
                    fontSize: 16, letterSpacing: -0.3,
                  }}>
                    {feature.title}
                  </Text>
                  <Text style={{
                    color: "rgba(255,255,255,0.4)", fontFamily: "Quicksand-Medium",
                    fontSize: 11, marginTop: 2,
                  }}>
                    {feature.subtitle}
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
