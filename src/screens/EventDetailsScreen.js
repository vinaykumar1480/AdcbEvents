import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import EventMap from "../components/EventMap";
import {
  saveFavourite,
  removeFavourite,
  getFavourites,
} from "../utils/storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function EventDetailsScreen({ route }) {
  const { event } = route.params;
  const venue = event?._embedded?.venues?.[0];

  const [isFavourite, setFavourite] = useState(false);

  const latitude = venue?.location?.latitude
    ? Number(venue.location.latitude)
    : null;
  const longitude = venue?.location?.longitude
    ? Number(venue.location.longitude)
    : null;

  useEffect(() => {
    checkFavourite();
  }, []);

  const checkFavourite = async () => {
    const favs = await getFavourites();
    setFavourite(favs.some((item) => item.id === event.id));
  };

  const handleToggleFavourite = async () => {
    if (isFavourite) {
      await removeFavourite(event.id);
    } else {
      await saveFavourite(event);
    }
    setFavourite(!isFavourite);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FEF2F2" }}>
      <StatusBar backgroundColor="#FF7A6E" barStyle="light-content" />
      <ScrollView style={{ flex: 1 }}>
        {/* ---------- HEADER WITH TITLE ---------- */}
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
            {event.name}
          </Text>
        </LinearGradient>

        {/* ---------- MAIN CARD ---------- */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            margin: 15,
            marginTop: -90,
            borderRadius: 15,
            elevation: 6,
            paddingBottom: 15,
          }}
        >
          {/* IMAGE */}
          {event.images?.[0]?.url && (
            <Image
              source={{ uri: event.images[0].url }}
              style={{
                width: "100%",
                height: 200,
                borderRadius: 15,
                marginBottom: 10,
              }}
            />
          )}

          {/* DETAILS */}
          <View
            style={{
              marginHorizontal: 10,
            }}
          >
            <View style={{ flexDirection: "row", paddingVertical: 10 }}>
              <Icon name="calendar" size={20} color="#FAA18F" />
              <Text
                style={{ color: "#555", fontWeight: "400", paddingLeft: 5 }}
              >
                {event.dates?.start?.localDate} {event.dates?.start?.localTime}
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
              <Icon name="information" size={20} color="#FAA18F" />
              <Text
                style={{ color: "#555", fontWeight: "400", paddingLeft: 5 }}
              >
                More Details...
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
              <Icon name="map-marker" size={20} color="#FAA18F" />
              <Text
                style={{
                  color: "#555",
                  fontWeight: "400",
                  paddingLeft: 5,
                  flexShrink: 1,
                }}
              >
                {venue?.name}
              </Text>
            </View>
          </View>
          {/* MAP */}
          {latitude && longitude && (
            <View style={{ marginBottom: 15 }}>
              <EventMap lat={latitude} lng={longitude} />
            </View>
          )}

          {/* FAVOURITE BUTTON */}
          <TouchableOpacity
            onPress={handleToggleFavourite}
            style={{ alignItems: "center" }}
          >
            <LinearGradient
              colors={
                isFavourite ? ["#FF5C5C", "#FF8A7A"] : ["#FF5C5C", "#FF8A7A"]
              }
              style={{
                paddingVertical: 10,
                borderRadius: 10,
                flexDirection: "row",
                paddingHorizontal: 20,
                gap: 10,
              }}
            >
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 13,
                  fontWeight: "500",
                }}
              >
                {isFavourite ? "Remove from Favorites" : "Add to Favorites"}
              </Text>

              {/* ICON */}
              <Icon
                name={isFavourite ? "heart-off-outline" : "heart-plus-outline"}
                size={20}
                color="#FFF"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}