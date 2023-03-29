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
    <View style={{alignItems: "center", minHeight: "100%", minWidth: "100%"}}
      backgroundColor="#092C4C">
       {!isScanning && (
        <Button
          title="Scanna"
          onPress={handleScan}
          color="white"
          
        />
      )}
      
      {isScanning && (
        <View>
          {/* <Text>Här scannar du </Text> */}
          <BarCodeScanner
            onBarCodeScanned={
              scannedCompleted ? undefined : handleNewContainerScanning
            }
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
        </View>
      )}
    </View>
  );
}
