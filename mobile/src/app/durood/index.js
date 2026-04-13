import React from "react";
import { BookOpen, Heart, Flower2, HeartHandshake } from "lucide-react-native";
import { HeroView } from "@/components/Hero/HeroView";
import { duroodList } from "@opentaqwa/shared";
import { useFavorites } from "@/hooks/useFavorites";

const DUROOD_CATEGORIES = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "short", label: "Short", icon: Flower2 },
  { id: "blessings", label: "Blessings", icon: HeartHandshake },
  { id: "favorites", label: "Favorites", icon: Heart },
];

export default function DuroodPage() {
  const { isFavorite, toggle } = useFavorites("durood");

  return (
    <HeroView
      gradient={["#8B9D98dd", "#8B9D9877"]}
      accentColor="#8B9D98"
      categories={DUROOD_CATEGORIES}
      collection={duroodList}
      emptyStateMessage="No favorites yet"
      emptyStateDetail="Send blessings and save your preferred Durood here"
      isFavorited={isFavorite}
      onToggleFavorite={toggle}
      onPlayAudio={() => {}}
      onShare={() => {}}
    />
  );
}
