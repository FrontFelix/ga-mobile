import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";
import RouteCard from "../components/RouteCard";
import { useTaskContext } from "../contexts/TaskContext";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    console.log(routeContainers);
  }, [routeContainers]);

  const { routeContainers } = useTaskContext();
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <TopBar />
      <View style={{ alignItems: "center", minHeight: "100%", gap: 10 }}>
        {routeContainers !== null &&
          routeContainers.length > 0 &&
          routeContainers.map((container, index) => (
            <RouteCard
              container={container}
              index={index}
              key={index}
              length={routeContainers.length}
            />
          ))}
      </View>
    </SafeAreaView>
  );
}
