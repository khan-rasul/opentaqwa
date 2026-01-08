import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Dimensions, Pressable } from "react-native";
import * as Location from "expo-location";
import { ChevronLeft, Crosshair, MapPin } from "lucide-react-native";
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

// Degree markers for the compass
const DEGREE_MARKERS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

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
                            className="w-10 h-10 items-center justify-center rounded-full"
                        >
                            <ChevronLeft size={24} color="#af8f69" strokeWidth={2.5} />
                        </Pressable>
                    </View>

                    {/* Compass Area */}
                    <View className="flex-1 justify-center items-center">
                        <View className="w-[300px] h-[300px] justify-center items-center">

                            {/* Alignment Glow */}
                            {isAligned && (
                                <View className="absolute w-[320px] h-[320px] bg-[#af8f69]/20 rounded-full blur-xl" />
                            )}

                            {/* Outer Static Frame */}
                            <View className="absolute w-[300px] h-[300px] rounded-full border-[0.5px] border-white/10" />
                            <View className="absolute top-0 w-1 h-4 bg-[#af8f69] rounded-full z-10" />

                            {/* Rotating Compass Face */}
                            <Animated.View style={[compassStyle]} className="absolute w-[280px] h-[280px] items-center justify-center">
                                {/* Degree Ticks */}
                                {DEGREE_MARKERS.map((deg) => (
                                    <View
                                        key={deg}
                                        className="absolute items-center"
                                        style={{
                                            transform: [{ rotate: `${deg}deg` }, { translateY: -125 }],
                                        }}
                                    >
                                        <View className={`w-0.5 ${deg % 90 === 0 ? 'h-3 bg-white/40' : 'h-1.5 bg-white/20'}`} />
                                    </View>
                                ))}

                                {/* Cardinal Points */}
                                <View className="absolute top-4 items-center">
                                    <Text className="text-white text-sm font-black text-red-500/80">N</Text>
                                </View>
                                <View className="absolute bottom-4 items-center">
                                    <Text className="text-white/30 text-[10px] font-bold">S</Text>
                                </View>
                                <View className="absolute left-4 justify-center">
                                    <Text className="text-white/30 text-[10px] font-bold">W</Text>
                                </View>
                                <View className="absolute right-4 justify-center">
                                    <Text className="text-white/30 text-[10px] font-bold">E</Text>
                                </View>

                                {/* Concentric Background Rings */}
                                <View className="absolute w-[220px] h-[220px] rounded-full border-[0.5px] border-white/5" />
                                <View className="absolute w-[160px] h-[160px] rounded-full border-[0.5px] border-white/5" />
                            </Animated.View>

                            {/* Qibla Needle (Relative to rotation) */}
                            <Animated.View
                                style={[qiblaNeedleStyle, { position: 'absolute' }]}
                                className="w-[280px] h-[280px] items-center justify-start z-20"
                            >
                                <View className="items-center">
                                    {/* Main Tapered Needle */}
                                    <View className={`w-1 h-32 rounded-full ${isAligned ? 'bg-[#af8f69]' : 'bg-white/60'} shadow-sm`} />

                                    {/* Kaaba Indicator */}
                                    <View
                                        style={{ backgroundColor: isAligned ? '#af8f69' : '#2a2522' }}
                                        className="w-14 h-14 rounded-full items-center justify-center mt-[-28px] border-[6px] border-[#131110] shadow-2xl"
                                    >
                                        <MapPin size={24} color="white" fill="white" />
                                    </View>
                                </View>
                            </Animated.View>

                            {/* Center Pin */}
                            <View className="absolute w-3 h-3 rounded-full bg-white border-2 border-[#af8f69] z-30" />
                        </View>

                        {/* Alignment Feedback */}
                        <View className="mt-10 items-center justify-center h-6">
                            {isAligned && (
                                <View className="flex-row items-center gap-2">
                                    <View className="w-1.5 h-1.5 rounded-full bg-[#af8f69]" />
                                    <Text className="text-[#af8f69] text-[11px] font-black tracking-[3px] uppercase">
                                        Aligned to Kaaba
                                    </Text>
                                    <View className="w-1.5 h-1.5 rounded-full bg-[#af8f69]" />
                                </View>
                            )}
                        </View>

                        {/* Coordinates & Degree */}
                        <View className="mt-4 items-center">
                            <View className="flex-row items-center gap-2 mb-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                                <Crosshair size={12} color="#af8f69" />
                                <Text className="text-white/40 text-[10px] font-extrabold uppercase tracking-[2px]">
                                    Bearing: <Text className="text-white">{Math.round(qiblaDir)}°</Text>
                                </Text>
                            </View>

                            <View className="flex-row gap-4 mt-2">
                                <View className="items-center">
                                    <Text className="text-white/30 text-[9px] font-bold uppercase tracking-widest">Device</Text>
                                    <Text className="text-white/80 text-xl font-black">{Math.round(heading)}°</Text>
                                </View>
                                <View className="w-[0.5px] h-full bg-white/10" />
                                <View className="items-center">
                                    <Text className="text-white/30 text-[9px] font-bold uppercase tracking-widest">Qiblah</Text>
                                    <Text className="text-[#af8f69] text-xl font-black">{Math.round(qiblaDir)}°</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Guidelines */}
                    <View className="bg-white/5 border border-white/5 rounded-2xl p-4 mt-8">
                        <Text className="text-white/50 text-[10px] text-center leading-4 font-medium italic">
                            Keep device horizontal and away from metal objects for maximum precision.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
