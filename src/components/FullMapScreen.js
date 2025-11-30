import React from "react";
import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import WebView from "react-native-webview";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function FullMapScreen({ route }) {
  const { lat, lng } = route.params;
  const navigation = useNavigation();

  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <style>
        html, body, #map { height: 100%; margin: 0; padding: 0; }
      </style>
      <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([${lat}, ${lng}], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
        }).addTo(map);
        L.marker([${lat}, ${lng}]).addTo(map);
      </script>
    </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ html: mapHtml }}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator size="large" color="#0078FF" style={{ marginTop: 80 }} />
        )}
      />

      {/* Exit Fullscreen Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: 20,
          padding: 8,
        }}
      >
        <Icon name="close" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}