import React from "react";
import { BookOpen, Sun, Moon, Heart } from "lucide-react-native";
import { HeroView } from "@/components/Hero/HeroView";
import { dhikrList } from "@opentaqwa/shared";
import { useFavorites } from "@/hooks/useFavorites";

const DHIKR_CATEGORIES = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "morning", label: "Morning", icon: Sun },
  { id: "evening", label: "Evening", icon: Moon },
  { id: "favorites", label: "Favorites", icon: Heart },
];

export default function DhikrPage() {
  const { isFavorite, toggle } = useFavorites("dhikr");

  return (
    <HeroView
      gradient={["#af8f69dd", "#af8f6977"]}
      accentColor="#af8f69"
      categories={DHIKR_CATEGORIES}
      collection={dhikrList}
      emptyStateMessage="No favorites yet"
      emptyStateDetail="Tap the heart icon on any dhikr to save it here"
      isFavorited={isFavorite}
      onToggleFavorite={toggle}
      onPlayAudio={() => {}}
      onShare={() => {}}
    />
  );
}
