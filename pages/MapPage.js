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
import { useScannerContext } from "../contexts/ScannerContext";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import DragableListItem from "../components/DragableListItem";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function MapPage() {
  const { containers, routeLines, polyLineKey } = useScannerContext();
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

  // useEffect(() => {
  //   setTestContainers(containers);
  // }, [containers]);

  // const panResponder = PanResponder.create({
  //   onStartShouldSetPanResponder: () => true,
  //   onPanResponderMove: (event, gesture) => {
  //     // Uppdatera positionen för det dragade elementet
  //     const newData = [...testContainers];
  //     newData[draggedIndex].top = gesture.dy;
  //     setTestContainers(newData);
  //   },
  //   onPanResponderRelease: () => {
  //     // Återställ positionen för det dragade elementet
  //     const newData = [...testContainers];
  //     newData[draggedIndex].top = 0;
  //     setTestContainers(newData);
  //   },
  // });

  // let draggedIndex = null; // Index för det dragade elementet

  return (
    <View style={{ position: "relative" }}>
      {/* <View
        style={{
          position: "absolute",
          zIndex: 20,
          top: 40,
          left: 20,
          padding: 20,
        }}
      >
        <GestureHandlerRootView
          style={{ flex: 1, padding: 20, backgroundColor: "red" }}
        >
          <View style={{ flex: 1 }}>
            {testContainers.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => console.log("Item pressed:", item.name)}
                onLongPress={() => {
                  // Sätta index för det dragade elementet när det hålls nere
                  console.log("drar i item");
                  draggedIndex = index;
                }}
                onPressOut={() => {
                  // Nollställa index för det dragade elementet när det släpps
                  draggedIndex = null;
                }}
                style={{
                  backgroundColor: "white",
                  padding: 16,
                  marginTop: item.top,
                }}
                {...panResponder.panHandlers}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </GestureHandlerRootView>
      </View> */}
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
              <Polyline strokeWidth={3} coordinates={marker.marker} />
            ))}
          </View>
        </MapView>
      )}
    </View>
  );
}
