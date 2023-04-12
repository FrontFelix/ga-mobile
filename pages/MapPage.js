import { View, Image, Text, TouchableOpacity } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polyline, Marker } from "react-native-maps";
import MapMarker from "../components/MapMarker";
import { useScannerContext } from "../contexts/ScannerContext";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function MapPage() {
  const { containers, routeLines, polyLineKey } = useScannerContext();
  const [locationMark, setLocationMark] = useState();
  const [showLines, setShowLines] = useState(false);
  useEffect(() => {
    async function getLocation() {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocationMark(coords);
    }
    getLocation();
  }, [locationMark]);

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity
        onPress={() => setShowLines(!showLines)}
        style={{
          position: "absolute",
          top: 20,
          backgroundColor: "rgb(255,255,255)",
          fontSize: 15,
          paddingTop: 60,
          paddingBottom: 30,
          zIndex: 20,
          textAlign: "center",
          left: 0,
          height: 40,
          width: "100%",
        }}
      ></TouchableOpacity>
      {containers.length > 0 && locationMark && (
        <MapView
          style={{ width: "100%", height: "100%" }}
          initialRegion={{
            latitude: locationMark.latitude,
            longitude: locationMark.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <View>
            <Marker coordinate={locationMark}>
              <Image
                source={require("../assets/box-truck.png")}
                style={{ width: 40, height: 40 }}
              />
            </Marker>
            {containers.map((marker, index) => (
              <MapMarker
                key={index}
                container={marker}
              />
            ))}
            {containers.map((marker, index) => (
              <Polyline
                strokeWidth={3}
                coordinates={marker.marker}
              />
            ))}
          </View>
        </MapView>
      )}
    </View>
  );
}
