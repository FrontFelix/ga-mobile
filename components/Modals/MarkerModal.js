import {
  Modal,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
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
    <Modal animationType="slide" transparent={false} visible={open}>
      <View style={styles.modal}>
        <View>
          <View style={styles.containerName}>
            <Text style={{ fontSize: "30" }}>Container: {container.name}</Text>
          </View>
          <View style={styles.containerCategories}>
            <Text style={{ fontSize: 20 }}>Kategorier:</Text>
            {container.categories.map((category) => {
              return (
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  {category}
                </Text>
              );
            })}
          </View>
          <View style={styles.containerWeight}>
            <Text style={{ fontSize: 20 }}>Vikt: {container.weight}</Text>
          </View>
          <View style={styles.containerAddress}>
            <Text style={{ fontSize: 20 }}>
              Adress: {locationAddress && locationAddress}
            </Text>
          </View>
        </View>
        <View style={styles.closeContainerDialog}>
          <TouchableOpacity onPress={closeDialog}>
            <Text style={{ fontSize: 20, color: "gray" }}>Stäng</Text>
          </TouchableOpacity>
        </View>
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
  containerName: {
    marginBottom: 30,
    alignItems: "center",
  },
  containerCategories: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    marginBottom: 20,
  },
  containerWeight: {
    gap: 5,
    marginBottom: 20,
  },
  containerAddress: {
    gap: 5,
    marginBottom: 60,
  },
  closeContainerDialog: {
    color: "#0070f2",
    borderWidth: "0.8",
    borderColor: "gray",
    marginTop: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 5,
  },
});
