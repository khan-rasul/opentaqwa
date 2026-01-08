import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Pressable, Image } from "react-native";
import * as Location from "expo-location";
import { ChevronLeft, Crosshair } from "lucide-react-native";
import { useRouter } from "expo-router";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const MECCA_LAT = 21.4225;
const MECCA_LON = 39.8262;

// Layout Constants
const COMPASS_SIZE = 280;
const CENTER = COMPASS_SIZE / 2;

export default function QiblaScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [heading, setHeading] = useState(0);
    const [qiblaDir, setQiblaDir] = useState(0);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const rotateAnim = useSharedValue(0);

    useEffect(() => {
        let headingSubscription;

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);

            const qiblaAngle = calculateQibla(loc.coords.latitude, loc.coords.longitude);
            setQiblaDir(qiblaAngle);

            headingSubscription = await Location.watchHeadingAsync((data) => {
                const h = data.trueHeading >= 0 ? data.trueHeading : data.magHeading;
                setHeading(h);
                rotateAnim.value = withSpring(h, { damping: 20, stiffness: 90 });
            });
        })();

        return () => {
            if (headingSubscription) {
                headingSubscription.remove();
            }
        };
    }, []);

    const calculateQibla = (lat, lon) => {
        const phiK = (MECCA_LAT * Math.PI) / 180.0;
        const lambdaK = (MECCA_LON * Math.PI) / 180.0;
        const phi = (lat * Math.PI) / 180.0;
        const lambda = (lon * Math.PI) / 180.0;

        const psi = Math.atan2(
            Math.sin(lambdaK - lambda),
            Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda)
        );

        return ((psi * 180.0) / Math.PI + 360) % 360;
    };

    const compassStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${-rotateAnim.value}deg` }],
        };
    });

    const qiblaNeedleStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${qiblaDir - rotateAnim.value}deg` }],
        };
    });

    const isAligned = Math.abs((heading - qiblaDir + 360) % 360) < 3 || Math.abs((heading - qiblaDir + 360) % 360) > 357;

    return (
        <View className="flex-1">
            <View className="pt-3" />

            <View className="flex-1 px-3">
                <View
                    className="bg-[rgba(26,22,20,0.5)] border-[0.5px] border-white/10 rounded-2xl p-6 shadow-black flex-1 mb-6 overflow-hidden"
                    style={{
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.3,
                        shadowRadius: 20,
                        elevation: 10,
                    }}
                >
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-8 z-10">
                        <View>
                            <Text className="text-white text-2xl font-bold tracking-tight">Qiblah</Text>
                            <Text className="text-white/40 text-[10px] font-semibold tracking-[1.5px] uppercase mt-1">Holy Kaaba Direction</Text>
                        </View>
                        <Pressable
                            onPress={() => router.back()}
                            className="w-10 h-10 items-center justify-center rounded-full active:opacity-60"
                        >
                            <ChevronLeft size={24} color="#af8f69" strokeWidth={2.5} />
                        </Pressable>
                    </View>

                    {/* Compass Area */}
                    <View className="flex-1 justify-center items-center">
                        <View style={{ width: COMPASS_SIZE, height: COMPASS_SIZE }} className="justify-center items-center">

                            {/* Main Concentric Rings with Increased Depth */}
                            <View className="absolute w-full h-full rounded-full border-[1.5px] border-white/20" />
                            <View className="absolute w-[92%] h-[92%] rounded-full border-[1px] border-white/10" />
                            <View className="absolute w-[85%] h-[85%] rounded-full border-[1px] border-white/5" />

                            {/* Static Background Alignment Glow - Subtler but present */}
                            {isAligned && (
                                <View className="absolute w-[105%] h-[105%] bg-[#af8f69]/10 rounded-full" />
                            )}

                            {/* North Pointer (Fixed Top Indicator) */}
                            <View className="absolute top-[-10] items-center z-10">
                                <View className="w-1 h-5 bg-[#af8f69] rounded-full shadow-lg shadow-[#af8f69]" />
                            </View>

                            {/* Rotating Compass Dial */}
                            <Animated.View style={[compassStyle]} className="absolute w-full h-full">
                                {/* North - Exactly Centered At Top */}
                                <View className="absolute top-4 left-0 right-0 items-center">
                                    <View className="w-[1.5px] h-3 bg-[#af8f69] mb-1.5" />
                                    <Text className="text-[#af8f69] text-[12px] font-black tracking-widest">N</Text>
                                </View>

                                {/* South - Exactly Symmetric to North */}
                                <View className="absolute bottom-4 left-0 right-0 items-center opacity-40">
                                    <Text className="text-white text-[10px] font-bold">S</Text>
                                    <View className="w-[1.5px] h-2 bg-white/40 mt-1.5" />
                                </View>

                                {/* West */}
                                <View className="absolute left-4 top-0 bottom-0 justify-center items-center opacity-40">
                                    <View className="flex-row items-center">
                                        <Text className="text-white text-[10px] font-bold mr-1.5">W</Text>
                                        <View className="w-2 h-[1.5px] bg-white/40" />
                                    </View>
                                </View>

                                {/* East */}
                                <View className="absolute right-4 top-0 bottom-0 justify-center items-center opacity-40">
                                    <View className="flex-row items-center">
                                        <View className="w-2 h-[1.5px] bg-white/40" />
                                        <Text className="text-white text-[10px] font-bold ml-1.5">E</Text>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* Qibla Indicator - Logo On Circumference */}
                            <Animated.View
                                style={[qiblaNeedleStyle]}
                                className="absolute w-full h-full items-center justify-start z-30"
                            >
                                <View className="absolute top-[-15] items-center">
                                    {/* Logo Container precisely on the ring */}
                                    <View
                                        className={`w-12 h-12 rounded-full items-center justify-center p-1 border-[1.5px]
                                            ${isAligned ? 'border-[#af8f69] bg-[#1c1816] shadow-xl shadow-[#af8f69]/40' : 'border-white/10 bg-[#1c1816]'}`}
                                    >
                                        <Image
                                            source={require("../../../assets/icon.png")}
                                            className="w-full h-full"
                                            resizeMode="contain"
                                            style={{ opacity: isAligned ? 1 : 0.4 }}
                                        />
                                    </View>

                                    {/* Small Pointer beneath logo */}
                                    <View className={`w-[2px] h-8 mt-1 ${isAligned ? 'bg-[#af8f69]' : 'bg-white/20'}`} />
                                </View>
                            </Animated.View>

                            {/* Minimal Center Pin */}
                            <View className="absolute w-2 h-2 rounded-full bg-[#af8f69] z-50 border border-[#131110]" />
                        </View>

                        {/* Alignment Feedback */}
                        <View className="mt-14 items-center justify-center h-6">
                            {isAligned && (
                                <View className="flex-row items-center gap-3">
                                    <View className="w-4 h-[1px] bg-[#af8f69]/30" />
                                    <Text className="text-[#af8f69] text-[11px] font-black tracking-[4px] uppercase">
                                        Aligned to Kaaba
                                    </Text>
                                    <View className="w-4 h-[1px] bg-[#af8f69]/30" />
                                </View>
                            )}
                        </View>

                        {/* Detailed Bearing Info */}
                        <View className="mt-8 items-center">
                            <View className="flex-row items-center gap-2 mb-3 bg-white/5 py-1.5 px-4 rounded-full border border-white/5">
                                <Crosshair size={12} color="#af8f69" strokeWidth={3} />
                                <Text className="text-white/40 text-[9px] font-black uppercase tracking-[2.5px]">
                                    Bearing <Text className="text-white">{Math.round(qiblaDir)}°</Text>
                                </Text>
                            </View>

                            <View className="flex-row gap-8 mt-1">
                                <View className="items-center">
                                    <Text className="text-white/20 text-[8px] font-bold uppercase tracking-widest mb-1">Heading</Text>
                                    <View className="flex-row items-baseline">
                                        <Text className="text-white/90 text-2xl font-black">{Math.round(heading)}</Text>
                                        <Text className="text-white/40 text-xs ml-0.5">°</Text>
                                    </View>
                                </View>
                                <View className="w-[1px] h-10 bg-white/10" />
                                <View className="items-center">
                                    <Text className="text-white/20 text-[8px] font-bold uppercase tracking-widest mb-1">Target</Text>
                                    <View className="flex-row items-baseline">
                                        <Text className="text-[#af8f69] text-2xl font-black">{Math.round(qiblaDir)}</Text>
                                        <Text className="text-[#af8f69]/40 text-xs ml-0.5">°</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Footer Guide */}
                    <View className="mt-auto items-center pb-2">
                        <Text className="text-white/20 text-[9px] text-center font-bold tracking-[0.5px] uppercase">
                            Keep phone horizontal for precision
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
