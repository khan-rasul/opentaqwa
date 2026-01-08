import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Platform, Pressable } from "react-native";
import * as Location from "expo-location";
import { ChevronLeft, Crosshair, MapPin } from "lucide-react-native";
import { useRouter } from "expo-router";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const MECCA_LAT = 21.4225;
const MECCA_LON = 39.8262;

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

            // Get current location for Qibla calculation
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);

            const qiblaAngle = calculateQibla(loc.coords.latitude, loc.coords.longitude);
            setQiblaDir(qiblaAngle);

            // Subscribe to heading updates (Compass)
            headingSubscription = await Location.watchHeadingAsync((data) => {
                const h = data.trueHeading >= 0 ? data.trueHeading : data.magHeading;
                setHeading(h);
                // Using withSpring for smooth needle movement
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

    // Check if phone is pointing to Qibla (within 5 degrees)
    const isAligned = Math.abs((heading - qiblaDir + 360) % 360) < 5 || Math.abs((heading - qiblaDir + 360) % 360) > 355;

    return (
        <View className="flex-1">
            {/* Absolute Header Padding */}
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
                            <Text className="text-white/40 text-[10px] font-semibold tracking-[1.5px] uppercase mt-1">Direction Finder</Text>
                        </View>
                        <Pressable
                            onPress={() => router.back()}
                            className="w-10 h-10 items-center justify-center rounded-full bg-white/5 border border-white/10"
                        >
                            <ChevronLeft size={24} color="#af8f69" strokeWidth={2.5} />
                        </Pressable>
                    </View>

                    {/* Compass Area */}
                    <View className="flex-1 justify-center items-center">
                        <View className="w-[300px] h-[300px] justify-center items-center">

                            {/* Glow effect when aligned */}
                            {isAligned && (
                                <Animated.View
                                    className="absolute w-[320px] h-[320px] bg-[#af8f69]/10 rounded-full"
                                />
                            )}

                            {/* Static Outer Ring with North Indicator */}
                            <View className="absolute w-[300px] h-[300px] rounded-full border border-white/5 items-center">
                                <View className="w-1 h-4 bg-white/20 rounded-full mt-[-8px]" />
                            </View>

                            {/* Animated Compass Face */}
                            <Animated.View style={[compassStyle]} className="w-full h-full items-center justify-center">
                                {/* Cardinal Points */}
                                <View className="absolute inset-0 items-center">
                                    <Text className="text-white/40 text-xs mt-3 font-black">N</Text>
                                </View>
                                <View className="absolute inset-0 items-center justify-end">
                                    <Text className="text-white/20 text-xs mb-3 font-bold">S</Text>
                                </View>
                                <View className="absolute inset-0 justify-center items-start">
                                    <Text className="text-white/20 text-xs ml-3 font-bold">W</Text>
                                </View>
                                <View className="absolute inset-0 justify-center items-end">
                                    <Text className="text-white/20 text-xs mr-3 font-bold">E</Text>
                                </View>

                                {/* Decorative Rings */}
                                <View className="w-[260px] h-[260px] rounded-full border-[0.5px] border-white/10" />
                                <View className="absolute w-[220px] h-[220px] rounded-full border-[0.5px] border-white/5 border-dashed" />

                                {/* North Needle on Compass Face */}
                                <View className="absolute top-8 w-1 h-6 bg-red-500/80 rounded-full" />
                            </Animated.View>

                            {/* Qibla Needle (Relative to device rotation) */}
                            <Animated.View
                                style={[qiblaNeedleStyle, { position: 'absolute' }]}
                                className="w-[280px] h-[280px] items-center justify-start"
                            >
                                <View className="items-center">
                                    <View className={`w-1.5 h-32 rounded-full shadow-lg ${isAligned ? 'bg-[#af8f69]' : 'bg-white/40'}`} />
                                    <View
                                        style={{ backgroundColor: isAligned ? '#af8f69' : '#333' }}
                                        className="w-14 h-14 rounded-full items-center justify-center mt-[-28px] border-[6px] border-[#1a1614] shadow-2xl"
                                    >
                                        <MapPin size={24} color="white" fill="white" />
                                    </View>
                                </View>
                            </Animated.View>

                            {/* Center Pivot */}
                            <View className="w-4 h-4 rounded-full bg-white border-4 border-[#af8f69] z-50 shadow-sm" />
                        </View>

                        {/* Alignment Text */}
                        <View className="mt-8 h-8 items-center justify-center">
                            {isAligned && (
                                <Text className="text-[#af8f69] text-sm font-bold tracking-widest uppercase">
                                    Perfectly Aligned
                                </Text>
                            )}
                        </View>

                        {/* Info Section */}
                        <View className="mt-4 items-center">
                            <View className="flex-row items-center gap-2 mb-1">
                                <Crosshair size={14} color="#af8f69" />
                                <Text className="text-white/40 text-[10px] font-bold uppercase tracking-[2px]">Mecca Bearing</Text>
                            </View>
                            <Text className="text-white text-5xl font-black mb-1">{Math.round(qiblaDir)}°</Text>
                            <Text className="text-white/30 text-xs font-medium">Relative to True North</Text>
                        </View>
                    </View>

                    {/* Prompt/Guide */}
                    <View className="bg-white/5 border border-white/5 rounded-2xl p-4 mt-8">
                        <Text className="text-white/60 text-[11px] text-center leading-4 font-medium">
                            Hold your device flat. Avoid magnetic interference from cases, speakers, or nearby electronics for the most accurate calculation.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
