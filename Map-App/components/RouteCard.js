import { View, Text, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { haverSine } from "../hooks/mathHooks";
export default function RouteCard({ container, index, length }) {
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    const fetchDistance = async () => {
      let Updateddistance = await haverSine(
        container.location.lat,
        container.location.long
      );
      Updateddistance = Updateddistance / 1000;
      Updateddistance = Math.round(Updateddistance);
      setDistance(Updateddistance);
    };
    fetchDistance();
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        backgroundColor: "#092C4C",
        position: "relative",
        width: "100%",
        color: "white",
        marginTop: 20,
        borderRadius: 10,
      }}
    >
      <View style={{ gap: 10 }}>
        <Text style={{ color: "white" }}>{container.name}</Text>
        <Text style={{ color: "white" }}>{distance}Km</Text>
      </View>
      <View style={{ gap: 10, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>
          {container.empty ? "Tömd" : "Ej tömd"}
        </Text>
        <TouchableOpacity
          onPress={() => {
            const lat = container.location.lat;
            const long = container.location.long;
            const url = `https://www.google.com/maps/search/?api=1&query=${lat},${long}`;
            Linking.openURL(url);
          }}
        >
          <Feather
            name="map"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0070f2",
          top: -10,
          left: -10,
          color: "red",
          borderRadius: 50,
          width: 20,
          height: 20,
        }}
      >
        <Text style={{ color: "white" }}>{index + 1}</Text>
      </View>
      {index + 1 < length && (
        <View
          style={{
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0070f2",
            bottom: "-48%",
            left: "50%",
            color: "red",
            borderRadius: 50,
            width: 5,
            height: 20,
          }}
        />
      )}
    </View>
  );
}
