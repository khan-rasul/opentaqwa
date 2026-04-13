import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BookOpen, Compass, Sparkles, HeartHandshake } from "lucide-react-native";

const FEATURES = [
  {
    title: "Adhkār",
    subtitle: "Remembrance",
    route: "/dhikr",
    gradient: ["#625443", "#4a3f32"],
    Icon: BookOpen,
    accentColor: "#af8f69",
  },
  {
    title: "Durōōd",
    subtitle: "Salutation",
    route: "/durood",
    gradient: ["#263936", "#1a2725"],
    Icon: HeartHandshake,
    accentColor: "#8B9D98",
  },
  {
    title: "Qiblah",
    subtitle: "Direction",
    route: "/qibla",
    gradient: ["#3d3530", "#2a2522"],
    Icon: Compass,
    accentColor: "#af8f69",
  },
  {
    title: "al-Asmā'",
    subtitle: "99 Divine Names",
    route: "/names",
    gradient: ["#5E4B56", "#463640"],
    Icon: Sparkles,
    accentColor: "#B8A4B0",
  },
];

export default function MoreScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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
      <View className="flex-row flex-wrap gap-2">
        {FEATURES.map((feature) => {
          const Icon = feature.Icon;
          return (
            <Pressable
              key={feature.route}
              onPress={() => router.push(feature.route)}
              style={{ width: "48.5%" }}
              className="active:opacity-80"
            >
              <LinearGradient
                colors={feature.gradient}
                start={[0, 0]}
                end={[1, 1]}
                style={{ height: 140, borderRadius: 16, padding: 16, justifyContent: "flex-end", overflow: "hidden" }}
              >
                {/* Decorative circle */}
                <View className="absolute -top-6 -right-6 w-20 h-20 bg-white/5 rounded-full" />

                <View
                  className="w-10 h-10 rounded-full items-center justify-center border mb-3"
                  style={{ backgroundColor: `${feature.accentColor}20`, borderColor: `${feature.accentColor}40` }}
                >
                  <Icon size={20} color={feature.accentColor} strokeWidth={2} />
                </View>
                <Text className="text-white font-montserrat font-black text-[17px] tracking-tight">
                  {feature.title}
                </Text>
                <Text className="text-white/50 font-quicksand font-medium text-[11px] mt-0.5">
                  {feature.subtitle}
                </Text>
              </LinearGradient>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
