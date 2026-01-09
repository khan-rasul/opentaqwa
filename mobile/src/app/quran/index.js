import React, { useState, useEffect, useMemo } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Pressable,
    Dimensions,
    Share,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { BookOpen, Share2, Info, Volume2, Heart, Sparkles, RefreshCw } from "lucide-react-native";
import { quranApi } from "@opentaqwa/shared";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
} from "react-native-reanimated";
import { HeroHeader } from "@/components/Hero/Header";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;
const SPACING = 20;

export default function QuranScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [verses, setVerses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState({});

    const scrollX = useSharedValue(0);

    useEffect(() => {
        loadInitialVerses();
    }, []);

    const loadInitialVerses = async () => {
        setLoading(true);
        try {
            // Fetch 3 random verses to start with a "list" feel
            const results = await Promise.all([
                quranApi.getRandomVerse(),
                quranApi.getRandomVerse(),
                quranApi.getRandomVerse()
            ]);
            setVerses(results);
        } catch (error) {
            console.error("Failed to fetch initial verses:", error);
        } finally {
            setLoading(false);
        }
    };

    const addRandomVerse = async () => {
        try {
            const data = await quranApi.getRandomVerse();
            setVerses(prev => [...prev, data]);
        } catch (error) {
            console.error("Failed to add random verse:", error);
        }
    };

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const onShare = async (verse) => {
        try {
            await Share.share({
                message: `${verse.arabic}\n\n"${verse.english}"\n\n— ${verse.reference}`,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const toggleFavorite = (ref) => {
        setIsFavorited(prev => ({
            ...prev,
            [ref]: !prev[ref]
        }));
    };

    if (loading && verses.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-[#0f0d0c]">
                <ActivityIndicator size="large" color="#af8f69" />
                <Text className="text-white/40 mt-4 font-medium italic">Preparing the Revelation...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1">
            {/* Header Section - Identical to Dhikr */}
            <View
                className="mx-3 my-2 p-4 rounded-2xl bg-[rgba(26,22,20,0.5)] border-[0.5px] border-white/10 shadow-black"
                style={{
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 8,
                    elevation: 5,
                }}
            >
                <HeroHeader
                    title="al-Qur’ān"
                    subtitle="Divine Guidance & Verse"
                    accentColor="#af8f69"
                />
            </View>

            {/* Scrollable Content Section */}
            <View className="flex-1">
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={CARD_WIDTH + SPACING}
                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        gap: SPACING,
                        paddingBottom: insets.bottom + 20,
                        paddingTop: 10,
                    }}
                >
                    {verses.map((item, index) => (
                        <QuranCard
                            key={item.reference + index}
                            item={item}
                            index={index}
                            scrollX={scrollX}
                            isFavorited={isFavorited[item.reference]}
                            onToggleFavorite={() => toggleFavorite(item.reference)}
                            onShare={() => onShare(item)}
                        />
                    ))}

                    {/* Add More button at the end */}
                    <Pressable
                        onPress={addRandomVerse}
                        style={{ width: CARD_WIDTH }}
                        className="rounded-2xl items-center justify-center bg-white/5 border border-dashed border-white/20"
                    >
                        <RefreshCw size={32} color="#af8f69" opacity={0.5} />
                        <Text className="text-white/40 font-bold mt-4 uppercase tracking-[2px] text-xs">Discover More</Text>
                    </Pressable>
                </Animated.ScrollView>
            </View>

            {/* Footer Tip */}
            <View className="items-center pb-6">
                <View className="flex-row items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                    <Sparkles size={12} color="#af8f69" />
                    <Text className="text-white/30 text-[9px] font-bold uppercase tracking-[1px]">
                        Paging through the eternal signs
                    </Text>
                </View>
            </View>
        </View>
    );
}

function QuranCard({ item, index, scrollX, isFavorited, onToggleFavorite, onShare }) {
    const inputRange = [
        (index - 1) * (CARD_WIDTH + SPACING),
        index * (CARD_WIDTH + SPACING),
        (index + 1) * (CARD_WIDTH + SPACING),
    ];

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            "clamp"
        );
        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.5, 1, 0.5],
            "clamp"
        );

        return { transform: [{ scale }], opacity };
    });

    return (
        <Animated.View
            className="rounded-2xl shadow-black shadow-offset-[6,10] shadow-opacity-40 shadow-radius-20"
            style={[
                {
                    width: CARD_WIDTH,
                    elevation: 20,
                },
                animatedStyle,
            ]}
        >
            <View className="flex-1 rounded-2xl overflow-hidden">
                <LinearGradient
                    colors={["#af8f69dd", "#af8f6977"]}
                    start={[0, 0]}
                    end={[1, 1]}
                    style={{ flex: 1 }}
                >
                    {/* Decorative elements */}
                    <View className="absolute -top-7 -right-7 w-[100px] h-[100px] bg-white/5 rounded-full" />
                    <View className="absolute -bottom-5 -left-5 w-[70px] h-[70px] bg-white/10 rounded-full" />

                    <View className="flex-1 p-6">
                        {/* Actions */}
                        <View className="flex-row justify-between mb-6 z-[1]">
                            <IconButton>
                                <Volume2 size={20} color="#FFFFFF" strokeWidth={2} />
                            </IconButton>

                            <View className="flex-row gap-2.5">
                                <IconButton onPress={onToggleFavorite}>
                                    <Heart
                                        size={20}
                                        color={isFavorited ? "#550d0dff" : "#FFFFFF"}
                                        fill={isFavorited ? "#550d0dff" : "none"}
                                        strokeWidth={2}
                                    />
                                </IconButton>

                                <IconButton onPress={onShare}>
                                    <Share2 size={20} color="#FFFFFF" strokeWidth={2} />
                                </IconButton>
                            </View>
                        </View>

                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1 }}
                        >
                            {/* Arabic Verse */}
                            <View className="mt-4 mb-12">
                                <Text
                                    className="text-white text-[32px] font-bold text-center leading-[56px]"
                                    dir="rtl"
                                >
                                    {item.arabic}
                                </Text>
                            </View>

                            {/* English Translation Section at the bottom */}
                            <View className="mt-auto">
                                <View className="bg-black/20 p-5 rounded-2xl border border-white/10">
                                    <Text className="text-white/90 text-base font-medium italic text-center leading-6 mb-4">
                                        "{item.english}"
                                    </Text>

                                    <View className="flex-row items-center justify-center gap-1.5 pt-3 border-t border-white/5 opacity-60">
                                        <BookOpen size={12} color="white" />
                                        <Text className="text-white text-[10px] font-black uppercase tracking-widest">
                                            {item.reference}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </LinearGradient>
            </View>
        </Animated.View>
    );
}

function IconButton({ children, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            className="w-11 h-11 rounded-full bg-white/15 justify-center items-center border border-white/20 active:opacity-70"
        >
            {children}
        </Pressable>
    );
}
