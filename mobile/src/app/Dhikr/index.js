// app/dhikr.js
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  X,
  Heart,
  Share2,
  Volume2,
  BookOpen,
  Sun,
  Moon,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

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
    color: "#625443",
    gradient: ["#625443", "#4a3f32"],
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
    color: "#8B9D98",
    gradient: ["#8B9D98", "#6B8B85"],
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
    color: "#5E4B56",
    gradient: ["#5E4B56", "#463640"],
  },
  {
    id: 4,
    arabic: "ٱللَّٰهُمَّ إِنِّي أَسْأَلُكَ ٱلْعَافِيَةَ",
    transliteration: "Allahumma inni as'alukal-'afiyah",
    translation: "O Allah, I ask You for well-being",
    benefit: "There is nothing more comprehensive than asking for well-being",
    reference: "Sunan Ibn Majah 3851",
    category: "evening",
    color: "#264872",
    gradient: ["#264872", "#1a3454"],
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
    color: "#af8f69",
    gradient: ["#af8f69", "#8a7254"],
  },
];

export default function DhikrPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  // Filter dhikr by category
  const filteredDhikr = DHIKR_COLLECTION.filter((dhikr) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "favorites") return favorites.includes(dhikr.id);
    return dhikr.category === selectedCategory;
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0d0c" }}>
      <LinearGradient
        colors={["#3d3530", "#2a2522", "#1a1614", "#0f0d0c"]}
        locations={[0, 0.3, 0.7, 1]}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          style={{
            paddingTop: insets.top + 16,
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <X size={20} color="#FFFFFF" strokeWidth={2} />
            </Pressable>

            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 20,
                  fontWeight: "700",
                  letterSpacing: 0.5,
                }}
              >
                Adhkār
              </Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 11,
                  fontWeight: "500",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  marginTop: 2,
                }}
              >
                Remembrance Collection
              </Text>
            </View>

            <View style={{ width: 40 }} />
          </View>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
          >
            {DHIKR_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;

              return (
                <Pressable
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: isSelected
                      ? "rgba(175, 143, 105, 0.25)"
                      : "rgba(255, 255, 255, 0.06)",
                    borderWidth: 1,
                    borderColor: isSelected
                      ? "rgba(175, 143, 105, 0.4)"
                      : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Icon
                    size={14}
                    color={isSelected ? "#af8f69" : "rgba(255, 255, 255, 0.7)"}
                    strokeWidth={2}
                  />
                  <Text
                    style={{
                      color: isSelected
                        ? "#af8f69"
                        : "rgba(255, 255, 255, 0.7)",
                      fontSize: 13,
                      fontWeight: "600",
                    }}
                  >
                    {category.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Dhikr Cards */}
        {filteredDhikr.length > 0 ? (
          <>
            <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={scrollHandler}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={CARD_WIDTH + 20}
              contentContainerStyle={{
                paddingHorizontal: 20,
                gap: 20,
                paddingBottom: insets.bottom + 40,
              }}
              // KEY FIX: Reset scroll position when filter changes
              key={selectedCategory}
            >
              {filteredDhikr.map((dhikr, index) => (
                <DhikrCard
                  key={dhikr.id}
                  dhikr={dhikr}
                  index={index}
                  scrollX={scrollX}
                  isFavorited={favorites.includes(dhikr.id)}
                  onToggleFavorite={() => toggleFavorite(dhikr.id)}
                  cardWidth={CARD_WIDTH}
                />
              ))}
            </Animated.ScrollView>

            {/* Pagination Dots */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
                paddingBottom: insets.bottom + 20,
              }}
            >
              {filteredDhikr.map((dhikr, index) => (
                <PaginationDot
                  key={dhikr.id}
                  index={index}
                  scrollX={scrollX}
                  cardWidth={CARD_WIDTH}
                />
              ))}
            </View>
          </>
        ) : (
          // Empty state for favorites
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 40,
            }}
          >
            <Heart
              size={48}
              color="rgba(255, 255, 255, 0.3)"
              strokeWidth={1.5}
            />
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: 16,
                fontWeight: "600",
                marginTop: 16,
                textAlign: "center",
              }}
            >
              No favorites yet
            </Text>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: 13,
                fontWeight: "500",
                marginTop: 8,
                textAlign: "center",
              }}
            >
              Tap the heart icon on any dhikr to save it here
            </Text>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

// FIXED: Separate component for pagination dots
function PaginationDot({ index, scrollX, cardWidth }) {
  const inputRange = [
    (index - 1) * (cardWidth + 20),
    index * (cardWidth + 20),
    (index + 1) * (cardWidth + 20),
  ];

  const animatedDotStyle = useAnimatedStyle(() => {
    const width = interpolate(scrollX.value, inputRange, [8, 24, 8], "clamp");
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      "clamp"
    );

    return { width, opacity };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: "#af8f69",
        },
        animatedDotStyle,
      ]}
    />
  );
}

// FIXED: Dhikr Card Component - hooks always called in same order
function DhikrCard({
  dhikr,
  index,
  scrollX,
  isFavorited,
  onToggleFavorite,
  cardWidth,
}) {
  const [showBenefit, setShowBenefit] = useState(false);

  // IMPORTANT: Hooks must be called unconditionally
  const inputRange = [
    (index - 1) * (cardWidth + 20),
    index * (cardWidth + 20),
    (index + 1) * (cardWidth + 20),
  ];

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0.9, 1, 0.9],
      "clamp"
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      "clamp"
    );

    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View
      style={[
        {
          width: cardWidth,
          borderRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 6, height: 10 },
          shadowOpacity: 0.4,
          shadowRadius: 20,
          elevation: 20,
        },
        animatedStyle,
      ]}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["#af8f69", "#4a3f32"]}
          start={[0, 0]}
          end={[1, 1]}
          style={{ flex: 1 }}
        >
          {/* Top shine */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "35%",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            }}
          />

          {/* Decorative circles */}
          <View
            style={{
              position: "absolute",
              top: -30,
              right: -30,
              width: 100,
              height: 100,
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              borderRadius: 50,
            }}
          />
          <View
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              width: 70,
              height: 70,
              backgroundColor: "rgba(0, 0, 0, 0.08)",
              borderRadius: 35,
            }}
          />

          <View style={{ flex: 1, padding: 24 }}>
            {/* Actions */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 24,
                zIndex: 1,
              }}
            >
              <Pressable
                onPress={() => console.log("Play audio")}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <Volume2 size={20} color="#FFFFFF" strokeWidth={2} />
              </Pressable>

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  onPress={onToggleFavorite}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Heart
                    size={20}
                    color={isFavorited ? "#ef4444" : "#FFFFFF"}
                    fill={isFavorited ? "#ef4444" : "none"}
                    strokeWidth={2}
                  />
                </Pressable>

                <Pressable
                  onPress={() => console.log("Share")}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Share2 size={20} color="#FFFFFF" strokeWidth={2} />
                </Pressable>
              </View>
            </View>

            {/* Content */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              {/* Arabic */}
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 28,
                  fontWeight: "400",
                  textAlign: "center",
                  lineHeight: 48,
                  marginBottom: 24,
                }}
                dir="rtl"
              >
                {dhikr.arabic}
              </Text>

              {/* Transliteration */}
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: 16,
                  fontWeight: "600",
                  fontStyle: "italic",
                  textAlign: "center",
                  marginBottom: 12,
                }}
              >
                {dhikr.transliteration}
              </Text>

              {/* Translation */}
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.85)",
                  fontSize: 15,
                  fontWeight: "500",
                  textAlign: "center",
                  lineHeight: 24,
                  marginBottom: 24,
                }}
              >
                "{dhikr.translation}"
              </Text>

              {/* Benefit Toggle */}
              <Pressable
                onPress={() => setShowBenefit(!showBenefit)}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: "rgba(255, 255, 255, 0.15)",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 13,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  {showBenefit ? "Hide Benefit" : "Show Benefit"}
                </Text>
              </Pressable>

              {/* Benefit & Reference */}
              {showBenefit && (
                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      padding: 16,
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.75)",
                        fontSize: 13,
                        fontWeight: "500",
                        lineHeight: 20,
                        marginBottom: 12,
                        textAlign: "center",
                      }}
                    >
                      {dhikr.benefit}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <BookOpen size={12} color="rgba(255, 255, 255, 0.5)" />
                      <Text
                        style={{
                          color: "rgba(255, 255, 255, 0.5)",
                          fontSize: 11,
                          fontWeight: "500",
                          fontStyle: "italic",
                        }}
                      >
                        {dhikr.reference}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );
}
