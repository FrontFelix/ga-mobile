import { Marker } from "react-native-maps";
import { useAssets } from "expo-asset";
import MarkerModal from "./Modals/MarkerModal";
import { useState } from "react";
import { Image, View } from "react-native";

export default function MapMarker({ Adress, City, Cords, Store, Supplier }) {
  const [assets, error] = useAssets([require("./assets/container.png")]);
  const [modalState, setModalState] = useState(false);

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <View>
      <Marker
        onPress={() => setModalState(true)}
        coordinate={{
          latitude: Cords.latitude,
          longitude: Cords.longitude,
        }}
      >
        <MarkerModal
          closeDialog={closeModal}
          open={modalState}
        />
      </Marker>
    </View>
  );
}
