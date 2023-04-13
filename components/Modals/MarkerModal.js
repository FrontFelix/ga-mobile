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
import { useTaskContext } from "../../contexts/TaskContext";
export default function MarkerModal({
  open,
  closeDialog,
  container,
  locationAddress,
}) {
  const [address, setAddress] = useState(null);
  const { onContainerSelected, hasActiveJob } = useTaskContext();
  const [changedContainer, setChangedContainer] = useState(container);

  const changeContainer = () => {
    let updatedContainer = container;
    updatedContainer.routeSelected = container.routeSelected ? false : true;
    // console.log("container som är selected", updatedContainer);
    //console.log("markerModal Container", updatedContainer);
    setChangedContainer(updatedContainer);
    onContainerSelected(updatedContainer);
  };

  return (
    <Modal animationType="slide" transparent={false} visible={open}>
      <View style={styles.modal}>
        <View>
          <View style={styles.containerName}>
            <Text style={{ fontSize: 30 }}>Container: {container.name}</Text>
          </View>
          <View style={styles.containerCategories}>
            <Text style={{ fontSize: 20 }}>Kategorier:</Text>
            {container.categories.map((category, index) => {
              return (
                <Text key={index} style={{ fontWeight: "bold", fontSize: 20 }}>
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
          <View style={styles.containerAddress}>
            <TouchableOpacity disabled={hasActiveJob} onPress={changeContainer}>
              <Text style={{ fontSize: 20 }}>
                {hasActiveJob && "Du har redan skapat en rutt"}
                {!hasActiveJob && !container.routeSelected && "Markera"}
                {!hasActiveJob && container.routeSelected && "Avmarkera"}
                {/* {hasActiveJob
                  ? "Du har redan skapat en rutt."
                  : container.routeSelected
                  ? "Avmarkera"
                  : "Markera"} */}
              </Text>
            </TouchableOpacity>
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
