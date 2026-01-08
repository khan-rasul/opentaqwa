import React from "react";
import { ScrollView, Pressable, Text, View } from "react-native";

export const HeroFilter = ({ accentColor, categories, selectedCategory, onSelectCategory }) => {
    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}
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
                                paddingHorizontal: 14,
                                paddingVertical: 10,
                                borderRadius: 12,
                                backgroundColor: isSelected
                                    ? `${accentColor}20`
                                    : "rgba(26, 22, 20, 0.4)",
                                borderWidth: 0.5,
                                borderColor: isSelected
                                    ? accentColor
                                    : "rgba(255, 255, 255, 0.08)",
                            }}
                        >
                            {Icon && (
                                <Icon
                                    size={14}
                                    color={isSelected ? accentColor : "rgba(255, 255, 255, 0.5)"}
                                    strokeWidth={2.5}
                                />
                            )}
                            <Text
                                style={{
                                    color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
                                    fontSize: 12,
                                    fontWeight: isSelected ? "700" : "600",
                                }}
                            >
                                {category.label}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
};
