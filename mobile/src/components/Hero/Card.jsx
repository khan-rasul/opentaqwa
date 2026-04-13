import React, { useState } from "react";
import { View, Text, Pressable, Share } from "react-native";
import { Heart, Share2, BookOpen, ChevronDown, ChevronUp } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export const HeroCard = ({
    item,
    index = 0,
    accentColor = "#af8f69",
    isFavorited,
    onToggleFavorite,
    onShare,
}) => {
    const [showBenefit, setShowBenefit] = useState(false);
    const translation = item.translation || item.meaning;

    const handleShare = async () => {
        try {
            const lines = [item.arabic];
            if (item.transliteration) lines.push(item.transliteration);
            if (translation) lines.push(`"${translation}"`);
            if (item.reference) lines.push(`— ${item.reference}`);
            await Share.share({ message: lines.join("\n\n") });
        } catch {}
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 80).duration(400).springify()}
            style={{
                backgroundColor: "rgba(255,255,255,0.035)",
                borderRadius: 16,
                borderWidth: 0.5,
                borderColor: "rgba(255,255,255,0.07)",
                overflow: "hidden",
            }}
        >
            {/* Accent left bar */}
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 2.5,
                    backgroundColor: accentColor,
                    opacity: 0.5,
                }}
            />

            <View style={{ padding: 20, paddingLeft: 22 }}>
                {/* Arabic */}
                <Text
                    style={{
                        color: "rgba(255,255,255,0.95)",
                        fontSize: 24,
                        fontWeight: "400",
                        textAlign: "center",
                        lineHeight: 44,
                        marginBottom: 14,
                        writingDirection: "rtl",
                    }}
                >
                    {item.arabic}
                </Text>

                {/* Transliteration */}
                {!!item.transliteration && (
                    <Text
                        style={{
                            color: accentColor,
                            opacity: 0.85,
                            fontSize: 12,
                            fontFamily: "Quicksand-SemiBold",
                            fontStyle: "italic",
                            textAlign: "center",
                            marginBottom: 8,
                            letterSpacing: 0.2,
                        }}
                    >
                        {item.transliteration}
                    </Text>
                )}

                {/* Translation */}
                {!!translation && (
                    <Text
                        style={{
                            color: "rgba(255,255,255,0.5)",
                            fontSize: 13,
                            fontFamily: "Quicksand-Medium",
                            textAlign: "center",
                            lineHeight: 20,
                        }}
                    >
                        {translation}
                    </Text>
                )}

                {/* Actions row */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 18,
                    }}
                >
                    {/* Benefit toggle */}
                    {item.benefit ? (
                        <Pressable
                            onPress={() => setShowBenefit((v) => !v)}
                            style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                        >
                            {showBenefit ? (
                                <ChevronUp size={12} color="rgba(255,255,255,0.2)" />
                            ) : (
                                <ChevronDown size={12} color="rgba(255,255,255,0.2)" />
                            )}
                            <Text
                                style={{
                                    color: "rgba(255,255,255,0.2)",
                                    fontSize: 9,
                                    fontFamily: "Quicksand-Bold",
                                    textTransform: "uppercase",
                                    letterSpacing: 1.5,
                                }}
                            >
                                Benefit
                            </Text>
                        </Pressable>
                    ) : (
                        <View />
                    )}

                    {/* Favorite + Share */}
                    <View style={{ flexDirection: "row", gap: 6 }}>
                        <Pressable
                            onPress={handleShare}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: "rgba(255,255,255,0.05)",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Share2 size={14} color="rgba(255,255,255,0.35)" strokeWidth={2} />
                        </Pressable>
                        <Pressable
                            onPress={onToggleFavorite}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: isFavorited
                                    ? `${accentColor}22`
                                    : "rgba(255,255,255,0.05)",
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: isFavorited ? 0.5 : 0,
                                borderColor: `${accentColor}50`,
                            }}
                        >
                            <Heart
                                size={14}
                                color={isFavorited ? accentColor : "rgba(255,255,255,0.35)"}
                                fill={isFavorited ? accentColor : "none"}
                                strokeWidth={2}
                            />
                        </Pressable>
                    </View>
                </View>

                {/* Benefit expanded */}
                {showBenefit && item.benefit && (
                    <View
                        style={{
                            marginTop: 14,
                            paddingTop: 14,
                            borderTopWidth: 0.5,
                            borderTopColor: "rgba(255,255,255,0.06)",
                        }}
                    >
                        <Text
                            style={{
                                color: "rgba(255,255,255,0.5)",
                                fontSize: 12,
                                fontFamily: "Quicksand-Medium",
                                lineHeight: 19,
                                marginBottom: item.reference ? 8 : 0,
                            }}
                        >
                            {item.benefit}
                        </Text>
                        {!!item.reference && (
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                                <BookOpen size={10} color="rgba(255,255,255,0.2)" />
                                <Text
                                    style={{
                                        color: "rgba(255,255,255,0.2)",
                                        fontSize: 10,
                                        fontFamily: "Quicksand-Bold",
                                        fontStyle: "italic",
                                    }}
                                >
                                    {item.reference}
                                </Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </Animated.View>
    );
};
