import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";
export default function MarkerModal({ open, closeDialog }) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
    >
      <View style={styles.modal}>
        <Text>testnamn</Text>
        <Text>testdata</Text>
        <TouchableOpacity onPress={closeDialog}>
          <Text>Close</Text>
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
