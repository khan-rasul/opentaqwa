import React from "react";
import { View, Text, Pressable } from "react-native";
import { Heart } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const ACCENT = "#af8f69";

export function NameCard({ item, index = 0, isSaved, onToggleSave }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 80).duration(400).springify()}
      style={{
        backgroundColor: "rgba(255,255,255,0.035)",
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: "rgba(255,255,255,0.07)",
        overflow: "hidden",
      }}
    >
      <View style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 2.5, backgroundColor: ACCENT, opacity: 0.5 }} />

      <View style={{ padding: 20, paddingLeft: 22 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              color: ACCENT,
              fontSize: 32,
              fontWeight: "400",
              writingDirection: "rtl",
              lineHeight: 44,
              marginBottom: 4,
            }}>
              {item.arabic}
            </Text>
            <Text style={{
              color: "white",
              fontFamily: "Montserrat-Black",
              fontSize: 15,
              letterSpacing: -0.2,
              marginBottom: 2,
            }}>
              {item.english}
            </Text>
            <Text style={{
              color: ACCENT,
              fontFamily: "Quicksand-SemiBold",
              fontSize: 11,
              fontStyle: "italic",
              opacity: 0.7,
            }}>
              {item.meaning}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end", gap: 8, marginLeft: 12 }}>
            <Text style={{
              color: "rgba(255,255,255,0.15)",
              fontFamily: "Quicksand-Bold",
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>
              {item.number} / 99
            </Text>
            <Pressable
              onPress={() => onToggleSave(item)}
              style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: isSaved ? `${ACCENT}22` : "rgba(255,255,255,0.05)",
                alignItems: "center", justifyContent: "center",
                borderWidth: isSaved ? 0.5 : 0,
                borderColor: `${ACCENT}50`,
              }}
            >
              <Heart
                size={14}
                color={isSaved ? ACCENT : "rgba(255,255,255,0.35)"}
                fill={isSaved ? ACCENT : "none"}
                strokeWidth={2}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
