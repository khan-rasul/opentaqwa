import React from "react";
import { View, Text } from "react-native";
import { Heart } from "lucide-react-native";

export const HeroEmptyState = ({ icon: Icon = Heart, message = "No items yet", detail }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 40 }}>
            <Icon size={36} color="rgba(255,255,255,0.12)" strokeWidth={1.5} />
            <Text
                style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "Montserrat-Black",
                    fontSize: 14,
                    marginTop: 16,
                    textAlign: "center",
                    letterSpacing: -0.2,
                }}
            >
                {message}
            </Text>
            {!!detail && (
                <Text
                    style={{
                        color: "rgba(255,255,255,0.2)",
                        fontFamily: "Quicksand-Medium",
                        fontSize: 12,
                        marginTop: 6,
                        textAlign: "center",
                        lineHeight: 18,
                    }}
                >
                    {detail}
                </Text>
            )}
        </View>
    );
};
