import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Pressable,
    ImageBackground,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Sparkles, BookOpen, Quote, Share2, RefreshCw } from "lucide-react-native";
import { asmaUlHusnaApi } from "@opentaqwa/shared";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    FadeIn,
    FadeInDown,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withSequence,
    withTiming
} from "react-native-reanimated";

export default function NamesScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [nameData, setNameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showSummary, setShowSummary] = useState(false);

    const scale = useSharedValue(1);

    useEffect(() => {
        fetchDailyName();
    }, []);

    const fetchDailyName = async () => {
        try {
            setLoading(true);
            const data = await asmaUlHusnaApi.getDailyName();
            setNameData(data);
        } catch (error) {
            console.error("Failed to fetch daily name:", error);
        } finally {
            setLoading(false);
            setShowSummary(false);
        }
    };

    const fetchRandomName = async () => {
        scale.value = withSequence(withTiming(0.95), withSpring(1));
        try {
            setLoading(true);
            const randomId = Math.floor(Math.random() * 99) + 1;
            const data = await asmaUlHusnaApi.getNameById(randomId);
            setNameData(data);
        } catch (error) {
            console.error("Failed to fetch random name:", error);
        } finally {
            setLoading(false);
            setShowSummary(false);
        }
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    if (loading && !nameData) {
        return (
            <View className="flex-1 justify-center items-center bg-[#0f0d0c]">
                <ActivityIndicator size="large" color="#af8f69" />
                <Text className="text-white/40 mt-4 font-quicksand font-bold italic">Revealing the Divine Name...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1">
            {/* Header Space */}
            <View className="pt-3" />

            <ScrollView
                className="flex-1 px-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
            >
                {/* Screen Header */}
                <View className="flex-row items-center justify-between mb-6 px-1">
                    <View>
                        <View className="flex-row items-center gap-2">
                            <Sparkles size={18} color="#af8f69" />
                            <Text className="text-white text-2xl font-montserrat font-black tracking-tight">
                                al-Asmā’
                            </Text>
                        </View>
                        <Text className="text-white/40 text-[10px] font-quicksand font-bold uppercase tracking-[2px] mt-1">
                            Divine Reflection of the Day
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center rounded-full active:opacity-60"
                    >
                        <ChevronLeft size={24} color="#af8f69" strokeWidth={2.5} />
                    </Pressable>
                </View>

                {nameData && (
                    <Animated.View
                        entering={FadeInDown.duration(800)}
                        style={animatedStyle}
                    >
                        {/* Main Name Card */}
                        <View
                            className="rounded-2xl overflow-hidden bg-black shadow-black shadow-offset-[0,10px] shadow-opacity-30 shadow-radius-20"
                            style={{ elevation: 10 }}
                        >
                            <LinearGradient
                                colors={["#625443", "#62544399"]}
                                style={{ padding: 16, paddingBottom: 20 }}
                            >
                                {/* Decorative Elements */}
                                <View className="absolute top-[-20] right-[-20] w-40 h-40 rounded-full bg-white/5 opacity-20" />
                                <View className="absolute bottom-[-10] left-[-10] w-20 h-20 rounded-full bg-[#af8f69]/10 opacity-30" />

                                {/* Number */}
                                <View className="items-center mb-6">
                                    <View className="bg-white/5 px-3 py-1 rounded-full border border-white/10">
                                        <Text className="text-white/40 text-[11px] font-montserrat font-black uppercase tracking-[1.5px]">
                                            Name {nameData.number} of 99
                                        </Text>
                                    </View>
                                </View>

                                {/* Arabic Name */}
                                <View className="items-center mb-6">
                                    <Text className="text-[#af8f69] text-[72px] font-bold text-center leading-[90px]">
                                        {nameData.arabic}
                                    </Text>
                                </View>

                                {/* Transliteration & Meaning */}
                                <View className="items-center mb-8">
                                    <Text className="text-white text-2xl font-montserrat font-black tracking-tight text-center mb-2">
                                        {nameData.english}
                                    </Text>
                                    <View className="flex-row items-center gap-2 bg-[#af8f69]/10 px-4 py-1.5 rounded-full">
                                        <Text className="text-[#af8f69] text-sm font-quicksand font-bold italic">
                                            {nameData.meaning}
                                        </Text>
                                    </View>
                                </View>

                                {/* Separator */}
                                <View className="h-[1px] w-full bg-white/5 mb-8" />

                                {/* Description */}
                                <View className="flex-row gap-3">
                                    <Quote size={20} color="#af8f69" opacity={0.5} />
                                    <Text className="flex-1 text-white/70 text-[15px] leading-[22px] font-quicksand font-medium italic">
                                        {nameData.description}
                                    </Text>
                                </View>
                            </LinearGradient>
                        </View>

                        {/* Deep Reflection Section */}
                        <Animated.View
                            layout={Layout.springify()}
                            entering={FadeIn.delay(200)}
                            className="mt-6 bg-[rgba(26,22,20,0.5)] border-[0.5px] border-white/10 rounded-2xl overflow-hidden"
                        >
                            <Pressable
                                onPress={() => setShowSummary(!showSummary)}
                                className="flex-row items-center justify-between p-5"
                            >
                                <View className="flex-row items-center gap-2">
                                    <Sparkles size={14} color="#af8f69" />
                                    <Text className="text-white/60 text-[11px] font-quicksand font-bold uppercase tracking-[1.5px]">
                                        Summary & Wisdom
                                    </Text>
                                </View>
                                <Text className="text-[#af8f69] text-[10px] font-montserrat font-black uppercase tracking-[1px]">
                                    {showSummary ? "Hide" : "Discover"}
                                </Text>
                            </Pressable>

                            {showSummary && (
                                <Animated.View
                                    entering={FadeInDown.duration(400)}
                                    className="px-5 pb-6 border-t border-white/5 pt-4"
                                >
                                    <Text className="text-white/80 text-[14px] leading-[21px] font-quicksand font-normal mb-6">
                                        {nameData.summary}
                                    </Text>

                                    {/* Quran References */}
                                    {nameData.location && nameData.location.filter(l => l).length > 0 && (
                                        <View>
                                            <View className="flex-row items-center gap-2 mb-3">
                                                <BookOpen size={14} color="#af8f69" />
                                                <Text className="text-white/60 text-[11px] font-quicksand font-bold uppercase tracking-[1px]">
                                                    Referenced in Qur’ān
                                                </Text>
                                            </View>
                                            <View className="flex-row flex-wrap gap-2">
                                                {nameData.location.filter(l => l).map((loc, idx) => (
                                                    <View key={idx} className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                                                        <Text className="text-white/50 text-[12px] font-quicksand font-bold">Surah {loc}</Text>
                                                    </View>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </Animated.View>
                            )}
                        </Animated.View>

                        {/* Actions */}
                        <View className="flex-row gap-3 mt-6">
                            <Pressable
                                onPress={fetchRandomName}
                                className="flex-1 flex-row items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 active:bg-white/10"
                            >
                                <RefreshCw size={14} color="#af8f69" />
                                <Text className="text-[#af8f69] font-montserrat font-black text-xs uppercase tracking-widest">Shuffle</Text>
                            </Pressable>

                            <Pressable
                                className="flex-1 flex-row items-center justify-center gap-2 bg-[#af8f69] rounded-xl py-3 active:opacity-80"
                            >
                                <Share2 size={14} color="white" />
                                <Text className="text-white font-montserrat font-black text-xs uppercase tracking-widest">Share</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                )}
            </ScrollView>
        </View>
    );
}
