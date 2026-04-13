import React from "react";
import { View, Text, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export const HeroHeader = ({ title, subtitle, accentColor, onBack, showBack = true }) => {
    const router = useRouter();

    return (
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        color: "white",
                        fontFamily: "Montserrat-Black",
                        fontSize: 22,
                        letterSpacing: -0.4,
                    }}
                >
                    {title}
                </Text>
                {!!subtitle && (
                    <Text
                        style={{
                            color: "rgba(255,255,255,0.3)",
                            fontFamily: "Quicksand-Bold",
                            fontSize: 9,
                            textTransform: "uppercase",
                            letterSpacing: 2,
                            marginTop: 2,
                        }}
                    >
                        {subtitle}
                    </Text>
                )}
            </View>

            {showBack && (
                <Pressable
                    onPress={onBack ?? (() => router.back())}
                    style={{
                        width: 32,
                        height: 32,
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: 0.7,
                    }}
                >
                    <ChevronLeft size={22} color={accentColor} strokeWidth={2.5} />
                </Pressable>
            )}
        </View>
    );
};
