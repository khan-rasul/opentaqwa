import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Heart, Share2, Volume2, BookOpen } from "lucide-react-native";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";

export const HeroCard = ({
    cardGradient,
    item,
    index,
    scrollX,
    cardWidth,
    spacing = 20,
    isFavorited,
    onToggleFavorite,
    onPlayAudio,
    onShare,
}) => {
    const [showBenefit, setShowBenefit] = useState(false);

    const inputRange = [
        (index - 1) * (cardWidth + spacing),
        index * (cardWidth + spacing),
        (index + 1) * (cardWidth + spacing),
    ];

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            "clamp"
        );
        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            "clamp"
        );

        return { transform: [{ scale }], opacity };
    });

    return (
        <Animated.View
            className="rounded-2xl shadow-black"
            style={[
                {
                    width: cardWidth,
                    shadowOffset: { width: 6, height: 10 },
                    shadowOpacity: 0.4,
                    shadowRadius: 20,
                    elevation: 20,
                },
                animatedStyle,
            ]}
        >
            <View className="flex-1 rounded-2xl overflow-hidden">
                <LinearGradient
                    colors={cardGradient || ["#af8f69", "#af8f6977"]}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{ flex: 1 }}
                >
                    {/* Decorative circles */}
                    <View className="absolute -top-7 -right-7 w-[100px] h-[100px] bg-white/5 rounded-full" />
                    <View className="absolute -bottom-5 -left-5 w-[70px] h-[70px] bg-white/10 rounded-full" />

                    <View className="flex-1 p-6">
                        {/* Actions */}
                        <View className="flex-row justify-between mb-6 z-[1]">
                            <IconButton onPress={onPlayAudio}>
                                <Volume2 size={20} color="#FFFFFF" strokeWidth={2} />
                            </IconButton>

                            <View className="flex-row gap-2.5">
                                <IconButton onPress={onToggleFavorite}>
                                    <Heart
                                        size={20}
                                        color={isFavorited ? "#550d0dff" : "#FFFFFF"}
                                        fill={isFavorited ? "#550d0dff" : "none"}
                                        strokeWidth={2}
                                    />
                                </IconButton>

                                <IconButton onPress={onShare}>
                                    <Share2 size={20} color="#FFFFFF" strokeWidth={2} />
                                </IconButton>
                            </View>
                        </View>

                        {/* Content */}
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "center",
                            }}
                        >
                            {/* Arabic */}
                            <Text
                                className="text-white text-[28px] font-normal text-center leading-[48px] mb-6"
                                dir="rtl"
                            >
                                {item.arabic}
                            </Text>

                            {/* Transliteration */}
                            {item.transliteration && (
                                <Text className="text-white/90 text-base font-semibold italic text-center mb-3">
                                    {item.transliteration}
                                </Text>
                            )}

                            {/* Translation */}
                            {item.translation && (
                                <Text className="text-white/85 text-[15px] font-medium text-center leading-6 mb-6">
                                    "{item.translation}"
                                </Text>
                            )}

                            {/* Benefit Toggle */}
                            {item.benefit && (
                                <Pressable
                                    onPress={() => setShowBenefit(!showBenefit)}
                                    className="bg-white/10 py-3 px-5 rounded-2xl border border-white/15 self-center active:opacity-70"
                                >
                                    <Text className="text-white text-[13px] font-semibold text-center">
                                        {showBenefit ? "Hide Benefit" : "Show Benefit"}
                                    </Text>
                                </Pressable>
                            )}

                            {/* Benefit & Reference */}
                            {showBenefit && item.benefit && (
                                <View className="mt-5">
                                    <View className="bg-black/20 p-4 rounded-2xl border border-white/10">
                                        <Text className="text-white/75 text-[13px] font-medium leading-5 mb-3 text-center">
                                            {item.benefit}
                                        </Text>
                                        {item.reference && (
                                            <View className="flex-row items-center justify-center gap-1.5">
                                                <BookOpen size={12} color="rgba(255, 255, 255, 0.5)" />
                                                <Text className="text-white/50 text-[11px] font-medium italic">
                                                    {item.reference}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </LinearGradient>
            </View>
        </Animated.View>
    );
};

function IconButton({ children, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            className="w-11 h-11 rounded-full bg-white/15 justify-center items-center border border-white/20 active:opacity-70"
        >
            {children}
        </Pressable>
    );
}
