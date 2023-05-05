import { useScannerContext } from "../contexts/ScannerContext";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CloseScannerButton() {
  const { _closeScanner } = useScannerContext();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "center",
        minWidth: "100%",
      }}
      onPress={() => _closeScanner("data")}
    >
      <Ionicons name="close-sharp" size={45} color="black" />
    </TouchableOpacity>
  );
}
