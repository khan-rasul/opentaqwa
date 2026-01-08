import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, interpolate } from "react-native-reanimated";

export const HeroPagination = ({ data, accentColor, scrollX, cardWidth, spacing = 20 }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
            }}
        >
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
            style={[
                {
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: accentColor,
                },
                animatedDotStyle,
            ]}
        />
    );
}
