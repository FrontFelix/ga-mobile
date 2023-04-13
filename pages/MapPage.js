import {
  View,
  Image,
  Text,
  TouchableOpacity,
  PanResponder,
  Animated,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Polyline, Marker } from "react-native-maps";
import MapMarker from "../components/MapMarker";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useTaskContext } from "../contexts/TaskContext";

export default function MapPage() {
  const { containers } = useTaskContext();
  const [testContainers, setTestContainers] = useState(null);
  const [locationMark, setLocationMark] = useState();
  const [showLines, setShowLines] = useState(false);
  useEffect(() => {
    async function getLocation() {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocationMark(coords);
    }
    getLocation();
  }, [locationMark]);

  useEffect(() => {
    const selectedContainers = containers.filter(
      (container) => container.routeSelected === true
    );
    setTestContainers(selectedContainers);
  }, [containers]);

  return (
    <View style={{ position: "relative" }}>
      <View
        style={{
          position: "absolute",
          zIndex: 20,
          top: 40,
          left: 0,
          backgroundColor: "white",
          width: "60%",
        }}
      >
        <View style={{ flex: 1, padding: 20, gap: 10 }}>
          <Text style={{ fontSize: 20 }}>Dina beräknade rutt</Text>
          {testContainers !== null &&
            testContainers.length > 0 &&
            testContainers.map((container, index) => (
              <View key={index}>
                {/* Lägg till en unik nyckel för varje element */}
                <Text>
                  {index + 1}. {container.name}
                </Text>
              </View>
            ))}
          <TouchableOpacity style={{ borderRadius: 40 }}>
            <Text
              style={{
                backgroundColor: "#092C4C",
                paddingHorizontal: 12,
                paddingVertical: 4,
                alignSelf: "flex-start",
                borderRadius: 12,
                color: "white",
              }}
            >
              Bekräfta rutt
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
              <MapMarker key={index} container={marker} />
            ))}
            {containers.map((marker, index) => (
              <Polyline
                key={index}
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
