import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView>
      <View style={{ margin: 15 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, margin: 20 }}>Välkommen ... </Text>
        </View>

        <View>
          <Text style={{ fontSize: 20 }}>Dagens rutt</Text>
          <View style={{ margin: 10 }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                Willys Tuve
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  backgroundColor: "lightblue",
                  flexDirection: "column",
                }}
              >
                <View style={{ marginBottom: 5 }}>
                  <Text>Datum</Text>
                </View>
                <View>
                  <Text>2023-06-07</Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "lightblue",
                  flexDirection: "column",
                }}
              >
                <View style={{ marginBottom: 5 }}>
                  <Text>Kategori</Text>
                </View>
                <View>
                  <Text>Wellpapp</Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "lightblue",
                  flexDirection: "column",
                }}
              >
                <View style={{ marginBottom: 5 }}>
                  <Text>Antal</Text>
                </View>
                <View>
                  <Text>2</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
