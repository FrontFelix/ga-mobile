import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useScannerContext } from "../contexts/ScannerContext";

export default function BarCodeTest() {
  const {
    isNewContainerScanning,
    isScanningData,
    scannedCompleted,
    handleNewContainerScanning,
    handleScanData,
    handleNewContainerScan,
    handleUpdateContainerScanning,
    handleScanClose,
    pickedUp,
  } = useScannerContext();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      {!isNewContainerScanning && (
        <Pressable
          Text="Scanna"
          onPress={handleNewContainerScan}
          style={generalStyling.beginButtonScanner}
          alignItems="center"
        >
          <Text style={{ color: "white", fontSize: 20 }}>Scanna</Text>
        </Pressable>
      )}

      {isNewContainerScanning && (
        <View>
          {/* <Text>Här scannar du </Text> */}
          <BarCodeScanner
            onBarCodeScanned={
              scannedCompleted ? undefined : handleNewContainerScanning
            }
            style={{ minWidth: "100%", minHeight: "80%" }}
          />
        </View>
      )}
      {!isScanningData && !pickedUp.pickedUp && (
        <Pressable
          Text="Scanna Data"
          onPress={handleScanData}
          style={generalStyling.beginButtonScanner}
          alignItems="center"
        >
          <Text style={{ color: "white", fontSize: 20 }}>Scanna Data</Text>
        </Pressable>
      )}

      {isScanningData && (
        <View>
          {/* <Text>Här scannar du </Text> */}
          <BarCodeScanner
            onBarCodeScanned={
              scannedCompleted ? undefined : handleUpdateContainerScanning
            }
            style={{ minWidth: "100%", minHeight: "80%" }}
          />
        </View>
      )}
      <View style={{ margin: 10 }}>
        <Pressable
          title="Stäng"
          onPress={handleScanClose}
          style={generalStyling.endButtonScanner}
          alignItems="center"
        >
          <Text style={{ fontSize: 20, color: "gray" }}>Stäng</Text>
        </Pressable>
      </View>
    </View>
  );
}

let generalStyling = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  beginButtonScanner: {
    backgroundColor: "#092C4C",
    color: "white",
    minWidth: 250,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
  },
  endButtonScanner: {
    color: "#0070f2",
    borderWidth: "0.8",
    borderColor: "gray",
    marginTop: 15,
    minWidth: 250,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
  },
});
