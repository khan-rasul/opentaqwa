import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Heart } from "lucide-react-native";
import { dhikrList, duaList, duroodList } from "@opentaqwa/shared";
import { useFavorites } from "@/hooks/useFavorites";
import { HeroCard } from "@/components/Hero/Card";

function Section({ title, accentColor, items, favHook }) {
  if (items.length === 0) return null;
  return (
    <View style={{ marginBottom: 28 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <View style={{ width: 2.5, height: 14, borderRadius: 2, backgroundColor: accentColor, opacity: 0.6 }} />
        <Text style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Quicksand-Bold", fontSize: 9, textTransform: "uppercase", letterSpacing: 2 }}>
          {title}
        </Text>
      </View>
      {items.map((item) => (
        <View key={item.id} style={{ marginBottom: 10 }}>
          <HeroCard
            item={item}
            accentColor={accentColor}
            isFavorited={favHook.isFavorite(item.id)}
            onToggleFavorite={() => favHook.toggle(item.id)}
            onShare={() => {}}
          />
        </View>
      ))}
    </View>
  );
}

export default function FavouritesScreen() {
  const insets = useSafeAreaInsets();
  const dhikrFav = useFavorites("dhikr");
  const duaFav = useFavorites("dua");
  const duroodFav = useFavorites("durood");

  const favDhikr = dhikrList.filter((item) => dhikrFav.isFavorite(item.id));
  const favDua = duaList.filter((item) => duaFav.isFavorite(item.id));
  const favDurood = duroodList.filter((item) => duroodFav.isFavorite(item.id));

  const hasAny = favDhikr.length > 0 || favDua.length > 0 || favDurood.length > 0;

  return (
    <View style={{ flex: 1 }}>
      {hasAny ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: insets.bottom + 32,
          }}
        >
          <Section title="Adhkār" accentColor="#af8f69" items={favDhikr} favHook={dhikrFav} />
          <Section title="Du'ā" accentColor="#B8A4B0" items={favDua} favHook={duaFav} />
          <Section title="Durōōd" accentColor="#8B9D98" items={favDurood} favHook={duroodFav} />
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }}>
          <Heart size={36} color="rgba(255,255,255,0.1)" strokeWidth={1.5} />
          <Text style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Montserrat-Black", fontSize: 15, marginTop: 16, textAlign: "center", letterSpacing: -0.2 }}>
            Nothing saved yet
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Quicksand-Medium", fontSize: 12, marginTop: 6, textAlign: "center", lineHeight: 18 }}>
            Tap the heart on any Dhikr, Du'ā, or Durōōd to save it here
          </Text>
        </View>
      )}
    </View>
  );
}
