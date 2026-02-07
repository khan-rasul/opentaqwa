/*
 * OpenTaqwā - Goal Creation Modal Component
 * Contributor 2026 [Arham Imam]
 *
 * This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/
 *
 * SPDX-License-Identifier: CC-BY-NC-4.0
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { X, Target, Check } from "lucide-react-native";
import { useDhikrGoals } from "@/context/DhikrGoalsContext";
import { dhikrList, dhikrGoalsService } from "@opentaqwa/shared";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function GoalCreationModal({ visible, onClose, preselectedDhikr = null }) {
  const { createGoal } = useDhikrGoals();
  const [selectedDhikr, setSelectedDhikr] = useState(preselectedDhikr || null);
  const [targetCount, setTargetCount] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const commonTargets = dhikrGoalsService.getCommonTargets();

  const handleCreate = () => {
    setError("");

    if (!selectedDhikr) {
      setError("Please select a dhikr");
      return;
    }

    const count = parseInt(targetCount, 10);
    if (!targetCount || isNaN(count) || count < 1) {
      setError("Please enter a valid target count (minimum 1)");
      return;
    }

    try {
      createGoal(selectedDhikr, count, notes);
      // Reset form
      setSelectedDhikr(preselectedDhikr || null);
      setTargetCount("");
      setNotes("");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create goal");
    }
  };

  const handleClose = () => {
    setError("");
    setTargetCount("");
    setNotes("");
    if (!preselectedDhikr) {
      setSelectedDhikr(null);
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-black/70 items-center justify-center px-4">
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="w-full max-w-md bg-[#1a1614] rounded-2xl overflow-hidden"
          >
            <LinearGradient
              colors={["#3d3530", "#2a2522", "#1a1614"]}
              style={{ padding: 20 }}
            >
              {/* Header */}
              <View className="flex-row items-center justify-between mb-6">
                <View className="flex-row items-center gap-2">
                  <Target size={24} color="#d4af37" />
                  <Text className="text-white text-xl font-montserrat font-bold">
                    Create Goal
                  </Text>
                </View>
                <Pressable
                  onPress={handleClose}
                  className="p-2 rounded-lg bg-white/10"
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={20} color="#fff" />
                </Pressable>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Dhikr Selection */}
                <View className="mb-4">
                  <Text className="text-white/80 text-sm font-quicksand mb-2">
                    Select Dhikr
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mb-2"
                  >
                    <View className="flex-row gap-2">
                      {dhikrList.map((dhikr) => (
                        <Pressable
                          key={dhikr.id}
                          onPress={() => setSelectedDhikr(dhikr)}
                          className={`px-4 py-3 rounded-xl border-2 min-w-[120px] ${
                            selectedDhikr?.id === dhikr.id
                              ? "border-[#d4af37] bg-[#d4af37]/20"
                              : "border-white/20 bg-white/5"
                          }`}
                        >
                          <View className="flex-col items-center">
                            {dhikr.arabic && (
                              <Text
                                className={`text-base font-quicksand font-semibold mb-1 ${
                                  selectedDhikr?.id === dhikr.id
                                    ? "text-[#d4af37]"
                                    : "text-white/90"
                                }`}
                                style={{ textAlign: 'center' }}
                              >
                                {dhikr.arabic}
                              </Text>
                            )}
                            {dhikr.transliteration && (
                              <Text
                                className={`text-sm font-quicksand ${
                                  selectedDhikr?.id === dhikr.id
                                    ? "text-[#d4af37]"
                                    : "text-white/80"
                                }`}
                                style={{ textAlign: 'center' }}
                              >
                                {dhikr.transliteration}
                              </Text>
                            )}
                            {dhikr.meaning && (
                              <Text
                                className={`text-xs font-quicksand mt-1 ${
                                  selectedDhikr?.id === dhikr.id
                                    ? "text-[#d4af37]/80"
                                    : "text-white/60"
                                }`}
                                style={{ textAlign: 'center' }}
                                numberOfLines={2}
                              >
                                {dhikr.meaning}
                              </Text>
                            )}
                          </View>
                        </Pressable>
                      ))}
                    </View>
                  </ScrollView>
                </View>

                {/* Target Count */}
                <View className="mb-4">
                  <Text className="text-white/80 text-sm font-quicksand mb-2">
                    Target Count
                  </Text>
                  <TextInput
                    value={targetCount}
                    onChangeText={setTargetCount}
                    placeholder="Enter target (e.g., 100)"
                    placeholderTextColor="#6b7280"
                    keyboardType="number-pad"
                    className="bg-white/10 text-white px-4 py-3 rounded-xl font-quicksand"
                  />
                  
                  {/* Quick Select Buttons */}
                  <View className="flex-row gap-2 mt-2">
                    {commonTargets.map((target) => (
                      <Pressable
                        key={target}
                        onPress={() => setTargetCount(target.toString())}
                        className={`px-4 py-2 rounded-lg border ${
                          targetCount === target.toString()
                            ? "border-[#d4af37] bg-[#d4af37]/20"
                            : "border-white/20 bg-white/5"
                        }`}
                      >
                        <Text
                          className={`text-sm font-quicksand ${
                            targetCount === target.toString()
                              ? "text-[#d4af37] font-semibold"
                              : "text-white/70"
                          }`}
                        >
                          {target}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                {/* Notes (Optional) */}
                <View className="mb-4">
                  <Text className="text-white/80 text-sm font-quicksand mb-2">
                    Notes (Optional)
                  </Text>
                  <TextInput
                    value={notes}
                    onChangeText={setNotes}
                    placeholder="Add a note..."
                    placeholderTextColor="#6b7280"
                    multiline
                    numberOfLines={3}
                    className="bg-white/10 text-white px-4 py-3 rounded-xl font-quicksand"
                    textAlignVertical="top"
                  />
                </View>

                {/* Error Message */}
                {error && (
                  <View className="mb-4 p-3 bg-red-500/20 rounded-xl border border-red-500/50">
                    <Text className="text-red-400 text-sm font-quicksand">
                      {error}
                    </Text>
                  </View>
                )}

                {/* Create Button */}
                <Pressable
                  onPress={handleCreate}
                  className="bg-[#d4af37] py-4 rounded-xl flex-row items-center justify-center gap-2 mb-4"
                >
                  <Check size={20} color="#0f0d0c" />
                  <Text className="text-[#0f0d0c] font-quicksand font-bold text-base">
                    Create Goal
                  </Text>
                </Pressable>
              </ScrollView>
            </LinearGradient>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
