import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

export default function HomePage() {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <TopBar />
      <View style={{ alignItems: "center", minHeight: "100%" }}></View>
    </SafeAreaView>
  );
}
