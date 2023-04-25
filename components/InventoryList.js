import { View, Text, Linking } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { haverSine } from "../hooks/mathHooks";
import InventoryPage from "../pages/InventoryPage";

export default function InventoryList() {
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 25, marginTop: 15, marginBottom: 15 }}>
          Varor
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100%",
          marginTop: 10,
        }}
      >
        <View
          style={{
            backgroundColor: "#092C4C",
            width: "95%",
            marginTop: 20,
            height: 115,
            borderRadius: 4,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>Äpplen</Text>
            <Text style={{ color: "green" }}>I lager</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
              Pris: 26,90
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#FAFAFA",
                  backgroundColor: "lightblue",
                  width: 50,
                  padding: 5,
                  textAlign: "center",
                  borderRadius: 6,
                }}
              >
                Köp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#092C4C",
            width: "95%",
            marginTop: 20,
            height: 115,
            borderRadius: 4,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>Bananer</Text>
            <Text style={{ color: "orange" }}>Få kvar</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
              Pris: 39,50
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#FAFAFA",
                  backgroundColor: "lightblue",
                  width: 50,
                  padding: 5,
                  textAlign: "center",
                  borderRadius: 6,
                }}
              >
                Köp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#092C4C",
            width: "95%",
            marginTop: 20,
            height: 115,
            borderRadius: 4,
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>Apelsiner</Text>
            <Text style={{ color: "gray" }}>Slut i lager</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
              Pris: 32,50
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "#FAFAFA",
                  backgroundColor: "lightblue",
                  width: 50,
                  padding: 5,
                  textAlign: "center",
                  borderRadius: 6,
                }}
              >
                Köp
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
