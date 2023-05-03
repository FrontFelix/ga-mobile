import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import base64 from "react-native-base64";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MultiSelect from "react-native-multiple-select";
import AxfoodQRCode from "../AxfoodQRCode";
import QRCode from "react-native-qrcode-svg";
import { useScannerContext } from "../../contexts/ScannerContext";
export default function AddContainerDialog({
  children,
  beginButtonTitle,
  endButtonTitle,
  dialogOpen,
  closeDialogFunction,
  size,
  dialogTitle,
}) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [containerID, setContainerID] = useState(null);
  const { handleCloseNewContainer } = useScannerContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      categories: [],
      weight: "",
    },
  });

  const optionsList = [
    { label: "Wellpapp", value: "wellpapp" },
    { label: "Plast", value: "plast" },
    { label: "Trä", value: "trä" },
  ];

  const onSubmit = async (data) => {
    setShowSpinner(true);
    const url =
      "http://garrison-planet9.westeurope.cloudapp.azure.com:8080/api/serverscript/axfood/containers";
    const username = "admin";
    const password = "Garrison";
    const encodedCredentials = base64.encode(`${username}:${password}`);
    const bodyData = {
      container_category: data.categories,
      container_name: data.title,
      container_location: {
        lat: "testar",
        long: "testar2",
      },
      container_weight: data.weight,
    };

    let response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    let JSONdata = await response.json();
    setContainerID(JSONdata.containerID);
    setShowSpinner(false);
    setShowQR(true);
    // skicka request till neptune och vänta svar
  };
  return (
    <Modal animationType="slide" transparent={false} visible={dialogOpen}>
      <View style={generalStyling.container}>
        <View style={generalStyling.modalView}>
          {!showQR && !showSpinner && (
            <View>
              <Text
                style={{
                  padding: 10,
                  fontSize: 20,
                  textAlign: "center",
                }}
              >
                {dialogTitle}
              </Text>
              <View
                style={{
                  height: 2,
                  minWidth: "100%",
                  backgroundColor: "#092C4C",
                }}
              />
            </View>
          )}

          {showSpinner && (
            <View
              style={{
                flex: 1,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ paddingBottom: 12 }}>Laddar QR-Kod...</Text>
              <ActivityIndicator
                size={"large"}
                color="#092C4C"
                animating="true"
              />
            </View>
          )}
          {!showSpinner && !showQR && (
            <View style={{ width: "100%" }}>
              <Controller
                control={control}
                rules={{ required: true, minLength: 4 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text>Namn</Text>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Ange namn"
                      placeholderTextColor="#808080"
                      enablesReturnKeyAutomatically={true}
                      style={generalStyling.textInputs}
                    />
                    {errors.title && <Text>Ange namn på container...</Text>}
                  </View>
                )}
                name="title"
              />
              <Controller
                control={control}
                rules={{ required: true, minLength: 2 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <Text>Vikt</Text>
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Ange vikt"
                      placeholderTextColor="#808080"
                      enablesReturnKeyAutomatically={true}
                      style={generalStyling.textInputs}
                    />
                    {errors.title && <Text>Ange ge vikt på container...</Text>}
                  </View>
                )}
                name="weight"
              />
              <Controller
                control={control}
                rules={{ required: true, minLength: 4 }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <MultiSelect
                      items={optionsList}
                      uniqueKey="value"
                      onSelectedItemsChange={onChange}
                      selectText="Välj kategorier"
                      selectedItems={value}
                      displayKey="label"
                      submitButtonText="Bekräfta"
                      itemTextColor="#092C4C"
                      tagTextColor="#092C4C"
                      tagBorderColor="#092C4C"
                      submitButtonColor="#092C4C"
                      selectedItemTextColor="#092C4C"
                    />
                    {errors.categories && <Text>Välj minst en kategori</Text>}
                  </View>
                )}
                name="categories"
              />
            </View>
          )}
          <View>
            {showQR && (
              <View>
                {containerID !== null && (
                  <AxfoodQRCode
                    handleCloseNewContainer={handleCloseNewContainer}
                    content={JSON.stringify({ containerID: containerID })}
                  />
                )}
              </View>
            )}
            {children}
          </View>
          {showSpinner ||
            (!showQR && (
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  gap: "10",
                  flexGrow: 1,
                  justifyContent: "center",
                }}
              >
                <Pressable
                  style={generalStyling.beginButton}
                  onPress={
                    showQR ? () => console.log("test") : handleSubmit(onSubmit)
                  }
                >
                  <Text style={{ color: "white", textAlign: "center" }}>
                    {showQR ? "Ladda ner" : `${beginButtonTitle}`}
                  </Text>
                </Pressable>
                <Pressable
                  style={generalStyling.endButton}
                  onPress={closeDialogFunction}
                >
                  <Text style={{ textAlign: "center", color: "gray" }}>
                    {endButtonTitle}
                  </Text>
                </Pressable>
              </View>
            ))}
        </View>
      </View>
    </Modal>
  );
}

let generalStyling = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    display: "flex",
    gap: 10,
    padding: 10,
    width: 340,
    height: 450,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
  dialogHeader: {
    borderBottomColor: "#808080",
    borderBottomWidth: "100%",
  },
  buttonsFlex: {
    width: "100%",
    flexDirection: "row",
    gap: "1",
    justifyContent: "space-between",
    flex: 1,
  },
  beginButton: {
    alignSelf: "center",
    minWidth: 125,
    backgroundColor: "#092C4C",
    color: "white",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
  },
  endButton: {
    color: "#0070f2",
    minWidth: 125,
    borderWidth: "1",
    borderColor: "gray",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 5,
    alignSelf: "center",
  },
  textInputs: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 2,
    marginBottom: 15,
  },
});
