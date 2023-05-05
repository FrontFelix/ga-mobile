import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomePage from "../pages/HomePage";
import ScannerPage from "../pages/ScannerPage";
import { useScannerContext } from "../contexts/ScannerContext";
import CloseScannerButton from "./CloseScannerButton";
export default function BottomNavbar() {
  const Tab = createBottomTabNavigator();
  const { isScanning } = useScannerContext();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName="Home"
    >
      {!isScanning && (
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? "clipboard-list" : "clipboard-list-outline"}
                size={30}
                color={focused ? "#0070f2" : "black"}
              />
            ),
          }}
        />
      )}
      {!isScanning && (
        <Tab.Screen
          name="Scanner"
          component={ScannerPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={"barcode-scan"}
                size={30}
                color={focused ? "#0070f2" : "black"}
              />
            ),
          }}
        />
      )}
      {isScanning && (
        <Tab.Screen
          name="AddButton"
          component={ScannerPage}
          options={{
            tabBarButton: () => <CloseScannerButton />,
          }}
        />
      )}
    </Tab.Navigator>
  );
}

const CloseScannerScreen = () => {
  return null;
};
