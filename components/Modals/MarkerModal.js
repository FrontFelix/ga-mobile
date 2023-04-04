import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
export default function MarkerModal({
  open,
  closeDialog,
  container,
  locationAddress,
}) {
  const [address, setAddress] = useState(null);
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
    >
      <View style={styles.modal}>
        <Text>Container Namn - {container.name}</Text>
        <Text>Kategorier</Text>
        {container.categories.map((category) => {
          return <Text style={{ fontWeight: "bold" }}>{category}</Text>;
        })}
        <Text>Vikt - {container.weight}</Text>
        <Text>{locationAddress && locationAddress}</Text>
        <TouchableOpacity onPress={closeDialog}>
          <Text>Stäng</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  test: {
    width: "80%",
    height: "50%",
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
