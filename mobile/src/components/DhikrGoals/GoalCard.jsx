/*
 * OpenTaqwā - Goal Card Component
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Flame, Trophy, MoreVertical, Play, Pause, Trash2 } from "lucide-react-native";
import { useDhikrGoals } from "@/context/DhikrGoalsContext";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from "react-native-reanimated";
// Haptics will be added if expo-haptics is installed
let Haptics = null;
try {
  Haptics = require("expo-haptics");
} catch (e) {
  // Haptics not available
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function GoalCard({ goal }) {
  const { incrementCounter, pauseGoal, resumeGoal, deleteGoal } = useDhikrGoals();
  const scale = useSharedValue(1);
  const progressScale = useSharedValue(0);

  // Calculate progress percentage
  const progress = goal.targetCount > 0 
    ? Math.min((goal.currentCount / goal.targetCount) * 100, 100) 
    : 0;
  const isCompleted = goal.currentCount >= goal.targetCount;
  const isPaused = goal.status === "paused";

  // Animate progress bar
  React.useEffect(() => {
    progressScale.value = withTiming(progress / 100, { duration: 300 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressScale.value * 100}%`,
  }));

  const handleCounterPress = () => {
    if (isPaused || isCompleted) return;

    // Haptic feedback (if available)
    if (Haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    // Animation
    scale.value = withSequence(
      withSpring(0.95, { damping: 15, stiffness: 300 }),
      withSpring(1, { damping: 15, stiffness: 300 })
    );

    incrementCounter(goal.id);

    // Celebration haptic on completion
    if (goal.currentCount + 1 >= goal.targetCount && Haptics) {
      setTimeout(() => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, 100);
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resumeGoal(goal.id);
    } else {
      pauseGoal(goal.id);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteGoal(goal.id) },
      ]
    );
  };

  return (
    <View className="mb-4 rounded-2xl overflow-hidden bg-black shadow-black shadow-offset-[4px,8px] shadow-opacity-40 shadow-radius-12" style={{ elevation: 12 }}>
      <LinearGradient
        colors={isCompleted ? ["#263936", "#1e2d2a"] : isPaused ? ["#6b7280", "#4b5563"] : ["#625443", "#4a3f32"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{ padding: 16, position: 'relative' }}
      >
        {/* White patch decorations for completed cards */}
        {isCompleted && (
          <>
            <View className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full" style={{ transform: [{ translateY: -8 }, { translateX: 8 }] }} />
            <View className="absolute bottom-0 left-0 w-8 h-8 bg-white/5 rounded-full" style={{ transform: [{ translateY: 4 }, { translateX: -4 }] }} />
            <View className="absolute top-1/2 left-1/4 w-4 h-4 bg-white/5 rounded-full" />
          </>
        )}
        <View style={{ position: 'relative', zIndex: 10 }}>
        {/* Main Content - All centered in one column */}
        <View className="flex-col items-center mb-3">
          {/* Arabic */}
          {goal.dhikrArabic && (
            <Text className="text-white text-lg font-quicksand font-semibold mb-1" style={{ textAlign: 'center' }}>
              {goal.dhikrArabic}
            </Text>
          )}
          {/* English Transliteration */}
          {goal.dhikrText && (
            <Text className="text-white/80 text-sm font-quicksand mb-1" style={{ textAlign: 'center' }}>
              {goal.dhikrText}
            </Text>
          )}
          {/* Meaning */}
          {goal.dhikrTranslation && (
            <Text className="text-white/60 text-xs font-quicksand mb-3" style={{ textAlign: 'center' }}>
              {goal.dhikrTranslation}
            </Text>
          )}
          
          {/* Counter */}
          <AnimatedPressable
            onPress={handleCounterPress}
            disabled={isPaused || isCompleted}
            className={`mb-2 ${isPaused || isCompleted ? 'opacity-50' : ''}`}
            style={animatedStyle}
          >
            <Text className="text-white text-4xl font-montserrat font-black" style={{ textAlign: 'center' }}>
              {goal.currentCount}
            </Text>
            <Text className="text-white/80 text-sm font-quicksand" style={{ textAlign: 'center' }}>
              / {goal.targetCount}
            </Text>
          </AnimatedPressable>
          
          {/* Completed Status */}
          {isCompleted && (
            <Text className="text-[#d4af37] text-xs font-quicksand font-bold mb-3" style={{ textAlign: 'center' }}>
              ✓ Completed!
            </Text>
          )}
        </View>

        {/* Progress Bar */}
        <View className="h-2 bg-white/10 rounded-full mb-3 overflow-hidden">
          <Animated.View
            className={`h-full rounded-full ${
              isCompleted ? 'bg-[#d4af37]' : 'bg-white/30'
            }`}
            style={progressAnimatedStyle}
          />
        </View>

        {/* Stats Row */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            {/* Current Streak */}
            <View className="flex-row items-center gap-1">
              <Flame size={14} color="#fbbf24" />
              <Text className="text-white/80 text-xs font-quicksand">
                {goal.currentStreak} day{goal.currentStreak !== 1 ? 's' : ''}
              </Text>
            </View>

            {/* Best Streak */}
            {goal.bestStreak > 0 && (
              <View className="flex-row items-center gap-1">
                <Trophy size={14} color="#fbbf24" />
                <Text className="text-white/70 text-xs font-quicksand">
                  Best: {goal.bestStreak}
                </Text>
              </View>
            )}
          </View>

          <View className="flex-row items-center gap-2">
            {/* Percentage */}
            <Text className="text-white/80 text-xs font-quicksand font-semibold">
              {Math.round(progress)}%
            </Text>
            {/* Action Buttons - Bottom Right */}
            <View className="flex-row items-center gap-1">
              <Pressable
                onPress={handlePauseResume}
                className="p-2 rounded-lg bg-white/10"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                {isPaused ? (
                  <Play size={14} color="#fff" />
                ) : (
                  <Pause size={14} color="#fff" />
                )}
              </Pressable>
              <Pressable
                onPress={handleDelete}
                className="p-2 rounded-lg bg-white/10"
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Trash2 size={14} color="#fff" />
              </Pressable>
            </View>
          </View>
        </View>
        </View>
      </LinearGradient>
    </View>
  );
}
