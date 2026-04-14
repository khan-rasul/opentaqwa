import React from "react";
import { View, Text, Pressable, Share } from "react-native";
import { BookOpen, Share2, Heart } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const ACCENT = "#af8f69";

export function VerseCard({ item, index = 0, isSaved, onToggleSave }) {
  const onShare = async () => {
    try {
      await Share.share({
        message: `${item.arabic}\n\n"${item.english}"\n\n— ${item.reference}`,
      });
    } catch {}
  };

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
        <Text style={{
          color: "rgba(255,255,255,0.95)",
          fontSize: 24,
          fontWeight: "400",
          textAlign: "center",
          lineHeight: 44,
          marginBottom: 16,
          writingDirection: "rtl",
        }}>
          {item.arabic}
        </Text>

        <Text style={{
          color: "rgba(255,255,255,0.5)",
          fontSize: 13,
          fontFamily: "Quicksand-Medium",
          fontStyle: "italic",
          textAlign: "center",
          lineHeight: 20,
          marginBottom: 16,
        }}>
          "{item.english}"
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <BookOpen size={10} color="rgba(255,255,255,0.2)" />
            <Text style={{
              color: "rgba(255,255,255,0.2)",
              fontFamily: "Quicksand-Bold",
              fontSize: 10,
              letterSpacing: 0.3,
            }}>
              {item.reference}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 6 }}>
            <Pressable
              onPress={onShare}
              style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: "rgba(255,255,255,0.05)",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <Share2 size={14} color="rgba(255,255,255,0.35)" strokeWidth={2} pointerEvents="none" />
            </Pressable>
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
                pointerEvents="none"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
