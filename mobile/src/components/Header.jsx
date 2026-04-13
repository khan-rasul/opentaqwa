import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Moon, Bookmark, ChevronLeft, Menu } from "lucide-react-native";
import { useRouter, usePathname } from "expo-router";
import { usePrayer } from "@/context/PrayerContext";
import MenuDrawer from "@/components/MenuDrawer";

const ACCENT = "#af8f69";

const PAGE_TITLES = {
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

const BACK_PATHS = new Set(["/dhikr", "/dua", "/durood", "/names", "/qibla", "/quran", "/prayer", "/favourites"]);

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { nextPrayer, loading } = usePrayer();

  const [menuOpen, setMenuOpen] = useState(false);
  const pageTitle = PAGE_TITLES[pathname];
  const pageSubtitle = PAGE_SUBTITLES[pathname];
  const showBack = BACK_PATHS.has(pathname);
  const handleBack = () => router.push("/");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 4,
        paddingVertical: 6,
      }}
    >
      <MenuDrawer visible={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Left: drawer on home, back button elsewhere */}
      {pathname === "/" ? (
        <Pressable
          onPress={() => setMenuOpen(true)}
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
          <Menu size={16} color="rgba(255,255,255,0.6)" strokeWidth={2} />
        </Pressable>
      ) : showBack ? (
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
      ) : null}

      {/* Title + subtitle */}
      <View style={{ flex: 1 }}>
        {pageTitle && (
          <Text
            style={{
              color: "white",
              fontFamily: "Montserrat-Black",
              fontSize: 15,
              letterSpacing: -0.3,
              lineHeight: 18,
            }}
          >
            {pageTitle}
          </Text>
        )}
        {pageSubtitle && (
          <Text
            style={{
              color: "rgba(255,255,255,0.25)",
              fontFamily: "Quicksand-Bold",
              fontSize: 8,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginTop: 1,
            }}
          >
            {pageSubtitle}
          </Text>
        )}
      </View>

      {/* Right: bookmark + prayer pill */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
        }}
      >
        <Pressable
          onPress={() => router.push("/favourites")}
          disabled={pathname === "/favourites"}
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: pathname === "/favourites" ? `${ACCENT}22` : "rgba(255,255,255,0.05)",
            borderWidth: 0.5,
            borderColor: pathname === "/favourites" ? `${ACCENT}50` : "rgba(255,255,255,0.1)",
          }}
        >
          <Bookmark
            size={14}
            color={pathname === "/favourites" ? ACCENT : "rgba(255,255,255,0.5)"}
            fill={pathname === "/favourites" ? ACCENT : "none"}
            strokeWidth={2}
          />
        </Pressable>

        {!loading && nextPrayer && (
          <Pressable
            onPress={() => router.push("/prayer")}
            disabled={pathname === "/prayer"}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                backgroundColor: pathname === "/prayer" ? `${ACCENT}20` : "rgba(175,143,105,0.08)",
                borderWidth: 0.5,
                borderColor: pathname === "/prayer" ? `${ACCENT}60` : "rgba(175,143,105,0.25)",
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Moon
                size={10}
                color={ACCENT}
                fill={pathname === "/prayer" ? ACCENT : "none"}
                strokeWidth={2}
              />
              <View>
                <Text
                  style={{
                    color: ACCENT,
                    fontFamily: "Quicksand-Bold",
                    fontSize: 10,
                    letterSpacing: 0.3,
                    lineHeight: 13,
                  }}
                >
                  {nextPrayer.name}
                </Text>
                <Text
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "Quicksand-Bold",
                    fontSize: 9,
                    letterSpacing: 0.3,
                    lineHeight: 12,
                  }}
                >
                  {nextPrayer.time}
                </Text>
              </View>
            </View>
          </Pressable>
        )}

        {loading && (
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              borderWidth: 0.5,
              borderColor: "rgba(255,255,255,0.07)",
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
            }}
          >
            <Text
              style={{
                color: "rgba(255,255,255,0.2)",
                fontFamily: "Quicksand-Bold",
                fontSize: 9,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Loading...
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
