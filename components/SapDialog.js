import { useState } from "react";
import { Modal, Pressable, StyleSheet, View, Text } from "react-native";
export default function SapDialog({
  children,
  beginButtonTitle,
  endButtonTitle,
  dialogOpen,
  closeDialogFunction,
  size,
  dialogTitle,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={dialogOpen}
    >
      <View
        style={
          size === "large"
            ? largeStyle.container
            : size === "medium"
            ? mediumStyle.container
            : smallStyle.container
        }
      >
        <View
          style={
            size === "large"
              ? largeStyle.modalView
              : size === "medium"
              ? mediumStyle.modalView
              : smallStyle.modalView
          }
        >
          <View>
            <Text style={{ padding: 10 }}>{dialogTitle}</Text>
          </View>
          {children}
          <View style={generalStyling.buttonsFlex}>
            <Pressable
              style={generalStyling.beginButton}
              onPress={closeDialogFunction}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                {beginButtonTitle}
              </Text>
            </Pressable>
            <Pressable
              style={generalStyling.endButton}
              onPress={closeDialogFunction}
            >
              <Text style={{ textAlign: "center", color: "#0070f2" }}>
                {endButtonTitle}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

let generalStyling = StyleSheet.create({
  dialogHeader: {
    borderBottomColor: "#808080",
    borderBottomWidth: "100%",
  },
  buttonsFlex: {
    alignSelf: "flex-end",
    width: "100%",
    flexDirection: "row",
    gap: "1",
    justifyContent: "flex-end",
  },
  beginButton: {
    backgroundColor: "#0070f2",
    color: "white",
    minWidth: 64,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  endButton: {
    color: "#0070f2",
    minWidth: 64,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
});

let smallStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 340,
    height: 600,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
});
let mediumStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 340,
    height: 600,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
});
let largeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: 340,
    height: 600,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
});
