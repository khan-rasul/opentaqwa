// app/dhikr.js
import React, { useState } from "react";
import { View, Text, Pressable, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { X, RotateCcw, Target } from "lucide-react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";

const PRESET_GOALS = [
  { label: "33", value: 33 },
  { label: "99", value: 99 },
  { label: "100", value: 100 },
  { label: "∞", value: null }, // No limit
];

export default function DhikrPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(null); // null = no goal
  const scale = useSharedValue(1);
  const rippleScale = useSharedValue(0);

  // Calculate progress
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
    // Haptic feedback
    Vibration.vibrate(10);

    // Button animation
    scale.value = withSequence(
      withSpring(0.95, { damping: 15 }),
      withSpring(1, { damping: 15 })
    );

    // Ripple effect
    rippleScale.value = 0;
    rippleScale.value = withSpring(1, { damping: 20 });

    // Increment count
    if (!isComplete) {
      setCount((prev) => prev + 1);
    }

    // Celebrate completion
    if (goal && count + 1 === goal) {
      Vibration.vibrate([0, 100, 50, 100]); // Victory pattern
    }
  };

  const handleReset = () => {
    Vibration.vibrate(20);
    setCount(0);
    scale.value = withSpring(1);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#0f0d0c" }}>
      <LinearGradient
        colors={["#4a3f32", "#3d3530", "#2a2522", "#1a1614"]}
        locations={[0, 0.3, 0.7, 1]}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 20,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 40,
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
                backgroundColor: "rgba(255, 255, 255, 0.03)",
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
                    borderColor: "rgba(175, 143, 105, 0.2)",
                  }}
                >
                  <View
                    style={{
                      position: "absolute",
                      width: 280,
                      height: 280,
                      borderRadius: 140,
                      borderWidth: 8,
                      borderColor: "#af8f69",
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
                    backgroundColor: "rgba(175, 143, 105, 0.3)",
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
                      : "rgba(175, 143, 105, 0.15)",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    borderColor: isComplete
                      ? "rgba(34, 197, 94, 0.4)"
                      : "rgba(175, 143, 105, 0.3)",
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

            {/* Tap instruction */}
            {count === 0 && (
              <Text
                style={{
                  color: "rgba(255, 255, 255, 0.4)",
                  fontSize: 14,
                  fontWeight: "500",
                  marginTop: 32,
                  fontStyle: "italic",
                }}
              >
                Tap to count
              </Text>
            )}
          </View>

          {/* Goal Presets */}
          <View style={{ paddingBottom: 20 }}>
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
                  onPress={() => {
                    setGoal(preset.value);
                    if (count >= preset.value && preset.value !== null) {
                      setCount(0);
                    }
                  }}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderRadius: 16,
                    backgroundColor:
                      goal === preset.value
                        ? "rgba(175, 143, 105, 0.3)"
                        : "rgba(255, 255, 255, 0.06)",
                    borderWidth: 1,
                    borderColor:
                      goal === preset.value
                        ? "rgba(175, 143, 105, 0.5)"
                        : "rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <Text
                    style={{
                      color:
                        goal === preset.value
                          ? "#af8f69"
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
