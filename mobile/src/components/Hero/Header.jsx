import React from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

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
        <View style={{ gap: 3 }}>
            <View className="flex-row gap-3" style={{ height: 120 }}>
                {/* Title Card - flex 4 to make it wider */}
                <View style={{ flex: 4, borderRadius: 20, overflow: "hidden" }}>
                    <LinearGradient
                        colors={["rgba(26, 22, 20, 0.7)", "rgba(26, 22, 20, 0.4)"]}
                        style={{ flex: 1, padding: 16 }}
                    >
                        {/* Decorative circle */}
                        <View
                            style={{
                                position: "absolute",
                                bottom: -20,
                                left: -20,
                                width: 60,
                                height: 60,
                                backgroundColor: "rgba(255, 255, 255, 0.04)",
                                borderRadius: 30,
                            }}
                        />

                        {/* Top controls */}
                        <Pressable
                            onPress={handleBack}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: 12,
                            }}
                        >
                            <ChevronLeft size={18} color="#FFFFFF" strokeWidth={2.5} />
                        </Pressable>

                        {/* Title group */}
                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                            <Text
                                style={{
                                    fontSize: 9,
                                    fontWeight: "600",
                                    color: "rgba(255, 255, 255, 0.5)",
                                    letterSpacing: 1.5,
                                    textTransform: "uppercase",
                                    marginBottom: 2,
                                }}
                            >
                                {subtitle}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 22,
                                    fontWeight: "800",
                                    color: "#FFFFFF",
                                    letterSpacing: 0.5,
                                }}
                            >
                                {title}
                            </Text>
                        </View>
                    </LinearGradient>
                </View>

                {/* Status/Accent Card - flex 1.5 */}
                <View style={{ flex: 1.5, borderRadius: 20, overflow: "hidden" }}>
                    <LinearGradient
                        colors={[`${accentColor}40`, `${accentColor}10`]}
                        style={{
                            flex: 1,
                            padding: 16,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <View
                            style={{
                                position: "absolute",
                                top: -15,
                                right: -15,
                                width: 50,
                                height: 50,
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                                borderRadius: 25,
                            }}
                        />
                        <View
                            style={{
                                width: 44,
                                height: 44,
                                borderRadius: 22,
                                backgroundColor: "rgba(255, 255, 255, 0.12)",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 0.5,
                                borderColor: "rgba(255, 255, 255, 0.2)",
                            }}
                        >
                            <View
                                style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: 6,
                                    backgroundColor: accentColor,
                                    shadowColor: accentColor,
                                    shadowOffset: { width: 0, height: 0 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 8,
                                    elevation: 5,
                                }}
                            />
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};
