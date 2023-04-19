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
import Swiper from "react-native-swiper";

export default function MapPage() {
  const {
    containers,
    hasActiveJob,
    routeContainers,
    confirmRouteWithContainers,
    hasCompletedJob,
    confirmCompletedJob,
  } = useTaskContext();
  const [locationMark, setLocationMark] = useState();
  useEffect(() => {
    async function getLocation() {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocationMark(coords);
    }
    getLocation();
  }, [locationMark]);

  const _handleConfirm = () => {
    // if (!routeContainers.length || !routeContainers) {
    //   return console.log("Ingen container selectad.");
    // }
  };

  return (
    <View style={{ position: "relative" }}>
      {routeContainers.length > 0 && (
        <View
          style={{
            position: "absolute",
            zIndex: 20,
            bottom: 40,
            left: 0,
            width: "100%",
          }}
        >
          <View style={{ flex: 1, padding: 20, gap: 10 }}>
            <Swiper
              height={150}
              loop={false}
              style={{ justifyContent: "center" }}
            >
              {routeContainers !== null &&
                routeContainers.length > 0 &&
                routeContainers.map((container, index) => (
                  <View
                    style={{
                      backgroundColor: "white",
                      flexDirection: "column",
                      alignItems: "center",
                      flex: 1,
                      width: "80%",

                      borderRadius: 10,
                      marginLeft: 34,
                      padding: 14,
                    }}
                    key={index}
                  >
                    {/* Lägg till en unik nyckel för varje element */}
                    <View>
                      <Text
                        style={{
                          fontSize: 15,
                          textAlign: "center",
                          marginBottom: 25,
                        }}
                      >
                        {hasActiveJob
                          ? "Din bekräftade rutt"
                          : "Din beräknade rutt"}
                      </Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 15 }}>
                        {index + 1}. {container.name}
                      </Text>
                      {hasActiveJob && (
                        <Text
                          style={
                            container.empty
                              ? { color: "green" }
                              : { color: "orange" }
                          }
                        >
                          {container.empty ? "Tömd" : "Ej tömd"}
                        </Text>
                      )}
                    </View>
                  </View>
                ))}
            </Swiper>
            <View style={{}}>
              <TouchableOpacity
                onPress={
                  hasActiveJob
                    ? confirmCompletedJob
                    : confirmRouteWithContainers
                }
                style={{ borderRadius: 40 }}
              >
                <Text
                  style={
                    hasCompletedJob
                      ? {
                          backgroundColor: "green",
                          paddingHorizontal: 12,
                          paddingVertical: 4,
                          alignSelf: "center",
                          borderRadius: 12,
                          color: "white",
                        }
                      : hasActiveJob
                      ? {
                          backgroundColor: "orange",
                          paddingHorizontal: 12,
                          paddingVertical: 4,
                          alignSelf: "center",
                          borderRadius: 12,
                          color: "white",
                        }
                      : {
                          backgroundColor: "#092C4C",
                          paddingHorizontal: 12,
                          paddingVertical: 4,
                          alignSelf: "center",
                          borderRadius: 12,
                          color: "white",
                          width: 150,
                          textAlign: "center",
                        }
                  }
                >
                  {hasCompletedJob
                    ? "Bekräfta avslutat jobb"
                    : hasActiveJob
                    ? "Avbryt jobb"
                    : "Bekräfta rutt"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
      {!containers.length && !locationMark && (
        <View>
          <Text>Laddar karta....</Text>
        </View>
      )}
    </View>
  );
}
