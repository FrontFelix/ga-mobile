import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import MultiSelect from 'react-native-multiple-select';
export default function SapDialog({
  children,
  beginButtonTitle,
  endButtonTitle,
  dialogOpen,
  closeDialogFunction,
  size,
  dialogTitle,
}) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      categories: [],
    },
  });


  let selectedItems = []


const optionsList = [
  { label: "Wellpapp", value: "wellpapp" },
  { label: "Plast", value: "plast" },
  { label: "Trä", value: "trä" },
];

  const onSubmit = (data) => console.log(data);
  return (
    <Modal animationType="slide" transparent={false} visible={dialogOpen}>
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
          <View style={{ width: "100%" }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <Text>Namn på container</Text>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder='"MXD-64241"'
                    placeholderTextColor="#808080"
                    enablesReturnKeyAutomatically={true}
                  />
                  {errors.title && <Text>Skriv in container namn...</Text>}
                </View>
              )}
              name="title"
            />
              <Controller
              control={control}
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
          {children}
          <View style={generalStyling.buttonsFlex}>
            <Pressable
              style={generalStyling.beginButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={{ color: "white", textAlign: "center" }}>
                {beginButtonTitle}
              </Text>
            </Pressable>
            <Pressable
              style={generalStyling.endButton}
              onPress={closeDialogFunction}
            >
              <Text style={{ textAlign: "center", color: "#092C4C" }}>
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
    backgroundColor: "#092C4C",
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
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    padding: 10,
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
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    padding: 10,
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
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    padding: 10,
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
