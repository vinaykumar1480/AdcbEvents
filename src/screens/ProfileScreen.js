import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  StatusBar,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

import { getFavourites, removeFavourite } from "../utils/storage";
import { LanguageContext } from "../context/LanguageContext";
import { AuthContext } from "../context/AuthContext";

export default function ProfileScreen({ navigation }) {
  const [favourites, setFavourites] = useState([]);

  const { lang, toggleLanguage } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);

  // Redirect to login if user logs out
  useEffect(() => {
    if (!user) navigation.replace("Login");
  }, [user]);

  if (!user) return null;

  const loadFavs = async () => {
    const favs = await getFavourites();
    setFavourites(favs);
  };

  useEffect(() => {
    loadFavs();
  }, []);

  useEffect(() => {
    const unsub = navigation.addListener("focus", loadFavs);
    return unsub;
  }, [navigation]);

  const handleRemove = async (id) => {
    await removeFavourite(id);
    loadFavs();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FEF2F2" }}>
      {/* STATUS BAR FIX (full theme color) */}
      <StatusBar backgroundColor="#FF7A6E" barStyle="light-content" />

      {/* -------- HEADER GRADIENT -------- */}
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
        {/* Header Row */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 0,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
            Profile
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#fff", marginRight: 5 }}>
              {lang === "en" ? "EN" : "AR"}
            </Text>

            <Switch
              value={lang === "ar"}
              onValueChange={toggleLanguage}
              thumbColor="#fff"
              trackColor={{ false: "#bbb", true: "#00000055" }}
            />
          </View>
        </View>
      </LinearGradient>

      {/* -------- PROFILE CARD -------- */}
      <View
        style={{
          backgroundColor: "#fff",
          margin: 15,
          marginTop: -90,
          padding: 20,
          borderRadius: 15,
          elevation: 5,
        }}
      >
        {/* PROFILE + LOGOUT ROW */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LEFT SIDE: Profile */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="account-circle" size={60} color="gray" />

            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 15, fontWeight: "400", color: "#333" }}>
                Nirmala Bojanapu
              </Text>

              <Text style={{ fontSize: 14, color: "#555", marginTop: 4 }}>
                {user?.email ?? "user@gmail.com"}
              </Text>
            </View>
          </View>

          {/* RIGHT SIDE: Logout ICON */}
          <TouchableOpacity
            onPress={() =>
              Alert.alert("Logout", "Are you sure?", [
                { text: "Cancel", style: "cancel" },
                { text: "Logout", onPress: logout },
              ])
            }
          >
            <Icon name="logout-variant" size={26} color="#FF3B50" />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Icon name="map-marker" size={20} color="#FAA18F" />
          <Text style={{ color: "#555", fontWeight: "400", paddingLeft: 5 }}>
            Dubai
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Icon name="phone" size={20} color="#FAA18F" />
          <Text style={{ color: "#555", fontWeight: "400", paddingLeft: 5 }}>
            +971 567127696
          </Text>
        </View>
      </View>

      {/* -------- FAVOURITE EVENTS -------- */}
      <Text
        style={{
          fontSize: 15,
          fontWeight: "500",
          marginLeft: 20,
          marginBottom: 10,
        }}
      >
        Favourite Events
      </Text>

      <FlatList
        data={favourites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 100 }}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#777" }}>
            No favourites yet.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 15,
              marginBottom: 15,
              elevation: 2,
            }}
          >
            {item.images?.[0]?.url && (
              <Image
                source={{ uri: item.images[0].url }}
                style={{ width: "100%", height: 140, borderRadius: 10 }}
              />
            )}
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "400", marginTop: 10 }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", paddingVertical: 7 }}>
                <Icon name="map-marker" size={18} color="#FAA18F" />
                <Text
                  style={{
                    color: "#666",
                    paddingLeft: 5,
                    fontSize: 13,
                    flexShrink: 1,
                  }}
                >
                  {item._embedded?.venues?.[0]?.name}
                </Text>
              </View>
              <View style={{ flexDirection: "row", paddingBottom: 7 }}>
                <Icon name="calendar" size={18} color="#FAA18F" />
                <Text
                  style={{
                    color: "#666",
                    paddingLeft: 5,
                    fontSize: 13,
                    flexShrink: 1,
                  }}
                >
                  {item.dates?.start?.localDate}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleRemove(item.id)}
              style={{ alignItems: "center", marginBottom: 8 }}
            >
              <LinearGradient
                colors={["#FF6F61", "#FF8A80"]}
                style={{
                  paddingVertical: 10,
                  borderRadius: 15,
                  alignItems: "center",
                  width: 120,
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 5,
                }}
              >
                <Text
                  style={{ color: "#FFF", fontSize: 13, fontWeight: "500" }}
                >
                  Remove
                </Text>

                <Icon name={"heart-off-outline"} size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}