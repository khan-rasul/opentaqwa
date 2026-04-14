import React from "react";
import { View, Text, Pressable, Modal, Linking } from "react-native";
import { Bug, Lightbulb, Info } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACCENT = "#af8f69";

const ITEMS = [
  {
    icon: Bug,
    label: "Report a Bug",
    sublabel: "Something not working?",
    onPress: () =>
      Linking.openURL(
        "https://github.com/khan-rasul/opentaqwa/issues/new?labels=bug",
      ),
  },
  {
    icon: Lightbulb,
    label: "Suggest a Feature",
    sublabel: "Share your ideas",
    onPress: () =>
      Linking.openURL(
        "https://github.com/khan-rasul/opentaqwa/issues/new?labels=enhancement",
      ),
  },
  {
    icon: Info,
    label: "About",
    sublabel: "OpenTaqwā · v0.0.1",
    onPress: () => Linking.openURL("https://opentaqwa.com"),
  },
];

export default function MenuDrawer({ visible, onClose }) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop tap to close */}
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "flex-end",
        }}
      >
        {/* Sheet — inner View stops backdrop tap */}
        <View
          style={{
            marginHorizontal: 12,
            marginBottom: insets.bottom + 12,
            backgroundColor: "#1a1614",
            borderRadius: 20,
            borderWidth: 0.5,
            borderColor: "rgba(255,255,255,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Menu items */}
          {ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === ITEMS.length - 1;
            return (
              <Pressable
                key={item.label}
                onPress={() => {
                  item.onPress?.();
                  onClose();
                }}
                style={{
                  borderBottomWidth: isLast ? 0 : 0.5,
                  borderBottomColor: "rgba(255,255,255,0.06)",
                }}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 20,
                      paddingVertical: 16,
                      gap: 14,
                      backgroundColor: pressed
                        ? "rgba(255,255,255,0.04)"
                        : "transparent",
                    }}
                  >
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(175,143,105,0.1)",
                        borderWidth: 0.5,
                        borderColor: "rgba(175,143,105,0.2)",
                      }}
                    >
                      <Icon
                        size={16}
                        color={ACCENT}
                        strokeWidth={1.8}
                        pointerEvents="none"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "Quicksand-Bold",
                          fontSize: 13,
                          letterSpacing: 0.1,
                        }}
                      >
                        {item.label}
                      </Text>
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.35)",
                          fontFamily: "Quicksand-Medium",
                          fontSize: 11,
                          marginTop: 1,
                        }}
                      >
                        {item.sublabel}
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
            );
          })}

          {/* Close button */}
          <Pressable onPress={onClose}>
            {({ pressed }) => (
              <View
                style={{
                  margin: 12,
                  paddingVertical: 12,
                  borderRadius: 14,
                  alignItems: "center",
                  backgroundColor: pressed
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(255,255,255,0.04)",
                  borderWidth: 0.5,
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <Text
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontFamily: "Quicksand-Bold",
                    fontSize: 12,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Close
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
