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

  return (
    <AnimatedPressable
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 150 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 150 });
      }}
      onPress={() => router.push(route)}
      style={[
        {
          flex: 1,
          borderRadius: 16,
          backgroundColor: "#000",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        animatedStyle,
      ]}
    >
      <View style={{ flex: 1, borderRadius: 16, overflow: "hidden" }}>
        <LinearGradient
          colors={[gradientColors[0], gradientColors[1] || gradientColors[0]]}
          start={[0.2, 0]}
          end={[1, 1]}
          style={{ flex: 1, padding: 16 }}
        >
          <View
            style={{
              position: "absolute",
              bottom: -24,
              left: -24,
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
          />
          <View style={{ flex: 1, justifyContent: "flex-end", zIndex: 1 }}>
            <Text
              style={{
                fontSize: 9,
                fontFamily: "Quicksand-Bold",
                color: "rgba(255,255,255,0.65)",
                marginBottom: 3,
                textTransform: "uppercase",
                letterSpacing: 1.5,
              }}
            >
              {subtitle}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Montserrat-Black",
                color: "white",
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
