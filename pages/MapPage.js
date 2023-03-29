import { Text } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MapPage() {
  return (
    <SafeAreaView>
       <View style={{alignItems: "center", minHeight: "100%"}}>
        <Text style={{fontSize: 30, marginTop: 20}}>Karta</Text>
      </View>
    </SafeAreaView>
  );
}
