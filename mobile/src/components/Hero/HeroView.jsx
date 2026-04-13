import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HeroFilter } from "./Filter";
import { HeroCard } from "./Card";
import { HeroEmptyState } from "./EmptyState";

export const HeroView = ({
    gradient,
    accentColor,
    categories,
    collection,
    emptyStateMessage,
    emptyStateDetail,
    onPlayAudio,
    onShare,
    isFavorited,
    onToggleFavorite,
}) => {
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredItems = collection.filter((item) => {
        if (selectedCategory === "all") return true;
        if (selectedCategory === "favorites") return isFavorited?.(item.id);
        return item.category === selectedCategory;
    });

    return (
        <View style={{ flex: 1 }}>
            {/* Filter */}
            <View style={{ paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 }}>
                <HeroFilter
                    accentColor={accentColor}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </View>

            {/* Content */}
            {filteredItems.length > 0 ? (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 16,
                        paddingBottom: insets.bottom + 32,
                        gap: 10,
                    }}
                >
                    {filteredItems.map((item, index) => (
                        <HeroCard
                            key={item.id}
                            item={item}
                            index={index}
                            accentColor={accentColor}
                            isFavorited={isFavorited?.(item.id)}
                            onToggleFavorite={() => onToggleFavorite?.(item.id)}
                            onShare={() => onShare?.(item)}
                        />
                    ))}
                </ScrollView>
            ) : (
                <HeroEmptyState
                    message={emptyStateMessage || "No items found"}
                    detail={emptyStateDetail || "Try selecting a different category"}
                />
            )}
        </View>
    );
};
