/*
 * OpenTaqwā - Weekly Stats Component
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Flame, Trophy, Target } from "lucide-react-native";
import { useDhikrGoals } from "@/context/DhikrGoalsContext";

export default function WeeklyStats({ goalId }) {
  const { getWeeklyStats, getCurrentStreak, getBestStreak } = useDhikrGoals();
  const weeklyStats = getWeeklyStats(goalId);
  const currentStreak = getCurrentStreak(goalId);
  const bestStreak = getBestStreak(goalId);

  const stats = [
    {
      icon: Calendar,
      label: "This Week",
      value: `${weeklyStats.daysCompleted} of 7 days`,
      color: "#60a5fa",
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: `${currentStreak} day${currentStreak !== 1 ? "s" : ""}`,
      color: "#fbbf24",
    },
    {
      icon: Trophy,
      label: "Best Streak",
      value: `${bestStreak} day${bestStreak !== 1 ? "s" : ""}`,
      color: "#625443",
    },
    {
      icon: Target,
      label: "Total This Week",
      value: weeklyStats.totalCount.toLocaleString(),
      color: "#2d5a3d",
    },
  ];

  return (
    <View className="mb-4">
      <Text className="text-white/80 text-sm font-quicksand mb-3">
        Weekly Statistics
      </Text>
      <View className="flex-row flex-wrap gap-2">
        {stats.map((stat, index) => (
          <View
            key={index}
            className="flex-1 min-w-[45%] rounded-xl overflow-hidden bg-black shadow-black shadow-offset-[2px,4px] shadow-opacity-30 shadow-radius-8"
            style={{ elevation: 8 }}
          >
            <LinearGradient
              colors={[`${stat.color}20`, `${stat.color}10`]}
              style={{ padding: 12 }}
            >
              <View className="flex-row items-center gap-2 mb-2">
                <stat.icon size={16} color={stat.color} />
                <Text className="text-white/60 text-xs font-quicksand">
                  {stat.label}
                </Text>
              </View>
              <Text className="text-white text-lg font-montserrat font-bold">
                {stat.value}
              </Text>
            </LinearGradient>
          </View>
        ))}
      </View>
    </View>
  );
}
