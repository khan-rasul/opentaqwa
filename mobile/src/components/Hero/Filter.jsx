import React from "react";
import { ScrollView, Pressable, Text } from "react-native";

export const HeroFilter = ({ accentColor, categories, selectedCategory, onSelectCategory }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 6 }}
        >
            {categories.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                    <Pressable
                        key={category.id}
                        onPress={() => onSelectCategory(category.id)}
                        style={{
                            paddingHorizontal: 14,
                            paddingVertical: 7,
                            borderRadius: 20,
                            backgroundColor: isSelected
                                ? `${accentColor}18`
                                : "rgba(255,255,255,0.04)",
                            borderWidth: 0.5,
                            borderColor: isSelected
                                ? `${accentColor}55`
                                : "rgba(255,255,255,0.07)",
                        }}
                    >
                        <Text
                            style={{
                                color: isSelected ? accentColor : "rgba(255,255,255,0.35)",
                                fontFamily: isSelected ? "Quicksand-Bold" : "Quicksand-SemiBold",
                                fontSize: 11,
                                letterSpacing: 0.3,
                            }}
                        >
                            {category.label}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
};
