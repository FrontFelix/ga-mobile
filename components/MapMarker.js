import { Marker } from "react-native-maps";
import { useAssets } from "expo-asset";
import MarkerModal from "./Modals/MarkerModal";
import { useState, useEffect } from "react";
import { Image, View } from "react-native";
import * as Location from "expo-location";
import { useScannerContext } from "../contexts/ScannerContext";
export default function MapMarker({ container }) {
  const [assets, error] = useAssets([require("./assets/container.png")]);
  const [modalState, setModalState] = useState(false);
  const [modalContainer, setContainer] = useState({
    name: "",
    weight: "",
    agreement: "",
    categories: [],
  });

  const { generateRoute, handleUpdateRoute, polyLineKey, containers } =
    useScannerContext();
  const [locationAddress, setLocationAddress] = useState(null);

  useEffect(() => {
    const asyncSetAddress = async () => {
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: container.location.lat,
        longitude: container.location.long,
      });
      await setLocationAddress(addressResponse[0].name);
      console.log("markerLocation", locationAddress);
    };
    asyncSetAddress();
  }, []);

  const openModal = () => {
    setContainer(container);
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <View>
      <Marker
        key={polyLineKey}
        onPress={openModal}
        coordinate={{
          latitude: container.location.lat,
          longitude: container.location.long,
        }}
      >
        <Image
          source={require("../assets/container.png")}
          style={{ width: 40, height: 40 }}
        />
        <MarkerModal
          container={modalContainer}
          locationAddress={locationAddress}
          closeDialog={closeModal}
          open={modalState}
        />
      </Marker>
    </View>
  );
}
