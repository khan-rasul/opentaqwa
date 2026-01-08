// app/Durood/index.js
import React from "react";
import { BookOpen, Heart, Flower2, HeartHandshake } from "lucide-react-native";
import { HeroView } from "@/components/Hero";

const DUROOD_CATEGORIES = [
    { id: "all", label: "All", icon: BookOpen },
    { id: "short", label: "Short", icon: Flower2 },
    { id: "blessings", label: "Blessings", icon: HeartHandshake },
    { id: "favorites", label: "Favorites", icon: Heart },
];

const DUROOD_COLLECTION = [
    {
        id: 1,
        arabic: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ",
        transliteration: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin",
        translation: "O Allah, bestow Your favor upon Muhammad and upon the family of Muhammad.",
        benefit: "Sending blessings upon the Prophet is highly rewarded.",
        reference: "Commonly recited",
        category: "short",
    },
];

export default function DuroodPage() {
    return (
        <HeroView
            title="Durōōd"
            gradient={["#8B9D98", "#8B9D9877"]}
            accentColor="#8B9D98"
            subtitle="Salutation Collection"
            categories={DUROOD_CATEGORIES}
            collection={DUROOD_COLLECTION}
            emptyStateMessage="No favorites yet"
            emptyStateDetail="Send blessings and save your preferred Durood here"
            onPlayAudio={(item) => console.log("Playing audio for:", item.arabic)}
            onShare={(item) => console.log("Sharing:", item.arabic)}
        />
    );
}
