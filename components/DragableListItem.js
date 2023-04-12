import { View, Text } from "react-native";
export default function DragableListItem({ item, index, drag, isActive }) {
  return (
    <View
      style={{
        backgroundColor: isActive ? "lightgrey" : "white",
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={{ flex: 1 }}>{item.name}</Text>
    </View>
  );
}
