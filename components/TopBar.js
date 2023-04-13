import { Image, Text, View } from "react-native";
import { useScannerContext } from "../contexts/ScannerContext";
import { useTaskContext } from "../contexts/TaskContext";

export default function TopBar() {
  const { hasActiveJob } = useTaskContext();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Image
            source={require("../assets/profilePic.png")}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          />
          <Text>Emil Hagelin</Text>
        </View>
        <Text>
          {!hasActiveJob
            ? "Du har inte aktiva uppdrag"
            : `Du har ett aktivt uppdrag`}
        </Text>
      </View>
      <Text style={{ fontSize: 20 }}>Axfood</Text>
    </View>
  );
}
