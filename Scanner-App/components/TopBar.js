import { Image, Text, View } from "react-native";

export default function TopBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ gap: 10 }}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Image
            source={require("../assets/profilePic.png")}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          />
          <Text>Här ska vi scanna gött</Text>
        </View>
      </View>
      <Text style={{ fontSize: 20 }}>Axfood</Text>
    </View>
  );
}
