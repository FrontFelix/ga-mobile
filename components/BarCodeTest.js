import { View, Button, Text, StyleSheet, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useScannerContext } from "../contexts/ScannerContext";
import { useTaskContext } from "../contexts/TaskContext";

export default function BarCodeTest() {
  const {
    scannedCompleted,
    handleNewContainerScanning,
    handleUpdateContainerScanning,
    isAddScan,
    isContainerScan,
    _closeScanner,
  } = useScannerContext();

  const { hasActiveJob } = useTaskContext();

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100%",
        minWidth: "100%",
      }}
    >
      {/* {isAddScan || isContainerScan ? null : (
        <View>
          {!isAddScan && (
            <Pressable
              Text="Scanna ny container"
              onPress={handleNewContainerScan}
              style={generalStyling.beginButtonScanner}
              alignItems="center"
            >
              <Text style={{ color: "white", fontSize: 20 }}>
                Scanna container
              </Text>
            </Pressable>
          )}

          {!isAddScan && !hasActiveJob && (
            <Pressable
              Text="Scanna"
              onPress={handleScanData}
              style={generalStyling.beginButtonScanner}
              alignItems="center"
            >
              <Text style={{ color: "white", fontSize: 20 }}>Scanna Data</Text>
            </Pressable>
          )}

          <View style={{ margin: 10 }}>
            <Pressable
              title="Stäng"
              onPress={() => _closeScanner("data")}
              style={generalStyling.endButtonScanner}
              alignItems="center"
            >
              <Text style={{ fontSize: 20, color: "gray" }}>Stäng</Text>
            </Pressable>
          </View>
        </View>
      )}
      {isAddScan && (
        <View>
          <BarCodeScanner
            onBarCodeScanned={
              scannedCompleted ? undefined : handleNewContainerScanning
            }
            style={{ minWidth: "100%", minHeight: "95%" }}
          />
          <Pressable
            title="Stäng"
            onPress={() => _closeScanner("add")}
            style={generalStyling.closeScannerButton}
            alignItems="center"
          >
            <Text style={{ fontSize: 20, color: "gray" }}>X</Text>
          </Pressable>
        </View>
      )}
      Här ska koden som ligger längst ner ligga om vi fortfarande vill använda den... */}
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
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
  },
  endButtonScanner: {
    color: "#0070f2",
    borderWidth: 0.8,
    borderColor: "gray",
    minWidth: 250,
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
  },

  closeScannerButton: {
    color: "#0070f2",
    borderWidth: 0.8,
    borderColor: "gray",
    margin: 25,
    minWidth: 60,
    padding: 15,
    borderRadius: 60,
    position: "absolute",
  },
});

// {
//   isContainerScan && (
//     <View>
//       {/* <Text>Här scannar du </Text> */}
//       <BarCodeScanner
//         onBarCodeScanned={
//           scannedCompleted ? undefined : handleUpdateContainerScanning
//         }
//         style={{ minWidth: "100%", minHeight: "80%" }}
//       />
//     </View>
//   );
// }
