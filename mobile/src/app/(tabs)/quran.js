import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Pressable, ScrollView } from "react-native";
import { RefreshCw } from "lucide-react-native";
import { quranApi } from "@opentaqwa/shared";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFavoriteContent } from "@/hooks/useFavoriteContent";
import { VerseCard } from "@/components/VerseCard";

const ACCENT = "#af8f69";

export default function QuranScreen() {
  const insets = useSafeAreaInsets();
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { isSaved, toggle } = useFavoriteContent("quran");

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
      {verses.map((item, index) => (
        <VerseCard
          key={item.reference + index}
          item={item}
          index={index}
          isSaved={isSaved(item)}
          onToggleSave={toggle}
        />
      ))}

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
