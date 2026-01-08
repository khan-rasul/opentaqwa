// components/Header.js
import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Languages, User, MapPin, Bell } from "lucide-react-native";

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Mock data
  const isAuthenticated = false;
  const user = null;
  const nextPrayerDisplay = "Asr - 3:30 PM";
  const location = { city: "New York", country: "USA" };
  const notificationsEnabled = true;

  const getUserInitials = (user) => {
    if (!user?.name) return "U";
    const names = user.name.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <View
      style={{
        borderRadius: 16,
        backgroundColor: "rgba(26, 22, 20, 0.7)", // Lighter warm gray
        shadowColor: "#000",
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
      }}
    >
      <View
        style={{
          borderRadius: 16,
          overflow: "hidden",
          backgroundColor: "rgba(255, 255, 255, 0.08)", // Slightly increased
          borderWidth: 0.5,
          borderColor: "rgba(255, 255, 255, 0.12)",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 12,
          }}
        >
          {/* Left side - Prayer Info */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            <Image
              source={require("../../assets/icon.png")}
              style={{
                width: 22,
                height: 22,
              }}
              resizeMode="contain"
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: "700",
                  letterSpacing: 0.2,
                }}
                numberOfLines={1}
              >
                {nextPrayerDisplay}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3,
                  marginTop: 1,
                }}
              >
                <MapPin
                  size={9}
                  color="rgba(255, 255, 255, 0.7)"
                  strokeWidth={2.5}
                />
                <Text
                  style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontSize: 9,
                    fontWeight: "500",
                  }}
                  numberOfLines={1}
                >
                  {location.city}, {location.country}
                </Text>
              </View>
            </View>
          </View>

          {/* Right side - Action Buttons */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            {/* Notification Button */}
            <IconButton
              onPress={() => console.log("Notifications pressed")}
              badge={notificationsEnabled}
            >
              <Bell
                size={14}
                color="rgba(255, 255, 255, 0.9)"
                strokeWidth={2}
              />
            </IconButton>

            {/* Language Button */}
            <IconButton onPress={() => console.log("Language pressed")}>
              <Languages
                size={14}
                color="rgba(255, 255, 255, 0.9)"
                strokeWidth={2}
              />
            </IconButton>

            {/* User Button */}
            <IconButton
              onPress={() => console.log("User pressed")}
              isUser
              isAuthenticated={isAuthenticated}
            >
              {isAuthenticated ? (
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 9,
                    fontWeight: "700",
                  }}
                >
                  {getUserInitials(user)}
                </Text>
              ) : (
                <User
                  size={14}
                  color="rgba(255, 255, 255, 0.9)"
                  strokeWidth={2}
                />
              )}
            </IconButton>
          </View>
        </View>
      </View>
    </View>
  );
}

// Reusable Icon Button Component
function IconButton({ children, onPress, badge, isUser, isAuthenticated }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          isUser && isAuthenticated
            ? "rgba(175, 143, 105, 0.9)"
            : "rgba(255, 255, 255, 0.1)",
        borderWidth: 0.5,
        borderColor: "rgba(255, 255, 255, 0.15)",
        opacity: pressed ? 0.7 : 1,
        transform: [{ scale: pressed ? 0.95 : 1 }],
      }}
    >
      {children}
      {badge && (
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            width: 6,
            height: 6,
            backgroundColor: "#af8f69",
            borderRadius: 3,
            borderWidth: 0.5,
            borderColor: "rgba(0, 0, 0, 0.2)",
          }}
        />
      )}
    </Pressable>
  );
}
