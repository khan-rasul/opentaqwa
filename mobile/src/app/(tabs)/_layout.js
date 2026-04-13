import React from "react";
import { View, Text, Pressable } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Moon, BookOpen, Heart, LayoutGrid } from "lucide-react-native";

const TAB_CONFIG = [
  { name: "index", label: "Home", Icon: Home },
  { name: "prayer", label: "Prayer", Icon: Moon },
  { name: "quran", label: "Qur'ān", Icon: BookOpen },
  { name: "dua", label: "Du'ā", Icon: Heart },
  { name: "more", label: "More", Icon: LayoutGrid },
];

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "#0f0d0c",
        borderTopWidth: 0.5,
        borderTopColor: "rgba(255,255,255,0.08)",
        paddingBottom: insets.bottom,
        flexDirection: "row",
      }}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tab = TAB_CONFIG[index];
        const Icon = tab.Icon;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={{ flex: 1, alignItems: "center", paddingTop: 10, paddingBottom: 4 }}
          >
            <Icon
              size={22}
              color={isFocused ? "#af8f69" : "rgba(255,255,255,0.3)"}
              strokeWidth={isFocused ? 2.5 : 1.5}
            />
            <Text
              style={{
                color: isFocused ? "#af8f69" : "rgba(255,255,255,0.3)",
                fontSize: 9,
                fontFamily: "Quicksand-SemiBold",
                marginTop: 3,
                textTransform: "uppercase",
                letterSpacing: 0.8,
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="prayer" />
      <Tabs.Screen name="quran" />
      <Tabs.Screen name="dua" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}
