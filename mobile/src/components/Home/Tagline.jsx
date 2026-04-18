import React from "react";
import { View, Text, Image } from "react-native";

export default function Tagline() {
  return (
    <View style={{ flex: 1, borderRadius: 12, overflow: "hidden" }}>
      <View style={{ position: "absolute", top: -10, right: -10, width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(255,255,255,0.05)" }} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-start" }}>
        <Text style={{ fontSize: 8, fontWeight: "300", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
          Companion for Ummah
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Image
            source={require("../../../assets/icon.png")}
            style={{ width: 20, height: 20 }}
            resizeMode="contain"
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 14, fontFamily: "Montserrat-Black", color: "white" }}>Open</Text>
            <Text style={{ color: "#af8f69", fontFamily: "GreatVibes", fontSize: 18, lineHeight: 22 }}> Taqwā</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
