import { Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  return (
    <SafeAreaView>
      <View style={{alignItems: "center", minHeight: "100%"}}
      backgroundColor="#092C4C">
        <Text style={{fontSize: 30, color: "white", marginTop: 20}}>SAAS Axfood</Text>
      </View>
    </SafeAreaView>
  );
}
