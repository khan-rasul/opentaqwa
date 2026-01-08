import React from "react";
import { View, Text, Pressable } from "react-native";
import { X } from "lucide-react-native";
import { useRouter } from "expo-router";

export const HeroHeader = ({ title, subtitle, onBack }) => {
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
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
            }}
        >
            <Pressable
                onPress={handleBack}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <X size={20} color="#FFFFFF" strokeWidth={2} />
            </Pressable>

            <View style={{ alignItems: "center", flex: 1 }}>
                <Text
                    style={{
                        color: "#FFFFFF",
                        fontSize: 20,
                        fontWeight: "700",
                        letterSpacing: 0.5,
                    }}
                >
                    {title}
                </Text>
                {subtitle && (
                    <Text
                        style={{
                            color: "rgba(255, 255, 255, 0.6)",
                            fontSize: 11,
                            fontWeight: "500",
                            textTransform: "uppercase",
                            letterSpacing: 1.5,
                            marginTop: 2,
                        }}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            <View style={{ width: 40 }} />
        </View>
    );
};
