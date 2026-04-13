import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Heart } from "lucide-react-native";
import { dhikrList, duaList, duroodList } from "@opentaqwa/shared";
import { useFavorites } from "@/hooks/useFavorites";
import { useFavoriteContent } from "@/hooks/useFavoriteContent";
import { HeroCard } from "@/components/Hero/Card";
import { HeroFilter } from "@/components/Hero/Filter";
import { VerseCard } from "@/components/VerseCard";
import { NameCard } from "@/components/NameCard";

const ACCENT = "#af8f69";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "dhikr", label: "Adhkār" },
  { id: "dua", label: "Du'ā" },
  { id: "durood", label: "Durōōd" },
  { id: "quran", label: "Qur'ān" },
  { id: "names", label: "Asmā'" },
];

export default function FavouritesScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState("all");

  const dhikrFav = useFavorites("dhikr");
  const duaFav = useFavorites("dua");
  const duroodFav = useFavorites("durood");
  const quranFav = useFavoriteContent("quran");
  const namesFav = useFavoriteContent("names");

  const favDhikr = dhikrList.filter((item) => dhikrFav.isFavorite(item.id));
  const favDua = duaList.filter((item) => duaFav.isFavorite(item.id));
  const favDurood = duroodList.filter((item) => duroodFav.isFavorite(item.id));
  const favVerses = quranFav.items;
  const favNames = namesFav.items;

  const showDhikr = activeCategory === "all" || activeCategory === "dhikr";
  const showDua = activeCategory === "all" || activeCategory === "dua";
  const showDurood = activeCategory === "all" || activeCategory === "durood";
  const showQuran = activeCategory === "all" || activeCategory === "quran";
  const showNames = activeCategory === "all" || activeCategory === "names";

  const hasAny =
    favDhikr.length > 0 ||
    favDua.length > 0 ||
    favDurood.length > 0 ||
    favVerses.length > 0 ||
    favNames.length > 0;

  const hasVisible =
    (showDhikr && favDhikr.length > 0) ||
    (showDua && favDua.length > 0) ||
    (showDurood && favDurood.length > 0) ||
    (showQuran && favVerses.length > 0) ||
    (showNames && favNames.length > 0);

  return (
    <View style={{ flex: 1 }}>
      {/* Category filter */}
      <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 10 }}>
        <HeroFilter
          accentColor={ACCENT}
          categories={CATEGORIES}
          selectedCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </View>

      {hasAny && hasVisible ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 32,
            gap: 10,
          }}
        >
          {showDhikr && favDhikr.map((item, index) => (
            <HeroCard
              key={item.id}
              item={item}
              index={index}
              accentColor="#af8f69"
              isFavorited={dhikrFav.isFavorite(item.id)}
              onToggleFavorite={() => dhikrFav.toggle(item.id)}
              onShare={() => {}}
            />
          ))}

          {showDua && favDua.map((item, index) => (
            <HeroCard
              key={item.id}
              item={item}
              index={index}
              accentColor="#B8A4B0"
              isFavorited={duaFav.isFavorite(item.id)}
              onToggleFavorite={() => duaFav.toggle(item.id)}
              onShare={() => {}}
            />
          ))}

          {showDurood && favDurood.map((item, index) => (
            <HeroCard
              key={item.id}
              item={item}
              index={index}
              accentColor="#8B9D98"
              isFavorited={duroodFav.isFavorite(item.id)}
              onToggleFavorite={() => duroodFav.toggle(item.id)}
              onShare={() => {}}
            />
          ))}

          {showQuran && favVerses.map((item, index) => (
            <VerseCard
              key={item.reference}
              item={item}
              index={index}
              isSaved={quranFav.isSaved(item)}
              onToggleSave={quranFav.toggle}
            />
          ))}

          {showNames && favNames.map((item, index) => (
            <NameCard
              key={item.number}
              item={item}
              index={index}
              isSaved={namesFav.isSaved(item)}
              onToggleSave={namesFav.toggle}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }}>
          <Heart size={36} color="rgba(255,255,255,0.1)" strokeWidth={1.5} />
          <Text style={{
            color: "rgba(255,255,255,0.35)",
            fontFamily: "Montserrat-Black",
            fontSize: 15,
            marginTop: 16,
            textAlign: "center",
            letterSpacing: -0.2,
          }}>
            {hasAny ? "Nothing in this category" : "Nothing saved yet"}
          </Text>
          <Text style={{
            color: "rgba(255,255,255,0.2)",
            fontFamily: "Quicksand-Medium",
            fontSize: 12,
            marginTop: 6,
            textAlign: "center",
            lineHeight: 18,
          }}>
            {hasAny
              ? "Tap another category or save more content"
              : "Tap the heart on any Dhikr, Du'ā, Durōōd, verse, or Name"}
          </Text>
        </View>
      )}
    </View>
  );
}
