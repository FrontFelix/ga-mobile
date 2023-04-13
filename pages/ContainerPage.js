import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarCodeTest from "../components/BarCodeTest";
import { useTaskContext } from "../contexts/TaskContext";
import { useEffect, useState } from "react";

export default function ContainerPage() {
  const { routeContainers, hasActiveJob } = useTaskContext();
  const [sortedContainers, setSortedContainers] = useState(routeContainers);

  return (
    <SafeAreaView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {!hasActiveJob && <BarCodeTest />}
        {hasActiveJob && (
          <View>
            <Text>{routeContainers[0].name}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
