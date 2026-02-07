/*
 * OpenTaqwā - Goals List Component
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { Plus, Target } from "lucide-react-native";
import { useDhikrGoals } from "@/context/DhikrGoalsContext";
import GoalCard from "./GoalCard";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function GoalsList({ onAddGoal }) {
  const { goals, loading } = useDhikrGoals();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#d4af37" />
      </View>
    );
  }

  if (goals.length === 0) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <View className="mb-4 opacity-50">
          <Target size={64} color="#625443" />
        </View>
        <Text className="text-white/80 text-lg font-montserrat font-bold mb-2 text-center">
          No Goals Yet
        </Text>
        <Text className="text-white/60 text-sm font-quicksand text-center mb-6">
          Create your first dhikr goal to start tracking your progress
        </Text>
        <Pressable
          onPress={onAddGoal}
          className="bg-[#625443] px-6 py-3 rounded-xl flex-row items-center gap-2"
        >
          <Plus size={20} color="#fff" />
          <Text className="text-white font-quicksand font-semibold">
            Create Goal
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {goals.map((goal, index) => (
        <Animated.View
          key={goal.id}
          entering={FadeInDown.delay(index * 100)}
        >
          <GoalCard goal={goal} />
        </Animated.View>
      ))}
    </ScrollView>
  );
}
