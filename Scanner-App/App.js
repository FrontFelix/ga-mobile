import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { ScannerProvider } from "./contexts/ScannerContext";
import BottomNavbar from "./components/BottomNavbar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <ScannerProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="BottomNavbar"
            component={BottomNavbar}
          />
        </Stack.Navigator>
      </ScannerProvider>
    </NavigationContainer>
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
