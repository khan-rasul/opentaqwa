import React from "react";
import { View, Text, Pressable } from "react-native";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Moon, BookOpen, Bookmark, LayoutGrid } from "lucide-react-native";

const TAB_CONFIG = [
  { name: "index", label: "Home", Icon: Home },
  { name: "prayer", label: "Prayer", Icon: Moon },
  { name: "quran", label: "Qur'ān", Icon: BookOpen },
  { name: "favourites", label: "Saved", Icon: Bookmark },
  { name: "more", label: "More", Icon: LayoutGrid },
];

function CustomTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: "#100e0d",
        borderTopWidth: 0.5,
        borderTopColor: "rgba(255,255,255,0.07)",
        paddingBottom: insets.bottom || 8,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 20,
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
            style={{ flex: 1, alignItems: "center", paddingTop: 12, paddingBottom: 4 }}
          >
            <View style={{ alignItems: "center", position: "relative" }}>
              <Icon
                size={21}
                color={isFocused ? "#af8f69" : "rgba(255,255,255,0.25)"}
                strokeWidth={isFocused ? 2 : 1.5}
              />
              {isFocused && (
                <View
                  style={{
                    position: "absolute",
                    bottom: -6,
                    width: 3,
                    height: 3,
                    borderRadius: 2,
                    backgroundColor: "#af8f69",
                  }}
                />
              )}
            </View>
            <Text
              style={{
                color: isFocused ? "#af8f69" : "rgba(255,255,255,0.22)",
                fontSize: 9,
                fontFamily: "Quicksand-SemiBold",
                marginTop: 8,
                textTransform: "uppercase",
                letterSpacing: 0.6,
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
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: "transparent" },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="prayer" />
      <Tabs.Screen name="quran" />
      <Tabs.Screen name="favourites" />
      <Tabs.Screen name="more" />
    </Tabs>
  );
}
