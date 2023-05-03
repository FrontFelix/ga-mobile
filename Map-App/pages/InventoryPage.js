import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import InventoryList from "../components/InventoryList";

export default function InventoryPage() {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <View style={{ minHeight: "100%", gap: 10 }}>
        <InventoryList />
      </View>
    </SafeAreaView>
  );
}
