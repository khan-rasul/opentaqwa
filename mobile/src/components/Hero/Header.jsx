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
        <View
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
            }}
        >
            {/* Title / Subtitle Group */}
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "800",
                        color: "#FFFFFF",
                        letterSpacing: 0.5,
                    }}
                >
                    {title}
                </Text>
                {subtitle && (
                    <Text
                        style={{
                            fontSize: 10,
                            fontWeight: "600",
                            color: "rgba(255, 255, 255, 0.4)",
                            letterSpacing: 1.2,
                            textTransform: "uppercase",
                            marginTop: 1,
                        }}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            {/* Back Button - Moved to right, smaller, no background */}
            <Pressable
                onPress={handleBack}
                style={({ pressed }) => ({
                    width: 32,
                    height: 32,
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: pressed ? 0.6 : 1,
                })}
            >
                <ChevronLeft size={24} color={accentColor} strokeWidth={2.5} />
            </Pressable>
        </View>
    );
};
