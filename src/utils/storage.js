import AsyncStorage from "@react-native-async-storage/async-storage";

const FAV_KEY = "FAVOURITE_EVENTS";

export const saveFavourite = async (event) => {
  try {
    const existing = await AsyncStorage.getItem(FAV_KEY);
    let favs = existing ? JSON.parse(existing) : [];

    // Prevent duplicates
    if (!favs.find((e) => e.id === event.id)) {
      favs.push(event);
      await AsyncStorage.setItem(FAV_KEY, JSON.stringify(favs));
    }
  } catch (error) {
    console.log("Error saving favourite", error);
  }
};

export const getFavourites = async () => {
  try {
    const existing = await AsyncStorage.getItem(FAV_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.log("Error retrieving favourites", error);
    return [];
  }
};

export const removeFavourite = async (id) => {
  try {
    const existing = await AsyncStorage.getItem(FAV_KEY);
    let favs = existing ? JSON.parse(existing) : [];

    favs = favs.filter((e) => e.id !== id);

    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(favs));
  } catch (error) {
    console.log("Error removing favourite", error);
  }
};
