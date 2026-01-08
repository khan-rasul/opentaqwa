import React from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export const HeroHeader = ({ title, subtitle, accentColor, onBack }) => {
    const router = useRouter();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            router.back();
        }
    };

    return (
        <View className="flex-row items-center justify-between mb-3">
            {/* Title / Subtitle Group */}
            <View className="flex-1">
                <Text className="text-[20px] font-extrabold text-white tracking-[0.5px]">
                    {title}
                </Text>
                {subtitle && (
                    <Text className="text-[10px] font-semibold text-white/40 tracking-[1.2px] uppercase mt-[1px]">
                        {subtitle}
                    </Text>
                )}
            </View>

            {/* Back Button - Moved to right, smaller, no background */}
            <Pressable
                onPress={handleBack}
                className="w-8 h-8 justify-center items-center active:opacity-60"
            >
                <ChevronLeft size={24} color={accentColor} strokeWidth={2.5} />
            </Pressable>
        </View>
    );
};
