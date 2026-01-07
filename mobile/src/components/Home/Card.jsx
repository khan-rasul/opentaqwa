// components/Home/Card.js
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Card({ title, subtitle, route, gradientColors }) {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 150 });
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => router.push(route)}
      style={[
        {
          flex: 1,
          borderRadius: 20,
          // iOS shadow requirements
          backgroundColor: "black", // IMPORTANT for iOS
          shadowColor: "#000",
          shadowOffset: { width: 6, height: 10 },
          // shadowOpacity: 1,
          shadowOpacity: 0.45,
          shadowRadius: 16,
          // Android shadow
          elevation: 16,
        },
        animatedStyle,
      ]}
    >
      {/* Inner container with overflow hidden */}
      <View style={{ flex: 1, borderRadius: 20, overflow: "hidden" }}>
        <LinearGradient
          colors={[gradientColors[0], gradientColors[1] || gradientColors[0]]}
          start={[0.2, 0]}
          end={[1, 1]}
          style={{
            flex: 1,
            padding: 16,
          }}
        >
          {/* Subtle top shine */}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />

          {/* Decorative circle */}
          <View
            style={{
              position: "absolute",
              bottom: -25,
              left: -25,
              width: 70,
              height: 70,
              backgroundColor: "rgba(0, 0, 0, 0.06)",
              borderRadius: 35,
            }}
          />

          {/* Content */}
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              zIndex: 1,
            }}
          >
            <Text
              style={{
                fontSize: 9,
                fontWeight: "600",
                color: "rgba(255, 255, 255, 0.65)",
                marginBottom: 3,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "#FFFFFF",
                letterSpacing: 0.2,
              }}
            >
              {title}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </AnimatedPressable>
  );
}
