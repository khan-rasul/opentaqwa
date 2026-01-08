import React from "react";
import { ScrollView, Pressable, Text, View } from "react-native";

export const HeroFilter = ({ accentColor, categories, selectedCategory, onSelectCategory }) => {
    return (
        <View style={{ marginTop: 12 }}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8, paddingRight: 20 }}
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
                                gap: 8,
                                paddingHorizontal: 16,
                                paddingVertical: 12,
                                borderRadius: 16,
                                backgroundColor: isSelected
                                    ? `${accentColor}30`
                                    : "rgba(26, 22, 20, 0.4)",
                                borderWidth: 1,
                                borderColor: isSelected
                                    ? accentColor
                                    : "rgba(255, 255, 255, 0.08)",
                                minWidth: 100,
                            }}
                        >
                            {Icon && (
                                <Icon
                                    size={16}
                                    color={isSelected ? accentColor : "rgba(255, 255, 255, 0.4)"}
                                    strokeWidth={2}
                                />
                            )}
                            <Text
                                style={{
                                    color: isSelected ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)",
                                    fontSize: 13,
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
