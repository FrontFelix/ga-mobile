import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";

export default function HomePage() {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <TopBar />
    </SafeAreaView>
  );
}
