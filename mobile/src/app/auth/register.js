import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { ChevronLeft, Mail, Lock, User, UserPlus } from "lucide-react-native";
import { useAuth } from "@/context/AuthContext";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");
        try {
            await register(name, email, password);
            router.replace("/");
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-[#0f0d0c]">
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <LinearGradient
                    colors={["#3d3530", "#0f0d0c"]}
                    style={{ flex: 1, paddingTop: insets.top + 20, paddingHorizontal: 24 }}
                >
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-12">
                        <Pressable
                            onPress={() => router.back()}
                            className="w-10 h-10 items-center justify-center rounded-full bg-white/5 border border-white/10"
                        >
                            <ChevronLeft size={24} color="#af8f69" strokeWidth={2.5} />
                        </Pressable>
                        <Text className="text-white/40 font-quicksand font-bold uppercase tracking-[2px] text-[10px]">
                            Join the Ummah
                        </Text>
                        <View className="w-10" />
                    </View>

                    {/* Title Area */}
                    <Animated.View entering={FadeInDown.duration(800)}>
                        <Text className="text-white text-4xl font-montserrat font-black tracking-tight mb-2">
                            Create Account
                        </Text>
                        <Text className="text-white/50 font-quicksand font-medium text-base mb-10">
                            Begin your beautiful spiritual journey today
                        </Text>
                    </Animated.View>

                    {/* Form Area */}
                    <Animated.View
                        entering={FadeInDown.delay(200).duration(800)}
                        className="gap-5"
                    >
                        {error ? (
                            <View className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                                <Text className="text-red-400 font-quicksand font-bold text-sm text-center">
                                    {error}
                                </Text>
                            </View>
                        ) : null}

                        {/* Name Input */}
                        <View>
                            <Text className="text-white/40 font-quicksand font-bold text-[10px] uppercase tracking-widest mb-2 ml-1">
                                Full Name
                            </Text>
                            <View className="flex-row items-center bg-white/5 border border-white/10 rounded-2xl px-4 h-14">
                                <User size={18} color="#af8f69" opacity={0.6} />
                                <TextInput
                                    placeholder="Your Name"
                                    placeholderTextColor="rgba(255,255,255,0.2)"
                                    value={name}
                                    onChangeText={setName}
                                    className="flex-1 text-white font-quicksand font-semibold ml-3"
                                />
                            </View>
                        </View>

                        {/* Email Input */}
                        <View>
                            <Text className="text-white/40 font-quicksand font-bold text-[10px] uppercase tracking-widest mb-2 ml-1">
                                Email Address
                            </Text>
                            <View className="flex-row items-center bg-white/5 border border-white/10 rounded-2xl px-4 h-14">
                                <Mail size={18} color="#af8f69" opacity={0.6} />
                                <TextInput
                                    placeholder="name@example.com"
                                    placeholderTextColor="rgba(255,255,255,0.2)"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    className="flex-1 text-white font-quicksand font-semibold ml-3"
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View>
                            <Text className="text-white/40 font-quicksand font-bold text-[10px] uppercase tracking-widest mb-2 ml-1">
                                Password
                            </Text>
                            <View className="flex-row items-center bg-white/5 border border-white/10 rounded-2xl px-4 h-14">
                                <Lock size={18} color="#af8f69" opacity={0.6} />
                                <TextInput
                                    placeholder="••••••••"
                                    placeholderTextColor="rgba(255,255,255,0.2)"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    className="flex-1 text-white font-quicksand font-semibold ml-3"
                                />
                            </View>
                        </View>

                        {/* Register Button */}
                        <Pressable
                            onPress={handleRegister}
                            disabled={loading}
                            className={`h-14 rounded-2xl flex-row items-center justify-center gap-2 mt-4 
                ${loading ? 'bg-[#af8f69]/50' : 'bg-[#af8f69] shadow-lg shadow-[#af8f69]/20'}`}
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <>
                                    <UserPlus size={20} color="white" strokeWidth={2.5} />
                                    <Text className="text-white font-montserrat font-black uppercase tracking-widest">
                                        Create Account
                                    </Text>
                                </>
                            )}
                        </Pressable>

                        {/* Login Link */}
                        <View className="flex-row items-center justify-center gap-2 mt-6 pb-10">
                            <Text className="text-white/40 font-quicksand font-medium">
                                Already have an account?
                            </Text>
                            <Pressable onPress={() => router.push("/auth/login")}>
                                <Text className="text-white font-quicksand font-bold">
                                    Sign In
                                </Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </LinearGradient>
            </ScrollView>
        </View>
    );
}
