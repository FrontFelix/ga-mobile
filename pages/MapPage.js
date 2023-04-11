import { View, Image, Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polyline, Marker } from "react-native-maps";
import MapMarker from "../components/MapMarker";
import { useScannerContext } from "../contexts/ScannerContext";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function MapPage() {
  const { containers, routeLines } = useScannerContext();
  const [locationMark, setLocationMark] = useState();
  useEffect(() => {
    async function getLocation() {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocationMark(coords);
    }
    getLocation();
  }, []);

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
      {locationMark && (
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
            {containers.length > 0 &&
              containers.map((marker, index) => (
                <MapMarker
                  key={index}
                  Cords={marker.location}
                  Name={marker.name}
                  Categories={marker.categories}
                  Weight={marker.weight}
                />
              ))}
            {routeLines.length > 0 &&
              routeLines.map((marker, index) => (
                <Polyline key={index} coordinates={marker} strokeWidth={3} />
              ))}
          </View>
        </MapView>
      )}
    </View>
  );
}
