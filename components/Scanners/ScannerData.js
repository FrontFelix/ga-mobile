import { Button, View } from "react-native";
import { useScannerContext } from "../../contexts/ScannerContext";
import { useTaskContext } from "../../contexts/TaskContext";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function ScannerData() {
  const {
    isContainerScan,
    scannedCompleted,
    _handleDataScan,
    _closeScanner,
    _openScanner,
  } = useScannerContext();
  const {
    hasActiveJob,
    markContainerAsEmpty,
    products,
    scannedProducts,
    addScannedProduct,
  } = useTaskContext();

  const handleScan = async ({ type, data }) => {
    _closeScanner("data");
    try {
      const parsedData = JSON.parse(data); // Försök att parsa JSON-strängen
      const containerId = parsedData.containerID;
      if (!containerId) {
        console.log("Inget id");
        return;
      }
      if (!hasActiveJob) {
        console.log("Inget aktivt jobb");
        return;
      }
      markContainerAsEmpty(containerId);
      // Utför övriga åtgärder med det parsade datat
    } catch (error) {
      console.error("JSON-parsing error:", error); // Hantera eventuella parsningsfel
    }
  };
  return (
    <View>
      {isContainerScan ? (
        <View>
          {/* <Text>Här scannar du </Text> */}
          <BarCodeScanner
            onBarCodeScanned={scannedCompleted ? undefined : handleScan}
            style={{ minWidth: "100%", minHeight: "80%" }}
          />
        </View>
      ) : (
        <Button
          title="Töm en container..."
          onPress={() => _openScanner("data")}
        />
      )}
    </View>
  );
}
