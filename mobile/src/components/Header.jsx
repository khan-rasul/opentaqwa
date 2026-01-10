import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Languages, User, MapPin, Bell, LogOut } from "lucide-react-native";
import { usePrayer } from "@/context/PrayerContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();
  const { nextPrayer, locationName, loading } = usePrayer();
  const { user, isAuthenticated, logout } = useAuth();
  const nextPrayerDisplay = loading ? "Loading..." : `${nextPrayer?.name || "---"}, ${nextPrayer?.time || "---"}`;
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
      className="rounded-2xl bg-[rgba(26,22,20,0.7)] shadow-black"
      style={{
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
      }}
    >
      <View className="rounded-2xl overflow-hidden bg-white/10 border-[0.5px] border-white/15">
        <View className="flex-row justify-between items-center p-3">
          {/* Left side - Prayer Info */}
          <View className="flex-row items-center gap-2.5 flex-1">
            <Image
              source={require("../../assets/icon.png")}
              className="w-[22px] h-[22px]"
              resizeMode="contain"
            />

            <View className="flex-1">
              <Text className="color-white text-[12px] font-montserrat font-bold tracking-tight" numberOfLines={1}>
                {nextPrayerDisplay}
              </Text>
              <View className="flex-row items-center gap-[3px] mt-[1px]">
                <MapPin size={9} color="rgba(255, 255, 255, 0.7)" />
                <Text className="color-white/70 text-[9px] font-quicksand font-semibold tracking-wider" numberOfLines={1}>
                  {loading ? "Detecting..." : `${locationName.city}, ${locationName.country}`}
                </Text>
              </View>
            </View>
          </View>

          {/* Right side - Action Buttons */}
          <View className="flex-row items-center gap-1.5">
            <IconButton
              isUser
              isAuthenticated={isAuthenticated}
              onPress={() => isAuthenticated ? logout() : router.push("/auth/login")}
            >
              {isAuthenticated ? (
                <Text className="color-white text-[9px] font-bold">
                  {getUserInitials(user)}
                </Text>
              ) : (
                <User size={14} color="rgba(255, 255, 255, 0.9)" strokeWidth={2} />
              )}
            </IconButton>
          </View>
        </View>
      </View>
    </View>
  );
}

function IconButton({ children, onPress, badge, isUser, isAuthenticated }) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      className={`w-[30px] h-[30px] rounded-full justify-center items-center  
        ${isUser && isAuthenticated ? 'bg-[#af8f69]/90' : ''} 
        ${pressed ? 'opacity-70 scale-95' : 'opacity-100 scale-100'}`}
    >
      {children}
      {badge && (
        <View className="absolute top-[5px] right-[5px] w-1.5 h-1.5 bg-[#af8f69] rounded-full border-[0.5px] border-black/20" />
      )}
    </Pressable>
  );
}
