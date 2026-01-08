import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";

export const HeroPagination = ({ data, accentColor, scrollX, cardWidth, spacing = 20 }) => {
    return (
        <View className="flex-row justify-center gap-2">
            {data.map((_, index) => (
                <PaginationDot
                    accentColor={accentColor}
                    key={index}
                    index={index}
                    scrollX={scrollX}
                    cardWidth={cardWidth}
                    spacing={spacing}
                />
            ))}
        </View>
    );
};

function PaginationDot({ index, scrollX, cardWidth, spacing, accentColor }) {
    const inputRange = [
        (index - 1) * (cardWidth + spacing),
        index * (cardWidth + spacing),
        (index + 1) * (cardWidth + spacing),
    ];

    const animatedDotStyle = useAnimatedStyle(() => {
        const width = interpolate(scrollX.value, inputRange, [8, 24, 8], "clamp");
        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.3, 1, 0.3],
            "clamp"
        );

        return { width, opacity };
    });

    return (
        <Animated.View
            className="h-2 rounded-full"
            style={[
                {
                    backgroundColor: accentColor,
                },
                animatedDotStyle,
            ]}
        />
    );
}
