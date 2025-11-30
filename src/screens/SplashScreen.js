import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={{ marginTop: 15, fontSize: 18 }}>Loading...</Text>
    </View>
  );
}
