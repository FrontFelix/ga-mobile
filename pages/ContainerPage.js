import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarCodeTest from "../components/BarCodeTest";
import { useTaskContext } from "../contexts/TaskContext";
import { useEffect, useState } from "react";
import ScannerData from "../components/Scanners/ScannerData";

export default function ContainerPage() {
  const { routeContainers, hasActiveJob } = useTaskContext();
  const [sortedContainers, setSortedContainers] = useState(routeContainers);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {!hasActiveJob && (
          <View>
            <Text>Starta ett uppdrag...</Text>
          </View>
        )}
        {hasActiveJob && (
          <View>
            <Text>{routeContainers[0].name}</Text>
            <ScannerData />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
