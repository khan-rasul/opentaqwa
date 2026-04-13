import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "transparent" } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="prayer" />
      <Stack.Screen name="quran" />
      <Stack.Screen name="favourites" />
    </Stack>
  );
}
