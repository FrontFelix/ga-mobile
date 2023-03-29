import { StatusBar } from "expo-status-bar";
import { Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView>
      <View style={{alignItems: "center", minHeight: "100%"}}>
        <Text style={{fontSize: 30, marginTop: 20}}>SAAS Axfood</Text>
      </View>
    </SafeAreaView>
  );
}
