import React from "react";
import { View, Text } from "react-native";

export const HeroHeader = ({ subtitle }) => {
    if (!subtitle) return null;

    return (
        <View style={{ marginBottom: 14 }}>
            <Text style={{
                color: "rgba(255,255,255,0.3)",
                fontFamily: "Quicksand-Bold",
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: 2,
            }}>
                {subtitle}
            </Text>
        </View>
    );
};
