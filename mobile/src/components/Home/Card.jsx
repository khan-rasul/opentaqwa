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
      className="flex-1 rounded-2xl bg-black shadow-black shadow-offset-[6px,10px] shadow-opacity-45 shadow-radius-16"
      style={[
        {
          elevation: 16,
        },
        animatedStyle,
      ]}
    >
      {/* Inner container with overflow hidden */}
      <View className="flex-1 rounded-2xl overflow-hidden">
        <LinearGradient
          colors={[gradientColors[0], gradientColors[1] || gradientColors[0]]}
          start={[0.2, 0]}
          end={[1, 1]}
          style={{ flex: 1, padding: 16 }}
        >
          {/* Decorative circle */}
          <View className="absolute -bottom-6 -left-6 w-[70px] h-[70px] bg-white/5 rounded-full" />

          {/* Content */}
          <View className="flex-1 justify-end z-[1]">
            <Text className="text-[9px] font-semibold text-white/65 mb-[3px] tracking-[1.5px] uppercase">
              {subtitle}
            </Text>
            <Text className="text-[18px] font-bold text-white tracking-[0.2px]">
              {title}
            </Text>
          </View>
        </LinearGradient>
      </View>
    </AnimatedPressable>
  );
}
