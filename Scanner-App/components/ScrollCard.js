import { View, Text, TouchableOpacity } from "react-native";

export default function ScrollCard({ product, index }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: index > 0 ? 10 : 0,
        marginBottom: index === 0 ? 10 : 0,
      }}
    >
      <View style={{ gap: 2 }}>
        <Text style={{ color: "#092C4C", fontSize: 16, fontWeight: "600" }}>
          {product.name}
        </Text>
        <Text>I butik : {product.stock}</Text>
        {product.stock < 18 && (
          <Text style={{ color: "orange" }}>Behöver påfyllning</Text>
        )}
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: "#092C4C",
            paddingHorizontal: 15,
            paddingVertical: 6,
            borderRadius: 2,
            color: "white",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Beställ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
