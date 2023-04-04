import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";
import MapMarker from "../components/MapMarker";
import { useScannerContext } from "../contexts/ScannerContext";

export default function MapPage() {
  const { containers } = useScannerContext();
  return (
    <MapView
      style={{ width: "100%", height: "100%" }}
      initialRegion={{
        latitude: 57.699398313724416,
        longitude: 11.937579499470981,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {containers.map((marker, index) => (
        <MapMarker
          key={index}
          Cords={marker.location}
          Name={marker.name}
          Categories={marker.categories}
          Weight={marker.weight}
        />
      ))}
    </MapView>
  );
}
