import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/TopBar";

export default function HomePage() {
  return (
    <SafeAreaView style={{ padding: 20 }}>
      <TopBar />
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        <View
          style={{
            marginTop: 40,
            backgroundColor: "#FAFAFA",
            width: "100%",
            height: "70%",
            alignItems: "center",
            borderRadius: 4,
          }}
        >
          <View>
            <Text style={{ marginTop: 20, fontSize: 25 }}>Dagens rutt</Text>
          </View>
          <View
            style={{
              backgroundColor: "#092C4C",
              width: "90%",
              marginTop: 20,
              height: 80,
              borderRadius: 4,
              padding: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
                Container: Namn
              </Text>
              <Text style={{ color: "#fafafa" }}>Se karta</Text>
            </View>
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
              Kategori: Plast
            </Text>

            <Text style={{ color: "green", marginBottom: 4 }}>
              Status: Levererad
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#092C4C",
              width: "90%",
              marginTop: 20,
              height: 80,
              borderRadius: 4,
              padding: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
                Container: Namn
              </Text>
              <Text style={{ color: "#fafafa" }}>Se karta</Text>
            </View>
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
              Kategori: Plast
            </Text>

            <Text style={{ color: "orange", marginBottom: 4 }}>
              Status: Ute för leverans
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#092C4C",
              width: "90%",
              marginTop: 20,
              height: 80,
              borderRadius: 4,
              padding: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
                Container: Namn
              </Text>
              <Text style={{ color: "#fafafa" }}>Se karta</Text>
            </View>
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
              Kategori: Plast
            </Text>

            <Text style={{ color: "gray", marginBottom: 4 }}>
              Status: Ej hämtad
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#092C4C",
              width: "90%",
              marginTop: 20,
              height: 80,
              borderRadius: 4,
              padding: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
                Container: Namn
              </Text>
              <Text style={{ color: "#fafafa" }}>Se karta</Text>
            </View>
            <Text style={{ color: "#FAFAFA", marginBottom: 4 }}>
              Kategori: Plast
            </Text>

            <Text style={{ color: "gray", marginBottom: 4 }}>
              Status: Ej hämtad
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
