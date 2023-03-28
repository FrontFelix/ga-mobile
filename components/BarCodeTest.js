import { View, Button, Text } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useScannerContext } from "../contexts/ScannerContext";

export default function BarCodeTest() {
  const {
    isScanning,
    scannedCompleted,
    handleNewContainerScanning,
    handleScan,
  } = useScannerContext();
  return (
    <View style={{ padding: 100 }}>
      <Button
        title="Scanna"
        onPress={handleScan}
      />
      <Text>xxxx</Text>
      {isScanning && (
        <BarCodeScanner
          onBarCodeScanned={
            scannedCompleted ? undefined : handleNewContainerScanning
          }
          style={{ width: "100%", height: "60%" }}
        />
      )}
    </View>
  );
}
