import React, { useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { captureRef } from "react-native-view-shot";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";

export default function AxFoodQRCode({ content, image }) {
  const viewShotRef = useRef(null);

  const saveQRCode = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
      });

      // Spara bilden i galleriet
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("AxfoodQR", asset, false);
    } catch (error) {
      console.error("Kunde inte spara QR-koden till galleriet", error);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
        <QRCode
          value={content}
          size={200}
          color="#000000"
          backgroundColor="#FFFFFF"
          logo={require("../assets/axfoodlogo.png")}
          logoSize={51}
          onError={(e) => console.log(e)}
        />
      </ViewShot>
      <TouchableOpacity onPress={saveQRCode}>
        <Text>Ladda ner QR-koden</Text>
      </TouchableOpacity>
    </View>
  );
}
