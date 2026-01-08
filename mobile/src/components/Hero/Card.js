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
            style={[
                {
                    width: cardWidth,
                    borderRadius: 24,
                    shadowColor: "#000",
                    shadowOffset: { width: 6, height: 10 },
                    shadowOpacity: 0.4,
                    shadowRadius: 20,
                    elevation: 20,
                },
                animatedStyle,
            ]}
        >
            <View
                style={{
                    flex: 1,
                    borderRadius: 24,
                    overflow: "hidden",
                }}
            >
                <LinearGradient
                    colors={cardGradient || ["#af8f69", "#af8f6977"]}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{ flex: 1 }}
                >
                    {/* Top shine */}
                    <View
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: "35%",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                        }}
                    />

                    {/* Decorative circles */}
                    <View
                        style={{
                            position: "absolute",
                            top: -30,
                            right: -30,
                            width: 100,
                            height: 100,
                            backgroundColor: "rgba(255, 255, 255, 0.06)",
                            borderRadius: 50,
                        }}
                    />
                    <View
                        style={{
                            position: "absolute",
                            bottom: -20,
                            left: -20,
                            width: 70,
                            height: 70,
                            backgroundColor: "rgba(0, 0, 0, 0.08)",
                            borderRadius: 35,
                        }}
                    />

                    <View style={{ flex: 1, padding: 24 }}>
                        {/* Actions */}
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 24,
                                zIndex: 1,
                            }}
                        >
                            <Pressable
                                onPress={onPlayAudio}
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 22,
                                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "rgba(255, 255, 255, 0.2)",
                                }}
                            >
                                <Volume2 size={20} color="#FFFFFF" strokeWidth={2} />
                            </Pressable>

                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <Pressable
                                    onPress={onToggleFavorite}
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 22,
                                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: 1,
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                    }}
                                >
                                    <Heart
                                        size={20}
                                        color={isFavorited ? "#ef4444" : "#FFFFFF"}
                                        fill={isFavorited ? "#ef4444" : "none"}
                                        strokeWidth={2}
                                    />
                                </Pressable>

                                <Pressable
                                    onPress={onShare}
                                    style={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: 22,
                                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderWidth: 1,
                                        borderColor: "rgba(255, 255, 255, 0.2)",
                                    }}
                                >
                                    <Share2 size={20} color="#FFFFFF" strokeWidth={2} />
                                </Pressable>
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
                                style={{
                                    color: "#FFFFFF",
                                    fontSize: 28,
                                    fontWeight: "400",
                                    textAlign: "center",
                                    lineHeight: 48,
                                    marginBottom: 24,
                                }}
                                dir="rtl"
                            >
                                {item.arabic}
                            </Text>

                            {/* Transliteration */}
                            {item.transliteration && (
                                <Text
                                    style={{
                                        color: "rgba(255, 255, 255, 0.9)",
                                        fontSize: 16,
                                        fontWeight: "600",
                                        fontStyle: "italic",
                                        textAlign: "center",
                                        marginBottom: 12,
                                    }}
                                >
                                    {item.transliteration}
                                </Text>
                            )}

                            {/* Translation */}
                            {item.translation && (
                                <Text
                                    style={{
                                        color: "rgba(255, 255, 255, 0.85)",
                                        fontSize: 15,
                                        fontWeight: "500",
                                        textAlign: "center",
                                        lineHeight: 24,
                                        marginBottom: 24,
                                    }}
                                >
                                    "{item.translation}"
                                </Text>
                            )}

                            {/* Benefit Toggle */}
                            {item.benefit && (
                                <Pressable
                                    onPress={() => setShowBenefit(!showBenefit)}
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                                        paddingVertical: 12,
                                        paddingHorizontal: 20,
                                        borderRadius: 16,
                                        borderWidth: 1,
                                        borderColor: "rgba(255, 255, 255, 0.15)",
                                        alignSelf: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#FFFFFF",
                                            fontSize: 13,
                                            fontWeight: "600",
                                            textAlign: "center",
                                        }}
                                    >
                                        {showBenefit ? "Hide Benefit" : "Show Benefit"}
                                    </Text>
                                </Pressable>
                            )}

                            {/* Benefit & Reference */}
                            {showBenefit && item.benefit && (
                                <View style={{ marginTop: 20 }}>
                                    <View
                                        style={{
                                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                                            padding: 16,
                                            borderRadius: 16,
                                            borderWidth: 1,
                                            borderColor: "rgba(255, 255, 255, 0.1)",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "rgba(255, 255, 255, 0.75)",
                                                fontSize: 13,
                                                fontWeight: "500",
                                                lineHeight: 20,
                                                marginBottom: 12,
                                                textAlign: "center",
                                            }}
                                        >
                                            {item.benefit}
                                        </Text>
                                        {item.reference && (
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    gap: 6,
                                                }}
                                            >
                                                <BookOpen size={12} color="rgba(255, 255, 255, 0.5)" />
                                                <Text
                                                    style={{
                                                        color: "rgba(255, 255, 255, 0.5)",
                                                        fontSize: 11,
                                                        fontWeight: "500",
                                                        fontStyle: "italic",
                                                    }}
                                                >
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
