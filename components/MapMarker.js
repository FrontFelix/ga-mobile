import { Marker } from "react-native-maps";
import { useAssets } from "expo-asset";
import MarkerModal from "./Modals/MarkerModal";
import { useState, useEffect } from "react";
import { Image, View } from "react-native";
import * as Location from "expo-location";
export default function MapMarker({
  Cords,
  Categories,
  Weight,
  Name,
  Agreement,
}) {
  const [assets, error] = useAssets([require("./assets/container.png")]);
  const [modalState, setModalState] = useState(false);
  const [container, setContainer] = useState({
    name: "",
    weight: "",
    agreement: "",
    categories: [],
  });
  const [locationAddress, setLocationAddress] = useState(null);

  useEffect(() => {
    const asyncSetAddress = async () => {
      let addressResponse = await Location.reverseGeocodeAsync({
        latitude: Cords.lat,
        longitude: Cords.long,
      });
      await setLocationAddress(addressResponse[0].name);
      console.log(locationAddress);
    };
    asyncSetAddress();
  }, []);

  const openModal = () => {
    setContainer({
      name: Name,
      categories: Categories,
      weight: Weight,
      agreement: Agreement,
    });
    setModalState(true);
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <View>
      <Marker
        onPress={openModal}
        coordinate={{
          latitude: Cords.lat,
          longitude: Cords.long,
        }}
      >
        <Image
          source={require("../assets/container.png")}
          style={{ width: 40, height: 40 }}
        />
        <MarkerModal
          container={container}
          locationAddress={locationAddress}
          closeDialog={closeModal}
          open={modalState}
        />
      </Marker>
    </View>
  );
}
