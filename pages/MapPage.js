import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polyline } from "react-native-maps";
import MapMarker from "../components/MapMarker";
import { useScannerContext } from "../contexts/ScannerContext";

export default function MapPage() {
  const { containers } = useScannerContext();
  return (
    <View style={{ position: "relative" }}>
      <Text
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: "rgb(255,255,255)",
          fontSize: 15,
          paddingTop: 60,
          paddingBottom: 30,
          zIndex: 10,
          textAlign: "center",
          left: 0,
          width: "100%",
        }}
      >
        Klicka på containrarna för att se mer information
      </Text>
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
          <>
            <MapMarker
              key={index}
              Cords={marker.location}
              Name={marker.name}
              Categories={marker.categories}
              Weight={marker.weight}
            />
            <Polyline
              coordinates={[
                { latitude: 57.699398313724416, longitude: 11.937579499470981 },
                { latitude: 57.91259, longitude: 12.05591 },
              ]}
              strokeWidth={3}
            />
          </>
        ))}
      </MapView>
    </View>
  );
}
