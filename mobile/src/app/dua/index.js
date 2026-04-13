import React from "react";
import { BookOpen, Heart, Stars, Cloud, Car, UtensilsCrossed, Moon } from "lucide-react-native";
import { HeroView } from "@/components/Hero/HeroView";
import { duaList } from "@opentaqwa/shared";
import { useFavorites } from "@/hooks/useFavorites";

const DUA_CATEGORIES = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "morning", label: "Morning", icon: Stars },
  { id: "evening", label: "Evening", icon: Cloud },
  { id: "travel", label: "Travel", icon: Car },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "general", label: "General", icon: Moon },
  { id: "favorites", label: "Favorites", icon: Heart },
];

export default function DuaPage() {
  const { isFavorite, toggle } = useFavorites("dua");

  return (
    <HeroView
      gradient={["#B8A4B0dd", "#B8A4B077"]}
      accentColor="#B8A4B0"
      categories={DUA_CATEGORIES}
      collection={duaList}
      emptyStateMessage="No favorite Duas"
      emptyStateDetail="Save common supplications here for quick access"
      isFavorited={isFavorite}
      onToggleFavorite={toggle}
      onPlayAudio={() => {}}
      onShare={() => {}}
    />
  );
}
