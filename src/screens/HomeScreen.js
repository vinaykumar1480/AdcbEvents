import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { searchEvents } from "../api/events";

export default function HomeScreen({ navigation }) {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const results = await searchEvents(keyword, city);
    setEvents(results);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FEF2F2" }}>
      <StatusBar backgroundColor="#FF7A6E" barStyle="light-content" />
      <LinearGradient
        colors={["#FF7A6E", "#FF5E62"]}
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingTop: 70,
          paddingBottom: 100,
          paddingHorizontal: 20,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
            paddingTop: 0,
          }}
        >
          Explore Events Near You
        </Text>
        <Text style={{ color: "#ffe" }}>Plan your next trip</Text>
      </LinearGradient>

      {/* -------- SEARCH BOX CARD -------- */}
      <View
        style={{
          backgroundColor: "#FFFFFF",
          padding: 20,
          marginTop: -90,
          marginHorizontal: 15,
          borderRadius: 15,
          elevation: 6,
          marginBottom: 10,
        }}
      >
        {/* Keyword */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F4F4F6",
            paddingHorizontal: 12,
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          <Icon name="magnify" size={22} color="#777" />
          <TextInput
            placeholder="Search Keyword"
            placeholderTextColor="#777"
            value={keyword}
            onChangeText={setKeyword}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingLeft: 10,
              color: "#000",
            }}
          />
        </View>

        {/* City */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F4F4F6",
            paddingHorizontal: 12,
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          <Icon name="map-marker" size={22} color="#777" />
          <TextInput
            placeholder="City"
            placeholderTextColor="#777"
            value={city}
            onChangeText={setCity}
            style={{
              flex: 1,
              paddingVertical: 12,
              paddingLeft: 10,
              color: "#000",
            }}
          />
        </View>

        {/* SEARCH BUTTON */}
        <TouchableOpacity onPress={handleSearch} style={{ marginTop: 3 }}>
          <LinearGradient
            colors={["#FF6F61", "#FF8A80"]}
            style={{
              paddingVertical: 10,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontSize: 15,
                fontWeight: "500",
              }}
            >
              Search
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* LOADING */}
      {loading && (
        <Text style={{ textAlign: "center", marginTop: 5 }}>Loading...</Text>
      )}

      {/* EVENTS LIST */}
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#FFF",
              padding: 15,
              borderRadius: 15,
              marginBottom: 0,
              marginTop: 10,
              elevation: 3,
            }}
            onPress={() => navigation.navigate("EventDetails", { event: item })}
          >
            <Text style={{ fontSize: 16, fontWeight: "400", marginBottom: 6 }}>
              {item.name}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="calendar" size={18} color="#FAA18F" />
              <Text style={{ color: "#555", margin: 5 }}>
                {item.dates?.start?.localDate}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="map-marker" size={20} color="#FAA18F" />
              <Text style={{ color: "#777", margin: 5 }}>
                {item._embedded?.venues?.[0]?.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}