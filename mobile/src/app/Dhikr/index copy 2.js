// app/dhikr.js
import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X, RotateCcw, Target, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";

const DHIKR_PHRASES = [
  {
    id: 1,
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    transliteration: "SubhanAllah",
    translation: "Glory be to Allah",
    color: "#625443", // gold
    gradient: ["#625443", "#4a3f32"],
  },
  {
    id: 2,
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    transliteration: "Alhamdulillah",
    translation: "Praise be to Allah",
    color: "#8B9D98", // forest
    gradient: ["#8B9D98", "#6B8B85"],
  },
  {
    id: 3,
    arabic: "اللّٰهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest",
    color: "#5E4B56", // plum
    gradient: ["#5E4B56", "#463640"],
  },
  {
    id: 4,
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    transliteration: "La ilaha illallah",
    translation: "There is no god but Allah",
    color: "#264872", // ocean
    gradient: ["#264872", "#1a3454"],
  },
];

const PRESET_GOALS = [
  { label: "33", value: 33 },
  { label: "99", value: 99 },
  { label: "100", value: 100 },
  { label: "∞", value: null },
];

export default function DhikrPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Each phrase has its own count and goal
  const [phraseCounts, setPhraseCounts] = useState(
    DHIKR_PHRASES.reduce((acc, phrase) => {
      acc[phrase.id] = { count: 0, goal: null };
      return acc;
    }, {})
  );

  const [selectedPhrase, setSelectedPhrase] = useState(DHIKR_PHRASES[0]);

  const scale = useSharedValue(1);
  const rippleScale = useSharedValue(0);

  // Get current phrase data
  const currentData = phraseCounts[selectedPhrase.id];
  const count = currentData.count;
  const goal = currentData.goal;
  const progress = goal ? (count / goal) * 100 : 0;
  const isComplete = goal && count >= goal;

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedRippleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: 1 - rippleScale.value,
  }));

  const handlePress = () => {
    Vibration.vibrate(10);

    scale.value = withSequence(
      withSpring(0.95, { damping: 15 }),
      withSpring(1, { damping: 15 })
    );

    rippleScale.value = 0;
    rippleScale.value = withSpring(1, { damping: 20 });

    if (!isComplete) {
      setPhraseCounts((prev) => ({
        ...prev,
        [selectedPhrase.id]: {
          ...prev[selectedPhrase.id],
          count: prev[selectedPhrase.id].count + 1,
        },
      }));
    }

    if (goal && count + 1 === goal) {
      Vibration.vibrate([0, 100, 50, 100]);
    }
  };

  const handleReset = () => {
    Vibration.vibrate(20);
    setPhraseCounts((prev) => ({
      ...prev,
      [selectedPhrase.id]: {
        ...prev[selectedPhrase.id],
        count: 0,
      },
    }));
    scale.value = withSpring(1);
  };

  const handleSetGoal = (goalValue) => {
    setPhraseCounts((prev) => ({
      ...prev,
      [selectedPhrase.id]: {
        ...prev[selectedPhrase.id],
        goal: goalValue,
        count:
          goalValue !== null && prev[selectedPhrase.id].count >= goalValue
            ? 0
            : prev[selectedPhrase.id].count,
      },
    }));
  };

  const handleSelectPhrase = (phrase) => {
    Vibration.vibrate(10);
    setSelectedPhrase(phrase);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0d0c" }}>
      <LinearGradient
        colors={["#3d3530", "#2a2522", "#1a1614", "#0f0d0c"]}
        locations={[0, 0.3, 0.7, 1]}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 20,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              paddingHorizontal: 20,
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
                Dhikr
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
                Remembrance
              </Text>
            </View>

            <Pressable
              onPress={handleReset}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <RotateCcw size={18} color="#FFFFFF" strokeWidth={2} />
            </Pressable>
          </View>

          {/* Phrase Selector */}
          <View style={{ marginBottom: 32 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 11,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                  flex: 1,
                }}
              >
                Choose Phrase
              </Text>
              <ChevronRight size={14} color="rgba(255, 255, 255, 0.4)" />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 20,
                gap: 12,
              }}
            >
              {DHIKR_PHRASES.map((phrase) => (
                <PhraseCard
                  key={phrase.id}
                  phrase={phrase}
                  selected={selectedPhrase.id === phrase.id}
                  count={phraseCounts[phrase.id].count}
                  onSelect={() => handleSelectPhrase(phrase)}
                />
              ))}
            </ScrollView>
          </View>

          {/* Main Counter */}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            {/* Circular Progress Background */}
            <View
              style={{
                width: 280,
                height: 280,
                borderRadius: 140,
                backgroundColor: `${selectedPhrase.color}10`,
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Progress Ring */}
              {goal && (
                <View
                  style={{
                    position: "absolute",
                    width: 280,
                    height: 280,
                    borderRadius: 140,
                    borderWidth: 8,
                    borderColor: `${selectedPhrase.color}30`,
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      width: 280,
                      height: 280,
                      borderRadius: 140,
                      borderWidth: 8,
                      borderColor: selectedPhrase.color,
                      borderRightColor: "transparent",
                      borderBottomColor: "transparent",
                      transform: [{ rotate: `${progress * 3.6 - 90}deg` }],
                    }}
                  />
                </View>
              )}

              {/* Ripple Effect */}
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    width: 260,
                    height: 260,
                    borderRadius: 130,
                    backgroundColor: `${selectedPhrase.color}50`,
                  },
                  animatedRippleStyle,
                ]}
              />

              {/* Tappable Button */}
              <Animated.View
                style={[{ width: 240, height: 240 }, animatedButtonStyle]}
              >
                <Pressable
                  onPress={handlePress}
                  disabled={isComplete}
                  style={{
                    width: 240,
                    height: 240,
                    borderRadius: 120,
                    backgroundColor: isComplete
                      ? "rgba(34, 197, 94, 0.2)"
                      : `${selectedPhrase.color}25`,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: isComplete
                      ? "rgba(34, 197, 94, 0.4)"
                      : `${selectedPhrase.color}60`,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 72,
                      fontWeight: "700",
                      letterSpacing: -2,
                    }}
                  >
                    {count}
                  </Text>
                  {goal && (
                    <Text
                      style={{
                        color: "rgba(255, 255, 255, 0.6)",
                        fontSize: 16,
                        fontWeight: "600",
                        marginTop: 4,
                      }}
                    >
                      of {goal}
                    </Text>
                  )}
                  {isComplete && (
                    <Text
                      style={{
                        color: "#22c55e",
                        fontSize: 14,
                        fontWeight: "700",
                        marginTop: 8,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      ✓ Complete
                    </Text>
                  )}
                </Pressable>
              </Animated.View>
            </View>

            {/* Phrase Display */}
            <View
              style={{
                marginTop: 32,
                alignItems: "center",
                paddingHorizontal: 40,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 32,
                  fontWeight: "400",
                  marginBottom: 8,
                  textAlign: "center",
                }}
                dir="rtl"
              >
                {selectedPhrase.arabic}
              </Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 4,
                  fontStyle: "italic",
                }}
              >
                {selectedPhrase.transliteration}
              </Text>
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 13,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {selectedPhrase.translation}
              </Text>
            </View>
          </View>

          {/* Goal Presets */}
          <View style={{ paddingBottom: 20, paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <Target size={14} color="rgba(255, 255, 255, 0.6)" />
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 11,
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: 1.2,
                }}
              >
                Set Goal
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 12,
                justifyContent: "center",
              }}
            >
              {PRESET_GOALS.map((preset) => (
                <Pressable
                  key={preset.label}
                  onPress={() => handleSetGoal(preset.value)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 16,
                    backgroundColor:
                      goal === preset.value
                        ? `${selectedPhrase.color}40`
                        : "rgba(255, 255, 255, 0.06)",
                    borderWidth: 1,
                    borderColor:
                      goal === preset.value
                        ? `${selectedPhrase.color}80`
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Text
                    style={{
                      color:
                        goal === preset.value
                          ? selectedPhrase.color
                          : "rgba(255, 255, 255, 0.8)",
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    {preset.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

// Phrase Card Component
function PhraseCard({ phrase, selected, count, onSelect }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onSelect}
      style={{
        width: 140,
        borderRadius: 16,
        backgroundColor: selected
          ? `${phrase.color}20`
          : "rgba(26, 22, 20, 0.3)",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        opacity: pressed ? 0.8 : 1,
        transform: [{ scale: pressed ? 0.97 : 1 }],
      }}
    >
      <View
        style={{
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: selected
            ? `${phrase.color}30`
            : "rgba(255, 255, 255, 0.08)",
          borderWidth: selected ? 1.5 : 0.5,
          borderColor: selected
            ? `${phrase.color}80`
            : "rgba(255, 255, 255, 0.12)",
        }}
      >
        {/* Top shine */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }}
        />

        <View style={{ padding: 14 }}>
          {/* Count Badge */}
          {count > 0 && (
            <View
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: phrase.color,
                borderRadius: 10,
                minWidth: 24,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                {count}
              </Text>
            </View>
          )}

          {/* Arabic */}
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: "400",
              marginBottom: 6,
              textAlign: "center",
            }}
            dir="rtl"
            numberOfLines={2}
          >
            {phrase.arabic}
          </Text>

          {/* Transliteration */}
          <Text
            style={{
              color: selected ? phrase.color : "rgba(255, 255, 255, 0.7)",
              fontSize: 11,
              fontWeight: "600",
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {phrase.transliteration}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
