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
                            className={`flex-row items-center gap-1.5 px-3.5 py-2.5 rounded-xl border-[0.5px] 
                                ${isSelected
                                    ? 'border-transparent'
                                    : 'bg-[rgba(26,22,20,0.4)] border-white/10'}`}
                            style={isSelected ? {
                                backgroundColor: `${accentColor}20`,
                                borderColor: accentColor,
                                borderWidth: 0.5,
                            } : null}
                        >
                            {Icon && (
                                <Icon
                                    size={14}
                                    color={isSelected ? accentColor : "rgba(255, 255, 255, 0.5)"}
                                    strokeWidth={2.5}
                                />
                            )}
                            <Text
                                className={`text-[12px] font-quicksand ${isSelected ? 'text-white font-bold' : 'text-white/50 font-semibold'}`}
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
