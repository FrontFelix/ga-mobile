import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { haverSine } from "../hooks/mathHooks";
import TopBar from "../components/TopBar";
import RouteCard from "../components/RouteCard";
import { useTaskContext } from "../contexts/TaskContext";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    console.log(routeContainers);

    const getDistance = async () => {
      let count = 0;
      for (let container of routeContainers) {
        let Updateddistance = await haverSine(
          container.location.lat,
          container.location.long
        );
        Updateddistance = Updateddistance / 1000;
        Updateddistance = Math.round(Updateddistance);
        count += Updateddistance;
      }
      setTotalDistance(count);
    };
    getDistance();
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
        {routeContainers !== null && routeContainers.length > 0 && (
          <Text>Total körväg {totalDistance}km</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
