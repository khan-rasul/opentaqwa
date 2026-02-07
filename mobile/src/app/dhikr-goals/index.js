/*
 * OpenTaqwā - Dhikr Goals Page
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft, Plus, Target } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import GoalsList from "@/components/DhikrGoals/GoalsList";
import GoalCreationModal from "@/components/DhikrGoals/GoalCreationModal";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function DhikrGoalsPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="flex-1 bg-[#0f0d0c]">
      <LinearGradient
        colors={["#3d3530", "#2a2522", "#1a1614", "#0f0d0c"]}
        locations={[0, 0.3, 0.7, 1]}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          className="px-4 pt-4 pb-3 flex-row items-center justify-between"
          style={{ paddingTop: insets.top + 16 }}
        >
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => router.back()}
              className="p-2 rounded-lg bg-white/10"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ChevronLeft size={24} color="#fff" />
            </Pressable>
            <View className="flex-row items-center gap-2">
              <Target size={24} color="#d4af37" />
              <Text className="text-white text-xl font-montserrat font-bold">
                Dhikr Goals
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => setModalVisible(true)}
            className="p-2 rounded-lg bg-[#d4af37]"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Plus size={20} color="#0f0d0c" />
          </Pressable>
        </View>

        {/* Content */}
        <View className="flex-1 px-4">
          <GoalsList onAddGoal={() => setModalVisible(true)} />
        </View>

        {/* Floating Action Button */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          className="absolute bottom-6 right-4"
          style={{ paddingBottom: insets.bottom }}
        >
          <Pressable
            onPress={() => setModalVisible(true)}
            className="w-14 h-14 rounded-full bg-[#d4af37] items-center justify-center shadow-black shadow-offset-[4px,8px] shadow-opacity-50 shadow-radius-12"
            style={{ elevation: 12 }}
          >
            <Plus size={24} color="#0f0d0c" />
          </Pressable>
        </Animated.View>

        {/* Modal */}
        <GoalCreationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </LinearGradient>
    </View>
  );
}
