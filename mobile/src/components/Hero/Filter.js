import React from "react";
import { ScrollView, Pressable, Text } from "react-native";

export const HeroFilter = ({ accentColor, categories, selectedCategory, onSelectCategory }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10 }}
        >
            {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;

                return (
                    <Pressable
                        key={category.id}
                        onPress={() => onSelectCategory(category.id)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            borderRadius: 20,
                            backgroundColor: isSelected
                                ? accentColor + "22"
                                : "rgba(255, 255, 255, 0.06)",
                            borderWidth: 1,
                            borderColor: isSelected
                                ? accentColor
                                : "rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        {Icon && (
                            <Icon
                                size={14}
                                color={isSelected ? accentColor : "rgba(255, 255, 255, 0.7)"}
                                strokeWidth={2}
                            />
                        )}
                        <Text
                            style={{
                                color: isSelected ? accentColor : "rgba(255, 255, 255, 0.7)",
                                fontSize: 13,
                                fontWeight: "600",
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
