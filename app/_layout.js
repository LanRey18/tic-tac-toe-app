import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GameProvider } from "../app/context/GameContext";

export default function Layout() {
  return (
    <GameProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="light" />
    </GameProvider>
  );
}
