import { TouchableOpacity } from "react-native-gesture-handler";
import { useScannerContext } from "../contexts/ScannerContext";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarCodeScanner } from "expo-barcode-scanner";
import ScrollCard from "../components/ScrollCard";

export default function ScannerPage() {
  const {
    _closeScanner,
    _openScanner,
    isScanning,
    handleProductInventory,
    scannedCompleted,
    inventoryProducts,
  } = useScannerContext();
  return (
    <View>
      {!isScanning && (
        <SafeAreaView
          style={{
            padding: 20,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity onPress={() => _openScanner("data")}>
            <Text
              style={{
                backgroundColor: "#092C4C",
                color: "white",
                width: 220,
                textAlign: "center",
                padding: 30,
                fontSize: 20,
              }}
            >
              Öppna scanner
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      )}
      {isScanning && (
        <View>
          <BarCodeScanner
            onBarCodeScanned={
              scannedCompleted ? undefined : handleProductInventory
            }
            style={{ minWidth: "100%", minHeight: "100%" }}
          />
          {inventoryProducts !== null && inventoryProducts.length > 0 && (
            <SafeAreaView
              style={{
                position: "absolute",
                bottom: 0,
                paddingHorizontal: 10,
                width: "100%",
                backgroundColor: "white",
              }}
            >
              <ScrollView>
                {inventoryProducts.map((product, index) => (
                  <ScrollCard key={index} index={index} product={product} />
                  // <View key={index}>
                  //   <Text>{product.name}</Text>
                  // </View>
                ))}
              </ScrollView>
            </SafeAreaView>
          )}
        </View>
      )}
    </View>
  );
}
