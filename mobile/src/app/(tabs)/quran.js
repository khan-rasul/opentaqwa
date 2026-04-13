import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Pressable, Share, ScrollView } from "react-native";
import { BookOpen, Share2, Heart, RefreshCw } from "lucide-react-native";
import { quranApi } from "@opentaqwa/shared";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useFavorites } from "@/hooks/useFavorites";

const ACCENT = "#af8f69";

export default function QuranScreen() {
  const insets = useSafeAreaInsets();
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { isFavorite, toggle } = useFavorites("quran");

  useEffect(() => { loadInitialVerses(); }, []);

  const loadInitialVerses = async () => {
    setLoading(true);
    try {
      const results = await Promise.all([
        quranApi.getRandomVerse(),
        quranApi.getRandomVerse(),
        quranApi.getRandomVerse(),
      ]);
      setVerses(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addVerse = async () => {
    setAdding(true);
    try {
      const data = await quranApi.getRandomVerse();
      setVerses((prev) => [...prev, data]);
    } catch (e) {
      console.error(e);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={ACCENT} />
        <Text style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Quicksand-Bold", fontSize: 11, marginTop: 12, fontStyle: "italic" }}>
          Preparing the Revelation...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: insets.bottom + 32,
        gap: 10,
      }}
    >
      {/* Header */}
      <View style={{ marginBottom: 6 }}>
        <Text style={{ color: "white", fontFamily: "Montserrat-Black", fontSize: 22, letterSpacing: -0.4 }}>
          al-Qur'ān
        </Text>
        <Text style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Quicksand-Bold", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>
          Divine Guidance
        </Text>
      </View>

      {/* Verse cards */}
      {verses.map((item, index) => (
        <VerseCard
          key={item.reference + index}
          item={item}
          index={index}
          isFavorited={isFavorite(item.reference)}
          onToggleFavorite={() => toggle(item.reference)}
        />
      ))}

      {/* Reveal another */}
      <Pressable
        onPress={addVerse}
        disabled={adding}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          paddingVertical: 14,
          borderRadius: 14,
          borderWidth: 0.5,
          borderColor: adding ? "rgba(255,255,255,0.04)" : "rgba(175,143,105,0.25)",
          backgroundColor: adding ? "rgba(255,255,255,0.02)" : "rgba(175,143,105,0.06)",
          marginTop: 4,
        }}
      >
        <RefreshCw size={14} color={adding ? "rgba(255,255,255,0.2)" : ACCENT} />
        <Text style={{
          color: adding ? "rgba(255,255,255,0.2)" : ACCENT,
          fontFamily: "Quicksand-Bold",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}>
          {adding ? "Loading..." : "Reveal Another Verse"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function VerseCard({ item, index, isFavorited, onToggleFavorite }) {
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
      {/* Accent bar */}
      <View style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: 2.5, backgroundColor: ACCENT, opacity: 0.5,
      }} />

      <View style={{ padding: 20, paddingLeft: 22 }}>
        {/* Arabic */}
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

        {/* English */}
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

        {/* Reference + actions */}
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
              <Share2 size={14} color="rgba(255,255,255,0.35)" strokeWidth={2} />
            </Pressable>
            <Pressable
              onPress={onToggleFavorite}
              style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: isFavorited ? `${ACCENT}22` : "rgba(255,255,255,0.05)",
                alignItems: "center", justifyContent: "center",
                borderWidth: isFavorited ? 0.5 : 0,
                borderColor: `${ACCENT}50`,
              }}
            >
              <Heart
                size={14}
                color={isFavorited ? ACCENT : "rgba(255,255,255,0.35)"}
                fill={isFavorited ? ACCENT : "none"}
                strokeWidth={2}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
