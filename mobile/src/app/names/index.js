import React, { useState, useEffect, useMemo } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    ActivityIndicator,
    Pressable,
    Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Search, ChevronLeft, Sparkles, BookOpen } from "lucide-react-native";
import { asmaUlHusnaApi } from "@opentaqwa/shared";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    FadeInDown,
    Layout,
    FadeIn
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const COLUMN_WIDTH = (SCREEN_WIDTH - 36) / 2; // 12px gap, 12px padding

export default function NamesScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchNames();
    }, []);

    const fetchNames = async () => {
        try {
            setLoading(true);
            const data = await asmaUlHusnaApi.getAllNames();
            setNames(data);
        } catch (error) {
            console.error("Failed to fetch names:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredNames = useMemo(() => {
        if (!searchQuery.trim()) return names;
        const query = searchQuery.toLowerCase();
        return names.filter(
            (item) =>
                item.english.toLowerCase().includes(query) ||
                item.meaning.toLowerCase().includes(query) ||
                item.arabic.includes(query)
        );
    }, [names, searchQuery]);

    const renderItem = ({ item, index }) => (
        <Animated.View
            entering={FadeInDown.delay(index * 20).duration(400)}
            layout={Layout.springify()}
            style={{ width: COLUMN_WIDTH, marginBottom: 12 }}
        >
            <Pressable className="flex-1">
                <View
                    className="bg-[rgba(26,22,20,0.5)] border-[0.5px] border-white/10 rounded-2xl overflow-hidden shadow-black"
                    style={{
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 5,
                    }}
                >
                    <LinearGradient
                        colors={["rgba(255,255,255,0.05)", "rgba(255,255,255,0)"]}
                        className="p-4 items-center h-[180px] justify-between"
                    >
                        {/* Number Tag */}
                        <View className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/5 items-center justify-center border border-white/10">
                            <Text className="text-white/40 text-[9px] font-bold">{item.number}</Text>
                        </View>

                        {/* Arabic */}
                        <View className="mt-4">
                            <Text className="text-[#af8f69] text-3xl font-bold text-center mb-1">
                                {item.arabic}
                            </Text>
                        </View>

                        {/* Content */}
                        <View className="items-center">
                            <Text className="text-white text-sm font-bold tracking-tight text-center" numberOfLines={1}>
                                {item.english}
                            </Text>
                            <Text className="text-white/40 text-[10px] italic text-center mt-1" numberOfLines={2}>
                                {item.meaning}
                            </Text>
                        </View>
                    </LinearGradient>
                </View>
            </Pressable>
        </Animated.View>
    );

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-[#0f0d0c]">
                <ActivityIndicator size="large" color="#af8f69" />
                <Text className="text-white/60 mt-4 font-medium italic">Revealing the Divine Names...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#0f0d0c]">
            {/* Floating Header Space */}
            <View style={{ height: insets.top + 70 }} />

            <View className="flex-1 px-3">
                {/* Screen Header */}
                <View className="flex-row items-center justify-between mb-6 px-1">
                    <View>
                        <View className="flex-row items-center gap-2">
                            <Sparkles size={18} color="#af8f69" />
                            <Text className="text-white text-2xl font-black tracking-tight">
                                Asmā’ al-Husnā
                            </Text>
                        </View>
                        <Text className="text-white/40 text-[10px] font-bold uppercase tracking-[2px] mt-1">
                            99 Beautiful Names of Allah
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center rounded-full active:opacity-60"
                    >
                        <ChevronLeft size={24} color="#af8f69" strokeWidth={2.5} />
                    </Pressable>
                </View>

                {/* Search Bar */}
                <View
                    className="flex-row items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 mb-6"
                >
                    <Search size={18} color="rgba(255,255,255,0.4)" />
                    <TextInput
                        placeholder="Search by name or meaning..."
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        className="flex-1 ml-3 text-white text-[15px] font-medium"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Names Grid */}
                <FlatList
                    data={filteredNames}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.number.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: insets.bottom + 20,
                    }}
                    ListEmptyComponent={
                        <View className="flex-1 items-center justify-center pt-20">
                            <Text className="text-white/40 italic font-medium">No names found matches your search.</Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
}
