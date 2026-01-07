// components/Verse.js
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BookOpen, RefreshCw, Heart, Share2 } from "lucide-react-native";

// Mock verse data
const mockVerses = [
  {
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    english: "Indeed, Allah is with the patient",
    reference: "Surah Al-Baqarah (2:153)",
  },
  {
    arabic: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا",
    english: "And whoever fears Allah - He will make for him a way out",
    reference: "Surah At-Talaq (65:2)",
  },
  {
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    english: "For indeed, with hardship will be ease",
    reference: "Surah Ash-Sharh (94:5)",
  },
  {
    arabic: "وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ",
    english: "And despair not of relief from Allah",
    reference: "Surah Yusuf (12:87)",
  },
];

export default function Verse() {
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  const verse = mockVerses[currentVerseIndex];

  // Calculate verse length for responsive sizing
  const verseLength =
    (verse.arabic?.length || 0) + (verse.english?.length || 0);

  // Dynamic text sizing based on content length
  const getTextSize = (type) => {
    if (type === "arabic") {
      if (verseLength < 100) return 24;
      if (verseLength < 200) return 20;
      if (verseLength < 300) return 18;
      return 16;
    }
    if (type === "english") {
      if (verseLength < 100) return 16;
      if (verseLength < 200) return 14;
      if (verseLength < 300) return 13;
      return 12;
    }
  };

  const handleShare = () => {
    console.log("Share verse:", verse);
    // TODO: Implement share functionality
  };

  const handleRefresh = () => {
    // Cycle to next verse
    setCurrentVerseIndex((prevIndex) => (prevIndex + 1) % mockVerses.length);
    setIsFavorited(false); // Reset favorite on new verse
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <View
      style={{
        borderRadius: 20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 6, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 18,
        elevation: 18,
        minHeight: 400,
      }}
    >
      <LinearGradient
        colors={["#8B9D98", "#6B8B85"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ flex: 1 }}
      >
        {/* Subtle top shine */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "35%",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }}
        />

        {/* Decorative circles */}
        <View
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            borderRadius: 40,
          }}
        />
        <View
          style={{
            position: "absolute",
            bottom: -15,
            left: -15,
            width: 50,
            height: 50,
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 25,
          }}
        />

        <View style={{ flex: 1, padding: 20 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 20,
              zIndex: 1,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 4,
                  letterSpacing: 0.2,
                }}
              >
                Āyah of the Day
              </Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Daily Quranic Reflection
              </Text>
            </View>

            <IconButton onPress={handleRefresh}>
              <RefreshCw size={18} color="#FFFFFF" strokeWidth={2} />
            </IconButton>
          </View>

          {/* Verse Content - Scrollable */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{
              paddingVertical: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* Arabic Text */}
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: getTextSize("arabic"),
                fontWeight: "400",
                textAlign: "center",
                lineHeight: getTextSize("arabic") * 1.8,
                marginBottom: 20,
                writingDirection: "rtl",
              }}
            >
              {verse.arabic}
            </Text>

            {/* English Translation */}
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: getTextSize("english"),
                fontWeight: "400",
                textAlign: "center",
                lineHeight: getTextSize("english") * 1.6,
                marginBottom: 20,
                fontStyle: "italic",
              }}
            >
              "{verse.english}"
            </Text>

            {/* Reference */}
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: 13,
                fontWeight: "500",
              }}
            >
              {verse.reference}
            </Text>
          </ScrollView>

          {/* Footer - Actions */}
          <View style={{ zIndex: 1, paddingTop: 16 }}>
            {/* Action Buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <ActionButton
                onPress={handleFavorite}
                icon={Heart}
                label={isFavorited ? "Saved" : "Save"}
                active={isFavorited}
              />
              <ActionButton onPress={handleShare} icon={Share2} label="Share" />
            </View>

            {/* Attribution */}
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
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 9,
                  fontWeight: "400",
                  textAlign: "center",
                  flexShrink: 1,
                }}
                numberOfLines={2}
              >
                Translation by Muhammad Taqi-ud-Din al-Hilali & Muhammad Muhsin
                Khan
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

// Icon Button Component
function IconButton({ children, onPress }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        opacity: pressed ? 0.7 : 1,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      }}
    >
      {children}
    </Pressable>
  );
}

// Action Button Component
function ActionButton({ onPress, icon: Icon, label, active }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: "rgba(255, 255, 255, 0.2)",
        opacity: pressed ? 0.7 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      }}
    >
      <Icon
        size={16}
        color={active ? "#ef4444" : "rgba(255, 255, 255, 0.9)"}
        fill={active ? "#ef4444" : "none"}
        strokeWidth={2}
      />
      <Text
        style={{
          color: "rgba(255, 255, 255, 0.9)",
          fontSize: 13,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
