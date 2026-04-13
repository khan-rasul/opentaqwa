import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, Pressable, ScrollView, Share } from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, RefreshCw, Share2, BookOpen, ChevronDown, ChevronUp } from "lucide-react-native";
import { asmaUlHusnaApi } from "@opentaqwa/shared";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";

const ACCENT = "#af8f69";

export default function NamesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [nameData, setNameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWisdom, setShowWisdom] = useState(false);

  useEffect(() => { fetchDailyName(); }, []);

  const fetchDailyName = async () => {
    try {
      setLoading(true);
      setShowWisdom(false);
      const data = await asmaUlHusnaApi.getDailyName();
      setNameData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomName = async () => {
    try {
      setLoading(true);
      setShowWisdom(false);
      const randomId = Math.floor(Math.random() * 99) + 1;
      const data = await asmaUlHusnaApi.getNameById(randomId);
      setNameData(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onShare = async () => {
    if (!nameData) return;
    try {
      await Share.share({
        message: `${nameData.arabic}\n${nameData.english} — ${nameData.meaning}\n\n${nameData.description}`,
      });
    } catch {}
  };

  if (loading && !nameData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={ACCENT} />
        <Text style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Quicksand-Bold", fontSize: 11, marginTop: 12, fontStyle: "italic" }}>
          Revealing the Divine Name...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: insets.bottom + 32,
        gap: 10,
      }}
    >
      {/* Header row */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <View>
          <Text style={{ color: "white", fontFamily: "Montserrat-Black", fontSize: 22, letterSpacing: -0.4 }}>
            al-Asmā'
          </Text>
          <Text style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Quicksand-Bold", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>
            99 Divine Names
          </Text>
        </View>
        <Pressable
          onPress={() => router.back()}
          style={{ width: 32, height: 32, alignItems: "center", justifyContent: "center", opacity: 0.7 }}
        >
          <ChevronLeft size={22} color={ACCENT} strokeWidth={2.5} />
        </Pressable>
      </View>

      {nameData && (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
          {/* Main name card */}
          <View style={{
            backgroundColor: "rgba(255,255,255,0.035)",
            borderRadius: 16,
            borderWidth: 0.5,
            borderColor: "rgba(255,255,255,0.07)",
            overflow: "hidden",
            marginBottom: 10,
          }}>
            {/* Accent bar */}
            <View style={{
              position: "absolute", left: 0, top: 0, bottom: 0,
              width: 2.5, backgroundColor: ACCENT, opacity: 0.5,
            }} />

            <View style={{ padding: 20, paddingLeft: 22 }}>
              {/* Number badge */}
              <View style={{ alignSelf: "center", marginBottom: 16 }}>
                <Text style={{
                  color: "rgba(255,255,255,0.2)",
                  fontFamily: "Quicksand-Bold",
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                }}>
                  Name {nameData.number} of 99
                </Text>
              </View>

              {/* Arabic */}
              <Text style={{
                color: ACCENT,
                fontSize: 56,
                fontWeight: "400",
                textAlign: "center",
                lineHeight: 72,
                marginBottom: 12,
                writingDirection: "rtl",
              }}>
                {nameData.arabic}
              </Text>

              {/* English name */}
              <Text style={{
                color: "white",
                fontFamily: "Montserrat-Black",
                fontSize: 20,
                textAlign: "center",
                letterSpacing: -0.3,
                marginBottom: 6,
              }}>
                {nameData.english}
              </Text>

              {/* Meaning */}
              <Text style={{
                color: ACCENT,
                opacity: 0.7,
                fontFamily: "Quicksand-SemiBold",
                fontSize: 12,
                fontStyle: "italic",
                textAlign: "center",
                marginBottom: 16,
              }}>
                {nameData.meaning}
              </Text>

              {/* Divider */}
              <View style={{ height: 0.5, backgroundColor: "rgba(255,255,255,0.06)", marginBottom: 16 }} />

              {/* Description */}
              <Text style={{
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Quicksand-Medium",
                fontSize: 13,
                lineHeight: 20,
                textAlign: "center",
                marginBottom: 18,
              }}>
                {nameData.description}
              </Text>

              {/* Wisdom toggle */}
              {(nameData.summary || (nameData.location?.filter(Boolean).length > 0)) && (
                <>
                  <Pressable
                    onPress={() => setShowWisdom((v) => !v)}
                    style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}
                  >
                    {showWisdom ? (
                      <ChevronUp size={12} color="rgba(255,255,255,0.2)" />
                    ) : (
                      <ChevronDown size={12} color="rgba(255,255,255,0.2)" />
                    )}
                    <Text style={{
                      color: "rgba(255,255,255,0.2)",
                      fontFamily: "Quicksand-Bold",
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                    }}>
                      Summary & Wisdom
                    </Text>
                  </Pressable>

                  {showWisdom && (
                    <View style={{ marginTop: 14, paddingTop: 14, borderTopWidth: 0.5, borderTopColor: "rgba(255,255,255,0.06)" }}>
                      {!!nameData.summary && (
                        <Text style={{
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "Quicksand-Medium",
                          fontSize: 12,
                          lineHeight: 19,
                          marginBottom: 12,
                        }}>
                          {nameData.summary}
                        </Text>
                      )}

                      {nameData.location?.filter(Boolean).length > 0 && (
                        <View>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 8 }}>
                            <BookOpen size={10} color="rgba(255,255,255,0.2)" />
                            <Text style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Quicksand-Bold", fontSize: 9, textTransform: "uppercase", letterSpacing: 1.5 }}>
                              Referenced in Qur'ān
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                            {nameData.location.filter(Boolean).map((loc, idx) => (
                              <View key={idx} style={{
                                backgroundColor: "rgba(255,255,255,0.04)",
                                borderWidth: 0.5,
                                borderColor: "rgba(255,255,255,0.08)",
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                              }}>
                                <Text style={{ color: "rgba(255,255,255,0.35)", fontFamily: "Quicksand-Bold", fontSize: 11 }}>
                                  Surah {loc}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                </>
              )}

              {/* Actions */}
              <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 6, marginTop: 18 }}>
                <Pressable
                  onPress={onShare}
                  style={{
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: "rgba(255,255,255,0.05)",
                    alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Share2 size={14} color="rgba(255,255,255,0.35)" strokeWidth={2} />
                </Pressable>
              </View>
            </View>
          </View>

          {/* Shuffle button */}
          <Pressable
            onPress={fetchRandomName}
            disabled={loading}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              paddingVertical: 14,
              borderRadius: 14,
              borderWidth: 0.5,
              borderColor: loading ? "rgba(255,255,255,0.04)" : "rgba(175,143,105,0.25)",
              backgroundColor: loading ? "rgba(255,255,255,0.02)" : "rgba(175,143,105,0.06)",
            }}
          >
            <RefreshCw size={14} color={loading ? "rgba(255,255,255,0.2)" : ACCENT} />
            <Text style={{
              color: loading ? "rgba(255,255,255,0.2)" : ACCENT,
              fontFamily: "Quicksand-Bold",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: 1.5,
            }}>
              {loading ? "Loading..." : "Discover Another Name"}
            </Text>
          </Pressable>
        </Animated.View>
      )}
    </ScrollView>
  );
}
