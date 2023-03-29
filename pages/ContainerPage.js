import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BarCodeTest from "../components/BarCodeTest";

export default function ContainerPage() {
  return (
    <SafeAreaView>
      <View
        style={{ justifyContent: "center", alignItems: "center"}}>
        <BarCodeTest />
      </View>
    </SafeAreaView>
  );
}
