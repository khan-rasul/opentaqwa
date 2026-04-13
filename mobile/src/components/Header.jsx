import React from "react";
import { View, Text, Pressable } from "react-native";
import { Moon, Bookmark, ChevronLeft } from "lucide-react-native";
import { useRouter, usePathname } from "expo-router";
import { usePrayer } from "@/context/PrayerContext";

const ACCENT = "#af8f69";

const PAGE_TITLES = {
  "/": "OpenTaqwā",
  "/dhikr": "Adhkār",
  "/dua": "Du'ā",
  "/durood": "Durōōd",
  "/quran": "al-Qur'ān",
  "/names": "al-Asmā'",
  "/qibla": "Qiblah",
  "/prayer": "Prayer",
  "/favourites": "Saved",
};

const PAGE_SUBTITLES = {
  "/dhikr": "Remembrance",
  "/dua": "Supplication",
  "/durood": "Salutation",
  "/quran": "Divine Guidance",
  "/names": "99 Divine Names",
  "/qibla": "Holy Kaaba Direction",
  "/prayer": "Five Daily Prayers",
  "/favourites": "Your Collection",
};

const STACK_BACK = new Set(["/dhikr", "/dua", "/durood", "/names", "/qibla"]);
const HOME_BACK = new Set(["/quran", "/prayer", "/favourites"]);

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { nextPrayer, loading } = usePrayer();

  const pageTitle = PAGE_TITLES[pathname];
  const pageSubtitle = PAGE_SUBTITLES[pathname];
  const showBack = STACK_BACK.has(pathname) || HOME_BACK.has(pathname);
  const handleBack = STACK_BACK.has(pathname)
    ? () => router.back()
    : () => router.push("/(tabs)/");

  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      paddingHorizontal: 4,
      paddingVertical: 6,
    }}>
      {/* Back button */}
      {showBack && (
        <Pressable
          onPress={handleBack}
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderWidth: 0.5,
            borderColor: "rgba(255,255,255,0.1)",
            flexShrink: 0,
          }}
        >
          <ChevronLeft size={18} color="rgba(255,255,255,0.6)" strokeWidth={2.5} />
        </Pressable>
      )}

      {/* Title + subtitle */}
      <View style={{ flex: 1 }}>
        {pageTitle && (
          <Text style={{
            color: "white",
            fontFamily: "Montserrat-Black",
            fontSize: 15,
            letterSpacing: -0.3,
            lineHeight: 18,
          }}>
            {pageTitle}
          </Text>
        )}
        {pageSubtitle && (
          <Text style={{
            color: "rgba(255,255,255,0.25)",
            fontFamily: "Quicksand-Bold",
            fontSize: 8,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            marginTop: 1,
          }}>
            {pageSubtitle}
          </Text>
        )}
      </View>

      {/* Right: bookmark + prayer pill */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flexShrink: 0 }}>
        <Pressable
          onPress={() => router.push("/(tabs)/favourites")}
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderWidth: 0.5,
            borderColor: "rgba(255,255,255,0.1)",
          }}
        >
          <Bookmark size={14} color="rgba(255,255,255,0.5)" strokeWidth={2} />
        </Pressable>

        {!loading && nextPrayer && (
          <View style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(175,143,105,0.08)",
            borderWidth: 0.5,
            borderColor: "rgba(175,143,105,0.25)",
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}>
            <Moon size={10} color={ACCENT} strokeWidth={2} />
            <View>
              <Text style={{
                color: ACCENT,
                fontFamily: "Quicksand-Bold",
                fontSize: 10,
                letterSpacing: 0.3,
                lineHeight: 13,
              }}>
                {nextPrayer.name}
              </Text>
              <Text style={{
                color: "rgba(255,255,255,0.4)",
                fontFamily: "Quicksand-Bold",
                fontSize: 9,
                letterSpacing: 0.3,
                lineHeight: 12,
              }}>
                {nextPrayer.time}
              </Text>
            </View>
          </View>
        )}

        {loading && (
          <View style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            borderWidth: 0.5,
            borderColor: "rgba(255,255,255,0.07)",
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}>
            <Text style={{
              color: "rgba(255,255,255,0.2)",
              fontFamily: "Quicksand-Bold",
              fontSize: 9,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}>
              Loading...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
