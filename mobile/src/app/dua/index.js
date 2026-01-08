// app/Dua/index.js
import React from "react";
import { BookOpen, Heart, Stars, Cloud } from "lucide-react-native";
import { HeroView } from "@/components/Hero";

const DUA_CATEGORIES = [
    { id: "all", label: "All", icon: BookOpen },
    { id: "morning", label: "Morning", icon: Stars },
    { id: "evening", label: "Evening", icon: Cloud },
    { id: "favorites", label: "Favorites", icon: Heart },
];

const DUA_COLLECTION = [
    {
        id: 1,
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar",
        translation: "Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.",
        benefit: "One of the most comprehensive supplications from the Quran.",
        reference: "Surah Al-Baqarah 2:201",
        category: "all",
    },
];

export default function DuaPage() {
    return (
        <HeroView
            title="Du'ā"
            gradient={["#B8A4B0", "#B8A4B077"]}
            accentColor="#B8A4B0"
            subtitle="Supplications Collection"
            categories={DUA_CATEGORIES}
            collection={DUA_COLLECTION}
            emptyStateMessage="No favorite Duas"
            emptyStateDetail="Save common supplications here for quick access"
            onPlayAudio={(item) => console.log("Playing audio for:", item.arabic)}
            onShare={(item) => console.log("Sharing:", item.arabic)}
        />
    );
}
