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
const COMPASS_SIZE = 280;
const ACCENT = "#af8f69";

export default function QiblaScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [heading, setHeading] = useState(0);
  const [qiblaDir, setQiblaDir] = useState(0);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const rotateAnim = useSharedValue(0);
  const targetHeading = useSharedValue(0);
  const lastHeading = useSharedValue(-1);

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

        if (lastHeading.value === -1) {
          targetHeading.value = h;
          rotateAnim.value = h;
          lastHeading.value = h;
        } else {
          let delta = h - lastHeading.value;
          if (delta > 180) delta -= 360;
          else if (delta < -180) delta += 360;

          targetHeading.value = targetHeading.value + delta;
          rotateAnim.value = withSpring(targetHeading.value, {
            damping: 20,
            stiffness: 90,
          });
          lastHeading.value = h;
        }
      });
    })();

    return () => {
      if (headingSubscription) headingSubscription.remove();
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

  const compassStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-rotateAnim.value}deg` }],
  }));

  const qiblaNeedleStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${qiblaDir - rotateAnim.value}deg` }],
  }));

  const isAligned =
    Math.abs((heading - qiblaDir + 360) % 360) < 3 ||
    Math.abs((heading - qiblaDir + 360) % 360) > 357;

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 4, paddingBottom: insets.bottom + 16 }}>
      {/* Outer card */}
      <View style={{
        flex: 1,
        backgroundColor: "rgba(26,22,20,0.5)",
        borderWidth: 0.5,
        borderColor: "rgba(255,255,255,0.1)",
        borderRadius: 20,
        padding: 20,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
      }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 24, zIndex: 10 }}>
          <View>
            <Text style={{ color: "white", fontFamily: "Montserrat-Black", fontSize: 22, letterSpacing: -0.4 }}>
              Qiblah
            </Text>
            <Text style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Quicksand-Bold", fontSize: 9, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>
              Holy Kaaba Direction
            </Text>
          </View>
          <Pressable
            onPress={() => router.back()}
            style={{ width: 32, height: 32, alignItems: "center", justifyContent: "center", opacity: 0.7 }}
          >
            <ChevronLeft size={22} color={ACCENT} strokeWidth={2.5} />
          </Pressable>
        </View>

        {/* Compass area */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={{ width: COMPASS_SIZE, height: COMPASS_SIZE, justifyContent: "center", alignItems: "center" }}>

            {/* Rings */}
            <View style={{ position: "absolute", width: COMPASS_SIZE, height: COMPASS_SIZE, borderRadius: COMPASS_SIZE / 2, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.2)" }} />
            <View style={{ position: "absolute", width: COMPASS_SIZE * 0.92, height: COMPASS_SIZE * 0.92, borderRadius: COMPASS_SIZE, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" }} />
            <View style={{ position: "absolute", width: COMPASS_SIZE * 0.85, height: COMPASS_SIZE * 0.85, borderRadius: COMPASS_SIZE, borderWidth: 1, borderColor: "rgba(255,255,255,0.05)" }} />

            {/* Alignment glow */}
            {isAligned && (
              <View style={{ position: "absolute", width: COMPASS_SIZE * 1.05, height: COMPASS_SIZE * 1.05, borderRadius: COMPASS_SIZE, backgroundColor: "rgba(175,143,105,0.1)" }} />
            )}

            {/* North pointer (fixed) */}
            <View style={{ position: "absolute", top: -10, alignItems: "center", zIndex: 10 }}>
              <View style={{ width: 4, height: 20, backgroundColor: ACCENT, borderRadius: 2 }} />
            </View>

            {/* Rotating dial */}
            <Animated.View style={[compassStyle, { position: "absolute", width: COMPASS_SIZE, height: COMPASS_SIZE }]}>
              {/* N */}
              <View style={{ position: "absolute", top: 16, left: 0, right: 0, alignItems: "center" }}>
                <View style={{ width: 1.5, height: 12, backgroundColor: ACCENT, marginBottom: 6 }} />
                <Text style={{ color: ACCENT, fontFamily: "Montserrat-Black", fontSize: 12, letterSpacing: 4 }}>N</Text>
              </View>
              {/* S */}
              <View style={{ position: "absolute", bottom: 16, left: 0, right: 0, alignItems: "center", opacity: 0.4 }}>
                <Text style={{ color: "white", fontFamily: "Montserrat-Black", fontSize: 10 }}>S</Text>
                <View style={{ width: 1.5, height: 8, backgroundColor: "rgba(255,255,255,0.4)", marginTop: 6 }} />
              </View>
              {/* W */}
              <View style={{ position: "absolute", left: 16, top: 0, bottom: 0, justifyContent: "center", alignItems: "center", opacity: 0.4 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "white", fontFamily: "Montserrat-Black", fontSize: 10, marginRight: 6 }}>W</Text>
                  <View style={{ width: 8, height: 1.5, backgroundColor: "rgba(255,255,255,0.4)" }} />
                </View>
              </View>
              {/* E */}
              <View style={{ position: "absolute", right: 16, top: 0, bottom: 0, justifyContent: "center", alignItems: "center", opacity: 0.4 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 8, height: 1.5, backgroundColor: "rgba(255,255,255,0.4)" }} />
                  <Text style={{ color: "white", fontFamily: "Montserrat-Black", fontSize: 10, marginLeft: 6 }}>E</Text>
                </View>
              </View>
            </Animated.View>

            {/* Qibla needle */}
            <Animated.View style={[qiblaNeedleStyle, { position: "absolute", width: COMPASS_SIZE, height: COMPASS_SIZE, alignItems: "center", justifyContent: "flex-start", zIndex: 30 }]}>
              <View style={{ position: "absolute", top: -15, alignItems: "center" }}>
                <View style={{
                  width: 48, height: 48, borderRadius: 24,
                  alignItems: "center", justifyContent: "center",
                  padding: 4,
                  backgroundColor: "#1c1816",
                  borderWidth: 1.5,
                  borderColor: isAligned ? ACCENT : "rgba(255,255,255,0.1)",
                }}>
                  <Image
                    source={require("../../../assets/icon.png")}
                    style={{ width: "100%", height: "100%", opacity: isAligned ? 1 : 0.4 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={{ width: 2, height: 32, marginTop: 4, backgroundColor: isAligned ? ACCENT : "rgba(255,255,255,0.2)" }} />
              </View>
            </Animated.View>

            {/* Center pin */}
            <View style={{ position: "absolute", width: 8, height: 8, borderRadius: 4, backgroundColor: ACCENT, zIndex: 50, borderWidth: 1, borderColor: "#131110" }} />
          </View>

          {/* Alignment text */}
          <View style={{ marginTop: 48, height: 24, alignItems: "center", justifyContent: "center" }}>
            {isAligned && (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={{ width: 16, height: 1, backgroundColor: "rgba(175,143,105,0.3)" }} />
                <Text style={{ color: ACCENT, fontFamily: "Montserrat-Black", fontSize: 11, letterSpacing: 4, textTransform: "uppercase" }}>
                  Aligned to Kaaba
                </Text>
                <View style={{ width: 16, height: 1, backgroundColor: "rgba(175,143,105,0.3)" }} />
              </View>
            )}
          </View>

          {/* Bearing info */}
          <View style={{ marginTop: 28, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12, backgroundColor: "rgba(255,255,255,0.05)", paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, borderWidth: 0.5, borderColor: "rgba(255,255,255,0.05)" }}>
              <Crosshair size={12} color={ACCENT} strokeWidth={3} />
              <Text style={{ color: "rgba(255,255,255,0.4)", fontFamily: "Quicksand-Bold", fontSize: 9, textTransform: "uppercase", letterSpacing: 2.5 }}>
                Bearing{" "}
                <Text style={{ color: "white", fontFamily: "Montserrat-Black" }}>{Math.round(qiblaDir)}°</Text>
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 32, alignItems: "center" }}>
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Quicksand-Bold", fontSize: 8, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Heading</Text>
                <Text style={{ color: "rgba(255,255,255,0.9)", fontFamily: "Montserrat-Black", fontSize: 24 }}>{Math.round(heading)}°</Text>
              </View>
              <View style={{ width: 1, height: 40, backgroundColor: "rgba(255,255,255,0.1)" }} />
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Quicksand-Bold", fontSize: 8, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Target</Text>
                <Text style={{ color: ACCENT, fontFamily: "Montserrat-Black", fontSize: 24 }}>{Math.round(qiblaDir)}°</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={{ alignItems: "center", paddingBottom: 4 }}>
          <Text style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Quicksand-Bold", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.5, textAlign: "center" }}>
            Keep phone horizontal for precision
          </Text>
        </View>
      </View>
    </View>
  );
}
