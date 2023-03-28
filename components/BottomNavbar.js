import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import ContainerPage from "../pages/ContainerPage";
export default function BottomNavbar() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName="Home"
    >
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
      <Tab.Screen
        name="Map"
        component={MapPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "map-marker-radius" : "map-marker-radius-outline"}
              size={30}
              color={focused ? "#0070f2" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Containers"
        component={ContainerPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Octicons
              name="container"
              size={30}
              color={focused ? "#0070f2" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
