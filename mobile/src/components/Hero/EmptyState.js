import React from "react";
import { View, Text } from "react-native";
import { Heart } from "lucide-react-native";

export const HeroEmptyState = ({ icon: Icon = Heart, message = "No items yet", detail = "Try adding some to your favorites" }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 40,
            }}
        >
            <Icon
                size={48}
                color="rgba(255, 255, 255, 0.3)"
                strokeWidth={1.5}
            />
            <Text
                style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: 16,
                    fontWeight: "600",
                    marginTop: 16,
                    textAlign: "center",
                }}
            >
                {message}
            </Text>
            <Text
                style={{
                    color: "rgba(255, 255, 255, 0.4)",
                    fontSize: 13,
                    fontWeight: "500",
                    marginTop: 8,
                    textAlign: "center",
                }}
            >
                {detail}
            </Text>
        </View>
    );
};
