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
    <View style={{justifyContent: "center", alignItems: "center", minHeight: "100%", minWidth: "100%"}}>
       {!isScanning && (
        <Button
          title="Scanna"
          onPress={handleScan}
        
          
          
        />
      )}
      
      {isScanning && (
        <View>
          {/* <Text>Här scannar du </Text> */}
          <BarCodeScanner
            onBarCodeScanned={
              scannedCompleted ? undefined : handleNewContainerScanning
            }
            style={{ minWidth: "100%", minHeight: "90%" }}
          />
        </View>
      )}
      <View style={{margin: 10}}>
        <Button 
        title="Stäng"
         />
        </View>
    </View>
  );
}
     
