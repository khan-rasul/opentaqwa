// app/Dhikr/index.js
import React from "react";
import { BookOpen, Sun, Moon, Heart } from "lucide-react-native";
import { HeroView } from "@/components/Hero";

const DHIKR_CATEGORIES = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "morning", label: "Morning", icon: Sun },
  { id: "evening", label: "Evening", icon: Moon },
  { id: "favorites", label: "Favorites", icon: Heart },
];

const DHIKR_COLLECTION = [
  {
    id: 1,
    arabic: "سُبْحَانَ ٱللَّٰهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdihi",
    translation: "Glory be to Allah and praise Him",
    benefit:
      "Whoever says this 100 times in a day, his sins will be wiped away, even if they are like the foam of the sea",
    reference: "Sahih al-Bukhari 6405",
    category: "morning",
  },
  {
    id: 2,
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ وَحْدَهُ لَا شَرِيكَ لَهُ",
    transliteration: "La ilaha illallahu wahdahu la sharika lah",
    translation: "There is no god but Allah alone, without any partners",
    benefit:
      "Whoever says this 10 times will have the reward of freeing four slaves from the children of Isma'il",
    reference: "Sahih al-Bukhari 6404",
    category: "morning",
  },
  {
    id: 3,
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Astaghfirullaha wa atubu ilayh",
    translation: "I seek Allah's forgiveness and repent to Him",
    benefit:
      "The Messenger of Allah would seek forgiveness from Allah more than 70 times a day",
    reference: "Sahih al-Bukhari 6307",
    category: "all",
  },
  {
    id: 4,
    arabic: "ٱللَّٰهُمَّ إِنِّي أَسْأَلُكَ ٱلْعَافِيَةَ",
    transliteration: "Allahumma inni as'alukal-'afiyah",
    translation: "O Allah, I ask You for well-being",
    benefit: "There is nothing more comprehensive than asking for well-being",
    reference: "Sunan Ibn Majah 3851",
    category: "evening",
  },
  {
    id: 5,
    arabic: "حَسْبِيَ ٱللَّٰهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ",
    transliteration: "Hasbiyallahu la ilaha illa huwa 'alayhi tawakkaltu",
    translation:
      "Allah is sufficient for me. There is no god but Him. In Him I put my trust",
    benefit:
      "Whoever says this seven times, Allah will take care of whatever worries him",
    reference: "Sunan Abu Dawud 5081",
    category: "all",
  },
];

export default function DhikrPage() {
  return (
    <HeroView
      title="Adhkār"
      gradient={["#af8f69", "#af8f6977"]}
      accentColor="#af8f69"
      subtitle="Remembrance Collection"
      categories={DHIKR_CATEGORIES}
      collection={DHIKR_COLLECTION}
      emptyStateMessage="No favorites yet"
      emptyStateDetail="Tap the heart icon on any dhikr to save it here"
      onPlayAudio={(item) => console.log("Playing audio for:", item.arabic)}
      onShare={(item) => console.log("Sharing:", item.arabic)}
    />
  );
}
