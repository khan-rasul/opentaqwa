import React from "react";
import { View, Text } from "react-native";
import { Heart } from "lucide-react-native";

export const HeroEmptyState = ({ icon: Icon = Heart, message = "No items yet", detail = "Try adding some to your favorites" }) => {
    return (
        <View className="flex-1 justify-center items-center px-10">
            <Icon
                size={48}
                color="rgba(255, 255, 255, 0.3)"
                strokeWidth={1.5}
            />
            <Text className="text-white/60 text-base font-semibold mt-4 text-center">
                {message}
            </Text>
            <Text className="text-white/40 text-[13px] font-medium mt-2 text-center">
                {detail}
            </Text>
        </View>
    );
};
