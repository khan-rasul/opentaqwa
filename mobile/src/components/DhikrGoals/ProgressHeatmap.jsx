/*
 * OpenTaqwā - Progress Heatmap Component
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React from "react";
import { View, Text } from "react-native";
import { useDhikrGoals } from "@/context/DhikrGoalsContext";

export default function ProgressHeatmap({ goalId }) {
  const { getWeeklyStats } = useDhikrGoals();
  const stats = getWeeklyStats(goalId);

  // Get day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <View className="mb-4">
      <Text className="text-white/80 text-sm font-quicksand mb-3">
        Last 7 Days
      </Text>
      <View className="flex-row gap-2">
        {stats.dates.map((day, index) => {
          const date = new Date(day.date);
          const dayName = dayNames[date.getDay()];
          const isToday = index === stats.dates.length - 1;

          return (
            <View key={day.date} className="flex-1 items-center">
              <View
                className={`w-full aspect-square rounded-lg mb-1 ${
                  day.completed
                    ? "bg-[#2d5a3d]"
                    : day.count > 0
                    ? "bg-[#fbbf24]/30"
                    : "bg-white/10"
                } ${isToday ? "border-2 border-[#d4af37]" : ""}`}
              />
              <Text className="text-white/60 text-[10px] font-quicksand">
                {dayName}
              </Text>
              <Text className="text-white/40 text-[8px] font-quicksand">
                {date.getDate()}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
