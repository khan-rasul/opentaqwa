import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
} from "react-native-reanimated";
import { HeroHeader } from "./Header";
import { HeroFilter } from "./Filter";
import { HeroCard } from "./Card";
import { HeroPagination } from "./Pagination";
import { HeroEmptyState } from "./EmptyState";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

export const HeroView = ({
    gradient,
    accentColor,
    title,
    subtitle,
    categories,
    collection,
    emptyStateMessage,
    emptyStateDetail,
    onPlayAudio,
    onShare
}) => {
    const insets = useSafeAreaInsets();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [favorites, setFavorites] = useState([]);
    const scrollX = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    // Filter items by category
    const filteredItems = collection.filter((item) => {
        if (selectedCategory === "all") return true;
        if (selectedCategory === "favorites") return favorites.includes(item.id);
        return item.category === selectedCategory;
    });

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Header Section as a Floating Card */}
            <View
                style={{
                    marginHorizontal: 16,
                    marginTop: 8,
                    marginBottom: 20,
                    padding: 16,
                    borderRadius: 20,
                    backgroundColor: "rgba(26, 22, 20, 0.5)",
                    borderWidth: 0.5,
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 5,
                }}
            >
                <HeroHeader
                    title={title}
                    subtitle={subtitle}
                    accentColor={accentColor}
                />

                <HeroFilter
                    accentColor={accentColor}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </View>

            {/* Content Section */}
            <View style={{ flex: 1 }}>
                {filteredItems.length > 0 ? (
                    <>
                        <Animated.ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={scrollHandler}
                            scrollEventThrottle={16}
                            decelerationRate="fast"
                            snapToInterval={CARD_WIDTH + 20}
                            contentContainerStyle={{
                                paddingHorizontal: 20,
                                gap: 20,
                                paddingBottom: insets.bottom,
                            }}
                            key={selectedCategory}
                        >
                            {filteredItems.map((item, index) => (
                                <HeroCard
                                    key={item.id}
                                    cardGradient={gradient}
                                    item={item}
                                    index={index}
                                    scrollX={scrollX}
                                    isFavorited={favorites.includes(item.id)}
                                    onToggleFavorite={() => toggleFavorite(item.id)}
                                    cardWidth={CARD_WIDTH}
                                    onPlayAudio={() => onPlayAudio?.(item)}
                                    onShare={() => onShare?.(item)}
                                />
                            ))}
                        </Animated.ScrollView>

                        <View style={{ paddingBottom: insets.bottom }}>
                            <HeroPagination
                                data={filteredItems}
                                accentColor={accentColor}
                                scrollX={scrollX}
                                cardWidth={CARD_WIDTH}
                            />
                        </View>
                    </>
                ) : (
                    <HeroEmptyState
                        message={emptyStateMessage || "No items found"}
                        detail={emptyStateDetail || "Try selecting a different category"}
                    />
                )}
            </View>
        </View>
    );
};
